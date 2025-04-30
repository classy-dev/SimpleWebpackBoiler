const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = envVars => {
  const isAnalyze = Boolean(envVars.analyze);

  return merge(commonConfig, {
    mode: 'production',
    devtool: 'hidden-source-map',
    output: {
      filename: 'js/[name].[contenthash].js',
      chunkFilename: 'js/[name].[contenthash].js',
      clean: true,
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/',
      // Enable immutable caching
      hashFunction: 'xxhash64',
      hashDigestLength: 16,
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css',
        chunkFilename: 'css/[name].[contenthash].css',
      }),
      new CompressionPlugin({
        test: /\.(js|css|html|svg)$/,
        algorithm: 'gzip',
        compressionOptions: { level: 9 },
        threshold: 10240,
        minRatio: 0.8,
      }),
      isAnalyze && new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: path.resolve(__dirname, '../reports/bundle-analysis.html'),
        openAnalyzer: false,
      }),
    ].filter(Boolean),
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
              pure_funcs: ['console.log'],
              passes: 2,
              dead_code: true,
              unused: true,
            },
            mangle: true,
            output: {
              comments: false,
            },
          },
          extractComments: false,
        }),
        new CssMinimizerPlugin(),
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminGenerate,
            options: {
              plugins: [
                ['imagemin-mozjpeg', { quality: 75 }],
                ['imagemin-pngquant', { quality: [0.7, 0.9] }],
                ['imagemin-svgo'],
                ['imagemin-gifsicle'],
                ['imagemin-webp'],
              ],
            },
          },
        }),
      ],
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];
              return `vendor.${packageName.replace('@', '')}`;
            },
          },
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
    performance: {
      hints: 'warning',
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  });
};

const { merge } = require("webpack-merge");
const path = require("path");
const devCommonConfig = require("./webpack.common.js");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const webpack = require("webpack");

module.exports = () => {
  return merge(devCommonConfig, {
    mode: "development",
    devtool: "eval-source-map",
    output: {
      path: path.resolve(__dirname, "..", "./dist"),
      filename: "js/[name].js",
      publicPath: "/",
    },
    devServer: {
      hot: true,
      open: true,
      historyApiFallback: true,
      port: 3000,
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
      },
      compress: true,
    },
    plugins: [
      new ReactRefreshWebpackPlugin(),
    ],
    optimization: {
      removeAvailableModules: false,
      removeEmptyChunks: false,
      splitChunks: false,
      minimize: false,
    },
    cache: {
      type: "filesystem",
      version: "1.0",
      compression: "brotli",
      cacheDirectory: path.resolve(__dirname, "..", ".webpack-cache"),
      buildDependencies: {
        config: [__filename],
      },
      name: "development-cache",
      allowCollectingMemory: true,
    },
  });
};

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.tsx'),
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false, // This is important for Tree Shaking
                    targets: '> 0.25%, not dead',
                    useBuiltIns: 'usage',
                    corejs: 3,
                  },
                ],
                ['@babel/preset-react', { runtime: 'automatic' }],
                '@babel/preset-typescript',
              ],
              plugins: ['@emotion/babel-plugin'],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 10KB 이하 이미지는 inline 처리
          },
        },
        generator: {
          filename: 'images/[name][ext]',
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 8KB 이하 폰트는 inline 처리
          },
        },
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './public/index.html'),
    }),
    new ESLintPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '..', 'src/public'),
          to: '.',
          noErrorOnMissing: true,
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
    new Dotenv({
      path:
        process.env.NODE_ENV === 'production'
          ? path.resolve(__dirname, '../.env')
          : path.resolve(__dirname, '../.env.local'),
      safe: false, // .env.example 파일과 비교 검사
      allowEmptyValues: true,
      systemvars: true, // 시스템 환경 변수 로드
      defaults: true, // .env 파일을 기본값으로 사용
    }),
  ],
};

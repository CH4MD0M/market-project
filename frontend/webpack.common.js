const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'js/[name].[chunkhash:8].bundle.js',
    chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
    clean: true,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        exclude: /node_modules/,
        loader: 'esbuild-loader',
        options: {
          target: 'es2015',
          jsx: 'automatic',
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'assets/images/[name].[hash:8].[ext]',
        },
      },
      { test: /\.svg$/, use: ['@svgr/webpack', 'url-loader'] },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon: 'public/favicon.ico',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/index.html', '**/favicon.ico'],
          },
        },
      ],
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new Dotenv({
      systemvars: true,
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    plugins: [new TsconfigPathsPlugin()],
  },
};

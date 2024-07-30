const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { EsbuildPlugin } = require('esbuild-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  cache: {
    type: 'filesystem',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', path.resolve(process.cwd(), 'build/**/*')],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: '[id].[contenthash].css',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
    }),
  ],
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [
      new EsbuildPlugin({
        target: 'es2015',
        css: true,
        minify: true,
      }),
    ],

    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'initial',
          priority: 20,
        },
        appModules: {
          test: /[\\/]src[\\/]/,
          name: 'app-modules',
          chunks: 'initial',
          priority: 15,
        },
        asyncVendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'async',
          reuseExistingChunk: true,
          priority: 10,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `async-${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
});

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    open: true,
    hot: true,
    historyApiFallback: true,
    compress: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8933',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

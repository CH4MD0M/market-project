const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    open: true,
    hot: true,
    historyApiFallback: true,
    compress: true,
    port: 3000,
    liveReload: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8933',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

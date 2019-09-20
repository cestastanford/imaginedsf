const path = require('path');

module.exports = {
  entry: [
    'whatwg-fetch',
    'babel-polyfill',
    './static-src/index.js',
  ],

  output: {
    filename: 'script.js',
    path: path.resolve(__dirname, 'imaginedsf-custom-theme/static'),
    publicPath: '/wp-content/themes/imaginedsf-custom-theme/static/',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },

      {
        test: /\.(css|svg)$/,
        loader: 'file-loader',
        options: { name: '[name].[ext]' },
      },
    ],
  },
};

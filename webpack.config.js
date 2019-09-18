const path = require('path');

module.exports = {
  entry: [
    'normalize.css',
    'babel-polyfill',
    './static-src/index.jsx',
  ],
  output: {
    filename: 'script.js',
    path: path.resolve(__dirname, 'imaginedsf-custom-theme/static'),
    publicPath: '/wp-content/themes/imaginedsf-custom-theme/static/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        resolve: { extensions: ['.js', '.jsx'] },
      },
      {
        test: /\.(css|svg)$/,
        loader: 'file-loader',
        options: { name: '[name].[ext]' },
      },
    ],
  },
};

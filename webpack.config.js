const path = require('path');

module.exports = {
  entry: './static-src/index.js',
  output: {
    filename: 'script.js',
    path: path.resolve(__dirname, 'imaginedsf-custom-theme/static')
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
};

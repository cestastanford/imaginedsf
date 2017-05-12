var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    
    entry: './static-src/index.js',
    output: {
        filename: 'script.js',
        path: path.resolve(__dirname, 'imaginedsf-custom-theme/static'),
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [ 'css-loader', 'sass-loader' ],
                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'buble-loader',
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles.css')
    ],

};
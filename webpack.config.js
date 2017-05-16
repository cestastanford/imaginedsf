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
                test: /\.s(c|a)ss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        { loader: 'css-loader', options: { sourceMap: true } },
                        { loader: 'sass-loader', options: { sourceMap: true } }
                    ],
                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'buble-loader',
            },
            { test: /\.svg/, loader: 'file-loader?mimetype=image/svg+xml' },
            { test: /\.woff/, loader: "file-loader?mimetype=application/font-woff" },
            { test: /\.ttf/, loader: "file-loader?mimetype=application/octet-stream" },
            { test: /\.eot/, loader: "file-loader" },
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles.css')
    ],

};
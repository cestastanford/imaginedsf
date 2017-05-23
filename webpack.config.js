var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    
    entry: [
        'babel-polyfill',
        'whatwg-fetch',
        './static-src/index.js'
    ],
    output: {
        filename: 'script.js',
        path: path.resolve(__dirname, 'imaginedsf-custom-theme/static'),
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
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
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        plugins: ['transform-object-rest-spread'],
                    },
                },
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
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
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
        }
    }

};
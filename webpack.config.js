const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

//  Sets public asset resolve path based on environmental variable.
let publicPath = 'wp-content/themes/imaginedsf-custom-theme/static/'
if (process.env.NODE_ENV === 'production' && fs.existsSync('publicPath.prod.env')) {
    publicPath = fs.readFileSync('publicPath.prod.env', 'utf-8') + publicPath
}

module.exports = {
    
    entry: [
        'babel-polyfill',
        'whatwg-fetch',
        './static-src/index.js'
    ],
    
    output: {
        filename: 'script.js',
        path: path.resolve(__dirname, 'imaginedsf-custom-theme/static'),
        publicPath,
    },
    
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        { loader: 'css-loader', options: { sourceMap: true } },
                        { loader: 'sass-loader', options: { sourceMap: true } },
                    ],
                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        sass: ExtractTextPlugin.extract({
                            use: [
                                { loader: 'css-loader', options: { sourceMap: true } },
                                { loader: 'sass-loader', options: { sourceMap: true } },
                            ],
                        })
                    }
                }
            },
            { test: /\.(svg|woff2?|ttf|eot|png)/, loader: 'file-loader' },
        ]
    },
    
    plugins: [
        new ExtractTextPlugin('styles.css'),
    ],
    
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
        },
    },

}

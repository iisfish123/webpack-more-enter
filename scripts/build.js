'use strict';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
module.exports = {
    entry: {
        index: path.resolve('../index'),
        es6js: path.resolve('../es6js.js'),
    },
    devtool: shouldUseSourceMap ? 'source-map' : false,
    output: {
        filename: 'js/[name].js',
        path: path.join(__dirname, '../dist'),
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query:{
                // presets:["env"]
            }
        }]
    },
    node: {
        fs: 'empty'
    },
    plugins:[
        new HtmlWebpackPlugin({
            inject:true,
            template:path.join('../public/','index.html'),
            chunks:['index'],
        }),
        new HtmlWebpackPlugin({
            filename: 'es6.html',
            template: path.join('../public/','es6.html'),
            hash: true,
            chunks:['es6js'],
        })
    ],
};


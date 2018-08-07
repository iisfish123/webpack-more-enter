'use strict';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
// const polyfill = require("babel-polyfill");
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

module.exports = {
    entry: {
        index: path.resolve('../index'),
        es6js: path.resolve('../es6js.js'),
    },
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
            minify: {
                removeAttributeQuotes:true,
                removeComments: true,
                collapseWhitespace: true,
                removeScriptTypeAttributes:true,
                removeStyleLinkTypeAttributes:true
            }
        })
    ],
    devServer: {
        // contentBase: "",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    }
};


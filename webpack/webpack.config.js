const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:path.resolve(__dirname,'../src/index.js'),
    output:{
        path:path.resolve(__dirname,'../dist'),
        filename:'app/[name]_[hash:8].js' 
    },
    module:{
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader:'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
　　　　 　　template: path.resolve(__dirname, '../src/index.template.html'),
　　　　　　 inject: true
　　　　 })
    ]
}
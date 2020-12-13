const path = require('path');
const webpack = require('webpack');
//生成HTML模板
const HtmlWebpackPlugin = require('html-webpack-plugin');
//分离提取CSS文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//多线程打包
const HappyPack = require('happypack');

module.exports = {
    entry:path.resolve(__dirname,'../src/index.js'),
    output:{
        path:path.resolve(__dirname,'../dist'),
        filename:'app/[name]_[hash:8].js' 
    },
    module:{
        rules: [
            //处理JS和JSX文件
            {
                test: /\.(js|jsx)$/,
                loader:'babel-loader',
                exclude: /node_modules/
            },
            //
            {
                test: /\.css$/,
                use: [
                  {
                      loader:MiniCssExtractPlugin.loader
                  },
                  "css-loader"
                ]
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        //html模板
        new HtmlWebpackPlugin({
　　　　 　　template: path.resolve(__dirname, '../src/index.template.html'),
　　　　　　 inject: true
　　　　 }),
        //HappyPack
        new HappyPack({
            // 用唯一的标识符id来代表当前的HappyPack 处理一类特定的文件
            id: 'babel',
            // 如何处理.js文件，用法和Loader配置是一样的
            loaders: ['babel-loader']
        }),
        new HappyPack({
            id: 'image',
            loaders: [{
            loader: require.resolve('url-loader'),
            options: {
                limit: 10000,
                name: '[name].[ext]'
            }
            }]
        }),
        // 处理样式文件
        new HappyPack({
            id: 'css-pack',
            loaders: ['css-loader']
        })
    ]
}
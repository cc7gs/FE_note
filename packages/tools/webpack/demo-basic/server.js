/**
 * 实现类似 devServer服务,作用:1.监听文件改变
 * 1. 检测文件改变'
 * 2. 读取webpack conifg 文件
 * 3. 启动一个服务
 * */
const express=require('express');
const webpackDevMiddleware=require('webpack-dev-middleware');
const webpack=require('webpack');
const config=require('./webpack.config.js');

const complier=webpack(config);
const app=express();

// 告诉 express 使用 webpack-dev-middleware，
// 以及将 webpack.config.js 配置文件作为基础配置
app.use(webpackDevMiddleware(complier,{
  publicPath:config.output.publicPath
}));
app.listen(3000,()=>{
  console.log('server at port 3000');
})
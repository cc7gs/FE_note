const merge = require('webpack-merge');
const basicConfig=require('./webpack.base.config');
const devConfig=require('./webpack.dev.config');
const prodConfig=require('./webpack.pro.config')

const config=process.NODE_ENV==='development'?devConfig:prodConfig;

module.exports=merge(basicConfig,config)
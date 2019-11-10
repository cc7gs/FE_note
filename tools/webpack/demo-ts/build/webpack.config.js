const merge = require('webpack-merge');
const basicConfig=require('./webpack.base.config');
const devConfig=require('./webpack.dev.config');
const prodConfig=require('./webpack.pro.config')

module.exports=(env,argv)=>{
    let config=argv.module==='development'?devConfig:prodConfig;
    return merge(basicConfig,config);
}
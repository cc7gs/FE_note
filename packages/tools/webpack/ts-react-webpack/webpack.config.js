const argv=require('yargs-parser')(process.argv.slice(2));

//获取当前执行环境
const _mode=argv.mode||'development';

//获取对应环境下的webpack 配置
const _mergeConfig=require(`./config/webpack.${_mode}.js`);

const merge=require('webpack-merge');
const {CleanWebpackPlugin}=require('clean-webpack-plugin');
const htmlWebpackPlugins=require('html-webpack-plugin');
const {CheckerPlugin }=require('awesome-typescript-loader'); //处理ts
const {resolve}=require('path');
 
const  commonConfig={
    entry:{
        app:resolve('./src/web/index')
    },
    module:{
        rules:[
            {
                test:/\.tsx?$/,
                loader:'awesome-typescript-loader'
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new CheckerPlugin(),
        new htmlWebpackPlugins({
            title:'webpack leanring',
            template:'./src/web/index.html'
        }),
    ],
    resolve:{
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    }
}
module.exports=merge(commonConfig,_mergeConfig);

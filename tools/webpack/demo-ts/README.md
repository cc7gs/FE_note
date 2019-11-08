# 手把手 ts+webpack 搭建环境
# 初始化项目
创建文件 `ts-demo`
> npm init -y

> npm i typescript -D
初始化 ts配置项
> npx tsc --init

## 创建目录
```
ts-demo
│   README.md 
│
└───build
│   │   webpack.base.config.js
│   │   webpack.config.js
│   │   webpack.pro.config.js
|   |   webpack.dev.config.js
│   
└───public
|   |  index.html
|   |
└───src
|    │   
|    │   
|
└─── tsconfig.json
|
└─── REAME.md
```
build目录构建 `webpack 配置`
> npm install --save-dev webpack webpack-cli webpack-dev-server ts-loader html-webpack-plugin webpack-merge clean-webpack-plugin


入口配置`webpack.config.js`
```js
const merge = require('webpack-merge');
const basicConfig=require('./webpack.base.config');
const devConfig=require('./webpack.dev.config');
const prodConfig=require('./webpack.pro.config')

const config=process.NODE_ENV==='development'?devConfig:prodConfig;

module.exports=merge(basicConfig,config)

```

基础配置`webpack.base.config.js`

```js
const path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
    entry:{
      app:'./src/index.ts'
    },
  
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    module: {
        rules: [  
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
          }
        ]
      },
    plugins:[
        new HtmlWebpackPlugin({
            title:'webpack-ts-deno',
            template:'./src/template/index.html'
        })
    ],
    output:{
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../dist')
    }
}
```

开发环境配置`webpack.dev.config.js`

```js
const { CleanWebpackPlugin } =require('clean-webpack-plugin');

module.exports={
    plugins:[
        new  CleanWebpackPlugin(),
    ]
}
```

生产环境配置`webpack.pro.config.js`
```js
module.exports={
    devtool: 'cheap-module-eval-source-map',
}
```

修改`package.json`脚本
```json
"scripts": {
    "dev": "webpack-dev-server --mode=development --config  ./build/webpack.config.js",
    "build": "webpack --mode=production --config ./build/webpack.config.js"
  }
```

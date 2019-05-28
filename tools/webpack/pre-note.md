# 编写一个loader
> npm init -y
> npm install webpack webpack-cli --save-dev

根目录新建文件夹loaders --> splitLoader.js
splitLoader.js
```javascript
module.exports=function(source){
  return source.split('');
}
```

下面我们看下关于异步操作具体写法:
```javascript
module.exports=function(source){
  const callback=this.async();
  setTimeout(()=>{
    const result=source.split('');
    callback(null,result);
  },100);
}
```
webpack 基础配置
```javascript
const path=require('path');
module.exports={
  entry:'src/index.js',
  resovleLoaders:{
    modules:['node_modules','./loaders']
  }
  module:{
    rules:[
      {
        test:/\.js$/,
        use:[
          {
            loader:'splitLoader', //若没有配置resovleLoader,则需要下面这种写法 
            // loader:path.resolve(__dirname,'./loaders/splitLoader') 
          }
        ]
      }
    ]
  }
  output:{
    filename:'[name].js',
    path:path.resolve(__dirname,'dist');
  }
}
```

# 编写plugins

## 插件组成部分
- 一个javascirpt函数
- 在插件函数的prototype上定义一个 apply 方法
- 指定一个绑定webpack自身的事件钩子‘
- 处理 webpack 内部实例的特定数据。
- 功能完成后调用webpack提供的回调


> npm init -y
> npm install webpack webpack-cli --save-dev

webpack.config.js
```javascript
const path=require('path');
module.exports={
  entry:'src/index.js',
  output:{
    filename:'[name].js',
    path:path.resolve(__dirname,'dist')
  }
}
```
根目录创建文件夹 plguins,
coypriht-webpack-plugin.js
```javascript
// 一个 JavaScript 命名函数。
class CopyrightWebpackPlugin{
  constructor(){

  }
  //  在插件函数的 prototype 上定义一个 `apply` 方法。
  apply(compiler){
    // 指定一个挂载到 webpack 自身的事件钩子。
  compiler.plugin('webpacksEventHook', function(compilation /* 处理 webpack 内部实例的特定数据。*/, callback) {
    console.log("This is an example plugin!!!");

    // 功能完成后调用 webpack 提供的回调。
    callback();
  });
  }
}
```

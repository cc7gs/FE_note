# webpack 是什么?
本质上webpack是一个现代javascript应用程序的静态打包工具。
其它基础概念,查看[官方文档](https://webpack.docschina.org/concepts/)
## loader
webpack 只能理解javascript和json文件。loader可以让它能够处理其他类型的文件，并将其转换有效模块。

### filer-loader & url-loader
两者主要功能都是对加载资源进行打包,但是 url-loader设置资源大小来对小资源进行打包js内，来减少网络带宽
```javascript
 module: {
    // rules: [
    //   { 
    //     test: /\.(png|jpg|gif)$/, 
    //     use: {
    //       loader:'file-loader',
    //       options:{
    //         name:'[name].[ext]'
    //       }
    //     }
    //    },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options:{
              limit:138228  //资源大小
            }
          }
        ]
      },
    ]
  },
```
***:**最终在浏览器端可以看到打包后得资源路径变为 'data:image/png;base64...'
### style打包
**安装**
> npm i style-loader  css-loader -D

**使用**
```javascript
{
  test:/\.css$/,
  use:[
    "style-loader",
    {
      loader:"css-loader",
      options:{
        importLoaders:2  //保证import 引入得样式会执行所有loader,
        modules:true  //样式模块化
      }
    }
    ]  //注意loader 顺序
}
```
css-loader 用户处理.css 文件，style-loader用于对样挂在标签上。
注意loader顺序， loader是从下到上 从右到左开始加载。
### 字体打包
file-loader 和 url-loader 可以接收并加载任何文件也包括字体.
```javascript
{
  test:/\.(eot|svg|ttf|woff)$/,  //打包字体
  use:["file-loader"]
 },
```
## plugin
可以在webpack 运行到某个时刻帮我们做一些事情比如:打包优化、资源管理、注入环境变量等。
- html-webpack-plugin
  -  会在打包结束后,自动生成一个html文件,并把打包生成的js自动引入到这个html文件中.
- clean-webpack-plugin
  - 在打包之前,帮助我们删除dist目录
```javascript
  plugins:[
    new cleanWebpackPlugin(), //预先清理
    new htmlWebpackPlugin({
      title:'html plugin demo',
      template:'index.html'
    })
  ],
```
## devtool
**sourceMap:**
它是一个映射关系,可以找到打包后代码位置在打包前哪个位置.
**配置**
```
devtool:'source-map' //production 环境默认配置
```
**其它参数**
- cheap-module-eval-source-map
  - 适合 dev环境
- cheap-module-source-map
  - 适合开发环境

记忆记忆技巧:
- *-source-map
  参数中带有 source-map的则都具有映射关系,打包后会生成.map文件
- inline-*
  参数中带有 inline 的,会将.map文件和并到打包文件中.
- cheap 
  - 提示行不提示具体那一列出错,不提示module(第三方模块)里的错误
- module
  - 带有modlue 的则会提示引入模块错误信息.
- eval
  - 通过eval 生成source-map引入.

# globals
- process 提供有关当前Node.js进程并对其进行控制的信息
- require 查找和使用当前模块的函数
- __dirname 当前目录路径
- module nodejs中一切都是模块(最小一个js文件),供其它模块消费使用
- gobal 和window一样,它是服务器全局变量
...
[其它nodejs globals](https://nodejs.org/api/globals.html#globals_global)

# nodejs 常用API

## process

- **argv**: 解析用户传递参数
```ts
// 前两个参数分别是 node执行命令路径与当前执行文件路径
const  [nodeExePath,curFilePath,...args]=process.argv;
```
- **cwd()**:返回运行node命令所在的文件夹的绝对路径

```ts
// 
const path=process.cwd();
```

- **nextTick**: 微任务
## modules
`foo.js`
```js
const circle = require('./circle.js');
console.log(`The area of a circle of radius 4 is ${circle.area(4)}`);
```
`circle.js`
```js
const { PI } = Math;

exports.area = (r) => PI * r ** 2;

exports.circumference = (r) => 2 * PI * r;

//➡️ equal

// const area=(r)=>PI*r**2;
// const circumference = (r) => 2 * PI * r;
// module.exports={
//   area,
//   circumference
// }

```

## fs模块

```js
/**
 * 文件的读取
 */
const fs=require('fs');
//同步读取文件
const readme=fs.readFileSync('../README.md');
console.log('同步读取',readme);
const reameAsync=fs.readFile('../README.md',(err,data)=>{
    if(err) throw err;
    console.log('异步读取数据',data.toString());
});
```
** 读取文件的路如果是相对路径的话，那么则相对相对的是当前命令行执行的路径,而不是文件所在路径。
> node  basic/nodejs-basic/basic fs.js

> cd basic/nodejs-basic/basic 
> node fs.js
前者运行会报错,因为在当前命令行路径找不到 README.md,因此我们一般采用`path.join(__dirname,'../README.md')`,具体分析看`path`

## path -路径
- __dirname: 表示当前执行文件所在目录的完整目录名
- __filename: 获得当前执行文件的带有完整路径的文件名
- process.cwd() 返回运行node命令所在的文件夹的绝对路径
- path.resolve('./') 返回运行node命令时所在的文件夹绝对路径
```javascript
console.log('==============获取文件路径======================');
console.log(__dirname, 'dirname');
console.log(__filename, 'filename');
console.log(process.cwd());
console.log(path.resolve('./'));
console.log('====================================');

//执行目录
// ps F:\我的github项目> node .\nodejs_note\test.js

// ==============获取文件路径======================
// F:\我的github项目\nodejs_note dirname
// F:\我的github项目\nodejs_note\test.js filename
// F:\我的github项目
// F:\我的github项目
// ====================================
```
### path.normalize
规范路径,把不规范的路径规范化。
```javascript
console.log(path.normalize('F://我的github项目/nodejs_note//nodejs-basic'));
// F:/我的github项目/nodejs_note/nodejs-basic
```
### path.join
1. 传入的参数时字符串路径片段,一个或者多个
2. 如果传空返回'.'表示当前路径
3. 传入的参数不是字符串时,则直接报错
```javascript
console.log(path.join('src','test.js'));
console.log(path.join('src','./test.js'));
console.log(path.join(''));
// src/test.js
// src/test.js
// .
```
### path.parse
该方法会返回一个对象,属性则是path的重要元素,有如下属性:
- root： 代表跟目录
- dir: 代表文件所在文件夹
- base: 代表整一个文件
- name: 代表文件名
- ext: 代表文件的后缀名

```javascript
console.log(path.parse('/home/user/dir/file.txt'));

{
  root:'/',
  dir:'/home/user/dir',
  base:'file.txt',
  name:'file',
  ext:'.txt'
}

┌─────────────────────┬────────────┐
│          dir        │    base    │
├──────┬              ├──────┬─────┤
│ root │              │ name │ ext │
"  /    home/user/dir / file  .txt "
└──────┴──────────────┴──────┴─────┘
```
### path.resolve
- 该方法将路径或路径片段解析为绝对路径
- 路径序列从右到左进行处理,直到构造出一个绝对路径
- 如果处理完给定路径未生成绝对路径,则再加上当前工作目录
- 如果传入空,则返回当前工作目录的绝对路径
```javascript
console.log(path.resolve('/foo/bar','/a/nodeJs'));
console.log(path.resolve('foo/bar','/a'));
console.log(path.resolve(''))
```

## http

```js
const http=require('http');
const server=http.createServer((req,res)=>{
  res.send('welcome to nodeJs');
});
server.listen(3000)
```
## streams
```js
var stream1; //readable
var stream2; //writable

stream1.pip(stream2)  // return readable stream
```

# 事件和错误处理

# 调试

1. node --inspect app.js
2. chrome://inspect/#devices


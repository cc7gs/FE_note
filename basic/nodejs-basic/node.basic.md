# nodejs 常用API

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
## fs -文件系统

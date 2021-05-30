
# 面试题
## html、css
- [两列布局](./html/layout.two.md)
- [三列布局 中间自适应布局](./html/center.auto.md)
- [三列布局 间距固定,宽度自适应](./html/fixed.space.md)
- [三列布局 中间固定,两边自适应](./html/fixed.center.md)
- [盒模型与BFC](/basic/css-basic/css.md)
### absolute中 top\left与 transform 移动区别？
- absolute 中left、right是相对最近的外层元素并且该元素满足 是 relative、aboslute、fixed。
- transform 做偏移是相对自身的中心点而言，如果用百分比则相对自身元素的宽度。

## js
- [js 常考基础题](./js/js.basic.md)
- [构造函数与操作符](./js/constructor.new.md)
- [js原型链](./js/prototype.md)
- [js渲染机制](./js/渲染.md)
- [页面性能相关](./js/performance.md)
- [数组去重](./js/code/arrSet.js)
- [数组扁平化](./js/code/flatDeep.js)
- [统计 0-1000 所有0](./js/code/count.zero.js)

- [promise 实现](./js/promise.md)

## node 相关

- [中间件机制](https://blog.csdn.net/qq_37674616/article/details/115253218?spm=1001.2014.3001.5501)

## 网络相关
- [http基础](../../network/basic.md)
- [浏览器缓存](../../network/cache.md)
- [http面试题](../../network/http.md)
- [cdn 是什么 解决了什么?](../../network/cdn.md)

## 框架相关
- [redux 实现](https://blog.csdn.net/qq_37674616/article/details/100890198)
- [react-redux 实现](https://blog.csdn.net/qq_37674616/article/details/106887934)
- [redux中间件的应用与实现](https://blog.csdn.net/qq_37674616/article/details/100892262)


### 通信类
#### 什么同源策略？
同源策略限制从一个源加载的文档或脚本如何与另一个源进行交互，它是一个隔离恶意文件的安全机制。
同源是指：协议、域名、端口

#### 前后端如何通信
- ajax
- webSocket
- cors 
#### 跨域通信方法
- JSONP

```js
function jsonp({ url, params, cb }) {
      return new Promise(resolve => {
        const script = document.createElement('script')
        window[cb] = function (data) {
          resolve(data)
        }
        const finalParams=Object.entries({...params,cb}).reduce((acc,[key,val])=>typeof acc==="string"
        ?`${acc}&${key}=${val}`
        :`${acc[0]}=${acc[1]}&${key}=${val}`
        );
        script.src = `${url}?${finalParams}`
        document.body.append(script);
      })
    }
    jsonp({
      url: 'http://localhost:3000/getData',
      params: {say:'hello',name:'cc',age:12},
      cb: 'say'
    }).then(data => {
      console.log(data);
    })
```
- postMessage
```js
//main.html
  <iframe src="http://127.0.0.1:4000/sub.html" id="frame" onload="load()">
  </iframe>
  <script>
    function load() {
      const frame=document.querySelector('#frame');
      frame.contentWindow.postMessage('from main page','http://127.0.0.1:4000');
    }
     window.onmessage=(e)=>{
        const d$=document.createElement('div');
        d$.innerText=JSON.stringify(e.data);
        document.body.appendChild(d$);
      }
  </script>
//sub.html
 <script>
    window.onmessage = (e) => {
      document.body.innerText = JSON.stringify(e.data);
      e.source.postMessage('sub page send to main page',e.origin);
    }
  </script>
```
- WebSocket

```html
<body>
  <script>
    const socket=new WebSocket('ws://localhost:3000');
    socket.onopen=()=>{
      socket.send('send message from client');
    }
    socket.onmessage=(e)=>{
      console.log(e.data,'client')
    }
  </script>
</body>
```
```js
// serve.js
const WebSocket = require('ws');
const wss=new WebSocket.Server({port:3000})

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('send message from  serve');
});
```
- CORS
```js
// client
 fetch('http://localhost:3000/getData',{
      headers:{name:'cc'},
      credentials: 'include',
      // method:'PUT',
    }).then(response => response.json()).then(data => {
      console.log(data);
    })

// server
if(whiteList.includes(ctx.get('origin'))){
    ctx.set({
      'Access-Control-Allow-Origin':ctx.get('origin'),
      'Access-Control-Allow-Headers':'name',
      'Access-Control-Max-Age':30,
      'Access-Control-Allow-Credentials':true,
      'Access-Control-Allow-Methods':'PUT'
    });
    if(ctx.method.toLowerCase()==='options'){
      ctx.status=200;
      return;
    }
  }
```

- Nginx

```
location / {
  root html;
  add_header "Access-Control-Allow-Origin" "* "; 
}
```

## 错误监控
### 前端错误分类
1. 代码错误
   1. try..catch;window.onerror
2. 资源错误
   1. Object.onerror
   2. performance.entries()
   3. Error事件捕获
### 资源上报
    1. ajax
    2. Image
```javascript
(new Image()).src='address'
```

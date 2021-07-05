---
nav:
  title: 面试汇总
  path: /interview
group:
  title: js篇
  path: /js
---

# 跨越手段

> 同源策略限制从一个源加载的文档或脚本如何与另一个源进行交互，它是一个隔离恶意文件的安全机制。同源是指：协议、域名、端口

## cors
```html
 <script>
    document.cookie='name=cc';

    fetch('http://localhost:3000/getData',{
      headers:{name:'cc'},
      credentials: 'include',
      // method:'PUT',
    }).then(response => response.json()).then(data => {
      console.log(data);
    })
  </script>
```
```js
 ctx.set({
      'Access-Control-Allow-Origin':ctx.get('origin'),
      'Access-Control-Allow-Headers':'name',
      'Access-Control-Max-Age':30,
      'Access-Control-Allow-Credentials':true,
      'Access-Control-Allow-Methods':'PUT'
    });
```
## postMessage
```html
<!-- main.html -->
<body>
  <iframe src="http://127.0.0.1:4000/sub.html" id="frame" onload="load()">
  </iframe>
  <script>
    function load() {
      const frame=document.querySelector('#frame');
      frame.contentWindow.postMessage('from main page','http://127.0.0.1:4000');
      window.onmessage=(e)=>{
        const d$=document.createElement('div');
        d$.innerText=JSON.stringify(e.data);
        document.body.appendChild(d$);
      }
    }
  </script>
</body>
```
```html
<!-- sub.html -->
 <script>
    window.onmessage = (e) => {
      document.body.innerText = JSON.stringify(e.data);
      e.source.postMessage('sub page send to main page',e.origin);
    }
  </script>
```
## jsonp
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
## webSocket

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
## Nginx

Nginx

```sh
location / {
  root html;
  add_header "Access-Control-Allow-Origin" "* "; 
}
```
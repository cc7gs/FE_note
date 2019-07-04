# 面试题
## html、css
- [页面布局](./html/html.md)
- [盒模型与BFC](./html/css.md)
## js
- [构造函数与操作符](./js/constructor.new.md)
- [js原型链](./js/prototype.md)
- [js渲染机制](./js/渲染.md)
- [页面性能相关](./js/performance.md)

## 网络相关
- [http基础](../../network/basic.md)
- [浏览器缓存](../../network/cache.md)
- [http面试题](../../network/http.md)
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
- postMessage
- WebSocket
- CORS

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

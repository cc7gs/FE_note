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
## 网络相关
- [http基础](../../network/basic.md)
- [浏览器缓存](../../network/cache.md)
- [http面试题](../../network/http.md)
- [cdn 是什么 解决了什么?](../../network/cdn.md)
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

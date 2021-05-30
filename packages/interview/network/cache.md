---
title: 缓存
order: 1
nav:
  title: 面试汇总
  path: /interview
group:
  title: 网络 
  path: /network
---

# 缓存
缓存从微观上可以分为以下几类：
 - 浏览器缓存
 - 代理缓存
 - CDN缓存
 - 数据库缓存
 - 应用缓存
浏览器缓存如下图所示： 
![浏览器缓存图](https://image-static.segmentfault.com/246/172/24617280-5bff3a5c7983c)
## 浏览器缓存   
![](https://user-gold-cdn.xitu.io/2019/1/21/1686e2735267bebb?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
### http缓存
#### 强缓存
 不会向服务器发送请求,直接从缓存中读取资源
1. 设置强缓存
   1. expires(http/1.0,时间格式GMT)
      1. 表示相应头里的过期时间,浏览器再次加载资源时如果在时间之内在命中缓存。
   2. cache-control(http/1.1,单位 秒)
      1. max-age(表示缓存内容在 xx秒后消失)
      2. no-cache(要根据协商缓存是否需要缓存客户端)
      3. no-store(所有内容都不会被缓存)
      4. public(所有内容都将被缓存包括客户端和代理服务器)
      5. private(所有内容只有客户端可以缓存)
      6. s-maxage(只用于共享缓存和max-age效果一样,只是max-age 用于普通缓存)
  
#### 协商缓存
- 当协商缓存生效时,返回304和Not Modified
- 它指的是强制缓存失效后,浏览器携带缓存标示向服务器发起请求,由服务器决定是否需要使用缓存。
2. 设置协商缓存
   1. Last-Modified和 If-Modified-Since
      1. Last-Modifeds是服务器返回资源同时在header添加的,表示这个资源在服务器上最后修改时间,浏览器接受后缓存文件和header。
      2. 浏览器下次请求时，检测是否有Last-Modified字段,如果存在则在请求头添加 If-modified-Since该字段值就是上次服务器返回的值
      3. 如果没有变化则返回304直接从缓存中读取，否则返回新资源
   2. ETag和If-None-Match
      1. Etag是上一次加载资源时,服务器返回的。它的作用是唯一用来标示资源是否有变化。
      2. 浏览器下次请求时将ETag值传入If-None-Match中,服务端匹配传入的值与上次是否一致，如果一致返回304否则返回新资源和新的ETag
### 本地存储
本地存储主要有以下几种,localStorage、sessionStorage、cookie、websql、indexDB.
1. localStorage
   1. 在前端设置,可以减少数据请求，长期存储。
2. sessionStorage
   1. 在前端设置，只存在当前会话中即重新打开浏览器则数据消失
3. cookie
   1. 在后端设置,保存在客户端本地文件,通过set-cookie设置且Cookie的内容自动在请求的时候被传递到服务器。
4. indexDB
   1. 为浏览器提供本地数据库,提供查找接口,还能建立索引  。
参考原文
    [浏览器缓存原理以及本地存储](https://segmentfault.com/a/1190000017185195)
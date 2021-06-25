
# 什么是微前端？
> Techniques, strategies and recipes for building a modern web app with multiple teams that can ship features independently. -- Micro Frontends
> 
> 微前端是一种多团队通过独立发布功能的方式来共同构建现代化web应用的技术手段和方法策略


## 为什么需要微前端？

> 微前端架构旨在解决单体应用在一个相对长的时间跨度下，由于参与的人员、团队的增多、变迁，从一个普通应用演变成一个巨石应用(Frontend Monolith)后，随之而来的应用不可维护的问题。这类问题在企业级 Web 应用中尤其常见。-- qiankun guide

- 前端遗留系统迁移
- 聚合前端应用
  
## 实施方式
架构目标           | 描述
------------------|---------------
a. 独立开发        | 独立开发，而不受影响
b. 独立部署        | 能作为一个服务来单独部署
c. 支持不同框架     | 可以同时使用不同的框架，如 Angular、Vue、React
d. 摇树优化        | 能消除未使用的代码
e. 环境隔离        | 应用间的上下文不受干扰
f. 多个应用同时运行 | 不同应用可以同时运行
g. 共用依赖        | 不同应用是否共用底层依赖库
h. 依赖冲突        | 依赖的不同版本是否导致冲突
i. 集成编译        | 应用最后被编译成一个整体，而不是分开构建


方式        | a | b | c | d | e | f | g | h | i
-----------|---|---|---|---|---|---|---|---|---
路由分发    | O | O | O | O | O | O |   |   |   
iFrame     | O | O | O | O | O | O |   |   |   
应用微服务化 | O | O | O |   |   | O |   |   |
微件化      | O | O |   |   | - | - | O | - |   
微应用化    | O | O |   | O | - | - | O | - | O 
纯 Web Components      | O | O |   | O | O | O | - | - | O 
结合 Web Components    | O | O | O | O | O | O |   |   | O 

图中的 O 表示支持，空白表示不支持，- 表示不受影响。

# 框架应用
|   | Monorepo | NPM包 | 动态加载模块 
-----|---|---|---|---
搭建难度|简单|中等|困难
代码是否独立|||✅|
分开构建||✅|✅|
分别部署||✅|✅|
例子| <li><a href="https://github.com/joeldenning/simple-single-spa-webpack-example">simple-webpack-example</a></li><li><a href="https://github.com/single-spa/single-spa-examples">single-spa-examples</a></li>|<a href="https://github.com/jualoppaz/single-spa-login-example-with-npm-packages">single-spa-login-example-with-npm-packages</a>|[SystemJS example](https://gitlab.com/TheMcMurder/single-spa-portal-example)|
## singleSPA

> Single-spa 是一个将多个单页面应用聚合为一个整体应用的 JavaScript 微前端框架。

优势:
 - 同一个页面使用多个框架
 - 独立部署每一个单页面应用
 - 渐进式迁移

### 拆分应用

## qiankun

> qiankun 是一个基于 single-spa 的微前端实现库，旨在帮助大家能更简单、无痛的构建一个生产可用微前端架构系统

特性:
 - 基于 Single-SPA封装,提供开箱即用API
 - 技术无关
 - 样式隔离
 - js沙箱
 - 资源预加载
 - ...
# reference
- [single-spa](https://github.com/single-spa/single-spa)
- [微前端](https://micro-frontends.org/)
- [可能是你见过最完善的微前端解决方案](https://zhuanlan.zhihu.com/p/78362028)
- [前端架构从入门到微前端](https://github.com/phodal/microfrontends)

# 什么是微前端？
> Techniques, strategies and recipes for building a modern web app with multiple teams that can ship features independently. -- Micro Frontends
> 
> 微前端是一种多团队通过独立发布功能的方式来共同构建现代化web应用的技术手段和方法策略


## 为什么需要微前端？

> 微前端架构旨在解决单体应用在一个相对长的时间跨度下，由于参与的人员、团队的增多、变迁，从一个普通应用演变成一个巨石应用(Frontend Monolith)后，随之而来的应用不可维护的问题。这类问题在企业级 Web 应用中尤其常见。-- qiankun guide

- 前端遗留系统迁移
- 聚合前端应用
  
## 实施方式

# 框架应用

## singleSPA

> Single-spa 是一个将多个单页面应用聚合为一个整体应用的 JavaScript 微前端框架。

优势:
 - 同一个页面使用多个框架
 - 独立部署每一个单页面应用
 - 渐进式迁移


### 类型

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
---
title: prototype
nav:
  title: 面试汇总
  path: /interview
group:
  title: js篇
  path: /js
---

## 创建对象几种方法

- 对象字面量
- 构函数
- Object.create()

```javascript
var o1 = { name: 'cc' };

//构造函数
function person(name) {
  this.name = name;
}
var p = new Person('cc');

//create方法
var p2 = { name: 'cc' };
var p3 = Object.create(p2);
```

[具体请参照原文](https://blog.csdn.net/qq_37674616/article/details/82220732)

## instanceof 原理

判断一个对象是否是构造函数的实例，即实例对象**proto**与构造函数的 Prototype 是否指向同一个原型对象。

```javascript
function _instanceof(left, right) {
  const prototype = right.prototype;
  left = left.__proto__;
  while (true) {
    if (left === null || left === undefined) {
      return false;
    }
    if (left === prototype) {
      return true;
    } else {
      left = left.__proto__;
    }
  }
}
```

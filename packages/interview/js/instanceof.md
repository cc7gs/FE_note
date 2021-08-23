---
nav:
  title: 面试汇总
  path: /interview
group:
  title: js篇
  path: /js
---

# instanceof 原理

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

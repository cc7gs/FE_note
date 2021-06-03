---
title: symbol
nav:
  title: 基础篇
  path: /basic
group:
  title: Js巩固篇
  path: /js
  order: 1
---

# Symbol

## Symbols 特征:

- Symbols 对于循环和其它地方不可见(比如：for-in object.keys)
- Symbols 是唯一的
- "全局 Symbols"

```ts
// 创建 symbols
const mySymbol = Symbol('object name');
const myObject = { firstName: 'raja', lastName: 'rao' };
const keys = Object.keys(myObject);
```

### 解决自定义方法与 api 冲突

```js
const includes = Symbol('will store custom includes');
Array.prototype[includes] = () => {
  console.log('inside includes func');
};
const arr = [1, 2, 3];
```

```ts
//测试:
console.log(arr.includes(1));
console.log(arr['includes'](1));
arr[includes](1);
```

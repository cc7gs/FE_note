---
title: fibonacci
nav:
  title: 面试汇总
  path: /interview
group:
  title: js篇
  path: /js
---

# 科普

斐波那契数列是以下一系列数字：

> 0, 1, 1, 2, 3, 5, 8, 13, 21, 34,... 在种子 0 和 1 之后，后续的每一个数字都是前面两个数字之和。

# 实现

## 正常递归版本

```javascript
function fibonacci(n) {
  if (n == 0 || n == 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```

## 动态规划版

```javascript
function fibonacci(n) {
  let a = (b = 1);
  for (let i = 3; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}
```

## 尾递归版

```javascript
function fibonacci(n, a = 1, b = 1) {
  if (n <= 1) {
    return b;
  }
  return fibonacci(n - 1, b, a + b);
}
```

注:该序列是从 1 开始斐波那契数列 [关于尾调用](http://es6.ruanyifeng.com/#docs/function#%E5%B0%BE%E8%B0%83%E7%94%A8%E4%BC%98%E5%8C%96)

## 记忆函数优化版

```javascript
function memo(fn) {
  var r = {};
  return function (n) {
    if (r[n] == undefined) {
      r[n] = fn(n);
    }
    return r[n];
  };
}
var fibonacci = memo(function (n) {
  if (n == 0 || n == 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
});
```

## 参考原文

[https://segmentfault.com/a/1190000007115162](https://segmentfault.com/a/1190000007115162) [https://zhuanlan.zhihu.com/p/27205391](https://zhuanlan.zhihu.com/p/27205391)

---
nav:
  path: /interview
  title: 面试汇总
group:
  title: js篇
  path: /js
---

# 数组去重

## 方式一  set

```javascript
function unique(arr) {
    return [...new Set(arr)]
};
```

## 方式二 indexof

```javascript
function unique(arr) {
    let res = [];
    arr.forEach(item => {
        if (res.indexOf(item) === -1) {
            res.push(item);
        }
    });
    return res;
}
```

## 方式三 includes

```javascript
function unique(arr) {
    let res = [];
    arr.forEach(item => {
        if (!res.includes(item)) {
            res.push(item);
        }
    });
    return res;
}
```

## 方式四 利用 reduce

```javascript
function unique(arr) {
    return arr.reduce((acc, cur) => acc.includes(cur) ? acc : [...acc, cur], []);
}
```

## 方式五  map函数

```javascript
function unique(arr) {
    let map = new Map();
    arr.forEach(num => {
        if (!map.has(num)) {
            map.set(num);
        }
    });
    return [...map.keys()]
}
```

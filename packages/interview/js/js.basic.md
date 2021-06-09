---
title: js基础
order: 1
nav:
  title: 面试汇总
  path: /interview
group:
  title: js篇
  path: /js
---

## []==[] 返回什么？

== 转换规则如下：

1. 首先判断两者类型是否相同，相同的话就是比较大小
2. 类型不同则会进行类型转换
3. null==undefined 返回 true
4. 如果有判断的是 string 和 number,则将字符串转换为 number;
5. 如果判断一方为 boolean,则转换为 number
6. 判断一方是对象,另一方是 string、number、symbol 则会把 object 转化为原始类型在进行比较
7. 如果两个操作数都是对象,则比较它们是不是同一个对象。如果不是同一个对象则返回 true,否则返回 false

```javascript
[] == []; //false 因为地址值不同
```

### []==![] ?

```javascript
[]==false
[]==0
Number([])==0  //true
```

### [1,2]+4?

    首先将数组通过toString转为字符串 1,2;因此结果为‘1,24’

### 4*[] 与 4*[1,2]

    对于除了加法外的运算符来说，只要有一方是数字则另一方就会被转化为数字

```javascript
4 * []; //==> 0
4 * [1, 2]; //NaN   Number([1,2])==>NaN
```

### 'a'++'b'?

> 'a'++'b' ==>'aNaN'

## symbol 是什么？ 解决什么问题？

- Symbol 是 es6 引入的新类型,它是一切非字符串的对象 key 的集合。
- 作用是生成唯一值,可以保证不会与其他属性名产生冲突。
- 不是对象、是原始数据类型，因此不能使用 new 关键字或者为其添加属性
- symbol 值永不相等,即使传入相同的参数
- 不能和其它类型值进行运算，可以显示转换字符串和 boolean

### 作用一,避免重写、对遍历隐藏属性

```javascript
let user = {};
let id = Symbol('id');
user[id] = 'symbol value';
user.id = 'ID Value';
console.log(user[id]); //symbol value
console.log(user.id); // ID value
//'隐藏' symbol 属性
console.log(Object.keys(user)); // ['id']
for (let key in user) {
  console.log(key);
} //['id']
```

### 全局 Symbol

```javascript
let name = Symbol('cc');

//从全局注册表中读取
let _name = Symbol.for('cc');

name === Symbol('cc'); //false
_name === Symbol.for('cc'); //true

//根据全局Symbol 反查名称
Symbol.keyFor(_name); // cc
Symbol.keyFor(name); //undefined
```

### 作用二,系统 symbol

javascript 使用了许多系统 symbol,这些 symbol 属性可以作为==symbol.\*==访问。我们可以使用它们改变一些内置行为。

- Symbol.iterator
- Symbol.toPrimitive
- ...等等

```javascript
let obj =
  {
    toString() {
      return '1';
    },
    valueOf() {
      return 1;
    },
    [Symbol.toPrimitive](hint) {
      console.log('toPrimitive', hint);
      return 'hint';
    },
  } + obj; //hint：number  ==> +'hinit' ==>NaN
obj + 200; //hint:default ==> 'hint'+200 ==>'hint200'
```

## 实现一个深拷贝

```js
/**
 * 深拷贝
 * @param {Object} obj
 */
function deepClone(obj = {}) {
  //边界判断
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  let result = obj instanceof Array ? [] : {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key]);
    }
  }
  return result;
}
```

## window.onload 与 DOMContentLoaded 区别

> 原文地址：http://javascript.info/onload-ondomcontentloaded

HTML 页面的生命周期有以下三个重要事件：

DOMContentLoaded —— 浏览器已经完全加载了 HTML，DOM 树已经构建完毕，但是像是 <img> 和样式表等外部资源可能并没有下载完毕。 load —— 浏览器已经加载了所有的资源（图像，样式表等）。 beforeunload/unload —— 当用户离开页面的时候触发。每个事件都有特定的用途

DOMContentLoaded —— DOM 加载完毕，所以 JS 可以访问所有 DOM 节点，初始化界面。 load —— 附加资源已经加载完毕，可以在此事件触发时获得图像的大小（如果没有被在 HTML/CSS 中指定） beforeunload/unload —— 用户正在离开页面：可以询问用户是否保存了更改以及是否确定要离开页面。

## 手写 bind 函数

```js
/**
 * 实现思路:
 *  1. 当不传入第一个参数时,则默认上下文环境为window
 *  2. 改变this 指向,让新的对象可以执行该函数，并能接受参数
 * func.call(thisArg,arg1,arg2,...)
 */
Function.prototype.myCall = function (context) {
  //如果调用者不是函数则抛出异常
  if (typeof this !== 'function') {
    throw new TypeError('Error');
  }
  //如果context,没有传，或者传入undefined null 则this 执行 window
  context = context || window;
  context.fn = this;
  const args = [...arguments].slice(1);
  const result = context.fn(...args);
  delete context.fn;
  return result;
};

/**
 * apply实现思路与call相同,只是参数处理方式不同
 * func.apply(thisArg,[arg1,arg2,...])
 */
Function.prototype.myApply = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error');
  }
  context = context || window;
  context.fn = this;
  let result = null;
  //如果传入参数则出入
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  //释放内存空间
  delete context.fn;
  return result;
};

/**
 * 实现思路如下:
 *  1. 对传入context的处理,如果不传或传null、undefined 则赋值为window
 *  2. 对于返回函数调用形式处理:
 *      2.1 普通函数调用
 *          对于该形式我们应该处理 f.bind(obj,2)(4)形式参数的处理
 *      2.2 new的方式调用
 *          对于该形式来说，this不会被外界传入改变
 */
Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('error');
  }
  const that = this;
  const args = [...arguments].slice(1);
  context = context || window;
  return function F() {
    if (this instanceof F) {
      return new that(...args, ...arguments);
    }
    return that.apply(context, args.concat(...arguments));
  };
};
/**
 * 测试代码如下
 *  */
function add(a, b) {
  console.log(this.name, 'this');
  return a + b;
}
var obj = {
  name: 'obj',
  sub(a, b) {
    return a + b;
  },
};
console.log(this, 'window or global');
var a1 = add(4, 2);
var a2 = add.call(this, 4, 2);
var a3 = add.call(obj, 4, 2);
var a4 = add.myCall(obj, 4, 2);
var a4 = add.myApply(obj, [4, 2]);
var a5 = add.myBind(obj, 4)(2);

console.log(a1, a2, a3, a4, a5, 'result');
```

## 节流与防抖

```js
const debounce = (fn, wait) => {
  let timer = null;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
};

function throttle(fn, delay) {
  let canRun = true;
  return (...args) => {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      fn.apply(this, args);
      cunRun = true;
    }, delay);
  };
}
```

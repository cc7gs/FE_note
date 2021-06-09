---
title: 阅读koa-compose后的感悟
nav:
  title: 面试汇总
  path: /interview
group:
  title: js篇
  path: /js
---

## 前篇

关于`compose`函数对于学过函数编程一定不陌生。在 redux 中也有应用。下面我们来实现一个 compose。场景:我们有三个函数,现在想要实现 1+2+3+4 结果。

```ts
const addOne = (num: number) => {
  console.log('addOne input value', num);
  return num + 1;
};
const addTwo = (num: number) => {
  console.log('addTwo input value', num);
  return num + 2;
};
const addThree = (num: number) => {
  console.log('addThree input value', num);
  return num + 3;
};
```

我们可以手动调用

```ts
addOne(addTwo(addThree(4)))

// 代码执行顺序如下:
/**
 * addThree input value 4
 * addTwo input value 7
 * addOne input value 9
 * 10
 * /
```

下面我们通过`compose`来组合上面函数的执行

```ts
function compose(...funcs) {
  return (val) => funcs.reduceRight((acc, cur) => cur(acc), val);
}

//test
compose(addOne, addTwo, addThree)(4);
```

我们已经完成一个简易的`compose`函数.下面我们有一个`sum`函数想这样做

```ts
function sum(a: number, b: number) {
  return a + b;
}
const sumValue = compose(addOne, addTwo, addThree, sum)(2, 2);
console.log(sumValue);
```

我们可以想到这样改造:

```ts
function compose(...funcs) {
  return (...args) => funcs.reduceRight((acc, cur) => cur(acc), ...args);
}
```

由于 reduceRight 初始化只能介绍一个参数,这样并不能达到我们预期。因此我们可以将最后一个函数拿出来执行完后将值赋给`reduceRight`

```ts
function compose(...funcs) {
  return (...args) => {
    const lastFn = arr.pop();
    const value = lastFn(...args);
    return arr.reduceRight((acc, cur) => cur(acc), value);
  };
}
```

优化:

1. 对`compose`参数校验处理

```ts
function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return (...args) => {
    const lastFn = funcs.pop();
    const value = lastFn(...args);
    return funcs.reduceRight((acc, cur) => cur(acc), value);
  };
}
```

2. 优化函数执行

```ts
function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(
    (acc, cur) =>
      (...args) =>
        acc(cur(...args)),
  );
}
```

## koa 中间件实现

对于下面场景我们想要打印如下结果:

> 打印 `arr` 1 2 3 4 5 6

```ts
const arr = [];
const stack = [];

stack.push((next) => {
  arr.push(1);
  next();
  arr.push(6);
});

stack.push((next) => {
  arr.push(2);
  next();
  arr.push(5);
});

stack.push((next) => {
  arr.push(3);
  next();
  arr.push(4);
});

//use
compose(stack)();
console.log(arr); // 123456
```

此时你可以`sleep`下思路如果去实现...

`compose`函数实现:

```ts
type Next = () => any;
type MiddleWare = (next: Next) => void;

function compose(middleware: MiddleWare[]) {
  return () => {
    let index = -1;
    dispatch(0);
    function dispatch(num: number) {
      if (num <= index) {
        return;
      }
      index = num;
      let fn: MiddleWare | undefined = middleware[index];
      if (num === middleware.length) fn = undefined;
      if (!fn) {
        return;
      }
      fn(dispatch.bind(null, index + 1));
    }
  };
}
```

## 支持异步

对于使用过`koa`的来说,`next`方法一定不陌生。

> app.use(async(context,next)=>{}) 现在我们想在在函数中`sleep`等异步函数操作.操作如下形式:

```ts
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

stack.push(async (next) => {
  arr.push(1);
  await next();
  arr.push(6);
});

stack.push(async (next) => {
  arr.push(2);
  sleep(100);
  await next();
  arr.push(5);
});

stack.push((next) => {
  arr.push(3);
  next();
  arr.push(4);
});
```

```ts
type Next = () => any;
type MiddleWare = (next: Next) => Promise<any>;

type INext = () => any;
type MiddleWare = (next: INext) => void;

function compose(middleware: MiddleWare[]) {
  return (next) => {
    let index = -1;
    return dispatch(0);
    function dispatch(num: number): Promise<any> {
      if (num <= index) {
        return Promise.reject(new Error('next() called multiple times'));
      }
      index = num;
      let fn: MiddleWare | undefined = middleware[index];
      if (num === middleware.length) fn = undefined;
      if (!fn) {
        return Promise.resolve();
      }
      try {
        return Promise.resolve(fn(dispatch.bind(null, index + 1)));
      } catch (error) {
        return Promise.reject(error);
      }
    }
  };
}
```

`use`

```js
async function run() {
  await compose(stack)();
  console.log(arr); // 123456
}
run();
```

## 优化

对于上面函数,目前我们不能通过外界传入中间件函数。

```ts
type Next = () => any;
type MiddleWare = (next: Next) => void;
type ComposedMiddleWare = (next?: Next) => Promise<any>;

function compose(middleware: MiddleWare[]): ComposedMiddleWare {
  return (next) => {
    let index = -1;
    return dispatch(0);
    function dispatch(num: number): Promise<any> {
      if (num <= index) {
        return Promise.reject(new Error('next() called multiple times'));
      }
      index = num;
      let fn: MiddleWare | undefined = middleware[index];
      if (num === middleware.length) fn = next;
      if (!fn) {
        return Promise.resolve();
      }
      try {
        return Promise.resolve(fn(dispatch.bind(null, index + 1)));
      } catch (error) {
        return Promise.reject(error);
      }
    }
  };
}
```

`调用`

```ts
async function run() {
  const fn = compose(stack);
  await fn(fn);
  console.log(arr); // 123 123456 456
}
run();

//use case 2
async function run() {
  const fn = compose(stack);
  await fn(async () => {
    arr.push('next');
  });
  console.log(arr); // 123 next 456
}
run();
```

## 业务应用

案例: 有一个上传列表支持批量上传，上传控制每次请求的并发数。每次请求前需要校验用户额度，还需要拉去列表中最新数据。

```ts
async function updateState(){
	awit compose([fn1,fn2,fn3])()；
	// 处理上传完成后之后逻辑
}
async function fn1(next){
	// 更新额度 ....
	await next();
}
async function fn2(next){
  // 获取最新额度 拉去列表数据...
 await next();
}
async function fn3(next){
	// 列表异步队列上传...
	// 完成后调用 next
	await next();
}
```

如果不拆分那么 `updateState`如下形式: 多个业务逻辑穿在一起此时函数也很庞大不容易去维护。

```ts
async function updateState() {
  const res = await fn1();
  // ...
  const res2 = await fn2();
  //...
  const res3 = await fn3();
  //...
  //...
}
```

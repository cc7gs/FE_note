# 介绍

## 什么是 Rx?

> **Ractive Extension** 也叫 **ReactiveX**,或者简称`Rx`,指的是实践响应式编程的一套工具。Rx 是一个大家族它包含 RxJava、RxPy 等，`RxJS是Rx用JavaScript语言实现`。

RxJs 擅长处理异步操作,因为它采用`推`的处理方式,当一个数据产生时，被推送给对应的处理函数,而这个处理函数`不用关心数据是同步产生还是异步产生`的。因此学习 RxJS 就是学习如何组合操作符来解决复杂问题。简而言之:

1.  RxJS 是使用 `Observables 的响应式编程的库`，它使编写异步或基于回调的代码更容易。
2.  可以将它看作一个事件处理的 Lodash
3.  ReactiveX 将`观察者模式`与`迭代器模式`以及函数编程相结合，从而满足了管理事件序列的理想方式的需求。

**函数编程特点**

- 纯函数
- 声明式
- 数据不可变性

**函数响应式编程优势** 5. 数据流抽象了很多现实问题 6. 擅长处理异步操作 7. 把复杂问题分解成简单问题的组合

### pull 与 push

pull 和 push 是两种不同的协议,它们描述了数据生产者(Producer)如何数据消费者(Consumer)通信

- `pull`:在 pull 系统中`Consumer`明确知道何时从`Producer`中接收数据,但是`Producer`不知道何时将数据发送给`Consumer`。每个 JavaScript 函数都是一个 Pull 系统。该函数是数据的生产者，并且调用该函数的代码通过从调用中“拉出” 单个返回值来使用它。

|      | Producer                  | Consumer                    |
| ---- | ------------------------- | --------------------------- |
| pull | 被动:在需要时产生数据。   | 主动:决定何时请求数据。     |
| push | 主动:自己的节奏生成数据。 | 被动:对收到对数据做反应处理 |

- `push`:在推送系统中，生产者确定何时将数据发送给消费者。消费者不知道何时接收该数据 Promise 是当今 JavaScript 中最常见的 Push 系统类型。

RxJs 引入 Observables 这是一个用于 JavaScript 的新 Push 系统,一个 Observable 是多个值的生产者，将它们“推送”到观察者（消费者）。

### Observable 与 Observer

`Observable` 就是"可以被观察的对象"即`被观察者`,而`Observer`就是`观察者`,连接他们的桥梁就是`Observable对象的函数 subscribe`。

> RxJs 的数据流就是 Observable 对象,采用了 观察者模式、迭代器模式

#### 观察者模式

观察者模式用将逻辑分为发布者和观察者。

- 其中发布者只管负责产生事件,它会通知所有注册的观察者,而不关心这些观察者是如何处理事件。
- 观察者可以被注册上某个发布者,只管接收到事件之后的处理,而不关心这些数据是如何产生。

```js
import { Observable } from 'rxjs';
//发布者 产生事件
const observable = new Observable((subscriber) => {
  subscriber.next('hello RxJs');
  subscriber.next('hi!');
});
//观察者接收事件
observable.subscribe(console.log);
```

#### 迭代器模式

迭代器是指能够遍历一个数据集合的对象,由于数据集合有多种:数组、树形结构、单向链表...。迭代器作用就是提供通用的接口,让我们可以完全不用关心这个数据集合实现形式。

#### 结论

> RxJs 中，作为迭代器的使用者,我们并不需要主动去从 Observable 中"pull"数据,我们只需要 subscribe 后,自然就能够接收到消息推送(`push`)。

### Hot Observable 与 Cold Observable

这两者都是对于 Observable 对象有有多对象订阅时,后者对于前者数据处理的不同形式。

- Hot Observable: 当后者订阅时,对于错过的数据不在订阅从最新的开始订阅。

> 对于 Hot Observable 概念上是有一个独立于`Observable`对象的*生产者*,而这个*生产者*的创建和`subscribe`调用没有关系。

```js
const producer = new Producer();
const hot$ = new Observable((observer) => {
  //让observable 去接受producer产生的数据
});
```

- Cold Observable: 当后者订阅时,对于已经错过的数据从新开始订阅。

> 每一个 Cold Observable 可以认为它对每一次`subscribe`都产生一个`生产者`,然后对这个生产者的数据通过*next*函数传递给订阅的`观察者(Observer)`

```js
const cold$ = new Observable((observer) => {
  //产生数据
  const producer = new Producer();
  //...
});
```

## 走近 RxJs

`RXJS一些概念`:

- Observable:表示未来可以调用的值或者集合
- Observer:一组回调,用来监听 Observable 传递的值
- Subscription:表示 Observable 的执行，主要用于取消执行
- Operators:是一个纯函数,它将一个 Observable 作为输入并生成另一个 Observable 作为输出
- Subject:等同于 EventEmitter，并且是将值或事件多播到多个观察者的唯一方法
- Schedulers:是集中式控制并发调度

首先给一个感官上面的认知，目前不必了解具体内容只需要知道它有那些后续我们来一起逐个攻破 💪。

### 搭建学习仓库

> npm init -y npm typescript ts-node ts-node-dev -D

> npm i rxjs @types/node @types/es6-shim

> npx tsc --init

`tsconfig.json`

```json
 "outDir": "./dist",    //打开该行
```

`package.json`

```json
"scripts": {
    "build-ts": "tsc",
    "dev": "ts-node-dev --respawn --transpileOnly ./src/index.ts"
  },
```

### 小试牛刀

```js
import { Observable } from 'rxjs';

const observable = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});

console.log('just before subscribe');
observable.subscribe({
  next(x) {
    console.log('got value ' + x);
  },
  error(err) {
    console.error('something wrong occurred: ' + err);
  },
  complete() {
    console.log('done');
  },
});
console.log('just after subscribe');
```

> npm run dev

[返回](./README.md)


# 介绍
## 什么是Rx?

> **Ractive Extension** 也叫 **ReactiveX**,或者简称`Rx`,指的是实践响应式编程的一套工具。Rx是一个大家族它包含 RxJava、RxPy等，`RxJS是Rx用JavaScript语言实现`。

 RxJs擅长处理异步操作,因为它采用`推`的处理方式,当一个数据产生时，被推送给对应的处理函数,而这个处理函数`不用关心数据是同步产生还是异步产生`的。因此学习RxJS就是学习如何组合操作符来解决复杂问题。简而言之:
 1. RxJS 是使用 `Observables 的响应式编程的库`，它使编写异步或基于回调的代码更容易。  
 2. 可以将它看作一个事件处理的Lodash
1. ReactiveX将`观察者模式`与`迭代器模式`以及函数编程相结合，从而满足了管理事件序列的理想方式的需求。

**函数编程特点**
 - 纯函数
 - 声明式
 - 数据不可变性

**函数响应式编程优势**
5. 数据流抽象了很多现实问题
6. 擅长处理异步操作
7. 把复杂问题分解成简单问题的组合
### pull与push
pull和push 是两种不同的协议,它们描述了数据生产者(Producer)如何数据消费者(Consumer)通信
- `pull`:在 pull 系统中`Consumer`明确知道何时从`Producer`中接收数据,但是`Producer`不知道何时将数据发送给`Consumer`。
每个JavaScript函数都是一个Pull系统。该函数是数据的生产者，并且调用该函数的代码通过从调用中“拉出” 单个返回值来使用它。

| |Producer | Consumer |
|--|--|--|
|pull|被动:在需要时产生数据。|主动:决定何时请求数据。|
|push|主动:自己的节奏生成数据。|被动:对收到对数据做反应处理|

- `push`:在推送系统中，生产者确定何时将数据发送给消费者。消费者不知道何时接收该数据
Promise 是当今JavaScript中最常见的Push系统类型。

RxJs 引入Observables这是一个用于JavaScript的新Push系统,一个Observable是多个值的生产者，将它们“推送”到观察者（消费者）。
### Observable与Observer
`Observable` 就是"可以被观察的对象"即`被观察者`,而`Observer`就是`观察者`,连接他们的桥梁就是`Observable对象的函数 subscribe`。

> RxJs的数据流就是Observable对象,采用了 观察者模式、迭代器模式

#### 观察者模式
观察者模式用将逻辑分为发布者和观察者。
- 其中发布者只管负责产生事件,它会通知所有注册的观察者,而不关心这些观察者是如何处理事件。
- 观察者可以被注册上某个发布者,只管接收到事件之后的处理,而不关心这些数据是如何产生。
```js
import {Observable} from 'rxjs'
//发布者 产生事件
const observable=new Observable(subscriber=>{
    subscriber.next('hello RxJs');
    subscriber.next('hi!');
})
//观察者接收事件
observable.subscribe(console.log)
```
#### 迭代器模式
迭代器是指能够遍历一个数据集合的对象,由于数据集合有多种:数组、树形结构、单向链表...。迭代器作用就是提供通用的接口,让我们可以完全不用关心这个数据集合实现形式。

### 结论
> RxJs中，作为迭代器的使用者,我们并不需要主动去从Observable中"pull"数据,我们只需要subscribe后,自然就能够接收到消息推送(`push`)。

## 走近RxJs
`RXJS一些概念`:
- Observable:表示未来可以调用的值或者集合
- Observer:一组回调,用来监听Observable传递的值
- Subscription:表示Observable的执行，主要用于取消执行
- Operators:是一个纯函数,它将一个Observable作为输入并生成另一个Observable作为输出
- Subject:等同于EventEmitter，并且是将值或事件多播到多个观察者的唯一方法
- Schedulers:是集中式控制并发调度  

首先给一个感官上面的认知，目前不必了解具体内容只需要知道它有那些后续我们来一起逐个攻破 💪。

### 搭建学习仓库
> npm init -y
> npm typescript ts-node ts-node-dev  -D

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
import {Observable} from 'rxjs';

const observable = new Observable(subscriber => {
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
  next(x) { console.log('got value ' + x); },
  error(err) { console.error('something wrong occurred: ' + err); },
  complete() { console.log('done'); }
});
console.log('just after subscribe');
```
> npm run dev

[返回](./README.md)
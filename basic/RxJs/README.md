> 这是一个学习RxJs 笔记仓库,通过书籍和实践总结出一个手册,如有错误可以击提issue 💪,如果觉得ok,请点个star 🙏, `送人玫瑰、手有余香`

# 目录
1. [什么是Rx?](#什么是Rx?)
2. [Observable](#被观察对象(Observable))
3. [操作符(Operators)](#操作符(Operators))
4. [搭建仓库](#搭建仓库)
5. [进阶篇]()

# 什么是Rx?
> **Ractive Extension** 也叫 **ReactiveX**,或者简称`Rx`,指的是实践响应式编程的一套工具。Rx是一个大家族它包含 RxJava、RxPy等，`RxJS是Rx用JavaScript语言实现`。

 RxJs擅长处理异步操作,因为它采用`推`的处理方式,当一个数据产生时，被推送给对应的处理函数,而这个处理函数`不用关心数据是同步产生还是异步产生`的。因此学习RxJS就是学习如何组合操作符来解决复杂问题。简而言之:
 1. RxJS 是使用 `Observables 的响应式编程的库`，它使编写异步或基于回调的代码更容易。  
 2. 可以将它看作一个事件处理的Lodash
1. ReactiveX将`观察者模式`与`迭代器模式`以及函数编程相结合，从而满足了管理事件序列的理想方式的需求。

> 关于Rx更多内容请👇这里

> [了解Rx](./concept.md)

**[⬆ back to top](#目录)**

# 搭建学习仓库
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

## 小试牛刀
```ts
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

**[⬆ back to top](#目录)**

# 基础
## 被观察对象(Observable)
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
```js

```
**[⬆ back to top](#目录)**

#### 特性

- 可观察值就像带有零参数的函数，但是将其概括化以允许多个值。

```js
function foo() {
  console.log('Hello');
  return 42;
}

const x = foo.call(); // same as foo()
console.log(x);
const y = foo.call(); // same as foo()
console.log(y);

//print

"Hello"
42
"Hello"
42
```
使用Observables编写上面的代码
```js
const foo=new Observable(subscriber=>{
    console.log('Hello')
    subscriber.next(42);
})

foo.subscribe(x=>{
    console.log(x);
})
foo.subscribe(y=>{
    console.log(y);
})
```
- 订阅一个Observable类似普通函数调用一样。
```js
console.log('before');
console.log(foo.call());
console.log('after');
```
这与Observables相同：
```js
console.log('before');
foo.subscribe(x=>{
    console.log(x);
})
console.log('after');
```
- 可观察对象能够同步或异步传递值。
一个可观察对象可以随着时间的推移“返回”多个值,但是函数返回值只有一个
```js
function foo() {
  console.log('Hello');
  return 42;
  return 100; // 永远不会发生
}
```

```js
import { Observable } from 'rxjs';
 
const foo = new Observable(subscriber => {
  console.log('Hello');
  subscriber.next(42);
  subscriber.next(100); // "return" another value
  subscriber.next(200); // "return" yet another
  setTimeout(() => {
    subscriber.next(300); // happens asynchronously
  }, 1000);
});
 
console.log('before');
foo.subscribe(x => {
  console.log(x);
});
console.log('after');

//print
before
Hello
42
100
200
after
300
```

> - func.call()意思是 同步给我一个值 

> - observable.subscribe()表示 给我同步或异步提供任意数量的值


**[⬆ back to top](#目录)**

#### 核心概念

- 创建可观察物
```js
import { Observable } from 'rxjs';

const observable = new Observable(function subscribe(subscriber) {
  const id = setInterval(() => {
    subscriber.next('hi')
  }, 1000);
});

```
- 订阅可观察物

>订阅Observable就像调用一个函数，提供将数据传递到的回调。

```js
observable.subscribe(x => console.log(x));
```
- 执行可观察的
可观察的执行可以提供三种类型的值：
1. next：发送一个值，例如数字，字符串，对象等。
2. error：发送JavaScript错误或异常。
3. complete：不发送值。

```js
import { Observable } from 'rxjs';
 
const observable = new Observable(function subscribe(subscriber) {
  try {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    subscriber.complete();
  } catch (err) {
    subscriber.error(err); // delivers an error if it caught one
  }
});
```
- 处置可观察物
> 订阅后，您将获得一个Subscription，代表正在进行的执行。只需调用unsubscribe()即可取消执行。
```js
import { from } from 'rxjs';

const observable = from([10, 20, 30]);
const subscription = observable.subscribe(x => console.log(x));
// Later:
subscription.unsubscribe();
```
例如，这是我们通过以下方式清除间隔执行集的方式setInterval：
```js
const observable = new Observable(function subscribe(subscriber) {
  // Keep track of the interval resource
  const intervalId = setInterval(() => {
    subscriber.next('hi');
  }, 1000);

  // Provide a way of canceling and disposing the interval resource
  return function unsubscribe() {
    clearInterval(intervalId);
  };
});
```

去除Observable,下面👇同样可以实现同等功能,只是存在得安全性和组合性差。

```js
interface Sub{
  next:(v:any)=>void
}
function subscribe(subscriber:Sub){
  const intervalId=setInterval(()=>{
    subscriber.next('h1')
  },1000)
  return function unsubscribe(){
    clearInterval(intervalId)
  }
}
const unsubscribe =subscribe({next:(x)=>{console.log(x)}});

//later
unsubscribe();
```
**[⬆ back to top](#目录)**
## 观察者(Observer)
Observable对象的函数 `subscribe`中的方法就是观察者。
```js
function observer(x){}
xxx.subscribe(observer);
```
## Subscription
订阅代表一次性资源的对象,通常是指Observable执行。它还有一个方法 `unsubscribe`它不带任何参数，而只是释放该订阅所拥有的资源。
```js
import { interval } from 'rxjs';
 
const observable1 = interval(400);
const observable2 = interval(300);
 
const subscription = observable1.subscribe(x => console.log('first: ' + x));
const childSubscription = observable2.subscribe(x => console.log('second: ' + x));
 
subscription.add(childSubscription);
 
setTimeout(() => {
  // Unsubscribes BOTH subscription and childSubscription
  subscription.unsubscribe();
}, 1000);
```
## 操作符(Operators)
> 管道运算符是一个将Observable作为其输入并返回另一个Observable的函数。这是一个纯粹的操作：以前的Observable保持不变

```js
import {from} from 'rxjs'
import {map,filter} from 'rxjs/operators'

import {addItem} from './utils'

let numersObservable=from([1,2,3,4,5]);
let squaredNumbers=numersObservable.pipe(
    filter(val=>val>2),
    map(val=>val*val)
);

let subscription=squaredNumbers.subscribe(result=>{
    addItem(result)
})
subscription.unsubscribe();
 
```
## Subject
Subject 就像一个可观察对象(Observable),但它传播给多个观察者。
```js
import {Subject} from 'rxjs'

const subject=new Subject<number>();

subject.subscribe({next:(x)=>{console.log('观察这A',x)}})

subject.subscribe({next:(x)=>{console.log('观察者B',x)}})

subject.next(1);
subject.next(2);
 
// Logs:
//观察这A 1
//观察者B 1
//观察这A 2
//观察者B 2
```
## Schedulers
调度程序控制何时开始订阅以及何时传递通知。它由三个部分组成
- 调度程序是一种数据结构。
- 调度程序是一个执行上下文。
- 调度程序具有（虚拟）时钟

> 调度程序使您可以定义可观察对象将在哪些执行上下文中向其观察者传递通知
```js
import { Observable, asyncScheduler } from 'rxjs';
import { observeOn } from 'rxjs/operators';
 
const observable = new Observable((observer) => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
}).pipe(
  observeOn(asyncScheduler)
);
 
console.log('just before subscribe');
observable.subscribe({
  next(x) {
    console.log('got value ' + x)
  },
  error(err) {
    console.error('something wrong occurred: ' + err);
  },
  complete() {
     console.log('done');
  }
});
console.log('just after subscribe');
```


> 关于搭建环境可以👇
> [ts+webpack 搭建环境](https://github.com/cc7gs/frontEnd_note/tree/master/tools/webpack/demo-ts)

**[⬆ back to top](#目录)**

# 参考

[官方网站入门手册](https://rxjs-dev.firebaseapp.com/guide/overview)

[深入浅出RxJS 程墨](https://book.douban.com/subject/30217949/)
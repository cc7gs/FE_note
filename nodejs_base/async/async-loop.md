
[toc]
# 什么是单线程，和异步的关系

通俗的将单线程就是同一个时间内只做一件事,这样的好处就是**避免DOM渲染冲突**。
而**异步则是对页面渲染阻塞的解决方案**,要想彻底搞懂异步,我们首先要对异步的执行过程进行了解,即**事件循环机制**
![原文图](https://user-gold-cdn.xitu.io/2017/11/21/15fdd88994142347?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

# 什么是event-loop
请看原文:https://juejin.im/post/59e85eebf265da430d571f89


## 事件循环、宏任务、微任务:
不同的任务源会被分配到不同的 **Task**队列中，任务源可以分为**微任务（microtask)**和**宏任务（macrotask)**。在ES6规范中，microtask 称为 jobs，macrotask 称为 task.

**下面配上原文图:**
![原文图](https://user-gold-cdn.xitu.io/2017/11/21/15fdcea13361a1ec?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- 首先执行同步代码，这属于宏任务
- 当执行完所有同步代码后，执行栈为空，查询是否有异步代码需要执行
- 执行所有微任务
- 当执行完所有微任务后，如有必要会渲染页面
然后开始下一轮 Event Loop，执行宏任务中的异步代码，也就是 setTimeout 中的回调函数

==**微任务包括:**== process.nextTick,promise,MutationObserver。
==**宏任务包括:**== 包括整体代码script,setTimeout,setInterval,setImmediate,I/O,UI rendering.


# nodejs的事件循环
原文地址: https://github.com/SunShinewyf/issue-blog/issues/34#issuecomment-371106502

![yck的图](https://user-gold-cdn.xitu.io/2018/11/13/1670c3fe3f9a5e2b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- timers阶段: 这个阶段执行setTimeout和setInterval预定的callback;
- I/O callbacks 阶段: 执行除了 close事件的callbacks、被timers设定的callbacks、setImmediate()设定的callbacks这些之外的callbacks;
- idle, prepare 阶段: 仅node内部使用;
- poll 阶段: 
  - 回到timeer阶段执行回调
  - 执行I/O回调
- check 阶段: 执行setImmediate() 设定的callbacks;
- close callbacks 阶段: 执行socket.on('close', ...)这些 callback

## setTimeout(fn,0)的含义是什么?

首先它**不会立即执行**。它是指定某个任务在主线程最早可得的空闲时间执行，意思就是不用再等多少秒了，只要主线程执行栈内的同步任务全部执行完成，栈为空就马上执行
```javascript
console.log('开始执行');
setTimeout(()=>{
    console.log('setTimeout');
},0);
console.log('执行完成');

```
> 开始执行
> 执行完成
> setTimeout

## setTimeout(fn,0) Vs setImmediate Vs process.nextTick()

### setTimeout(fn,0) Vs setImmediate
- setTimeout(fn,0)在timer阶段执行，并且是在poll阶段进行判断是否达到指定的time时间才会执行
- setImmediate在check阶段才会执行
两者的执行顺序要根据当前的执行环境才能确定，根据官方文档总结得出的结论是：

- 如果两者都在主模块（main module）调用，那么执行先后取决于进程性能，即随机。
- 如果两者都不在主模块调用（即在一个 IO circle 中调用），那么setImmediate的回调永远先执行。
### setImmediate Vs process.nextTick()
- setImmediate()属于check观察者，其设置的回调函数，会插入到下次事件循环的末尾，每次事件循环只执行链表中的一个回调函数。
- process.nextTick()所设置的回调函数会存放到数组中，一次性执行所有回调函数。
- process.nextTick()调用深度的限制，上限是1000，而setImmediate没有；
- 
**主模块两者打印则随机**
```javascript
/**
 * 首先 setTimeout(fn,0)===setTimeout(fn,1)
 * 如果进入事件循环所花费的大于1ms时间,那么timer阶段会直接执行setTimeout
 * 如果准备时间花费小于1ms,那么setImmediate回调先执行
 */
setTimeout(() => {
    console.log('setTimeout')

}, 0);
setImmediate(()=>{
    console.log('setImmediate');
    
})
```
**IO circle中调用，那么setImmediate的回调永远先执行**
```javascript
const fs = require('fs')

fs.readFile(__filename, () => {
    setTimeout(() => {
        console.log('timeout');
    }, 0)
    setImmediate(() => {
        console.log('immediate')
    })
})
```

# 结尾
**声明:**本文都是摘抄网上一些好的文章，杂合而成，如何侵权请留言
**优秀原文**：
[Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)
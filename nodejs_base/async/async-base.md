[toc]
# 入门 async
**async 函数是Generator函数的语法糖，在函数内部使用await来表示异步。**
**特点:**
1. async 函数 返回一个promise对象
2. 如何返回的不是Promsie对象则会被Promise.resolve() 包装返回
3. async 函数可以优雅的处理then链

==先做总结后面会对该特征一一论证==

## 一起看代码

**async 函数 返回一个promise对象**
```javascript

/**
 * 1. async 函数返回一个Promise对象
 * 2. 函数内部 return 返回的值会被 Promise.resolve()包装
 * 3. 函数内部异常，会被 catch方法接收到。
 */
async function test() {
    return '1';
}
async function test1() {
    throw new Error('error');
}
//测试如下:
test();// Promise { '1' }

test1().then(v=>console.log(v,'value')).catch(e=>console.log(e,'捕获到异常'));

```

# await 到底如何执行

 await 是一个运算符,用于组成表达式,await 表达式的运算结果取决于它等的东西。
 1. 如果它等的不是一个Promise 对象,那么await 表达式的运算结果就是它等的东西
 2. 如果它等到的是一个Promise对象，await就忙起来了,**它会阻塞后面的代码,等着Promise对象 resolve**,然后得到resolve值,作为await表达式的运算结果.
 3. await 会**先执行等待的函数**，而不是直接让出线程阻塞后面的代码

**await 会先执行等待的函数，而不是直接让出线程阻塞后面的代码**

==提示:==
看下面代码 **async2 start** 与 **scriptend**那个先打印.

```javascript
console.log('script start');
async function async1(){
    console.log('async1 start');
    await async2();
    console.log('async end');
}
async function async2(){
    console.log('async2 start')
}
async1();
console.log('script end');
//结果如下:
/* 
script start
async1 start
async2 start
script end
async end
*/
```
**如果它等的不是一个Promise 对象,那么await 表达式的运算结果就是它等的东西**

```javascript
console.log('script start');
async function async1(){
    console.log('async1 start');
    let wait=await async2();
    console.log('await等待的值：',wait);
    console.log('async end');
}
async function async2(){
    console.log('async2 start')
    return 'async value';
}
async1();
console.log('script end');
/*
script start
async1 start
async2 start
script end
await等待的值： async value
async end
*/
```
==提示:==
async2 返回的不是Promise对象 则 await后面的语言会打印

**如果它等到的是一个Promise对象，await就忙起来了,它会阻塞后面的代码,直到等待的Promsie 实现承诺**
==提示:== await 后面的代码不会被执行
```javascript
console.log('script start');
async function async1(){
    console.log('async1 start');
    let wait=await async2();
    console.log('await等待的值：',wait);
    console.log('async end');
}
async function async2(){
    console.log('async2 start')
    return new Promise((resolve,reject)=>{
        console.log('new Promsie in async2');    
    })
}
async1();
console.log('script end');
/*
script start
async1 start
async2 start
new Promsie in async2
script end
*/
```
# await 优雅的处理then链

 **案例:** 假设一个业务,分步骤完成,每个步骤都是异步,而且依赖于每一个步骤,即上个步骤做完后才能做下一个步骤

``` javascript
//用 setimeout模拟异步数据请求
function takeLongTime(n){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve(n+200)
        },n);
    })
}
//下面是每个步骤
function setp1(n){
    console.log(`step1 with ${n}`);
    return takeLongTime(n);
}
function setp2(n){
    console.log(`step2 with ${n}`);
    return takeLongTime(n);
}
function setp3(n){
    console.log(`step3 with ${n}`);
    return takeLongTime(n);
}
```
对业务的处理代码如下：
```javascript

function doIt(){
    console.time('doIt');
    const time1=300;
    setp1(time1)
        .then(time2=>setp1(time2))
        .then(time3=>setp1(time3))
        .then(result=>{
            console.log('result is',result);
            console.timeEnd('doIt');
        });
}
doIt();
/*
script start
step1 with 300
step1 with 500
step1 with 700
result is 900
doIt: 1529.517ms
*/
```
**现在我们用 async改写上面的doIt函数**
```javascript 
async function doIt(){
    console.time('doIt');
    const time1=300;
    const time2=await setp1(time1);
    const time3=await setp1(time2);
    const result=await setp1(time3);
    console.log('result',result);
    console.timeEnd('doIt');
}
doIt();
```
原文中左右最后那个demo对上面案例做出需求更改，即每个任务都依赖上个任务的结果。
# 结尾
 以上是我对 边城作者原文后实战所得的一些自己理解,若理解有误大家可以评论区探讨。

[原文地址](https://segmentfault.com/a/1190000007535316)
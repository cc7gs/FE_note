/**
 * async 函数返回一个Promise对象
 * 函数内部 return 返回的值会被 Promise.resolve()包装
 * 函数内部异常，会被 catch方法接收到。
 */
async function test() {
    return '1';
}
async function test1() {
    throw new Error('error');
}
//测试如下:
// console.log(test());
// test1().then(v=>console.log(v,'value')).catch(e=>console.log(e));

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
// async1();
// console.log('script end');


/**
 * 
 * 当 await 后跟的是Promise对象时，
 * 只有等到所有 await中 promise执行完后，才执行then回调 
 */
const delay = t => new Promise(resolve => setTimeout(resolve, t));
async function f() {
    await delay(1000).then();
    await delay(2000);
    return 'done';
}
// 测试如下:
// f().then(v=>console.log(v)); //3s 后执行打印
// console.log('我先被执行');

/**
 * 当 await后跟的是有状态的Promise时,
 * 此时之后所有的await都不会被执行 
 */
// let a;
async function func() {
    await Promise.reject('有返回值');
    a = await 1;
    console.log('result  ...');
}

// func()
//     .then(v => console.log(v, '-----------', a))
//     .catch(e => console.log(e));
//输出 error，而 then方法不会被执行
/**
 * 通过 try-catch 对异常捕获
 * 使得后面的 await被执行
 */
let a;
async function funcTryCatch() {
    try {
        await Promise.reject('error');
        
    } catch (error) {
        console.log('error,from try-cath')        
    }
    a = await 1;
    return a;
}
//测试:
// funcTryCatch()
//     .then(v => console.log(v, '-----------', a))
//     .catch(e => console.log(e));

// let b=0;
// let bFunc=async()=>{
//     b+=await 10;
//     console.log('2',b);
//     return b;
// }
// bFunc().then(v=>console.log(v,'value'));
// b++;
// console.log('1',b);

/**
 * a 方法的值依赖 b方法的返回值
 */
function one(){
    return 'a';
}
function two(){
    return 'b';
}
async function total(){
    let a= await one()
    console.log(a,'---a---');
    let b=await two();
    console.log(b,'---b---')
    // return a+b;
}
// console.log(total(),'total--');
// total().then(res=>console.log(res,'res---'));


/*
await优雅处理 then
*/
// 案例: 假设一个业务,分步骤完成,每个步骤都是异步,而且依赖于每一个步骤

function takeLongTime(n){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve(n+200)
        },n);
    })
}
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
// function doIt(){
//     console.time('doIt');
//     const time1=300;
//     setp1(time1)
//         .then(time2=>setp1(time2))
//         .then(time3=>setp1(time3))
//         .then(result=>{
//             console.log('result is',result);
//             console.timeEnd('doIt');
//         });
// }
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

/**
 * await 会让出线程,执行函数外的同步代码
 * Promise是微任务(microtask) 优先于setTimeout宏任务(macrotask)
 * 
 */
console.log('script start');
async function async1(){
     let a=await async2();
    console.log('async1 end',a);
}

async function async2(){
    console.log('async2 end');
   return 12;
}

async1();

setTimeout(() => {
    console.log('setTimeout');
}, 0);

 new Promise(resolve=>{
     console.log('Promise');
     resolve(1);
 })
 .then((res)=>{
     console.log('Promise1',res);
 })
 .then(res=>{
     console.log('Promise2',res);
 })
console.log('script end');

//---------------------------------------------------------------------

// new Promise((resolve,reject)=>{
//     console.log('async2 end')
//     resolve(Promise.resolve())
// })
// .then((res)=>{
//     console.log('async1 end',res);
// })


//-----------------------------------------------------------------------

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

const PENDING='pending';
const RESOLVED='resolved';
const REJECTED='rejected';
function MyPromise(fn){
    //绑定this 让 下面函数中回调不丢失 
    const that=this;
    that.state=PENDING;
    that.value=null;
    that.resolvedCallBacks=[];
    that.rejectedCallBacks=[];
    function resolve(value){
        if(that.state===PENDING){
            that.state=RESOLVED;
            that.value=value;
            //执行 then中的方法
            that.resolvedCallBacks.map(call=>call(that.value))
        }
    }
    function reject(value){
        if(that.state===PENDING){
            that.state=REJECTED;
            that.value=value;
            that.rejectedCallBacks.map(call=>call(that.value))
        }
    }
    //执行promise 中的函数
    try {
        console.log('new Promise');        
        fn(resolve,reject);
    } catch (error) {
        reject(error);
    }
}
MyPromise.prototype.then=function(onFulfilled,onRejected){
    console.log('执行 then方法');
    const that=this;
    onFulfilled=typeof onFulfilled==='function'?onFulfilled:f=>f;
    onRejected=typeof onRejected==='function'?onRejected:error=>{throw error}
    if(that.state===PENDING){
        console.log('将 then中方法放到 数组中');
        that.resolvedCallBacks.push(onFulfilled);
        that.rejectedCallBacks.push(onRejected);
    }
   
    //将then中的方法放到数组中
    if(that.state===RESOLVED){
        onFulfilled(that.value);
    }
    if(that.state===REJECTED){
        onRejected(that.value);
    }
}

/**
 * 
 */

console.log('外层执行环境');
let p=new MyPromise((resolve,reject)=>{
    console.log('promise 回调函数执行');
    setTimeout(()=>{resolve('1')},0);
    console.log('resolve 后面的语句');
});
p.then((res)=>{console.log(res+' success')});

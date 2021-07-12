/* eslint-disable @typescript-eslint/no-invalid-this */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-param-reassign */
/* eslint-disable no-extend-native */
/**
 * 实现思路:
 *  1. 当不传入第一个参数时,则默认上下文环境为window
 *  2. 改变this 指向,让新的对象可以执行该函数，并能接受参数
 * func.call(thisArg,arg1,arg2,...)
 */
Function.prototype.myCall=function(context){
    // 如果调用者不是函数则抛出异常
    if(typeof this!=='function'){
        throw new TypeError('Error');
    }
    // 如果context,没有传，或者传入undefined null 则this 执行 window
    context=context || window;
    context.fn=this;
    const args=[...arguments].slice(1);
    const result=context.fn(...args);
    delete context.fn;
    return result;
}

/**
 * apply实现思路与call相同,只是参数处理方式不同 
 * func.apply(thisArg,[arg1,arg2,...])
 */
Function.prototype.myApply=function(context){
    if(typeof this !=='function'){
        throw new TypeError('Error');
    }
    context=context||window;
    context.fn=this;
    const result=null;
    // 如果传入参数则出入
    if(arguments[1]){
        result=context.fn(...arguments[1]);
    }else{
        result=context.fn();
    }
    // 释放内存空间
    delete context.fn;
    return result;
}

/** 
 * 实现思路如下:
 *  1. 对传入context的处理,如果不传或传null、undefined 则赋值为window
 *  2. 对于返回函数调用形式处理:
 *      2.1 普通函数调用
 *          对于该形式我们应该处理 f.bind(obj,2)(4)形式参数的处理
 *      2.2 new的方式调用   
 *          对于该形式来说，this不会被外界传入改变
*/
Function.prototype.myBind=function bind(context){
    if(typeof this !=='function'){
        throw new TypeError('error');
    }
    const that=this;
    const args=[...arguments].slice(1);
    context=context||window;
    return function F(){
        if(this instanceof F){
            return new that(...args,...arguments);
        }
        return that.apply(context,args.concat(...arguments));
    }
}
/**
 * 测试代码如下
 *  */
function add(a,b){
    console.log(this.name,'this');
    return a+b;
}
const obj={
    name:'obj',
    sub(a,b){
        return a+b;
    }
}
console.log(this,'window or global');
const a1=add(4,2);
const a2=add.call(this,4,2);
const a3=add.call(obj,4,2);
const a4=add.myCall(obj,4,2);
const a42=add.myApply(obj,[4,2]);
const a5=add.myBind(obj,4)(2);

console.log(a1,a2,a3,a4,a5,a42,'result');
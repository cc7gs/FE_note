> 本片文章主要通过实现`RxJs`一些简单操作符，来进一步了解`RxJs`
**本篇文章可以学到什么?**
1. 深入了解`Observable`
2. js 基础知识(类、原型)

# Observable面纱
Observable 即RxJs世界中的**生产者**:
 1. 它其实是一个构造函数并接收订阅者的参数，
 2. 提供实例方法让其可以订阅(forEach)

```js
function Observable(forEach){
    this._forEach=forEach
}
```
**⚠️**:这里使用forEach代替`subscribe`,该函数功能如下:
1.  接收参数形式有两种:
    1. `onNext`、`onError`,`onCompleted`函数，
    2. 或者 `{onNext(){},onError(){},onCompleted(){}}`
2. 调用构造函数并传递如下格式数据`{onNext(){},onError(){},onCompleted(){}}`
```js
Observable.prototype={
    forEach(onNext,onError,onCompleted){
        // call is forEach(()=>{},()=>{},..)
        if(typeof onNext==='function'){
            return this._forEach({
                onNext,
                onError:onError || function(){},
                onCompleted:onCompleted|| function(){}
            })
        }
        // call is forEach({onNext:()=>{},onError:()=>{}})
        else if(typeof onNext==='object'){
            return this._forEach(onNext)
        }else{
            Error('无效参数')
        }
    }
}
```
🌰: 使用如下
```js
const observable=new Observable(subscriber=>{
    subscriber.onNext(1);
    setTimeout(()=>{
        subscriber.onCompleted()
    },1000)
})
observable.forEach({
    onNext(e){
        console.log('onNext',e)
    },
    onError(){

    },
    onCompleted(){
        console.log('completed')
    }
})
```
# 实现 fromEvent功能
1. 接收参数`dom节点`与`事件名称`
2. 返回 `Observable`实例
3. 返回的实例提供`dispose`方法用于取消监听

```js
Observable.fromEvent=function(dom,eventName){
    return new Observable(function forEach(observer){
        const handler=(e)=>observer.onNext(e)

        dom.addEventListener(eventName,handler)

        // subscription
        return {
            dispose:()=>{
                dom.removeEventListener(eventName,handler);
                observer.onCompleted()
            }
        }
    })
}
```
# 实现其它功能函数
1. 处理该功能并向下传递`onNext`
2. 返回`Observable`对象实例

**Tip:**返回实例的目前是为了链式调用

```js
Observable.prototype={
    // ...
    map(projectionFunction){
        return new Observable(({onNext,...otherProps})=>{
           return this.forEach({
               onNext:(x)=>onNext(projectionFunction(x)),
               ...otherProps
           })
        })
    }, 
    filter(conditionFunction){
        
        return new Observable(observer=>{
           return this.forEach(
                (x)=>{
                    if(conditionFunction(x)){
                        observer.onNext(x)
                    }
                },
                (e)=>observer.onError(e),
                ()=>observer.onCompleted()
            )
        })
    },
    take(num){
        return new Observable(observer=>{            
            let counter=0;
            const subscription= this.forEach(
                function onNext(v){
                    observer.onNext(v);
                    counter++;
                    if(counter===num){
                        observer.onCompleted();
                        subscription.dispose();
                    }
                },
                function onError(e){
                    observer.onError(e)
                },
                function onCompleted(){
                    observer.onCompleted()
                }
            );
            return subscription;
        })
    }
}
```
# 应用

```js
const btn=document.getElementById('clickBtn');

const $btn=Observable.
    fromEvent(btn,'click').
    filter(e=>e.pageX>20).
    map(e=>e.pageX+"px").
    take(1)

const subscription=$btn.forEach({
    onNext(e){
        console.log('next',e);
    },
    onError(e){

    },
    onCompleted(){
        console.log('completed')
    }
})
```
🤔: 在上面的`Demo`中链式调用的顺序入怎样的呢？

----

上面是本篇文章的全部内容,这只是一个简单的`demo`和基础操作符的实现,其它操作符可以自行探索～

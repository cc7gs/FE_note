> [源码地址](./code/promise.ts)

# 从一个简单案例讲起

> [promise 基本概念](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

🌰
 
```ts
console.log('1. start');
const promise=new Promise((resolve,reject)=>{
  console.log('2. enter Executor');
  resolve('hello promise');
})

promise.then(res=>{
  console.log(res,'success');
  console.log('4. resolve');
})
.catch(e=>{
  console.log(err,'reason')
});
console.log('3. end');
```
下面我们来分析promise基本结构与准则:

1. 构造函数先被执行
2. 有成功方法、与失败方法
3. 有then方法
4. 有catch方法

```ts
class MyPromise{
  private value;

   constructor(executor) {
        this.value = null;
        try {
            executor(this.resolve.bind(this), this.reject.bind(this));
        } catch (error) {
            this.reject(error)
        }
   }
   private resolve(value) {}
   private reject(reason) {}
   public then(onFulfilled?: Function, onRejected?: Function) {}
   public catch(errorCallback:Function) {}

}
```
## promise 状态
![](https://mdn.mozillademos.org/files/8633/promises.png)

  1. 只有padding 状态才可以转化至成功、失败状态。
  2. then方法可以访问成功或者失败方法
```ts
class MyPromise{
  
  private static PENDING = 'pending';
  private static FULFILLED = 'fulfilled';
  private static REJECTED = 'rejected';
  
  private status;

    constructor(executor){
      this.value=null;
      //初始状态为等待
      this.status=PENDING;
      //...
    }
    private resolve(value) {
        if (this.status === MyPromise.PENDING) {
            this.status = MyPromise.FULFILLED;
            this.value = value;
        }
    }
    private reject(reason) {
        if (this.status === MyPromise.PENDING) {
            this.status = MyPromise.REJECTED;
            this.value = reason;
        }
    }
    then(onFulfilled?: Function, onRejected?: Function) {
      if (this.status === MyPromise.FULFILLED) {
          onFulfilled(this.value); 
      }
      if (this.status === MyPromise.REJECTED) {
         onRejected(this.value);
       }
    }
}
```


到此一个简单Promise已经实现，收工～。👋 👋 👋

# 完善promise
## 支持异步方法调用

🌰:
```ts
const promise=new Promise((resolve,reject)=>{
  setTimeout(()=>{
    resolve('hello promise');
  },1000)
}).then(res=>{
  console.log(res,'success')
})
```
```ts
class MyPromise{
  //...
  // 存放 padding 状态回调
  private callbacks: ICallbackItem[];
  
  constructor(executor){
    // ...
    this.callbacks=[];

  }

  private resolve(value){
    if (this.status === MyPromise.PENDING) {
      // ...
        this.callbacks.map((callback) => {
          callback.onFulfilled(value)
        })
    }
  }

  private reject(reason){
    if (this.status === MyPromise.PENDING) {
      // ...
      this.callbacks.map(callback => {
          callback.onRejected(reason);
      })
    }
  }
 then(onFulfilled?: Function, onRejected?: Function) {
    if (this.status === MyPromise.PENDING) {
      this.callbacks.push({
          onFulfilled:value=>{
              onFulfilled(value)
          },
          onRejected:(value)=>{ 
              onRejected(value)
          }
      })
    } 
    // ...
  }
}
```

细心小伙，已经发现这不就是`发布订阅模式`～，恍然大悟。狗头）
 
 ##  then 链式调用
 🌰:

```ts
const promise=new Promise((resolve,reject)=>{
  setTimeout(()=>{
    resolve('hello promise');
  },1000)
}).then(res=>{
  console.log(res,'first')
  return 'name'
}).then(res=>{
  console.log('res','second')
})
```
1. 当返回值是普通值时则调用新　promise 方法。
2. 当返回值是promise 时则将执行结果调用新 promise方式。


```ts
class MyPromise{
  // ...
   then(onFulfilled?: Function, onRejected?: Function) {
    
    return new MyPromise((resolve, reject) => {
        if (this.status === MyPromise.PENDING) {
          this.callbacks.push({
              onFulfilled:value=>{
                const result=onFulfilled(value); 
                if(result instanceof MyPromise){
                  result.then(resolve,reject)
                }else{
                  resolve(result)
                }
              },
              onRejected:(value)=>{
                const result=onRejected(value);
                if(result instanceof MyPromise){
                    result.then(resolve,reject)
                }else{ 
                    resolve(result)
                }
              }
          })
        } 
        if (this.status === MyPromise.FULFILLED) {

          /**
           * @description: 等待实例创建完成执行
           */
          setTimeout(()=>{
            const result=onFulfilled(this.value); 
            if(result instanceof MyPromise){
              result.then(resolve,reject)
            }else{ 
              resolve(result)
            };
          })
        }
        if (this.status === MyPromise.REJECTED) {
          setTimeout(()=>{
            const result=onRejected(this.value); 
            if(result instanceof MyPromise){
              result.then(resolve,reject)
            }else{ 
              resolve(result)
            };
          })
       }
    })
   }
}
```

上面代码有很多冗余代码,提取转化版：

```ts 
class MyPromise{
  // ...
   then(onFulfilled?: Function, onRejected?: Function) {
   
    return new MyPromise((resolve, reject) => {
        if (this.status === MyPromise.PENDING) {
          this.callbacks.push({
              onFulfilled:value=>{
                this.parse(()=>onFulfilled(value),resolve,reject)
              },
              onRejected:(value)=>{
                this.parse(()=>onRejected(value),resolve,reject) 
              }
          })
        } 
        if (this.status === MyPromise.FULFILLED) {
           setTimeout(()=>{
             this.parse(()=>onFulfilled(this.value),resolve,reject)
           })
        }
        if (this.status === MyPromise.REJECTED) {
            setTimeout(()=>{
              this.parse(()=>onRejected(this.value),resolve,reject)
            })
       }
    })
   }
  private parse(resultFn,resolve,reject){
      try {
          let result =resultFn();
          if(result instanceof MyPromise){
              result.then(resolve,reject)
          }else{
              resolve(result)
          }
      } catch (error) {
          reject(error)
      }
  }
}
```
## then 透穿

🌰:

```ts
new Promise(resolve=>{
  resolve(1)
})
.then()
.then(val=>console.log(val))
```

```ts
class MyPromise{
  // ...
   then(onFulfilled?: Function, onRejected?: Function) {
     // 参数默认值处理
    if (typeof onFulfilled != 'function') {
        onFulfilled = () => this.value;
    }
    if (typeof onRejected != 'function') {
        onRejected = () => {throw this.value} 
    }
    // ...
   }
}
```


## catch 实现

🌰:
```ts
new Promise((resolve,reject)=>{
  resolve(1)
}).then(res=>{
  throw 'error'
})
.catch(e=>{
  console.log('x')
})
```
该函数等价于没有成功的then函数～...,具体实现如下代码:

```ts
class MyPromise{
  // ...
  public catch(errorCallback:Function) {
    return this.then(null,errorCallback);
  }
}
```
## 静态resolve与reject实现
 
 🌰：
```ts
Promise
  .resolve(1)
  .then(val=>{
    console.log(val,'value')
  });

Promise.reject('error')
```
 ```ts
 class MyPromise{
  // ...
  static resolve(value) {
     return new MyPromise((resolve,reject)=>{
          if(value instanceof MyPromise){
              value.then(resolve,reject)
          }else{
              resolve(value)
          }
      })
  }
  static reject(value) {
      return new MyPromise((_,reject)=>{
          reject(reason)
      })
  }
}
 ```

## finally
表示该方法都会被执行,当并不是代表该函数后不再执行。
如果返回值是Promise 则等待执行完毕(如果返回reject则将原因透穿下去)
🌰:
```ts
new Promise((resolve)=>{
  resolve(1)
})
.finally(()=>{
  console.log('finally run task')
})
.then(val=>{
  console.log(val)
})
.finally(()=>new Promise((_,reject)=>{
   reject('error')
}))
.then(val=>console.log(val))
.catch(e=>{
  console.log(e,'reason')
})
```

```ts
class MyPromise{
 // ...
  public finally(callback){
    return this.then(value=>{
      return MyPromise.resolve(callback()).then(()=>value)
        },reason=>{
          return MyPromise.resolve(callback()).then(()=>{throw reason})
        })
    }
}
```

## 静态方法race与all实现

`all`: 当所有结果都成功返回成功、如其中一个失败则立即返回失败。

```ts
class MyPromise{

  static all(promises){
    let values=[];
    return new MyPromise((resolve,reject)=>{
      function processData(val){
        values.push(val);
        if(values.length===promises.length){
          resolve(values)
        }
      }
      promises.forEach(result=>{
         if (result instanceof MyPromise) {
                result.then(processData,reject)
            } else {
                processData(result)
            }
      })
    })
  }
}
```

`race`: 返回最快的一个结果。

```ts
class MyPromise{
  static race(promises){
    return new MyPromise((resolve, reject) => {
        promises.forEach(result => {
            if(result instanceof MyPromise){
              result.then(resolve, reject)
            }else{
              resolve(result)
            }
        })
    })
  }
}
```

# 并发控制 p-limit代码解析

`pLimit`:函数是一个高级函数,接受最大并发数并返回一个`limit`函数。
```ts
 const pLimit=()=>limit
```
`limit`:函数接受要执行函数、与参数返回一个`promise`。

```ts
const limit=(fn,...args)=>new Promise(...)
```

```ts
const pLimit = (concurrency) => {
 // 队列数量
  const list = [];
  // 当前正在执行的数量
  let activeCount = 0;


  const next = () => {
    activeCount--;

    if (list.length) {
      list.shift()()
    }
  }

  const run = async (fn, resolve, ...args) => {
    activeCount++;

    const result = (async () => fn(...args))();
    resolve(result);
    
    try {
			await result;
		} catch {}
    
    next()
  }

  const enqueue = (fn, resolve, ...args) => {
    list.push(run.bind(null, fn, resolve, ...args));

    /**
     * 在下一个微任务执行前执行。
     */
    (async () => {

      await Promise.resolve();

      if (activeCount < concurrency && list.length) {
        list.shift()()
      }
    })()
  }
  const generator = (fn, ...args) => new Promise((resolve) => {
    enqueue(fn, resolve, ...args)
  });

  Object.defineProperties(generator, {
		activeCount: {
			get: () => activeCount
		},
		pendingCount: {
			get: () => list.length
		},
		clearQueue: {
			value: () => {
				list.length=0
			}
		}
  });
  
  return generator
}
```

使用

```ts
const limit = pLimit(2);

const input = [
  limit((val) => val, 1),
  limit(() => Promise.resolve(1)),
  limit(()=>Promise.reject('error'))
];
console.log(input)
  (async () => {
      const result = await Promise.all(input).catch(()=>{});
      console.log(result,'result');
  })()
```
由于数组`shift`方法时间复杂的是**o(n)**,不适合频繁操作,在源码中是通过链表来实现。

```ts
class Node{
  constructor(val){
    this.value=val;
    this.tail=null;
  }
}

class Queue{
  constructor(){
      this.clear();
  }

  enqueue(val){
    const node=new Node(val)
    
    if(this.head){
      this.tail.next=node;
      this.tail=node;
    }else{
      this.head=node;
      this.tail=node;
    }
    this._size++;
  }

  dequeue(){
    const current=this.head;
    if(!current){
      return 
    }
    this.head=this.head.next;
    this._size--;
    return current.value
  }

  clear(){
    this._size=0;
    this.head=null;
    this.tail=null;
  }

  get size(){
    return this._size;
  }

  *[Symbol.iterator](){
    let current=this.head;
    while(current){
      yield current.value;
      current=this.head.next;
    }
  }
}
```


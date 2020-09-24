interface ICallbackItem {
    onFulfilled: any;
    onRejected: any;
}

class MyPromise {
    private static PENDING = 'pending';
    private static FULFILLED = 'fulfilled';
    private static REJECTED = 'rejected';
    private status;
    private value;
    private callbacks: ICallbackItem[];
    constructor(executor) {
        this.status = MyPromise.PENDING;
        this.value = null;
        this.callbacks = [];
        try {
            executor(this.resolve.bind(this), this.reject.bind(this));
        } catch (error) {
            this.reject(error)
        }
    }
    private resolve(value) {
        if (this.status === MyPromise.PENDING) {
            this.status = MyPromise.FULFILLED;
            this.value = value;
            this.callbacks.map((callback) => {
                setTimeout(() => callback.onFulfilled(value))
            })
        }
    }
    private reject(reason) {
        if (this.status === MyPromise.PENDING) {
            this.status = MyPromise.REJECTED;
            this.value = reason;
            this.callbacks.map(callback => {
                setTimeout(() => callback.onRejected(reason));
            })
        }
    }
    then(onFulfilled?: Function, onRejected?: Function) {
        if (typeof onFulfilled != 'function') {
            onFulfilled = () => this.value;
        }
        if (typeof onRejected != 'function') {
            onRejected = () => {throw this.value} 
        }

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
                setTimeout(() => {
                    this.parse(()=>onFulfilled(this.value),resolve,reject)
                })
            }
            if (this.status === MyPromise.REJECTED) {
                setTimeout(() => {
                 this.parse(()=>onRejected(this.value),resolve,reject)
                });
            }
        })
    }
    static resolve(value){
        return new MyPromise((resolve,reject)=>{
            if(value instanceof MyPromise){
                value.then(resolve,reject)
            }else{
                resolve(value)
            }
        })
    }
    static reject(reason){
        return new MyPromise((_,reject)=>{
            reject(reason)
        })
    }
    static all(promises){
        let values=[];
        return new MyPromise((resolve,reject)=>{
            promises.forEach(promise => {
                promise.then(value=>{
                    values.push(value);
                    if(values.length===promises.length){
                        resolve(values)
                    }
                },reason=>{
                    reject(reason)
                })
            });
        })
    }
    static race(promises){
        return new MyPromise((resolve,reject)=>{
            promises.forEach(promise=>{
                promise.then(resolve,reject)
            })
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



// test


const p2=new Promise((resolve,reject)=>{
    let num=Math.floor(Math.random()*10);
    if(num>2){
        resolve('ok')
    }else{
        reject('error')
    }
})
const p1=Promise.reject('false');


const mp=MyPromise.race([p1,p2]).then(console.log,console.error)
// const promise=Promise.race([p1,p2]).then(console.log,console.error)

return

MyPromise.resolve('ok').then(res=>{
    console.log(res);
})

Promise.resolve('ok').then(res=>{
    console.log(res);
}).catch(reason=>{
    console.log('err:',reason)
})


const myPromise = new MyPromise((resolve, reject) => {
    console.log('myPromise start');
    //    resolve('success')
    reject('reject');
})
    .then()
    .then(res => {
        console.log('myPromise resolve', res)
        return 'return value'
    }, (reason) => {
        console.log('myPromise filled', reason)
    })
    .then(res => {
        console.log('myPromise', res)
    }, reason => {
        console.log('myPromise Reject', reason)
    })


const pOne = new Promise((resolve, reject) => {
    console.log('start one');
    //    resolve('success')
    reject('reject');
})
    .then()
    .then(res => {
        console.log('one promise resolve', res)
        return 'promise return value'
    }, (reason) => {
        console.log('one', reason)
    })
    .then(res => {
        console.log('one result', res)
    }, reason => {
        console.log('one reject', reason)
    })

return;


const pTwo = new Promise((resolve, reject) => {
    console.log('start two');
    resolve('promise two')
    reject('reject');
}).then(res => {
    console.log(res)
}, (reason) => {
    console.log('two filled', reason)
})
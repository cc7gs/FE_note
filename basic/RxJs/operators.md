
## 创建类
### 同步数据流
- create: 创建`Observable`实例,和`new Observable`功能一样
```js
Observable.create=function(subscribe){
    return new Observable(subscribe)
}
```
- of:列举数据,即可以创建指定数据集合的`Observable`对象

```js
import {of} from 'rxjs'

const source$=of(1,2,3);
source$.subscribe(console.log,null,()=>{
    console.log('complete')
});

/**
 * @description output
 * 1
 * 2
 * 3
 * complete
 */
```

- range: 产生一个数值范围内的数据

```js
const source$=range(1,3);
source$.subscribe(console.log,null,()=>{
    console.log('complete')
});

/**
 * @description output
 * 1
 * 2
 * 3
 * complete
 */

```

- generate: 以循环的方式产生数据

```js
/**
 * initialState: 初始值
 * condition: 循环条件
 * interate: 迭代条件
 * resultSelector: 产生的结果
 * scheduler: 
 */ 
generate(initialState, condition, iterate, resultSelector: , scheduler?: SchedulerLike);
```

举个栗子: 现在我们要产生10以内的所有偶数的平方用。代码如下:

```js
import {generate} from 'rxjs'

const source$=generate(2,
    v=>v<10,
    v=>v+2,
    v=>v*v
);

source$.subscribe(console.log,null,()=>{
    console.log('complete')
});

/**
 * @description output
 * 4
 * 16
 * 36
 * 64
 * complete
 */
```

- repeat: 重复产生数据流中的数据

```js
import {of} from 'rxjs'
import {repeat} from 'rxjs/operators'
const source$=Observable.create(observer=>{
    console.log('on subscribe');
    setTimeout(() =>observer.next(1), 1000);
    setTimeout(() =>observer.next(2), 2000);
    setTimeout(() =>observer.next(3), 3000);
    setTimeout(() =>observer.complete(), 4000);
    return{
        unsubscribe:()=>{
            console.log('on unsubscribe')
        }
    }
});
const repeated$=source$.pipe(repeat(2));
repeated$.subscribe(console.log,null,()=>{
    console.log('complete')
});

/**
 * output:
 * 1
 * 2
 * 3
 * 1
 * 2
 * 3
 * complete
 */
```
值得一提的是,`repeat`依赖于上一个*Observable*完结(调用 complete),如果没有的话,则不会重复产生*Observable*对象。
自己可以手动去掉 `setTimeout(() =>observer.complete(), 4000);`看看结果。

- empty: 产生空数据流
产生一个直接完结的Observable对象。
```js
import {empty} from 'rxjs'
const source$=empty()
```

- throw: 产生出错的数据流
产生的Observable对象什么也不做,直接抛出错误。
```js
  import { throwError, concat, of } from 'rxjs';
const result$=concat(of(1,2,3),(throwError(new Error('opts'))))
result$.subscribe(console.log,null,console.error)
// Logs:
// 7
// Error: oops!
```

- never: 产生永不完结的数据流
never 产生的Observable对象即不吐出数据、也不完结、也没有错误,就这样一直到永远。

```js
const result$=never().pipe(startWith(7))
function info(){console.log('will not be called')}

result$.subscribe(console.log,info,info)
```

### 异步数据流
异步简单理解就是可以产生时间间隔的数据。

- interval、timer: 间隔给定时间持续产生数据
`interval:`接受一个数值类型的参数,代表可以产生数据的时间间隔,返回Observable对象就按照该参数产生数据。
`timer:`
    -  第一个参数:可以是数值表示多长时间后触发,也可以是一个时间点表示该时间出发。
    - 第二个参数: 表示产生一个持续吐出的数据对象,如果第一个参数和第二个参数相同那么和Interval一样.

```js
import { interval, timer} from 'rxjs'

//从0开始每间隔1s +1
interval(1000).subscribe(console.log)
//和上面效果等价
timer(1000,1000).subscribe(console.log)


// 1s之后产生一个数据 0
timer(1000).subscribe(console.log)
//和上面写法效果等价
const now=new Date();
const later=new Date(now.getTime()+1000);
timer(later).subscribe(console.log)

```

- from: 可以把任何对象转化为`Observable`对象

```js
import { from } from 'rxjs'

//类数组对象转Observable对象
function toObservable(){
    return from(arguments)
}
toObservable(1,2,3).subscribe(console.log)
//字符串
from('123').subscribe(console.log)

/**
 * output
 * 1
 * 2
 * 3
 * /
```

    - fromPromise: 从Promise对象产生数据流
将Promise 传入到 from中

```js
import {from} from 'rxjs'

const promise=Promise.resolve('good');
from(promise)
.subscribe(console.log,console.error,()=>{console.log('complete')})

```

- fromEvent: 从外部事件对象产生数据流
    - 第一个参数是事件源: 例如特定的DOM元素
    - 第二个参数是事件名称: 例如 click、mousemove等

**案例1**:浏览器中按钮点击
```js
import {fromEvent} from 'rxjs'

fromEvent(document.getElementById('btn'),'click')
.subscribe(()=>{console.log('btn click')})
```
**案例2**: nodejs中事件触发
```js
import EventEmitter from 'events'
import {fromEvent} from 'rxjs'

const emitter=new EventEmitter();
const source$=fromEvent(emitter,'msg');
source$.subscribe(
    console.log,
    err=>{console.log('catch',err)},
    ()=>console.log('complete')
);
emitter.emit('msg',1);
emitter.emit('msg',2);
emitter.emit('another-msg','other');
emitter.emit('msg',3);

/**
 * output:
 * 1
 * 2
 * 3
 *  /
```
值得一提的的是,**fromEvent**产生的是`Hot Observable`,意味着如果我们在订阅前发送消息是不能被接受到的。
```js
import EventEmitter from 'events'
import {fromEvent} from 'rxjs'

const emitter=new EventEmitter();
const source$=fromEvent(emitter,'msg');

emitter.emit('msg',1);
emitter.emit('msg',2);

source$.subscribe(
    console.log,
    err=>{console.log('catch',err)},
    ()=>console.log('complete')
);

emitter.emit('another-msg','other');
emitter.emit('msg',3);

// 3
```
- ajax: 从AJAX请求结果产生数据流
[关于更多细节查看doc](https://rxjs-dev.firebaseapp.com/api/ajax/ajax)

```js
import {ajax} from 'rxjs/ajax'

const obs$ = ajax(`https://api.github.com/404`).pipe(
  map(userResponse => console.log('users: ', userResponse)),
  catchError(error => {
    console.log('error: ', error);
    return of(error);
  })
);
```

- defer: 延迟产生数据流
产生的Observable只是一个代理(Proxy),在创建之时并不会做分配资源的工作,只有当被订阅的时候,才会去创建真正占用资源的Observable。
```js
const observableFactory=()=>of(1,2,3);
const source$=defer(observableFactory)
```



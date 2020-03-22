# 操作符
操作符就是在 `subscribe`接上一个`Observer`之前的一系列数据处理。并且每一个操作都是返回一个全新的Observable对象的函数。

```js
import {Observable} from  'rxjs'
import {map} from 'rxjs/operators'

const onSubscribe=observer=>{
    observer.next(1);
    observer.next(2)
};
const source$=new Observable<number>(onSubscribe);
source$.pipe(map(x=>x*2)).subscribe(console.log)
```
`分类`
- 创建类
- 转换类
- 过滤类
- 合并类
- 多播类
- 错误处理类
- 条件分支类
- 数字和合计类

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


## 合并类 
### concat与concatAll
把多个数据流以首尾相连方式合并

```js
import {of,concat} from 'rxjs'
const source1$=of(1,2,3);
const source2$=of(3,4,5);
const concated$=concat(source1$,source2$)
concated$.subscribe(console.log)
```
#### concatAll
这是一个将高阶的Observable转换为一阶然后依次连接。

> 高阶Observable 类似于`高阶函数`,在高阶函数中是将函数作为参数然后返回函数。而`高阶Observable`是指产生的数据而然是Observable对象。

```js
import {of} from 'rxjs'
import {map,concatAll} from 'rxjs/operators'

const source1$=of(1,2,3);
const higherOrder=source1$
.pipe(
    map(num=>of(num))
);
higherOrder.subscribe(console.log)

/**
 * 产生三个observable对象,类似这样
 * Observable { _isScalar: false, _subscribe: [Function]}
 */
```

对上面的Observable进行`cancatAll`结果如下:

```js
higherOrder.pipe(concatAll()).subscribe(console.log)
 /**
  * 1
  * 2
  * 3
  * /
```

### merge与mergeAll
把多个数据流中数据以先到先得方式合并,一般用于产生异步数据的合并。

```js
import {timer} from 'rxjs'
import {map} from 'rxjs/operators'
const A$=timer(0,1000).pipe(map(x=>`A-${x}`));
const B$=timer(500,1000).pipe(map(b=>`B-${b}`));
/**
 * A-0
 * B-0
 * A-1
 * ...
 * /
```
#### mergeAll
是一个处理`高阶Observable`的merge。

```js
import {of,interval} from 'rxjs'
import {map,mergeAll} from 'rxjs/operators'

const source1$=of(1,2,3);

const higherOrder = source1$.pipe(
  map(x => interval(1000).pipe(take(2))
  .pipe(map(y => `${x}:${y}`))
  )
);

higherOrder.pipe(mergeAll()).subscribe(console.log);

/**
 * 1:0
 * 2:0
 * 3:0
 * 1:1
 * 2:1
 * 3:1
 */
```
### zip与zipAll
把多个数据流中数据一一对应方式合并,并且会将对应的数据转换成数组传递。
```js
import {pipe,of,zip} from 'rxjs'
import { map } from "rxjs/operators";

const source1$ = of(1, 2, 3);
const A$ = timer(0, 1000).pipe(map(x => `A-${x}`));
zip(A$, source1$).subscribe(console.log, null, () => {
  console.log("complete");
});
/**
 * output:
 * [ 'A-0', 1 ]
 * [ 'A-1', 2 ]
 * [ 'A-2', 3 ]
 * complete
 * /
```
#### zipAll
是一个处理`高阶Observable`的zip。

```js
import {of,interval} from 'rxjs'
import {map,zipAll} from 'rxjs/operators'

const source1$=of(1,2,3);

const higherOrder = source1$.pipe(
  map(x => interval(1000).pipe(take(2))
  .pipe(map(y => `${x}:${y}`))
  )
);

higherOrder.pipe(zipAll()).subscribe(console.log);

/**
 * [ '1:0', '2:0', '3:0' ]
 * [ '1:1', '2:1', '3:1' ]
 */
```
### combineLatest、combineAll、withLatestFrom
持续合并多个数据流中最新产生的数据
#### combineLatest
```js
import {pipe,of,zip} from 'rxjs'
import { map } from "rxjs/operators";

const A$ = timer(0, 1000).pipe(map(x => `A-${x}`));
const source1$ = of(1, 2, 3);

combineLatest(source1$,A$).subscribe(
    console.log,
    null,
    ()=>{console.log('complete')}
)

/**
 * output:
 * [ 3, 'A-0' ]
 * [ 3, 'A-1' ]
 * [ 3, 'A-2' ]
 * [ 3, 'A-3' ]
 * ...
 * /
```
**A$**会每隔一秒钟产生一个最新数据 而**source$**是同步产生数据,`combineLatest`会等待两个数据源都有数据时才会输出并且输出时取最后一条数据(即最新产生的数据)。虽然**source$**已经完结,但是**A$**还会产生数据所以还会将数据合并后传递给下游。

```js
import { of,combineLatest } from "rxjs";
import { map } from "rxjs/operators";
const source1$ = of(1, 2, 3);
const source2$ = of(3, 4, 5);

combineLatest(source1$,source2$).subscribe(
    console.log,
    null,
    ()=>{console.log('complete')}
)
/**
 * output:
 * [ 3, 3 ]
 * [ 3, 4 ]
 * [ 3, 5 ]
 * complete
 * /
```
1. `combineLatest` 订阅 **source1$**,由于其产生的是同步数据流,在被订阅时会吐出所有数据,最后一个数据时3
2. `combineLatest`订阅 **source2$**
3.  **source2$**开始输出数据时会和**source1$**最后一个数据组合传递给下游
4. **当source2$**数据产生完后,会调用 `complete`

#### withLatestFrom
功能类似`combineLatest`但是它只能由上游`Observable`对象驱动下游推送数据。

```js
import {withLatestFrom } from "rxjs/operators";
const source1$ = of(1, 2, 3);
const source2$ = of(3, 4, 5);

source1$
.pipe(withLatestFrom(source2$,(a,b)=>`${a}-${b}`))
.subscribe(
    console.log,
    null,
    ()=>console.log('complete')
)
/**
 * output:
 * 1-5
 * 2-5
 * 3-5
 * complete
 * /
```

#### combineAll
是一个处理`高阶Observable`的**combineLatest**。

```js
import {of,interval} from 'rxjs'
import {map,combineAll} from 'rxjs/operators'

const source1$=of(1,2,3);

const higherOrder = source1$.pipe(
  map(x => interval(1000).pipe(take(2))
  .pipe(map(y => `${x}:${y}`))
  )
);

higherOrder.pipe(combineAll()).subscribe(console.log);

/**
 * [ '1:0', '2:0', '3:0' ]
 * [ '1:1', '2:0', '3:0' ]
 * [ '1:1', '2:1', '3:0' ]
 * [ '1:1', '2:1', '3:1' ]
 */
```
### race
从多个数据流中选取第一个产生内容的数据流,之后产生的数据则会被退订。

```js
import {race} from 'rxjs'

const source1$ = of(1, 2, 3);
const source2$ = of(3, 4, 5);

race(source1$, source2$).subscribe(console.log, null, () =>
  console.log("complete")
);
/**
 * 1
 * 2
 * 3
 * complete
 * /
```

### startWith
在数据流前面添加一个指定数据

```js
import { map, startWith } from "rxjs/operators";
const source1$ = of(1, 2, 3);

source1$
.pipe(map(x=>x*2),startWith('start'))
.subscribe(console.log)
/**
 * start
 * 2
 * 4
 * 6
 * /
```

```js
import { of,concat } from "rxjs";
const source1$ = of(1, 2, 3);

concat(of('start'),source1$)
.subscribe(console.log)
```



### forkJoin
只获取多个数据流中最后产生的那个数据,也就是说它会等所有数据都完结后,然后把产生的最后一条数据合并。

```js
import {of} from 'rxjs'
import { take } from "rxjs/operators";

const source1$ = of(1, 2, 3);
const source3$ = timer(0, 1000).pipe(map(x => `A-${x}`)).pipe(take(3));

forkJoin(source1$,source3$)
.subscribe(console.log)
/**
 * 等待3秒钟输出:
 * [3,'A-2']
 * /
```

## 辅助类
### count
统计数据流中产生的所有数据个数
```js
import { of,concat } from "rxjs";
import { count } from "rxjs/operators";

const source1$ = of(1, 2, 3);
const source2$ = of(3, 4, 5);

concat(source1$,source2$).pipe(count())
.subscribe(console.log)
```
### max和min
获得数据流中最大或者最小的数据

```js
import { of } from "rxjs";
import { min } from "rxjs/operators";

const person=of(
    {name:'c',age:12},
    {name:'chen',age:24},
    {name:'wu',age:17},
    {name:'yc',age:37},
)

person.pipe(min((a,b)=>a.age-b.age))
.subscribe(console.log)
```
### reduce
对数据流中所有数据进行规约操作,其功能与js中reduce一样只不过操作对象变成成了`observable`

```js
import { of } from "rxjs";
import { min } from "rxjs/operators";

const person=of(
    {name:'c',age:12},
    {name:'chen',age:24},
    {name:'wu',age:17},
    {name:'yc',age:37},
)

person.pipe(reduce((acc,cur)=>(acc+cur.age),0))
.subscribe(console.log)
```

### every
判断是否所有数据满足某个条件

```js
import { of } from "rxjs";
import { every } from "rxjs/operators";

const source1$ = of(1, 2, 3);

source1$.pipe(every(x=>x>1))
.subscribe(console.log)
//false
```

### find和findIndex
找到第一个满足判定条件的数据,find返回第一个元素,findIndex返回第一个元素的坐标

```js
import { of } from "rxjs";
import { find,findIndex } from "rxjs/operators";

const source1$ = of(1, 2, 3);

source1$.pipe(find(x=>x>1))
.subscribe(console.log)
//2
source1$.pipe(findIndex(x=>x>1))
.subscribe(console.log)
//1
```

### isEmpty
判定一个数据流是否不包含任何数据即Observable对象不再吐出任何数据。

```js
import { of,never, } from "rxjs";
import {isEmpty } from "rxjs/operators";

const source1$ = of(1, 2, 3);

source1$.pipe(isEmpty())
.subscribe(console.log)
// false

never().pipe(isEmpty())
.subscribe(console.log)
//不会产生任何结果

```
对于never,isEmpty不会产生任何结果,因为它的上游`Observable对象`即不吐出任何数据证明它*非空*,也不能证明完结所以就一直等待。

### defaultEmpty
如果一个数据流为空就默认产生一个指定数据

```js
import {of} from 'rxjs'
import {defaultIfEmpty } from "rxjs/operators";

of().pipe(defaultIfEmpty('this is default'))
.subscribe(console.log)

```

## 过滤类
### filter
```js
import {of} from 'rxjs'
import {filter} from 'rxjs/operators'

const source1$ = of(1, 2, 3);
source1$.pipe(filter(x=>x>2))
.subscribe(console.log)
//3
```
### first与last
**first:**
- 当不穿参数时表示返回第一个数据
- 有参数时,则返回满足条件的第一个数据,如果没有找到满足条件则抛出异常.**'no elements in sequence'**

**last:**
与first正好相反,返回最后一个符合条件的数据。

```js
import {of} from 'rxjs'
import {first} from 'rxjs/operators'

const source1$ = of(1, 2, 3);
source1$.pipe(first(x=>x>1))
.subscribe(console.log)
//2

source1$.pipe(first())
.subscribe(console.log)
//1

```
### take
接受一个参数,该参数决定从上游数据中拿几个数据。
```js
import {of} from 'rxjs'
import {take} from 'rxjs/operators'

const source1$ = of(1, 2, 3);
source1$.pipe(take(2))
.subscribe(console.log)
// 1
// 2
```
### takeUtil
让我们可以用`Observable对象`来控制另一个`Observable对象`的数据产生。

案例: 每隔一秒输出一个递增整数,三秒后结束。
```js
import {of,timer,interval} from 'rxjs'
import {takeUntil} from 'rxjs/operators'

const source1$ = interval(1000);

source1$.pipe(takeUntil(timer(2500)))
.subscribe(
    console.log,
    console.error,
    ()=>{console.log('complete')}
)
// 0
// 1
// complete
```
### skip
跳过前N个之后开始拿即设定起点位置。
```js
import {of} from 'rxjs'
import {skip} from 'rxjs/operators'

const source1$ = of(1, 2, 3);
source1$.pipe(skip(2))
.subscribe(console.log)
//3
```
### throttle与throttleTime

>后缀Time表示毫秒数的时间。而不带Time后缀的操作符是利用另一个Observable对象来控制如何抛弃来自上游Observable对象的数据。

表示每隔毫秒时间范围内抛弃所有上游传递下来的数据,即这样保证了时间范围内只给下游传递唯一一个数据。

```js
import { interval } from "rxjs";
import {throttleTime} from 'rxjs/operators'

interval(1000)
.pipe(throttleTime(2000))
.subscribe(console.log,null,()=>console.log('complete'));

/**
 * 0
 * 2
 * 4
 * ...
 */
```
### debounce与throttleTime
防抖:表示毫秒范围内不产生任何其它数据时才把数据传递给下游,如果在此时间产生数据则重新开始计时。

```js
import { interval } from "rxjs";
import {debounceTime} from 'rxjs/operators'

interval(1000)
.pipe(debounceTime(2000))
.subscribe(console.log,null,()=>console.log('complete'));

/**
 * 不会产生任何数据,以为每隔一秒都会产生新的数据,deounce是要等待两秒之内不产生任何数据采用将数据传递给下流。
 */

```

### audit
它与throttle类似,不过throttle是把第一个数据传递给下游;而audit是把最后一个数据传给下游。

```js
import { interval } from "rxjs";
import {throttleTime} from 'rxjs/operators'

interval(1000)
.pipe(throttleTime(2000))
.subscribe(console.log,null,()=>console.log('complete'));

/**
 * 1
 * 3
 * 5
 * ...
 */
```
### distinct
只返回从没有出现过的数据,上游同样的数据只有第一次产生时会传递给下游,其余的都被丢弃掉了。
```js
import { of } from "rxjs";
import {distinct} from 'rxjs/operators'

of(1,1,2,2,3,4,6,5,5,5,6)
.pipe(distinct())
.subscribe(console.log,null,()=>console.log('complete'));

/**
 * 1 
 * 2
 * 3
 * 4
 * 6
 * 5
 * complete
 * /
```

```js
import { of } from 'rxjs';
import { distinct } from 'rxjs/operators';

interface Person {
    age: number,
    name: string
}

of<Person>(
     { age: 4, name: 'Foo'},
     { age: 7, name: 'Bar'},
     { age: 5, name: 'Foo'},
   ).pipe(
     distinct((p: Person) => p.name),
   )
   .subscribe(x => console.log(x));

// displays:
// { age: 4, name: 'Foo' }
// { age: 7, name: 'Bar' }
```
### distinctUtilChanged
拿到数据和上一个数据进行比较,如果重复则过滤掉。
```js
import { of } from "rxjs";
import {distinctUtilChanged} from 'rxjs/operators'

of(1,1,2,2,1)
.pipe(distinctUtilChanged())
.subscribe(console.log,null,()=>console.log('complete'));

/**
 * 1 
 * 2
 * 1
 * complete
 * /
```
### single
检查上游是否只有一个满足对于条件的数据,如果是则传递该数据,否则抛出异常。

```js
import { of } from "rxjs";
import {single} from 'rxjs/operators'

of(1,2)
.pipe(single(x=>x===1))
.subscribe(console.log,null,()=>console.log('complete'));
/**
 * 1
 * complete
 */
// 如果修改of(1,2,1) 则会报Error Sequence contains more than one element
```

## 转换类
### 数据映射
将上游数据一一通过函数F()转换后传递给下游:A -->f(A)
#### map
将每个元素映射函数产生新的数据
#### mapTo
将数据流中每个元素映射为同一个数据
#### pluck
提取数据流中每个数据的某个字段,当获取数据不存在则返回undefined。
```js
import {of} from 'rxjs'
import {map,mapTo,pluck} from 'rxjs/operators'

of(1,2,3)
.pipe(map(x=>x*2))
.subscribe(console.log,null,()=>console.log('complete'));

/**
 * 2
 * 4
 * 6 
 * complete
 */

of(1,2,3)
.pipe(mapTo('A'))
.subscribe(console.log,null,()=>console.log('complete'));

/**
 * A
 * A
 * A
 * complete
 */
of(
    {name:'c1',age:12},
    {name:'c2',age:32},
    {name:'c3',age:24},
    {name:'c4',age:53},
)
.pipe(pluck('age'))
.subscribe(console.log,null,()=>console.log('complete'));
/**
 * 12 
 * 32
 * 24
 * 53
 * complete
 */
```
### 缓存转换
>该策略就是将上游在一段时间内产生的数据放在一个数据集合里然后一次性丢给下游。
**数据集合类型:**
- 数组则以buffer开头
- Observable对象以window开头
#### bufferTime与windowTime
根据时间缓存上游数据。
```js
import {interval} from 'rxjs'
import {bufferTime} from 'rxjs/operators'
interval(1000)
.pipe(bufferTime(3000))
.subscribe(console.log,null,()=>console.log('complete'));

/**
 * [0,1]
 * [2,3,4] 
 * [5,6,7]
 */
```
#### bufferCount与windowCount
根据个数来缓存上游数据。
```js
import {interval} from 'rxjs'
import {bufferCount} from 'rxjs/operators'

interval(1000)
.pipe(bufferCount(3))
.subscribe(console.log,null,()=>console.log('complete'));

/**
 * [0,1,2]
 * [3,4,5] 
 * [6,7,8]
 */
```

## 异常错误处理类
### catch
捕获并处理上游产生的异常错误
```js
import {range,of} from 'rxjs'
import {map,catchError,take} from 'rxjs/operators'

const throwOnNumber=value=>{
    if(value===2){
        throw new Error('number equaly 2')
    }
    return value
}

range(1,5)
.pipe(
    map(throwOnNumber),
    catchError((err,catch$)=>of(6))
)
.subscribe(console.log,null,()=>console.log('complete'));

/**
 * 1
 * 6
 * complete
 * /
```
### retry和retryWhen
当上游产生错误时进行重试

案例:第一次失败后再重试2次

```js
import {range,of} from 'rxjs'
import {map,catchError,retry} from 'rxjs/operators'


range(1,5)
.pipe(
    map(throwOnNumber),
    retry(2),
    catchError((err,catch$)=>of(6)),
)
.subscribe(console.log,null,()=>console.log('complete'));

/*
1
1
1
6
complete
*/
```
retryWhen:用于控制重试次数和节奏

案例:重试2次,每次重试前延迟2秒钟

```js
import {range,of} from 'rxjs'
import {map,catchError,retryWhen,scan} from 'rxjs/operators'

const throwOnNumber=value=>{
    if(value===2){
        throw new Error('number equaly 2')
    }
    return value
}

range(1,5)
.pipe(
    map(throwOnNumber),
    retryWhen(err$=>err$.pipe(
        scan((errorCount,err)=>{
            if(errorCount>=2){
                throw err
            }
            return errorCount+1;
        },0),
        delay(2000)
    )),
    // catchError((err,catch$)=>of(6)),
)
.subscribe(console.log,null,()=>console.log('complete'));
/**
 * 1
 * 1
 * 1
 * Error: number equaly 2 
 */
```

### finally
无论是否出错都要进行一些操作

## 多播类
播放内容:
- 单播: 一对一即一个播放者一个收听者
- 广播: 一对多即一个播放者多个接受者
- 多播: 一对多但是接受者是进行筛选后的(即具有针对性)

通过`Subject`模拟一个多播场景:

```js
const obs$=interval(1000)
.pipe(take(3));
const subject=new Subject();
obs$.subscribe(subject)

subject.subscribe(value=>console.log('observer 1:',value))
setTimeout(() => {
subject.subscribe(value=>console.log('observer 2:',value))
}, 1000);

/**
 * observer 1: 0
 * observer 1: 1
 * observer 2: 1
 * observer 1: 2
 * observer 2: 2
 */
```
### multicast
```js
import {interval,Subject} from 'rxjs'
import {take,multicast} from 'rxjs/operators'

const tick$=
interval(1000)
.pipe(
    take(3),
    multicast(()=>new Subject())
)

tick$.subscribe(value=>console.log('observer 1:',value))

setTimeout(() => {
    tick$.subscribe(value=>console.log('observer 2:',value))
}, 1000);

//订阅数据
tick$.connect()
```

### publish

#### publishLast
多播上游最后一个数据
```js
import {interval,Subject} from 'rxjs'
import {take,publishLast} from 'rxjs/operators'

const tick$=
interval(1000)
.pipe(
    take(3),
    publishLast()
)
tick$.connect()
tick$.subscribe(value=>console.log('observer 1:',value))

setTimeout(() => {
    tick$.subscribe(value=>console.log('observer 2:',value),null,()=>console.log('complete'))
}, 5000);

/**
 * observer 1: 2
 * observer 2: 2
 * complete
 */
```
#### publishReplay
重播即将上游数据重新走一遍,参数表示能缓存的大小。
```js
import {interval,Subject} from 'rxjs'
import {take,publishReplay} from 'rxjs/operators'

const tick$=
interval(1000)
.pipe(
    take(3),
    publishReplay(2)
)
tick$.connect()
tick$.subscribe(value=>console.log('observer 1:',value))

setTimeout(() => {
    tick$.subscribe(value=>console.log('observer 2:',value),null,()=>console.log('complete'))
}, 5000);

/**
 * observer 1: 0
 * observer 1: 1
 * observer 1: 2
 * observer 2: 1
 * observer 2: 2
 * complete
 */
```
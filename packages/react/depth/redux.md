---
nav:
  title: redux源码分析
  path: /react/depth
---

# redux

> 关于redux 源码学习系列文章，是通过阅读 《react 状态管理与同构》后的读书笔记和心得。


## 简单入手
案例场景: 现在有一个计数器，+、-(或者点赞场景)，现在用redux如何记录呢?
```js
 import {createStore,combineReducers } from 'redux'
 //action
const LIKE = "LIKE";
const UNLIKE = "UNLIKE";
const initialState=0;

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case LIKE:
      return state + 1;
    case UNLIKE:
      return state - 1;
    default:
      return initialState;
  }
};
const store = createStore(combineReducers({ user:reducer }));

console.log("init", store.getState());
const render = () => {
  console.log("render", store.getState());
};
store.subscribe(render);
store.dispatch({ type: LIKE });
// console.log("like", store.getState());
store.dispatch({ type: LIKE });
// console.log("like", store.getState());
```
## redux 实现
redux帮我们解决了跨越多组件通信问题，即提供了一个管理公共状态的方案。

### store 实现
store 作为一个对象，提供了直接获取页面数据状态的 `getState 方法`、触发更新 store
`dispatch 方法`，以及订阅 store 状态变化的 `subscribe 方法`等，进而维护了整个应用 的数据状态和页面渲染。如下是 store 的重要方法.
```js
canst store= createStore(reducer, preloadedState, enhancer); 

const store={
dispatch,
getState,
subscribe,
replaceReducer
}
```

```js
const createStore=(reducer,initState)=>{
    let state=initState;
    //listeners 用于存储所有监听函数
    let listeners=[];

    const getState=()=>state;

    const dispatch=(action)=>{
        state=reducer(state,action);
        //每次状态更新后，都需要调用listeners数组中的每一个监听函数
        listeners.forEach(listener=>listener())
    }
    const subscribe=(listener)=>{
        //每一次调用时，都将相关的监听函数存入listeners数组中
        listeners.push(listener);
        return ()=>{
            listeners=listeners.filter(item=>item!==listener)
        }
    }
    dispatch({type:'@@redux/INIT'}) //初始化 state
    return{
        getState,
        dispatch,
        subscribe
    }
}
```
#### 追问环节
1. 创建的时候为什么需要 `dispatch({type:'@@redux/INIT'})`？

> 是为了首次初始化store

2. 是如何监听store变化的？
通过观察者模式，即 `dispatch` 起到通知的作用，`subscribe`即注册监听者(观察者)

#### 观察者模式

下图是具体UML实现图
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200621164815967.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3Njc0NjE2,size_16,color_FFFFFF,t_70)
```js
// 观察者
class Observer{
    public update:Function
    constructor(fn:Function){
        this.update=fn
    }
}

class Subject{
    private observers:Observer[]
    constructor(){
        //观察者队列
        this.observers=[]
    }
    //添加观察者
    addObserver(observer:Observer){
        this.observers.push(observer)
    }
    //通知所有观察者
    notify(){
        this.observers.forEach(observer=>{
            observer.update()
        })
    }
}

var subject=new Subject();
const say=()=>console.log('call Observer');

const ob1=new Observer(say);
const ob2=new Observer(say);

subject.addObserver(ob1);
subject.addObserver(ob2);

subject.notify()
```

`store支持增强版本:`
```ts
const createStore=(reducer,initState,enhancer)=>{
  if (typeof initState === 'function' && typeof enhancer === 'undefined') {
    enhancer = initState 
    initState = undefined
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error(
        `Expected the enhancer to be a function. Instead, received: '${kindOf(
          enhancer
        )}'`
      )
    }
        return enhancer(createStore)(
      reducer,
      preloadedState as PreloadedState<S>
    ) as Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext
  }

    let state=initState;
    //listeners 用于存储所有监听函数
    let listeners=[];

    const getState=()=>state;

    const dispatch=(action)=>{
        state=reducer(state,action);
        //每次状态更新后，都需要调用listeners数组中的每一个监听函数
        listeners.forEach(listener=>listener())
    }
    const subscribe=(listener)=>{
        //每一次调用时，都将相关的监听函数存入listeners数组中
        listeners.push(listener);
        return ()=>{
            listeners=listeners.filter(item=>item!==listener)
        }
    }
    dispatch({type:'@@redux/INIT'}) //初始化 state
    return{
        getState,
        dispatch,
        subscribe
    }
}
```
**使用**
```ts
const middleware = [createLogger,promise]
const store=createStore(rootReducer,applyMiddleware(...middleware))
```
### combineReducers
combineReducers 方法,它实现了接收多个 reducer 函数,并进行整合生成一个rootReducer。
```js
/**
 * 
 * @param {*} reducers  
 * @returns 一个归一化的rootReducer函数，
 * 该函数返回值是经过各个reducers计算后的State
 */
const combineReducers = reducers => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
};
```
### applyMiddleware
> 对于applyMiddlewares执行如下形式:
> applyMiddleware(...middlewares) (createStore) (reducer, initialState)

```ts
function applyMiddleware(...middlewares){
    return createStore=>{
        (reducer,initialState)=>{
          const store=createStore(reducer,initialState);
          let dispatch: Dispatch = () => {
            throw new Error(
              'Dispatching while constructing your middleware is not allowed. ' +
                'Other middleware would not be applied to this dispatch.'
            )
          }
          const middlewareAPI={
              getState:store.getState,
              dispatch:(action,...args)=>dispatch(action,...args)
          };
          const chain=middlewares.map(middleware=>middleware(middlewareAPI));

          dispatch=compose(...chain,store.dispatch);
          return {
              ...store,
              dispatch
          }
      }
    }
}

```
### compose
```ts
function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(
    (acc, cur) =>
      (...args) =>
        acc(cur(...args)),
  );
}
```
关于compose更多内容请查看[你不知道的comose](/interview/js/compose)

### 写一个中间件

> const middleware= store => next => action => {}

```ts
const logger=(store)=>next=>{
    if(!console.group){
        return next
    }
    //返回一个增加日志的 全新dispatch
    return (action)=>{
        console.group(action.type);
        //打印更新之前state
        console.log('prev state',store.getState());
        console.log('action',action);

        //调用原始的 dispatch并记录返回值
        const returnValue=next(action);
         //打印更新之后state
         console.log('next state',store.getState());
         return returnValue
    }
}

```

```ts
const promise = store => next => action => {
  //对 action 进行判断,当是一个promise时
  if (typeof action.then === "function") {
    return action.then(next);
  }
  return next(action);
};
```
`思考如下函数打印结果:`
```ts
const a = (next) => (x) => next(`${x}a`)

const b = (next) => (x) => next(`${x}b`)
const c = (next) =>  (x) => next(`${x}c`)
const final = (x) => x

function compose(...funcs) {
  if (!funcs.length) return (arg) =>arg
  if (funcs.length === 1) return funcs[0]

  return funcs.reduce((acc, cur) => (...args) => acc(cur(...args)))
}

// 🤔 ？？？
const result = compose(a, b, c)(final)('');
```
## 参考

1. [redux中文官网](https://www.redux.org.cn/docs/introduction/Motivation.html)
2. 《react 状态管理与同构》书籍
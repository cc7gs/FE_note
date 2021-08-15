---
nav:
  title: react-redux源码分析
  path: /react/depth
---

# react-redux


## 作用
它帮助我们连接UI层和数据层。即帮我们合并一些重复操作即获取状态`getState`、修改状态`dispatch`、订阅更新`subscribe`。因此提供了两个核心API: 
* `Provider`: 接收 store,并将其挂载到context上，目的是为了后代组件获取状态
* `Connect`: 将 state、props传递组件并自动订阅更新
## 核心实现
本文就核心两个API进行分析如下问题:
1. 子代元素如何获取 store?
2. store变化如何更新视图？
3. 如何做到组件props增强？
4. 怎么做到只订阅关心的数据，与防止重复渲染？

下面我们根据实现这两个核心功能来逐步揭晓上面的问题。
### Provider
1. 使用 context 传递 store
2. 注册监听组件更新函数(即调用 `trySubscribe`)
3. 这里可以对state对比然后判断是否要更新组件(本文未做)

```js
// Context.ts
import React from 'react'

export const ReactReduxContext=React.createContext<ReturnType<any>>(null);

if(process.env.NODE_ENV!=='production'){
    ReactReduxContext.displayName='ReactRedux'
}
export default ReactReduxContext
```

这里只是简单的采用观察者模式，源码中采用的发布订阅模式。

```js
// Subscription.ts
export default class Subscription<S>{
    private store:S|any;
    private listeners:any[]|null;
    public onStateChange:Function | null | undefined;
    private unsubscribe:null|any;
    constructor(store:S){
        this.store=store;
        this.unsubscribe=null
        this.listeners=[this.handleChangeWrapper];
    }

    //需要组件中设置用来更新组件
    handleChangeWrapper=()=>{
        if(this.onStateChange){
            this.onStateChange()
        }
    }

    //注册监听
    addListener(listener:any){
        this.listeners!.push(listener)
    }

    //通知更新
    notify=()=>{
        this.listeners!.forEach(listener=>{
            listener()
        })
    }

    //监听store
    trySubscribe(){
        if(!this.unsubscribe){
            this.unsubscribe=this.store.subscribe(this.notify)
        }
    }    
    //取消订阅
    tryUnsubscribe(){
        if(this.unsubscribe){
            this.unsubscribe();
            this.unsubscribe=null;
            this.listeners=null
        }
    }
}
```

```js
// Provider.ts 
import React, { useMemo, useEffect } from 'react'
import Subscription from './Subscription'
import { ReactReduxContext } from './Context'
interface IProps {
    store: any;
    context?: React.Context<any>;
    children: any;
}

export default ({ store, context, children }: IProps) => {
    const contextValue = useMemo(() => {
        const subscription = new Subscription(store);
        return {
            store,
            subscription
        }
    }, [store]);
    const previousState = useMemo(() => store.getState(), [store]);
   
    useEffect(() => {
        const { subscription } = contextValue;
        //将 注册组件更新函数(即下文中的onStateChange)
        subscription.trySubscribe();

        // if(previousState!==store.getState()){
        //    subscription.not
        // }
        return () => {
            subscription.tryUnsubscribe();
            subscription.onStateChange = null;
        }
    }, [contextValue, previousState])

    const Context = context || ReactReduxContext
    return <Context.Provider value={contextValue}>{children}</Context.Provider>
}
```
### Connect
1. 接收 `mapStateToProps`	、`mapDispatchToProps`方法对包裹组件`props`增强
2. 注册页面更新函数 `onStateChange`,目的为了页面重新渲。
3. 页面更新后重新计算 `props`
```js
//Connect.tsx
import React, { useContext, useMemo, useState, useEffect } from 'react'
import { ReactReduxContext } from './Context'
export default (mapStateToProps: Function, mapDisPatchToProps: Function) =>
    (WrappedComponent: React.ComponentProps<any>) => {
        return (props: any) => {
            const { store, subscription } = useContext<any>(ReactReduxContext);
            //设置状态更新state,为了驱动组件更新(newProps更新)
            const [state,setState]=useState(0);
            
            useEffect(()=>{
                    subscription.onStateChange=()=>setState(state+1);
            },[state])

            const newProps = useMemo(() => {
                const stateProps = mapStateToProps(store.getState());
                const dispatchProps = mapDisPatchToProps(store.dispatch);
                return {
                    ...stateProps,
                    ...dispatchProps,
                    ...props
                }
            }, [props,state, store])

            return <WrappedComponent {...newProps} />
        }
    }
```
## 反思总结
1.  connect中用到了什么设计模式？这种模式的好处？
   
connect，与我们熟悉的HOC都是用到了 `装饰器模式`;这种模式可以对组件功能扩展而不必更改原有逻辑(即符合**开闭原则**)

## TODO:
 - [ ]  Provider中的 store 对比更新操作实现？
 - [ ]  其它相关API实现与其它相关hooks？

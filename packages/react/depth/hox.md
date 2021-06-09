---
nav:
  title: react源码分析
  path: /react/depth
---

> 对于 react 状态管理已经是老生畅谈的话题，官方没有给出最佳实践因此市面上关于状态管理的探索从未停止过。

> 知识有限，如有不对请留言或私信 感激 ing。欢迎交流 👏👏
>
> 本文就 [hox](https://github.com/umijs/hox)库探索做一个总结，建议按本文顺序阅读，如果你是 react 老手那么可以跳过开篇，关注结论或者反推也是可以。

# hox 解析

## 组件状态定义

对于 hooks 推出之后,对于状态定义也更加灵活，下面关于组件定义状态如下:

```ts | pure
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>count:{count}</p>
      <button onClick={() => setCount(count + 1)}>add</button>
      <button onClick={() => setCount(count - 1)}>minus</button>
    </div>
  );
}
```

关于组件复用代码，我们可以抽离自[定义 hook](https://zh-hans.reactjs.org/docs/hooks-custom.html)

```ts | pure
// src/useCounter.ts

function useCounter() {
  const [count, setCount] = useState(0);
  const add = () => setCount(count + 1);
  const minus = () => setCount(count - 1);

  return {
    count,
    add,
    minus,
  };
}
```

那么一个`Counter`组件会变成如下形式:

```ts | pure
import React from 'react';
import useCounter from './model/useCounter';

export default () => {
  const { count, add, minus } = useCounter();
  return (
    <div>
      <p>count:{count}</p>
      <button onClick={add}>add</button>
      <button onClick={minus}>minus</button>
    </div>
  );
};
```

此时如果我们定义多个`Counter`组件，他们之间状态是相互独立的，因为每一个组件内部都调用了`useCount`,因此对于组件之间状态共享做法就是[状态提升](https://zh-hans.reactjs.org/docs/lifting-state-up.html)

## 组件共享状态

至此我们浏览过官网的都知道此时应该用[context](https://zh-hans.reactjs.org/docs/context.html)。

1. 定义 Context

```ts | pure
import React from 'react';
export const CountContext = React.createContext(null);
```

2. 改造`Counter`

```ts | pure
import React, { useContext } from 'react';
import { CountContext } from './model/countStore';

export default () => {
  const { add, minus } = useContext(CountContext);

  return (
    <div>
      <DisplayValue />
      <button onClick={add}>add</button>
      <button onClick={minus}>minus</button>
    </div>
  );
};

const DisplayValue = () => {
  const { count } = useContext(CountContext);

  return <p>count:{count}</p>;
};
```

3. 改造 顶级组件`App`

```ts | pure
export default function App() {
  const { count, add, minus } = useCount();
  return (
    <CountContext.Provider value={{ count, add, minus }}>
      <Counter />
      <Counter />
    </CountContext.Provider>
  );
}
```

社区也推出了基于它的状态管理库[unstated-next](https://github.com/jamiebuilds/unstated-next)

至此对于组件状态共享,也完结 🎉🎉

emm...

你说了这么多，状态的共享也只解决了局部状态，那全局呢？还有 context 在组件传递多次引起多渲染怎么解决？ ...

## 全局状态共享

对于全局无非就是局部提升，且运行时只存在一份。这说的不就是单例设计模式

全局=> 自定义 hook + 顶级组件

说了这么多， 怎么做呢？

思路大致如下:

1. 首先我们定义一个创建`Model`函数,传递自定义 hooks 并返回该 hooks.

```ts | pure
// types.ts
export type ModelHook<T = any, P = any> = (args: P) => T;

// createModel.ts
import { useState } from 'react';
import { ModelHook } from './types';

export function createModel(hook: ModelHook) {
  // 问题1:执行hook拿到返回值
  const data = hook();

  const useModel = () => {
    // hook 执行返回的数据
    const [state, setState] = useState(() => data);

    //问题2: 更新订阅仓库的数据

    return state;
  };
  return useModel;
}
```

2. 创建自定义 model

```ts | pure
// useCounterModel.ts
import { createModel } from './hox/index';
function useCount() {
  const [count, setCount] = useState(0);
  const add = () => setCount(count + 1);
  const minus = () => setCount(count - 1);

  return {
    count,
    add,
    minus,
  };
}
export default createModel(useCount);
```

3. 获取数据

```ts | pure
import React from 'react';
import useCounterModel from './model/useCounterModel';

export default () => {
  const { add, minus } = useCounterModel();
  return (
    <div>
      <DisplayValue />
      <button onClick={add}>add</button>
      <button onClick={minus}>minus</button>
    </div>
  );
};

const DisplayValue = () => {
  const { count } = useCounterModel();
  return <p>count:{count}</p>;
};
```

首先上面代码运行会报错:

> Uncaught Error: Invalid hook call. Hooks can only be called inside of the body of a function component.

违反了 hook 执行规则，不能以非组件形式被调用。那么要如何解决呢？那么我们就构造一个组件，该组件用于获取自定义 hook 返回值。

```ts | pure
// executor.tsx
export default function Executor<T>(props: {
  hook: () => ReturnType<ModelHook<T>>;
  onUpdate: (data: T) => void;
}) {
  const data = props.hook();
  props.onUpdate(data);
  return <></>;
}
```

将该组件添加到 model 中渲染。

```ts | pure
import Executor from './executor';

export function createModel<T, P>(hook: ModelHook<T, P>, hookArg?: P) {
  let val: T;
  render(
    <Executor
      hook={() => hook(hookArg)}
      onUpdate={(data) => {
        val = data;
      }}
    />,
  );
  const useModel = () => {
    const [state, setState] = useState(() => val);
    return state;
  };
  return useModel;
}
```

```ts | pure
//renderer.tsx
import React from 'react';
import { ReactElement } from 'react';
import ReactDOM from 'react-dom';

export function render(element: ReactElement) {
  ReactDOM.render(element, document.getElementById('store'));
}
```

至此该模型大致已经完成,此时如果按我的步骤来阅读的小伙伴，肯定在想这只解决了初次渲染，那么后续数据更新呢?

就像 redux 一样，数据更新采用的观察者模式,hox 也一样。其它每一次调用`useCounterModel` 方法都想到于订阅了数据,这样当自定义 hook 发生了数据更新行为都会触发`Executor`组件，此时我们再通知订阅的组件返回最新数据即可。

对上面代码改动如下:

1. 首先初始化 Model 时我们定义一个容器里面存储观察者和自定义 hook 返回的数据。

```ts | pure
//container.ts

import { ModelHook } from './types';

type Subscriber<T> = (data: T) => void;

export class container<T, P> {
  constructor(public hook: ModelHook<T, P>) {}
  data!: T;
  subscribers = new Set<Subscriber<T>>();

  notify() {
    this.subscribers.forEach((subscriber) => subscriber(this.data));
  }
}
```

```ts
//createModel.tsx
import Executor from './executor';

export function createModel<T, P>(hook: ModelHook<T, P>, hookArg?: P) {
  //存储数据和观察者
  const container = new Container(hook);

  render(
    <Executor
      hook={() => hook(hookArg)}
      onUpdate={(data) => {
        container.data = data;
        container.notify();
      }}
    />,
  );

  const useModel = () => {
    const [state, setState] = useState(() => (container ? container.data : {}));
    useMemo(() => {
      if (!container) return;
      function subscriber(val: T) {
        setState(val);
      }
      //添加订阅者
      container.subscribers.add(subscriber);
    }, [container]);

    useEffect(() => () => {
      container.subscribers.delete(subscriber);
    });
    return state;
  };
  return useModel;
}
```

这样一个简易的全局状态模型已经搭建完成。核心思想构建一个新 DOM 节点 用来存放 自定义 hook 执行结果,当该组件更新的时候更新订阅者。

## 与源码对比进行优化

### 优化 renderer

在上文中同 ReactDOM 将数据组件(`<Executor>`)渲染到 store 节点中,单纯节点渲染而已用户并不期望渲染到节点中。此时我们可以用渲染到空节点中来实现。

主要问题: `react-dom` 限制了跨平台使用因此该库采用了[react-reconciler](https://www.npmjs.com/package/react-reconciler) 来实现宿主机环境渲染节点。

关于 renderer 更多内容:

- [hello-world-custom-react-renderer](https://agent-hunt.medium.com/hello-world-custom-react-renderer-9a95b7cd04bc)

- [Building an Async React Renderer with Diffing in Web Worker](https://medium.com/@azizhk/building-an-async-react-renderer-with-diffing-in-web-worker-f3be07f16d90)

相关流行库的实现

- [react-three-fiber](https://github.com/pmndrs/react-three-fiber#why)
- [react-pixi-fiber](https://github.com/michalochman/react-pixi-fiber)

下面使用自定义协调器来实现 render:

```ts | pure
import ReactReconciler from 'react-reconciler';
import { ReactElement } from 'react';

const hostConfig = {
  now: Date.now,
  getRootHostContext: () => ({}),
  prepareForCommit: () => {},
  resetAfterCommit: () => {},
  getChildHostContext: () => ({}),
  shouldSetTextContent: () => true,
  createInstance: () => {},
  createTextInstance: () => {},
  appendInitialChild: () => {},
  appendChild: () => {},
  finalizeInitialChildren: () => {},
  supportsMutation: true,
  appendChildToContainer: () => {},
  prepareUpdate: () => true,
  commitUpdate: () => {},
  commitTextUpdate: () => {},
  removeChild: () => {},
};

const reconciler = ReactReconciler(hostConfig as any);

export function render(reactElement: ReactElement) {
  const container = reconciler.createContainer(null, false, false);
  return reconciler.updateContainer(reactElement, container, null, null);
}
```

### 优化 action

关于 useModel 中，我们通过 useMemo+ useEffect 来实现订阅与取消订阅操作，在源码中将实现两者功能封装了[`useAction`](https://github.com/awmleer/use-action/blob/master/src/index.ts)

```ts | pure
useAction(() => {
  function subscriber(val: T) {
    setState(val);
  }
  container.subscribers.add(subscriber);
  return () => container.subscribers.delete(subscriber);
}, [container]);
```

### useModel 支持依赖更新

```ts | pure
const useModel: UseModel<T> = (depsFn) => {
  const [state, setState] = useState<T | undefined>(() =>
    container ? container.data : undefined,
  );
  const depsFnRef = useRef(depsFn);
  depsFnRef.current = depsFn;
  const depsRef = useRef<unknown[]>(depsFnRef.current?.(container.data) || []);
  useAction(() => {
    if (!container) return;
    function subscriber(val: T) {
      if (!depsFnRef.current) {
        setState(val);
      } else {
        const oldDeps = depsRef.current;
        const newDeps = depsFnRef.current(val);
        if (compare(oldDeps, newDeps)) {
          setState(val);
        }
        depsRef.current = newDeps;
      }
    }
    container.subscribers.add(subscriber);
    return () => {
      container.subscribers.delete(subscriber);
    };
  }, [container]);
  return state!;
};
```

此时我们可以有选择的订阅数据。

```ts | pure
const counter = useCounterModel((model) => [model.count, model.x.y]);
```

### 只订阅当前数据

才操作就是获取仓库中最新数据，仓库之后数据更新并不关心。

```ts | pure
Object.defineProperty(useModel, 'data', {
  get: function () {
    return container.data;
  },
});
```

使用

```ts | pure
export const DisplayOnceValue = () => {
  const data = useCounterModel.data;
  return <div>只订阅一次:{data?.count}</div>;
};
```

## 后续

关于类组件、model 缓存、models 自定注入插件化等内容都推荐值得学习,下面后续会推出一下内容，期待 ing:

- [x] [hox class 组件封装应用](https://blog.csdn.net/qq_37674616/article/details/115012507)
- [ ] @umi/plugin-model 学习 models 全局注入

## 相关链接

- [customer Hooks 到 shared Hooks](https://zhuanlan.zhihu.com/p/89518937)
- [hox 执行时机问题](https://github.com/umijs/hox/issues/7)

## 总结

全局状态管理核心步骤：

1. 创建一个工厂渲染一个虚拟组件
2. 在虚拟组件中执行自定义 hook,并更新数据
3. 通过观察者模式，来实现数据更新通过上面的思想就把一个局部状态提升到了全局，因此自定义 hook 创建的 Model 数据全局共享。

优点就像该库描述那样:只有一个 API,且省略了手动 Provider、useContext 消费等行为。

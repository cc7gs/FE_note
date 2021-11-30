---
nav:
  title: react及周边生态源码分析
  path: /react_depth
group:
  title: react系列
  path: /series
---

# useEffect vs useLayoutEffect

```ts | pure
import { useEffect, useState, useLayoutEffect } from 'react';
export default function App() {
  const [count, setCount] = useState(0);

  Promise.resolve().then(() => {
    console.log('Promise.resolve 是微任务, 故比useEffect先调用. 次序2');
  });

  useEffect(() => {
    console.log(
      'useEffect 在commitRoot阶段, 是异步执行, 它通过调度中心的messageChanel触发, 是一个宏任务. 故比微任务Promise.resolve后调用. 次序3',
    );
  }, [count]);

  useLayoutEffect(() => {
    console.log(
      'useLayoutEffect 在commitRoot阶段, 是同步执行, 故比Promise.resolve先调用. 次序1',
    );
  }, [count]);

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

demo 来源 https://codesandbox.io/s/fervent-napier-1ysb5?file=/src/App.tsx:0-611

## 结论

很多开发者使用 useEffect 来代替 componentDidMount,componentDidUpdate 是不准确的, 如果完全类比, useLayoutEffect 比 useEffect 更符合 componentDidMount,componentDidUpdate 的定义

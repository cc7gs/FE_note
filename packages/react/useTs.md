---
nav:
  title: 'react基础篇'
  path: /react
group:
  title: 工具
  path: /util
---

> ⚠️⚠️⚠️ 文章来源与网络中知识总结与提炼，想要了解更多点击文末中链接自行了解

# react 使用的 ts 技巧

## 组件默认值

```js
//function component
type GreetProps = { age: number } & typeof defaultProps;
const defaultProps = {
  age: 21,
};

const Greet = (props: GreetProps) => {
  /*...*/
};
Greet.defaultProps = defaultProps;
```

```js
//class component
type GreetProps = typeof Greet.defaultProps & {
  age: number,
};

class Greet extends React.Component<GreetProps> {
  static defaultProps = {
    age: 21,
  };
  /*...*/
}

// <Greet/>;
```

## 联合类型应用

```js
interface Square {
  kind: 'square';
  size: number;
}

interface Rectangle {
  kind: 'rectangle';
  width: number;
  height: number;
}
type Shape = Square | Rectangle;

function area(s: Shape) {
  if (s.kind === 'square') {
    return s.size * s.size;
  } else {
    return s.width * s.height;
  }
}
```

```js
type Props1 = { foo: string };
type Props2 = { bar: string };

function MyComponent(props: Props1 | Props2) {
  if ('foo' in props) {
    // props.bar // 报错,不存在属性
    return <div>{props.foo}</div>;
  } else {
    // props.foo //  报错,不存在属性
    return <div>{props.bar}</div>;
  }
}
const UsageComponent: React.FC = () => (
  <div>
    <MyComponent foo="foo" />
    <MyComponent bar="bar" />
    {/* <MyComponent foo="foo" bar="bar"/> // 无效 */}
  </div>
);
```

## 函数组件中应用范型

```js
interface Props<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
}

//魔法看这里
const List=<T extends unknown>(props: Props<T>)=> {
    const { items, renderItem } = props;
    const [state, setState] = useState<T[]>([])
    return (
        <div>
            {items.map(renderItem)}
            <button onClick={() => setState(items)}>Clone</button>
            {JSON.stringify(state, null, 2)}
        </div>
    )
}
```

现在我们回顾下函数组件:

```js
...
function List<T>(props:Props<T>){
	...
}
```

### 渲染 children

**bad**

```js
interface WrapperProps<T>{
    item:T;
    renderItem:(item:T)=>React.ReactNode;
    children:any; //👀
}
const Wrapper=<T extends {}>(props:WrapperProps<T>)=>{
    return(
        <div>
            {props.renderItem(props.item)}
            {props.children}
        </div>
    )
}
```

**good**

```js
// React.PropsWithChildren
interface WrapperProps<T>{
    item:T;
    renderItem:(item:T)=>React.ReactNode;
}
const Wrapper=<T extends {}>(props:React.PropsWithChildren<WrapperProps<T>>)=>{
    return(
        <div>
            {props.renderItem(props.item)}
            {props.children}
        </div>
    )
}
```

### 自定义 hooks 返回值

```js
/**
* as const 可以让数组中每个值拥有自己的类型
*/
  const useCtx=<A extends {}>(defaultValue:A)=>{
    type UpdateType=React.Dispatch<React.SetStateAction<typeof defaultValue>>;
    const defaultUpdate:UpdateType=()=>defaultUpdate;

    const ctx = React.createContext({
        state: defaultValue,
        update: defaultUpdate,
      });
    function Provider(props:React.PropsWithChildren<{}>){
        const [state,update]=React.useState(defaultValue);
        return <ctx.Provider value={{state,update}}  {...props}/>
    }
    return [ctx,Provider] as const //👀👀
  }
```

## links

[https://react-typescript-cheatsheet.netlify.app/]()

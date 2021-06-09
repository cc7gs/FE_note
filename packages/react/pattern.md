---
nav:
  title: React基础篇
  path: /react
group:
  title: 基础
  path: /basic
---

# 关于设计模式

> [仓库地址](https://github.com/cc7gs/react-workshop/tree/react-patterns)

## 基础使用（callback）

```js
import React, { useState } from 'react';
import { Switch } from '../component';

interface IProps {
  onToggle: (args: any) => void;
}

type IState = Readonly<{
  on: boolean,
}>;

function Usage() {
  const handleToggle = (args: any) => {
    console.log(args, 'click');
  };
  return <Toggle onToggle={handleToggle} />;
}
Usage.title = 'Build Toggle';

export { Usage as default };
```

`Toggle 组件 class component`

```js
/**
 * 2. 使用 class Component
 */
class Toggle extends React.Component<IProps, IState> {
  state = {
    on: false,
  };
  handleClick = () => {
    this.setState(
      ({ on }) => ({ on: !on }),
      () => {
        //callback
        this.props.onToggle(this.state.on);
      },
    );
  };
  render() {
    const { on } = this.state;
    return <Switch on={on} onClick={this.handleClick} />;
  }
}
```

`Toggle 组件 hooks版`

```js
/**
 * 1. 使用函数组件(hooks)
 */

const Toggle: React.FC<IProps> = (props) => {
  const [on, setOn] = useState(false);
  const handleClick = () => {
    setOn(!on);
    props.onToggle(!on);
  };
  return <Switch on={on} onClick={handleClick} />;
};
```

## 复合组件(Compound component)

复合组件设计模式一般应用在一些共享组件上。如 select 和 option , Tab 和 TabItem 等，通过复合组件，使用者只需要传递子组件，子组件所需要的 props 在父组件通过`React.Children.map`和`React.cloneElement`进行 props 传递封装，因此引用子组件的时候就没必要传递所有 props 了。下面引用项目`02.tsx`实例说明:

**使用处**

```js
function Usage() {
  const handleToggle = (args: any) => {
    console.log(args, 'click');
  };
  return (
    <Toggle onToggle={handleToggle}>
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Button />
      <Toggle.Off>The button is off</Toggle.Off>
    </Toggle>
  );
}
```

`Toggle组件`

```js
interface IProps {
    onToggle: (args: any) => void;
}

class Toggle extends React.Component<IProps>{
    static On: React.FC<any> = ({ on, children }) => <>{on ? children : null}</>
    static Off: React.FC<any> = ({ on, children }) => <>{on ? null : children}</>
    static Button: React.FC<any> = ({ on, toggle, ...props }) => (
        <Switch on={on} onClick={toggle} {...props} />
    )
    state = {
        on: false,
    }

    toggle = () => {
        this.setState({ on: !this.state.on }, () => {
            this.props.onToggle(this.state.on);
        })
    }
    render() {
       return React.Children.map(this.props.children,child=>(
           React.cloneElement(child as any,{
               on:this.state.on,
               toggle:this.toggle
           })
       ))
    }
}
```

### 进一步讨论

到目前为止,我们已经熟知复合模式都用处,现在我们对该问题进行进一步深入讨论，如果此时我们调用处的多层组件嵌套，像下面实例:

```js
<Toggle onToggle={onToggle}>
  <div className="xx">
    <Toggle.On>The button is on</Toggle.On>
  </div>
  <Toggle.Off>The button is off</Toggle.Off>
  <div>
    <Toggle.Button />
  </div>
</Toggle>
```

做组件 props 透传的或许会想到`context`,没错,利用数据状态管理可以很好解决组件层级管理数据共享的使用

`创建Togglecontext`

```js
const defaultValue = {
  on: false,
  toggle: () => {},
};
const ToggleContext = React.createContext(defaultValue);
```

`Toggle 组件使用`

```js
//...
  static On: React.FC<any> = ({ children }) => {
    const { on } = useContext(ToggleContext);
    return (on ? children : null)
  }
  static Off: React.FC<any> = ({ children }) => {
    const { on } = useContext(ToggleContext);
    return (on ? null : children)
  }
  static Button: React.FC<any> = (props) => {
    const { on, toggle } = useContext(ToggleContext)
    return (
      <Switch on={on} onClick={toggle} {...props} />
    )
  }
  static contextType = ToggleContext
    // ...省略状态和方法
  render(){
    return (
      <ToggleContext.Provider value={{ on, toggle: this.toggle }}>
        {this.props.children}
      </ToggleContext.Provider>
    )
   }
```

## render Props

在调用组件时，引入一个函数类型的 props 这个 props 定义了组件的渲染方式。最终实现代码复用。

下面还是以上面复合组件(Compound component)案例为例

`使用处`

```js
function Usage({ onToggle = (args: any) => console.log('onToggle', args) }) {
  return (
    <Toggle onToggle={onToggle}>
      {({ on, toggle }) => (
        <div>
          {on ? 'The button is on' : 'The button is off'}
          <Switch on={on} onClick={toggle} />
          <hr />
          <button aria-label="custom-button" onClick={toggle}>
            {on ? 'on' : 'off'}
          </button>
        </div>
      )}
    </Toggle>
  );
}
```

`Toggle component`

```js
//方法状态省略
getStateAndHelpers(){
      return{
        on:this.state.on,
        toggle:this.toggle

      }
    }
  render() {
    const {on} = this.state
    return this.props.children(this.getStateAndHelpers())
  }
  //...
```

## Function as Child Component

是指父组件接收一个函数以实现复用 代码如下：

```js
import { Parent } from './components';
function example() {
  return <Parent>{(param) => <div> {param}</div>}</Parent>;
}
```

```js
import React,{Component} from 'react'
class Parent extends Component{
    render(){
        <div> {this.props.children (this.state.username))</div>
    }
}

```

这种方式的特点在于 Parent 组件往往拥有一些内部状态或者需要做一些复杂且共享的计算，这些数据需要对外暴露以实现复用。通过传递函数参数的方式来实现数据复用。

## state Reducer

该模式允许用户根据逻辑来控制公共组件的状态。场景：我们目前有一个 toggle 组件，可能点击按钮来切换状态，或者点击 reset 按钮重置状态；目前加一个控制条件，当用户点击 3 次后就不能在切换状态。 [外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-dntJdJ65-1571581189251)(./src/images/state_reducer.png)]

### 搭建基础 toogle 组件

根据前面 render props 基础上首先实现 toggle 组件。

`Use page`调用处

```js
function Usage({
  onToggle = (...args: any) => console.log('onToggle', ...args),
  onReset = (...args: any) => console.log('onReset', ...args),
}) {
  return (
    <Toggle onToggle={onToggle} onReset={onReset}>
      {({ getTogglerProps, on, reset }) => (
        <div>
          <Switch {...getTogglerProps({ on })} />
          <hr />
          <button onClick={() => reset()}>Reset</button>
        </div>
      )}
    </Toggle>
  );
}
```

注释:`getTogglerProps`用于获取 props 和更新公共 state 状态

`Toggle component`

```js
//用于处理多个函数调用依次调用
const callAll =
  (...fns: ((...args: any) => void)[]) =>
  (...args: any) =>
    fns.forEach((fn) => fn && fn(...args));

interface IProps {
  onToggle: (on: boolean) => void;
  initialOn?: boolean;
  onReset: (on: boolean) => void;
  children: (props: any) => any;
}
interface IState {
  on: boolean;
}
class Toggle extends React.Component<IProps, IState> {
  static defaultProps = {
    initialOn: false,
    onReset: () => {},
  };
  initalState = { on: this.props.initialOn };
  state = this.initalState;

  toggle = () =>
    this.setState(
      ({ on }) => ({ on: !on }),
      () => this.props.onToggle(this.state.on),
    );
  onRest = () => {
    this.setState(this.initalState, () => {
      this.props.onReset(this.state.on);
    });
  };
  getTogglerProps = ({ onClick = () => {}, ...props } = {}) => {
    return {
      onClick: callAll(onClick, this.toggle),
      ...props,
    };
  };
  getStateAndHelpers() {
    return {
      on: this.state.on,
      toggle: this.toggle,
      reset: this.onRest,
      getTogglerProps: this.getTogglerProps,
    };
  }
  render() {
    return this.props.children(this.getStateAndHelpers());
  }
}
```

到目前我们已经实现了一个 Toggle 组件和 reset 按钮,目前一切都正常工作，那么要如何在`use page`页面根据点击此数禁止用户切换 Toggle 状态呢？

### 添加 state Reducer

根据业务需求我们`use Page`页面修改如下：

```js
const initialState = ((0)[(timesClicked, setTimes)] = useState(initialState));
const handleToggle = (...args: any) => {
  setTimes(timesClicked + 1);
  props.onToggle(...args);
};
const handleReset = (...args: any) => {
  setTimes(this.initialState);
  props.onReset(...args);
};

<Toggle onToggle={handleToggle} onReset={handleReset}>
  {({ getTogglerProps, on, reset }) => (
    <div>
      <Switch {...getTogglerProps({ on })} />
      {timesClicked > 4 ? (
        <div data-testid="notice">
          Whoa, you clicked too much!
          <br />
        </div>
      ) : timesClicked > 0 ? (
        <div data-testid="click-count">Click count: {timesClicked}</div>
      ) : null}
      <hr />
      <button onClick={() => reset()}>Reset</button>
    </div>
  )}
</Toggle>;
//...
```

此时我们已经能够记录 tiemsclick,和显示相应的文字，现在我们添加 `stateReducer`

```js
const toggleStateReducer = (state: UsageState, changes: any) => {
    if (timesClicked >= 4) {
      return { ...changes, on: false }
    }
    return changes
  }
  //...
  <Toggle
    stateReucer={toggleStateReducer}
  >
```

现在我们大致完成了 `use page`使用，现在看下 `Toggle`组件的修改

`Toggle component`

```js
 state =this.initalState
 inernalSetState(changes: any, callback: () => void) {
    this.setState((state) => {
      // handle function setState call
      const changeObject =
        typeof changes === 'function' ? changes(state) : changes

      // state reducer
      const reducerChange =
        this.props.stateReducer(state, changeObject) || {}

      return (
        Object.keys(reducerChange).length
          ? reducerChange
          : null
      )
    }, callback)
  }

  reset = () =>
    this.inernalSetState(this.initialState, () =>
      this.props.onReset(this.state.on),
    )
  toggle = () =>
    this.inernalSetState(
      ({ on }:IState) => ({ on: !on }),
      () => this.props.onToggle(this.state.on),
    )
```

首先我们在 Toggle 组件中实现了`inernalSetState(changes,callback)`方法,该方法用来模拟 `setSate(updateState,callback)`

- updateState 可以是`funciton`或者 `object` 即`(sate)=>updateSate`或者`{}`
- 我们根据`use page`中 sateReudcuer 方法返回最新状态
- 之后我们替换所有 `setSate`更改为`internalSetState`

完整代码在[仓库](https://github.com/cc7gs/react-workshop/tree/react-patterns) `containers/08.tsx`中

## Provider Pattern

[context API](https://zh-hans.reactjs.org/docs/context.html#contextprovider)

## 高阶组件(HOC)

[HOC 文档](https://zh-hans.reactjs.org/docs/higher-order-components.html#use-hocs-for-crossing-cutting-concerns)

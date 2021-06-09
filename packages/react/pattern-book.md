---
nav:
  title: react基础篇
  path: /react
group:
  title: 基础
  path: /basic
---

# React 《设计模式与最佳实践》 个人总结

## 高阶组件

    高阶组件即接受组件返回组件,形式如下:

> const HoC=Component=>EnhanceComponent 案例: 对获取数据封装

对数据获取渲染,我们会这么做...

```javascript
export default class UserList extends Component {
  state = {
    list: [],
  };
  componentDidMount() {
    fetch('')
      .then((response) => response.json())
      .then((list) => this.setState({ list }));
  }
  render() {
    return (
      <>
        <ul>
          {this.state.list.map((user) => (
            <li key={user.id}>{user['name']}</li>
          ))}
        </ul>
      </>
    );
  }
}
```

封装获取数据后,可以让多处代码获取同一个 api 数据。我们可以这么做...

```javascript
const widthData: IWidthData = url => Component => {
    return class extends React.Component {
        constructor(props: any) {
            super(props);
            this.state = { list: [{name:'cc',id:'1'}] }
        }
        componentDidMount() {
            fetch(url)
                .then(response => response.json())
                .then(list => this.setState({ list }))
        }
        render() {
            return <Component {...this.props} {...this.state} />
        }
    }
}
type IList = Readonly<{
    list: any[]
}>;

const List = ({ list }: IList) => (
    <ul>
        {
            list.map(user => (
                <li key={user.id}>{user['name']}</li>
            ))
        }
    </ul>
);

export default widthData('url')(List)
//这里也可以使用props动态修改url,修改方案如下
componentDidMount(){
    const _url=typeof url ==='function'?url(this.props):url;
    // ...
}
export default widthData(props=>`url/${props.username}`)(List)
```

## css in javascript

### 行内样式

```javascript
const style = {
  color: 'blue',
};
const Button = () => <button style={style}>click me</button>;
```

通过行内样式我们可以动态去修改样式,但是也存在缺陷:

- 不能使用伪元素
- 不能使用媒体查询
- css 动画无法模拟
- 服务端渲染时会使页面体积变大

### radium

```javascript
import radium from 'radium';
const styles = {
  backgroundColor: '#ff0000',
  width: 320,
  padding: 20,
  borderRadius: 5,
  border: 'none',
  outline: 'none',
  ':hover': {
    color: '#fff',
    backgroundColor: 'blue',
  },
  '@media (max-width:480)': {
    width: 160,
  },
};
const Button = () => <button style={styles}>click me </button>;
export default radium(Button);
```

### css 模块

```javascript
import styles from './btn.module.css'
const Button=()=><button className={styles.btn} >click me </button>

//btn.module.css
.btn{
    background-color:'#ff0000';
    width:320;
    padding:20;
    border-radius:5;
    border:'none';
    outline:'none';
}
```

### react css 模块

```javascript
import cssModules from 'react-css-modules';
const Button = () => <button styleName="button">Click me!</button>;
export default cssModules(Button, styles);
```

### styled Component

```javascript
import styled from 'styled-components';
const Button = styled.button`
  background: #ff0000;
  width: 320px;
  padding: 20px;
  border-radius: 5px;
  border: none;
  outline: none;
`;
export default Button;
```

## 一些概念

### 命令式编程与声明式编程区别

两者区别:命令式编程描述代码如何工作，而声明式编程则表明想要实现什么目的。例如下面将大写字符串的数组变小写字符串数组，两者编程的区别:

**命令时编程这么做:**

```javascript
const toLowerCase = (input) => {
  const output = [];
  for (let i = 0; i < input.length; i++) {
    output.push(input[i].toLowerCase());
  }
  return output;
};
```

**声明式编程这么做:**

```javascript
const toLowerCase = (input) => input.map((v) => v.toLowerCase());
```

### 总结

- 命令式写法不够优雅,可读性、维护性差
- 声明式编程避免了创建和修改状态

## 函数编程概念

它是一种声明式范式，能够避免代码副作用,同时推崇数据不可变。

- 函数是一等对象
- 纯粹性(不产生副作用)
- 不可变性
- 柯里化

### 柯里化

    它是函数编程的常用技巧，过程是将多参数函数转换成单参数函数，这些单参数函数返回值也是函数。

## 推荐一些好用库

[react-refetch](https://www.npmjs.com/package/react-refetch) [react-addons-css-transition-group](https://github.com/reactjs/react-transition-group/tree/v1-stable) [react-motion](https://www.npmjs.com/package/react-motion) [radium](https://www.npmjs.com/package/radium) [react-css-modules](https://www.npmjs.com/package/react-css-modules) [style-components](https://www.styled-components.com/)

---
nav:
  title: react基础篇
  path: /react
group:
  title: 基础
  path: /basic
---

# redux 总结

## Redux 的基本原则

    1. 唯一数据源
    2. 保持状态只读
    3. 数据改变只能通过纯函数完成

### 容器组件和木偶组件

在 Redux 框架下，一个 React 组件基本上就是要完成以下两个功能:

- 和 Redux Store 打交道,读取 Store 的状态,用于初始化组件的状态，同时还要监听 Store 的状态改变;当 Store 状态发生变化时，需要更新组件状态，从而驱动组件重新渲染;当需要更新 Store 状态时,就要派发 action 对象；
- 根据当前 Props 和 state,渲染出用户界面

**我们将一个任务拆分成两个组件,然后两个组件嵌套起来,完成原本一个组件完成的所有任务**。

- 与 Redux Store 打交道的组件,处于外层，所以被叫做 ==容器组件==
- 对于只专心负责渲染界面的组件，处于内层,叫做==展示组件==或称为木偶组件

## React 和 Redux 应用规范和要点

### 模块化应用要点

- 代码文件的组织结构
- 确定模块的边界
- store 的状态树

### 代码文件的组织方式

#### 按角色组织

MVC 中，应用代码分为 Controller Model View ，分别代表 种模块角色，就是把所有的 Con oller 代码放在 controllers 目录下，把所有的 Model 代码放在 models 录下，把 View 代码放在 views 目录下 这种组织代码的方式，叫做“按角色组织”

#### 按功能组织

把完成同一应用功能的代码放在一个目录下,一个应用功能包含多个角色的代码。在 Redux 中，不同的角色就是 reducer、actions 和视图，而应用功能对应的就是用户界面上的交互模块。

```
todoList/
    actons.js
    actionTypes.jS
    index.js
    reducer.js
    views/
        cornponent.js
        container.js
filter/
    actions.js
    actionTypes.js
    index. js
    reducer.js
    views/
        cornponent.js
        container.js
```

- actionTypes.js 定义 action 类型;
- actions.js 定义 action 构造函数,决定了这个功能模块可以接受的动作;
- reducer.js 定义了这个功能模块如何相应 actions.js 中定义的动作;
- views 目录,包含这个功能模块中所以 React 组件
- index.js 文件的统一入口

### 模块接口

我下面我们以功能模块 todoList 和 filter，为例。当我们在 filter 模块想要使用 todoList 的 action 构造函数和视图该如何导入呢? **bad**

```
import * as actions from '../todoList/actions';
import container as TodoList from './todoList/views/container';
```

因为 filter 模块依赖 todoList 模块的内部结构。 **Good** 在 todoList/index.js 中,代码如下:

```
import * as actions from './action.js'
import reducer from './reducer.js'
import view from './views/container.js'

export {actions,reducer,view}

//下面在filter模块导入todoList的代码
import {actions,reducer,view as TodoList} from '../todoList';
```

### 状态树的设计

- 一个模块控制一个状态节点
- 避免冗余数据
- 树形结构扁平

**一个模块控制一个状态节点** Store 上的每个 state 只能通过 reducer 来更改,而每个 reducer 只能更改 redux 状态树上一个节点下的数据。

## React 组件在 React-redux 中性能优化

react 在渲染数据时采用的"浅层比较"的方式只看这两个 prop 是不是同一个对象的引用。

### 样式写法优化

**Bad**

```
<Todo style={{color:'red'}}/>
```

**Good**

```
//确保初始化只执行一次,不要放到render中
const fooStyle={color:'red'};

<Foo style={fooStyle}/>
```

### props 函数传递方式

**Bad**

```
<TodoItem
    key={item.id}
    text={item.text}
    completed={item.completed}
    onToggle={()=>{ onToggleTodo(item.id)}}
    onRemove={()=>onRemoveTodo(item.id)}
 />
```

上面的做法中，我们将回调函数传递给子组件的 onClick 事件，redux 认为每次都是一个新的函数,所以,我们可以将要传递的参数以属性传递给组件,让子组件去传递函数(mapDispathToProps 中)

```
<TodoItem
    key={item.id}
    id={item.id}
    text={item.text}
    completed={item.completed}
 />

const mapDispatchToProps = (dispath: any, ownProps: any) => {
    const { id } = ownProps;
    return {
        onToggle: () => { console.log('onToggle'); dispath(toggleTodo(id)) },
        onRemove: () => dispath(removeTodo(id))
    }
}
//木偶组件应该用connect包起来，让redux 判读props是否改变
export default connect(null,mapDispatchToProps)(TodoItem);
```

## React 组件访问服务器的优缺点

**优点：**

- 直接简单,容易理解
- 代码非常清晰

**缺点：**

- 状态放到组件，使其变得庞大复杂

**改进：** 我们可以使用 Redux 做状态管理来访问服务器。

- 使用 redux-thunk 中间件 来解决异步请求问题 [外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-fx4eqG5c-1623253318273)(./redux_thunk.jpg)]

### 异步操作的终止

对于访问服务器这样的异步操作，从发起操作到操作结束，都会有段时间延迟，在这段延迟时间中，用户可能希望中止异步操作。访问服务器这样的输入输出操作，复杂就复杂在返回的结果和时间都是不可靠的，即使是访问同样一个服务器，也完全可能先发出的请求后收到结果。

案例场景: 如果一个用户从一个请求发出到获得响应的过程中，用户等不及，或者改变主意想要执行另一个操作，用户就会进行一些操作发送新的请求发往服务器。

解决方案:

1. 我们可以从视图入手,当 API 请求发送出去后,立即将城市选择器锁住,设为不可改变,直到 API 请求返回结果才解锁。

**缺点:** 用户体验不是很好,因为服务器响应是不可控的,锁的时间由服务器响应时间来决定，这不是一个最好方案。 2. 我们选择用户最后一次提交请求，其它请求我们将丢弃。

下面我们对一个天气请求函数分析(代码采用 tyescript 如果不用则将类型定义去掉就可以了): **不加中断:**

```javascript
export const fetchWeather = (cityCode: string) => {
  return (dispatch: any) => {
    const apiUrl = `/data/cityinfo/${cityCode}.html`;
    dispatch(fetchWeatherStarted());
    fetch(apiUrl)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('Fail to get response will start' + response.status);
        }
        response
          .json()
          .then(({ weatherinfo }) => {
            dispatch(fetchWeatherSuccess(weatherinfo));
          })
          .catch((error) => {
            throw new Error('Invaild json response' + error);
          });
      })
      .catch((error) => {
        dispatch(fetchWeatherFilure(error));
      });
  };
};
```

**添加中断:**

```javascript
let nextSeqId = 0;
export const fetchWeather = (cityCode: string) => {
  return (dispatch: any) => {
    console.log('function');
    const apiUrl = `/data/cityinfo/${cityCode}.html`;
    const seqId = ++nextSeqId;
    const dispatchIfVaild = (action: any) => {
      if (seqId == nextSeqId) {
        console.log('请求开始');
        return dispatch(action);
      }
    };
    dispatchIfVaild(fetchWeatherStarted());
    fetch(apiUrl)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('Fail to get response will start' + response.status);
        }
        response
          .json()
          .then(({ weatherinfo }) => {
            dispatch(fetchWeatherSuccess(weatherinfo));
          })
          .catch((error) => {
            throw new Error('Invaild json response' + error);
          });
      })
      .catch((error) => {
        dispatch(fetchWeatherFilure(error));
      })
      .finally(() => {
        console.log('数据响应回来');
      });
  };
};
```

## 测试篇

我们通过 create-reat-app 构建的项目后,就自带了 Jest 库

```
npm run test
```

Jest 很智能,只运行修改代码影响的单元测试，同时我们还可以选择只运行满足过滤条件的单元测试用例等功能。

### 构建测试目录和文件

一. 方式一 我们在项目根目录创建一个名==test 目录==，和项目的 src 目录并行,在 test 目录建立和 src 对应子目录结构，每个单元测试的文件都以**test.js** 二. 我们可以在每个目录创建**test**子目录,用于存放对应这个目录的单元测试。

### 测试代码

在 Jest 框架下,每个测试用例用一个 it 函数代码,it 函数第**一个参数是一个字符串**,代表的就是测试用例名称,**第二个参数是一个函数**,包含的就是实际的测试用例过程。

```javascript
it('should return string when invoked', () => {});
```

### 测试套件(describe 函数)

我们有时对一个被测对象创建多个测试用例，此时对于如何组成多个测试用例(it),此时我们就需要测试套件。

```javascript
describe('func',()=>{
    it('should return string when invoked',()={

    })
})
```

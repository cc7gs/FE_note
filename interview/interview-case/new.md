
## 构建函数与 操作符 new
  - 构造函数或简言之，就是常规函数，但构造函数有个共同的约定，命名它们首字母要大写。
  - 构造函数只能使用 new 来调用。这样的调用意味着在开始时创建空的 this，并在最后返回填充的对象。
  
### 当一个函数作为 new Fn(...)如何执行?

它执行以下步骤:
1. 一个新的空对象被创建并分配给this
2. 函数体执行，通常它会修改this,为其添加新的属性

```javascript
function People(name){
  //this={} (隐式创建)
  this.name=name;

  // return this (隐式返回)
}
```

### 实现一个new 操作?
1. 创建一个空对象
2. 空对象原型链接到另一个对象
3. 将空对象this 作为上下文
4. 如果该函数没有返回对象，则返回this

```javascript
function create(){
  let obj={};
  const Cons=[].shift.call(arguments);
  obj.__proto__=Cons.prototype;
  const result=Cons.apply(obj,arguments);
  return  result instanceof Object? result: obj;
}
function People(name){
  this.name=name;
}

//测试调用
create(People,'cc');
```
### 创建函数A和函数B,如 new A()==new B()?
```javascript
let obj={};
function A() { return obj; }
function B() { return obj; }

let a = new A();
let b = new B();

alert( a == b ); // true 
```
### 
**补充:**
  通常，构造函数没有 return 语句。他们的任务是将所有必要的东西写入 this，并自动转换。
但是，如果有 return 语句，那么规则很简单：
- 如果 return 对象，则返回它，而不是 this。
- 如果 return 一个原函数，则忽略。
  
**换一种说法，带有对象的 return 返回该对象，在所有其他情况下返回 this**

# 参考文章
[javascript info](https://zh.javascript.info/)

声明:本文所有资料来自网络摘抄，并自己整理。如果问题请联系我。
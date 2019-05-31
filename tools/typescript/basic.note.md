# 初识typescript

>  npm install -g typescript

在编辑器，将下面的代码输入到greeter.ts文件里：

## 类型注解

```javascript
function greeter(person:string){
  return `hello, ${person}`
}
let user='cc';
console.log(greeter(user));
```

## 接口

```javascript
interface Persion {
  firstName: string;
  lastName: string;
}
/**
 * @description 接口使用
 * @param person
 */
function greeterTwo(person: Persion) {
  return `Hello， ${person.firstName} ${person.lastName}`;
}
let userTwo = { firstName: 'wu', lastName: 'chen' };
```
## 运行代码

> tsc greeter.ts
如果通过项目依赖安装,则可以通过以下命令
> npx tsc greeter.ts

[source](./basic-ts/greeter.ts)

# 基础类型

## 元祖 Tuple

```javascript
//声明 元祖类型
let x:[string,number]

//初始化
x=['wu',22]; //0k
x-[22,'wu'] //Error 顺序类型不一致 
//访问越界元素
x[3]='chen'; //Ok 字符串可以赋值给 (string | number)类型
console.log(x[5].toString()); // ok
x=[4]=true; //Error 布尔不是(string | number)类型
```
## 枚举 (enum)

```javascript
enum Color{
  Red,
  Green,
  Blue
}
let c:Color=Color.Green  //1 默认下标从0开始

enum ColorTwo={Red=1,Green,Blue};
let colorName: string = Color[2]; // Green 它在代码里的值是2
```
## Any
当一个值可能来自于动态的内容,或者我们不确定变量的类型时，可以使用Any

```javascript
let notSure:any=4;
notSure = false; //Ok
```

## Void 
它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 void

```javascript
function say():void {
  console.log('this is no return anything');
}
```
## Never
never类型表示的那些永远不存在的值的类型。例如:抛出异常、或根本不可能有返回值的函数
```javascript
//无法到达终点
function error(message:string):never{
  throw new Error(message);
}
function infiniteLoop():never{
  while(true){}
}
```





## 类型断言
类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用。
```javascript
//表示方式一
let someValue:any='this is a string';
let strLength:number=(<string>someValue).length;
```
```javascript
// 表示方法二
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```
注:当你在TypeScript里使用JSX时，只有 as语法断言是被允许的。
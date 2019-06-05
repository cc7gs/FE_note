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


# 接口
接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。
```javascript
interface LabelledValue {
  label: string;
  number?: number; //可选属性
  readonly size: number; //只读属性
  [propName: string]: any;// 索引属性签名
}
function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}
let myobj = { size: 10,label:'size 10 Object'};
printLabel(myobj);
```
 LabelledValue接口就好比一个名字，用来描述上面例子里的要求。它代表了有一个 label属性且类型为string的对象。

## 接口函数类型
 ```javascript
interface SearchFunc {
  (source: string, subString: string): boolean
}
let mySearch: SearchFunc = (source, subString) => {
  return source.search(subString) > -1;
}
```
## 可索引类型
 
给索引签名设置只读，防止给索引赋值
```javascript
interface ReadonlyStringArray{
  readonly [index:number]:string;
}
let myArray:ReadonlyStringArray=['cc','wgs'];
// myArray[1]='readonly'; //error!
```
## 混合类型
```javascript
interface Counter{
  (start:number):string;
  interval:number;
  reset():void; 
}
function getCounter():Counter{
  let counter=(function(start:number){
      
  }) as Counter;
  counter.interval=23;
  counter.reset=function(){
    console.log('reset call func');
  }
  return counter;
}
let counter=getCounter();
counter(10);
counter.reset();
counter.interval=5
```
## 接口继承类
当一个接口继承一个类时，会继承类的所有成员包括私有和保护成员，但并没有提供具体的实现。因此一个接口若继承一个拥有私有成员的类时，这个接口只能由该类或者子类所实现。
# 类

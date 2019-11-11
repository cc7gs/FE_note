# 初识typescript

>  npm install -g typescript

`初始化配置项`

> tsc -- init 


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

# 基础篇

## 元祖 Tuple

```javascript
声明 元祖类型
let x:[string,number]

初始化
x=['wu',22]; 0k
x-[22,'wu'] Error 顺序类型不一致 
```
## 枚举 (enum)

```javascript
enum Color{
  Red,
  Green,
  Blue
}
let c:Color=Color.Green  1 默认下标从0开始

enum ColorTwo={Red=1,Green,Blue};
let colorName: string = Color[2];  Green 它在代码里的值是2
```
## Any
当一个值可能来自于动态的内容,或者我们不确定变量的类型时，可以使用Any

```javascript
let notSure:any=4;
notSure = false; Ok
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
无法到达终点
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
表示方式一
let someValue:any='this is a string';
let strLength:number=(<string>someValue).length;
```
```javascript
// 表示方法二
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```
注:当你在TypeScript里使用JSX时，只有 as语法断言是被允许的。

## 接口
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

### 接口函数类型
 ```javascript
interface SearchFunc {
  (source: string, subString: string): boolean
}
let mySearch: SearchFunc = (source, subString) => {
  return source.search(subString) > -1;
}
```
### 可索引类型
 
给索引签名设置只读，防止给索引赋值
```javascript
interface ReadonlyStringArray{
  readonly [index:number]:string;
}
let myArray:ReadonlyStringArray=['cc','wgs'];
// myArray[1]='readonly'; //error!
```
### 混合类型
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
### 接口继承类
当一个接口继承一个类时，会继承类的所有成员包括私有和保护成员，但并没有提供具体的实现。因此一个接口若继承一个拥有私有成员的类时，这个接口只能由该类或者子类所实现。
```javascript
class Control {
  private state!: boolean;
}
interface SelectControl extends Control{
  select():void;
}
//报错，因为 SelectText 没有继承 Control,
//或者说 只有是Control的子类才可以实现 SelectControl
class SelectText implements SelectControl {
  select() {

  }
}
```
## 类
```javascript
class Employee{
  fullName:string; //默认是共有的
  private _age:number; //私有属性
  static MaxNum=20; //静态属性
  get getAge():number{
    return this._age;
  }
  set setAge(age:number){
    this._age=age;
    console.log('set age');
  }

}
let employee=new Employee();
employee.setAge(22);
employee.fullName='wu chen';
//修改静态属性
let num:typeof Employee=Employee;
num.maxNum=30;
```
## 函数
```javascript
//默认参数
function buildName(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
}

//可选参数
function buildName(firstName:string,lastName?:string){

}

//剩余参数类型定义
typeof addFn=(a:number,...res:number[])=>void;


```
## 泛型
可以使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据。

```javascript
//泛型,这样可以确保传入的类型与返回类型一致
function people<T>(name:T):T{
  return name
}
//泛型接口
interface People<T>{
  (name:T):T
}
//泛型类
class People<T>{
  say(name:T)=>T;
}
let people=new People<string>();
people.say=function(name){
  return name;
}
```
# 高阶篇
## 类型保护
在特定的区块中保证变量属于某一中类型

- 使用 instanceof 进行对象类型判断
- typeof进行基本类型判断
- in 关键字可以判断属性是否在对象中

```js
let a=1;
let b='1';
type Type=string|number;

function Print(type:Type){
  if(typeof type==='number'){
    console.log('number',type.toFixed(2))
  }
  if(typeof type==='string'){
    console.log('string',type.toUpperCase())
  }
}
```
`- 可选类型保护区块（借助可选类型返回公共属性,来区分不同类型）`
```js
interface Rtangle{
  kind:'tangle',
  w:number;
  h:number
}
interface Circle{
  kind:'circle',
  r:number;
}
type Shape=Rtangle|Circle;

function area(s:Shape){
  switch(s.kind){
    case 'tangle':
      return s.h*s.w;
    case 'circle':
      return Math.PI*s.r**2;
    default:
      return ((e:never)=>{throw Error(`没有覆盖所有可选类型${e}`)})(s)
  }
}
```
## 交叉类型
同时具备多个类型,使用 `&`符号连接
```js
interface Dog{
  run():void;
}
interface Cat{
  jump():void;
}
let Pet:Dog&Cat={
  run(){},
  jump(){}
}
```
## 索引类型
```js
const obj={
  a:'1',
  b:2
}
function getValues<T,k extends keyof T>(obj:T,keys:k[]):T[k][]{
  return keys.map(key=>obj[key])
}
getValues(obj,['a']); //ok
getValues(obj,['c']); //ts 报错 c不是 obj 属性

```
## 映射类型
```js
interface IObject{
  a:1,
  b:2
};
type ReadonlyObj=Readonly<IObject>; //只读映射
type PartialObj=Partial<IObject>; //可选映射 
type PickObj=Pick<obj,'a'>; //抽取接口属性  ==> {a:number}

```
### ts 中相应实现

- ts 中Readonly  实现
```js
type Readonly<T>={
  readonly [P in keyof T]:T[P]
}  
```
- ts 中 Pick 实现
```js
type Pick<T,K extends keyof T>={
  [P in K]:T[P]
}
```

# 配置文件
```json
{
  "compilerOptions": {
     /* 基础配置*/
     "incremental": true,                    //增量编译     
     "diagnostics":true,                     //打印诊断信息

     "target": "es5",                        /* 目标语言版本: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019' or 'ESNEXT'. */
     "module": "commonjs",                   /* 生产代码的模块标准: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
     
     "lib": [],                             /* ts 需要引入的库,即声明文件、dom等 */
     
     "allowJs": true,                       /*允许编译js文件（js、jsx） */
     "checkJs": true,                       /* 允许在js文件中报错,通常配合 allowJs*/
     "jsx": "preserve",                     /* jsx编译的标准: 'preserve', 'react-native', or 'react'. */
     "outDir": "./",                        /*指定输出目录 */
     "rootDir": "./",                       /* 指定输入文件目录(用于输出) */
     "outFile": "./",                       /* 多个相互依赖的文件生成一个文件，用于AMD模块中*/

     "declaration": true,                   /* 生成声明文件 （'.d.ts'） */
     "declarationMap": true,                /* 生成声明文件的 sourceMap */
     "sourceMap": true,                     /* 生成目标文件的 sourceMap */
     "typeRoots": [],                       /* 声明文件的来源 默认 node_modules/@types */
     "types":[],                            /* 声明文件包 */

     "composite": true,                     /* 启动项目编译*/
     "tsBuildInfoFile": "./",               /* 指定文件以存储增量编译信息 */
     "removeComments": true,                /* 删除注释 */
     "noEmit": true,                        /* 不输出文件 */
     "importHelpers": true,                 /* 通过 'tslib'引入 helper 函数. */
     "downlevelIteration": true,            /*降级遍历器的实现*/
     "isolatedModules": true,               /* (similar to 'ts.transpileModule'). */

    /* 类型检查 */
     "strict": true,                        /* 开启所有的严格类型检查 */
     "noImplicitAny": true,                 /* 不允许有 any 类型 */
     "strictNullChecks": true,              /* 不允许将 null、undefind 赋值给其它类型 */
     "strictFunctionTypes": true,           /* 不允许函数类型双向协变 */
     "strictBindCallApply": true,           /* 严格的 'bind', 'call', 和 'apply' 检查 */
     "strictPropertyInitialization": true,  /* 类的实例必须初始化*/
     "noImplicitThis": true,                /* 不允许this 有隐式的 any */
     "alwaysStrict": true,                  /* 将 "use strict"注入每一个文件中 */

    /* 函数的检查*/
     "noUnusedLocals": true,                /* 检查只声明未使用的局部变量 */
     "noUnusedParameters": true,            /* 检查未使用的函数参数 */
     "noImplicitReturns": true,             /* 每一个分支都要有返回值 */
     "noFallthroughCasesInSwitch": true,    /* 防止 switch 穿透(没有break)*/

    /* 模块配置 */
     "moduleResolution": "node",            /* 模块解析策略: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
     "baseUrl": "./",                       /* 解析非相对路径的基地址*/
     "paths": {},                           /* 路径的映射相对 baseUrl */
     "rootDirs": [],                        /* 将多个目录放到一个虚拟目录下 */
     "allowSyntheticDefaultImports": true,  /* 允许从模块进行默认导入而没有默认导出 */
     "esModuleInterop": true,                  /* 允许 export 导出、由 import 导入 */
     "preserveSymlinks": true,              /* Do not resolve the real path of symlinks. */
     "allowUmdGlobalAccess": true,          /*允许在模块中访问UMD全局变量*/

  },
  "include":[],                             //编译后去除层级，
  "extends":"",                             //继承的配置
}

```
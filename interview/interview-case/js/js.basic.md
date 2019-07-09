# []==[] 返回什么？
== 转换规则如下：
1. 首先判断两者类型是否相同，相同的话就是比较大小
2. 类型不同则会进行类型转换
3. null==undefined 返回true
4. 如果有判断的是string和number,则将字符串转换为number;
5. 如果判断一方为boolean,则转换为number
6. 判断一方是对象,另一方是string、number、symbol则会把object转化为原始类型在进行比较
7. 如果两个操作数都是对象,则比较它们是不是同一个对象。如果不是同一个对象则返回true,否则返回false
```javascript
[]==[] //false 因为地址值不同
```
## []==![] ?
```javascript
[]==false
[]==0
Number([])==0  //true
```
## [1,2]+4?
    首先将数组通过toString转为字符串 1,2;因此结果为‘1,24’
## 4*[] 与 4*[1,2]
    对于除了加法外的运算符来说，只要有一方是数字则另一方就会被转化为数字
```javascript
4*[]  //==> 0
4*[1,2] //NaN   Number([1,2])==>NaN
```
## 'a'++'b'?
> 'a'++'b' ==>'aNaN'


# symbol 是什么？ 解决什么问题？
- Symbol是es6引入的新类型,它是一切非字符串的对象key的集合。
- 作用是生成唯一值,可以保证不会与其他属性名产生冲突。
- 不是对象、是原始数据类型，因此不能使用new 关键字或者为其添加属性
- symbol值永不相等,即使传入相同的参数
- 不能和其它类型值进行运算，可以显示转换字符串和boolean

## 作用一,避免重写、对遍历隐藏属性

```javascript
let user={};
let id=Symbol('id');
user[id]='symbol value';
user.id='ID Value';
console.log(user[id]); //symbol value
console.log(user.id); // ID value
//'隐藏' symbol 属性
console.log(Object.keys(user)) // ['id']
for(let key in user){console.log(key) } //['id']
```
## 全局Symbol
```javascript
let name=Symbol('cc');

//从全局注册表中读取
let _name=Symbol.for('cc');

name===Symbol('cc') //false
_name===Symbol.for('cc') //true

//根据全局Symbol 反查名称
Symbol.keyFor(_name) // cc
Symbol.keyFor(name) //undefined

```
## 作用二,系统symbol
javascript 使用了许多系统symbol,这些symbol属性可以作为==symbol.*==访问。我们可以使用它们改变一些内置行为。
- Symbol.iterator
- Symbol.toPrimitive
-  ...等等
```javascript
let obj={
    toString(){
        return '1'
    },
    valueOf(){
        return 1
    },
    [Symbol.toPrimitive](hint){
        console.log('toPrimitive',hint);
        return 'hint';
    }
}
+obj //hint：number  ==> +'hinit' ==>NaN
obj+200 //hint:default ==> 'hint'+200 ==>'hint200'
```


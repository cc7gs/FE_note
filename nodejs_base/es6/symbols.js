/**
 * Symbols特征:
 * 1. Symbols对于循环和其它地方不可见(比如：for-in object.keys)
 * 2. Symbols 是唯一的
 * 3. "全局Symbols"
 */

// 创建 symbols
var mySymbol=Symbol('object name');
var myObject = {firstName:'raja', lastName:'rao'};
const keys=Object.keys(myObject);

/**
 * 测试:
 * myObject[mySymbol]='add new';
 * myObject['newPropery']='newProperty';
 * const keysSymbol=Object.keys(myObject);
 * console.log('myObject',myObject);
 * console.log(keys,'-----',keysSymbol);
 */

 /**
  * 2. 解决自定义方法与api 冲突
  */

 var includes=Symbol('will store custom includes');
 Array.prototype[includes]=()=>{
     console.log('inside includes func');
 }
 var arr=[1,2,3];
 /**
  * 测试:
  * console.log(arr.includes(1));
  * console.log(arr['includes'](1));
  * arr[includes](1);
  */







enum Color {
  Red,
  Green,
  Blue
}
let c: Color = Color.Green;
console.log('enum:', c); //1

enum ColorTwo { Red = 1, Green, Blue }
let colorName: string = ColorTwo[1];
console.log('enum2:', colorName); //Green

/**
 * 接口类型
 */
interface LabelledValue {
  label: string;
  number?: number; //可选属性
  readonly size: number; //只读属性
  [propName: string]: any;// 索引属性签名
}
function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}
let myobj = { size: 10, label: 'size 10 Object' };
printLabel(myobj);
/**
 * 接口函数类型
 */
interface SearchFunc {
  (source: string, subString: string): boolean
}
let mySearch: SearchFunc = (source, subString) => {
  return source.search(subString) > -1;
}
// 2.2 给索引签名设置只读，防止给索引赋值
interface ReadonlyStringArray{
  readonly [index:number]:string;
}
let myArray:ReadonlyStringArray=['cc','wgs'];
// myArray[1]='readonly'; //error!
/**
 * 混合类型
 */
interface Counter{
  (start:number):string;
  interval:number;
  reset():void; 
}
function getCounter():Counter{
  let counter=function(start:number){
      
  } as Counter;
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
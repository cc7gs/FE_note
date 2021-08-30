/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
enum Color {
  Red,
  Green,
  Blue,
}
const c: Color = Color.Green;
console.log('enum:', c); // 1

enum ColorTwo {
  Red = 1,
  Green,
  Blue,
}
const colorName: string = ColorTwo[1];
console.log('enum2:', colorName); // Green

/**
 * 接口类型
 */
interface LabelledValue {
  label: string;
  number?: number; // 可选属性
  readonly size: number; // 只读属性
  [propName: string]: any; // 索引属性签名
}
function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}
const myobj = { size: 10, label: 'size 10 Object' };
printLabel(myobj);
/**
 * 接口函数类型
 */
interface SearchFunc {
  (source: string, subString: string): boolean;
}
const mySearch: SearchFunc = (source, subString) => {
  return source.search(subString) > -1;
};
// 2.2 给索引签名设置只读，防止给索引赋值
type ReadonlyStringArray = Readonly<Record<number, string>>;
const myArray: ReadonlyStringArray = ['cc', 'wgs'];
// myArray[1]='readonly'; //error!
/**
 * 混合类型
 */
interface Counter {
  (start: number): string;
  interval: number;
  reset: () => void;
}
function getCounter(): Counter {
  const counter = function (start: number) {} as Counter;
  counter.interval = 23;
  counter.reset = function () {
    console.log('reset call func');
  };
  return counter;
}
const counter = getCounter();
counter(10);
counter.reset();
counter.interval = 5;

const a = 1;
const b = '1';
type Type = string | number;

function Print(type: Type) {
  if (typeof type === 'number') {
    console.log('number', type.toFixed(2));
  }
  if (typeof type === 'string') {
    console.log('string', type.toUpperCase());
  }
}

interface Rtangle {
  kind: 'tangle';
  w: number;
  h: number;
}
interface Circle {
  kind: 'circle';
  r: number;
}
type Shape = Rtangle | Circle;

function area(s: Shape) {
  switch (s.kind) {
    case 'tangle':
      return s.h * s.w;
    case 'circle':
      return Math.PI * s.r ** 2;
    default:
      return ((e: never) => {
        throw Error(`没有覆盖所有可选类型${e}`);
      })(s);
  }
}

type T0 = NonNullable<string | null | undefined | number>;

type T1 = Parameters<(a: string) => void>;
// [a:string]
type T2 = Parameters<() => {}>;
// []

declare function f1(arg: { a: number; b: string }): void;
type T3 = Parameters<typeof f1>;
// [arg:{a:number,b:string}]

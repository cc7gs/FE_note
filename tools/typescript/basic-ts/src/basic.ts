enum Color{
  Red,
  Green,
  Blue
}
let c:Color=Color.Green;
console.log('enum:',c); //1

enum ColorTwo {Red = 1, Green, Blue}
let colorName: string = ColorTwo[1];
console.log('enum2:',colorName); //Green
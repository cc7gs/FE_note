
/**
 * 正则表达式
 * 1. 当明确表达式时应采用字面量、与之相反采用构造函数
 */

let pattern=/test/;
let pattern2=new RegExp('test');

//
function toUpper(name:string){
  return  name.replace(/-([a-z])/ig,(all,letter,...params)=>{
      console.log(all,letter,params)
        return letter.toUpperCase();
    })
}
console.log(toUpper('font-size'));
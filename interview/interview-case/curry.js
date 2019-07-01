/**
 * 函数柯里化是把接受多个参数的函数变成接受单一参数的函数，并且返回接受余下参数返回结果的新函数的技术
 */
const curry=(fn,...args)=>{
  console.log(fn,args,'args');
  console.log(arguments,'arguments')
 return args.length<fn.length?(...arguments)=>curry(fn,...args,...arguments):fn(...args); 
}
function sumFn(a,b,c){
  return a+b+c;
}
var sum=curry(sumFn);
// console.log(sum(2)(3)(4))

/**
 * 如何让(a==1&&a==2)===true?
 */
let i=1;
let a=new Proxy({},{
  i:1,
  get:function(){
    return ()=>this.i++;
  }
})
console.log(a==1&&a==2);
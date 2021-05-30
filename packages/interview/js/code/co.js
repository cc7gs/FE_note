function* read(){
  const a=yield 1;
  const b=yield 2;
  const c=yield 3;
  console.log(a,b,c,'result');
  return `${a}${b}${c}`
}
const it=read();
const firstResult=it.next();
const secondResult=it.next(firstResult.value);
const threeResult=it.next(secondResult.value);

function co(it){
  return new Promise((resolve,reject)=>{
    const next=(val)=>{
      const {value,done}=it.next(val);
      if(!done){
        Promise.resolve(value).then(next,reject)
      }else{
        resolve(value)
      }
    }
    next();
  })
}

// co(read()).then(result=>{
//   console.log(result,'co result')
// })

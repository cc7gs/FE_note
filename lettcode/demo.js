/**
 * n!=1*2*3*...*n
 */
function fact(n){
  console.log('n',n);
  if(n===1){
    return 1;
  }
  return n*fact(n-1)
}
console.log(fact(3));
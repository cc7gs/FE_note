import { Deque } from './../queue/basic';
/**
 * 回文检查器
 * @param astr
 * madam  racecar 
 */
function palindromeChecker(astr:string){
  if(!astr){
      return false
  }
  const depue=new Deque();
  const lowerString=astr.toLocaleLowerCase().split(' ').join('');
  let isEqual=true;
  for(let i=0;i<lowerString.length;i++){
      depue.addBack(lowerString.charAt(i))
  }
  while(depue.size()>1&&isEqual){
    if(depue.removeFront()!==depue.removeBack()){
        isEqual=false
    }
  }
  return isEqual
}

console.log(palindromeChecker('aa'))
console.log(palindromeChecker('level'));
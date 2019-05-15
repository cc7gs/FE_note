/**
 * 格雷编码是一个二进制数字系统，在该系统中，两个连续的数值仅有一个位数的差异。
 * 给定一个代表编码总位数的非负整数 n，打印其格雷编码序列。格雷编码序列必须以 0 开头。
 */
//实例
/**
 * 输入: 2
  输出: [0,1,3,2]
  解释:
    00 - 0
    01 - 1
    11 - 3
    10 - 2
  对于给定的 n，其格雷编码序列并不唯一。
  例如，[0,2,3,1] 也是一个有效的格雷编码序列。
    00 - 0
    10 - 2    
    11 - 3
    01 - 1
 */
/**
 * @param {number} n
 * @return {number[]}
 */

 export default (n:number)=>{
   if(n===0)return [0];
  let makeCode=(n:number):Array<number>=>{
    if(n===1){
      return [0,1]
    }else{
    const preCode=makeCode(n-1);
    const max=Math.pow(2,n)-1;
    let result:any=[];
     preCode.forEach((num,i)=>{
        result[i]=`0${num}`;
        result[max-i]=`1${num}`;
     });
     return result;
    }
  }
  return makeCode(n).map(item=>parseInt(item+'',2));
 }

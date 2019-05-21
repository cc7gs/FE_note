/**
 * 41. 缺失的第一个正数
 * 给定一个未排序的整数数组，找出其中没有出现的最小的正整数。
 */
/**
 * 示例
 * 输入: [1,2,0]
 * 输出: 3
 */

/** 
 * 方案一
 * 1. 过滤数组后只包含正整数
 * 2. 对数组排序
 * 3. 比较数组中的差值是否大于1,如果大于则返回当前值+1 否则返回数组长度+1
*/
/**
 * @param {number[]} arr
 * @return {number}
 */
export default (arr:Array<Number>)=>{
  let minNum=1;
  if(arr.length===0){
    return 1;
  }
  arr.filter(num=>num>0)
     .sort((a,b)=>Number(a)-Number(b))
     .every((num,i,array)=>{
       if(array[0]>1){
         minNum=1;
         return false;
       }
       let min=+array[i+1]-(+array[i]);
       minNum=+num+1;
       return min<=1;
     });  
  return minNum;
}
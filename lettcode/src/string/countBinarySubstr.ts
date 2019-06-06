/**
 * 统计具有相同数量的0,1的非空(连续)子字符串的数量，并且这些子字符串中都是有0,1组合子一起。
 * 重复出现的字串要计算他们出现的次数。
 * 输入: "00110011"
 *  输出: 6
 *  解释: 有6个子串具有相同数量的连续1和0：“0011”，“01”，“1100”，“10”，“0011” 和 “01”。
 */
/**
 * 求解思路:记录当前数字出现次数、和前一个数字出现次数，如果前一个数字出现次数大于当前,则结果数+1
 */

//方式一
// export default (str: string) => {
//   var  pre,cur,result;
//   pre=result=0;
//   cur=1;
//   debugger
//   for(let i=0;i<str.length-1;i++){
//     if(str[i]===str[i+1]){
//       cur++;
//     }else{
//       pre=cur;
//       cur=1;
//     }
//     if(pre>=cur){
//       result++;
//     }
//   }
//   return result;
// }

//方式二
export default (s:string)=>{
  let pre = 0;
  let cur = 1;
  return s.split('')
      .map(Number)
      .reduce((result, curValue, curIndex, array) => {
          if (curValue === array[curIndex + 1]) {
              cur++;
          } else {
              pre = cur;
              cur = 1;
          }
          if (curIndex === array.length - 1) { return result }
          if (pre >= cur) result++;
          return result;
      }, 0);
}

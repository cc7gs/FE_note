/**
 * 118. 杨辉三角
 */
// 输入: 5
// 输出:
// [
//      [1],
//     [1,1],
//    [1,2,1],
//   [1,3,3,1],
//  [1,4,6,4,1]
// ]
/**
 * 
 * @param numRows 行数
 * @return {number[][]}
 */
export const generate=(numRows:number):number[][]=>{
  let res:number[][]=[];
  for(let i=1;i<=numRows;i++){
    let temp=[];
    for(let j=0;j<i;j++){
      if(j===0||j===i-1){
        temp.push(1);
      }else{
        temp.push(res[i-2][j]+res[i-2][j-1])
      }
    }
    res.push(temp);
  }
  return res;
}
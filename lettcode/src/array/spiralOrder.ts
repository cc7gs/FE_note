/**
 * 54. 螺旋矩阵
 * 给定一个包含 m x n 个元素的矩阵（m 行, n 列），
 * 请按照顺时针螺旋顺序，返回矩阵中的所有元素。
 */
/**
 * 输入:
 *[
 * [ 1, 2, 3 ],
 * [ 4, 5, 6 ],
 * [ 7, 8, 9 ]
 *]
 * 输出: [1,2,3,6,9,8,7,4,5]
 */

type SpiralArr = number[]
type Map = (arr: SpiralArr[], res: SpiralArr) => SpiralArr
export const spiralOrder = (matrix: SpiralArr[]) => {
  let map: Map = (arr, res = []) => {
    arr.forEach((row, idx) => {
      if (idx === 0) {
        res=res.concat(row);
      } else if (idx === arr.length - 1) {
        res=res.concat(row.reverse());
      } else {
        //拿出每一行最后一个元素
        let num = row.pop()
        if (num) {
          res=res.concat(num);
        }
      }
    });
    //弹出第一行和最后一行
    arr.pop();
    arr.shift();
    for (let i = arr.length - 1; i >= 0; i--) {
      let top = arr[i].shift();
      if (top) {
        res.push(top)
      }
    }
    console.log(res);
    if (arr.length) {
      return map(arr, res);
    } else {
      return res;
    }
  }
  return map(matrix, [])
}
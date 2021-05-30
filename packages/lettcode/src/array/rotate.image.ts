/**
 * 48. 旋转图像
 * 给定一个n*n 的二维矩阵表示一个图像。给图像顺时针旋转90度。
 * 你必须在原地旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要使用另一个矩阵来旋转图像
 */
type Matrix=number[][];
export const rotateImage=(matrix:Matrix):Matrix=>{
  const dimension=matrix.length;
  //1.水平中心轴对称交换
  for(let i=0;i<dimension/2;i++){
    for(let j=0,temp;j<dimension;j++){
        temp=matrix[i][j];
        matrix[i][j]=matrix[dimension-i-1][j];
        matrix[dimension-i-1][j]=temp;
    }
  }
  //2.对角线对称交换
  for(let i=0;i<dimension;i++){
    for(let j=0,temp;j<i;j++){
      temp=matrix[i][j];
      matrix[i][j]=matrix[j][i];
      matrix[j][i]=temp;
    }
  }
  return matrix;
}

/* 189. 旋转的数组
* 给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数
* 
*/
/**
* 示例 
* 输入: [1,2,3,4,5,6,7] 和 k = 3
* 输出: [5,6,7,1,2,3,4]
* 解释:
* 向右旋转 1 步: [7,1,2,3,4,5,6]
* 向右旋转 2 步: [6,7,1,2,3,4,5]
* 向右旋转 3 步: [5,6,7,1,2,3,4]
*/

type RouteArray = (array: number[], k: number) => void

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
export const rotateArray: RouteArray = (nums, k) => {
  nums.unshift(...nums.splice(nums.length -k, k));
}


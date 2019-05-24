/**
 * 905. 按奇偶排序数组 
 * 给定一个非负整数数组 A，返回一个数组，在该数组中， A 的所有偶数元素之后跟着所有奇数元素。
 */
/**
 * 示例
 * 输入：[3,1,2,4]
 * 输出：[2,4,3,1]
 * 解释：输出 [4,2,3,1]，[2,4,1,3] 和 [4,2,1,3] 也会被接受。
 */

/**
 * @param {number[]} arr
 * @return {number[]}
 */
export default (arr: Array<number>) => {
  let newArr: Array<number> = [];
  arr.forEach(num => {
    if (num % 2 === 0) {
      newArr.unshift(num);
    } else {
      newArr.push(num);
    }
  });
  return newArr;
}
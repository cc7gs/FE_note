/**
 * 按奇偶排序数组 II
 * 给定一个非负整数数组 A， A 中一半整数是奇数，一半整数是偶数。
 * 对数组进行排序，以便当 A[i] 为奇数时，i 也是奇数；当 A[i] 为偶数时， i 也是偶数。
 */
/**
 * 示例
 * 输入：[4,2,5,7]
 * 输出：[4,5,2,7]
 * 解释：[4,7,2,5]，[2,5,4,7]，[2,7,4,5] 也会被接受
 */

/**
 * @description 偶数放到队列头 奇数放到队尾
 * @param {number[]} arr
 * @return {number[]}
 */
export default (arr: Array<number>) => {
  let newArr: Array<number> = [];
  let odd = 1, even = 0; //old 奇数 even 偶数
  arr.forEach(item => {
    if (item % 2 === 0) {
      newArr[even] = item;
      even += 2;
    } else {
      newArr[odd] = item;
      odd += 2;
    }
  });
  return newArr;
}
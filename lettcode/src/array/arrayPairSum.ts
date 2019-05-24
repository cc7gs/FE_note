/**
 * 561. 数组拆分
 * @description 给定长度为 2n 的数组, 你的任务是将这些数分成 n 对, 例如 (a1, b1), (a2, b2), ..., (an, bn) ，使得从1 到 n 的 min(ai, bi) 总和最大。
 * @demo
 * 输入: [1,4,3,2]
 *  输出: 4
 * 解释: n 等于 2, 最大总和为 4 = min(1, 2) + min(3, 4).
 */

/**
 * @description 对数组排序 然后求出偶数下标的和
 * @param {number[]} arr
 * @return {number}
 */
export default (arr: Array<number>) => {
 return  arr.sort((a, b) => a - b)
    .reduce((total, cur, idx) => {
      if (idx % 2 === 0) {
        total += cur;
      }
      return total;
    })
}
/**
 * 215. 数组中第k个最大元素
 * 在未排序的数组中找到第 k 个最大的元素。
 * 请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
 */
/**
 * 示例
 * 输入: [3,2,1,5,6,4] 和 k = 2
 * 输出: 5
 */
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
export default (arr: Array<number>, k: number) => {
  let len = arr.length - 1;
  for (let i = len; i > len - k; i--) {
    for (let j = 0, temp; j < i; j++) {
      temp = arr[j];
      if (temp > arr[j + 1]) {
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr[len - (k - 1)];
};

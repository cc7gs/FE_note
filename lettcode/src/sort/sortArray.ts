/**
 * 912. 排序数组
 * 给定一个整数数组 nums,该数组升序排序
 * 输入：[5,1,1,2,0,0]
 * 输出：[0,0,1,1,2,5]
 */

/**
 * @param {number[]} nums
 * @return {number []}
 */
export default (nums: Array<number>) => {
  return nums.sort((a, b) => a - b)
}
const BubbleSort = (nums: Array<number>) => {
  let flag;
  for (let i = 0, len = nums.length; i < len - 1; i++) {
    flag = false;
    for (let j = 0, temp; j < len - i; j++) {
      if (nums[j] > nums[j + 1]) {
        temp = nums[j];
        nums[j] = nums[j + 1];
        nums[j + 1] = temp;
        flag = true;
      }
    }
    if (!flag) break;
  }
  return nums;
}
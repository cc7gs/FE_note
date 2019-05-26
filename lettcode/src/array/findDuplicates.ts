/**
 * 442. 数组中重复的数据
 * 给定一个整数数组 a，其中1 ≤ a[i] ≤ n （n为数组长度）,
 * 其中有些元素出现两次而其他元素出现一次。
 */
/**
 * @description 记录每个元素出现的次数，然后过滤次数大于1的
 * @param {number[]} nums
 * @return {number[]}
 */
const demoOne = (nums: Array<number>) => {
  var temp: any = {};
  return nums.map(num => {
    if (!temp[num]) {
      temp[num] = true;
      return false;
    } else {
      return num;
    }
  })
    .filter(i => i);

}
/**
 * @description 输入数组中用数字的正负来表示该位置所对应数字是否已经出现过。遍历输入数组，给对应位置的数字取相反数，如果已经是负数，说明前面已经出现过，直接放入输出数组。
 * @param {number[]} nums
 * @return {number[]}
 */
export default (nums: Array<number>) => {
  let result = [];
  for (let i = 0; i < nums.length; i++) {
    let num = Math.abs(nums[i]);
    if (nums[num - 1] > 0) {
      nums[num - 1] *= -1;
    } else {
      result.push(num);
    }
  }
  return result;
}

/**
 * 219. 存在重复元素 II
 * 给定一个整数数组和一个整数k，判断数组中是否存在两个不同的索引i和j，
 * 使得 nums [i] = nums [j]，并且 i 和 j的差的 绝对值 至多为 k。
 * @param {number[]} nums 整数数组
 * @param {number} k
 * @return {boolean} 
 */
export function containsNearbyDuplicate(nums: number[], k: number) {
  const numRecord = new Set<number>();
  for (let endWind = 0; endWind < nums.length; endWind++) {
    const rightNum = nums[endWind];
    if (numRecord.has(rightNum)) {
      return true;
    }
    numRecord.add(rightNum);
    if (numRecord.size > k) {
      numRecord.delete(nums[endWind - k])
    }
  }
  return false;
}
/**
 * 34. 在排序数组中查找元素的第一个和最后一个位置
 */

// 给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。
// 你的算法时间复杂度必须是 O(log n) 级别。
// 如果数组中不存在目标值，返回 [-1, -1]。
/**
 * 
 * @param nums 原数组
 * @param target 目标元素
 * @return {number[]} 
 */
type ISearchRange = (nums: number[], target: number) => number[];
export const searchRange: ISearchRange = (nums, target) => {
  let len = nums.length, start = 0, end = len - 1, mid = 0;
  let flag = false;
  if (!nums.length) return [-1, -1];
  while (start < end) {
    mid = Math.floor((start + end) / 2);
    if (target < nums[mid]) {
      end = mid - 1;
    } else if (target > nums[mid]) {
      start = mid + 1
    } else {
      flag = true;
      break;
    }
  }
  if (!flag) return [-1, -1];
  start = mid;
  end = mid;
  while (start - 1 >= 0 && nums[start - 1] === target) {
    start--;
  }
  while (end + 1 <= nums.length && nums[end + 1] === target) {
    end++;
  }
  return [start, end];
}


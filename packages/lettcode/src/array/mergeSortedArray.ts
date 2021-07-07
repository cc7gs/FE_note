/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */

/**
 * 给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。
 * 初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。
 * 你可以假设 nums1 的空间大小等于 m + n，这样它就有足够的空间保存来自 nums2 的元素。
 *
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 * @example
 * 输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
 * 输出：[1,2,2,3,5,6]
 * 
 * 输入：nums1 = [1], m = 1, nums2 = [], n = 0
 * 输出：[1]
 */
export const mergeSortedArray = (nums1: number[], m: number, nums2: number[], n: number) => {
  const newNumbs1 = nums1.slice(0, m);
  const newNumbs2 = nums2.slice(0, n);
  newNumbs1.push(Number.MAX_SAFE_INTEGER);
  newNumbs2.push(Number.MAX_SAFE_INTEGER);

  for (let k = 0, i = 0, j = 0; k < m + n; k++) {
    nums1[k] = newNumbs1[i] > newNumbs2[j] ? newNumbs2[j++] : newNumbs1[i++]
  }
};
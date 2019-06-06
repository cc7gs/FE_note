/**
 * 217. 存在重复元素
 */
type ContainsFun = (arr: number[]) => boolean
type SortFn = (arr: number[]) => number[];
/**
 * @description 通过对原数组快速排序后,比较相邻的元素是否相同如果相同则返回true
 * @param arr 原数组
 */
export const containsDuplicate: ContainsFun = (arr) => {
  const quickSort: SortFn = (arr) => {
    if (arr.length <= 1) {
      return arr;
    }
    const pivotIndex = Math.floor(arr.length / 2);
    const pivot = arr.splice(pivotIndex, 1)[0];
    const left: number[] = [];
    const right: number[] = [];
    // arr.forEach(num => {
    //   if (num < pivot) {
    //     left.push(num);
    //   } else {
    //     right.push(num);
    //   }
    // })
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] < pivot) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    return quickSort(left).concat(pivot, quickSort(right));
  }
  return quickSort(arr).some((num, idx, array) => {
    if (num === array[idx + 1]) {
      return true;
    } else {
      return false;
    }
  })
}
/**
 * 通过Set api
 */
const containsDuplicate2: ContainsFun = (arr) => {
  return arr.length !== [...new Set(arr)].length
}
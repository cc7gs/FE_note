/**
 * 给定一个无序的数组找出数组在排序之后，相邻元素之间的最大差值。
 * 如果数组元素小于2，则返回0;
 */
/**
 * 方法一、选排序 然后最排序后元素的相邻最大值
 */
const maximum_1 = (arr: Array<number>) => {
  let max = 0;
  if (arr.length < 2) {
    return 0;
  }
  arr.sort();
  arr.forEach((item, i, array) => {
    let temp = array[i + 1] - item;
    if (temp > max) {
      max = temp;
    }
  })
  return max;
}
/**
 * 通过冒泡排序然后求最大值。
 */
export default (arr: Array<number>) => {
  let max = 0;
  if (arr.length < 2) {
    return 0;
  }
  for (let len = arr.length - 1, i = len; i >= 0; i--) {

    for (let j = 0, temp; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
    if (i!==len) {
      let maxgap = (arr[i+1] - arr[i]);
      if (maxgap > max) {
        max = maxgap;
      }
    }
  }
  return max;
}
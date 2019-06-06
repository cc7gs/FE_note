/**
 * 229. 求众数||
 * 给定一个大小为 n 的数组，找出其中所有出现超过 ⌊ n/3 ⌋ 次的元素。
说明: 要求算法的时间复杂度为 O(n)，空间复杂度为 O(1)。
 */
(arr: Array<number>) => {
  let res: Array<number> = [], temp: any = {};
  arr.forEach(num => {
    if (!temp[num]) {
      temp[num] = 1;
    } else {
      temp[num]++;
    }
    if (res.indexOf(num) < 0 && temp[num] > arr.length / 3) {
      res.push(num);
    }
  })
  return res;
}
/**
 * 方案二 使用 map函数记录出现次数
 */
export default (arr: Array<number>) => {
  let len = arr.length / 3;
  let numMap = new Map();
  let result: Array<number> = [];
  arr.forEach(num => {
    if (numMap.has(num)) {
      numMap.set(num, numMap.get(num) + 1);
    } else {
      numMap.set(num, 1);
    }
  });
  numMap.forEach((value, key) => {
    if (value > len) {
      result.push(key);
    }
  });
  return result;
}
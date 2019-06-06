import { resolve } from 'url';

/**
 * 169. 求众数
 * 给定一个大小为 n 的数组，找到其中的众数。众数是指在数组中出现次数大于 ⌊ n/2 ⌋ 的元素。
 */

/**
 * 方案一
 *  将数组中每个值出现次数进行记录，如果该值次数出现次数大于[arr.length/2]则返回该值
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
const majority_one = (arr: Array<number>) => {
  //res 记录数组中值出现次数,val 记录众数
  let res: any = {}, val = 0;
  arr.every(num => {
    if (!res[num]) {
      res[num] = 1;
    } else {
      res[num]++;
    }
    if (res[num] > arr.length / 2) {
      val = num;
      return false;
    }
    return true;
  });
  return val;
}

/**
 * 方案二
 * 记录数组第一个值，遇到相同+1,不同的-1;减到0,重新换一个数开始计数
 * 摩尔投票法。该算法用于1/2情况，它说：“在任何数组中，出现次数大于该数组长度一半的值只能有一个。”
 */
export default (arr: Array<number>) => {
  let num = arr[0], count = 1;
  for (let i = 1; i < arr.length; i++) {
    if (num === arr[i]) {
      count++;
    } else {
      count--;
      if (!count) num = arr[i + 1];
    }
  }
  return num; 
}
/* eslint-disable no-bitwise */
/**
 * 获取从集合元素中取出k个元素组合数
 * @param arr 集合元素
 * @param k 排列个数
 * @example
 *  combination(['a','b','c'],2) ==> [['a','b'],...]  
 */
export const combination = (arr: string[], k: number): string[][] => {
  if (k === 0 || k === arr.length) {
    return [arr.slice(0, k)]
  }
  const [first, ...others] = arr;
  let res: string[][] = [];
  res = res.concat(combination(others, k - 1).map(c => [first, ...c]))
  res = res.concat(combination(others, k));
  return res
}

export const letterCombination = (arr: string[]) => {
  let result: string[][] = [];
  for (let i = 1; i <= arr.length; i++) {
    result = result.concat(combination(arr, i))
  }
  return result
}

export function* letterCombination2(arr: string[]) {
  for (let i = 1; i < (1 << arr.length); i++) {
    const s = [];
    for (let k = 0; k < arr.length; k++) {
      const take = i & (1 << k);
      if (take) {
        s.push(arr[k])
      }
    }
    yield s;
  }
}
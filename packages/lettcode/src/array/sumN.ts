/* eslint-disable @typescript-eslint/no-shadow */
/**
 * 取出n个数合为m
 * @param arr 
 * @param n 取出的个数
 * @param m 总和
 * @returns 组合值
 */
export const sumN = (arr: number[], n: number, m: number) => {
  function innerSum(arr: number[], n: number, m: number, i: number, decision: number[]): null | number[] {
    if (m === 0) return decision
    if (arr.length === i || n === 0 || m < 0) {
      return null
    }
    return innerSum(arr, n - 1, m - arr[i], i + 1, decision.concat(arr[i])) ||
      innerSum(arr, n, m, i + 1, decision)
  }
  return innerSum(arr, n, m, 0, [])
}
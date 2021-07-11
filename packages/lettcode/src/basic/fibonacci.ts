/**
 * 获取斐波那契数列位数值
 * @param n 位数
 * @returns 位数值
 */
export const fibo = (n: number): number => {
  if (n <= 2) return 1
  return fibo(n - 1) + fibo(n - 2)
}

/**
 * 动态规划版
 */
export const fiboDp = (n: number) => {
  let a = 1; let b = 1;
  for (let i = 3; i <= n; i++) {
    [a, b] = [b, a + b]
  }
  return b
}

/**
 * 尾递归版
 */
export const tailFibo = (n: number, a = 1, b = 1): number => {
  if (n <= 2) return b;
  return tailFibo(n - 1, b, a+b)
}
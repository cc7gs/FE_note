/**
 * 415. 字符串相加
 * 给定两个字符串形式的非负整数num1和 num2,计算他们的和
 */
/**
 * num1 和num2 的长度都小于 5100.
 * num1 和num2 都只包含数字 0-9.
 * num1 和num2 都不包含任何前导零。
 * 你不能使用任何內建 BigInteger 库，
 * 也不能直接将输入的字符串转换为整数形式。
 */

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
export default (num1: string, num2: string) => {
  let str = [];
  let carry = 0, i = num1.length - 1, j = num2.length - 1;
  while (i >= 0 || j >= 0 || carry != 0) {
    if (i >= 0) {
      // carry += <any>num1.substr(i--, 1) - <any>'0';
      carry += +num1.substr(i--, 1);
    }
    if (j >= 0) {
      carry += <any>num1.substr(i--, 1) - <any>'0';
    }
    str.unshift(carry % 10);
    carry = Math.floor(carry/10);
  }
  return str.join('');
}
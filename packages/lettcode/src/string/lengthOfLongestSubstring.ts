/**
 * 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
 * @param {string} s
 * @return {number}
 * @description: 该题如果用暴力破解o(n^2),主要考察滑动窗口:
 * 其实就是一个队列,当满足条件后,如果出现重复值则移除最左边值,然后继续寻找满足条件。
 * 
 * @example
 * 输入: s = "abcabcbb"
 * 输出: 3 
 * 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。 
 */
export function lengthOfLongestSubstring(s: string) {
  const n = s.length;
  const acc = new Set();
  let rk = -1;
  let aws = 0;
  for (let i = 0; i < n; i++) {
    if (i !== 0) {
      acc.delete(s[i-1])
    }
    while (rk+1 < n && !acc.has(s[rk+1])) {
      acc.add(s[rk+1]);
      rk += 1;
    }
    aws = Math.max(aws, rk - i + 1)
  }
  return aws;
}


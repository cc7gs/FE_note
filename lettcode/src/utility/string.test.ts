import {
  countBinarySubstrings,
  reverseWords,
  reverseString,
  numUniqueEmail,
  addStrings,
} from '../string'

describe('string', () => {
  it('字符串相加',()=>{
    expect(addStrings('12','19')).toBe('31');
  })
  it('独特的电子邮件地址', () => {
    expect(numUniqueEmail(["test.email+alex@leetcode.com", "test.e.mail+bob.cathy@leetcode.com", "testemail+david@lee.tcode.com"])).toBe(2);
  });
  it('countBinarySubstrs:00110011', () => {
    expect(countBinarySubstrings("00110011")).toBe(6)
  });
  it('reverseWords:Let\'s take LeetCode contest', () => {
    expect(reverseWords('Let\'s take LeetCode contest')).toBe('s\'teL ekat edoCteeL tsetnoc');
  });
  it('reverseString', () => {
    expect(reverseString(["h", "e", "l", "l", "o"])).toEqual(["o", "l", "l", "e", "h"]);
  });
})
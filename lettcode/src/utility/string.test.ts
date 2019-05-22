import {countBinarySubstrings,reverseWords,reverseString} from '../string'
describe('string', () => {
  it('countBinarySubstrs:00110011', () => {
    expect(countBinarySubstrings("00110011")).toBe(6)
  });
  it('reverseWords:Let\'s take LeetCode contest', () => {
    expect(reverseWords('Let\'s take LeetCode contest')).toBe('s\'teL ekat edoCteeL tsetnoc');
  });
  it('reverseString', () => {
    expect(reverseString(["h","e","l","l","o"])).toEqual(["o","l","l","e","h"]);
  });
})
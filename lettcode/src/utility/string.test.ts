import countBinarySubstrings from '../string/countBinarySubstr'
import reverseWords from '../string/reverseWords';

describe('string', () => {
  it('countBinarySubstrs:00110011', () => {
    expect(countBinarySubstrings("00110011")).toBe(6)
  });
  it('reverseWords:Let\'s take LeetCode contest', () => {
    expect(reverseWords('Let\'s take LeetCode contest')).toBe('s\'teL ekat edoCteeL tsetnoc');
  });
})
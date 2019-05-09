import reverseWords from '../../string/reverseWords';

describe('String', () => {
  it('reverseWords:Let\'s take LeetCode contest', () => {
    expect(reverseWords('Let\'s take LeetCode contest')).toBe('s\'teL ekat edoCteeL tsetnoc');
  });
});

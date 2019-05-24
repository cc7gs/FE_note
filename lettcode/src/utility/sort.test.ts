import {
  bubbleSort,
  selectSort,
  MaximumGap,
  sortArrayParity,
  sortArrayParityTwo,
  findKthLargest,
  firstMissingPositive
} from '../sort'

describe('排序基础', () => {
  test('冒泡排序:[3,9,4,6]', () => {
    expect(bubbleSort([3, 9, 4, 6])).toEqual([3, 4, 6, 9]);
  });
  test('选择排序:[3,9,4,6]', () => {
    expect(selectSort([3, 9, 4, 6])).toEqual([3, 4, 6, 9]);
  });
});
describe('排序题', () => {
  it('最大间距,[3,6,9,1]', () => {
    expect(MaximumGap([3, 6, 9, 1])).toBe(3);
  });
  it('奇偶排序||[4,2,5,7] expect [4,5,2,7]', () => {
    expect(sortArrayParityTwo([4, 2, 5, 7])).toEqual([4, 5, 2, 7]);
  });
  it('奇偶排序', () => {
    expect(sortArrayParity([3, 1, 2, 4])).toEqual([2, 4, 3,1]);
  });
  it('数组中的第k个最大元素 [3,2,1,5,6,4]', () => {
    expect(findKthLargest([3, 2, 1, 5, 6, 4], 2)).toEqual(5);
  });
  it('缺失的第一个正数 [1,2,0]', () => {
    expect(firstMissingPositive([1, 2, 0])).toEqual(3);
  });
})

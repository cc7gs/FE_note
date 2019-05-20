import { bubbleSort, selectSort } from '../sort/basic'
import MaximumGap from '../sort/maximumGap';
import sortArrayParity from '../sort/sortArrayParity'
describe('排序基础', () => {
  test('冒泡排序:[3,9,4,6]', () => {
    expect(bubbleSort([3, 9, 4, 6])).toEqual([3, 4, 6, 9]);
  });
  test('选择排序:[3,9,4,6]', () => {
    expect(selectSort([3, 9, 4, 6])).toEqual([3, 4, 6, 9]);
  });
});
describe('排序题',()=>{
  it('最大间距,[3,6,9,1]',()=>{
    expect(MaximumGap([3,6,9,1])).toBe(3);
  });
  it('奇偶排序||[4,2,5,7] expect [4,5,2,7]',()=>{
    expect(sortArrayParity([4,2,5,7])).toEqual([4,5,2,7]);
  })
})
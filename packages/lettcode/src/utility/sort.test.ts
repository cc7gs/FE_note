import {
  bubbleSort,
  selectSort,
  quickSort2,
  insertSort,
  mergeSort,
  quickSort,
  MaximumGap,
  sortArrayParity,
  sortArrayParityTwo,
  findKthLargest,
  firstMissingPositive,
  sortArray,
} from '../sort'


describe('排序题', () => {
  test('排序数组', () => {
    expect(sortArray([5, 1, 1, 2, 0, 0])).toEqual([0, 0, 1, 1, 2, 5]);
  });
  it('最大间距,[3,6,9,1]', () => {
    expect(MaximumGap([3, 6, 9, 1])).toBe(3);
  });
  it('奇偶排序||[4,2,5,7] expect [4,5,2,7]', () => {
    expect(sortArrayParityTwo([4, 2, 5, 7])).toEqual([4, 5, 2, 7]);
  });
  it('奇偶排序', () => {
    expect(sortArrayParity([3, 1, 2, 4])).toEqual([4, 2, 3, 1]);
  });
  it('数组中的第k个最大元素 [3,2,1,5,6,4]', () => {
    expect(findKthLargest([3, 2, 1, 5, 6, 4], 2)).toEqual(5);
  });
  it('缺失的第一个正数 [1,2,0]', () => {
    expect(firstMissingPositive([1, 2, 0])).toEqual(3);
  });
});

describe('排序基础', () => {
  test('冒泡排序:[3,9,4,6]', () => {
    expect(bubbleSort([3, 9, 4, 6])).toEqual([3, 4, 6, 9]);
  });
  test('插入排序:[3,9,4,6]', () => {
    expect(insertSort([3, 9, 4, 6])).toEqual([3, 4, 6, 9]);
  });
  test('选择排序:[3,9,4,6]', () => {
    expect(selectSort([3, 9, 4, 6])).toEqual([3, 4, 6, 9]);
  });
  it('快速排序',()=>{
    expect(quickSort([3, 9, 4, 6,4,3])).toEqual([3,3,4,4,6,9]);
  })
  it('快速排序2',()=>{
    expect(quickSort2([3, 9, 4, 6,4,3])).toEqual([3,3,4,4,6,9]);
  })
  it('merge sort', () => {
    let nums = [5,3,8,2,6,4,7,9,1];
    let ans = mergeSort(nums);
    expect(ans).toEqual([1,2,3,4,5,6,7,8,9]);
  });
});

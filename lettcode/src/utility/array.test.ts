import {
  letterCombinations,
  hasGroupsSize,
  canFlowers,
  interSection,
  majorityElement,
  majorityElementTwo,
  arrayPairSum,
  findDuplicates,
  spiralOrder,
  containsDuplicate,
  rotateImage,
  rotateArray,
  generate,
  searchRange
} from '../array'


describe('array', () => {
  it('在排序数组中查找元素的第一个和最后一个位置',()=>{
    const input=[5,7,7,8,8,10];
    expect(searchRange(input,8)).toEqual([3,4]);
  })
  it('在排序数组中查找元素的第一个和最后一个位置',()=>{
    const input=[1];
    expect(searchRange(input,1)).toEqual([0,0]);
  })
  it('杨辉三角', () => {
    const output =
      [[1],
      [1, 1],
      [1, 2, 1],
      [1, 3, 3, 1],
      [1, 4, 6, 4, 1]
      ];
      expect(generate(5)).toEqual(output);
  })
  it('旋转数组', () => {
    const input = [1, 2, 3, 4, 5, 6, 7];
    const output = [5, 6, 7, 1, 2, 3, 4];
    rotateArray(input, 3)
    expect(input).toEqual(output);
  })
  it('旋转图像', () => {
    const input = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];
    const output = [
      [7, 4, 1],
      [8, 5, 2],
      [9, 6, 3]
    ];
    expect(rotateImage(input)).toEqual(output);
  })
  it('存在重复元素', () => {
    expect(containsDuplicate([1, 2, 3, 4, 5, 3])).toBe(true);
  })
  it('螺旋矩阵', () => {
    let input = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ]
    expect(spiralOrder(input)).toEqual([1, 2, 3, 6, 9, 8, 7, 4, 5])
  })
  it('重复的数据', () => {
    expect(findDuplicates([4, 3, 2, 7, 8, 2, 3, 1])).toEqual([2, 3])
  })
  it('letterCombinations: 23', () => {
    expect(letterCombinations('2')).toStrictEqual(['a', 'b', 'c']);
  });
  it('hasGroupSize: [1,2,3,4,4,3,2,1]', () => {
    expect(hasGroupsSize([1, 2, 3, 4, 4, 3, 2, 1])).toEqual(true)
  });
  it('array flower: [0,0]', () => {
    expect(canFlowers([0, 0], 1)).toBe(true)
  });
  it('interSection:[1,2,2,2,1]', () => {
    expect(interSection([1, 2, 2, 2, 1], [2, 1])).toEqual([1, 2])
  });
  it('求众数', () => {
    expect(majorityElement([2, 2, 2, 3, 3, 5, 2])).toEqual(2)
  });
  it('求众数||', () => {
    expect(majorityElementTwo([1, 1, 1, 3, 3, 2, 2, 2])).toEqual([1, 2])
  });
  it('求众数||', () => {
    expect(majorityElementTwo([3, 2, 3])).toEqual([3])
  });
  it('数组拆分|', () => {
    expect(arrayPairSum([1, 4, 3, 2])).toBe(4);
  })
});




// test('array flower:[0,0]',()=>{
//   expect(canFlowers([1, 0, 0, 0, 1, 0, 0], 2)).toBe(true)
// })
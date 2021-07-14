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
  searchRange,
  maxprofit,
  maxprofit2,
  lemonadeChange,
  uniquePaths,
  uniquePathsWithObstacles,
  ArrayList,
  mergeSortedArray
} from '../../array'


describe('mergeSortedArray', () => {
  it('合并两个有序数组', () => {
    const num1 = [1, 2, 3, 0, 0, 0];
    mergeSortedArray(num1, 3, [4, 5, 6], 3)
    expect(num1).toEqual([1, 2, 3, 4, 5, 6])
  });
  it('合并两个有序数组:empty', () => {
    const num1 = [1];
    mergeSortedArray(num1, 1, [], 0)
    expect(num1).toEqual([1])
  })
})

describe('array', () => {

  it('不同路径', () => {
    expect(uniquePaths(3, 2)).toBe(3)
  })
  it('不同路径2', () => {
    let input = [
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
      [0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
      [1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1],
      [0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1],
      [1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0]]

    expect(uniquePathsWithObstacles(input)).toBe(627550860);
  })
  it('柠檬水找零', () => {
    expect(lemonadeChange([5, 5, 5, 10, 20])).toBe(true);
  })
  it('买卖股票的最佳时机', () => {
    expect(maxprofit([7, 1, 5, 3, 6, 4])).toBe(5);
  })
  it('买卖股票的最佳时机2', () => {
    expect(maxprofit2([7, 1, 5, 3, 6, 4])).toBe(7);
  })
  it('在排序数组中查找元素的第一个和最后一个位置', () => {
    const input = [5, 7, 7, 8, 8, 10];
    expect(searchRange(input, 8)).toEqual([3, 4]);
  })
  it('在排序数组中查找元素的第一个和最后一个位置', () => {
    const input = [1];
    expect(searchRange(input, 1)).toEqual([0, 0]);
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

describe('ArrayList', () => {
  const range = (length: number) => Array.from({ length }, (v, i) => i);
  // const range=(length:number):Array<number>=>(Array.apply(null,{length:length})).map(Number.call,Number);
  const abcRange = (length: number) => range(length).map((num) => String.fromCharCode(97 + num));
  let list: ArrayList<any>;
  beforeEach(() => {
    list = new ArrayList();
  })
  it('constructor', () => {
    expect(list).toEqual(jasmine.any(ArrayList))
  })
  it('push', () => {
    abcRange(26).map(character => list.push(character));
    expect(list.length).toEqual(26);
  });

  it('pop', () => {
    abcRange(13).map(character => list.push(character));
    expect(list.length).toEqual(13);
    range(10).map(() => list.pop());
    expect(list.length).toEqual(3);
    expect(list.pop()).toEqual('c');
  });

  it('get', () => {
    list.push('first');
    expect(list.get(0)).toEqual('first');
    list.push('second');
    expect(list.get(1)).toEqual('second');
    expect(list.get(0)).toEqual('first');
    abcRange(26).map(character => list.push(character));
    expect(list.get(27)).toEqual('z');
    expect(list.get(0)).toEqual('first');
    expect(list.get(9)).toEqual('h');
    list.pop();
    expect(list.get(list.length - 1)).toEqual('y');
  });

  it('delete', () => {
    abcRange(26).map(character => list.push(character));
    list.delete(13);
    expect(list.length).toEqual(25);
    expect(list.get(12)).toEqual('m');
    expect(list.get(13)).toEqual('o');
    list.delete(0);
    expect(list.length).toEqual(24);
    expect(list.get(0)).toEqual('b');
  });
})


// test('array flower:[0,0]',()=>{
//   expect(canFlowers([1, 0, 0, 0, 1, 0, 0], 2)).toBe(true)
// })
import {letterCombinations,
  hasGroupsSize,
  canFlowers,
  interSection,
  majorityElement,
  majorityElement_two,
} from '../array'
 

describe('array',()=>{
  it('letterCombinations: 23',()=>{
    expect(letterCombinations('2')).toStrictEqual(['a','b','c']);
  });
  it('hasGroupSize: [1,2,3,4,4,3,2,1]',()=>{
    expect(hasGroupsSize([1,2,3,4,4,3,2,1])).toEqual(true)
  });
  it('array flower: [0,0]',()=>{
    expect(canFlowers([0,0],1)).toBe(true)
  });
  
  it('interSection:[1,2,2,2,1]',()=>{
    expect(interSection([1,2,2,2,1],[2,1])).toEqual([1,2])
  });
  it('求众数',()=>{
    expect(majorityElement([2,2,2,3,3,5,2])).toEqual(2)
  });
  it('求众数||',()=>{
    expect(majorityElement_two([1,1,1,3,3,2,2,2])).toEqual([1,2])
  });
  it('求众数||',()=>{
    expect(majorityElement_two([3,2,3])).toEqual([3])
  });
});




// test('array flower:[0,0]',()=>{
//   expect(canFlowers([1, 0, 0, 0, 1, 0, 0], 2)).toBe(true)
// })
import letterCombinations from '../array/letterCombinations'
import hasGroupsSize from '../array/hasGroupsSize'
import canFlowers from '../array/canPlaceFlowers';
describe('array',()=>{
  it('letterCombinations: 23',()=>{
    expect(letterCombinations('2')).toStrictEqual(['a','b','c']);
  });
  it('hasGroupSize: [1,2,3,4,4,3,2,1]',()=>{
    expect(hasGroupsSize([1,2,3,4,4,3,2,1])).toEqual(true)
  })
});
test('array flower:[0,0]',()=>{
  expect(canFlowers([1, 0, 0, 0, 1, 0, 0], 2)).toBe(true)
})
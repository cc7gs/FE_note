import {combination,letterCombination,letterCombination2} from '../../basic/combination';

describe('letter combination',()=>{
  it('comp one letter',()=>{
    expect(combination(['a','b','c'],1)).toEqual([['a'],['b'],['c']]);
  })
  it('comp one letter',()=>{
    expect(combination(['a','b','c'],2).length).toEqual(3);
  })
  it('comp all letter',()=>{
    expect(letterCombination(['a','b','c']).length).toEqual(7);
  })
  it('comp all letter:lettercom2',()=>{
    expect([...letterCombination2(['a','b','c'])].length).toEqual(7);
  })
  it('empty',()=>{
    const result=combination(['a','b','c'],0)
    expect(result).toEqual([[]]);
  })
})
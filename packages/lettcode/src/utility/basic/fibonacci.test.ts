import {fibo,fiboDp,tailFibo} from '../../basic/fibonacci';

describe('fibonacci',()=>{
  it('basic',()=>{
    expect(fibo(6)).toBe(8)
  })
  it('dp',()=>{
    expect(fiboDp(6)).toBe(8)
  })
  it('tail call',()=>{
    expect(tailFibo(6)).toBe(8)
  })
})
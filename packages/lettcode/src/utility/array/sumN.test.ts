import { sumN } from './../../array/sumN';

describe('sumN', () => {
  it('basic', () => {
    expect(sumN([1, 5, 6, 4], 3, 10)).toEqual([1, 5, 4])
  })
  it('not result', () => {
    expect(sumN([1, 5, 6, 8], 2, 10)).toEqual(null)
  })
})
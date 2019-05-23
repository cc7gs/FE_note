import { grayCode } from '../recursive'

describe('array', () => {
  it('grade code:2', () => {
    expect(grayCode(2)).toEqual([0, 1, 3, 2])
  });
});

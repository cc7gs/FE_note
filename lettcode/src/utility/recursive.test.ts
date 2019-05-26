import { grayCode,restoreIpAddresses } from '../recursive'

describe('array', () => {
  it('grade code:2', () => {
    expect(grayCode(2)).toEqual([0, 1, 3, 2])
  });
  it('复原ip地址', () => {
    expect(restoreIpAddresses('25525511135')).toEqual(["255.255.11.135", "255.255.111.35"])
  });
});

import { containsNearbyDuplicate } from '../../array/containsNearbyDuplicate';

describe('containsNearbyDuplicate', () => {
  it('basic', () => {
    expect(containsNearbyDuplicate([1, 2, 3, 1], 3)).toEqual(true)
    expect(containsNearbyDuplicate([1, 0, 1, 1], 1)).toEqual(true)
    expect(containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 2)).toEqual(false)
  })
})
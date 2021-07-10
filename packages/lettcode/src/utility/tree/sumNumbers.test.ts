import { TreeNode, sumNumbers } from '../../tree/sumNumbers'

describe('tree:sumNumbers', () => {
  it('three node', () => {
    const left = new TreeNode(2);
    const right = new TreeNode(3);
    const root = new TreeNode(1, left, right);
    expect(sumNumbers(root)).toBe(25);
  })
})
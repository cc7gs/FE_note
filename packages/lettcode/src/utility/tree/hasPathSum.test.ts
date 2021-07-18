import { TreeNode } from '../../tree/basic'
import { hasPathSum } from '../../tree/hasPathSum'

describe('tree:sumNumbers', () => {
  let root: TreeNode;
  beforeEach(() => {
    const left = new TreeNode(2);
    const right = new TreeNode(3);
    root = new TreeNode(1, left, right);
  })
  it('three node: falsy', () => {
    expect(hasPathSum(root, 5)).toBeFalsy();
  })
  it('three node: true', () => {
    expect(hasPathSum(root, 4)).toBe(true);
  })
})
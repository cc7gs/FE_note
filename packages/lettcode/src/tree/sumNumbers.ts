/* eslint-disable no-multi-assign */


export class TreeNode<T = number> {
  public val: T | number;
  public left: TreeNode<T> | null;
  public right: TreeNode<T> | null;

  constructor(val?: T, left?: TreeNode<T> | null, right?: TreeNode<T> | null) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right)
  }
}

function dfs(root: TreeNode<number> | null, prevSum: number): number {
  if (root === null) {
    return 0
  }
  const sum = prevSum * 10 + root.val;
  if (root.left === null && root.right === null) {
    return sum
  }
  return dfs(root.left, sum) + dfs(root.right, sum)
}

/**
 * 给你一个二叉树的根节点 root ，树中每个节点都存放有一个 0 到 9 之间的数字。
 * 每条从根节点到叶节点的路径都代表一个数字：

 * 例如，从根节点到叶节点的路径 1 -> 2 -> 3 表示数字 123 。
 * 计算从根节点到叶节点生成的 所有数字之和。
 * 叶节点 是指没有子节点的节点。
 * @param {TreeNode} root
 * @return {number}
 */

export const sumNumbers = (root: TreeNode<number>) => {
  return dfs(root, 0);
};

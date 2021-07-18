import type { TreeNode } from './basic';


/**
 * 112. 路径总和
 * @description
 * 给你二叉树的根节点 root 和一个表示目标和的整数targetSum ，
 * 判断该树中是否存在 根节点到叶子节点 的路径，
 * 这条路径上所有节点值相加等于目标和 targetSum 。叶子节点 是指没有子节点的节点。
 * 
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
export function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  // if (root === null) {
  //   return false
  // }
  // if (root.left === null && root.right === null) {
  //   return targetSum - root.val === 0
  // }
  // return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val)
  return dfs(root, 0, targetSum)
};

function dfs(root: TreeNode | null, preSum: number, targetSum: number): boolean {
  if (root === null) {
    return preSum === targetSum
  }
  const curSum = preSum + root.val;
  if (root.left === null && root.right === null) {
    return curSum === targetSum
  }
  return dfs(root.left, curSum, targetSum) || dfs(root.right, curSum, targetSum)
}

import { Tree, Node } from './basic'
/**
 * 617. 合并二叉树
 * 你需要将他们合并为一个新的二叉树。合并的规则是如果两个节点重叠，
 * 那么将他们的值相加作为节点合并后的新值，否则不为 NULL 的节点将直接作为新二叉树的节点。
 */
type IMergeTree = (t1: Node<number> | undefined, t2: Node<number> | undefined) => Node<number>;
export const mergeTrees: IMergeTree = (t1, t2) => {
  if (t1 && t2) {
    t1.val += t2.val;
    t1.left = mergeTrees(t1.left, t2.left);
    t1.right=mergeTrees(t1.right,t2.right);
  }
  return t1! || t2!
}

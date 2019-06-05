import { ListNode, Node } from './basic';

/**
 * 请编写一个函数，使其可以删除某个链表中给定的（非末尾）节点，
 * 你将只被给定要求被删除的节点。
 */
/**
 * @param {ListNode} node
 * @return {ListNode}
 */
const deleteNode = (node: Node) => {
  //非末尾节点
  if (node.next) {
    node.val = node.next.val;
    node.next = node.next.next;
  }
}
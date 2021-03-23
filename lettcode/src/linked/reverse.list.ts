import { LinkedList, Node } from './basic'
/**
 * 206. 反转链表
 * 输入: 1->2->3->4->5->NULL
 * 输出: 5->4->3->2->1->NULL
 */

/**
 * 
 * @param list 
 * @returns 反转列表
 * @description 通过递归形式实现反转
 */
function reverseListByRecursion<T>(list: LinkedList<T>) {
  function reverse(head: Node<T> | null) {
    if (!head || !head.next) {
      return head
    }
    const newHead: Node<T> = reverse(head.next)!;
    head.next!.next = head;
    head.next = null;
    return newHead
  }
  return reverse(list.head);
}

/**
 * @description 通过构建新队列来完成
 */
function reverseList<T>(oldList: LinkedList<T>) {
  let head = oldList.head;
  let newHead = null;
  if (!head || !head.next) return head;
  while (head) {
    const oldNext = head.next as Node<T>;
    head.next = newHead;
    newHead = head;
    head = oldNext;
  }
  return newHead
}

const list = new LinkedList<number>();
Array.from({ length: 5 }, (i, idx) => idx + 1).map(i => list.push(i));
const convertList = reverseList(list)
console.log(list);
console.log(convertList, 'convert')
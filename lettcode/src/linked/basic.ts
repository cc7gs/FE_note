
/**
 * 实现单向链表
 */

/**
 * @description 定义链表节点
 * @return {Node}
 */
class Node {
  val: number;
  next: null | Node;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}
class ListNode {
  constructor(arr: Array<number>) {
    //获取数组第一个元素作为节点
    let head = new Node(<number>arr.shift());
    //将头节点赋值给当前节点
    let cur = head;
    arr.forEach(num => {
      cur.next = new Node(num);
      cur = cur.next
    });
    return head;
  }

}

export {
  ListNode,
  Node,
}

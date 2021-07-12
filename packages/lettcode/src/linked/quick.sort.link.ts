/* eslint-disable @typescript-eslint/no-use-before-define */
import type { Node as INode } from './basic'

type Node=INode<number>;
/**
 * 单链表的快速排序
 * 1. 首先以第一个节点为基准元素
 * 2. 通过遍历以基准元素将链表分为两部分
 * 3. 以此类推重复 1,2
 */
type ISort = (begin: Node, end: Node | undefined) => void;
type IPartition = (begin: Node, end: Node | undefined) => Node;
export const sort: ISort = (begin, end) => {
  if (begin !== end) {
    let pos = partition(begin, end);
    sort(begin, pos);
    if (pos.next) {
      sort(pos.next, end);
    }
  }
}
const partition: IPartition = (begin, end) => {
   // 基准元素
  const  {val} = begin;
  
  let p = begin;
  let q = begin.next;
  while (q && q !== end) {
    if (q && q.val < val) {
      const {next} = p;
      if (next) {
        swap(next, q);
        p = next;
      }
    }
    q = q.next;
  }
  // 交换基准元素
  swap(p, begin);
  return p;
}
const swap = (p: Node, q: Node) => {
  [p.val, q.val] = [q.val, p.val];
}
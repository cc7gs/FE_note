import { sort, ListNode, Node } from '../linked'
describe('链表', () => {
  it('快速排序', () => {
    let head: Node = new ListNode([8, 23, 2, 12, 3]) as Node;
    sort(head, undefined);
    let res:number[] = [];
    let next: null | Node = head;
    while (next) {
      res.push(next.val);
      next = next.next
    }
    expect(res).toEqual([2,3,8,12,23]);
  })
})
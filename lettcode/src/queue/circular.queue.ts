/**
 * 622. 循环队列
 * 循环队列的一个好处是我们可以利用这个队列之前用过的空间。
 * 在一个普通队列里，一旦一个队列满了，我们就不能插入下一个元素，
 * 即使在队列前面仍有空间。但是使用循环队列，我们能使用这些空间去存储新的值。
 */

/**
 * 循环队列
 */
export class MyCircularQueue {
  //队列
  list: any[];
  //队列头
  head: number;
  //队列尾部
  tail: number;
  maxQue: number;
  //设置队列长度
  constructor(k: number) {
    this.list = Array(k);
    this.head = 0;
    this.tail = 0;
    this.maxQue = k;
  }
  //向循环队列插入一个元素,如果成功插入则返回true
  enQueue(v: string | number) {
    if (!this.isFull()) {
      this.list[this.tail] = v;
      this.tail = (this.tail + 1) % this.maxQue;
      return true;
    } else {
      return false;
    }
  }
  //从循环队列删除一个元素。如果成功删除则返回true
  deQueue() {
    if (!this.isEmpty()) {
      this.list[this.head] = '';
      this.head = (this.head + 1) % this.maxQue;
      return true;
    } else {
      return false;
    }
  }
  //检查循环队列是否为空,空则返回true
  isEmpty() {
    return this.head === this.tail && !this.list[this.head]
  }
  //检查循环队列是否已经满了,滿则返回true
  isFull() {
    return this.head === this.tail && !!this.list[this.head];

  }
  //从队首获取元素,如果为空则返回-1
  Front() {
    if (this.isEmpty()) {
      return -1;
    } else {
      return this.list[this.head];
    }
  }
  //从队尾获取元素,如果为空则返回-1
  Rear() {
    if (this.isEmpty()) {
      return -1;
    } else {
      const tail = this.tail - 1;
      return this.list[tail < 0 ? this.maxQue - 1 : tail];
    }
  }

}
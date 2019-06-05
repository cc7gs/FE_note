import { MyCircularQueue, leastInterval } from '../queue'
describe('队列', () => {
  it('循环队列:', () => {
    const myQueue = new MyCircularQueue(3);
    expect(myQueue.enQueue(1)).toBe(true);
    expect(myQueue.enQueue(2)).toBe(true);
    myQueue.enQueue(3);
    expect(myQueue.enQueue(4)).toBe(false);
    expect(myQueue.isFull()).toBe(true);
    expect(myQueue.Front()).toBe(1);
    expect(myQueue.Rear()).toBe(3);
    expect(myQueue.deQueue()).toBe(true);
  });
  it('任务调度', () => {
    expect(leastInterval(["A", "A", "A", "B", "B", "B"], 2)).toBe(8);
  })
})
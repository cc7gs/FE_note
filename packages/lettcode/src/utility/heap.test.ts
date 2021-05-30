import {Heap} from '../heap'
describe('堆',()=>{
  it('堆排序',()=>{
    const input=[10,9,12,4,3];
    const heap=new Heap(input);
    expect(heap.sort()).toEqual([3,4,9,10,12]);
  })
})
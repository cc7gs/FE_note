
import Queue,{Deque} from '../../queue/basic'
describe('Queue',()=>{
    let queue:Queue<number>;
    beforeEach(()=>{
        queue=new Queue<number>();
    })

    it('starts empty',()=>{
        expect(queue.size()).toEqual(0);
        expect(queue.isEmpty()).toEqual(true);
    });

    it('enqueues elements',()=>{
        queue.enqueue(1);
        expect(queue.size()).toEqual(1);
        queue.enqueue(2);
        expect(queue.size()).toEqual(2);
        queue.enqueue(3);
        expect(queue.size()).toEqual(3);

        expect(queue.isEmpty()).toEqual(false);
    })

    it('dequeues elements',()=>{
        queue.enqueue(1);
        queue.enqueue(2);  
        queue.enqueue(3);  

        expect(queue.dequeue()).toEqual(1);
        expect(queue.dequeue()).toEqual(2);
        expect(queue.dequeue()).toEqual(3);
        expect(queue.dequeue()).toEqual(undefined);
    });
    
    it('peek return front element',()=>{
        expect(queue.peek()).toEqual(undefined);
        queue.enqueue(1);
        expect(queue.peek()).toEqual(1);

        queue.enqueue(2);
        expect(queue.peek()).toEqual(1);

        queue.dequeue();
        expect(queue.peek()).toEqual(2);
    })
    it('return if it is empty',()=>{
        expect(queue.isEmpty()).toEqual(true);
        queue.enqueue(1);
        expect(queue.isEmpty()).toEqual(false);
        queue.enqueue(2);
        expect(queue.isEmpty()).toEqual(false);
        queue.enqueue(3);
        expect(queue.isEmpty()).toEqual(false);

        queue.clear();

        expect(queue.isEmpty()).toEqual(true);

        queue.enqueue(1);
        expect(queue.isEmpty()).toEqual(false);
        queue.enqueue(2);
        expect(queue.isEmpty()).toEqual(false);
        queue.enqueue(3);
        expect(queue.isEmpty()).toEqual(false);

        queue.dequeue();
        expect(queue.isEmpty()).toEqual(false);
        queue.dequeue();
        expect(queue.isEmpty()).toEqual(false);
        queue.dequeue();
        expect(queue.isEmpty()).toEqual(true);
        queue.dequeue();
        expect(queue.isEmpty()).toEqual(true);
    });
    
    it('returns toString primitive types',()=>{
        expect(queue.toString()).toEqual('');

        queue.enqueue(1);
        expect(queue.toString()).toEqual('1');
        queue.enqueue(2);
        expect(queue.toString()).toEqual('1,2');
        queue.clear();
        expect(queue.toString()).toEqual('');

        const queueString=new Queue<string>();
        queueString.enqueue('el1');
        expect(queueString.toString()).toEqual('el1');
        queueString.enqueue('el2');
        expect(queueString.toString()).toEqual('el1,el2');
    })

    it('returns toString objects',()=>{
        class MyObj{
            constructor(public el1:any, public el2:any){}
            toString(){
                return `${this.el1.toString()}|${this.el2.toString()}`;
            }
        }
        const queueMyObj=new Queue<MyObj>();
        expect(queueMyObj.toString()).toEqual('');

        queueMyObj.enqueue(new MyObj(1,2));
        expect(queueMyObj.toString()).toEqual('1|2');
        queueMyObj.enqueue(new MyObj(3,4));
        expect(queueMyObj.toString()).toEqual('1|2,3|4');

    })
})
describe('Deque', () => {
    let deque: Deque<number>;
  
    beforeEach(() => {
      deque = new Deque<number>();
    });
  
    it('starts empty', () => {
      expect(deque.size()).toEqual(0);
      expect(deque.isEmpty()).toEqual(true);
    });
  
    it('add elements in the back', () => {
      deque.addBack(1);
      expect(deque.size()).toEqual(1);
  
      deque.addBack(2);
      expect(deque.size()).toEqual(2);
  
      deque.addBack(3);
      expect(deque.size()).toEqual(3);
    });
  
    it('add elements in the front', () => {
      deque.addFront(1);
      expect(deque.size()).toEqual(1);
  
      deque.addFront(2);
      expect(deque.size()).toEqual(2);
  
      deque.addFront(3);
      expect(deque.size()).toEqual(3);
  
      deque.removeFront();
      deque.addFront(4);
      expect(deque.size()).toEqual(3);
    });
  
    it('remove elements from the back', () => {
      deque.addBack(1);
      deque.addBack(2);
      deque.addBack(3);
      deque.addFront(0);
  
      expect(deque.removeBack()).toEqual(3);
      expect(deque.removeBack()).toEqual(2);
      expect(deque.removeBack()).toEqual(1);
      expect(deque.removeBack()).toEqual(0);
      expect(deque.removeBack()).toEqual(undefined);
    });
  
    it('remove elements from the front', () => {
      deque.addFront(1);
      deque.addBack(2);
      deque.addBack(3);
      deque.addFront(0);
      deque.addFront(-1);
      deque.addFront(-2);
  
      expect(deque.removeFront()).toEqual(-2);
      expect(deque.removeFront()).toEqual(-1);
      expect(deque.removeFront()).toEqual(0);
      expect(deque.removeFront()).toEqual(1);
      expect(deque.removeFront()).toEqual(2);
      expect(deque.removeFront()).toEqual(3);
      expect(deque.removeFront()).toEqual(undefined);
    });
  
    it('allows to peek at the front element in the deque without removing it', () => {
      expect(deque.peekFront()).toEqual(undefined);
  
      deque.addFront(1);
      expect(deque.peekFront()).toEqual(1);
      deque.addBack(2);
      expect(deque.peekFront()).toEqual(1);
      deque.addBack(3);
      expect(deque.peekFront()).toEqual(1);
      deque.addFront(0);
      expect(deque.peekFront()).toEqual(0);
      deque.addFront(-1);
      expect(deque.peekFront()).toEqual(-1);
      deque.addFront(-2);
      expect(deque.peekFront()).toEqual(-2);
    });
  
    it('allows to peek at the last element in the deque without removing it', () => {
      expect(deque.peekBack()).toEqual(undefined);
  
      deque.addFront(1);
      expect(deque.peekBack()).toEqual(1);
      deque.addBack(2);
      expect(deque.peekBack()).toEqual(2);
      deque.addBack(3);
      expect(deque.peekBack()).toEqual(3);
      deque.addFront(0);
      expect(deque.peekBack()).toEqual(3);
      deque.addFront(-1);
      expect(deque.peekBack()).toEqual(3);
      deque.addFront(-2);
      expect(deque.peekBack()).toEqual(3);
    });
  
    it('returns the correct size', () => {
      expect(deque.size()).toEqual(0);
  
      deque.addFront(1);
      expect(deque.size()).toEqual(1);
      deque.addBack(2);
      expect(deque.size()).toEqual(2);
      deque.addBack(3);
      expect(deque.size()).toEqual(3);
      deque.addFront(0);
      expect(deque.size()).toEqual(4);
      deque.addFront(-1);
      expect(deque.size()).toEqual(5);
      deque.addFront(-2);
      expect(deque.size()).toEqual(6);
  
      deque.clear();
      expect(deque.size()).toEqual(0);
  
      deque.addFront(1);
      deque.addBack(2);
      expect(deque.size()).toEqual(2);
  
      deque.removeFront();
      deque.removeBack();
      expect(deque.size()).toEqual(0);
    });
  
    it('returns if it is empty', () => {
      expect(deque.isEmpty()).toEqual(true);
  
      deque.addFront(1);
      expect(deque.isEmpty()).toEqual(false);
      deque.addBack(2);
      expect(deque.isEmpty()).toEqual(false);
  
      deque.clear();
      expect(deque.isEmpty()).toEqual(true);
  
      deque.addFront(1);
      deque.addBack(2);
      expect(deque.isEmpty()).toEqual(false);
  
      deque.removeFront();
      expect(deque.isEmpty()).toEqual(false);
      deque.removeBack();
      expect(deque.isEmpty()).toEqual(true);
    });
  
    it('clears the queue', () => {
      deque.clear();
      expect(deque.isEmpty()).toEqual(true);
  
      deque.addFront(1);
      deque.addBack(2);
      expect(deque.isEmpty()).toEqual(false);
  
      deque.clear();
      expect(deque.isEmpty()).toEqual(true);
    });
  
    it('returns toString primitive types', () => {
      expect(deque.toString()).toEqual('');
  
      deque.addFront(1);
      expect(deque.toString()).toEqual('1');
  
      deque.addBack(2);
      expect(deque.toString()).toEqual('1,2');
  
      deque.clear();
      expect(deque.toString()).toEqual('');
  
      const queueString = new Deque<string>();
      queueString.addFront('el1');
      expect(queueString.toString()).toEqual('el1');
  
      queueString.addBack('el2');
      expect(queueString.toString()).toEqual('el1,el2');
    });
  
    it('returns toString objects', () => {
      class MyObj {
        constructor(public el1: any, public el2: any) {}
        toString() {
          return `${this.el1.toString()}|${this.el2.toString()}`;
        }
      }
      const dequeMyObj = new Deque<MyObj>();
      expect(dequeMyObj.toString()).toEqual('');
  
      dequeMyObj.addFront(new MyObj(1, 2));
      expect(dequeMyObj.toString()).toEqual('1|2');
  
      dequeMyObj.addBack(new MyObj(3, 4));
      expect(dequeMyObj.toString()).toEqual('1|2,3|4');
    });
  });
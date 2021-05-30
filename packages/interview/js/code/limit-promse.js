class Node{
  constructor(val){
    this.value=val;
    this.tail=null;
  }
}

class Queue{
  constructor(){
      this.clear();
  }
  enqueue(val){
    const node=new Node(val)
    if(this.head){
      this.tail.next=node;
      this.tail=node;
    }else{
      this.head=node;
      this.tail=node;
    }
    this._size++;
  }
  dequeue(){
    const current=this.head;
    if(!current){
      return 
    }
    this.head=this.head.next;
    this._size--;
    return current.value
  }
  clear(){
    this._size=0;
    this.head=null;
    this.tail=null;
  }
  get size(){
    return this._size;
  }
  *[Symbol.iterator](){
    let current=this.head;
    while(current){
      yield current.value;
      current=this.head.next;
    }
  }
}

const pLimit = (concurrency) => {
  const queue = new Queue();
  let activeCount = 0;


  const next = () => {
    activeCount--;

    if (queue.size>0) {
      queue.enqueue()()
    }
  }

  const run = async (fn, resolve, ...args) => {
    activeCount++;

    const result = (async () => fn(...args))();
    resolve(result);
    
    try {
			await result;
		} catch {}
    
    next()
  }

  const enqueue = (fn, resolve, ...args) => {
    queue.enqueue(run.bind(null, fn, resolve, ...args));

    /**
     * 在下一个微任务执行前执行。
     */
    (async () => {

      await Promise.resolve();

      if (activeCount < concurrency && queue.size>0) {
        queue.dequeue()()
      }
    })()
  }
  const generator = (fn, ...args) => new Promise((resolve) => {
    enqueue(fn, resolve, ...args)
  });

  Object.defineProperties(generator, {
		activeCount: {
			get: () => activeCount
		},
		pendingCount: {
			get: () => queue.size
		},
		clearQueue: {
			value: () => {
				queue.clear()
			}
		}
  });
  
  return generator
}

const limit = pLimit(2);

const input = [
  limit((val) => val, 1),
  limit(() => Promise.resolve(1)),
  limit(()=>Promise.reject('error'))
];
console.log(input);
  (async () => {
      const result = await Promise.all(input).catch(()=>{});
      console.log(result,'result');
  })()
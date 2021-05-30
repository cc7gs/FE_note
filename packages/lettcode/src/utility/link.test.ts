import { sort, ListNode, Node,LinkedList } from '../linked'
describe('链表', () => {
  it('快速排序', () => {
    let head = new ListNode([8, 23, 2, 12, 3]) as Node<number>;
    sort(head, undefined);
    let res:number[] = [];
    let next:Node<number>|null = head;
    while (next) {
      res.push(next.val);
      next = next.next
    }
    expect(res).toEqual([2,3,8,12,23]);
  })
})

describe('linedList',()=>{
  const range = (length:number) =>Array.from({length}).map((v,i)=>i); 
  const abcRange = (length:number) => range(length).map( num => String.fromCharCode( 97 + num ) );
  let list:LinkedList<string>;
  beforeEach( () => {
    list = new LinkedList();
  })
  
  it('constructor', () => {
    expect(list).toEqual(jasmine.any(LinkedList));
  });
  
  it('push', () => {
    abcRange(26).map( character => list.push(character) );
    expect(list.length).toEqual(26);
  });
  
  it('pop', () => {
    abcRange(13).map( character => list.push(character) );
    expect(list.length).toEqual(13);
    range(10).map( () => list.pop() );
     expect(list.length).toEqual(3);
    expect(list.pop()).toEqual('c');
  });
  
  it('get', () => {
    list.push('first');
    expect(list.get(0)).toEqual('first');
    list.push('second');
    expect(list.get(1)).toEqual('second');
    expect(list.get(0)).toEqual('first');
    abcRange(26).map( character => list.push(character));
    expect(list.get(27)).toEqual('z');
    expect(list.get(0)).toEqual('first');
    expect(list.get(9)).toEqual('h');
    list.pop();
    expect(list.get(list.length-1)).toEqual('y');
  });
  
  it('delete', () => {
    abcRange(26).map( character => list.push(character) );
    console.log(list,'prev');
    list.delete(13);
    console.log(list,'next')
    expect(list.length).toEqual(25);

    expect(list.get(12)).toEqual('m');
    expect(list.get(13)).toEqual('o');
    list.delete(0);
    expect(list.length).toEqual(24);
    expect(list.get(0)).toEqual('b');
  });
  
})
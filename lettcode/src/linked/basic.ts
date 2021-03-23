
/**
 * 实现单向链表
 */


/**
 * @description 定义链表节点
 * @return {Node}
 */
class Node<T> {
  val:T;
  next: null | Node<T>;
  constructor(val:T) {
    this.val = val;
    this.next = null;
  }
}
class ListNode {
  constructor(arr: Array<number>) {
    //获取数组第一个元素作为节点
    let head = new Node(arr.shift());
    //将头节点赋值给当前节点
    let cur = head;
    arr.forEach(num => {
      cur.next = new Node(num);
      cur = cur.next
    });
    return head;
  }

}

class LinkedList<T>{
  public head:Node<T>|null;
  public tail:Node<T>|null;
  public length:number;
  constructor(){
    this.head=this.tail=null;
    this.length=0;
  }
  push(value:T){
    const node=new Node(value);
    if(!this.head){
      this.head=node;
    }else{
      this.tail!.next=node;
    }
    this.tail=node;
    this.length++;
  }
  pop(){
    if(!this.head) return null;
    if(this.head===this.tail){
      const node=this.head;
      this.head=this.tail=null;
      return node.val;
    }
    const preLastNode=this.find(0,(value,curValue,i,node)=>node!.next===this.tail);
    const ans=preLastNode?.next?.val;
    preLastNode!.next=null;
    this.tail=preLastNode;
    this.length--;
    return ans;
   
  }
  get(index:number){
    const curNode=this.find(index,this.testIndex);
    if(!curNode) return null;
    return curNode.val;
  }
  delete(index:number){
    if(index==0){
      const head=this.head;
      if(this.head){
        this.head=this.head.next;
      }else{
        this.head=null;
      }
      this.length--;
      return head?.val
    }
    const node=this.find(index-1,this.testIndex);
    if(!node?.next) return null;
    const curNode=node.next;
    node.next=curNode.next;
    if(!curNode.next) this.tail=node.next;
    this.length--;
    return curNode.val;
  }
  private find(value:T|number|null,test=this.test){
    let head=this.head;
    let i=0;
    while(head){
      if(test(value,head.val,i,head)){
        return head
      }
      i++
      head=head.next;
    }
    return null;
  }
  private test(search:T|number|null,value:T|number,index?:number,node?:Node<T>){
    return search===value;
  }
  private testIndex(search:null,_:any,index:number){
    debugger
    return search===index
  }
}
export {
  ListNode,
  Node,
  LinkedList,
}




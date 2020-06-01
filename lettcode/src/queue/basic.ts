
/**
 * @description 队列，性质 先进先出(FIFO)
 */
export default class Queue<T>{
    private items:{[key:string]:T};
    private count:number;
    private head:number;
    constructor(){
        this.items={};
        this.count=0;
        this.head=0;
    }
    enqueue(value:T){
        this.items[this.count]=value;
        this.count++;
    }
    dequeue(){
        if(this.isEmpty()){
            return undefined
        }
        const val=this.items[this.head];
        delete this.items[this.head];
        this.head++;
        return val;
    }
    peek(){
        if(this.isEmpty()) return undefined;
        return this.items[this.head]
    }
    size(){
        return this.count-this.head;
    }
    isEmpty(){
        return this.count===this.head
    }
    clear(){
        this.items={};
        this.count=0;
        this.head=0;
    }
    toString(){
        if(this.isEmpty()) return '';

        let objStr=`${this.items[this.head]}`;
        for(let i=this.head+1;i<this.count;i++){
            objStr=`${objStr},${this.items[i]}`
        }
        return objStr;
    }
}

/**
 * 
 */

 export class Deque<T>{
    private count:number;
    private head:number;
    private items:{[key:string]:T} 
    constructor(){
        this.count=0;
        this.head=0;
        this.items={}
     }
     // 队列头部加入元素
     addFront(element:T){
        if(this.isEmpty()){
            this.addBack(element);
        }else if(this.head>0){
            this.head--;
            this.items[this.head]=element;
        }else{
            for(let i=this.count;i>0;i--){
                this.items[i]=this.items[i-1];
            }
            this.count++;
            this.items[0]=element;
        }
     }
     //队列尾部加入元素
     addBack(element:T){
        this.items[this.count]=element;
        this.count++;
     }
     // 删除队列头部元素
     removeFront(){
        if(this.isEmpty()) return undefined;
        const result=this.items[this.head];
        delete this.items[this.head];
        this.head++;
        return result
     }
     removeBack(){
        if(this.isEmpty()) return undefined;
        this.count--;
        const result=this.items[this.count];
        delete this.items[this.count];
        return result
     }
     peekFront(){
        if(this.isEmpty()) return undefined;
        return this.items[this.head]
     }
     peekBack(){
        if(this.isEmpty()) return undefined;
        return this.items[this.count-1]
     }
     isEmpty(){
        return this.size()===0
     }
     clear(){
         this.count=0;
         this.head=0;
         this.items={}
     }
     size(){
        return this.count-this.head
     }
     toString(){
        if(this.isEmpty()) return '';
        let objStr=`${this.items[this.head]}`;
        for(let i=this.head+1;i<this.count;i++){
            objStr=`${objStr},${this.items[i]}`
        };
        return objStr
     }
 }
/**
 * @desc 使用对象模拟实现一个栈结构
 */
export class Stack<T>{
    private items:{[key:number]:T};
    private count:number;
    constructor(){
        this.items={};
        this.count=0;
    }
    /**
     * 入栈,
     * @param value 
     */
    push(value:T){
        this.items[this.count]=value;
        this.count++;
    }
    /**
     * 出栈
     * @returns last value
     */
    pop(){
        if(this.isEmpty()){return undefined};
        this.count--;
        const curValue=this.items[this.count];
        delete this.items[this.count];
        return curValue
    }
    /**
     * 返回栈顶元素
     * @returns value
     */
    peek(){
        if(this.isEmpty()) return undefined;
        
        return this.items[this.count-1]
    }
    toString(){
        if(this.isEmpty()){return ''};
    
        //    return  Object.values(this.items).join()

        let objString=`${this.items[0]}`;
        for(let i=1;i<this.count;i++){
            objString=`${objString},${this.items[i]}`
        }
        return objString
    }
    isEmpty(){
        return this.count==0
    }
    size(){
        return this.count
    }
    clear(){
        this.count=0;
        this.items={}
    }
}
/**
 * @desc  to implement ArrayList using objects
 */

export class ArrayList<T> {
    public length: number;
    private data: { [key: number]: T }
    constructor() {
        this.length = 0;
        this.data = {};
    }
    push(value:T) {
        this.data[this.length] = value;
        this.length++
    }
    pop() {
        const ans = this.data[this.length - 1];
        delete this.data[this.length - 1];
        this.length--;
        return ans;
    }
    get(index:number) {
        return this.data[index]
    }
    delete(index:number) {
        const ans=this.data[index];
        this.collapseTo(index);
        return ans
    }
    serialize(){
        return this.data
    }
    private collapseTo(index:number){
        for(let i=index;i<this.length;i++){
            this.data[i]=this.data[i+1]
        }
        delete this.data[this.length-1];
        this.length--;
    }
    
}
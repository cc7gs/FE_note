import {Stack} from '../../stack/basic'

describe('Stack',()=>{
    let stack:Stack<number>;

    beforeEach(()=>{
        stack=new Stack<number>();
    });
    it('starts empty',()=>{
        expect(stack.size()).toEqual(0);
        expect(stack.isEmpty()).toEqual(true);
    });

    it('push elements',()=>{
        stack.push(1);
        expect(stack.size()).toEqual(1);
        stack.push(2);
        expect(stack.size()).toEqual(2);

        expect(stack.isEmpty()).toEqual(false)
    });

    it('pop element',()=>{
        stack.push(1);
        stack.push(2);
        stack.push(3);
        console.log(stack,'pop')
        expect(stack.pop()).toEqual(3);
        expect(stack.pop()).toEqual(2);
        expect(stack.pop()).toEqual(1);
        expect(stack.pop()).toEqual(undefined);
    });

    it('allows to peek at the top element in the stack without poping it',()=>{
        expect(stack.peek()).toEqual(undefined);
        stack.push(1);
        expect(stack.peek()).toEqual(1);
        stack.push(2);
        expect(stack.peek()).toEqual(2);
        stack.push(3);
        expect(stack.peek()).toEqual(3);        

        stack.clear();
        expect(stack.isEmpty()).toEqual(true)
    });

    it('clear the stack',()=>{

        stack.clear();
        expect(stack.isEmpty()).toEqual(true);

        stack.push(1);
        stack.push(2);
        stack.push(3);

        stack.clear();
        expect(stack.isEmpty()).toEqual(true);
    });
    it('returns toString primitive types',()=>{
        expect(stack.toString()).toEqual('');

        stack.push(1);
        expect(stack.toString()).toEqual('1');
        stack.push(2);
        expect(stack.toString()).toEqual('1,2');

        const stackString=new Stack<string>();
        stackString.push('first');
        expect(stackString.toString()).toEqual('first');
        stackString.push('seconds');
        expect(stackString.toString()).toEqual('first,seconds');
        
    });

    it('return toString object',()=>{

        class MyObj{
            constructor(public el1:any,public el2:any){

            }
            toString(){
                return `${this.el1.toString()}|${this.el2.toString()}`
            }
        }
        const stackMyObj=new Stack<MyObj>();
        expect(stackMyObj.toString()).toEqual('');

        stackMyObj.push(new MyObj(1,2));
        expect(stackMyObj.toString()).toEqual('1|2');
        stackMyObj.push(new MyObj(3,4));
        expect(stackMyObj.toString()).toEqual('1|2,3|4');
    })
})
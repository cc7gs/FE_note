/**
 * 实现一个可迭代的对象/类
 * 1. 该对象/类必须有 全局 Symbol.iterator做其属性
 * 2. 该方法必须返回一个对象,在这个对象中必须包含 next 方法
 * 3. 该next 方法可以访问存储的数据
 */


let users=[
    {
        name:'cc',
        age:12
    },{
        name:'vs',
        age:22
    }
];

class User{
    constructor(users){
        this.users=users;
    }
    [Symbol.iterator](){
        let i=0;
        let users=this.users;
        return{
            next(){
                if(i<users.length){
                    return {done:false,value:users[i++]}
                }
                return {done:true,value:undefined}
            }
        }
    }
}

let allUser=new User(users);

//1. 通过 iterator访问
/**
let allUserIterator=allUser[Symbol.iterator]();
console.log(allUserIterator.next()); 
console.log(allUserIterator.next());
console.log(allUserIterator.next());
console.log(allUserIterator.next());
* 
 */

/*
//方式二 通过 for-of
for(let g of allUser){
    console.log(g);
}
*/

/*
//方式三 通过 ...
console.log(...allUser);
*/

/**
 * 将上面的类改写
 */
class Users{
    constructor(users){
        this.users=users;
    }
    *getIterator(){
        for(let i in this.users){
            yield this.users[i];
        }
    }
}
let newUsers=new Users(users);
 console.log(...newUsers.getIterator());

 
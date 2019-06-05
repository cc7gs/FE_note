function create(){
    //设置一个空对象
    let obj={};
    //取出构造函数
    var Cons=[].shift.call(arguments);
    //让空对象继承构造函数的prototype
    obj.__proto__=Cons.prototype;
    //执行构造函数
    let result=Cons.apply(obj,arguments);
        //确保返回的是一个对象
    return result instanceof Object?result:obj;
}
function Person(name){
    this.name=name;
    console.log(name);
}
// create(Person,'cc');

async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}
async function async2() {
    console.log('async2')
}
console.log('script start')
setTimeout(function () {
    console.log('settimeout')
})
async1()
new Promise(function (resolve) {
    console.log('promise1')
    resolve()
}).then(function () {
    console.log('promise2')
})
console.log('script end')
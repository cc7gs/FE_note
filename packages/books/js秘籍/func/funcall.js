/**
 * 构造函数的目的是初始化新创建的对象,并且新构造的对象会作为构造函数的调用结果返回
 *  - 如果构造函数返回非对象类型 则
 * 将会被忽略
 *  - 如果返回对象 则将以该对象返回,但构造函数的this将会丢失
 */
function whatsMyContext() {
    return this;
}
assert(whatsMyContext() === window, 'In strict the context is window');

var getMythis = whatsMyContext;
assert(getMythis() === window, 'Another function call in window');

var cc = {
    getMythis: whatsMyContext
}
assert(cc.getMythis() === cc, 'Working with 1st cc');
var cc2 = {

}
new Function('a', 'b', 'return a+b');
//构造函数 案例一
function Create() {
    this.say = function () {
        return true
    }
    return 1;
}
assert(Create() === 1, 'retrun value honred when not called as a constructor');
var create = new Create();
assert(typeof create === 'object', 'Object returned when called as a constructor');
assert(typeof create.say === 'function', 'Create object has a cc method');
//构造函数 案例二
var puppet = {
    rules: false
}

function Emperor() {
    this.rules = true;
    return puppet;
}
var emperor = new Emperor();
assert(emperor === puppet, 'The emperor is merely a puppet');
assert(emperor.rules === false, 'The puppet does not know how to rule');

function forEach(list, callback) {
    for (var i = 0; i < list.length; i++) {
        callback.call(list[i],i);
    }
}
var arr = [{type:1}];
forEach(arr, (index)=>{
    console.log(this,index);
    assert(this === arr[index], 'got the expected value1 ');
})

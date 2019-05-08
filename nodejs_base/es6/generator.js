function* foo(x){
    var y=2*(yield (x+1));
    var z=yield (y/3);
    return (x+y+z);
}
var a=foo(5);
// console.log(a.next());
// console.log(a.next());
// console.log(a.next());

//遍历值
// for(let f of foo(5)){
//     console.log(f);
// }

// var b=foo(5);
// console.log(b.next());  //x=5;
// console.log(b.next(12)); //y=24;
// console.log(b.next(13)); //z=13
/**
 * 返回值
 *{ value: 6, done: false }
 * { value: 8, done: false }
 * { value: 42, done: true }
 */
// var c=foo(5);
// console.log(c.next()); // x=5
// console.log(c.next(3)); // y=6
// console.log(c.next(10)); //z=10
/**
 * 返回值
 *{ value: 6, done: false }
 * { value: 2, done: false }
 * { value: 21, done: true }
 */
/**
 * 将多维数组输出
 */
const arr=[1,[2,3,[4,5,6,[7,[8,'cc']]]]];

const flat=function*(arr){
    var length=arr.length;
    for(var i=0;i<length;i++){
        var item=arr[i];
        if(Array.isArray(item)){
            yield* flat(item);
        }else{
            yield item;
        }
    };
}

let [...rest]=flat(arr)
console.log(rest);

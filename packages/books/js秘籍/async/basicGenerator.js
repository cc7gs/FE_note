function* NameGenerator(){
    yield 'Katana';
    yield 'cc';
    yield 'wgs';
}

// for (const name of NameGenerator()) {
//     assert(name!==undefined,name)
// }
// const nameIterator=NameGenerator();
// let item;
// while(!(item=nameIterator.next()).done){
//     assert(item!==null,item.value);
// }

function* WorldGenerator(action){
    yield 'hi'+action;
    return 'hello, world'
}

const worldIterator=WorldGenerator('cc');
const result1=worldIterator.next();
const result2=worldIterator.next();
// console.log(result1,result2,'result')

function* EvenGenerator(){
    let num=2;
    while(true){
        yield num;
        num=num+2;
    }
}

let generator=EvenGenerator();
let a1=generator.next().value;
let a2=generator.next().value;
let a3=EvenGenerator().next().value;
let a4=generator.next().value;
console.log(a1,a2,a3,a4,'even result'); //2 4 2 6

function* Gen(val){
    val=yield val* 2;
    yield val;
}
let gen=Gen(2);
let g1=gen.next(3).value;
let g2=gen.next(5).value;
console.log(g1,g2,'gen') // 4 5

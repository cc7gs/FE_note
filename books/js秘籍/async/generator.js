/**
 * 生成器
 */
function* IdGenerator(){
    let id=0;
    while(true) yield ++id;
}
const idIterator=IdGenerator();
const obj1={id:idIterator.next().value,name:'cc'}
const obj2={id:idIterator.next().value,name:'cc'}
const obj3={id:idIterator.next().value,name:'cc'}
assert(obj1.id===1,'First obj has id 1');
assert(obj2.id===2,'second obj has id 2');
assert(obj3.id===3,'third obj has id 3');

const subTree=document.getElementById('subTree');


//遍历DOM树
function traverseDOM(element,callback){
    callback(element);
    element=element.firstElementChild;
    while(element){
        traverseDOM(element,callback);
        element = element.nextElementSibling;
    }
}
// traverseDOM(subTree,(element)=>{
//     assert(element!==null,element.nodeName);
// });

function* DomGenerator(element){
    yield element;
    element=element.firstElementChild;
    while(element){
        yield* DomGenerator(element);
        element=element.nextElementSibling;
    }
}
// for (let element of DomGenerator(subTree)){
//     assert(true,element.nodeName)
// }

function* SayGenerator(action){
    const imposter=yield ('hello '+action);

    assert(imposter==='Hanzo','the generator has been infiltrated  '+imposter);
    yield (`you shi(${imposter})${action}`);
}
// const sayIterator=SayGenerator('wcc');
// const result1=sayIterator.next();
// assert(result1.value==='hello wcc',result1.value);
// const result2=sayIterator.next(result1.value);
// assert(false,result2.value);

//throw error
function* ErrorGenerator(){
    try {
        yield 'hello'
    } catch (error) {
        assert(error==='Catch this','catch')
    }
}
// const errorIterator=ErrorGenerator();
// const result1=errorIterator.next();
// errorIterator.throw('Catch this');
function* PrintGenerator(action){
    yield 'hello'+action;
    return 'hello'+action;
}
// const  printIterator=PrintGenerator('wcc');
// const result1=printIterator.next();
// const result2=printIterator.next();

const promise=new Promise((resolve,reject)=>{
    undefineds++;
})
// promise.then(()=>console.log('11'),()=>{console.log('err')})

function test(resolve,reject){
    var timeOut=Math.random()*2;
    console.log(`see timeout to:${timeOut} seconds`);
    setTimeout(()=>{
        if(timeOut<1){
            console.log('call resolve()...');
            resolve('200 ok');
        }else{
            console.log('call reject...');
            reject('200 OK');
        }
    },timeOut*1000);
}
var p1=new Promise(test);
var p2=p1.then((res)=>{
    console.log('success:',res);
    console.log(p1);
})
p2.catch((error)=>{
    console.log('error:',error);
})
// p1.then((res)=>{
//     console.log('success:'+res);
// })
// .catch((error)=>{
//     console.log('error'+error);
// })

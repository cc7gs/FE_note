// const v=require('./exports-node')
// console.log(v);

// function fibonacci(n){
//     if(n==0||n==1){
//         return n;
//     }
//     return fibonacci(n-1)+fibonacci(n-2)
// }

// function fibonacci(n){
//     let a=b=1;
//     for(let i=3;i<=n;i++){
//         [a,b]=[b,a+b];
//     }
//     return b;
// }

function fibonacci(n,a=1,b=1){
    if(n<=1){return b;}
    return fibonacci(n-1,b,a+b);
}
// function memo(fn){
//     var r={};
//     return function(n){
//         if(r[n]==undefined){
//             r[n]=fn(n);
//         }
//         return r[n]
//     }
// }
// var fibonacci=memo(function(n){
//     if(n==0||n==1){
//         return n
//     }
//     return fibonacci(n-1)+fibonacci(n-2)
// })
console.log(fibonacci(10));
console.log(1);

setTimeout(() => {
 console.log(2);
 Promise.resolve().then(()=>{
     console.log(3);
 })

 new Promise((resolve)=>{
     console.log(4);
     resolve();
 }).then(()=>{
     console.log(5);
 })   
});

Promise.reject().then(()=>{
    console.log(13);
},()=>{
    console.log(12)
})

new Promise((resolve)=>{
    console.log(7);
    resolve();
}).then(()=>{
    console.log(8);
});

setTimeout(() => {
    console.log(9);
    Promise.resolve().then(()=>{
        console.log(10);
    })
    new Promise(resolve=>{
        console.log(11);
        resolve()
    }).then(()=>{
        console.log(12);
    })
});

//node: 1 7 12 8 2 4 9 11 3 5 10 12

//浏览器: 1 7 12 8 2 4 3 5 9 11 10 12

new Promise((resolve,reject)=>{
    console.log(1);
    resolve()
})
.then(()=>{
    console.log(2);
    new Promise((resolve,reject)=>{
        console.log(3);
        setTimeout(()=>{
            reject();
        },3*1000);
        resolve();
    }).then(()=>{
        console.log(4);
        new Promise((resolve,reject)=>{
            console.log(5);
            resolve()
        })
        .then(()=>{
            console.log(7);
        })
        .then(()=>{
            console.log(9);
        })
    })
    .then(()=>{
        console.log(8);
    })
})
.then(()=>{
    console.log(6);
})

// 1 2 3 4 5 7 9 8 6

async function async1(){
    console.log('async1 start');
    new Promise((resolve,reject)=>{
        try {
            throw new Error('error1');
        } catch (e) {
            console.log(e);
        }
        setTimeout(() => {
            resolve('promise4')
        }, 3*1000);
    })
    .then(res=>{
        console.log(res);
    },err=>{
        console.log(err);
    })
    .finally(res=>{
        console.log(res);
    })
    console.log(await async2());
    console.log('async1 end');
}
function async2(){
    console.log('async2');
    return new Promise(resolve=>{
        setTimeout(() => {
            resolve(2)
        }, 1*3000);
    })
}
console.log('script start');

setTimeout(()=>{
    console.log('setTimeout');
},0)

async1();

new Promise(resolve=>{
    console.log('promise1');
    resolve()
})
.then(()=>{
    console.log('promise2');
    return new Promise(resolve=>{
        resolve()
    })
    .then(()=>{
        console.log('then 1-1');
    })
})
.then(()=>{
    console.log('promise3');
})

console.log('script end');


// script start -> async1 start -> error1 -> async2 -> promise1 -> script end -> promise2 -> then1-1 -> promise3
// -> setTimeout -> promise4 -> undefined -> 2 -> async1 end

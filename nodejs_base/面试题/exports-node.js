// export=module.exports={}
/**
 * module.exports 初始值是一个空对象
 * exports 是指向module.exports的引用
 * require返回的是module.exports 而不是 exports
 */


module.exports=exports=function a(){
    console.log('a');
};
// module.exports={a:2};

//环境变量

NODE_ENV='test';
console.log(process.env.NODE_ENV);



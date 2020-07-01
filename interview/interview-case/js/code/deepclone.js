/**
 * 深拷贝
 * @param {Object} obj 
 */
function deepClone(obj={}){
    //边界判断
    if(typeof obj !=='object'|| obj===null){
        return obj
    }

    let result=obj instanceof Array?[]:{};

    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            result[key]=deepClone(obj[key])
        }
    }
    return result
}

//test
let obj={
    name:'cc',
    address:{
        city:'shanghai'
    }
}
let objParse=deepClone(obj);
objParse.address.city='xian';
console.log(obj)
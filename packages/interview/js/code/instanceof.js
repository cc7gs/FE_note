/* eslint-disable no-param-reassign */
/* eslint-disable no-proto */
/**
 *用来判断 left对象是不是right对象的实例 
 */
function selfInstanceof(left,right){
    const {prototype} = right;
    left=left.__proto__;
    while(true){
        if(left===null || left===undefined){
            return false;
        }
        if(prototype===left){
            return true;
        }
            left=left.__proto__;
        
    }
}

function Foo(){}
console.log(selfInstanceof(Object,Foo));
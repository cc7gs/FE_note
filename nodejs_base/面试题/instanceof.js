/**
 *用来判断 left对象是不是right对象的实例 
 */
function _instanceof(left,right){
    let prototype=right.prototype;
    left=left.__proto__;
    while(true){
        if(left===null || left===undefined){
            return false;
        }
        if(prototype===left){
            return true;
        }else{
            left=left.__proto__;
        }
    }
}
function Foo(){}
console.log(_instanceof(Object,Foo));
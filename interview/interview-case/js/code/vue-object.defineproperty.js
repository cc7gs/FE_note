// var obj={};
// var _name;
// Object.defineProperty(obj,'name',{
//      get:()=>{
//         console.log('get');
//         return _name; 
//     },
//      set:(newVal)=>{
//         console.log('set');
//         _name=newVal;
//     }
// });
// obj.name='cc';
// console.log(obj.name);

var data={name:'cc',age:22};
var vm={};
var _data;
for(let key in data){
    (function(key){
        Object.defineProperty(vm,key,{
            set:function(newVal){
                data[key]=newVal;      
            },
            get:function(){
                return data[key];
            }
        })
    })(key)
}
console.log(vm.name);
console.log(vm.age=20);
console.log(data);
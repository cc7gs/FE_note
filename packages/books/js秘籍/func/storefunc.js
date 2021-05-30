var store={
    nextId:1,
    cache:{},
    add:function(fn){
        if(!fn.id){
            fn.id=this.nextId++;
            this.cache[fn.id]=fn;
            return true
        }
    }
}
function cc(){}
assert(store.add(cc),'add function ');
assert(store.add(cc),'add function only once ');

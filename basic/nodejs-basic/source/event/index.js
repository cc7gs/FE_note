class EventEmitter{
  constructor(){
    this._events={};
  }
  on(eventName,fn){
    (this._events[eventName]||(this._events[eventName]=[])).push(fn);
  }
  emit(eventName,...args){
    const curEventArr=this._events[eventName];
    if(curEventArr){
      curEventArr.forEach(event=>event(...args))
    }
  }
  off(eventName,fn){
    this._events[eventName]=this._events[eventName].filter(event=>(event!==fn&&event.l!==fn));
  }
  once(eventName,fn){
    const callback=(...args)=>{
      fn(...args);
      this.off(eventName,fn);
    }
    callback.l=fn;
    this.on(eventName,callback)
  }
}

module.exports=EventEmitter;
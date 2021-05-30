---
title: event
nav:
  title: 基础篇
  path: /basic
group:
  title: node源码
  path: /node-source
  order: 4
---

## event basic

```js
const EventEmitter=require('events');
// const EventEmitter=require('./index');

const event=new EventEmitter();

const say=(name)=>console.log('say',name);
const run=(name)=>console.log('run',name)

/**
 * event.on('print',say);
 * event.on('print',run);
 * event.emit('print','cc')
 */

event.once('print',say);
event.once('print',run);

event.off('print',say);
event.emit('print','cc')
event.emit('print','wgs')

```
## event 实现

```js
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

```
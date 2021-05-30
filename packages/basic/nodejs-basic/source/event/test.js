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

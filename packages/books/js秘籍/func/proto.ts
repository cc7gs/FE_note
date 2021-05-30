import {assert} from '../util'

function Ninja(){
    this.swung=false;
    this.swingSword=function(){
        return !this.swung;
    }
}
Ninja.prototype.swingSword=function(){
    return this.swung
}

const ninja=new Ninja();

Ninja.prototype={
    say(){
        console.log('say...')
    }
}
const ninja2=new Ninja();

assert(ninja.swingSword(),'call instance method,not the prototype method')
assert(!ninja.say,'overwrite prototype still not change')
assert(ninja2.say,'newly created ninja can call say')



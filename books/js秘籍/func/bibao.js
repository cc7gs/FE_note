function animateIt(elementId){
    var elem=document.getElementById(elementId);
    var tick=0;
    var timer=setInterval(()=>{
        if(tick<100){
            elem.style.left=elem.style.top=tick+'px';
            tick++;
        }else{
            clearInterval(timer);
            assert(tick===100,'Tick accessed via a closure');
            assert(elem,'Element also accessed via a closure');
            assert(timer,'Timer reference also obtained via a closure');
        }
    },100);
}
animateIt('box1');
animateIt('box2');


//执行上下文
function skulk(name){
    report(name+'skulking');
}
function report(message){
    console.log(message);
}
// skulk('cc');
// skulk('wgs');

//通过函数访问私有变量，而不是通过对象访问
function Person(){
    var counts=0;
    this.getCounts=function(){
        return counts;
    }
    this.count=function(){
        counts++;
    }
}
var man=new Person();
man.count();
var imposter={};
//将构造函数的方法 赋值给对象
imposter.getCounts=man.getCounts;

assert(imposter.getCounts()===1,'The imposter has access to the feints variable');


var text='Demo callback';
report('Before defining functions');
function useless(callback){
    report('In useless function');
   return callback();
}
function getText(){
    report('In getText function');
    return text;
}
report('Before making all the calls');
assert(useless(getText)===text,'the useless function works!');
report('After the calls have been made');
console.log(useless(getText));

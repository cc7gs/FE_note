export function assert(value,desc){
    var li=document.createElement('li');
    li.className=value?'pass':'fail';
    li.appendChild(document.createTextNode(desc));
    document.getElementById('result').appendChild(li);
}

export function report(text){
    assert(true,text);
}
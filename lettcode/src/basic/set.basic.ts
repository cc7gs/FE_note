
//并集合
function union<T>(setA:Set<T>,setB:Set<T>){
  return new Set([...setA,...setB])
}
//交集
function interSection<T>(setA:Set<T>,setB:Set<T>){
    return new Set([...setA].filter(x=>setB.has(x)))
}

//差集
function difference<T>(setA:Set<T>,setB:Set<T>){
    return new Set([...setA].filter(x=>!setB.has(x)))
}

const setA=new Set();
setA.add(1);
setA.add(2);
setA.add(3);
setA.add(4);


const setB=new Set();
setB.add(3);
setB.add(4);
setB.add(5);
setB.add(6);

function testLog(log:string,values:any){
    console.log(`${log}`,Array.from(values))
}
testLog('union',union(setA,setB));
testLog('interSection',interSection(setA,setB));
testLog('difference',difference(setA,setB));

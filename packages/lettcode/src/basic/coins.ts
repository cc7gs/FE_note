const coins=[10,1,6];
const cache={} as {[key:number]:number};
const makeChange=(value:number)=>{
    // if(value===0) return 0;
    if(cache[value]) return cache[value]
    let minCoins=-1;
    coins.forEach((coin,i)=>{
        if(value-coin>=0){
            let  curMinCoins=makeChange(value-coin);
            if(minCoins===-1||curMinCoins<minCoins){
                minCoins=curMinCoins
            }
        }
    });
    cache[value]=minCoins+1;
    return cache[value]
}
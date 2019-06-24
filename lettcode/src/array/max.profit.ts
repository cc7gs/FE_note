
/**
 * 121. 买卖股票的最佳时机
 *  * 输入: [7,1,5,3,6,4]
 * 输出: 5
 解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，
 最大利润 = 6-1 = 5 。注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格。
 */

export const maxprofit=(prices:number[]):number=>{
    let maxprice=0
    for(let i=0,len=prices.length;i<len;i++){
        for(let j=i,temp;j<len-1;j++){
            if(prices[j+1]>prices[i]){
                temp=prices[j+1]-prices[i];
                maxprice=temp>maxprice?temp:maxprice;
            }else{
                i=j;
                break;
            }
        }
    }
    return maxprice;
}

/**
 * 121. 买卖股票的最佳时机||
 * 
输入: [7,1,5,3,6,4]
输出: 7
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
     随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 
 */
/**
 * 
 * @param prices 股票
 * @return {number}
 */
export const maxprofit2=(prices:number[]):number=>{
    let maxprice=0;
    for(let i=0,len=prices.length;i<len;i++){
        for(let j=i;j<len-1;j++){
            if(prices[j+1]>prices[j]){
                maxprice+=prices[j+1]-prices[j];
                
            }else{
                break;
            }
            i=j;
        }
    }
    return maxprice;
}
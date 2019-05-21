/** 给定一副牌，每张牌上都写着一个整数。
 此时，你需要选定一个数字 X，使我们可以将整副牌按下述规则分成 1 组或更多组：
 每组都有 X 张牌
 组内所有的牌上都写着相同的整数
 仅当你可选的 X >= 2 时返回 true
 */
//示例
/**
* 输入：[1,2,3,4,4,3,2,1]
* 输出：true
* 解释：可行的分组是 [1,1]，[2,2]，[3,3]，[4,4]
*/
/**
 * 统计相同数出现次数,然后该次数和最小次数求最大公约数
 */
/**
 * @param {number[]} deck
 * @return {boolean}
 */
export default (deck: number[]) => {
  deck.sort((a, b) => a - b);
  let min = Number.MAX_SAFE_INTEGER;
  let arr: any = [];
  let result = true;
  if(deck.length<2) return false;
  for (let i = 0, temp = []; i <= deck.length-1; i++) {
    temp.push(deck[i]);
    for (let j = i + 1; j <= deck.length; j++) {
      if (deck[i] === deck[j]) {
        temp.push(deck[j]);
      } else {
        if (min > temp.length) {
          min = temp.length;
        }
        arr.push([].concat(temp as any));
        i = j;
        temp.length=0;
        break;
      }
    }
  }
  let gcd=(a:number,b:number)=>{
    while(b){
      let t=b;
      b=a%b;
      a=t;
    }
    return a;
  }
  return arr.every((item: Array<any>) => gcd(item.length,min)!==0);
  
}

/**
 * 假设你有一个很长的花坛，
 * 一部分地块种植了花，另一部分却没有。可是，花卉不能种植在相邻的地块上，它们会争夺水源，两者都会死去。
 */
/**
 * 输入: flowerbed = [1,0,0,0,1], n = 1
 * 输出: True
 * 输入: flowerbed = [0,0,1,0,1], n = 1
 * 输出: True
 */
export default (flowerbed: Array<Number>, n: number) => {
  for (let i = 0; i < flowerbed.length; i++) {
      if(!flowerbed[i]&&!flowerbed[i-1]&&!flowerbed[i+1]){
        n--;
        i++;
      }
    }
  return n<=0;
}

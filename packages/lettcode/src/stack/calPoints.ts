/**
 * 682. 棒球比赛
 * 你现在是棒球比赛记录员。
 * 给定一个字符串列表，每个字符串可以是以下四种类型之一：
 * 1. 整数（一轮的得分）：直接表示您在本轮中获得的积分数。
 * 2. "+"（一轮的得分）：表示本轮获得的得分是前两轮有效 回合得分的总和。
 * 3. "D"（一轮的得分）：表示本轮获得的得分是前一轮有效 回合得分的两倍。
 * 4. "C"（一个操作，这不是一个回合的分数）：表示您获得的最后一个有效 回合的分数是无效的，应该被移除。
 */
/**
 * 示例
 * 输入: ["5","2","C","D","+"]
 * 输出: 30
 * 解释: 
 * 第1轮：你可以得到5分。总和是：5。
 * 第2轮：你可以得到2分。总和是：7。
 * 操作1：第2轮的数据无效。总和是：5。
 * 第3轮：你可以得到10分（第2轮的数据已被删除）。总数是：15。
 * 第4轮：你可以得到5 + 10 = 15分。总数是：30。
 */

/**
 * @description 将输入的字符根据规则进行转换为分数，然后求总和
 * @param {string[]} arr
 * @return {number}
 */
export default (arr: Array<string>) => {
  let result: Array<number> = [];
  let prev1, prev2;
  arr.forEach(opt => {
    switch (opt) {
      case 'C':
        if (result.length) {
          result.pop();
        }
        break;
      case 'D':
        if (result.length) {
          prev1 = result.pop() || 0;
          result.push(prev1, (prev1 * 2));
        }
        break;
      case '+':
        if (result.length) {
          prev1 = result.pop() || 0;
          prev2 = result.pop() || 0;
          result.push(prev2, prev1, prev1 + prev2);
        }
        break;
      default:
        result.push(+opt);
        break;
    }
  });
  return result.reduce((total, num) => total + num)
}
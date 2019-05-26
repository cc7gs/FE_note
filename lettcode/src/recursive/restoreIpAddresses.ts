/**
 * 93. 复原IP地址
 * 给定一个只包含数字的字符串，复原它并返回所有可能的 IP 地址格式。
 * 输入: "25525511135"
 * 输出: ["255.255.11.135", "255.255.111.35"]
 */
/**
 * @description 采用深度遍历, 
 * @param {string} s
 * @return {string[]}
 */
export default (s: string) => {
  var result: Array<string> = [];
  dfs([], 0);
  function dfs(prevArr: Array<string>, idx: number) {

    if (prevArr.length === 4 && s.length === idx) {
      result.push(prevArr.join('.'));
      return;
    }
    if (prevArr.length === 4 || idx === s.length) {
      return;
    }

    for (let i = idx; i < s.length; i++) {
      //去除 1.01 这个不合法ip 必须是 1.1
      if(idx===i&&s[idx]==='0'){
        return;
      }
      let num = s.slice(idx, i + 1);
      if (parseInt(num) > 255) {
        return;
      }
      prevArr.push(num);
      dfs(prevArr, i + 1);
      prevArr.pop();
    }
  }

  return result;
}

/**
 * 93. 复原IP地址
 * 给定一个只包含数字的字符串，复原它并返回所有可能的 IP 地址格式。
 * 输入: "25525511135"
 * 输出: ["255.255.11.135", "255.255.111.35"]
 */
/**
 * @param {string} s
 * @return {string[]}
 */
export default (s:string)=>{
  var result:Array<string>=[];
  const dfs=(arr:Array<string>,res:string)=>{
    if(arr.length>0){
      dfs(arr.slice(1),res+arr[0]);
    }
  }

  return result;
}

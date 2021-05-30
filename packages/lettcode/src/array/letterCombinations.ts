/**
 * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。
 * 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
 */
export default (str: string) => {
  //记录键盘映射键
  const map = ['', "", 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
  //保存映射后的结果
  let code: Array<any> = [];
  str.split('').forEach(num => {
    if (map[+num]) {
      code.push(map[+num]);
    }
  });
  if(code.length===1) return code[0].split('');
  let comb = (arr: Array<any>) => {
    let temp = []; //记录组合的结果
    for (let i = 0; i <arr[0].length; i++) {
      for (let j = 0; j < arr[1].length; j++) {
        temp.push(`${arr[0][i]}${arr[1][j]}`)
      }
    }
    arr.splice(0, 2, temp);
    if (arr.length > 1) {
      comb(arr);
    } 
    return arr[0];
  }
  return comb(code);

}
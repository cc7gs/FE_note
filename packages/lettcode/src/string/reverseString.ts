/**
 * 344. 反转字符串
 * 编写一个函数，其作用是将输入的字符串反转过来。
 * 输入字符串以字符数组 char[] 的形式给出。
 * 不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。
 */
/**
 * 示例:
 * 输入：["h","e","l","l","o"]
 * 输出：["o","l","l","e","h"]
 */
/**
 * 方案一: reverse()
 */
/**
 * 方案二根据数组对称首位元素替换
 */
export default (arr: Array<string>) => {
  let len = arr.length;
  let flag = len % 2 === 0 ? len / 2 : Math.floor(len / 2) + 1;
  for (let i = 0, temp; i < flag; i++) {
    temp = arr[i];
    arr[i] = arr[len - 1 - i];
    arr[len - i - 1] = temp;
  }
  return arr;
}
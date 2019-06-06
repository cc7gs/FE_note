/**
 * 给定一个字符串，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序
 * input: "Let's take LeetCode contest"
 * output: "s'teL ekat edoCteeL tsetnoc"
 */
export default (str: string) => {
  return str.split(' ')
    .map(item => item.split('').reverse().join(''))
    .join(' ');
};

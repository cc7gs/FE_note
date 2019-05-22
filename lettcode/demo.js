
/**
 * n!=1*2*3*...*n
 */
function fact(n) {
  console.log('n', n);
  if (n === 1) {
    return 1;
  }
  return n * fact(n - 1)
}
// console.log(fact(3));


function restoreIpAddresses(s) {
  const res = [];
  dfs([], 0);
  return res;

  function dfs(prefix, idx) {
    if (prefix.length === 4) {
      console.log(prefix);
    }
    if (prefix.length === 4 && idx === s.length) {
      res.push(prefix.join('.'));
      return;
    }

    if (prefix.length === 4 || idx === s.length) {
      return;
    }

    for (let r = idx; r < s.length; r++) {
      if (r !== idx && s[idx] === '0') return;

      const num = parseInt(s.slice(idx, r + 1));
      if (num > 255) {
        return;
      }
      prefix.push(num);
      dfs(prefix, r + 1);
      prefix.pop();
    }
    console.log('end');
  }
}
// restoreIpAddresses('25525511135')
//通过深度遍历,将字符串分成四组，如果分组过后,数组下标不等于s.length 说明有剩余,则继续
function restore(s) {
  dfs([], 0);

  function dfs(preArr, idx) {

    if (preArr.length === 4 && idx === s.length) {
      // console.log(preArr);
    }
    if (preArr.length === 4) {
      console.log(preArr);
      return;
    }
    if( idx===s.length){
      console.log(preArr,'idx ==length');
      return;
    }
    for (let i = idx; i < s.length; i++) {
      const num = s.slice(idx, i + 1);
      preArr.push(num);
      dfs(preArr, i + 1);
      preArr.pop();
    }
  }
}
restore('25525511135');
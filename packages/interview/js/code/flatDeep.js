/**
 * 使用 flat函数
 */
function flatDeep(arr){
  console.log(arr);
  return arr.flat(Infinity)
};
/**
 * 利用 rduce 和 concat
 */
function flatDeep(arr){
return arr.reduce((acc,cur)=>Array.isArray(cur)?acc.concat(flatDeep(cur)):acc.concat(cur),[]);
}

console.log(flatDeep([1,2,[3,4]]));
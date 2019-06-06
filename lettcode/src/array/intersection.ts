/**
 * 349. 两个数组的交集
 * 给定两个数组，编写一个函数来计算它们的交集。
 */
//输入: nums1 = [1,2,2,1], nums2 = [2,2]
// 输出: [2]

//方法一  利用 indexOf
var intersection = function (nums1:Array<number>, nums2:Array<number>) {
 return Array.from(new Set(nums1.filter(item=>{
   if(nums2.indexOf(item)!==-1){
     return true
    } else{
      return false
    }})));
};

//方法二  利用 set
export default (nums1:Array<number>,nums2:Array<number>)=>{
  const s1=new Set(nums1);
  const s2=new Set(nums2);
  return Array.from(new Set([...s1].filter(num=>s2.has(num))))  
}
---
nav:
  path: /interview
  title: 面试汇总
group:
  title: js篇
  path: /js
---

# 统计 1- 10000所有0

> 描述: 统计 1 -10000中所有0 比如 100 有两个零，
> 该题主要考察对字符串api使用。

## 方法一 使用 Array.from 生成数字数组,在转换字符串匹配0

```javascript
 function getZeroCount(num){
    return Array.from({length:num},(v,i)=>i+1).join('').match(/0/g).length;
 }
 ```
 
## 方法二 通过 split(0)来划分数字，然后统计0格个数

 ```javascript
 function getZeroCount(num){
     return Array.from({length:num},(v,i)=>i+1).join('').split(0).length-1;
 }
 ```

## 方式三 通过fill与map生成数组 然后通过reduce结合 match 统计
 
 ```javascript
 function getZeroCount(num){
     return Array(num).fill('').map((v,i)=>i+1).reduce((count,num)=>{
         return count+(String(num).match(/0/g)||[]).length
     },0)
 }
 ```
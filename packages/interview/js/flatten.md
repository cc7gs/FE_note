---
nav:
  title: 面试汇总
  path: /interview
group:
  title: js篇
  path: /js
---

# 实现 flatten 函数的多种方法

> arr =[1,2,3,[7,9],[8,9,[10,1]]]

## flat函数本身

```js
arr.flat(Infinity)
```

## 数组字符串特性

```js
arr.join().split(',').map(Number)
```

## 迭代

```js
const flatten=arr=>{
	const result=[]
	while(arr.some(item=>Array.isArray(item))){
		result.concat(...arr)
	}
	return result
}
```

## es6+写法

```js
const flatten=arr=>arr.reduce((acc,cur)=>(
Array.isArray(cur)?
 [...acc,...flatten(cur)]
 :
 [...acc,cur])
,[])
```
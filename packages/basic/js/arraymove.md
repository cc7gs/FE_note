---
nav:
  title: 基础篇
  path: /basic
group:
  title: Js巩固篇
  path: /js
---

> [原仓库代码](https://github.com/sindresorhus/array-move)

# 数组中元素位置移动

```ts
const arrayMove = require('array-move');

const input = ['a', 'b', 'c'];

const array1 = arrayMove(input, 1, 2);
console.log(array1);
//=> ['a', 'c', 'b']

const array2 = arrayMove(input, -1, 0);
console.log(array2);
//=> ['c', 'a', 'b']

const array3 = arrayMove(input, -2, -3);
console.log(array3);
//=> ['b', 'a', 'c']
```

<code src="./demos/arrayMove.tsx" title="array-move">

简化版:

```ts
function arrayMove(array, from, to) {
  const newArray = [...array];
  const startIndex = from < 0 ? from + newArray.length : from;

  if (startIndex < 0 || startIndex >= newArray.length) return newArray;

  newArray.splice(
    to < 0 ? newArray.length + to : to,
    0,
    newArray.splice(from, 1)[0],
  );
  return newArray;
}
```

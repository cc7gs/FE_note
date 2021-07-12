---
nav:
  title: lettcode
  path: /lettcode
  order: 3
group:
  title: lettcode
  path: /lettcode
  order: 2
---
# 基础回顾

| # | title | 备注 |
| --- | --- | --- |
| Stack | [实现栈结构](https://github.com/cc7gs/FE_note/tree/master/packages/lettcode/src/stack/basic.ts) |  |
|  | [进制转化问题](https://github.com/cc7gs/FE_note/tree/master/packages/lettcode/src/basic/converter.ts) | stack 习题 |
| Queue | [实现队列结构](https://github.com/cc7gs/FE_note/tree/master/packages/lettcode/src/queue/basic.ts) |  |
|  | [回文检查器](https://github.com/cc7gs/FE_note/tree/master/packages/lettcode/src/basic/palindromeChecker.ts) | queue 习题 |
| Linked | [实现单向链表](https://github.com/cc7gs/FE_note/tree/master/packages/lettcode/src/linked/basic.ts) |  |
| Set | [构建数据集合](https://github.com/cc7gs/FE_note/tree/master/packages/lettcode/src/basic/set.ts) |  |
|  | [交集、并集、差运算](https://github.com/cc7gs/FE_note/tree/master/packages/lettcode/src/basic/set.basic.ts) | set 习题 |
| Dict | [构建字典类](https://github.com/cc7gs/FE_note/tree/master/packages/lettcode/src/basic/dictionary.ts) |  |
| HashTable | [构建散列表] |  |
|  | [] | HashTable 习题 |
| Sort | [基本排序算法](https://github.com/cc7gs/FE_note/tree/master/packages/lettcode/src/sort/basic.ts) |  |
|  | [字符组合](https://github.com/cc7gs/FE_note/tree/master/packages/lettcode/src/basic/combination.ts) |  |
| Tree | [二叉搜索树](https://github.com/cc7gs/FE_note/tree/master/packages/lettcode/src/tree/basic/index.ts) |  |
| 搜索问题 | [迷宫寻路](https://github.com/cc7gs/FE_note/tree/master/packages/lettcode/src/basic/backTracking.ts) |  |
|  | [N皇后问题](https://github.com/cc7gs/FE_note/tree/master/packages/lettcode/src/basic/queen.ts) | |
| Fibonacci | [实现与优化](https://github.com/cc7gs/FE_note/tree/master/packages/lettcode/src/basic/fibonacci.ts) |  |
|  | [AVL 树]() | Tree 习题 |
|  | [红黑树]() | Tree 习题 |
| Graph | [构建图类] |
|  | [] | Graph 习题 |

@TODO:

- [ ] HashTable
- [ ] AVL 树、红黑树
- [ ] Graph

## 概要知识
### 什么是数据结构?

> 数据结构是相互之间存在一种或多种特定关系的数据元素的集合 -- 《大话数据结构》

#### 分类

**逻辑结构**
 - 集合结构
 - 线性结构
 - 树结构
 - 图结构

**物理结构**
  - 顺序存储结构
  - 链接存储结构


### 算法

> 算法是解决特定问题求解步骤的描述,在计算机中表现为指令的有限序列,并且每条指令表示一个或多个操作 --《大话数据结构》

#### 特征
1. 输入输出
   - 具有零个或多个输入
   - 至少有一个或多个输出
2. 有穷性
   - 执行有限步骤后,自动结束不会出现无限循环，并且每一个步骤在可接受时间内完成 
3. 确定性
4. 可行性
  -  每一步都能通过有限次数完成
#### 算法时间复杂度
> 算法的时间复杂度也称算法的时间度量，记作: T(n)=O(f(n))。它表示随着问题规模n的增大,算法的执行时间的增长率与f(n)的增长率相同，称为算法的渐进时间复杂度，简称时间复杂度。其中f(n)是问题规模n的某个函数。

用大写`O()`来体现算法的时间复杂度的记法，我们称为大O记法。

|执行次数函数|阶|术语表示|
|---|---|---|
|10|O(1)|常数阶|
|$2n+1$|O(n)|线性阶|
|$3n^2$|O($n^2$)|平方阶|
|$5log_2n$|O($logn$)|对数阶|
|$2n+5log_2n$|O($nlogn$)|nlogn阶|
|$n^3+2$|O($n^3$)|立方阶|
|$2^n$|O($2^n$)|指数阶|

**时间复杂度所耗时时间大小排序**
$$O(1) < O(logn) < O(n)<O(nlogn)<O(n^2)<O(n^3)<O(2^n) $$

#### 算法的空间复杂度

> 存储算法所需要的空间,记作: S(n)=O(f(n)),其中n为问题规模,f(n)即为语句关于n所占存储空间的函数

## 线性表
> 零个或多个元素的有限序列
### 顺序存储结构
> 表示用一段地址连续的存储单元依次存储线性表的数据元素

即数组
|优点|缺点|
|---|---|
|方便存取|查找、删除需移动大量元素|
|无需存储元素之间逻辑而增加的额外空间|容易造成空间“碎片”|
### 链式存储结构
>元素在内存存储是非连续的,每个元素由一个存储元素本身节点和一个指向下一个元素的引用组成

## 栈与队列
## 树
## 图
## 查找与排序
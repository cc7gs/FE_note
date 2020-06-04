
# 介绍仓库
该仓库主要是学习数据结构的一些总结,习题来自[LettCode](https://leetcode-cn.com)

# 内容
## 基础篇

| # |  title | 备注 | 
| --- | ---- | ------- | 
| Stack | [实现栈结构](./src/stack/basic.ts) |  |
|  | [进制转化问题](./src/basic/converter.ts) | stack 习题 |
| Queue | [实现队列结构](./src/queue/basic.ts) |  |
|  | [回文检查器](./src/basic/palindromeChecker.ts) | queue 习题 |
| Linked    | [实现单向链表]   | |
|  | [] | Linked 习题 |
|  Set   | [构建数据集合]   | |
|  | [] | set 习题 |
|  Dict   | [构建字典类]   | |
|  | [] | Dict 习题 |
|  HashTable   | [构建散列表]   | |
|  | [] | HashTable 习题 |
|  Sort   | [基本排序算法](./src/sort/basic.ts)||
|  Tree   | [定义二叉树](./src/tree/basic.ts) |  |
|  | [] | Tree 习题 |
| Graph |[构建图类]|
|  | [] | Graph 习题 |

@TODO:
  
* [ ] Linked
* [ ] Set
* [ ] Dict
* [ ] HashTable
* [ ] Graph

## string
   
| #   | title                                                 | difficulty |
| --- | ----------------------------------------------------- | ---------- |
| 696 | [计数二进制字串](./src/string/countBinarySubstr.ts)   | Easy       |
| 344 | [反正字符串](./src/string/reverseString.ts)           | Easy       |
| 557 | [反正字符串的单词](./src/string/reverseWords.ts)      | Easy       |
| 415 | [字符串相加](./src/string/addString.ts)               | Easy       |
| 929 | [独特的电子邮件地址](./src/string/numUniqueEmails.ts) | Easy       |

## array

| #   | title                                                                    | difficulty |
| --- | ------------------------------------------------------------------------ | ---------- |
|     | [实现ArrayList](./src/array/basic.ts)                  |      |
| 17  | [电话号码的字母组合](./src/array/letterCombinations.ts)                  | Medium     |
| 914 | [卡牌分组](./src/array/hasGroupsSize.ts)                                 | Easy       |
| 605 | [种花问题](./src/array/canPlaceFlowers.ts)                               | Easy       |
| 349 | [两个数组的交集](./src/array/intersection.ts)                            | Easy       |
| 169 | [求众数](./src/array/majorityElement.ts)                                 | Easy       |
| 229 | [求众数](./src/array/majorityElement-two.ts)                             | Medium     |
| 561 | [数组拆分 \| ](./src/array/arrayPairSum.ts)                              | Easy       |
| 442 | [数组中重复数字](./src/array/findDuplicates.ts)                          | Medium     |
| 54  | [螺旋矩阵](./src/array/spiralOrder.ts)                                   | Medium     |
| 217 | [存在重复元素](./src/array/containsDuplicate.ts)                         | Easy       |
| 48  | [旋转图像](./src/array/rotate.image.ts)                                  | Medium     |
| 189 | [旋转数组](./src/array/totate.image.ts)                                  | Easy       |
| 118 | [杨辉三角](./src/array/triangle.generate.ts)                             | Easy       |
| 34  | [在排序数组中查找元素的第一个和最后一个位置](./src/array/searchRange.ts) | Easy       |
| 121  | [买卖股票的最佳时机](./src/array/max.profit.ts) | Easy       |
| 122  | [买卖股票的最佳时机2](./src/array/max.profit.ts) | Easy       |
| 860  | [柠檬水找零](./src/array/lemonade.ts) | Easy       |
| 62  | [不同路径](./src/array/unique.paths.ts) | medium       |
| 63  | [不同路径2](./src/array/unique.paths.ts) | medium       |


## sort
   
| #   | title                                                     | difficulty |
| --- | --------------------------------------------------------- | ---------- |
|     | [基本排序算法](./src/sort/basic.ts)                       | practice   |
|     | [堆排序](./src/heap/basic.ts)                             | practice   |
| 922 | [按奇偶排序数组 \|\|](./src/sort/sortArrayParityTwo.ts)   | Easy       |
| 922 | [按奇偶排序数组 ](./src/sort/sortArrayParity.ts)          | Easy       |
| 164 | [最大间距](./src/sort/maximumGap.ts)                      | Hard       |
| 215 | [数组中最大的第k个最大元素](./src/sort/findKthLargest.ts) | Medium     |
| 41  | [缺失的第一个正数](./src/sort/firstMissingPositive.ts)    | Hard       |

## 递归类

| #   | title                                               | difficulty |
| --- | --------------------------------------------------- | ---------- |
| 89  | [格雷编码](./src/recursive/grayCode.ts)             | Medium     |
| 93  | [复原IP地址](./src/recursive/restoreIpAddresses.ts) | Medium     |

## 链表

| #   | title                                             | difficulty |
| --- | ------------------------------------------------- | ---------- |
|     | [实现单向链表](./src/linked/basic.ts)             |            |
|     | [单链表快速排序](./src/linked/quick.sort.link.ts) |
| 237 | [删除链表中的节点](./src/linked/)                 | Easy       |

## 队列

| #   | title                                             | difficulty |
| --- | ------------------------------------------------- | ---------- |
| 622 | [循环队列](./src/queue/circular.queue.ts)         | Medium     |
| 621 | [任务调度器](./src/queue/least.interval.queue.ts) | Medium     |

# 树
| #   | title                                 | difficulty |
| --- | ------------------------------------- | ---------- |
|     | [定义二叉树](./src/tree/basic.ts)     |            |
|     | [定义搜索树](./src/tree/basic.ts)     |            |
| 101 | [对称二叉树](./src/tree/basic.ts)     | Easy       |
| 98  | [搜素二叉树](./src/tree/basic.ts)     | Medium     |
| 617 | [合并二叉树](./src/tree/mergeTree.ts) | Easy       |
# 堆
| #   | title                             | difficulty |
| --- | --------------------------------- | ---------- |
|     | [创建最大堆](./src/heap/basic.ts) |            |

# 运行须知
练习采用ts环境去运行编译,测试文件在test目录夹下
[可以参考该问配置环境](https://tasaid.com/blog/2018122819513079.html)

测试
> npm run test

  
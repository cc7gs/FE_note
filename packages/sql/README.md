---
title: 数据库
nav:
  title: 基础篇
  path: /basic
  order: 1
group:
  title: node提升篇
  path: /node-enhance
  order: 2
---
  # 关系型数据库与非关系型数据库
  - mysql、oracle、sqlServer为一组关系模型组织的数据库(方便查询、不便于扩展)
  - NoSql、mongo、redis等为非关系型数据库
  ## mongo
    - 分布式、文档类型。存储复杂数据结果（值为传统对象类型 key=>value (BSON)）
    - 性能高，不需要sql层解析（分析过程、操作过程），数据之间不耦合。
    - 不适合查询
  ### 操作
  ## 常用命令行
    1. 查看版本号
    ```bash
    $ mongo --version
    ```
    1. 打开客户端
    ```bash 
    $ mongo
    ```
    1. 显示所有数据库
    ```bash
    $ show dbs
    ```
    1. 创建数据库
    ```bash
    # 使用blog 数据库
    $ use blog
    ```
    *: 一下操作都是在 blog 数据库中操作

    1. 显示所有集合
    ```bash
    # 显示该库下的所有集合
    $ show collections
    ```
    1. 创建集合
    ```bash
    $ db.user.insert({name:'cc',age:20})
    ```
    1. 集合中查询数据
    ```bash
    # 当不传入条件时则查询所有
    $ db.user.find()

    # 条件查询
    $ db.user.find({name:'cc'})
    ```
    1. 删除数据
    ```bash
    $ db.user.deleteOne({name:'cc'})
    ```
    1. 权限登录
    ```
    $ db.auth('账号',‘密码’)
    ```

## mongoose 总结

```javascript
const mongoose = require('mongoose');
//1 连接数据库
const conn=mongoose.connect('mongodb://localhost/cms');

/**
 * 有密码的连接方式
 * 数据库名 test
 * 用户名 admin
 * 密码  123456
 * */
// mongoose.connect('mongodb://admin:123456@localhost:27017/test');

//2. 定义数据类型
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
});
//3. 创建模型
const User = mongoose.model('User', userSchema);

```
### 插入
```js
User.create({name:'cc',age:20}).then(doc=>{
  console.log(doc) 
})
```
### 查询
```js
(async ()=>{
  const r=await User.findOne({name:'cc'})
})() 
```
如果显示指定字段需，参数指定
```
User.findOne({name:'cc'},{name:1,age:1 })
```
### 修改
```js 
(async ()=>{
  const r=await User.updateOne({name:'cc'},{name:'chen'})
})()

// 多条件查询修改 
const r=await User.updateOne({$or:[{name:'cc'},{age:20}]},{$inc:{age:1}})

```
### 删除
```js
(async ()=>{
 await User.deleteOne({name:'cc'})
})()
```

  # demo
  - [mongoDB 增删改查](./demo1_CURD/)
  - [课程表案例](./demo2_course/)
  - [nodejs 操作redis](./demo3_redis/)
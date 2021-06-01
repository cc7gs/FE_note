---
title: MongoDB
nav:
  title: node基础篇
  path: /node-basic
group:
  title: SQL
  path: /sql
---

# MongoDB vs mysql

| MongoDB    | mysql    | 名称   |
| ---------- | -------- | ------ |
| document   | record   | 记录   |
| collection | table    | 表     |
| database   | database | 数据库 |

## Mongoose 介绍

是 mongoose 的一个对象模型库,封装了 mongoDB 对文档的一些增删改查等常用方法,让 nodejs 操作 mongoDB 数据库变得更容易 **Schema** 是一种文件形式存储的数据库模型骨架,不具备数据库的操作能力,即定义数据类型例如:

```javascript
var PersonSchema=new mongoose.Schema({
  name:String;
})
```

**Model** 由 Schema 构造生成的模型,具有抽象属性和行为的数据库操作

```javascript
var PersonModel = db.model('person', PersonSchema);
```

**entity** 由 Model 创造的实体，他的操作也会影响数据库,可以操作数据库 CRUD

```javascript
var personEntity = new PersonModel({
  name: 'kk',
});
```

[原文传送门](https://cnodejs.org/topic/504b4924e2b84515770103dd)

### node 连接 mongoose

```javascript
const mongoose = require('mongoose');
//1 连接数据库
mongoose.connect('mongodb://localhost/cms');
var db = mongoose.connection;
/**
 * 有密码的连接方式
 * 数据库名 test
 * 用户名 admin
 * 密码  123456
 * */
// mongoose.connect('mongodb://admin:123456@localhost:27017/test');

//2. 定义数据类型
var userSchema = mongoose.Schema({
  name: String,
  age: Number,
});
//3. 创建模型
var User = mongoose.model('User', userSchema);
```

### 简单 crud

```javascript
//4. 查询user表中所有数据
User.find({}, (err, doc) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(doc);
});

//5. 添加数据
var u = new User({
  name: 'cc',
  age: 20,
});
u.save((err) => {
  if (err) {
    console.log('添加失败');
    return;
  }
  console.log('添加成功');
});

//6. 更新数据
User.updateOne(
  { _id: '5c4e9fc8b60c4b4e543bd1bc' },
  { name: 'wcc' },
  (error, doc) => {
    if (error) {
      return console.log('update error');
    }
    console.log(doc);
  },
);
//7. 删除数据
User.deleteOne({ _id: '5c4ea2289012181bec2d71ac' }, (error, result) => {
  if (error) {
    console.log('delete error');
    return;
  }
  console.log('删除成功', result);
});
```

### 补充

```javascript
var userSchema = mongoose.Schema({
  name: {
    type: String, //指定类型
    trim: true, //去掉两边空格
  },
  sn: {
    type: String,
    index: true, //创建索引 或者使用 unique
  },
  age: Number,
  redirect: {
    type: String,
    set(parmas) {
      //自定义修饰符,下面代码是对用户输入的网址进行判断，如何没有输入http 或者 https 则进行补全
      if (!parmas) return '';
      if (parmas.indexOf('http://') || parmas.indexOf('https://')) {
        //如果不是http或者https开头则走下面的逻辑
        return 'http://' + parmas;
      } else {
        return parmas;
      }
    },
  },
});
```

## 数据校验

**小结:**

- require 表示该必须传入
- max 与 min 只能用在 number 类型中
- 枚举类型只能用在 string 类型中

```javascript
var userSchema = mongoose.Schema({
  name: {
    type: String, //指定类型
    require: true,
  },
  sn: {
    type: String,
    index: true, //创建索引 或者使用 unique
    maxlength: 20, //只能用于string类型
    minlength: 10,
  },
  age: {
    type: Number, //min与max必须在Number中
    min: 0,
    max: 130,
  },
  redirect: {
    type: String,
  },
  status: {
    type: String,
    default: '1',
    enum: ['0', '1'], //status 值必须在枚举值中并且枚举类型中type必须是String
  },
});
```

## 数据库的导入和导出

```javascript
//导入
// -h 主机(本机 localhost)
// -d 表示数据库名
// -o 表示目录
mongodump -h dbhost -d dbname -o dbdirectory
// mongodump -h localhost -d cms -o C:\Users\lanyee\Desktop

//导出
mongorestore -h dbhost -d dbname <path>

```

# mongoDB 配置 server（window）

- 选择一个磁盘创建数据库和日志的存储例如:

```
 E:\mongodb\data\db
 E:\mongodb\data\log
```

- 创建配置文件 比如 c:\Program Files\MongoDB\Server\3.4\mongod.cfg

```
systemLog:
    destination: file
    path: E:\mongodb\data\log\mongod.log
storage:
    dbPath:  E:\mongodb\data\db
```

- 启动配置文件 (必须管理员身份)

```
> mongod --config "C:\Program Files\MongoDB\Server\3.4\mongod.cfg" --install
```

我将该目录已配置到全局变量中，若没有配置则进入 mongoDB 安装目录的 bin 目录再启动

1. 启动 MongoDB server
   > net start MongoDB
2. 停止 MongoDB server
   > net stop MongoDB
3. 删除 MongoDB server

> "C:\ProgramFiles\MongoDB\Server\3.4\bin\mongod.exe" --remove

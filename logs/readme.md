# 日志篇

## nodejs 记录日志

> npm install log4js
### 基本调用
```javascript
const log4js=require('log4js');
const logger=log4js.getLogger();  //获取日志记录器 默认输出console中
logger.level='debug';  //设置日志级别
logger.debug('debug messages');
```
### 日志等级
在log4js中日志分为7个等级分别由低到高排序如下:
- trace: 用于标记方法被调用,级别最低
- debug: 记录调试信息,方便调试时使用
- info: 记录非调试的信息
- warn: 记录警告
- error: 记录错误信息,但错误信息不会导致服务不可用
- fatal:记录严重错误,导致服务不可用

### 将日志记录到文件中
```javascript
const log4js = require('log4js');
log4js.configure({
  appenders: {
    test: {   //指定记录的日志分类名为 test
      type: 'file',
      filename: 'testLog.log' //指定日志输出的文件名为 testLog.log
    }
  },
  categories: {   //日志的默认配置项
    default: {
      appenders: ['test'],  //如果log4js.getLogger没有设置则采用该信息
      level: 'debug' //记录 日志级别大于等于debug的日志信息
    },
  }
})

const logger = log4js.getLogger('cheese');  //获取日志记录器 默认输出console中
logger.level = 'debug';  //设置日志级别
logger.debug('debug messages');
```
### 日志按天切割存储

```javascript
//和上面代码一致
 appenders: {
    test: {   //指定记录的日志分类名为 test
      type: 'file',
      filename: 'logs/task', //指定日志输出文件名为 logs/task-xxx.log
      pattern:'-yyyy-MM-dd.log',
      alwaysIncludePattern:true,
    }
  },
```


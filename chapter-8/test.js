const log4js = require('log4js');
log4js.configure({
  appenders: {
    test: {   //指定记录的日志分类名为 test
      type: 'file',
      filename: 'logs/task', //指定日志输出文件名为 logs/task-xxx.log
      pattern:'-yyyy-MM-dd.log',
      alwaysIncludePattern:true,
    }
  },
  categories: {   //日志的默认配置项
    default: {
      appenders: ['test'],  //如果log4js.getLogger没有设置则采用该信息
      level: 'debug'
    },
  }
})

const logger = log4js.getLogger('cheese');  //获取日志记录器 默认输出console中
logger.level = 'debug';  //设置日志级别
logger.debug('debug messages');
logger.warn('warn testing');
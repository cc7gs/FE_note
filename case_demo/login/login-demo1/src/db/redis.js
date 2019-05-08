const redis = require('redis');
const { REDIS_CONF } = require('../config/db')
//创建客户端
let redisClient;
module.exports = {
  connectRedis: () => {
    redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
    redisClient.on('error', err => {
      console.error(err);
    });
  },
  set: (key, val) => {
    if (typeof val === 'object') {
      val = JSON.stringify(val);
    }
    redisClient.set(key, val, redis.print);
  },
  get: (key) => {
    return new Promise((resolve, reject) => {
      redisClient.get(key, (err, val) => {
        if (err) {
          reject(err)
          return;
        }
        if (val === null) {
          resolve(null)
          return;
        }
        //转换json格式
        try {
          resolve(JSON.parse(val))
        } catch (error) {
          console.log(error, 'json 转换失败');
          resolve(val)
        }
      })
    })
  }
}
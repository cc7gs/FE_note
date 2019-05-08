const env=process.env.NODE_ENV; //获取环境参数
let MONGODB_CONF,REDIS_CONF;

if(env==='develop'){
  MONGODB_CONF={
    host:"localhost",
    database:'test'
  }
  REDIS_CONF={
    port:6379,
    host:'localhost'
  }
}
module.exports={
  MONGODB_CONF,
  REDIS_CONF
}

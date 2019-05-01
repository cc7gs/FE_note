const http = require('http');
//session 存储
// const serverHandle = require('../src/app');
//redis 存储session
const serverHandle=require('../src/app_redis');
const connectMongoDB = require('../src/db/mongoDB')
const { connectRedis } = require('../src/db/redis')
const host = 3001;
const httpServer = http.createServer(serverHandle);
//连接mongoDB
connectMongoDB();
//连接 redis
connectRedis();
httpServer.listen(host, () => {
  console.log(`server at port ${host}`)
});

const Koa = require('koa');
const app = new Koa();
const session = require('koa-session');
const redis = require('redis');
const client = redis.createClient(6379, '127.0.0.1'); //连接本机Redis服务
const secretSessionKeys = 'secret_session';
const { promisify } = require('util');
const hgetllAsync = promisify(client.hgetall).bind(client);

app.keys = [secretSessionKeys];
const store = {
  get: async (key,maxAge)=>{
    const result= await hgetllAsync(key);
  },
  set: (key, sess, maxAge) => {  //存储Session
    client.hmset(key, sess);
  },
  destroy: (key) => {  //销毁
    client.hdel(key);
  }
}
const CONFIG = {
  key: 'session_redis',
  maxAge: 3600000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  store
};
app.use(session(CONFIG, app)); //使用session中间件
app.use(ctx => {
  if (ctx.path === '/favicon.ico') return;
  let n = ctx.session.views || 0;
  ctx.session.views = ++n;
  ctx.body = `${n} views`;
})
app.listen(3000, () => {
  console.log('app listen at 3000');
})
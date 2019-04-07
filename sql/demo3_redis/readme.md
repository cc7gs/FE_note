# redis介绍
- redis可用作数据库、高速缓存和消息队列代理,并非常适合处理短时间内被高频访问但又不需要长期访问的简单数据存储。
- redis是既可以基于内存也可以持久化的日志型Key-Value数据库,并支持多种语言的API,它通常被称为数据结构服务器。

## 安装redis（windows）
[gitHub](https://github.com/MicrosoftArchive/redis/releases)

具体步骤参考下面链接:
[参考原文](https://www.cnblogs.com/cang12138/p/8880776.html)

**常用命令:**
卸载服务：redis-server --service-uninstall
开启服务：redis-server --service-start
停止服务：redis-server --service-stop
启动Redis命令行工具: redis-cli

**连接远程Redis服务**
> redis-cli -h host -p port -a password
host是主机名,port 是端口号,password是远程服务器密码
## node中使用
> npm i redis --save

```javascript
const redis = require('redis');
//连接本地Redis服务
const client = redis.createClient(6379, '127.0.0.1');
//操作redis
//1. 字符串
client.set('name', 'cc', redis.print); //redis.print 打印设置的数据结果
client.get('name', (err, value) => {
  if (err) throw err;
  console.log('Name:', value);
});
//2.哈希值(Hash)
client.hmset('person', { //存储一个对象
  'name': 'cc',
  'age': 24
});
client.hgetall('person', (err, obj) => {
  if (err) throw err;
  console.log('通过Hash存储:', obj);
});

//3. 集合(Set)
client.sadd('address', '上海', redis.print);
client.sadd('address', '北京', redis.print);
client.sadd('address', '西安', redis.print);
client.sadd('address', '广州', redis.print);
//获取集合的值
client.smembers('address', (err, members) => {
  if (err) throw err;
  console.log('获取集合的值:', members);
})
//4. List  
//lpush向列表中添加值
// lrange 获取参数 start-end范围内的列表元素

client.lpush('animal', 'dog', redis.print);
client.lpush('animal', 'cat', redis.print);
client.lpush('animal', 'pig', redis.print);
client.lrange('animal', 0, 1, (err, items) => {
  if (err) throw err;
  items.forEach((item, i) => {
    console.log(`获取List内容、i-item:${i}-${item}`);
  })
});

client.on('error', err => {
  console.log('redis clinet Error', err);
})
```

# Session
它是用于控制网络会话的,如用户的登录信息、购物车中商品等。Session中的数据保存在服务器端,在服务端有很多存储方式,它可以保存在内存、(Redis、MongoDB)等数据库中、文件中。
在客户端通过Cookie来保存Session的一个唯一标识,使用Cookie的原因是每个HTTP请求头都可以带上Cookie信息,并可以 **设置HtppOnly=true**防止客户端篡改Cookie.
## node中应用
> npm install koa-session

```javascript
const Koa=require('koa');
const app=new Koa();
const session=require('koa-session');
const secretSessionKey='secert_key';
app.keys=[secretSessionKey]; //设置签名Cookie秘钥
const CONFIG={
  key:'myAppSessKey', //Cookie中的key
  maxAge:'3600000', //失效时间 单位ms
  overwrite:true,   //是否可以覆盖
  httpOnly:true, //是否禁止客户端篡改
  signed:true  //签名是否开启
}
app.use(session(CONFIG,app)); //加载session 中间件
app.use(async ctx=>{
  if(ctx.path==='/favicon.ico') return;
  console.log(ctx.session,'views')
  let n=ctx.session.views || 0;
  ctx.session.views=++n;
  ctx.body=`${n} 网站加载次数 views`;
})
app.listen(3000,()=>{
  console.log('app listen at port 3000');
})
```
## redis存储Session
```javascript
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
```
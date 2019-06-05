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
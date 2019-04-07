const mongoose = require('mongoose');
const Koa = require('koa');
const addFun =require('./addData')
const findFun =require('./findData')
const updateFun =require('./changeData');

//1.连接数据库
mongoose.connect('mongodb://localhost/test', {
  user: 'wcc',
  pass: 'wcc',
  poolSize: 10
});

//5. 定义 Schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    index: true, //对该字段启动索引
    unique: true // 该字段的约束为唯一
  }
})
//6. 得到模型
const Category = mongoose.model('Category', categorySchema);

//添加数据
// addFun(Category);
updateFun(Category);
findFun(Category);

//2.获取连接对象
const db = mongoose.connection;
//3. 连接成功
db.on('error', err => {
  console.error(err);
})
//4. 连接失败
db.on('open', () => {
  console.log('success connect db');

})
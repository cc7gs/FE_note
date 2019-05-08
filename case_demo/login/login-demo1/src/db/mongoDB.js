const mongoose = require('mongoose');
const initUser = require('./initUser');
const { MONGODB_CONF } = require('../config/db')
const mongoDB = `mongodb://${MONGODB_CONF.host}/${MONGODB_CONF.database}`
const connectMongoDB = () => {
  mongoose.connect(mongoDB);
  const db = mongoose.connection;
  db.on('connected', () => {
    console.log('Mongoose connection open on' + mongoDB);
    //初始化用户
    initUser();
  })
  db.on('error', (err) => {
    console.error('mongoDB 连接错误', err);
  })
  db.on('disconnected', () => {
    console.log('Mongoose connection disconnected');
  });
  return mongoose
}
module.exports = connectMongoDB
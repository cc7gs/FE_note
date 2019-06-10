const mongoose = require('mongoose');
const { Schema } = mongoose;
//创建数据模型
const userShema = new Schema({
  password: String,
  username: String
});
const user = mongoose.model('User', userShema);
module.exports = user;
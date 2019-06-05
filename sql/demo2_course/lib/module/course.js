const mongoose = require('../conn').mongoose;

const timeRangeSchema = new mongoose.Schema({ //定义子模型
  hour: {  //定义小时
    type: Number,
    max: 24,
    min: 8
  },
  minute: { //分
    type: Number,
    max: 59,
    min: 0
  },
  time: { //定义计算类型 获取
    type: Number,
    get() {
      return this.get('hour') * 100 + this.get('minute')
    }
  }
});
const courseSchema = new mongoose.Schema({  //定义课程模型
  name: String,
  startTime: timeRangeSchema,
  endTime: timeRangeSchema,
  weekday: {
    type: Number,
    max: 6,
    min: 0
  }
});
const Course = mongoose.model('Course', courseSchema);
module.exports = Course

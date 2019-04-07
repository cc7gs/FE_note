const Course = require('./module/course');
async function getCourseList() {  //获取所以课程表
  return await Course.find().sort({   //按照开始时间升序排序
    'StartTime.time': 1
  });
};
async function getCourseById(id) { //通过id查询数据
  return await Course.findById(id);
}
async function getCourseByTime(start, end, weekday) {

  return await Course.find({
    weekday,
  }).where('startTime.time').gte(start.hour * 100 + start.minute)
    .where('endTime.time').lte(end.hour * 100 + end.minute);
}
async function addCourse(course) {  //添加课程
  const { name, weekday, startTime, endTime } = course;
  const item = await getCourseByTime(startTime, endTime, weekday);
  // console.log('===============getCourseTime=====================');
  // console.log(item);
  // console.log('====================================');
  if (item.length!==0) {
    throw new Error('当前课程时间段已经安排了课程');
  }
  //判断添加数据的课程时间如何冲突

  return await Course.create(course);

}
async function updateCourse(id, course) {
  return await Course.update({
    _id: id
  }, course);
};
async function removeCourse(id) {
  return await Course.remove({
    _id: id
  })
}

module.exports = {
  getCourseList,
  addCourse,
  getCourseById,
  updateCourse,
  removeCourse,
}
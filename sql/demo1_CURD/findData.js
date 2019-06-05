//查询数据的方法
module.exports = (Category) => {
  //方法一 通过find方法
  Category.find({
    name: '吴晨'
  }, (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log(res,'find method 1');
    }
  });
  //方式二 支持Promise 写法
  Category.find({})
    .then(res => {
      console.log(res,'find method 2');
    })
    .catch(err => {
      console.error(err);
    })

}
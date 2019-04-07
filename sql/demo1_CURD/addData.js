/**
* 增加数据的方法
* 1. 通过模型实例化对象来新增
* 2. 通过模型Create方法新增方
*/

module.exports=(Category)=>{

//方法一
const category = new Category({
  name: '韦桂思',
  description: 'this is my girl friend'
});

category.save(error => {
  if (error) {
    console.error(error);
    return;
  }
  console.log('Saved your data');
});

//方法二
// Category.create({
//   name: '吴晨',
//   description: 'this is my name'
// }, (error, category) => {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log(category);
//   }
// });


}


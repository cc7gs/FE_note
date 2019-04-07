//删除和修改数据
module.exports=(Category)=>{
    //删除数据
    Category.remove({
      name:'test'
    })
    .then((res)=>{
        console.log(res,'delete');
        
    });

    //更新数据
    Category.update({
      name:'test'  //筛选需要更新的数据
    },{
      name:'newTest',  //更新后的数据
      description:'test1'
    })
    .then(res=>{
      console.log(res,'update');
    })
}
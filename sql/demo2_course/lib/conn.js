const mongoose=require('mongoose');

async function connect(){
  await mongoose.connect('mongodb://localhost/course',{
    user:'cc',
    pass:'123'
  })
}
async function close(){
  await mongoose.connection.close();
}
module.exports={
  mongoose,
  connect,
  close
}
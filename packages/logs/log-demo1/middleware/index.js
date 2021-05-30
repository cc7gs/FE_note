const miLog=require('mid-log');
module.exports=(app)=>{
  app.use(miLog());
  
}
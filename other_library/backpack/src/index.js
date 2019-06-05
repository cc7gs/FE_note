const Koa=require('koa');
const app=new Koa();

app.use(async(ctx,next)=>{
  try {
    const something=await Promise.resolve({name:'cc'});
    return ctx.body={...something,hello:'word'};
  } catch (e) {
    return ctx.body={error:e.message}
  }
})
const port=process.env.PORT || 3000;
console.log(process.env.PORT,'port env');
app.listen(port,(err)=>{
  if(err){
    console.log(error);
  }
  if(__DEV__){
    console.log('in development');
  }
  console.log(`listen on port ${port}`)
})
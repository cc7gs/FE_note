const Koa=require('koa');
const app=new Koa();
const router=require('koa-router')();
const middleware=require('./middleware');
middleware(app);
router.get('/',(ctx)=>{
  ctx.body='hello world';
})
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000,()=>{
  console.log('sever is running at port 3000 ');
})
const Koa=require('koa');
const bodyParser=require('koa-bodyparser');
const app=new Koa();
app.use(bodyParser());
const router=require('./router');
router(app);

app.listen(3000,()=>{
  console.log('server is running at http://localhost:3000');
})

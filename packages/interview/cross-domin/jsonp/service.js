const Koa=require('koa');
const Router = require('@koa/router');

var router = new Router();
const app=new Koa();

router.get('/getData',async ctx=>{
  const {say,cb}=ctx.query;
  console.log(ctx.query,'xxxx',ctx.querystring)
  ctx.body=`${cb}('${say}')`
})

app.use(router.routes())

app.listen(3000)
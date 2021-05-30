const Koa=require('koa');
const Router = require('@koa/router');

var router = new Router();
const app=new Koa();

const whiteList=['http://127.0.0.1:5500']
app.use((async (ctx,next)=>{
  console.log(ctx.method);
  
  if(whiteList.includes(ctx.get('origin'))){
    ctx.set({
      'Access-Control-Allow-Origin':ctx.get('origin'),
      'Access-Control-Allow-Headers':'name',
      'Access-Control-Max-Age':30,
      'Access-Control-Allow-Credentials':true,
      'Access-Control-Allow-Methods':'PUT'
    });
    if(ctx.method.toLowerCase()==='options'){
      ctx.status=200;
      return;
    }
  }
  await next();
}));

router.post('/getData',async ctx=>{
  ctx.body={data:{name:'cc'},code:200}
});

router.put('/getData',async ctx=>{
  ctx.body={data:{name:'cc'},code:200}
});

router.get('/getData',async ctx=>{
  ctx.body={data:{name:'cc'},code:200}
})

app.use(router.routes())

app.listen(3000,()=>{
  console.log('app start at 3000 port')
})
const Koa=require('koa');
const app=new Koa();
const session=require('koa-session');
const secretSessionKey='secert_key';
app.keys=[secretSessionKey]; //设置签名Cookie秘钥
const CONFIG={
  key:'myAppSessKey', //Cookie中的key
  maxAge:'3600000', //失效时间 单位ms
  overwrite:true,   //是否可以覆盖
  httpOnly:true, //是否禁止客户端篡改
  signed:true  //签名是否开启
}
app.use(session(CONFIG,app)); //加载session 中间件
app.use(async ctx=>{
  if(ctx.path==='/favicon.ico') return;
  console.log(ctx.session,'views')
  let n=ctx.session.views || 0;
  ctx.session.views=++n;
  ctx.body=`${n} 网站加载次数 views`;
})
app.listen(3000,()=>{
  console.log('app listen at port 3000');
})
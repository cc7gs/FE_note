const Koa=require('koa');
const serve = require('koa-static');
const path=require('path');
const app=new Koa();

app.use(serve(path.join(__dirname)));
app.listen(4000);

console.log('serve start at 4000 port')
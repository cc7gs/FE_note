
const koa = require('koa');
const logger=require('koa-logger');
const cors = require('koa-cors');
const Body = require('koa-body');
const Router = require('koa-router');
const Static = require('koa-static');
const fs = require('fs');
const path=require('path');
const os=require('os');
const upload =require('./upload')
const app = new koa();
const router = new Router();
app.use(logger());
// app.use(cors());
app.use(Body({ multipart: true, formidable: { maxFields: 20 * 1024 * 1024 } }));
app.use(Static(path.join(__dirname + '/public')
));

upload(router);

app.use(router.routes())
.use(router.allowedMethods());
app.listen(3001, () => {
  console.log('listen in port 3001');
})




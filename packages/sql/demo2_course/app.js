const Koa = require('koa');
const Router = require('koa-router');
//实例应用
const app = new Koa();
const router = new Router();
const { getCourseList,
  addCourse,
  getCourseById,
  updateCourse,
  removeCourse,
} = require('./lib')
const { connect, close } = require('./lib/conn')
const bodyParser = require('koa-bodyparser');

const JOSN_MIME = 'application/json';
router.get('/course', async ctx => {   //获取所有课程数据
  ctx.type = JOSN_MIME;
  ctx.body = {
    status: 0,
    data: await getCourseList()
  }
});
router.get('/course/:id', async ctx => {  //根据ID查询数据
  ctx.type = JOSN_MIME;
  ctx.body = {
    status: 0,
    data: await getCourseById(ctx.params.id)
  }
});
router.post('/course', async ctx => {   //添加课程数据
  ctx.type = JOSN_MIME;
  await addCourse(ctx.request.body);
  ctx.body = {
    status: 0,
  }
});
router.put('/course/:id', async ctx => {  //更新数据
  await updateCourse(ctx.params.id,ctx.request.body);

  ctx.body = {
    status: 0
  }
});
router.delete('/course/:id', async ctx => {
  await removeCourse(ctx.params.id);
  ctx.body = {
    status: 0
  }
});

app.use(bodyParser());
app.use(async (ctx,next)=>{
  try {
    await next();
  } catch (error) {
    ctx.body={
      status:-1,
      message:error.message
    }
  }
})
app.use(async (ctx, next) => {
  await connect();
  await next();
  await close();
});

app.use(router.routes());
app.use(router.allowedMethods());
//监听端口
app.listen(3000, () => {
  console.log('\033[;34m app listen at port 3000');
})
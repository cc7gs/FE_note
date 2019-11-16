import * as  Koa from 'koa'
import * as  Router from 'koa-router'
import * as  fs from 'fs'
import { upload } from './src/handle_upload'
const app = new Koa();
const router = new Router();

router.get('/', async ctx => {
  ctx.response.type = 'html'
  ctx.body = await fs.readFileSync(__dirname + '/fileupload.html', 'utf-8');
});
router.post('/upload', async ctx => {
  console.log('xxx');
  try {
    const res:any = await upload(ctx);
    console.log(res);
    ctx.body = { message: '上传成功', result: `http://img.store.ccwgs.top/${res.key}` };
  } catch (error) {
    ctx.body = { message: '上传失败', error };
  }
})
app.use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => {
  console.log('listen at port 3000');
})

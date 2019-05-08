"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const Router = require("koa-router");
const fs = require("fs");
const handle_upload_1 = require("./src/handle_upload");
const app = new Koa();
const router = new Router();
router.get('/', (ctx) => __awaiter(this, void 0, void 0, function* () {
    ctx.response.type = 'html';
    ctx.body = yield fs.readFileSync(__dirname + '/fileupload.html', 'utf-8');
}));
router.post('/upload', (ctx) => __awaiter(this, void 0, void 0, function* () {
    console.log('xxx');
    try {
        const res = yield handle_upload_1.upload(ctx);
        console.log(res);
        ctx.body = { message: '上传成功', result: `http://img.store.ccwgs.top/${res.key}` };
    }
    catch (error) {
        ctx.body = { message: '上传失败', error };
    }
}));
app.use(router.routes())
    .use(router.allowedMethods());
app.listen(3000, () => {
    console.log('listen at port 3000');
});

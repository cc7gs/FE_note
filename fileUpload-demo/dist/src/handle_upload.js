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
const path = require("path");
const upload_1 = require("./upload");
/**
 * 上传海报
 */
exports.upload = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const serverPath = path.join(__dirname, '../uploadtemp/');
    console.log(serverPath, 'serverPath');
    // 获取上传图片
    const result = yield upload_1.uploadFile(ctx, {
        fileType: 'poster',
        path: serverPath
    });
    const imgPath = path.join(serverPath, result.imgPath);
    // 上传到七牛
    console.log(imgPath, result, 'xxxx');
    const qiniu = yield upload_1.upToQiniu(imgPath, result.imgKey);
    // 上传到七牛之后 删除原来的缓存文件
    upload_1.removeTemFile(imgPath);
    return qiniu;
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const Busboy = require("busboy");
const qiniu = require("qiniu");
const myConfig = require("./config");
/**
 * 同步创建文件目录
 * @param {*} dirname 目录绝对地址
 */
const mkdirsSync = (dirname) => {
    if (fs.existsSync(dirname)) {
        return true;
    }
    else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
    return false;
};
//获取上传文件的后缀名
function getSuffix(fileName) {
    return fileName.split('.').pop();
}
// 重命名
function Rename(fileName) {
    return Math.random().toString(32).substr(4) + '.' + getSuffix(fileName);
}
// 删除文件
exports.removeTemFile = (path) => {
    fs.unlink(path, (err) => {
        if (err) {
            throw err;
        }
    });
};
// 上传到七牛
exports.upToQiniu = (filePath, key) => {
    const accessKey = myConfig.QINIU.accessKey;
    const secretKey = myConfig.QINIU.secretKey;
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const options = {
        scope: myConfig.QINIU.bucket
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    const config = new qiniu.conf.Config();
    // 空间对应的机房
    config.zone = qiniu.zone.Zone_z2;
    const localFile = filePath;
    const formUploader = new qiniu.form_up.FormUploader(config);
    const putExtra = new qiniu.form_up.PutExtra();
    // 文件上传
    return new Promise((resolved, reject) => {
        formUploader.putFile(uploadToken, key, localFile, putExtra, function (respErr, respBody, respInfo) {
            if (respErr) {
                reject(respErr);
            }
            else {
                resolved(respBody);
            }
        });
    });
};
// 上传文件到服务
exports.uploadFile = (ctx, options) => {
    const busboy = new Busboy({ headers: ctx.req.headers });
    //获取类型
    const fileType = options.fileType || 'image';
    const filePath = path.join(options.path, fileType);
    const mkdirResult = mkdirsSync(filePath);
    if (!mkdirResult) {
        return;
    }
    console.log('start uploading...');
    return new Promise((resolve, reject) => {
        //解析文件请求事件
        busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
            const fileName = Rename(filename);
            const saveTo = path.join(path.join(filePath, fileName));
            //文件保存到特定路径
            file.pipe(fs.createWriteStream(saveTo));
            //解析文件结束
            file.on('end', function () {
                resolve({
                    imgPath: `/${fileType}/${fileName}`,
                    imgKey: fileName
                });
            });
        });
        busboy.on('finish', function () {
            console.log('finished...');
        });
        busboy.on('error', function (err) {
            console.log('err...');
            reject(err);
        });
        ctx.req.pipe(busboy);
    });
};

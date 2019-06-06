const { getSuffixName } = require('./util')
const path=require('path');
const fs = require('fs');

module.exports = (router) => {
  router.get('/', async ctx => {
    ctx.body = {
      status: 'ok'
    }
  });
  router.post('/upload', async (ctx, next) => {
    console.log(ctx.request);
    console.log(ctx.request.files, 'files');
    console.log(ctx.request.body, 'body');
    let _uploadFilePath = path.join(__dirname ,'image');
    let file = ctx.request.body.FrontCard;
    // const file = ctx.request.files.file;
    let rs = fs.createReadStream('https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500');
    let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName('xx.');
      console.log(fileName,'filename');
    const steamPth=path.join(_uploadFilePath,fileName);
    const stream = fs.createWriteStream(steamPth);
    rs.pipe(stream);
    console.log('uploading', stream.path);
    ctx.body = {
      data: JSON.stringify(ctx.request.files)
    }
  });
}

---
title: copy
nav:
  title: node源码
  path: /node-source
---

```ts
import { resolve } from 'path';
import * as fs from 'fs';

/**
 * @description 边读取边写入copy问题
 * @param source 源文件
 * @param target 目标文件
 * @param callback 回调函数
 */
const copy = (source, target, callback) => {
  const SIZE = 3;
  const buffer = Buffer.alloc(SIZE);
  let readOffset = 0;
  let writeOffset = 0;

  fs.open(source, 'r', (err, rfd) => {
    if (err) return callback(err);
    fs.open(target, 'w', (err, wfd) => {
      if (err) return callback(err);

      const next = () => {
        fs.read(rfd, buffer, 0, SIZE, readOffset, (err, byteRead) => {
          if (err) return callback(err);
          fs.write(wfd, buffer, 0, byteRead, writeOffset, (err, written) => {
            if (err) return callback(err);
            readOffset += byteRead;
            writeOffset += written;

            // 表示本次读取完毕
            if (byteRead < SIZE) {
              fs.close(rfd, () => {});
              fs.close(wfd, () => {});
              callback();
              return;
            }
            next();
          });
        });
      };
      next();
    });
  });
};

// copy(resolve(__dirname,'name.txt'),resolve(__dirname,'copy.txt'),(err)=>{
//   if(err){
//     console.log('copy err',err);
//     return
//   }
//   console.log('copy success')
// })
```

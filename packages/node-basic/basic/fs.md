---
title: fs
nav:
  title: node基础篇
  path: /node-basic
group:
  title: API
  path: /api
---

## 同步读取文件

```js
/**
 * @name readFileSync
 * @description 同步读取文件
 */
function readSyncFn() {
  const readmeLocation = path.join(__dirname, '../README.md');
  const readme = fs.readFileSync(readmeLocation);
  console.log('同步读取', readme);
  const reameAsync = fs.readFile(readmeLocation, (err, data) => {
    console.log('异步读取数据', data.toString());
  });
}
```

## pipe

```js
/**
 * @name stream pipe
 */
function streamPipFn() {
  const rs = fs.createReadStream('../README.md');
  const ws = fs.createWriteStream('./temp.md');
  rs.on('readable', () => {
    console.log('--read able---', rs.read());
  });
  rs.on('end', () => {
    console.log('---read end--');
  });
  rs.pipe(ws);
}
```

## WriteStream

```js
/**
 * @name WriteStream
 * @description 写入一个0~10数字,只占用一个字节内存
 */

function writeTenNumber() {
  const sum = 10;
  let curVal = 0;
  const ws = fs.createWriteStream(path.resolve(__dirname, './temp.md'), {
    highWaterMark: 1, // 控制占用内存数
  });
  function write() {
    let flag = true;
    while (flag && curVal < sum) {
      flag = ws.write(curVal + '');
      curVal++;
    }
    if (curVal === sum) {
      ws.end();
    }
  }
  ws.on('drain', () => {
    console.log('...write...', curVal);
    write();
  });
  ws.on('close', () => {
    console.log('***内容写入完毕***');
  });
  write();
}
```

## ReadStream

```js
/**
 * @name ReadStream
 * @description 读取文件内容
 */
function readStreamFn() {
  const rs = new ReadStream(resolve(__dirname, 'copy.txt'), {
    highWaterMark: 3,
  });

  const chunkData = [];

  rs.on('open', (fd) => {
    console.log(fd, 'read');
  });
  rs.on('data', (chunk) => {
    rs.pause();
    setTimeout(() => {
      console.log('触发暂停恢复');
      rs.resume();
    }, 10);
    chunkData.push(chunk);
  });

  rs.on('close', () => {
    console.log(chunkData.join(), 'read source');
  });
}
```

## demo 练习

### 生成目录

```js
// const pfs = require('fs').promises;
/**
 * @description 生成目录
 */
async function mkdirFn(paths) {
  const pathArr = paths.split('/');
  for (let i = 0; i < pathArr.length; i++) {
    const currentPath = pathArr.slice(0, i + 1).join('/');
    try {
      await pfs.access(currentPath);
    } catch (error) {
      await pfs.mkdir(currentPath);
    }
  }
}
// mkdirFn('a/b/c/d');
```

### 删除文件目录

```js
/**
 * @description 删除文件目录
 * @example
 * 删除文件 fs.unlink()
 * 删除文件夹 fs.rmdir()
 * 读取文件夹 fs.readdir()
 * 获取文件状态 fs.stat()
 */
function rmDirSync(dir) {
  const statObj = fs.statSync(dir);

  if (statObj.isFile()) {
    fs.unlinkSync(dir);
    return;
  }

  fs.readdirSync(dir).forEach((curPath) => {
    rmDirSync(path.join(dir, curPath));
  });

  fs.rmdirSync(dir);
}
```

#### 异步删除文件

```js
function rmDir(dir, callback) {
  fs.stat(dir, (err, stat) => {
    if (err) {
      callback(err);
      return;
    }
    if (stat.isDirectory()) {
      fs.readdir(dir, (err, files) => {
        console.log(dir, files, 'file');
        const paths = files.map((file) => path.join(dir, file));
        let idx = 0;
        function next() {
          if (idx === paths.length) fs.rmdir(dir, callback);
          rmDir(paths[idx++], next);
        }
        next();
      });
    } else {
      fs.unlink(dir, callback);
    }
  });
}
```

#### 同步删除

```js
function rmDirAsync(dir, callback) {
  fs.stat(dir, (err, stats) => {
    if (err) {
      callback(err);
      return;
    }
    if (stats.isDirectory()) {
      fs.readdir(dir, (err, files) => {
        if (err) {
          callback(err);
          return;
        }
        const dirs = files.map((file) => path.join(dir, file));
        console.log(dirs, 'dirs');
        if (!dirs.length) {
          return fs.rmdir(dir, callback);
        }
        let idx = 0;
        function done() {
          if (++idx === dirs.length) {
            return fs.rmdir(dir, callback);
          }
        }
        for (let index = 0; index < dirs.length; index++) {
          const dir = dirs[index];
          rmDirAsync(dir, done);
        }
      });
    } else {
      fs.unlink(dir, callback);
    }
  });
}

rmDirAsync('a', (err) => {
  if (err) {
    console.log('rm err', err);
    return;
  }
  console.log('删除成功');
});
```

---
title: http-server
nav:
  title: node源码
  path: /node-source
---

# 项目搭建

创建文件夹并进入:

> npm init -y

## 项目结构

```bash
├── READE.md
├── bin  # 启动目录
│   └── http-server.js
├── lib # 源码
│   └── http-server.js
├── package.json
└── public   #测试数据
    ├── a.json
    ├── index.js
    ├── print.html
    └── 你好.txt
```

# package.json

```json
{
  "bin": {
    "http-server": "./bin/http-server.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "colors": "^1.4.0",
    "commander": "^7.2.0",
    "ejs": "^3.1.6",
    "mime": "^2.5.2",
    "opener": "^1.5.2"
  }
}
```

# bin

```js
// bin/http-server.js

#!/usr/bin/env node

const { program } = require('commander');
const { version } = require('../package.json');
const httpServer = require('../lib/http-server');

program.version(version);

const optConfig = {
  //配置目录
  port: {
    option: '-p,--port <val>',
    description: 'set your server port',
    usage: 'http-server --port 3000',
    default: 3000,
  },
  //配置目录
  directory: {
    option: '-d,--directory <val>',
    description: 'set your directory',
    usage: 'http-server --directory D:',
    default: process.cwd(),
  },
  // 配置主机名
  host: {
    option: '-h,--host <val>',
    description: 'set your hostname',
    usage: 'http-server --host 127.0.0.1',
    default: '127.0.0.1',

  }
}

Object.values(optConfig).forEach(opt => {
  program.option(opt.option, opt.description, opt.default)
})

program.on('--help', () => {
  console.log('\nExample:');
  Object.values(optConfig).forEach(({ usage }) => {
    console.log(`  ${usage}`);
  })
})

program.parse(process.argv);
const options = program.opts();
const server = new httpServer({...options,root:program.args[0]});
server.start();


```

# create-server

```js
// /lib/http-server.js

const http = require('http');
const ejs = require('ejs');
const colors = require('colors/safe');
const opener = require('opener');
const mime = require('mime');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs').promises;
const { createReadStream, createWriteStream, lstatSync } = require('fs');

class HttpServer {
  constructor(opts) {
    this.opts = opts;
    this.headers = opts.headers || {};

    if (opts.root) {
      this.root = opts.root;
    } else {
      try {
        lstatSync('./public');
        this.root = './public';
      } catch (err) {
        this.root = './';
      }
    }
  }
  async cache(req, res, filePath, statObj) {
    res.setHeader('Expires', new Date(Date.now() + 10 * 1000).toUTCString());
    res.setHeader('Cache-Control', 'max-age 10');
    const fileContent = await fs.readFile(filePath);
    const contentHash = crypto
      .createHash('md5')
      .update(fileContent)
      .digest('base64');
    const ctime = statObj.ctime.toUTCString();
    const ifNoMatch = req.headers['if-no-match'];
    const ifModifiedSince = req.headers['if-modified-since'];

    if (ifNoMatch === contentHash || ifModifiedSince === ctime) {
      return true;
    }
    res.setHeader('Etag', contentHash);
    res.setHeader('Last-Modified', ctime);
    return false;
  }
  async sendFile(req, res, filePath, statObj) {
    const isCache = await this.cache(req, res, filePath, statObj);
    if (isCache) {
      res.statusCode = 304;
      res.end();
      return;
    }
    res.setHeader('Content-Type', `${mime.getType(filePath)};charset=utf-8`);
    createReadStream(filePath).pipe(res);
  }
  async requestListener(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    this.pathname = decodeURIComponent(url.pathname);
    const filePath = path.join(this.opts.directory, this.pathname);
    try {
      const statObj = await fs.stat(filePath);
      if (statObj.isDirectory()) {
        const resolvePath = path.join(filePath, 'index.html');
        fs.access(resolvePath)
          .then(() => {
            this.sendFile(req, res, resolvePath, statObj);
          })
          .catch((e) => {
            this.showList(req, res, filePath);
          });
        return;
      }
      await this.sendFile(req, res, filePath, statObj);
    } catch (error) {
      console.log(error);
      res.statusCode = 404;
      res.end('Not found');
    }
  }
  async showList(req, res, filePath) {
    const dirs = await fs.readdir(filePath);
    const pathDirs = dirs.map((dir) => ({
      dir,
      path: path.join(this.pathname, dir),
    }));
    const html = ejs.render(
      `<% dirs.forEach(function(item){ %>
        <li><a href="<%=item.path%>"><%=item.dir%></a></li>
      <%})%>`,
      { dirs: pathDirs },
    );
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    res.end(html);
  }
  start() {
    const server = http.createServer(this.requestListener.bind(this));
    server.listen(this.opts.port, this.opts.host, () => {
      const { port, host, ssl } = this.opts;
      const canonicalHost = this.opts.host === '0.0.0.0' ? '127.0.0.1' : host,
        protocol = ssl ? 'https://' : 'http://';

      console.log(
        [
          colors.yellow('Starting up http-server, serving '),
          colors.cyan(this.root),
          ssl ? colors.yellow(' through') + colors.cyan(' https') : '',
          colors.yellow('\nAvailable on:'),
        ].join(''),
      );

      console.log('Hit CTRL-C to stop the server');
      var openUrl = protocol + canonicalHost + ':' + port;
      console.log('open: ' + openUrl);
      // opener(openUrl);
    });
  }
}
module.exports = HttpServer;
```

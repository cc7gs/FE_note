---
title: readStream
nav:
  title: node源码
  path: /node-source
---

```ts
import { EventEmitter } from 'events';
import * as fs from 'fs';
import { resolve } from 'path';

interface StreamOptions {
  flags?: string;
  encoding?: string;
  fd?: number;
  mode?: number;
  autoClose?: boolean;
  /**
   * @default false
   */
  emitClose?: boolean;
  start?: number;
  end?: number;
  highWaterMark?: number;
}

/**
 * @description 文件可读流
 */

export class ReadStream extends EventEmitter {
  flags: string;
  encoding: string;
  fd: number;
  mode: number;
  autoClose: boolean;
  emitClose: boolean;
  start: number;
  end: number;
  highWaterMark: number;
  pos: number;
  flowing: boolean;

  constructor(public path: string, options?: StreamOptions) {
    super();

    this.flags = options?.flags ?? 'r';
    this.encoding = options?.encoding ?? 'buffer';
    this.mode = options?.mode ?? 0o666;
    this.autoClose = options?.autoClose ?? true;
    this.emitClose = options?.emitClose ?? false;
    this.start = options?.start ?? 0;
    this.end = options?.start;
    this.highWaterMark = options?.highWaterMark ?? 64 * 1024;
    //记录读取偏移量
    this.pos = 0;
    this.flowing = false;

    this.on('newListener', (type) => {
      console.log(type);
      if (type === 'data') {
        this.read();
      }
    });
    this.open();
  }

  open() {
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      if (err) {
        return this.emit('error', err);
      }
      this.fd = fd;
      this.flowing = true;
      this.emit('open', fd);
    });
  }

  read() {
    if (typeof this.fd !== 'number') {
      return this.once('open', this.read);
    }
    const buffer = Buffer.alloc(this.highWaterMark);
    const readLength = this.end
      ? Math.min(this.end - this.pos + 1, this.highWaterMark)
      : this.highWaterMark;

    fs.read(
      this.fd,
      buffer,
      0,
      readLength,
      this.pos,
      (err, bytesRead, buffer) => {
        if (err) return this.emit('error', err);

        if (bytesRead) {
          this.pos += bytesRead;
          this.emit('data', buffer.slice(0, bytesRead));
          if (this.flowing) {
            this.read();
          }
        } else {
          this.emit('end');
          if (this.autoClose) {
            fs.close(this.fd, () => this.emit('close'));
          }
        }
      },
    );
  }
  pipe(ws: fs.WriteStream) {
    this.on('data', (data) => {
      const flag = ws.write(data);
      console.log('flag', flag);
      if (!flag) {
        this.pause();
      }
    });
    ws.on('drain', () => {
      console.log('write drain');
      this.resume();
    });
  }
  pause() {
    this.flowing = false;
  }
  resume() {
    this.flowing = true;
    this.read();
  }
}

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
```

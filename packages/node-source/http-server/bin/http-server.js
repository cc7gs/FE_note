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
  },
};

Object.values(optConfig).forEach((opt) => {
  program.option(opt.option, opt.description, opt.default);
});

program.on('--help', () => {
  console.log('\nExample:');
  Object.values(optConfig).forEach(({ usage }) => {
    console.log(`  ${usage}`);
  });
});

program.parse(process.argv);
const options = program.opts();
const server = new httpServer({ ...options, root: program.args[0] });
server.start();

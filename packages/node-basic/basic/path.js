/**
 * Path
 */

const path = require('path');
const fs = require('fs');
console.log('==============获取文件路径======================');
console.log(__dirname, 'dirname');
console.log(__filename, 'filename');
console.log(process.cwd());
console.log(path.resolve('./'));
console.log('====================================');

console.log('================路径序列化====================');
console.log(path.normalize('F:/我的github项目/nodejs_note//nodejs-basic'));
console.log('====================================');

console.log('===============join=====================');
console.log(path.join('src', 'test.js'));
console.log(path.join('src', './test.js'));
console.log(path.join(''));
console.log('====================================');

console.log('=================parse===================');
console.log(path.parse('F:/我的github项目/nodejs_note/nodejs-basic/baisc.js'));
console.log('====================================');

console.log('=================resolve===================');
console.log(path.resolve('/foo/bar', '/a/nodeJs'));
console.log(path.resolve('foo/bar', '/a'));
console.log(path.resolve(''));
console.log('====================================');

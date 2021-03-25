
/**
 * 文件的读取
 */
const fs = require('fs');
const path = require('path');

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



/**
 * @name stream pipe
 */
function streamPipFn() {
    const rs = fs.createReadStream('../README.md');
    const ws = fs.createWriteStream('./temp.md');
    rs.on('readable', () => {
        console.log('--read able---', rs.read());
    })
    rs.on('end', () => {
        console.log('---read end--');
    });
    rs.pipe(ws);
}


/**
 * @name WriteStream
 * @description 写入一个0~10数字,只占用一个字节内存
 */

function writeTenNumber() {
    const sum = 10;
    let curVal = 0;
    const ws = fs.createWriteStream(path.resolve(__dirname, './temp.md'), {
        highWaterMark: 1 // 控制占用内存数
    });
    function write() {
        let flag = true;
        while (flag && curVal < sum) {
            flag = ws.write(curVal + '');
            curVal++;
        }
        if(curVal===sum){
            ws.end();
        }
    }
    ws.on('drain', () => {
        console.log('...write...',curVal);
        write();
    })
    ws.on('close',()=>{
        console.log('***内容写入完毕***');
    })
    write();
}


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
    })
    rs.on('data', (chunk) => {
        rs.pause();
        setTimeout(() => {
            console.log('触发暂停恢复')
            rs.resume();
        }, 10);
        chunkData.push(chunk);
    })

    rs.on('close', () => {
        console.log(chunkData.join(), 'read source')
    })
}

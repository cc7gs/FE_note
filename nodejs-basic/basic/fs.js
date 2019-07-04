
/**
 * 文件的读取
 */
const fs=require('fs');
//同步读取文件
const readme=fs.readFileSync('../readme.md');
console.log('同步读取',readme);
const reameAsync=fs.readFile('../readme.md',(err,data)=>{
    console.log('异步读取数据',data.toString());
});


/**
 * stream
 */
const rs=fs.createReadStream('../readme.md');
const ws=fs.createWriteStream('./temp.md');
rs.on('readable',()=>{
    console.log('--read able---',rs.read());
})
rs.on('end',()=>{ 
    console.log('---read end--');
});
// rs.pipe(ws);
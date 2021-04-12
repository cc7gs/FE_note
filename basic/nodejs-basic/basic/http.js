/**
 * @name http
 * @description
 * 1. 无状态
 * 2. 1.1 keep-alive 不会断开链接
 * 3. 默认是管线化(针对同一个域名请求采用并发) 
 */

const http=require('http');

const server=http.createServer((req,res)=>{
console.log(req.header);
const url=new URL(req.url, `http://${req.headers.host}`);
console.log(url);
})


let port=3000;

server.listen(port,()=>{
  console.log(`server start at prot:${port}`);
})
server.on('error',(error)=>{
  if(error&&error.code==='EADDRINUSE'){
    server.listen(++port);
  }
})
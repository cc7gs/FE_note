const http=require('http');
http.createServer((req,res)=>{
    //设置允许cors源
    res.writeHead(200,{
        "Access-Control-Allow-Origin":"http://localhost:8888",
        "Access-Control-Allow-Headers":"*",
        "Access-Control-Allow-Methods":"*"
    })
    res.end('ok');
}).listen(3001,()=>{
    console.log('server at port 3001');
})
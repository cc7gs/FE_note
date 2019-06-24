const express=require('./route');
const app=express();
app.get('/',()=>{
    console.log('handle / app');
    res.end('index page');
})
app.get('/test1',(req,res)=>{
    res.end('test page');
})
app.listen(3000,()=>{
    console.log('server start')
});
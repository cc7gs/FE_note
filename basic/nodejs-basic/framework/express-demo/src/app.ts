
import express from 'express' 
import {json,urlencoded} from 'body-parser'

class App{
    public app:express.Application;
    constructor(){
        this.app=express();
        this.config()
    }
    private config(){
        //支持  application/json类型 发送数据
        this.app.use(json());
        this.app.get('/',(req,res)=>{
            res.send({message:'hello express'});
        })
        //支持 application/x-www-form-urlencoded 发送数据
        this.app.use(urlencoded({extended:false}))
    }

}
export default new App().app
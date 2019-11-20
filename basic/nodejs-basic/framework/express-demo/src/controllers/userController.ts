import { Request, Response } from "express";
import User from '../models/user.model'

class UserController{
    static listAll=async (req:Request,res:Response)=>{
        console.log('list ALl');
        User.find({},(err,allInfo)=>{
            if(err){
                res.send(err)
            }
                res.send(allInfo)
        })
    }
    static getOneById=async(req:Request,res:Response)=>{
        console.log('get one by id');
        User.findById(req.params.id,(err,userInfo)=>{
            if(err){
                res.send(err)
            }
            res.send(userInfo)
        })
    }
    static newUser=async (req:Request,res:Response)=>{
        console.log('create user');
        let newUser=new User(req.body);
        newUser.save((err,info)=>{
            if(err){
                res.send(err)
            }
            res.send(info)
        })

    }
   static editUser=async (req:Request,res:Response)=>{
        console.log('edit user');
        User.findByIdAndUpdate({_id:req.params.id},req.body,{new:true},(err,info)=>{
            if(err){
                res.send(err)
            }
            res.send(info)
        })

    }
    static delUser=async (req:Request,res:Response)=>{
        console.log('del user');
        User.remove({_id:req.params.id},(err)=>{
            if(err){
                res.send(err)
            }
            res.send({message:'Successfully deleted user!'})
        })
    }
}
export default UserController
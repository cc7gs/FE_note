import { Request, Response, NextFunction } from "express";
import NotFoundException from '../expceptions/notFoundException'
import User from '../models/user.model'

class UserController{
    static listAll=async (req:Request,res:Response)=>{
        User.find({},(err,allInfo)=>{
            if(err){
                res.send(err)
            }
                res.send(allInfo)
        })
    }
    static getOneById=async(req:Request,res:Response,next:NextFunction)=>{
        const id=req.params.id;
        User.findById(id,(err,userInfo)=>{
            if(err){
                next(new NotFoundException(id))
                return
            }
                res.send(userInfo)
            
        })
    }
    static newUser=async (req:Request,res:Response)=>{
        let newUser=new User(req.body);
        newUser.save((err,info)=>{
            if(err){
                res.send(err)
            }
            res.send(info)
        })

    }
   static editUser=async (req:Request,res:Response,next:NextFunction)=>{
       const id=req.params.id;
        User.findByIdAndUpdate({_id:id},req.body,{new:true},(err,info)=>{
            if(err){
                next(new NotFoundException(id))
            }else{
                res.send(info)
            }
        })

    }
    static delUser=async (req:Request,res:Response,next:NextFunction)=>{
        const id=req.params.id;
        User.remove({_id:id},(err)=>{
            if(err){
                next(new NotFoundException(id))
            }else{
             res.send({message:'Successfully deleted user!'})   
            }
        })
    }
}
export default UserController
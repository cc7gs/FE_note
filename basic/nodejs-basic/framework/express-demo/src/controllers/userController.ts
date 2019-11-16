import { Request, Response } from "express";
class UserController{
    static listAll=async (req:Request,res:Response)=>{
        console.log('list ALl');
        res.send({message:'list all'});
    }
    static getOneById=async(req:Request,res:Response)=>{
        console.log('get one by id');
        res.send({message:'get on by id'});

    }
    static newUser=async (req:Request,res:Response)=>{
        console.log('create user');
        res.send({message:'create user'});

    }
   static editUser=async (req:Request,res:Response)=>{
        console.log('edit user');
        res.send({message:'edit user'});

    }
    static delUser=async (req:Request,res:Response)=>{
        console.log('del user');
        res.send({message:'del user'});

    }
}
export default UserController
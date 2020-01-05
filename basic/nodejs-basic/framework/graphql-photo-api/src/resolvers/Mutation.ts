import {authorizeWithGithub} from '../lib'
import * as fetch from 'node-fetch'
import {ObjectID } from 'mongodb'
import {Fn} from './types'

const postPhoto:Fn=async(parent,args,context)=>{

}
const tagPhoto=()=>{

}
const githubAuth:Fn=async(parent,{code},{db})=>{
 //1. 从github获取用户数据 
 let {
    message,
    access_token,
    avatar_url,
    login,
    name
  } = await authorizeWithGithub({
    client_id: process.env.CLIENT_ID!,
    client_secret: process.env.CLIENT_SECRET!,
    code
  });
  if(message){
      throw new Error(message)
  }

  let latestUserInfo={
      name,
      githubLogin:login,
      githubToken:access_token,
      avatar:avatar_url
  }
  const {ops:[user]}=await db
  .collection('users')
  .replaceOne({githubLogin:login},latestUserInfo,{upsert:true})

  return {user,token:access_token}
}
const addFakeUsers=()=>{

}
const fakeUserAuth=()=>{

}
export default {
    postPhoto,
    tagPhoto,
    githubAuth,
    addFakeUsers,
    fakeUserAuth
}
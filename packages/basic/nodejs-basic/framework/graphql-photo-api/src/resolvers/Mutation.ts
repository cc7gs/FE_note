import {authorizeWithGithub} from '../lib'
import  fetch from 'node-fetch'
import {ObjectID } from 'mongodb'
import {Fn} from './types'

const postPhoto:Fn=async(parent,args,{db,currentUser})=>{
  //1. 检查登录是否登录
  if(!currentUser){
    throw new Error('Only an authorized user can post a photo');
  }
  //2. 保存当前用户至图片
  const newPhoto={
    ...args.input,
    userID: currentUser.githubLogin,
    created: new Date()
  }
  //3. 入库、并获取id
  const {insertedIds}=await db.collection('photos').insert(newPhoto)
  newPhoto.id=insertedIds[0] 

  return newPhoto
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
const addFakeUsers:Fn=async (parent,{count},{db})=>{
  const randomUserApi=`https://randomuser.me/api/?results=${count}`
  
  const {results}=await fetch(randomUserApi).then(res=>res.json())
  
  const users=results.map((r:any)=>({
    githubLogin:r.login.username,
    name:`${r.name.first} ${r.name.last}`,
    avatar:r.picture.thumbnail,
    githubToken:r.login.sha1
  }));
  await db.collection('users').insert(users)

  return users
}
const fakeUserAuth:Fn=async(parent,{githubLogin},{db})=>{
  const user=await db.collection('users').findOne({githubLogin})
  if(!user){
    throw new Error(`cannot find user with githubLogin ${githubLogin}`)
  }
  return {
    token:user.githubToken,
    user
  }
}
export default {
    postPhoto,
    tagPhoto,
    githubAuth,
    addFakeUsers,
    fakeUserAuth
}
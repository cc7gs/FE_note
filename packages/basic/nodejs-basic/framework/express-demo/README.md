---
title: express
nav:
  title: 基础篇
  path: /basic
group:
  title: node框架
  path: /node-framework
  order: 4

---

> 使用TypeScript+Express+NodeJS+MongoDB 开发 Web APIs,如有错误可以击提issue 💪,如果觉得ok,请点个star 🙏, `送人玫瑰、手有余香`

# 目录
- [目录](#目录)
- [搭建开发环境](#搭建开发环境)
- [hello express](#hello-express)
- [构建路由](#构建路由)
- [引入MongoDB](#引入mongodb)
- [nodeJs错误处理](#nodejs错误处理)
- [auth](#auth)
  - [登录与注册模块](#登录与注册模块)
  - [使用JWT令牌进行身份验证](#使用jwt令牌进行身份验证)
- [总结](#总结)
- [参考地址](#参考地址)
- [工具](#工具)
- [参考文档](#参考文档)

# 搭建开发环境

> npm init -y
> npm i express @types/node @types/express body-parser mongoose cors @types/cors 
> npm i typescript ts-node-dev morgan @types/morgan rimraf -D
`创建 ts 配置`
> npx typescript --init

修改`tsconfig.json`配置

```json
 {
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "sourceMap": true,
    "outDir": "./dist",
    "removeComments": true,
    /* Strict Type-Checking Options */
    "strict": true,
    "noImplicitAny": false,
    "strictNullChecks": true,
    "alwaysStrict": true,
    /* Module Resolution Options */
    "moduleResolution": "node",
    "baseUrl": "./src",
    "allowSyntheticDefaultImports": true, 
    "esModuleInterop": true,  
  },
  "include": [
    "./src/**/*"
  ]
}                     /* Redirect output structure to the directory. */
```
`配置脚本命令`

```js
"scripts": {
    "build": "tsc",
    "dev": "ts-node-dev — respawn — transpileOnly ./src/server.ts",
     "restart": "rimraf dist && npm run build && npm start",
    "start":"node ./dist/server.js",
    "prod":"npm run build && npm run start"
  },
```

# hello express

`src/server.ts`
```js
import app from './app'
const PORT=3000;

app.listen(PORT,()=>{
    console.log(`Express server listening on port ${PORT}`);
})
```

`app.ts`

```js
import express from 'express' 
import {json,urlencoded} from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'

class App{
    public app:express.Application;
    private router=new Routes();
    constructor(){
        this.app=express();
        this.config()
        // 引入路由
        this.app.get('/',(req,res)=>{
          res.send({message:'hello express'})
        })
    }
    private config(){
        //开启 cors
        this.app.use(cors())
        //支持  application/json类型 发送数据
        this.app.use(json());
        //支持 application/x-www-form-urlencoded 发送数据
        this.app.use(urlencoded({extended:false}))
        //日志中间件
        this.app.use(morgan('dev'))
    }

}
export default new App().app
```

- body-parser:正文解析器使我们可以接收带有不同格式数据的请求，例如json或x-www-form-urlencoded。
- CORS (Cross-Origin Resource Sharing):使用附加的HTTP标头，这些标头使我们的浏览器知道必须允许在一个域中运行的Web应用程序从其他来源的服务器访问资源。 

[⬆ back to top](#目录)

# 构建路由
`RESTful`
- GET:用来获取资源
- POST:用来新建资源(也可以用于更新资源)
- PUT:用来更新资源
- DELETE:用来删除资源

`目录结构`
```
├── README.md
├── package-lock.json
├── package.json
├── src
│   ├── app.ts
│   ├── controllers
│   │   └── userController.ts
│   ├── routes
│   │   ├── index.ts
│   │   └── user.ts
│   └── server.ts
└── tsconfig.json
```

`routers/index.ts`
```js
import { Router} from "express";
import user from './user'

const routes = Router();

routes.use('/user',user)

export default routes
```

`routes/user.ts`

```js
import {Router} from 'express'
import UserController from '../controllers/userController'

const router=Router();

/**
 * @route /user
 * get: 获取所有用户
 * post：创建用户
 */  
router
    .route('/')
    .get(UserController.listAll)
    .post(UserController.newUser)


/**
 * @route /user/:id
 * get:通过id 获取用户
 * put:编辑用户
 * delete:删除用户
 */
router
    .route('/:id')
    .get(UserController.getOneById)
    .put(UserController.editUser)
    .delete(UserController.delUser)


export default router
```
`controllers/userController.ts`

```js
import { Request, Response } from "express";
class UserController{
    static listAll=async (req:Request,res:Response)=>{
        console.log('list ALl');
    }
    static getOneById=async(req:Request,res:Response)=>{
        console.log('get one by id');
    }
    static newUser=async (req:Request,res:Response)=>{
        console.log('create user');
    }
   static editUser=async (req:Request,res:Response)=>{
        console.log('edit user');
    }
    static delUser=async (req:Request,res:Response)=>{
        console.log('del user');
    }
}
export default UserController
```
`app.ts`中引入路由
```js
import routes from './routes'

//...
constructor(){
      this.app=express();
      this.config()
      // 引入路由
      this.app.use(routes)
  }
//...
```

[⬆ back to top](#目录)

# 引入MongoDB
[MongoDB安装与入门](./mongoDB.md)

`目录结构`
```
├── README.md
├── package-lock.json
├── package.json
├── src
│   ├── config
│   │  └── index.ts
│   ├── controllers
│   │  └── userControllers.ts
│   ├── models
│   │  └── user.model.ts
│   ├── routes
│   │   ├── index.ts
│   │   └── user.ts
│   └── server.ts
│   ├── app.ts
└── tsconfig.json
```

**引入Mongoose** ➡️ `app.ts`
```js
class App{

constructor(){
   //... 省略其它
    this.setMongoConfig()
}
// ...

private setMongoConfig(){
    mongoose.Promise = global.Promise;
    mongoose.connect(DB_URL, {
        useNewUrlParser: true
        });
    }
}
```
`配置文件` ➡️ `config/index.ts`
```js
export const DB_URL='mongodb://localhost:27017/express-api';
export const PORT=3000;
```
`添加Models` ➡️ `user.model.ts`

```js
import * as mongoose from 'mongoose'

const Schema=mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: 'Enter a first name'
    },
    lastName: {
        type: String,
        required: 'Enter a last name'
    },
    email: {
        type: String
    },
    status:{
        type:String,
        required:true,
        enum:['active','complete','pastdue'],
        default:'active'
    },
    company: {
        type: String
    },
    phone: {
        type: Number
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

const User=mongoose.model('user',userSchema)

export default User
```
`处理业务逻辑(Controllers)` ➡️ `controllers/userController.ts`

- 增加(C): model.create()、new model()
- 查询(R): model.find()、model.findOne()、model.findById()
- 修改(U):model.update()、model.findByIdAndUpdate()、model.findOneUpdate()
- 删除(D):model.remove()、model.findByIdAndRemove()、model.findOneRemove()

```js
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
        User.findOneAndUpdate({_id:req.params.id},req.body,(err,info)=>{
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
``` 
[⬆ back to top](#目录)

# nodeJs错误处理

通过上面的学习,存在一个很大问题,就是我们把操作数据库的错误抛给了`client`这种实践是非常糟糕的,现在我们封装一个错误处理的中间件。

> 首先，让我们创建一个将用于引发错误的类。

`src/exceptions/HttpException.ts`

```js
class HttpException extends Error{
    constructor(public status:number,public message:string){
        super(message);
        this.status=status;
        this.message=message
    }
}
export default HttpException
```

>如果您想了解有关Error对象和一般错误的更多信息，请尝试使用[try…catch](https://wanago.io/2018/11/12/handling-errors-in-javascript-with-try-catch-and-finally/)检查  JavaScript处理错误，最后

> 接下来，书写错误中间件

`middleware/error.middleware.ts`

```js
import {Request,Response,NextFunction} from 'express'
import HttpException from '../expceptions/httpException'
function errorMiddleware(error:HttpException,request:Request,response:Response,next:NextFunction){
    const status=error.status||500;
    const message=error.message||'Something went wrong';
    response
        .status(status)
        .send({
            status,
            message
        })
}
export default errorMiddleware
```
> 引入中间件

`app.ts`

```js
import express from 'express' 
import {json,urlencoded} from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import routes from './routes'
import mongoose from 'mongoose';
import errorMiddleware from './middleware/error.middleware'
import {DB_URL} from './config'

class App{
    public app:express.Application;
    constructor(){
        this.app=express();
        this.config()
        this.setMongoConfig()
        
        // 引入路由
        this.app.use(routes)

        //错误处理
        this.initializeErrorHandling();
    }

    private config(){
        //开启 cors
        this.app.use(cors())
        //支持  application/json类型 发送数据
        this.app.use(json());
        //支持 application/x-www-form-urlencoded 发送数据
        this.app.use(urlencoded({extended:false}))
        //日志中间件
        this.app.use(morgan('dev'))
    }
    
    private initializeErrorHandling(){
        this.app.use(errorMiddleware)
    }

    private setMongoConfig(){
        mongoose.Promise = global.Promise;
        mongoose.connect(DB_URL, {
            useNewUrlParser: true
          });
    }

}
export default new App().app
```
> 应用
`controllers/userController.ts`
```js
import HttpException from '../expceptions/httpException'

class UserController{
    static getOneById=async(req:Request,res:Response,next:NextFunction)=>{
        const id=req.params.id;
        User.findById(id,(err,userInfo)=>{
            if(err){
                next(new HttpException(404,`id:${id},not found`))
            }else{
                res.send(userInfo)

            }            
        })
    }
}

```

> 对于404页面我们可以再进一步抽离出一个`notFoundException`类。

`expceptions/NotFoundException.ts`

```js
import HttpException from './HttpException'

class NotFoundException extends HttpException{
    constructor(id:string){
        super(404,`id:${id},not found`);
    }
}
export default NotFoundException
```
进一步修改`controller`

`controllers/userController.ts`
```js
import NotFoundException from '../expceptions/NotFoundException'

class UserController{
    static getOneById=async(req:Request,res:Response,next:NextFunction)=>{
        const id=req.params.id;
        User.findById(id,(err,userInfo)=>{
            if(err){
                next(new NotFoundException(id))
            }else{
                res.send(userInfo)
            }
        })
    }
}
```

[⬆ back to top](#目录)

# auth
本文我们采用[bcrypt npm 包](https://www.npmjs.com/package/bcrypt)实现的bcrypt哈希算法,

> npm install bcrypt
> npm install --save-dev @types/bcrypt

举个🌰👇

```js
const passwordInPlainText = '12345678';
const hashedPassword = await bcrypt.hash(passwordInPlaintext, 10);
 
const doPasswordsMatch = await bcrypt.compare(passwordInPlaintext, hashedPassword);
console.log(doPasswordsMatch); // true
```

## 登录与注册模块
首先对用户创建前置加入密码加密、和用户登录时密码校验逻辑。此时我们可以将此逻辑加入到Model层。

`user.model.ts`

```js
userSchema.pre('save',function(next){
    if(!this.isModified('password')){
        return next()
    }
    bcrypt.hash(this.password,8,(err,hash)=>{
        if(err){
            return next(err)
        }
        this.password=hash;
        return next();
    })
})

userSchema.methods.checkPassword=function(password:string){
    const passwordHash = this.password;
    return new Promise((resovle,reject)=>{
        bcrypt.compare(password,passwordHash,(err,same)=>{
            if(err) return reject(err)
            return resovle(same)
        })
    })
}
```

下面我们我们来实现登录和注册模块。
`src/controllers/ authcontroller.ts`
```js
import { Request, Response, NextFunction } from 'express'
import User from '../models/user.model'
import NotFoundException from '../expceptions/notFoundException'
import HttpException from '../expceptions/httpException'

class AuthController {
    static signup = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.email || !req.body.password) {
            next(new HttpException(400, 'need email password'))
        }
        try {
            const user = await User.create(req.body);
           
            next(new HttpException(200, token))
        } catch (err) {
            next(new HttpException(500, `注册失败`))
        }
    }
    static signin = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.email || !req.body.password) {
            next(new HttpException(400, 'need email password'))
        }
        try {
            const user = await User.findOne({ email: req.body.email })
                .select('email password')
                .exec();
            if (!user) {
                next(new NotFoundException(req.body.email))
            }
            const match = await user!.checkPassword(req.body.password);
            if (!match) {
                next(new HttpException(401, 'Invalid email and passoword combination'))
            }
        } catch (error) {
            console.error(error, 'signin')
            next(new HttpException(500, '登录失败'))
        }
    }
}
export default AuthController
```
>提示:我们并不清楚用户尝试登录时是用户名还是密码错误。由于显示了一般错误消息，因此我们防止了潜在的攻击者了解任何有效的用户名不知道密码。

## 使用JWT令牌进行身份验证
JWT是一段JSON数据，在用户登录后使用秘密密钥在我们的服务器上签名，然后发送给他。当他发出其他请求时，他在标头中发送此令牌，以便我们可以对其进行编码使用相同的密钥。如果令牌有效，则我们知道发出请求的用户是谁。

> npm install jsonwebtoken
> npm install npm install @types/jsonwebtoken

`src/utils/auth.ts`
我们根据用户id创建token,最后在校验成功后我们可以根据此id查找到用户并进行返回。

```js

import { secrets } from '../config'
import jwt from 'jsonwebtoken'

export const newToken = (user: any) => {
    return jwt.sign({ id: user.id }, secrets.jwt, {
        expiresIn: secrets.jwtExp
    })
}
export const verifyToken= (token: string) => {
   return new Promise<{id:string}>((resolve, reject) => {
        jwt.verify(token, secrets.jwt, (err, payload) => {
            if (err) return reject(err)
            resolve(payload as any)
        })
    })
}

```
`src/config/index.ts`

```js
export const secrets={
    jwt:'user',
    jwtExp:60 * 60 // an hour
}
```
现在，我们可以更新AuthenticationController的代码。
```js
import { Request, Response, NextFunction } from 'express'
import User from '../models/user.model'
import {newToken,verifyToken} from '../utils/auth'
import NotFoundException from '../expceptions/notFoundException'
import HttpException from '../expceptions/httpException'


class AuthController {
    static signup = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.email || !req.body.password) {
            next(new HttpException(400, 'need email password'))
        }
        try {
            const user = await User.create(req.body);
            const token = newToken(user);
            next(new HttpException(200, token))
        } catch (err) {
            next(new HttpException(500, `注册失败:${err}`))
        }
    }
    static signin = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.email || !req.body.password) {
            next(new HttpException(400, 'need email password'))
        }
        try {
            const user = await User.findOne({ email: req.body.email })
                .select('email password')
                .exec();
            if (!user) {
                next(new NotFoundException(req.body.email))
            }
            const match = await user!.checkPassword(req.body.password);
            if (!match) {
                next(new HttpException(401, 'Invalid email and passoword combination'))
            }
            const token = newToken(user);
            next(new HttpException(200, token))
        } catch (error) {
            console.error(error, 'signin')
            next(new HttpException(500, '登录失败'))
        }
    }
    static protect = async (req: Request, res: Response, next: NextFunction) => {
        const bearer = req.headers.authorization;
        if (!bearer || !bearer.startsWith('Bearer ')) {
            next(new HttpException(401, '没有权限访问'))
        }
        const token = bearer!.split('Bearer ')[1].trim();
        let payload: any;
        try {
            payload = await verifyToken(token)

        } catch (err) {
            next(new HttpException(401, 'token 失效'))
        }

        const user = await User.findById(payload.id)
            .select('-password')
            .lean()
            .exec()

        if (!user) {
            next(new HttpException(401, 'not user'))
        }
        req.user = user
        next()
    }
    
}
export default AuthController
```

添加路由和访问权限
`/src/routes/index.ts`

```js
import { Router} from "express";
import AuthController from '../controllers/AuthController'
import user from './user'

const routes = Router();

routes.post('/signup',AuthController.signup)
routes.post('/signin',AuthController.signin)

routes.use('/api',AuthController.protect)
routes.use('/api/user',user)

export default routes
```
# 总结
在本文中，我们介绍了在*Typescript Express*应用程序中**注册**和**登录**功能。要实现它，我们必须知道如何使用`bcrypt来对密码进行哈希处理`以确保其安全。
我们在这里实现的身份验证是使用JSON Web令牌（JWT）完成的，该Web令牌提供了一种轻松的方法来`标识用户和验证请求`。

[⬆ back to top](#目录)

# 参考地址
[TypeScript Express tutorial #4. Registering users and authenticating with JWT](https://wanago.io/2018/12/24/typescript-express-registering-authenticating-jwt/)
# 工具
[insomnia](https://insomnia.rest/download/):一个强大的发送接收 APIs工具,类似postMan
[morgan](https://www.npmjs.com/package/morgan):nodejs HTTP 请求日志中间件
[cors](https://www.npmjs.com/package/cors): 可以配置各种cors

# 参考文档
[restful-api-node-typescript](https://restful-api-node-typescript.books.dalenguyen.me/en/latest/index.html#)
> 使用TypeScript+Express+NodeJS+MongoDB 开发 Web APIs,如有错误可以击提issue 💪,如果觉得ok,请点个star 🙏, `送人玫瑰、手有余香`

# 目录
1. [搭建环境](#搭建开发环境)
2. [hello express](#helloexpress)
3. [构建路由](#构建路由)
4. [引入MongoDB](#引入MongoDB)
  

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
├── tree.text
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
# 引入MongoDB

# auth


# 工具
[insomnia](https://insomnia.rest/download/):一个强大的发送接收 APIs工具,类似postMan
[morgan](https://www.npmjs.com/package/morgan):nodejs HTTP 请求日志中间件
[cors](https://www.npmjs.com/package/cors): 可以配置各种cors

# 参考文档
[restful-api-node-typescript](https://restful-api-node-typescript.books.dalenguyen.me/en/latest/index.html#)
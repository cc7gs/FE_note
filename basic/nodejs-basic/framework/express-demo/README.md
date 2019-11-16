> 使用TypeScript+Express+NodeJS+MongoDB 开发 Web APIs,如有错误可以击提issue 💪,如果觉得ok,请点个star 🙏, `送人玫瑰、手有余香`


# 搭建开发环境

> npm init -y
> npm i express @types/node @types/express body-parser mongoose
> npm i typescript ts-node-dev rimraf -D
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
```


# 参考文档
[restful-api-node-typescript](https://restful-api-node-typescript.books.dalenguyen.me/en/latest/index.html#)
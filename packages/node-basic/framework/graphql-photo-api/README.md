---
title: graphql-photo
nav:
  title: node基础篇
  path: /node-basic
group:
  title: 框架应用
  path: /framework
---

❗️❗️ 项目迁移 [click here!](https://github.com/cc7gs/graphql-photo-api)

# 语法简介

## 查询与变更

## schema 与类型

schema 是类型的集合,类型表示自定义对象，它是用于描述从服务端查询到的数据。为了方便定义类型，GraphQL 引入了模版定义语言(Schema Definition Language,SDL)。它和 GraphQL 的查询语言很相似，让我们能够和 GraphQL schema 之间可以无语言差异地沟通。

1. GraphQL 内置的标量类型

- Int：有符号 32 位整数。
- Float：有符号双精度浮点值。
- String：UTF‐8 字符序列。
- Boolean：true 或者 false。
- ID：ID 标量类型表示一个唯一标识符，通常用以重新获取对象或者作为缓存中的键。ID 类型使用和 String 一样的方式序列化；然而将其定义为 ID 意味着并不需要人类可读型。

```js
type Photo {
  id: ID!
  url: String!
  name: String!
  description: String
  category: PhotoCategory! # 枚举类型
}
```

2. 枚举类型

```js
enum PhotoCategory {
  SELFIE
  PORTRAIT
  ACTION
  LANDSCAPE
  GRAPHIC
}
```

3. 自定义类型

```js
scalar DateTime

type Photo{
    ...
    created: DateTime!
}
```

也可以采用[graphql-custom-types]库,其中包含了很多自定义类型。

[构建自定义类型](https://ccwgs.blog.csdn.net/article/details/103714267)

4. 列表列表通过使用方括号包裹 GraphQL 类型创建。

```js
type User{
  githubLogin: ID!
  name: String
  avatar: String
  postedPhotos:[Photo!]!
  inPhotos:[Photo!]!
}
```

| 列表声明 | 定义                   | 无效实例     |
| -------- | ---------------------- | ------------ |
| [Int]    | 可空的整数值列表       | 非整数       |
| [Int!]   | 不可空的整数值列表     | [1,null]     |
| [Int]!   | 可空的整数值非空列表   | null         |
| [Int!]!  | 不可空的整数值非空列表 | null、[null] |

5. 联合类型

和 TS 类似,它也是用来返回几种不同类型之一。

```js
union AgendaItem=StudyGroup| Workout
type StudyGroup{
    name: String!
    subject: String!
    students: [User!]!
}
type Workout {
    name:String!
    reps:Int!
}
type Query{
    agenda:[AgendaItem!]!
}
```

书写查询语句如下:

```js
query schedule{
    agenda{
        ...on Workout{
            name
        }
        ...on StudyGroup{
            name
            subject
            students
        }
    }
}

```

6. 接口接口是一种抽象类型,它可以由对象类型实现。接口规范了 Schema 中的代码,确保了某些类型总是包含特定字段，无论它返回什么类型这些字段都是可查询的。

```js
scalar DataTime

interface AgendaItem{
    name: String!
    start: DateTime!
    end: DateTime!
}

type StudyGroup implements AgendaItem{
    name: String!
    start: DateTime!
    end: DateTime!
    topic: String
}

type Workout implements AgendaItem{
    name: String!
    start: DateTime!
    end: DateTime!
    reps: Int!
}
```

7. 参数通过 loginId 查询某一个用户信息。

```js
type Query{
  User(login:ID!):User
}
```

8. 输入类型输入类型与 GraphQL 对象类型很相似,不过它仅仅是用于输入参数和规范输入参数。

```js
input PostPhotoInput {
  name: String!
  category: PhotoCategory = SELFIE
  description: String
}
type Mutation {
    postPhoto(input: PostPhotoInput!): Photo!
}
```

9.  返回类型比如我们要使用 gitHub 授权(GitHub OAuth)登录时,当发送有效授权码进行身份验证。如果成功，我们将返回一个自定义类型该类型包含登录用户信息、以及 token。

```js
type AuthPayload {
  token: String!
  user: User!
}

type Mutation{
    githubAuth(code:String!):AuthPayload!
}
```

10. 订阅类型我们添加一种订阅类型,通过它用户可以创建新的 Photo 或 User 类型。当发布照片时，新照片将推送给所有已订阅 newPhoto 的用户。

```js
type Subscription {
    newPhoto:Photo!
    newUser: User!
}
```

11. 查询与变更

```js
type Query{
    ...
}
type Mutation{
    ...
}
```

# 搭建 Server API 环境

> npm i apollo-server npm i typescript ts-node-dev -D

`package.json`

```js
  "scripts": {
    "dev": "ts-node-dev --respawn --transpileOnly ./src/index.ts",
  },
```

```js
import { ApolloServer } from 'apollo-server';

const typeDefs = `
    enum PhotoCategory {
        SELFIE
        PORTRAIT
        ACTION
        LANDSCAPE
        GRAPHIC
    }

    type Photo {
        id: ID!
        url: String!
        name: String!
        description: String
        category: PhotoCategory!
    }

    type Query{
        totalPhotos:Int!
        allPhotos: [Photo!]!
    }

    input PostPhotoInput {
        name: String!
        category: PhotoCategory=SELFIE
        description: String
    }

    type Mutation {
        postPhoto(input: PostPhotoInput!):Photo!
    }
`;
//_id 模拟数据自增ID
let _id = 0;
const photos = [];

const resolvers = {
  Photo: {
    url: (parent) => `http://https://blog.ccwgs.top/img/${parent.id}.jpg`,
  },
  Query: {
    totalPhotos: () => photos.length,
    allPhotos: () => photos,
  },
  Mutation: {
    postPhoto(_, args) {
      const newPhoto = {
        id: _id++,
        ...args.input,
      };
      photos.push(newPhoto);
      return newPhoto;
    },
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

//开启服务监听 默认4000端口
server
  .listen()
  .then(({ url }) => console.log(`GraphQL Service running on ${url}`));
```

> npm start 打开 连接 http://localhost:4000

![运行实例图](./images/demo1.png)

喜欢 ts 伙伴可以查看 👉[使用 node+typescript 搭建 GraphQL API](https://ccwgs.blog.csdn.net/article/details/103701560)

# 服务端开发

基于上面环境搭建将 `apollo-server`更换`apollo-server-express`

> npm i apollo-server-express graphql express mongoose ncp dotenv node-fetch npm i typescript ts-node-dev -D

`package.json`

```js
  "scripts": {
    "build": "tsc && ncp src/schema  dist/schema ",
    "clear": "rimraf dist/",
    "start": "npm run clear && npm run build && node  ./dist/index.js"
  },
```

构建结构

```
src
├── index.ts    //入口
├── lib         //工具库
│   └── index.ts
├── resolvers   //解析器
│   ├── Mutation.ts
│   ├── Query.ts
│   ├── Type.ts
│   ├── index.ts
│   └── types.ts
└── schema
    └── typeDefs.graphql
```

重写构建服务如下:

```js
import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import expressPlayground from 'graphql-playground-middleware-express';
import * as mongoose from 'mongoose';
import * as path from 'path';
import resolvers from './resolvers';
import { readFileSync } from 'fs';

const typeDefs = readFileSync(
  path.resolve(__dirname, './schema/typeDefs.graphql'),
  'UTF-8',
);

async function start() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
  });

  server.applyMiddleware({ app });

  app.get('/', (req, res) => {
    res.send('Welcome to the PhotoShare API');
  });

  app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

  app.listen({ port: 4000 }, () => {
    console.log(
      `GraphQL server running @ http://localhost:4000${server.graphqlPath}`,
    );
  });
}

start();
```

## 连接数据库

[mongodb 安装与使用](https://blog.csdn.net/qq_37674616/article/details/86680680)

1. 创建.env 文件

```
DB_HOST=mongodb://localhost:27017/<Your-DataBase-Name>
```

2. 连接数据库并创建上下文

```js
require('dotenv').config()
function start(){
// ....
//  const app = express();
 const MONGO_DB = process.env.DB_HOST;
    let db;

    try {
       const client= await mongoose.connect(MONGO_DB!,
            { useNewUrlParser: true }
        )

       db=client.connection.db
    } catch (error) {
        console.log(`

        Mongo DB Host not found!
        please add DB_HOST environment variable to .env file
        exiting...

      `)
        process.exit(1)
    }
    const context = { db }; //创建上下文
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context
    })
 //...
}

```

## 修改解析器(从数据库中获取数据)

shema 如下：

```js
type Query{
    totalPhotos:Int!
    allPhotos: [Photo!]!
}
```

```js
//resolves/Query.ts

const totalPhotos: Fn = (_, arg, { db }) =>
  db.collection('photos').estimatedDocumentCount();

const allPhotos: Fn = (parent, args, { db }) =>
  db.collection('photos').estimatedDocumentCount();
```

## github OAuth

[OAuth 介绍与使用](https://blog.csdn.net/qq_37674616/article/details/99496916)

1. 构建请求函数

```js
//lib/index.ts

import fetch from 'node-fetch';

type ReqGithub = {
  client_id: string,
  client_secret: String,
  code: String,
};

const requestGithubToken = (credentials: ReqGithub) =>
  fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then((res) => res.json());

const requestGithubUserAccount = (token: string) =>
  fetch(`https://api.github.com/user?access_token=${token}`).then((res) =>
    res.json(),
  );

export const authorizeWithGithub = async (credentials: ReqGithub) => {
  const { access_token } = await requestGithubToken(credentials);
  const githubUser = await requestGithubUserAccount(access_token);
  return { ...githubUser, access_token };
};
```

2. 创建 shema

```js
//schema/typeDefs.graphql

type AuthPayload {
  token: String!
  user: User!
}
type Mutation {
    ...
    githubAuth(code:String!):AuthPayload!
}
```

3. 构建解析器

```js
//resolvers/Mutation.ts

const githubAuth:Fn=async(parent,{code},{db})=>{

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
```

1. 测试

> https://github.com/login/oauth/authorize?client_id=**&scope=user

github 重定向地址 http://localhost:3000/oauth?code=\*\*\*

```js
mutation github{
  githubAuth(code: "***"){
    token
    user{
      githubLogin
      name
      avatar
    }
  }
}
```

### 根解析器解析 token

我们通过根解析器解析 token 返回用户信息,如果无效则返回 null。

```js
//src/index.ts

// const context = { db };
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const githubToken = req.headers.authorization;
    const currentUser = await db.collection('users').findOne({ githubToken });
    return { db, currentUser };
  },
});
```

```js
//schema/typeDefs.graphql

type Query {
  me:User
}
```

```js
//resovles/Query.ts

const me: Fn = (_, args, { currentUser }) => currentUser;
```

测试

```js
query getCurrentUser{
  me{
    githubLogin
    name
    avatar
  }
}
```

# 参考

[intro-to-graphql](https://slides.com/scotups/intro-to-graphql#/) [grapQL](https://graphql.cn/learn/)

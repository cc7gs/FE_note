案例运用原生node.js 开发登录模块。
- 项目运行
  -  项目运行后 将初始化用户 在 config/initUser中
  - npm run dev
-  项目知识点
 - 在登录中，将用户id 存储在cookie中，将用户名等敏感信息存储在服务端session中
 - session存储服务端，由于反复操作 因此将原本session信息存储到redis中
 - 信息存储采用了 mongoDB 

- 为什么session存储到Redis
  **问题:**
  1. session信息 存储在内存中，如果程序重启则重置
  2. 内存有限，重复访问则内存消耗过大
  3. 多进程之间内存不能共享，因此session存储


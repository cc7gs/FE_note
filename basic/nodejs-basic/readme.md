> 这是一个学习nodeJs 笔记仓库,通过书籍和实践总结出一个手册,如有错误可以击提issue 💪,如果觉得ok,请点个star 🙏, `送人玫瑰、手有余香`

# 目录
1. [nodeJs能做什么?](#nodejs能做什么?)
2. [nodeJsAPI](#nodeJS基础API)
3. [GraphQL](#GraphQL)
4. [框架](#框架)
5. [案例](#案例)

# nodejs能做什么？
- 构建工具(比如 自动化，webpack...)
- API(REST,即时通讯)
- CDNs
- 共享库
- 桌面应用
- 物联网（IOT）
- ...


# nodeJS基础API
- Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。
- Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型。
- Node 是一个让 JavaScript 运行在服务端的开发平台，它让 JavaScript 成为与PHP、Python、Perl、Ruby 等服务端语言平起平坐的脚本语言。


V8：Google 推出的 Javascript VM，也是 Node.js 为什么使用的是 Javascript 的关键，它为 Javascript 提供了在非浏览器端运行的环境，它的高效是 Node.js 之所以高效的原因之一。

总结：
1. Node.js 通过 libuv 来处理与操作系统的交互，并且因此具备了异步、非阻塞、事件驱动的能力。
2. Node.js 实际上是 Javascript 执行线程的单线程，真正的的 I/O 操作，底层 API 调用都是通过多线程执行的。
3. CPU 密集型的任务是 Node.js 的软肋

关于NodeJs 常用API 👇这里

[nodeJS基础API](./node.basic.md)

[NodeJs揭秘 初识单线程的NodeJs](https://fed.taobao.org/blog/taofed/do71ct/deep-into-node-1/?spm=taofed.blogs.blog-list.6.78825ac80hBJas):推荐阅读🌟🌟🌟🌟

# GraphQL
是一种 API 查询语言也是一种用于实现数据查询的运行时。有一下特点:
 - facebook 开源
 - 提高开发速度。可以减少发出的请求数，因此页降低了服务器压力，加快了前端的渲染速度。
 - 客户端就可以明确选择它们想要哪些内容
 - 强类型类似typescript
 - 它让从多个数据源汇总取数据变得更简单

[graphQL](./framework/graphql-photo-api/README.md)

## GraphQL API 工具
[graphQL playground](https://www.graphqlbin.com/)
[graphiQL](https://github.com/graphql/graphiql)
[graqhQL公共接口](https://github.com/APIs-guru/graphql-apis)
[Snowtooth](http://snowtooth.moonhighway.com/)

# 框架
  - [mvc分层思路](./framework/user-mvc)
  - [express](./framework/express-demo/README.md)

# 案例
  - [文件上传案例](./demo/fileUpload/) 
  - [登录模块案例](./demo/login/) 
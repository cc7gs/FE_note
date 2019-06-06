const httpService = require('../service/home')
module.exports = {
  index: async (ctx, next) => {
    ctx.response.body = '<h1>index page</h1>'
  },
  user: async ctx => {
    ctx.response.body = `
  <form action='/user/login' method="post">
  <input type="text" name="name" placeholder='请输入用户名: cc'/>
  <br/>
  <input type="password" name="password" placeholder='请输入密码: 123456'/>
  <br/>
  <button>Go login</button>
  </form>
  `;
  },
  login: async ctx => {
    console.log(ctx.request.body)
    let { name, password } = ctx.request.body;
    let data = await httpService.login(name, password)
    ctx.response.body = data;

  }
}
const router = require('koa-router')();
const homeController = require('./controller/home');
module.exports = (app) => {
  router.get('/', homeController.index);
  router.get('/user', homeController.user);
  router.post('/user/login', homeController.login);
  app.use(router.routes(), router.allowedMethods());
};

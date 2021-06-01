const http = require('http');
const url = require('url');
let router = [];
class Application {
  get(path, handler) {
    router.push({
      path,
      method: 'get',
      handler,
    });
  }
  listen(...arg) {
    http
      .createServer((req, res) => {
        let { pathname } = url.parse(req.url, true);

        router.forEach((route) => {
          if (route.path === pathname) {
            route.handler(req, res);
            return;
          }
        });
      })
      .listen(...arg);
  }
}
module.exports = function (config) {
  return new Application();
};
const app = new Application();

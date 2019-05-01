const handleUserRouter = require('./router/user');
const queryString = require('querystring');
const { SuccessModel, ErrorModel } = require('./utils/resModel');
const { setCookieTime } = require('./utils/date')
const getPostData = require('./utils/postHandle');
//全局session
const SESSION_DATA = {}
const serverHandle = (req, res) => {
  //设置返回值类型
  res.setHeader('Content-type', 'application/json');
  //解析url
  const url = req.url;
  req.path = url.split('?')[0];
  //解析 query
  req.query = queryString.parse(url.split('?')[1]);

  //解析 cookie
  req.cookie = {}
  cookieStr = req.headers.cookie || ''; //username=cc; password=123; 
  cookieStr.split('; ').forEach(item => {
    if (!item) return;
    const arr = item.split('=');
    const key = arr[0];
    const value = arr[1];
    req.cookie[key] = value;
  });
  //解析 session
  let userid = req.cookie.userid || '';
  let needSetCookie = false; //判断是否需要设置cookie
  if (userid) {
    if (!SESSION_DATA[userid]) {
      SESSION_DATA[userid] = {}
    }
  } else {
    needSetCookie = true;
    userid = `${new Date().getTime()}_${Math.random()}`;
    SESSION_DATA[userid] = {}
  }
  req.session = SESSION_DATA[userid]
  //处理post body
  getPostData(req).then(postData => {
    req.body = postData;
    const userResult = handleUserRouter(req, res)
    if (userResult) {
      userResult.then(userdata => {
        if (needSetCookie) {
          /**
         * 操作cookie
         * 禁止客户端修改 httpOnly
         * 最大有效日期 expires  时间格式为 GMT
         */
          res.setHeader('Set-Cookie', `userid=${userid}; path=/; httpOnly; expires=${setCookieTime(24 * 60 * 60 * 1000)}`);
        }
        res.end(JSON.stringify(userdata));
      });
      return;
    }
    //处理未命中路由
    res.writeHead(404, { 'Content-type': 'text/plain' });
    res.end('404 not found');
  })
}
module.exports = serverHandle

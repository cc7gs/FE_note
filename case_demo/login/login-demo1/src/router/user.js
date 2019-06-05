const { Login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../utils/resModel');
const {set,get}=require('../db/redis')

const handleUserRouter = (req, res) => {
  const { method, path } = req;
  //登录请求
  if (method === 'GET' && req.path === '/api/login') {
    const result = Login({ ...req.query });
    return result.then(data => {
      if (data.username) {
        req.session.username=data.username;
        set(req.sessionId,req.session);
        return new SuccessModel(data);
      }
      return new ErrorModel(data);
    }).catch(err => {
      console.log('loign err', err);
    })
  }
  //测试
  if (method === 'GET' && req.path === '/') {
    if (req.session.username) {
      console.log(req.session,'session');
      
      return Promise.resolve(new SuccessModel({ session: req.session }, '测试'))
    }
    return Promise.resolve(new ErrorModel('尚未登录'))
  }

}
module.exports = handleUserRouter;
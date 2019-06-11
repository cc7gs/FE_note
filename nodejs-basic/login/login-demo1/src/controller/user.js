const User = require('../schema/user');
const Login = ({ username = '', password = '' }) => {
  return new Promise((resolve, reject) => {
    if (username) {
      const queryUser = User.findOne({ username: username })
      queryUser.then(user => {
        if (!user) {
          resolve('该用户不存在！');
          return;
        }
        if (user.password === password) {
          resolve(user);
          return;
        }
        resolve('密码不正确')
      }).catch(err => {
        console.log('user findOne', err);
      })
      return;
    }
    resolve('请参数格数不对..')
  })

}

module.exports = {
  Login
}
const User = require('../schema/user');
const config = {
  username: 'cc',
  password: '123'
}
const initUser = () => {
  var findUser = User.find({ username: config.username });
  findUser.then(res => {
    console.log(res, 'findUser');
    if (res.length === 0) {
      const newUser = new User(config);
      const saveUser = newUser.save();
      saveUser.then(doc => {
        console.log(`${doc.username} save ok`, doc);
      }).catch(err => {
        console.log('save user error', err);
      })
    }
  })
}
module.exports = initUser;
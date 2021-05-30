module.exports={
  login:async (name,pwd)=>{
    let data;
    if (name === 'cc' && pwd === '123456') {
      data = `Hello ${name}!`;
    } else {
      data = '账号密码错误!';
    }
    return data;
  }
}
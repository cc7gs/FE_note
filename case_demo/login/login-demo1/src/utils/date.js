module.exports={
  /**
   * 设置cookie 过期时间
   * date 时间戳 单位毫秒
   *  */
  setCookieTime:(date)=>{
    const d=new Date();
    d.setTime(d.getTime()+date);    
    return d.toGMTString()
  }
}
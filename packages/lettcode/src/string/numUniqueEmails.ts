/**
 * 929. 独特的电子邮件地址
 * "alice.z@leetcode.com” 和 “alicez@leetcode.com” 会转发到同一电子邮件地址
 *  m.y+name@email.com 将转发到 my@email.com。
 */

/**
 * 方案一
 * @description 根据规则对本地名称转换，然后通过组合邮箱放到set中
 * @parm {string[]} emails
 * @return {number}
 */
 const solutionOne=(emails: Array<string>) => {
  const set = new Set();
  emails.forEach(email => {
    const [localName, domain] = email.split('@');
    const newLocalName = localName.split('+')[0].split('.').join('');
    set.add(`${newLocalName}@${domain}`);
  })
  return set.size
}

export default (emails:Array<string>)=>{
  return new Set(emails.map(email=>{
    let [localName, domain] = email.split('@');
    if(localName.indexOf('+')===-1){
      localName=localName.replace(/\./g,'');
    }else{
      localName=localName.split('+')[0].replace(/\./g,'');
    }
    return `${localName}@${domain}`;
  })).size;
}

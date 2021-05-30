/**
 * 传输都是以字节为单位
 * 1字节 ==> 8 bit
 * uft8中 三个字节表示一个字符
 */

function bufferConcat() {
  // 1. 通过长度声明, 声明5个字节
  const buffer = Buffer.alloc(5);
  const buffer1 = Buffer.from('吴晨');
  console.log(buffer);
  console.log(buffer1);

  //2. 拼接buffer
  const finalBuffer = Buffer.concat([buffer1, buffer]);

  console.log('final', finalBuffer)
}



function concat(list, length) {
  const curLength = length || list.reduce((acc, cur) => acc + cur.length, 0);
  const buffer = Buffer.alloc(curLength);
  let offset = 0;
  list.forEach(bf => {
    bf.copy(buffer, offset);
    offset += bf.length;
  });
  return buffer.slice(0, offset);
}
function split(sep,source){
  const sepLen=Buffer.from(sep).length;
  const arr=[];
  let offset=0,curIndex=0;
  while((curIndex=source.indexOf(sep,offset))!==-1){
    arr.push(source.slice(offset,curIndex));
    offset=sepLen+curIndex;
  }
  arr.push(source.slice(offset))
  return arr;
}
function test() {
  const buffer = Buffer.from('我是吴晨晨,my name is wu chen chen');
  // console.log(buffer.indexOf('晨',0))
  console.log(split('晨',buffer).map(item=>item.toString()));
}
// test();
const res='name="wuchenchen"hahh'.replace(/name="(.+?)"(.+)/,(match,p1)=>p1)
console.log(res)


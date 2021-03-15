/**
 * 传输都是以字节为单位
 * 1字节 ==> 8 bit
 * uft8中 三个字节表示一个字符
 */

// 1. 通过长度声明, 声明5个字节
const buffer = Buffer.alloc(5);
const buffer1 = Buffer.from('吴晨');
console.log(buffer);
console.log(buffer1);

//2. 拼接buffer
const finalBuffer = Buffer.concat([buffer1, buffer]);

console.log('final', finalBuffer)


function concat(list, length){
  const curLength = length || list.reduce((acc, cur) => acc + cur.length, 0);
  const buffer = Buffer.alloc(curLength);
  let offset = 0;
  list.forEach(bf => {
    bf.copy(buffer, offset);
    offset += bf.length;
  });
  return buffer.slice(0, offset);
}

function getSuffixName(fileName){
  let nameList=fileName.split('.');
  console.log(nameList,'suffixName');
  return nameList[nameList.length-1]
}
module.exports={
  getSuffixName
}

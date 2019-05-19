import './index.css'
const root=document.getElementById('root');
const imgsrc=require('./project.png') ;

console.log(imgsrc,'image ');
console.log('xxx');
// import imgsrc from './project.png'
const newImage=new Image();
newImage.src=imgsrc;
newImage.classList.add('img');
document.body.appendChild(newImage);
root.innerHTML=`<div class='iconfont icon-csdn'><div>`
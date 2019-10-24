# css 知识梳理
## css 基础
### 关于 line-height
1. 行高由 line-box 决定，当是line-box高度是line-height最高者
```html
    <style>
    .text{
        background:blue;
    }
    .text span + span{
        line-height: 30px;
    }
    .text span:last-child{
        line-height: 40px;
        font-size:20px;
    }
    </style>

    <div class="text">
        <span>h1 box</span>
        <span>h2 box</span>
        <span>h3 box</span>
    </div>
```
 1. `.text` 高度为 40px;
 2. 当line-height为字体高时，此时字体居中显示
 3. 当字体大小不一致时,此时是按`baseline`对齐(即字体底部),若要此时字体对齐需要都设置 `vertical-align:middle` 

2. 图片和文字显示时，图片距离底部由缝隙？
```html
<style>
 .image{
        background: orange;
    }
</style>
 <div class="image">
        <span>text image..</span>
        <img src="https://tse2-mm.cn.bing.net/th?id=OIP.AuVMA21FXKpPXBnHYLTsIgHaFj&w=174&h=130&c=7&o=5&pid=1.7"/>
    </div>
```
1. 图片基于 `baseline` 对齐,因此和文字显示距离底部会有缝隙
2. 图片采用 `vertical-align`或者设置`display:block`可以去除间隙 
### border
1. border 添加图片
```css
.border{
    border:30px solid transparent; //边框透明
    border-image:url(xxx) 30 round; // 30 表示位移距离  round：让中间距离被图片均分
}
```
2. border 图像变化
2.1 css 边框交接处是斜切,因此我们可以通过让左边边透明来实现梯形
```css
.border{
     width: 100px;
     height: 100px;
    border-bottom:30px solid blue;
    border-left:30px solid transparent;
    border-right:30px solid transparent;
}
```
2.2 此时我们将 `with`不断减少梯形上边也会不断减少直到为 `0`时就成了三角形
```css
.border{
    width: 0;
    height: 100px;
    border-bottom:30px solid blue;
    border-left:30px solid transparent;
    border-right:30px solid transparent;
}
```
2.3 此时我们加入圆角后，会成为`扇形`
```css
.border{
/* 此处为2.2内容 */
border-radius: 50%;
}
```
### 文字折行
- overflow-wrap(word-wrap) 通用换行控制,是否保留单词
- word-break 针对多字节文字
- white-space 空白处是否断行 
```css
.txt{
    /* 单词超出文本换行 */
    overflow-wrap:break-word;
}
.txt{
    /* 所有超出范围的换行 */
    word-break:break-all;
}
.txt{
    /* 表示文字不换行 */
    white-space:nowrap;  
}
```
### 伪元素和伪类区别
- 伪类表示 状态比如： link,hover;使用单冒号 
- 伪元素表示真的元素比如： after,before;使用双冒号

## css 效果
### box-show
该属性可以让几乎所有元素的边框产生阴影。如果元素同时设置了 border-radius ，阴影也会有圆角效果。
```html
<style>
    .box{
        /* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
        box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
        
        /* 插页(阴影向内) | x偏移量 | y偏移量 | 阴影颜色 */
        box-shadow: inset 5em 1em gold;

        /* 任意数量的阴影，以逗号分隔 */
        box-shadow: 3px 3px red, -1em 0 0.4em orange;
    }
</style>

```
###  text-show
```html
<style>
    .box{
         /* x偏移量 | y偏移量 | 阴影模糊半径| 阴影颜色 */
        text-shadow: 1px 1px 2px black; 

        /* x偏移量 | y偏移量  | 阴影颜色 */
        text-shadow: 5px 5px #558abb;
    }
</style>
```
### border-radius
```html
<style>
.box-radius{
    width: 100px;
    height: 100px;
    background-color: blue;
    /* top-left | top-right| bottom-left| bottom-right  */
    border-radius: 100% 0 0 0; 
}
</style>
```
### clip-path
创建一个只有元素的部分区域可以显示的剪切区域。区域内的部分显示，区域外的隐藏。
```html
<style>
.box-border{
    width: 300px;
    height: 300px;
    border:1px solid blue;
    background-color: orange;
    /* 在容器中间裁剪一个 100px * 100px 图形 */
    clip-path: inset(100px 100px); 

    /* 添加过渡动画 */
    transition:clip-path .4s;
}
.test{
 /* 在容器 30% * 30% 位置创建一个 10% 圆形  (默认会在 50% * 50%)*/ 
 clip-path:circle(10% at 30% 30%);
 /* 在原图形上x,y 基础上 创建 （50%,0）(100%,50%）(50%,50%）三个点然后形成封闭图形 */
 clip-path:polygon(50% 0,100% 50%,50% 50%)
}
</style>


```
### transform
属性允许你旋转，缩放，倾斜或平移给定元素。这是通过修改CSS视觉格式化模型的坐标空间来实现的
```html
<style>
.box-tranform{
    /* 水平方向 x移动100px,y移动 40px */
    transform: translate(100px, 40px);
    /* 顺时针旋转 30度 */
    transform: rotate(30deg);
    /* x,y同时缩放50% */
    transform:scale(0.5);
    /* x斜切30度，y斜切50度 */
    transform:skew(30deg,50deg);
}
</style>
```
#### 构建3D效果 
```html
<style>
 .container-cue{
     /* 父容器 设置透视距离 */
    perspective: 500px;
}
.cue{
    /* 子元素设置 transform-style */
    transform-style: preserve-3d;
    /* 元素效果变换 */
    transform: rotateZ(30deg);
}
</style> 
<div class="container-cue">
    <div class="cue">

    </div>
</div>

```
#### 3D立方体
```html
<style>
.container-cue{
    width: 200px;
    height: 200px;
    border:1px solid red;
    padding: 10px;
    perspective: 500px;
}

.cue{
    width: 200px;
    height: 200px;
    transform-style: preserve-3d;
    transform: translateZ(-100px); 
    /* background-color: orange; */
    position: relative;
    transition: transform 3s;
}
.cue:hover{
    transform: translateZ(-100px) rotateX(90deg) rotateY(90deg);
}
.cue div{
    width: 200px;
    height: 200px;
    line-height: 200px;
    font-size: 50px;
    position:absolute;
    text-align: center;
}
.front{
    background:rgba(255, 0, 0, .3);
    transform: translateZ(100px)
}
.back{
    background: rgba(0,255,0, .3);
    transform: translateZ(-100px) rotateY(180deg)
}
.left{
    background: rgba(0,255,255, .3);
    transform: translateX(-100px) rotateY(-90deg);
}
.right{
    background: rgba(0,255,255, .3);
    transform: translateX(100px) rotateY(90deg);
}
.top{
    background: rgba(100, 100, 100, .4);
    transform: translateY(-100px) rotateX(-90deg);
}
.bottom{
    background: rgba(100, 70, 0, .4);
    transform: translateY(100px) rotateX(90deg);
}
</style>
 <div class="container-cue">
    <div class="cue">
        <div class="front">1</div>
        <div class="back">2</div>
        <div class="left">3</div>
        <div class="right">4</div>
        <div class="top">5</div>
        <div class="bottom">6</div>
    </div>
</div>
```

## css 动画

---
title: css基础
nav:
  title: 基础篇
  path: /basic
group:
  title: css基础篇
  path: /css-basic
  order: 1

---
# css 知识梳理
## css 基础
### 标准模型区别IE模型
- 标准盒模型width/height是内容区域width/height
- IE盒模型 width/height 包含border+padding
IE模型： width=border+padding+width     

### 设置盒模型？

box-sizing:content-box; //标准盒模型
box-sizing:border-box; //IE盒模型
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
## 布局
决定布局方式的主要是`position`、`float`、以及css3新增的`display`属性的grid、flex值。下面介绍基本用法，关于更多面试相关👉[布局相关面试题](/interview/interview-case/readme.md)

### float
采用浮动布局后,会使父元素内容塌陷,此时一定记住要清除浮动
```html
<style>
/* 父元素清除浮动 */
.row::after{
    content:''; 
    display:table;
    clear:both;
}
.col-2{
    float:left;
    width:44%;
    margin-left:4%;
    margin-right:0;
}
</style>
<div class="row">
    <div class="col-2"></div>
    <div class="col-2"></div>
</div>
```
** 这里除了使用`table`元素外还可以使用`flow-root`效果相同，或者采用其它形成BFC方案`overflow`,`inline-bolck`,`block`等，当由于这些在生产中会产生副作用，建议采用前面方案。 

### flex
#### 属性
##### Parent (Flex Container)
- display：flex | inline-flex
- flex-direction: row | row-reverse | column | column-reverse
- flex-wrap:wrap | nowrap | wrap-reverse
- flex-flow: (是 flex-direction和flex-wrap 简写)
- justify-content(主轴): flex-start | flex-end | center | space-between | space-around | space-evenly;
- align-items(交叉轴 每个flex元素对齐方式):flex-start | flex-end | center | baseline | stretch
- align-content(交叉轴 多行时每行对齐方式):flex-start | flex-end | center | stretch | space-between | space-around;
  
##### Children (Flex Items)
- order:<integer> 
- flex-grow: <number>
- flex-shrink: <number>; 
- flex-basis: <length> | auto;
- flex:是（grow, shrink, and basis）简写 默认（0 1 auto）
- align-self: 覆盖在父级上面的对齐方式

### grid
#### 属性
##### Parent (Grid Container)
- 	display: grid | inline-grid;
- grid-template-columns、grid-template-rows:基于网格列的纬度去定义定义网格线名称和尺寸  <size>| <repeat>

```css
.myClass {
    grid-template-columns: [col1] 40px [col2] 3fr;
    grid-template-rows: 50% 25vh auto;
}

.anotherClass {
    grid-template-rows: repeat(2, 350px [name]) 10%;
}
/* 等价 */
.anotherClass {
    grid-template-rows: 350px [name] 350px [name] 10%;
}
```
- grid-template-areas:是网格区域 grid areas 在CSS中的特定命名。通过选择器命名区域。 然后通过此属性指定布局。 必须为每个列/行指定区域名称。
```css
.wrapper {
    grid-template-columns: 1fr 3fr;
    grid-template-rows: auto;
    /*1. 定义行和列数 与区域名称（2*4）*/
    /* [.]表示空出此行 */
    grid-template-areas: 
    "header header header header"
    "aside . article article";
}
/* 2. 指定区域 */
.class1 {
    grid-area: header;
}
.class2 {
    grid-area: article;
}
.class3 {
    grid-area: aside;
}
```
- grid-template:是 grid-template-rows, grid-template-columns, and grid-template-areas 缩写
- grid-column-gap:<number> 列间距
- grid-row-gap:<number> 行间距
- grid-gap: grid-column-gap and grid-row-gap缩写
- justify-items:align grid items 行轴对齐 start | end | center | stretch(default);
- align-items:align grid items 纵轴对齐 start | end | center | stretch(default);
- justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
- align-content:  start | end | center | stretch | space-around | space-between | space-evenly;
- grid-auto-columns、grid-auto-rows: <track-size>;

##### Children (Grid Items)
- 	grid-column-start
	grid-column-end
	grid-row-start
	grid-row-end: <number> | <name> | span <number> | span <name> | auto;

```css
.class1 {
    grid-column-start: 1;
    grid-column-end: span 4;
    grid-row-start: 3;
    grid-row-end: span footer-end;
}
```
- grid-column
	grid-row: <start-line> / <end-line> | <start-line> / span <value>;

```css
.class1 {
    grid-column: 1 / span 4;
    grid-row: 3 / span footer-end;
}	
```
- grid-area:  <name> | <row-start> / <column-start> / <row-end> / <column-end>;
有两种名称grid-area:1. 使用区域名称;2. 使用 <row-start> / <column-start> / <row-end> / <column-end>
```css
.class1 {
    grid-area: 1 / name3 / namedline / 4;
}
```
- justify-self:覆盖 justify-items.  start | end | center | stretch;
- align-self:覆盖 align-items. start | end | center | stretch;

**练习:**通过grid 布局让下面html 在不同设备下展示不通的排版
```css
.wrapper {
	display: grid;
	grid-gap: 10px;
	font-family: Arial, sans-serif;
}
.wrapper > * {
	padding: 1em;
	border-radius: 1em;
}
header {
	background-color: blue;
	color: white;
}
article {
	background-color: green;
	color: white;
}
aside {
	background-color: yellow;
}
@media (min-width: 650px) { 
	header {
		grid-column: 1 / 2;
		grid-row: 2 / 3;
	}
	article {
		grid-column: 1 / 2;
		grid-row: 1 / 2;
	}
	aside {
		grid-column: 2 / 3;
		grid-row: 1 / 3;
	}
}
@media (min-width: 1000px) { 
	header {
		grid-column: 2 / 3;
		grid-row: 1 / 2;
	}
	article {
		grid-column: 2 / 3;
		grid-row: 2 / 3;
	}
	aside {
		grid-column: 1 / 2;
		grid-row: 1 / 3;
	}
}
```
```html
<div class="wrapper">
		<header>
			<h1>My Fine Header</h1>
		</header>
		<article>
			<h2>Article Title</h2>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci laborum, ex tempora esse fuga consequuntur dolores excepturi, eaque quis incidunt?</p>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci laborum, ex tempora esse fuga consequuntur dolores excepturi, eaque quis incidunt?</p>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci laborum, ex tempora esse fuga consequuntur dolores excepturi, eaque quis incidunt?</p>
		</article>
		<aside>
			<h3>My Aside</h3>
			<blockquote>
				A fine quote!
			</blockquote>
		</aside>
	</div>
```

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

## css 工程化
### postCSS
它是一款很好的css转换工具。本身只具有解析的能力,凭借强大的插件生态可以很好对css进行转换，例如：autoprefixer,cssnano,cssnext以及CSS Modules。
[https://github.com/postcss/postcss#usage](https://github.com/postcss/postcss#usage)

### webpack
- css-loader css变成js
- style-loader 将 css 引入 head
- ExtractTextPlugin 将css从js提取出来
- css modules 解决css变量名称冲突
- Postcss-loader Postcss 处理
...


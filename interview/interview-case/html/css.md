# 标准模型区别IE模型
- 标准盒模型width/height是内容区域width/height
- IE盒模型 width/height 包含border+padding
IE模型： width=border+padding+width        
## 设置盒模型？
box-sizing:content-box; //标准盒模型
box-sizing:border-box; //IE盒模型
# 什么是BFC？

## BFC简介
BFC(Block Formatting Context)是Web页面中盒模型布局的CSS渲染模式。它的定位体系属于常规文档流。摘自W3C：
>浮动，绝对定位元素，inline-blocks, table-cells, table-captions,和overflow的值不为visible的元素，（除了这个值已经被传到了视口的时候）将创建一个新的块级格式化上下文。

一个BFC是一个HTML盒子并且至少满足下列条件中的任何一个：
- 根元素或包含根元素的元素
- float的值不为none
- position的值不为static或者relative
- display的值为 table-cell, table-caption, inline-block, flex, 或者 inline-flex中的其中一个
- overflow的值不为visible
BFC 即 Block Formatting Contexts (块级格式化上下文)，它属于上述定位方案的普通流。

**具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。**
## BFC可以的解决问题
###  消除浮动
**清除浮动**
```
<div className="box">
  <div className="float">I am a floated box!</div>
  <p>I am content inside the container.</p>
</div>
.box {
  background-color: rgb(224, 206, 247);
  border: 5px solid rebeccapurple;
  display: flow-root; //它可以创建无副作用的BFC
}

.float {
  float: left;
  width: 200px;
  height: 150px;
  background-color: white;
  border:1px solid black;
  padding: 10px;
}    
```
### 防止文字环绕
```html
<div class="container">
  <div class="floated">Floated div</div>
  <p>Quae hic ut ab perferendis sit quod architecto,dolor debitis quam rem provident aspernatur tempora expedita.</p>
</div>
.container{
  width: 150px;
  background-color: green;
}
.container::after{
  content: ' ';
  border:1px solid red;
  visibility: hidden;
  display: block;
  clear: both;
}
.floated{
  float: left;
  background-color: red;
}
.container p{
  overflow: hidden;
  background-color: aqua;
}
```
### 外边距塌陷
创建新的BFC避免两个相邻 <div> 之间的 外边距合并 问题
```
<div class="blue"></div>
<div class="red-outer">
  <div class="red-inner">red inner</div>
</div>

.blue, .red-inner {
  height: 50px;
  margin: 10px 0;
}

.blue {
  background: blue;
}

.red-outer {
  overflow: hidden; //让其处于BFC
  background: red;
}
.red-inner{
  background: gray;
}

```

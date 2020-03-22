# 两列布局
场景: 一侧固定宽度,另一侧填充剩余宽度。

## 采用内联块级元素

- 相邻两个内联元素存在字体大小间隙，需要给父元素设置字体大小为0消除
- 设置垂直对齐方式来消除基线带来的错乱问题

```html
<!-- html -->
    <div class="wrap">
        <div class="left">left</div>
        <div class="main">main</div>
    </div>

<!-- css -->
<style>
    .left{
        display: inline-block;
        font-size: 12px;
        width:100px;
        margin-left: -100px;
        background-color: lightblue;
        vertical-align: top;
    }
    .main{
        display: inline-block;
        font-size: 14px;
        /* width:100% */
        background-color: orange;
        vertical-align: top;
    }
    .wrap{
        padding-left: 100px;
        font-size: 0;
    }
</style>

```

## 浮动
```html
 <!-- html -->
    <div class="left">left</div>
    <div class="main">main</div>

<!-- css -->
<style>
     .left{
        float: left;
        width:100px;
        background-color: blue;
    }
     .main{
        margin-left: 100px;
        background-color: green;
    }
</style>
```
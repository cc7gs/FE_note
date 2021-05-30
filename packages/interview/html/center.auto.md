---
title: 中间自适应布局
nav:
  title: 面试汇总
  path: /interview
group:
  title: html篇
  path: /html
---

# 中间自适应布局
描述如下： 假定高度已知，请写出三栏布局，其中左栏、右栏宽度各自为300px，中间自适应。

## 一、采用左右浮动
浮动可以使之后的元素忽视本元素的存在(即本元素不占据空间大小)
```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>左右固定中间适应</title>
	<link rel="stylesheet" href="">
	<style>
		*{
			margin:0;
			padding: 0;
		}
		div{
			min-height: 500px;

		}
		.left{
			float: left;
			width: 150px;
			background-color: red;
		}
		
		.center{
			margin: 0 200px  0 150px; /*上 右 下 左*/
			/*margin-left: 150px;
			margin-right: 200px;*/
			background-color: blue;
		}
		.right{
			float: right;
			width: 200px;
			background-color: orange;
		}
	</style>
</head>
<body>
	<div class="container">

		<div class="left"></div>
		<div class="right"></div>
		<div class="center">
			<p>center</p>
		</div>
		
	</div>
</body>
</html>
```
**:该方法 center一定要放到最后，因为如果放到中间center是占据空间的浮动元素则不能上去(除非使用定位元素) 具体做法如下:
```html
<style>
.right{
    /*float: right;*/
    position: absolute;
    right: 0;
    top:0;
    width: 200px;
    background-color: orange;
}
</style>
<div class="container">
    <div class="left"></div>
    <div class="center">
        <p>center</p>
    </div>
    <div class="right"></div>	
</div>
```
## 二、采用定位元素
```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>左右固定中间适应</title>
	<link rel="stylesheet" href="">
	<style>
		*{
			margin:0;
			padding: 0;
		}
		div{
			height: 500px;
		}
		.left,.right{
			position: absolute;
			width: 200px;
			top:0;
		}
		.left{
			left: 0;
			background-color: yellow;
		}
		.center{
			margin: 0 200px;
			background-color: blue;
		}
		.right{
			right:0;
			background-color: orange;
		}
	</style>
</head>
<body>
	<div class="container">

		<div class="left"></div>
		<div class="center">
			<p>center</p>
		</div>
		<div class="right"></div>	
	</div>
</body>
</html>
```
## 三、 圣杯布局
- 优先渲染`center`,因此布局顺序先写 center -->left --> right
- 通过 负margin + 相对定位，解决元素定位问题

问题： 当中间元素宽度小于左边宽度时则发生布局错乱，此时可以采用双飞翼布局。

```html
<!-- html -->
	<div class="container">
		<div class="center column">center...</div>
		<div class="left column">left</div>
		<div class="right column">right</div>
	</div>
<!-- css -->
<style>
	.container{
		padding-left: 200px;
		padding-right: 150px;
	}
	.column{
		float: left;
		position: relative;
	}
	.center{
		background-color:blue;
		width: 100%;
	}
	.left{
		background-color: chartreuse;
		margin-left: -100%;
		width: 200px;
		right: 200px;
	}
	.right{
		background-color: black;
		width: 150px;
		margin-right: -150px;
	}
</style>
```
## 四、双飞翼布局
```html
<!-- html -->
<div class="container">
	<div class="center-wrap column">
		<div class="center">center...</div>
	</div>
	<div class="left column">left.</div>
	<div class="right column">right..</div>
</div>
<!-- css -->
<style>
	  .container{
		position: relative;
	}
	  .container>.column{
		float: left;
	}
	  .center-wrap{
		width: 100%;
	}
	  .center-wrap>.center{
		background-color: yellowgreen;
		margin-left: 200px;
		margin-right: 150px;
	}
	  .left{
		width: 200px;
		margin-left: -100%;
		background-color: #339999;
	}
	  .right{
		width:150px;
		margin-left: -150px;
		background-color: bisque;
	}
</style>
```
## 五、采用flex布局
```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>左右固定中间适应</title>
	<link rel="stylesheet" href="">
	<style>
		*{
			margin:0;
			padding: 0;
		}
		div{
			height:500px;
		}
		.container{
			display: flex;
		}
		.left,.right{
			width: 100px;
		}
		.left{
			background-color: yellow;
		}
		.center{
			flex:1;
			background-color: blue;
		}
		.right{
			background-color: orange;
		}
		
	</style>
</head>
<body>
	<div class="container">

		<div class="left"></div>
		<div class="center">
			<p>center</p>
		</div>
		<div class="right"></div>	
	</div>
</body>
</html>
```
## 六、浮动+负margin
该方法让一个父元素浮动起来充满全屏，然后 让center元素用margin占据空间。此时left采用margin-left:-100%(与wrapwidth相同)就浮动到最右边；right同理。
```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>左右固定中间适应</title>
	<link rel="stylesheet" href="">
	<style>
		*{
			margin:0;
			padding: 0;
		}
		.wrap{
			width: 100%;
			height: 500px;
			background-color: yellow;
			float: left;
		}
		.center{
			margin:0 200px;
			height: 500px;
			background-color: blue;
		}
		.left,.right{
			width: 200px;
			height: 500px;
		}
		.left{
			float: left;
			margin-left: -100%;
			background-color: orange;
		}
		.right{
			float:right;
			margin-left: -200px;
			background-color:#ededed;
		}
		
	</style>
</head>
<body>
	<div class="container">
		<div class="wrap">
			<div class="center">
				<p>center</p>
			</div>
		</div>
		<div class="left"></div>
		<div class="right"></div>	
	</div>
</body>
</html>
```
关于margin负值的应用 请参照该博主的整理:https://www.jianshu.com/p/549aaa5fabaa
## 七、采用table布局
```javascript
  <section class="layout table">
        <style>
            .layout.table .left-center-right{
                width: 100%;
                display: table;
                min-height: 200px;
            }
            .layout.table .left-center-right>div {
                display: table-cell;
            }
            .layout.table .left{
                width: 300px;
                background-color: aliceblue;
            }
            .layout.table .right{
                width: 300px;
                background-color:beige;
            }
            .layout.table .center{
                background-color: cornsilk;
            }
        </style>
        <article class="left-center-right">
            <div class="left"></div>
            <div class="center">
                table 左中右布局
            </div>
            <div class="right"></div>
        </article>
    </section>
```
## 八、 采用网格布局
```javascript
  <section class="layout grid">
        <style>
            .layout.grid .left-center-right{
                display: grid;
                width: 100%;
                grid-template-rows: 200px;
                grid-template-columns: 300px auto 300px;
            }
            .layout.grid .left{
                background-color: aqua;
            }
            .layout.grid .center{
                background-color:orange;
            }
            .layout.grid .right{
                background-color: aqua;
            }
        </style>
        <article class="left-center-right">
            <div class="left"></div>
            <div class="center">
                网格左中右布局
            </div>
            <div class="right"></div>
        </article>
    </section>
```

# 各种方法的优缺点
| name     | 优点                         | 缺点                                         |
| -------- | ---------------------------- | -------------------------------------------- |
| 浮动     | 兼容性好                     | 需要消除对周边元素的影响                     |
| 绝对定位 | 快捷方便                     | 脱离文档流后，对其他元素产生影响，不容易控制 |
| flex     | 兼容性好，容易操作（i8以上） |            作用于一纬坐标                              |
| table    | 兼容性好                     | 某一栏高度变化会导致其它同步变高             |
| grid     |    grid布局用法和flex相似，但是作用于二维布局                          |             |                 



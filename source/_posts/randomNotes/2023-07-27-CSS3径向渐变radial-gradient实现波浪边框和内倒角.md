---
layout: blog
title: "CSS3径向渐变radial-gradient实现波浪边框和内倒角"
mark: 转载
background: notes
date:  2023-07-27
category: 随拾
tags:
- css
- css3
- radial-gradient
---

### 前言
实现效果：
![](2183010305-5c6666d312031_fix732.webp)

### 实现内倒角
上代码，然后解释代码
```html
<div class="radial-gradient"></div>
<style>
.radial-gradient {
    width: 200px;
    height: 100px;
    position: relative;
    background-image: radial-gradient(circle at right top, #fff, #fff 10px, transparent 11px),
           radial-gradient(circle at right bottom, #fff, #fff 10px, transparent 11px);
    background-color: red;
}
</style>
```

重点解释radial-gradient(circle at right top, #fff, #fff 10px, transparent 11px)这个样式是干嘛的。  
circle表示圆形渐变，说的简单点就是画一个圆。画圆就要知道原点。  
circle at right top 中的right top就是原点位置。这里原点位置是相对于容器的坐标。right表示容器最右边，top表示容器最上边，换言之就是右上角。  
circle at right top 后面的#fff, #fff 10px, transparent 11px就是从原点开始各种颜色渐变的长度。  
代码#fff, #fff 10px, transparent 11px中第一个#fff表示原点处为#fff颜色，#fff 10px表示距离原点半径10px这段距离都是#fff颜色，transparent 11px表示距离原点10px到11px都是transparent颜色，由于没有设置其他颜色，所以距离原点11px以后都是transparent颜色。  
![](2032995592-5c666dc1b0674_fix732.webp)  

总结radial-gradient(circle at right top, #fff, #fff 10px, transparent 11px),就是以容器的右上角为原点画圆，半径10px范围内是#fff颜色，半径大于10px范围内都是transparent颜色。  
这样在右上角就形成了内倒角  
同理 radial-gradient(circle at right bottom, #fff, #fff 10px, transparent 11px); 就不解释了。  

### 实现波浪边框
上代码，增加一个css样式即可
```html
<style>
.radial-gradient:after {
    content: '';
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: -5px;
    width: 10px;
    height: 100%;
    background: radial-gradient(circle, #fff, #fff 4px, transparent 5px);
    background-size: 10px 10px;
}
</style>
```

background: radial-gradient(circle, #fff, #fff 4px, transparent 5px); 此处没有 at right top字样，表示原点在容器中心位置，#fff, #fff 4px, transparent 5px，表示半径4px范围内是#fff颜色，半径4px到5px范围内是transparent颜色，半径大于5px是transparent颜色。这样就有一个直径为8px的#fff颜色的圆位于容器(这里的容器是:after)中心。  
![](1746955718-5c6672295123b_fix732.webp)
(背景蓝色是为了演示效果)  
再加上background-size: 10px 10px;设置背景大小为宽10px高10px，这样就能实现多个直径为8px的#fff颜色的圆。
![](1784758529-5c6672491c31c_fix732.webp)
(背景蓝色是为了演示效果)  
left: -5px; 向左偏移 5px，使:after只有一半在.radial-gradient容器内  
最后附上效果图
![](3166636803-5c6670b633318_fix732.webp)

### 总结
__实现内倒角其实是画一个#fff颜色的圆，圆只有四分之一在容器内__  
__实现波浪边框其实是画多个#fff颜色的圆，圆只有一半在容器内__

原文地址: [https://segmentfault.com/a/1190000018166421](https://segmentfault.com/a/1190000018166421)
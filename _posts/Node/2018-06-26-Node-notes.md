---
layout: blog
istop: true
title: "Node 学习笔记"
mark: 原创
background-image: https://nodejs.org/static/images/logo.svg
# background: node
date:  2018-06-08
category: 学习笔记
tags:
- Node
- serve-favicon
- Express
- 中间件
---

# Node 学习笔记

## 窝·兹基·谢德
### 创建一个server服务
```js
// 引入http模块
const http = require('http');

//创建一个http服务
http.createServer(function(req, res){

}).listen(8088, "127.0.0.1");
console.log("服务启动成功，请访问：127.0.0.1");
```


## Node 中间件
favicon的处理  
安装依赖
```
npm install serve-favicon --save
```
添加代码到server.js
```js
var favicon = require('serve-favicon');
app.use(favicon(__dirname + '/favicon.ico'));
```

### 自己编写中间件
中间件大致结构
```js
app.use(xxx()); // xxx()可以是个匿名函数也可以是第三方中间件那样:
app.use(bodyParser());
```
一个打印请求时间的中间件（匿名结构）
```js
app.use(function(req, res, next){
  console.log('Time:', Date.now());
  next();
});
```

### 挂载中间件
```js
// 挂载至 /user/:id 的中间件，任何指向 /user/:id 的请求都会执行它
app.use('/user/:id', function(req, res, next){
  console.log('Request Type:', req.method);
  next();
});
```
也就是说只有请求开头user/:id 才会被这个中间件处理，如果不是则会被忽略。
此外上述的req.method是指请求的方式例如：get,post,put,delete




### 第一个Node.js程序

server.js
```js
//依赖一个http模块，相当于java的import，与C#中的using
var http = require('http');

//创建一个服务器对象
server = http.createSever(function(req, res) {
//设置请求成功时响应头部的MIME为纯文本
res.writeHeader(200, { "Content-Type": "text/plain" });

//向客户端输出字符
res.end("Hello World\n");
})

//让服务器在8088端口开始运行
server.listen(8088, "127.0.0.1);
console.log("Server is running at 127.0.0.1:8088");
```
引入 required 模块：我们可以使用 require 指令来载入 Node.js 模块。
创建服务器：服务器可以监听客户端的请求，类似于TomCat、IIS、Apache 、Nginx 等 HTTP 服务器。
接收请求与响应请求 服务器很容易创建，客户端可以使用浏览器或终端发送 HTTP 请求，服务器接收请求后返回响应数据。

第一行请求（require）Node.js 自带的 http 模块，并且把它赋值给 http 变量。
接下来我们调用 http 模块提供的函数： createServer 。这个函数会返回 一个对象，这个对象有一个叫做 listen 的方法，这个方法有一个数值参数， 指定这个 HTTP 服务器监听的端口号。

### 一个简单的Express项目
index.js
```js
//引入express模块
var express = require('express');

//创建一个app对象，类似一个web应用（网站）
var app = express();

//接受指定路径的请求，指定回调函数
app.get('/', function(req, res) {
  res.send('Hello World!');
});

//创建一个web服务器，可以认为就是web服务器对象
//监听9988端口，当监听成功时回调
var server = app.listen(9988, 'localhost', function(){
  var host = server.address().address;//地址
  var port = server.address().port;//端口
  
  console.log('应用实例，访问地址为 http://%s:%s', host, port);
});
```
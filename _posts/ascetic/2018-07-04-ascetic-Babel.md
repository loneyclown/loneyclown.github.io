---
layout: blog
istop: true
title: "ASCETIC-Babel篇"
mark: 原创
# background-image: https://o243f9mnq.qnssl.com/2017/06/116099051.jpg
background: ascetic
date:  2018-07-04
category: ASCETIC
tags:
- Babel
---

# ASCETIC-Babel篇
新建一个名为`babel`的项目，并初始化
```
$ mkdir babel
$ cd babel
$ npm init
```
## Babel 配置文件
新建一个`.babelrc`配置文件
```
{
  "presets": [],
  "plugins": []
}
```
> `presets`设定转码规则  
> 官方提供的转码集：  
> ```
> # ES2015 转码规则
> $ npm install preset-babel-es2015 --save-dev
> 
> # React 转码规则
> $ npm install preset-babel-react --save-dev
> 
> # ES7不同阶段语法提案的转码规则（共4个阶段），选装1个
> $ npm install babel-preset-stage-0
> $ npm install babel-preset-stage-1
> $ npm install babel-preset-stage-2
> $ npm install babel-preset-stage-3
> ```

这里我安装`es2015`、`react`、`stage-3`规则
```
$ npm install preset-babel-es2015 preset-babel-react babel-preset-stage-3 --save-dev
```
然后在`.babelrc`配置文件添加
```
{
  "presets": [
    "es2015",
    "react",
    "stage-3"
  ],
  "plugins": []
}
```

## 命令行转码 babel-cli
### 全局安装
```
$ npm install babel-cli -g
```
> 基本用法（全局安装情况下）：
> ```
> # 转码结果输出到标准输出
> $ babel example.js
> 
> # 转码结果写入一个文件
> # --out-file 或 -o 参数指定输出文件
> $ babel example.js --out-file compiled.js
> # 或者
> $ babel example.js -o compiled.js
> 
> # 整个目录转码
> # --out-dir 或 -d 参数指定输出目录
> $ babel src --out-dir lib
> # 或者
> $ babel src -d lib
> 
> # -s 参数生成source map文件
> $ babel src -d lib -s
> ```

### 项目内安装
安装babel-cli
```
$ npm install babel-cli --save-dev
```
改写`package.json`，`scripts`处添加`babel src -d lib`
```json
{
  "name": "babel",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    // 此处添加
    "build": "babel src -d lib"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "babel-preset-stage-3": "^6.24.1"
  }
}
``` 
然后在项目目录下新建`src`、`lib`文件夹
```
$ mkdir src
$ mkdir lib
```
在`src`目录下新建`index.js`
```
console.log(() => "箭头函数输出");
```
执行转码
```
$ npm run build
```
此时查看`lib`文件夹，发现目录下多了一个已经经过转码的`index.js`
```
"use strict";

console.log(function () {
  return "箭头函数输出";
});
```

## babel-node
`babel-cli`自带一个`babel-node`命令，提供一个支持ES6语法的REPL环境。它支持Node的REPL环境的所有功能，而且可以直接运行ES6代码。  
它不用单独安装，而是随`babel-cli`一起安装。然后，执行`babel-node`（全局安装模式下）就进入PEPL环境。
```
$ babel-node
> (x => x * 2)(1)
2
```
`babel-node`命令可以直接运行ES6脚本。将上面的代码放入脚本文件`es6.js`，然后直接运行。
```
$ babel-node es6.js
2
```
`babel-node`也可以安装在项目中。
```
$ npm install babel-cli --save-dev
```
然后，改写`package.json`。
```
{
  "scripts": {
    "script-name": "babel-node script.js"
  }
}
```
上面代码中，使用`babel-node`替代`node`，这样`script.js`本身就不用做任何转码处理。
> PS: REPL环境概述  
> `Node.js`给我们提供一个交互式运行环境——REPL，在这个环境中我们可以做一些简单的应用程序的测试或调试。进入命令行窗口，输入`node`命令并按下回车键，即可进入REPL运行环境。  
> 详情参考 __[Node的交互式环境（REPL）](https://blog.csdn.net/u010871004/article/details/52318599)__

## babel-register
> `babel-register`模块改写`require`命令，为它加上一个钩子。此后，每当使用`require`加载`.js`、`.jsx`、`.es`和`.es6`后缀名的文件，就会先用`Babel`进行转码。
> 安装
> ```
> $ npm install babel-register --save-dev
> ```
> 使用时，必须首先加载`babel-register`。
> ```
> require("babel-register");
> require("./index.js");
> ```
> 然后，就不需要手动对`index.js转码了。
> 需要注意的是，`babel-register`只会对`require`命令加载的文件转码，而不会对当前文件转码。另外，由于它是实时转码，所以只适合在开发环境使用。

在`src`目录下新建`list.js`
```
var list = (data) => {
  return data.map((i, item) => {
    console.log(item);
  });
};
module.exports = list;
```
然后在`src/index.js`中写入
```
require("babel-register");
var list = require("./list");

var data = [1, 2, 3, 4, 5, 6];
list(data);
```
执行
```
$ node .\src\index.js

# 输出
0
1
2
3
4
5
```
此前我没有对`list.js`转码，但是执行没有报错，说明`babel-register`在`list.js`加载的时候就已经将其转码了。

## babel-core
> 如果某些代码需要调用`Babel`的API进行转码，就要使用`babel-core`模块。
> 安装
> ```
> $ npm install babel-core --save
> ```
> 然后，在项目中就可以调用babel-core。
> ```
> var babel = require('babel-core');
> 
> // 字符串转码
> babel.transform('code();', options);
> // => { code, map, ast }
> 
> // 文件转码（异步）
> babel.transformFile('filename.js', options, function(err, result) {
>   result; // => { code, map, ast }
> });
> 
> // 文件转码（同步）
> babel.transformFileSync('filename.js', options);
> // => { code, map, ast }
> 
> // Babel AST转码
> babel.transformFromAst(ast, code, options);
> // => { code, map, ast }
> ```
> 配置对象`options`，可以参看官方文档<http://babeljs.io/docs/usage/options/>，中文版<https://www.babeljs.cn/docs/core-packages/#options>。  
> 下面是一个例子。
> ```
> var es6Code = 'let x = n => n + 1';
> var es5Code = require('babel-core')
>   .transform(es6Code, {
>     presets: ['es2015']
>   })
>   .code;
> // '"use strict";\n\nvar x = function x(n) {\n  return n + 1;\n};'
> ```
> 上面代码中，`transform`方法的第一个参数是一个字符串，表示需要转换的ES6代码，第二个参数是转换的配置对象。


## babel-polyfill
> `Babel`默认只转换新的JavaScript句法（syntax），而不转换新的API，比如`Iterator`、`Generator`、`Set`、`Maps`、`Proxy`、`Reflect`、`Symbol`、`Promise`等全局对象，以及一些定义在全局对象上> 的方法（比如`Object.assign`）都不会转码。  
> 举例来说，ES6在`Array`对象上新增了`Array.from`方法。`Babel`就不会转码这个方法。如果想让这个方法运行，必须使用`babel-polyfill`，为当前环境提供一个垫片。  
> 安装
> ```
> $ npm install babel-polyfill --save
> ```
> 然后，在脚本头部，加入如下一行代码。
> ```
> import 'babel-polyfill';
> // 或者
> require('babel-polyfill');
> ```
> `Babel`默认不转码的API非常多，详细清单可以查看`babel-plugin-transform-runtime`模块的[definitions.js](https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-runtime/src/definitions.js)文件。

## 浏览器环境
> `Babel`也可以用于浏览器环境。但是，从Babel 6.0开始，不再直接提供浏览器版本，而是要用构建工具构建出来。如果你没有或不想使用构建工具，可以通过安装5.x版本的`babel-core`模块获取。
> ```
> $ npm install babel-core@old
> ```
> 运行上面的命令以后，就可以在当前目录的`node_modules/babel-core/`子目录里面，找到`babel`的浏览器版本`browser.js`（未精简）和`browser.min.js`（已精简）。  
> 然后，将下面的代码插入网页。
> ```
> <script src="node_modules/babel-core/browser.js"></script>
> <script type="text/babel">
> // Your ES6 code
> </script>
> ```
> 上面代码中，`browser.js`是`Babel`提供的转换器脚本，可以在浏览器运行。用户的ES6脚本放在`script`标签之中，但是要注明`type="text/babel"`。  
> 另一种方法是使用[babel-standalone](https://github.com/Daniel15/babel-standalone)模块提供的浏览器版本，将其插入网页。
> ```
> <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.4.4/babel.min.js"></script>
> <script type="text/babel">
> // Your ES6 code
> </script>
> ```
> 注意，网页中实时将ES6代码转为ES5，对性能会有影响。生产环境需要加载已经转码完成的脚本。
> 下面是如何将代码打包成浏览器可以使用的脚本，以`Babel`配合`Browserify`为例。首先，安装`babelify`模块。
> ```
> $ npm install babelify babel-preset-es2015 --save-dev
> ```
> 然后，再用命令行转换ES6脚本。
> ```
> $  browserify script.js -o bundle.js \
>   -t [ babelify --presets [ es2015 react ] ]
> ```
> 上面代码将ES6脚本`script.js`，转为`bundle.js`，浏览器直接加载后者就可以了。
> 在`package.json`设置下面的代码，就不用每次命令行都输入参数了。
> ```
> {
>   "browserify": {
>     "transform": [["babelify", { "presets": ["es2015"] }]]
>   }
> }
> ```

## 在线转换
Babel提供一个[REPL在线编译器-中文](https://www.babeljs.cn/repl/)、[REPL在线编译器-英文](https://babeljs.io/repl/)，可以在线将ES6代码转为ES5代码。转换后的代码，可以直接作为ES5代码插入网页运行。

## 与其他工具的配合
许多工具需要Babel进行前置转码，这里举两个例子：`ESLint`和`Mocha`。  
[ESLint](http://eslint.org/) 用于静态检查代码的语法和风格，安装命令如下。
```
$ npm install eslint babel-eslint --save-dev
```
然后，在项目根目录下，新建一个配置文件`.eslint`，在其中加入`parser`字段。  
```
{
  "parser": "babel-eslint",
  "rules": {
    ...
  }
}
```
再在`package.json`之中，加入相应的`scripts`脚本。
```
{
    "name": "my-module",
    "scripts": {
      "lint": "eslint my-files.js"
    },
    "devDependencies": {
      "babel-eslint": "...",
      "eslint": "..."
    }
  }
```
[Mocha](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html) 则是一个测试框架，如果需要执行使用ES6语法的测试脚本，可以修改`package.json`的`scripts.test`。
```
"scripts": {
  "test": "mocha --ui qunit --compilers js:babel-core/register"
}
```
上面命令中，`--compilers`参数指定脚本的转码器，规定后缀名为js的文件，都需要使用`babel-core/register`先转码。


----
__本文参考自 [阮一峰的网络日志-Babel 入门教程](http://www.ruanyifeng.com/blog/2016/01/babel.html)__


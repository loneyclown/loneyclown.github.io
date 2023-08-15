---
layout: blog
title: "hexo deploy后自定义域名消失"
mark: 转载
background: notes
date:  2023-07-26
category: 随拾
tags:
- hexo
---

#### 方法一（推荐）：
将需要上传至github的内容放在source文件夹，例如CNAME、favicon.ico、images等，这样在 hexo d 之后就不会被删除了。

#### 方法二：安装`hexo-generator-cname`插件实现永久保留
> [hexo-generator-cname 文档地址](https://github.com/leecrossley/hexo-generator-cname)

###### 安装
```bash
npm install hexo-generator-cname --save
```

###### 使用
添加`hexo-generator-cname`到hexo配置文件`_config.yml`的`plugins`下:
```yml
# ...

plugins:
- hexo-generator-cname

# ...
```

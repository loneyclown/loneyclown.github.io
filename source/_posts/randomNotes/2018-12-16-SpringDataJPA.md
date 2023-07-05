---
layout: blog
# istop: true
title: "Spring data JPA项目搭建"
mark: 原创
# background-image: https://o243f9mnq.qnssl.com/2017/06/116099051.jpg
background: notes
date:  2018-12-16
category: 随拾
tags:
- java
- SSM
- Spring
- Spring data JPA
---

## Spring data JPA项目搭建
开发环境：IntelliJ IEDA
### 引导
打开<https://start.spring.io/>  
选择构建工具（maven或者gradle）、开发语言、SpringBoot版本  
![引导1][]  
配置项目元数据：Group、Artifact、Options、打包方式，java版本等...  
![引导2][]  
选择依赖（Dependencies）  
![引导3][]  
安装的依赖：Spring Web、Spring Data JPA、Spring Security、Lombok、Spring Boot DevTools  
然后点击`Generate`构建，将zip压缩包下载下来

### 导入
将上一步下载的压缩包解压，导入到IDEA  
选择`从外部模型导入`，然后选择`Maven`  
![导入1][]  
设置项目根目录，勾选`Search for projects recursively`，其他默认，点下一步  
![导入2][]  
一直下一步，直到完成  



[引导1]: https://s2.ax1x.com/2020/02/10/15cOAK.png
[引导2]: https://s2.ax1x.com/2020/02/10/15giHP.png
[引导3]: https://s2.ax1x.com/2020/02/10/15gcgH.png
[导入1]: https://s2.ax1x.com/2020/02/10/15IfNn.png
[导入2]: https://s2.ax1x.com/2020/02/10/15IOE9.png
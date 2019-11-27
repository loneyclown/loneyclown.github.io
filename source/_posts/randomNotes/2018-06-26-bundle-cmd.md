---
layout: blog
# essays: true
title: "bundle 命令"
mark: 转载
# background-image: http://ot1cc1u9t.bkt.clouddn.com/17-7-15/43335546.jpg
background: pick
date: 2018-06-26
category: 随拾
tags:
- Ruby
- bundle
---

# Tasks[命令一览]
###### bundle check
Checks if the dependencies listed in Gemfile are satisfied by currently installed gems  
[检查当前安装的gem是否满足Gemfile中列出的依赖项]
###### bundle exec
Run the command in context of the bundle  
[在捆绑包的上下文中运行命令]
###### bundle help [TASK]
Describe available tasks or one specific task  
[描述可用的任务或一个特定的任务]
###### bundle init
Generates a Gemfile into the current working directory  
[生成一个Gemfile到当前的工作目录]
###### bundle install
Install the current environment to the system  
[将当前环境安装到系统]
###### bundle lock
Checks if the dependencies listed in Gemfile are satisfied by currently installed gems  
[将包绑定到当前的一组依赖项，包括所有的子依赖项]
###### bundle pack
Packs all the gems to vendor/cache  
[将所有gems打包到vendor/cache]
###### bundle show
Shows all gems that are part of the bundle  
[显示作为捆绑包一部分的所有gems]
###### bundle unlock
Unlock the bundle. This allows gem versions to be changed  
[解锁捆绑包。 这可以改变gem版本]

# 使用说明
`bundle pack`  
这个命令可以打包你的gems到vendor/cache目录下。然后你把项目给别的开发者，别人就可以使用：  
`bundle install`  
来安装项目依赖的gems了。

但是当你想把项目部署到生产环境的话，假如gems出现新版本，可能导致项目出现错误，这个时候，我们就需要锁定gem的版本。  
`bundle lock`  
这个命令会在rails的根目录下生成一个Gemfile.lock文件。类似于这样的：
```
--- 
dependencies: 
- rails: = 3.0.0.beta
- sqlite3-ruby: ">= 0"
- pg: ">= 0"
specs: 
- text-hyphen: 
    version: 1.0.0
- builder: 
    version: 2.1.2
- i18n: 
    version: 0.3.3
```

当你在Gemfile文件里增加了一个新的gem，比如“hpricot”你运行：  
`bundle check`  
会提示：You changed your Gemfile after locking. Please relock using 'bundle unlock'  
想修改Gemfile必须先解锁Gemfile文件：  
`bundle unlock`  
然后才能修改，修改完再锁定。  
`bundle install`  
这条命令会自动安装Gemfile里的所有gem。
然后我们再检测：  
`bundle check`  
提示：The Gemfile's dependencies are satisfied
这就安全了。
然后我们可以打包了：  
`bundle pack`  
Copying .gem files into vendor/cache
...

打包完以后，锁定我们的gems:  
`bundle lock`  
这下你就可以安全部署你的app了。
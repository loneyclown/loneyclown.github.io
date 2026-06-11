# Cloudy Cabin 主题设计方案

## 1. 主题定位

**Cloudy Cabin** —— 一间漂浮在云上的私人小屋。

个人杂食博客主题，兼容技术文章与生活随笔，治愈软萌但不幼稚。

## 2. 视觉系统

### 2.1 配色方案

#### 浅色模式
| 用途 | 色值 | 说明 |
|------|------|------|
| 页面背景 | `#F7FAFF` / `#FFF7FA` | 淡蓝粉渐变底色 |
| 卡片背景 | `#FFFFFFCC` | 白色 + 80% 透明度，玻璃拟态 |
| 主题主色 | `#FF9DBB` | 樱花粉 |
| 主题辅色 | `#AFCBFF` | 天空蓝 |
| 文本主色 | `#24304F` | 深蓝灰，保证可读性 |
| 文本次色 | `#7B8499` | 中灰，用于元信息 |
| 边框/分割线 | `#E8ECF5` | 极淡灰蓝 |
| 标签背景 | `#FFF0F5` | 淡粉 |
| 悬停高亮 | `#FFB7C5` | 亮粉 |

#### 深色模式（星空紫）
| 用途 | 色值 | 说明 |
|------|------|------|
| 页面背景 | `#10142A` | 深夜蓝 |
| 卡片背景 | `#1B2140CC` | 深蓝 + 80% 透明度 |
| 主题主色 | `#FF9DBB` | 樱花粉（保留） |
| 主题辅色 | `#AFCBFF` | 天空蓝（保留） |
| 文本主色 | `#EEF2FF` | 近白 |
| 文本次色 | `#8B93A7` | 中灰蓝 |

### 2.2 字体规范
- 中文主字体：`"PingFang SC", "Microsoft YaHei", sans-serif`
- 英文/数字：`"Nunito", "Quicksand", sans-serif`
- 标题字重：700
- 正文字重：400
- 元信息字重：400，字号 14px

### 2.3 圆角系统
| 元素 | 圆角 |
|------|------|
| 导航栏 | `24px` |
| 大卡片 | `20px` |
| 小卡片/按钮 | `16px` |
| 标签 | `12px` |
| 头像 | `50%` |
| 缩略图 | `12px` |

### 2.4 阴影系统
- 卡片阴影：`0 4px 20px rgba(175, 203, 255, 0.15)`
- 悬停阴影：`0 8px 30px rgba(175, 203, 255, 0.25)`
- 导航栏阴影：`0 2px 16px rgba(175, 203, 255, 0.2)`

## 3. 页面结构

### 3.1 布局网格
- 最大宽度：`1200px`
- 主内容区：`calc(100% - 340px)`
- 侧边栏：`300px`
- 间距：`40px`

### 3.2 组件清单

#### 导航栏 (Header)
- 面包式圆角容器，悬浮于顶部
- 左侧：Logo 图标 + 站名 + 副标题
- 中部：菜单链接（首页、归档、分类、标签、关于我）
- 右侧：搜索框 + 头像 + 主题切换

#### Hero 区
- 大圆角卡片，渐变背景
- 左侧：欢迎语 + 描述 + 身份标签
- 右侧/背景：CSS 云朵装饰 + 兔子插画占位

#### 文章卡片
- 横向布局：左侧缩略图 + 右侧内容
- 内容区：分类标签 + 标题 + 摘要 + 元信息行
- 元信息：日期、阅读量、评论数、阅读时间

#### 侧边栏
- 作者信息卡片（头像、昵称、简介、统计、社交链接）
- 公告卡片
- 分类卡片（带文章数）
- 标签云
- 归档列表

## 4. 交互动效

### 4.1 云朵背景
- 使用 CSS 动画实现云朵缓慢漂浮
- 多层云朵，不同速度，营造景深
- 纯 CSS 实现，不依赖 Canvas

### 4.2 卡片交互
- 悬停：`translateY(-4px)` + 阴影加深
- 过渡：`all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)`（弹性效果）

### 4.3 按钮交互
- 悬停：背景变亮，轻微放大 `scale(1.02)`
- 点击：`scale(0.98)`

### 4.4 搜索框
- 聚焦：粉色光晕 `box-shadow: 0 0 0 3px rgba(255, 157, 187, 0.3)`

### 4.5 主题切换
- 淡入淡出过渡，0.3s
- 深色模式背景变为星空紫

## 5. Hexo 集成方案

### 5.1 目录结构
```
themes/cloudy-cabin/
├── _config.yml          # 主题配置
├── package.json         # 主题元信息
├── layout/              # EJS 模板
│   ├── layout.ejs       # 基础布局
│   ├── index.ejs        # 首页
│   ├── post.ejs         # 文章页
│   ├── page.ejs         # 独立页面
│   ├── archive.ejs      # 归档页
│   ├── category.ejs     # 分类页
│   ├── tag.ejs          # 标签页
│   └── partials/        # 组件片段
│       ├── header.ejs
│       ├── footer.ejs
│       ├── hero.ejs
│       ├── post-card.ejs
│       ├── sidebar.ejs
│       ├── sidebar-author.ejs
│       ├── sidebar-announcement.ejs
│       ├── sidebar-categories.ejs
│       ├── sidebar-tags.ejs
│       ├── sidebar-archives.ejs
│       └── pagination.ejs
└── source/              # 静态资源
    ├── css/
    │   ├── style.scss   # 主入口
    │   ├── _variables.scss
    │   ├── _header.scss
    │   ├── _hero.scss
    │   ├── _post-card.scss
    │   ├── _sidebar.scss
    │   ├── _footer.scss
    │   ├── _dark-mode.scss
    │   └── _animations.scss
    ├── js/
    │   ├── main.js      # 主题切换、搜索等
    │   └── clouds.js    # 云朵动画
    └── images/
```

### 5.2 依赖
- `hexo-renderer-sass` 或 `hexo-renderer-scss`（用于编译 SCSS）
- 可选：`hexo-generator-search`（搜索数据生成）

### 5.3 从 Butterfly 迁移思路
1. 保留 Butterfly 的 `post` 前置元数据解析逻辑
2. 替换布局模板为 Cloudy Cabin 的 EJS
3. 复用 Butterfly 的搜索、评论、分析等插件配置
4. 重写 CSS，保留部分工具类

## 6. 实现优先级

1. **P0** - 基础布局 + 导航栏 + Hero + 文章卡片 + 侧边栏
2. **P1** - 深色模式 + 云朵动画 + 搜索功能
3. **P2** - 文章页模板 + 归档页 + 分类页 + 标签页
4. **P3** - 评论集成 + 插件适配 + 性能优化

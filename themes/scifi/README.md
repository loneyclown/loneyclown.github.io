# Scifi Theme

一款简约科幻风格的 Hexo 主题，采用深色背景和霓虹色强调，营造未来科技感。

## 特性

- 🎨 简约科幻风格设计
- 🌙 深色主题
- 📱 响应式布局
- ⚡ 流畅动画效果
- 🔍 内置搜索功能
- 📝 代码高亮支持
- 🎯 专注内容阅读

## 安装

1. 在 Hexo 根目录下执行：
```bash
git clone https://github.com/yourname/hexo-theme-scifi themes/scifi
```

2. 修改 `_config.yml` 中的主题设置：
```yaml
theme: scifi
```

## 配置

编辑 `themes/scifi/_config.yml` 进行主题配置。

### 基本配置

```yaml
site:
  title: "你的网站标题"
  subtitle: "副标题"
  description: "网站描述"
  author: "作者名"
  logo: "/path/to/logo.png"  # 可选
```

### 菜单配置

```yaml
menu:
  Home: /
  Archives: /archives/
  Categories: /categories/
  Tags: /tags/
```

### 社交链接

```yaml
social:
  GitHub: https://github.com/username || fab fa-github
  Email: mailto:your@email.com || fa fa-envelope
```

## 自定义

### 修改颜色

编辑 `themes/scifi/source/css/variables.styl` 修改颜色变量。

### 添加自定义 CSS/JS

在 `themes/scifi/_config.yml` 中：

```yaml
custom_css:
  - /css/custom.css

custom_js:
  - /js/custom.js
```

## 浏览器支持

- Chrome (最新)
- Firefox (最新)
- Safari (最新)
- Edge (最新)

## 许可证

MIT

## 更新日志

### 1.0.0
- 初始版本
- 基础布局和样式
- 搜索功能
- 响应式设计


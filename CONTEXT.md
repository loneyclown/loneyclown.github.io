# 晓梦未央 — AI 驱动博客

一个 Hexo 技术博客，从手动撰写迁移为 AI 驱动的工作流。CodeWhale 根据你的想法生成文章草稿，你审阅确认后 AI 代为发布。

## 语言

### 工作流

**Draft（草稿）**：
AI 生成的文章初稿，存放在 `source/_drafts/` 中。你审阅前，草稿不会进入部署管线。
_Avoid_：初稿、待发文章

**Publish（发布）**：
将文章从 `source/_drafts/` 移至 `source/_posts/<分类>/`，执行 `git add + commit + push`，Cloudflare Pages 检测 push 后自动构建并部署到线上。
_Avoid_：上线、部署

**Trigger（触发）**：
产生一篇新文章的起点。有两种形式——**一句话主题**（日常灵感，你给出一个标题或一句话描述）和**对话沉淀**（深度话题，你和 AI 聊完一个主题后将对话精华整理为文章）。
_Avoid_：发起、开始写

**Review（审阅）**：
你对草稿进行确认的过程。通过 `hexo server --draft` 在 `localhost:4000` 本地预览渲染效果。审阅通过后你说「发布」，AI 执行后续操作。审阅不通过则直接在草稿文件上修改，或让 AI 重新生成。
_Avoid_：检查、预览

### 内容

**Category（分类）**：
文章的顶层归类。现有六类——`随笔`、`学习笔记`、`Vue学习笔记`、`Git`、`Node`、`随拾`。AI 根据你指定的分类优先，无指定时按映射规则自动判定，审阅时可纠正。未来可扩展。

**Tag（标签）**：
文章的横向标注，用于索引和检索。与技术主题、框架、概念相关。规则同 Category。

**Idea（想法）**：
你输入给 AI 的创意种子。可以是一句话主题、一段要点、或一次对话。AI 将其扩展为完整草稿。
_Avoid_：需求、任务

### 基础设施

**Cloudflare Pages**：
部署目标。替代 GitHub Pages，提供更好的国内访问连通性。检测到 Git push 后自动执行 `npm run build`，将 `public/` 分发到全球 CDN。

**Preview（本地预览）**：
通过 `hexo server --draft` 在浏览器中查看草稿和已发布文章的渲染效果。部署前的最后一道视觉确认。

## 示例对话

> **你**：写一篇关于 React Server Components 的上手指南。
>
> **AI**：好的，我规划大纲为：1) 什么是 RSC 2) 和传统 SSR 的区别 3) 实操示例 4) 注意事项。分类预判为「学习笔记」，标签 `react`、`rsc`。开始写草稿。
>
> —— 几分钟后 ——
>
> **AI**：草稿已写入 `source/_drafts/2026-05-26-react-server-components-上手.md`。运行 `npm run server` 并在 `localhost:4000` 预览。
>
> **你**：（预览后）第三部分的代码示例换一个更简洁的。
>
> **AI**：已更新。重新预览确认。
>
> **你**：可以了，发布。
>
> **AI**：已将草稿移至 `source/_posts/studyNotes/`，commit 并 push。Cloudflare Pages 正在构建，约 30 秒后可访问。

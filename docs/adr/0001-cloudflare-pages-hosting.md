# 从 GitHub Pages 迁移至 Cloudflare Pages

博客部署从 GitHub Pages 迁移到 Cloudflare Pages，通过现有子域名 CNAME 记录指向。目标是解决 GitHub Pages 国内访问不稳定、速度慢的问题。Cloudflare Pages 提供更密集的亚太节点，且构建部署流程与 `hexo generate` 无缝对接。

## 考虑过的方案

- **继续 GitHub Pages**：零迁移成本，但国内访问体验差，部分运营商可能直接不可达。
- **Vercel**：同样支持静态部署，但边缘节点偏欧美，对国内访问改善有限。
- **Cloudflare Pages**：亚太节点最密集，免费额度无带宽限制，构建命令 `npm run build` + 输出目录 `public` 天然匹配。
- **先 CNAME 后自定义域名**：暂不迁移 DNS nameserver（主域名有其他用途），优先零成本验证效果；不满意则另购独立域名完整走 CF CDN。

## 回退策略

GitHub Pages 的 `gh-pages` 分支保留不删除。如需回退，恢复 `_config.yml` 中的 URL 为 `https://loneyclown.github.io/`，重新 push `gh-pages` 分支即可。

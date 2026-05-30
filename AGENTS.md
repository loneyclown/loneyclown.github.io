## Agent skills

### Issue tracker

Issues live as GitHub issues on `loneyclown/loneyclown.github.io`. See `docs/agents/issue-tracker.md`.

### Triage labels

Uses the five canonical labels with their default names. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context repo — one `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.

### Deployment workflow (hexo-8 branch)

When working on the `hexo-8` branch, follow this deployment workflow:

1. The blog is powered by **Hexo 8**.
2. **Cloudflare Pages** is configured to auto-deploy on pushes to the `hexo-8` branch.
3. After adding or editing posts, **commit and push directly** to `hexo-8`. Do NOT run `hexo deploy` or `hexo generate` locally — Cloudflare handles the build automatically.
4. Ensure `npm install` has been run locally if needed for `hexo server` development, but do not commit `node_modules`.

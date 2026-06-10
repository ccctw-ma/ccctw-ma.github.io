# ccctw-ma.github.io

这是 `ccctw-ma` 的统一个人主页、博客和开源项目展示站点。项目已经从原
`ccctw-blog` 仓库迁移到当前 GitHub Pages 仓库，后续只需要维护本仓库。

## 技术栈

- Next.js App Router：页面、布局、静态导出和 MDX 博客。
- Tailwind CSS：个人主页、导航、项目卡片和响应式样式。
- GitHub API：`/projects` 在构建时读取 `ccctw-ma` 公开仓库。
- Vitest + Testing Library：组件和数据层单元测试。
- ESLint + Prettier：Lint 和格式化门禁。
- GitHub Actions：推送到 `main` 或 `master` 后自动构建并部署 GitHub Pages。

## 本地开发

```bash
pnpm install
pnpm dev
```

访问 <http://localhost:3000> 预览站点。

## 常用命令

```bash
pnpm format        # 格式化代码
pnpm format:check  # 检查格式
pnpm lint          # Next.js ESLint
pnpm typecheck     # TypeScript 类型检查
pnpm test          # 单元测试
pnpm test:coverage # 单元测试 + 90% 覆盖率门禁
pnpm build         # 静态导出到 out/
pnpm quality       # CI 同款质量门禁
```

## 项目展示逻辑

`src/lib/github.ts` 会在构建时请求：

```text
https://api.github.com/users/ccctw-ma/repos?per_page=100&sort=updated
```

展示规则：

- 只展示非 fork、非 archived 的公开仓库。
- 先按 `stars + forks` 排序，再按更新时间排序。
- GitHub 请求失败、返回空列表或网络异常时使用 `FALLBACK_PROJECTS`。
- GitHub Actions 会注入 `GITHUB_TOKEN`，降低 API 限流风险。

## 部署

`.github/workflows/deploy.yml` 会在 `main` 或 `master` 推送时执行：

1. 安装 pnpm 和 Node.js 20。
2. 运行 `pnpm install --frozen-lockfile`。
3. 运行 `pnpm quality`。
4. 上传 `out/` 静态产物。
5. 使用 GitHub Pages 官方 Action 发布站点。

第一次启用时，需要在 GitHub 仓库设置中将 Pages Source 设置为
`GitHub Actions`。

## 更多文档

- [架构说明](docs/ARCHITECTURE.md)
- [质量与部署说明](docs/QUALITY_AND_DEPLOYMENT.md)

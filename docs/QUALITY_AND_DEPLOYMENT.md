# 质量与部署说明

## 质量门禁

CI 使用 `pnpm quality` 作为统一入口：

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test:coverage
pnpm build
```

本地修改建议按相同顺序验证。`pnpm format` 可自动修复大部分格式问题。

## 单元测试策略

测试目标集中在可稳定验证的业务单元：

- `src/lib/github.ts`：GitHub API 请求、仓库过滤、排序、兜底逻辑。
- `src/lib/profile.ts`：个人主页数据一致性。
- `src/components/ProjectGrid.tsx`：项目卡片、空态、可选字段渲染。
- `src/components/Header.tsx`：桌面端和移动端导航。
- `src/components/Footer.tsx`：站点归属与技术栈摘要。

`vitest.config.ts` 设置了全局覆盖率阈值：

```ts
thresholds: {
  statements: 90,
  branches: 90,
  functions: 90,
  lines: 90,
}
```

当前覆盖率验证结果为 100% statements、100% branches、100% functions、100%
lines。

## GitHub Pages 部署

Workflow 文件：`.github/workflows/deploy.yml`。

触发条件：

- 推送到 `main`
- 推送到 `master`
- 手动 `workflow_dispatch`

部署流程：

1. Checkout 当前仓库。
2. 安装 pnpm `10.32.1`。
3. 安装 Node.js `20` 并启用 pnpm cache。
4. 运行 `pnpm install --frozen-lockfile`。
5. 运行 `pnpm quality`。
6. 上传 `out/` 作为 Pages artifact。
7. 使用 `actions/deploy-pages@v4` 发布。

## GitHub API Token

Workflow 会把内置的 `${{ secrets.GITHUB_TOKEN }}` 注入到构建环境：

```yaml
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

`src/lib/github.ts` 检测到该变量后会附加 `Authorization` 请求头，降低 GitHub
API 限流概率。本地开发不配置 token 也可以运行，失败时会自动展示兜底项目。

## 仓库设置

首次启用自动部署时，在 GitHub 仓库执行：

1. 打开 `Settings -> Pages`。
2. 将 `Build and deployment -> Source` 设置为 `GitHub Actions`。
3. 推送到 `main` 或 `master`。
4. 等待 `Deploy GitHub Pages` Workflow 完成。

部署完成后，站点会发布到：

```text
https://ccctw-ma.github.io/
```

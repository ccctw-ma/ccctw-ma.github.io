# Agent Guidelines

## 单元测试与覆盖率

- 所有源码修改后必须运行 `pnpm quality`，不得只运行单项命令后直接交付。
- Vitest 覆盖率门禁必须保持四项都不低于 90%：
  - Lines >= 90%
  - Statements >= 90%
  - Functions >= 90%
  - Branches >= 90%
- 覆盖率配置以 `vitest.config.ts` 为准，禁止为了通过 CI 临时降低阈值。
- 新增组件、数据处理函数或交互逻辑时，必须补充相邻的 `*.test.ts` 或 `*.test.tsx`。
- 允许保留 `.next`、`coverage`、`out` 等本地产物目录；它们已由 `.gitignore` 忽略，不需要每次手动删除。

## 验证命令

```bash
pnpm quality
```

该命令会依次执行格式检查、Lint、TypeScript 类型检查、覆盖率测试和 Next.js 构建。

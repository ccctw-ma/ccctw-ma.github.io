# 架构说明

## 迁移目标

当前仓库已经承接原 `ccctw-blog` 的源码级架构，不再只保存 GitHub Pages 的
静态构建产物。新的维护边界是：

- 本仓库负责源码、测试、文档、CI 和部署。
- `ccctw-blog` 后续不再作为个人网站源仓库使用。
- `out/`、`.next/`、`coverage/` 等产物不进入 Git。

## 目录结构

```text
.
├── .github/workflows/deploy.yml  # GitHub Pages 自动部署
├── docs/                         # 中文工程文档
├── public/                       # 静态资源
├── src/
│   ├── app/                      # Next.js App Router 页面
│   │   ├── blog/                 # MDX 博客列表与详情
│   │   ├── projects/             # 开源项目展示页
│   │   ├── globals.css           # 全局主题与背景
│   │   ├── layout.tsx            # 根布局
│   │   └── page.tsx              # 个人主页
│   ├── blogs/                    # MDX 内容
│   ├── components/               # 可测试 UI 组件
│   ├── lib/                      # 可测试数据层与站点数据
│   └── test/                     # 测试初始化
├── next.config.js                # 静态导出配置
├── vitest.config.ts              # 单测与覆盖率配置
└── package.json                  # 脚本与依赖
```

## 页面设计

首页采用更高密度的工程师个人主页结构：

- Hero：展示个人定位、头像、GitHub 和 Projects 入口。
- Highlights：展示技术方向和站点能力。
- Bio：保留个人时间线，并用卡片式信息结构提升扫描效率。

Projects 页面不再维护手写项目卡片，而是构建时从 GitHub 拉取开源项目：

- 数据逻辑放在 `src/lib/github.ts`，便于单测和 CI 覆盖。
- UI 展示放在 `src/components/ProjectGrid.tsx`，避免页面组件臃肿。
- 页面组件 `src/app/projects/page.tsx` 只负责集成数据和展示。

## 静态导出

`next.config.js` 使用：

```js
output: "export";
trailingSlash: true;
images: {
  unoptimized: true;
}
```

这样 `pnpm build` 会生成 `out/`，可直接由 GitHub Pages 托管。由于 GitHub
Pages 没有 Next.js 图片优化服务，`next/image` 必须开启 `unoptimized`。

## MDX 博客

博客内容继续沿用 `src/blogs/*.mdx`：

- `src/app/blog/page.tsx` 扫描 MDX frontmatter 生成列表。
- `src/app/blog/[name]/page.tsx` 使用 `generateStaticParams` 生成静态详情页。
- `github-markdown-css` 负责正文渲染样式。

后续新增博客时，只需要添加 MDX 文件并写入 `file`、`title`、`date`、
`description`、`image` 等 frontmatter。

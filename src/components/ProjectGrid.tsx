import type { OpenSourceProject } from "@/lib/github";

type ProjectGridProps = {
  projects: OpenSourceProject[];
};

const projectCaseNotes: Record<
  string,
  {
    eyebrow: string;
    eyebrowZh: string;
    impact: string;
    impactZh: string;
  }
> = {
  "GG-Fund": {
    eyebrow: "Quant Lab",
    eyebrowZh: "量化实验室",
    impact: "Strategy tooling, data signals, and private research workflow.",
    impactZh: "策略工具、数据信号与私有研究工作流。",
  },
  flamingo: {
    eyebrow: "Browser Tooling",
    eyebrowZh: "浏览器工具",
    impact: "A Chrome extension focused on cleaner proxy switching.",
    impactZh: "聚焦更清爽代理切换体验的 Chrome 扩展。",
  },
  "clipy-rs": {
    eyebrow: "Rust Utility",
    eyebrowZh: "Rust 工具",
    impact: "A compact systems-side experiment around clipboard productivity.",
    impactZh: "围绕剪贴板效率的小型系统侧实验。",
  },
  "claude-code-2188": {
    eyebrow: "Agent Study",
    eyebrowZh: "Agent 研究",
    impact: "Source reading and reconstruction practice for AI coding workflows.",
    impactZh: "面向 AI 编码工作流的源码阅读与复刻实践。",
  },
  "ccctw-music": {
    eyebrow: "Music Product",
    eyebrowZh: "音乐产品",
    impact: "A multi-source music experience designed as a complete web product.",
    impactZh: "以完整 Web 产品方式构建的多源音乐体验。",
  },
};

function getCaseNote(project: OpenSourceProject) {
  return (
    projectCaseNotes[project.name] ?? {
      eyebrow: "Engineering Case",
      eyebrowZh: "工程案例",
      impact: "A selected project with implementation details and live repository data.",
      impactZh: "一个带有实现细节和实时仓库数据的精选项目。",
    }
  );
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <p className="project-empty text-muted rounded-[2rem] border border-dashed p-10 text-center font-bold">
        <span className="i18n-en">No selected projects yet.</span>
        <span className="i18n-zh">暂无精选项目。</span>
      </p>
    );
  }

  return (
    <div className="project-grid grid gap-5 md:grid-cols-2">
      {projects.map((project, index) => {
        const note = getCaseNote(project);

        return (
          <article
            key={project.id}
            className={`project-card group rounded-[2rem] border p-5 transition duration-300 ${
              index === 0 ? "project-card-featured md:col-span-2" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-accent mb-4 text-xs font-black uppercase tracking-[0.28em]">
                  <span className="i18n-en">{note.eyebrow}</span>
                  <span className="i18n-zh">{note.eyebrowZh}</span>
                </p>
                <h2 className="text-main flex flex-wrap items-center gap-2 text-3xl font-black leading-none tracking-[-0.055em]">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="project-name-link hover:text-accent"
                  >
                    {project.name}
                  </a>
                </h2>
                <p className="text-muted mt-4 max-w-2xl text-sm font-semibold leading-7">
                  <span className="i18n-en">{project.description}</span>
                  <span className="i18n-zh">
                    {project.descriptionZh ?? project.description}
                  </span>
                </p>
                <p className="project-impact mt-4 max-w-2xl rounded-2xl px-4 py-3 text-sm font-bold leading-6">
                  <span className="i18n-en">{note.impact}</span>
                  <span className="i18n-zh">{note.impactZh}</span>
                </p>
              </div>
              <div className="project-number shrink-0 rounded-2xl px-3 py-2 text-right">
                <span className="block text-xs font-black">0{index + 1}</span>
                <span className="text-subtle mt-1 block text-[0.65rem] font-black uppercase tracking-[0.2em]">
                  {project.visibility}
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="accent-pill rounded-full border px-3 py-1 text-xs font-black">
                {project.language}
              </span>
              {project.topics.length > 0 ? (
                <div className="contents" aria-label={`${project.name} topics`}>
                  {project.topics.slice(0, 4).map((topic) => (
                    <span
                      key={topic}
                      className="project-topic rounded-full px-3 py-1 text-xs font-bold"
                    >
                      #{topic}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="project-meta mt-6 grid gap-3 rounded-[1.35rem] p-3 text-xs font-black sm:grid-cols-3">
              <span aria-label={`${project.name} stars`}>Stars {project.stars}</span>
              <span>Forks {project.forks}</span>
              {project.license ? <span>{project.license}</span> : <span>No License</span>}
              <span>
                <span className="i18n-en">{project.updatedLabel}</span>
                <span className="i18n-zh">{project.updatedLabelZh}</span>
              </span>
              {project.homepage ? (
                <a
                  href={project.homepage}
                  target="_blank"
                  rel="noreferrer"
                  className="project-demo-link text-accent hover:opacity-80"
                >
                  Demo
                </a>
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}

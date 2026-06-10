import type { OpenSourceProject } from "@/lib/github";

type ProjectGridProps = {
  projects: OpenSourceProject[];
};

const projectCaseNotes: Record<
  string,
  {
    eyebrow: string;
    eyebrowZh: string;
  }
> = {
  "GG-Fund": {
    eyebrow: "Quant",
    eyebrowZh: "量化实验室",
  },
  flamingo: {
    eyebrow: "Browser",
    eyebrowZh: "浏览器工具",
  },
  "clipy-rs": {
    eyebrow: "Rust",
    eyebrowZh: "Rust 工具",
  },
  "claude-code-2188": {
    eyebrow: "Agent",
    eyebrowZh: "Agent 研究",
  },
  "ccctw-music": {
    eyebrow: "Music",
    eyebrowZh: "音乐产品",
  },
};

function getCaseNote(project: OpenSourceProject) {
  return (
    projectCaseNotes[project.name] ?? {
      eyebrow: "Engineering Case",
      eyebrowZh: "工程案例",
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
    <div className="project-grid grid items-stretch gap-5 md:grid-cols-2">
      {projects.map((project, index) => {
        const note = getCaseNote(project);

        return (
          <article
            key={project.id}
            className="project-card group flex h-full flex-col rounded-[2rem] border p-5 transition duration-300"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-accent mb-3 text-xs font-black uppercase tracking-[0.22em]">
                  <span className="i18n-en">{note.eyebrow}</span>
                  <span className="i18n-zh">{note.eyebrowZh}</span>
                </p>
                <h2 className="project-name text-main text-2xl font-black leading-tight tracking-[-0.045em] lg:text-[1.7rem]">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="project-name-link hover:text-accent"
                  >
                    {project.name}
                  </a>
                </h2>
                <p className="project-description text-muted mt-4 max-w-2xl text-sm font-semibold leading-6">
                  <span className="i18n-en">{project.description}</span>
                  <span className="i18n-zh">
                    {project.descriptionZh ?? project.description}
                  </span>
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

            <div className="project-meta mt-auto flex flex-wrap gap-3 rounded-[1.35rem] p-3 text-xs font-black">
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

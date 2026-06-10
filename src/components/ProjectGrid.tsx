import type { OpenSourceProject } from "@/lib/github";

type ProjectGridProps = {
  projects: OpenSourceProject[];
};

export default function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <p className="text-muted rounded-2xl border border-dashed p-8 text-center">
        <span className="i18n-en">No selected projects yet.</span>
        <span className="i18n-zh">暂无精选项目。</span>
      </p>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {projects.map((project) => (
        <article
          key={project.id}
          className="site-card group rounded-3xl border p-5 shadow-2xl shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-orange-400/70"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-main flex flex-wrap items-center gap-2 text-xl font-black tracking-tight">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-accent"
                >
                  {project.name}
                </a>
                <span className="rounded-full border px-2.5 py-0.5 text-xs font-bold text-subtle">
                  {project.visibility}
                </span>
              </h2>
              <p className="text-muted mt-2 min-h-[3rem] text-sm leading-6">
                <span className="i18n-en">{project.description}</span>
                <span className="i18n-zh">
                  {project.descriptionZh ?? project.description}
                </span>
              </p>
            </div>
            <span className="accent-pill rounded-full border px-3 py-1 text-xs font-bold">
              {project.language}
            </span>
          </div>

          {project.topics.length > 0 ? (
            <div
              className="mt-4 flex flex-wrap gap-2"
              aria-label={`${project.name} topics`}
            >
              {project.topics.slice(0, 4).map((topic) => (
                <span
                  key={topic}
                  className="site-card-strong text-muted rounded-full px-2.5 py-1 text-xs"
                >
                  #{topic}
                </span>
              ))}
            </div>
          ) : null}

          <div className="text-subtle mt-5 flex flex-wrap items-center gap-4 text-xs font-semibold">
            <span aria-label={`${project.name} stars`}>Stars {project.stars}</span>
            {project.license ? <span>{project.license}</span> : null}
            <span>
              <span className="i18n-en">{project.updatedLabel}</span>
              <span className="i18n-zh">{project.updatedLabelZh}</span>
            </span>
            {project.homepage ? (
              <a
                href={project.homepage}
                target="_blank"
                rel="noreferrer"
                className="text-accent ml-auto hover:opacity-80"
              >
                Demo
              </a>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}

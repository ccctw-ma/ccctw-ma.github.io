import type { OpenSourceProject } from "@/lib/github";

type ProjectGridProps = {
  projects: OpenSourceProject[];
};

const dateFormatter = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "short",
  day: "2-digit",
});

export default function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-zinc-700 p-8 text-center text-zinc-400">
        No open-source projects found yet.
      </p>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {projects.map((project) => (
        <article
          key={project.id}
          className="group rounded-3xl border border-zinc-800 bg-zinc-950/70 p-5 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-orange-400/70"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-black tracking-tight text-zinc-50">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-orange-300"
                >
                  {project.name}
                </a>
              </h2>
              <p className="mt-2 min-h-[3rem] text-sm leading-6 text-zinc-400">
                {project.description}
              </p>
            </div>
            <span className="rounded-full border border-orange-300/30 bg-orange-400/10 px-3 py-1 text-xs font-bold text-orange-200">
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
                  className="rounded-full bg-zinc-900 px-2.5 py-1 text-xs text-zinc-400"
                >
                  #{topic}
                </span>
              ))}
            </div>
          ) : null}

          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-semibold text-zinc-500">
            <span aria-label={`${project.name} stars`}>Stars {project.stars}</span>
            <span aria-label={`${project.name} forks`}>Forks {project.forks}</span>
            <span>Updated {dateFormatter.format(new Date(project.updatedAt))}</span>
            {project.homepage ? (
              <a
                href={project.homepage}
                target="_blank"
                rel="noreferrer"
                className="ml-auto text-orange-300 hover:text-orange-200"
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

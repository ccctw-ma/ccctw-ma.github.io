import ProjectList from "@/components/ProjectList";
import { getSelectedProjects } from "@/lib/github";

export default function ProjectsPage() {
  const projects = getSelectedProjects();

  return (
    <main className="project-stage relative overflow-hidden px-6 pt-28">
      <section className="mx-auto max-w-6xl">
        <div className="project-orbit" aria-hidden="true" />
        <div className="project-hero mb-12 grid gap-8 rounded-[2.25rem] border p-6 md:p-9 2xl:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="accent-pill mb-5 w-fit rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.35em]">
              Open Source Studio
            </p>
            <h1 className="project-title text-main max-w-4xl text-4xl font-black leading-[0.9] tracking-[-0.075em] md:text-6xl">
              <span className="i18n-en">Selected engineering work.</span>
              <span className="i18n-zh">精选工程作品。</span>
            </h1>
            <p className="text-muted mt-6 max-w-2xl text-base font-bold leading-8 md:text-lg">
              <span className="i18n-en">
                A curated wall of projects I actively build, refactor, and keep in sync
                with live GitHub data.
              </span>
              <span className="i18n-zh block">
                这里不是普通仓库列表，而是我持续构建、重构并通过 GitHub
                接口保持最新的精选工程作品墙。
              </span>
            </p>
          </div>
          <div className="project-hero-panel grid content-between gap-5 rounded-[1.75rem] p-5">
            <p className="text-subtle text-xs font-black uppercase tracking-[0.28em]">
              Portfolio Signal
            </p>
            <div className="grid gap-3 sm:grid-cols-3 2xl:grid-cols-1">
              <div>
                <strong className="text-main block text-3xl font-black">
                  {projects.length}
                </strong>
                <span className="text-subtle text-xs font-bold">
                  <span className="i18n-en">Selected</span>
                  <span className="i18n-zh">精选</span>
                </span>
              </div>
              <div>
                <strong className="text-main block text-3xl font-black">Live</strong>
                <span className="text-subtle text-xs font-bold">
                  <span className="i18n-en">GitHub sync</span>
                  <span className="i18n-zh">接口同步</span>
                </span>
              </div>
              <div>
                <strong className="text-main block text-3xl font-black">90%+</strong>
                <span className="text-subtle text-xs font-bold">
                  <span className="i18n-en">Quality gate</span>
                  <span className="i18n-zh">质量门禁</span>
                </span>
              </div>
            </div>
            <div className="project-signal-line" aria-hidden="true" />
          </div>
        </div>
        <ProjectList initialProjects={projects} />
      </section>
    </main>
  );
}

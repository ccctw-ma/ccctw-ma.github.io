import ProjectGrid from "@/components/ProjectGrid";
import { getSelectedProjects } from "@/lib/github";

export default function ProjectsPage() {
  const projects = getSelectedProjects();

  return (
    <main className="px-6 pt-28">
      <section className="mx-auto max-w-5xl">
        <div className="mb-10 max-w-3xl">
          <p className="accent-pill mb-4 w-fit rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.35em]">
            Open Source
          </p>
          <h1 className="text-main text-4xl font-black tracking-[-0.05em] md:text-6xl">
            <span className="i18n-en">Selected projects.</span>
            <span className="i18n-zh">精选项目。</span>
          </h1>
          <p className="text-muted mt-5 text-lg leading-8">
            <span className="i18n-en">
              This page keeps only the projects you selected from the screenshots.
            </span>
            <span className="i18n-zh block">这里只保留截图中指定的项目。</span>
          </p>
        </div>
        <ProjectGrid projects={projects} />
      </section>
    </main>
  );
}

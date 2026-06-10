import ProjectList from "@/components/ProjectList";
import { getSelectedProjects } from "@/lib/github";

export default function ProjectsPage() {
  const projects = getSelectedProjects();

  return (
    <main className="project-stage relative px-6 pt-28">
      <section className="mx-auto max-w-6xl">
        <h1 className="sr-only">
          <span className="i18n-en">Selected projects</span>
          <span className="i18n-zh">精选项目</span>
        </h1>
        <ProjectList initialProjects={projects} />
      </section>
    </main>
  );
}

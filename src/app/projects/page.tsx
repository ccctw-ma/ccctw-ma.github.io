import ProjectGrid from "@/components/ProjectGrid";
import { fetchOpenSourceProjects } from "@/lib/github";

export default async function ProjectsPage() {
  const projects = await fetchOpenSourceProjects();

  return (
    <main className="px-6 pt-28">
      <section className="mx-auto max-w-5xl">
        <div className="mb-10 max-w-3xl">
          <p className="mb-4 w-fit rounded-full border border-orange-300/30 bg-orange-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.35em] text-orange-200">
            Open Source
          </p>
          <h1 className="text-4xl font-black tracking-[-0.05em] text-zinc-50 md:text-6xl">
            GitHub projects, fetched at build time.
          </h1>
          <p className="mt-5 text-lg leading-8 text-zinc-400">
            This page lists public, non-fork, non-archived repositories from ccctw-ma and
            falls back to curated projects when GitHub is unavailable.
          </p>
        </div>
        <ProjectGrid projects={projects} />
      </section>
    </main>
  );
}

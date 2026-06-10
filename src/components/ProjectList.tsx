"use client";

import { useEffect, useState } from "react";
import { fetchLatestSelectedProjects, type OpenSourceProject } from "@/lib/github";
import ProjectGrid from "./ProjectGrid";

type ProjectListProps = {
  initialProjects: OpenSourceProject[];
};

export default function ProjectList({ initialProjects }: ProjectListProps) {
  const [projects, setProjects] = useState(initialProjects);

  useEffect(() => {
    let cancelled = false;

    fetchLatestSelectedProjects().then((latestProjects) => {
      if (!cancelled) {
        setProjects(latestProjects);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return <ProjectGrid projects={projects} />;
}

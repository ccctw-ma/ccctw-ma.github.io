import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { OpenSourceProject } from "@/lib/github";
import ProjectGrid from "./ProjectGrid";

const projects: OpenSourceProject[] = [
  {
    id: 1,
    name: "ccctw-site",
    description: "Personal website source code.",
    url: "https://github.com/ccctw-ma/ccctw-site",
    homepage: "https://ccctw-ma.github.io",
    language: "TypeScript",
    stars: 12,
    forks: 3,
    topics: ["nextjs", "tailwind", "vitest", "github-pages", "mdx"],
    updatedAt: "2024-06-10T00:00:00Z",
  },
];

describe("ProjectGrid", () => {
  it("renders project metadata, links, stats, and limited topics", () => {
    render(<ProjectGrid projects={projects} />);

    expect(screen.getByRole("link", { name: "ccctw-site" })).toHaveAttribute(
      "href",
      "https://github.com/ccctw-ma/ccctw-site",
    );
    expect(screen.getByText("Personal website source code.")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByLabelText("ccctw-site stars")).toHaveTextContent("Stars 12");
    expect(screen.getByLabelText("ccctw-site forks")).toHaveTextContent("Forks 3");
    expect(screen.getByRole("link", { name: "Demo" })).toHaveAttribute(
      "href",
      "https://ccctw-ma.github.io",
    );

    const topics = within(screen.getByLabelText("ccctw-site topics"));
    expect(topics.getByText("#nextjs")).toBeInTheDocument();
    expect(topics.getByText("#github-pages")).toBeInTheDocument();
    expect(topics.queryByText("#mdx")).not.toBeInTheDocument();
  });

  it("renders an empty state when no projects are provided", () => {
    render(<ProjectGrid projects={[]} />);

    expect(screen.getByText("No open-source projects found yet.")).toBeInTheDocument();
  });

  it("omits optional topic and demo sections when project metadata is sparse", () => {
    render(
      <ProjectGrid
        projects={[
          {
            ...projects[0],
            id: 2,
            name: "minimal",
            homepage: undefined,
            topics: [],
          },
        ]}
      />,
    );

    expect(screen.getByRole("link", { name: "minimal" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Demo" })).not.toBeInTheDocument();
    expect(screen.queryByLabelText("minimal topics")).not.toBeInTheDocument();
  });
});

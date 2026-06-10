import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { OpenSourceProject } from "@/lib/github";
import ProjectList from "./ProjectList";

const projects: OpenSourceProject[] = [
  {
    id: 1,
    name: "flamingo",
    description: "chrome proxy extension",
    descriptionZh: "Chrome 代理扩展",
    url: "https://github.com/ccctw-ma/flamingo",
    language: "TypeScript",
    stars: 1,
    forks: 0,
    visibility: "Public",
    license: "MIT License",
    topics: ["chrome"],
    updatedAt: "2026-06-09T00:00:00Z",
    updatedLabel: "Updated yesterday",
    updatedLabelZh: "昨天更新",
  },
];

vi.mock("@/lib/github", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/github")>();
  return {
    ...actual,
    fetchLatestSelectedProjects: vi.fn(async () => [
      {
        ...projects[0],
        description: "fresh chrome proxy extension",
        stars: 10,
      },
    ]),
  };
});

describe("ProjectList", () => {
  it("renders fallback data first and refreshes with latest GitHub data", async () => {
    render(<ProjectList initialProjects={projects} />);

    expect(screen.getByLabelText("flamingo stars")).toHaveTextContent("Stars 1");

    await waitFor(() => {
      expect(screen.getByLabelText("flamingo stars")).toHaveTextContent("Stars 10");
    });
    expect(screen.getByText("fresh chrome proxy extension")).toBeInTheDocument();
  });
});

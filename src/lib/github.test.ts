import { describe, expect, it, vi } from "vitest";
import {
  FALLBACK_PROJECTS,
  fetchOpenSourceProjects,
  getSelectedProjects,
  normalizeRepo,
  selectOpenSourceRepos,
  type GitHubRepo,
} from "./github";

function makeRepo(overrides: Partial<GitHubRepo>): GitHubRepo {
  return {
    id: 1,
    name: "demo",
    full_name: "ccctw-ma/demo",
    html_url: "https://github.com/ccctw-ma/demo",
    description: "Demo repository",
    language: "TypeScript",
    stargazers_count: 1,
    forks_count: 0,
    fork: false,
    archived: false,
    pushed_at: "2024-01-01T00:00:00Z",
    homepage: null,
    topics: [],
    ...overrides,
  };
}

describe("normalizeRepo", () => {
  it("maps GitHub repo data into project card data", () => {
    expect(
      normalizeRepo(
        makeRepo({
          homepage: "https://demo.example.com",
          topics: ["nextjs"],
          stargazers_count: 8,
          forks_count: 2,
        }),
      ),
    ).toMatchObject({
      name: "demo",
      description: "Demo repository",
      homepage: "https://demo.example.com",
      language: "TypeScript",
      stars: 8,
      forks: 2,
      visibility: "Public",
      topics: ["nextjs"],
    });
  });

  it("fills safe defaults for sparse repository metadata", () => {
    expect(
      normalizeRepo(
        makeRepo({
          description: "",
          language: null,
          homepage: "",
          topics: undefined,
        }),
      ),
    ).toMatchObject({
      description: "Open-source project by ccctw-ma.",
      homepage: undefined,
      language: "Code",
      visibility: "Public",
      topics: [],
    });
  });
});

describe("selectOpenSourceRepos", () => {
  it("keeps only public source projects and ranks by stars, forks, then recency", () => {
    const selected = selectOpenSourceRepos([
      makeRepo({ id: 1, name: "fork", fork: true, stargazers_count: 99 }),
      makeRepo({ id: 2, name: "archived", archived: true, stargazers_count: 99 }),
      makeRepo({
        id: 3,
        name: "recent",
        stargazers_count: 1,
        pushed_at: "2024-02-01T00:00:00Z",
      }),
      makeRepo({
        id: 4,
        name: "popular",
        stargazers_count: 5,
        pushed_at: "2023-01-01T00:00:00Z",
      }),
      makeRepo({
        id: 5,
        name: "older",
        stargazers_count: 1,
        pushed_at: "2024-01-01T00:00:00Z",
      }),
    ]);

    expect(selected.map((project) => project.name)).toEqual([
      "popular",
      "recent",
      "older",
    ]);
  });
});

describe("fetchOpenSourceProjects", () => {
  it("fetches and normalizes repositories for the configured user", async () => {
    const fetcher = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [makeRepo({ id: 7, name: "flamingo", stargazers_count: 3 })],
    } satisfies Partial<Response>);

    await expect(fetchOpenSourceProjects("ccctw-ma", fetcher)).resolves.toMatchObject([
      { id: 7, name: "flamingo", stars: 3 },
    ]);
    expect(fetcher).toHaveBeenCalledWith(
      "https://api.github.com/users/ccctw-ma/repos?per_page=100&sort=updated",
      expect.objectContaining({
        headers: expect.objectContaining({
          Accept: "application/vnd.github+json",
        }),
      }),
    );
  });

  it("passes a GitHub token header when one is configured", async () => {
    vi.stubEnv("GITHUB_TOKEN", "test-token");
    const fetcher = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [makeRepo({ id: 9, name: "tokened" })],
    } satisfies Partial<Response>);

    await fetchOpenSourceProjects("ccctw-ma", fetcher);

    expect(fetcher).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer test-token",
        }),
      }),
    );
    vi.unstubAllEnvs();
  });

  it("returns curated fallback projects on failed responses, empty data, or network errors", async () => {
    const failedFetch = vi
      .fn()
      .mockResolvedValue({ ok: false } satisfies Partial<Response>);
    const emptyFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [],
    } satisfies Partial<Response>);
    const throwingFetch = vi.fn().mockRejectedValue(new Error("network"));

    await expect(fetchOpenSourceProjects("ccctw-ma", failedFetch)).resolves.toBe(
      FALLBACK_PROJECTS,
    );
    await expect(fetchOpenSourceProjects("ccctw-ma", emptyFetch)).resolves.toBe(
      FALLBACK_PROJECTS,
    );
    await expect(fetchOpenSourceProjects("ccctw-ma", throwingFetch)).resolves.toBe(
      FALLBACK_PROJECTS,
    );
  });
});

describe("getSelectedProjects", () => {
  it("returns only the screenshot-selected projects in the required order", () => {
    expect(getSelectedProjects().map((project) => project.name)).toEqual([
      "GG-Fund",
      "flamingo",
      "clipy-rs",
      "claude-code-2188",
      "ccctw-music",
    ]);
  });
});

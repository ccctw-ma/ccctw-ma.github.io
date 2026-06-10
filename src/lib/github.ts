export type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
  homepage: string | null;
  private?: boolean;
  license?: {
    name: string;
    spdx_id: string;
  } | null;
  topics?: string[];
};

export type OpenSourceProject = {
  id: number;
  name: string;
  description: string;
  descriptionZh?: string;
  url: string;
  homepage?: string;
  language: string;
  stars: number;
  forks: number;
  visibility: "Public" | "Private";
  license?: string;
  topics: string[];
  updatedAt: string;
  updatedLabel: string;
  updatedLabelZh: string;
};

type FetchLike = (input: string, init?: RequestInit) => Promise<Response>;

export const GITHUB_USERNAME = "ccctw-ma";

export const SELECTED_PROJECTS: OpenSourceProject[] = [
  {
    id: 1,
    name: "GG-Fund",
    description: "my quantitative strategy",
    descriptionZh: "我的量化策略项目",
    url: "https://github.com/ccctw-ma/GG-Fund",
    language: "TypeScript",
    stars: 1,
    forks: 0,
    visibility: "Private",
    license: "MIT License",
    topics: ["quant", "strategy"],
    updatedAt: "2026-06-10T00:00:00Z",
    updatedLabel: "Updated 1 hour ago",
    updatedLabelZh: "1 小时前更新",
  },
  {
    id: 2,
    name: "flamingo",
    description: "chrome proxy extension",
    descriptionZh: "Chrome 代理扩展",
    url: "https://github.com/ccctw-ma/flamingo",
    language: "TypeScript",
    stars: 1,
    forks: 0,
    visibility: "Public",
    license: "MIT License",
    topics: ["chrome", "proxy", "extension"],
    updatedAt: "2026-06-09T00:00:00Z",
    updatedLabel: "Updated yesterday",
    updatedLabelZh: "昨天更新",
  },
  {
    id: 3,
    name: "clipy-rs",
    description: "clipy-rs",
    descriptionZh: "clipy-rs",
    url: "https://github.com/ccctw-ma/clipy-rs",
    language: "Rust",
    stars: 1,
    forks: 0,
    visibility: "Public",
    license: "MIT License",
    topics: ["rust", "clipboard"],
    updatedAt: "2026-06-07T00:00:00Z",
    updatedLabel: "Updated 3 days ago",
    updatedLabelZh: "3 天前更新",
  },
  {
    id: 4,
    name: "claude-code-2188",
    description: "复刻claude-code 源码",
    descriptionZh: "复刻 claude-code 源码",
    url: "https://github.com/ccctw-ma/claude-code-2188",
    language: "TypeScript",
    stars: 0,
    forks: 0,
    visibility: "Public",
    license: "MIT License",
    topics: ["claude-code", "agent"],
    updatedAt: "2026-06-06T00:00:00Z",
    updatedLabel: "Updated recently",
    updatedLabelZh: "最近更新",
  },
  {
    id: 5,
    name: "ccctw-music",
    description: "A music website can obtain music resources from various platforms.",
    descriptionZh: "一个可从多个平台获取音乐资源的音乐网站。",
    url: "https://github.com/ccctw-ma/ccctw-music",
    language: "JavaScript",
    stars: 0,
    forks: 0,
    visibility: "Public",
    topics: ["music", "javascript"],
    updatedAt: "2023-05-16T00:00:00Z",
    updatedLabel: "Updated on May 16, 2023",
    updatedLabelZh: "更新于 2023 年 5 月 16 日",
  },
];

export const FALLBACK_PROJECTS = SELECTED_PROJECTS;

export function normalizeRepo(repo: GitHubRepo): OpenSourceProject {
  return {
    id: repo.id,
    name: repo.name,
    description: repo.description?.trim() || "Open-source project by ccctw-ma.",
    url: repo.html_url,
    homepage: repo.homepage || undefined,
    language: repo.language || "Code",
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    visibility: repo.private ? "Private" : "Public",
    license: repo.license?.spdx_id || repo.license?.name || undefined,
    topics: repo.topics ?? [],
    updatedAt: repo.pushed_at,
    updatedLabel: `Updated ${new Date(repo.pushed_at).toLocaleDateString("en")}`,
    updatedLabelZh: `更新于 ${new Date(repo.pushed_at).toLocaleDateString("zh-CN")}`,
  };
}

export function selectOpenSourceRepos(repos: GitHubRepo[]): OpenSourceProject[] {
  return repos
    .filter((repo) => !repo.fork && !repo.archived)
    .map(normalizeRepo)
    .sort((a, b) => {
      const scoreDelta = b.stars + b.forks - (a.stars + a.forks);
      if (scoreDelta !== 0) {
        return scoreDelta;
      }

      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
}

export async function fetchOpenSourceProjects(
  username = GITHUB_USERNAME,
  fetcher: FetchLike = fetch,
): Promise<OpenSourceProject[]> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const response = await fetcher(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      { headers, next: { revalidate: 3600 } } as RequestInit,
    );

    if (!response.ok) {
      return FALLBACK_PROJECTS;
    }

    const repos = (await response.json()) as GitHubRepo[];
    const projects = selectOpenSourceRepos(repos).filter((project) =>
      SELECTED_PROJECTS.some((selected) => selected.name === project.name),
    );
    return projects.length > 0 ? projects : SELECTED_PROJECTS;
  } catch {
    return SELECTED_PROJECTS;
  }
}

export function getSelectedProjects(): OpenSourceProject[] {
  return SELECTED_PROJECTS;
}

export async function fetchLatestSelectedProjects(
  fetcher: FetchLike = fetch,
): Promise<OpenSourceProject[]> {
  const latestProjects = await Promise.all(
    SELECTED_PROJECTS.map(async (project) => {
      try {
        const response = await fetcher(
          `https://api.github.com/repos/${GITHUB_USERNAME}/${project.name}`,
          {
            headers: {
              Accept: "application/vnd.github+json",
              "X-GitHub-Api-Version": "2022-11-28",
            },
          },
        );

        if (!response.ok) {
          return project;
        }

        const mergedProject: OpenSourceProject = {
          ...project,
          ...normalizeRepo((await response.json()) as GitHubRepo),
          descriptionZh: project.descriptionZh,
          visibility: project.visibility === "Private" ? "Private" : "Public",
        };

        return mergedProject;
      } catch {
        return project;
      }
    }),
  );

  return latestProjects;
}

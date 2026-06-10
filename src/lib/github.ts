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
  topics?: string[];
};

export type OpenSourceProject = {
  id: number;
  name: string;
  description: string;
  url: string;
  homepage?: string;
  language: string;
  stars: number;
  forks: number;
  topics: string[];
  updatedAt: string;
};

type FetchLike = (input: string, init?: RequestInit) => Promise<Response>;

export const GITHUB_USERNAME = "ccctw-ma";

export const FALLBACK_PROJECTS: OpenSourceProject[] = [
  {
    id: 1,
    name: "50projects-react-ts",
    description:
      "React and TypeScript practice collection focused on UI interaction patterns.",
    url: "https://github.com/ccctw-ma/50projects-react-ts",
    homepage: "https://50projects-react-ts.vercel.app/",
    language: "TypeScript",
    stars: 0,
    forks: 0,
    topics: ["react", "typescript", "frontend"],
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    name: "RN-collect-timestamps",
    description:
      "React Native Android app for collecting, processing, and sending timestamps.",
    url: "https://github.com/ccctw-ma/RN-collect-timestamps",
    language: "TypeScript",
    stars: 0,
    forks: 0,
    topics: ["react-native", "android", "timestamp"],
    updatedAt: "2024-01-01T00:00:00Z",
  },
];

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
    topics: repo.topics ?? [],
    updatedAt: repo.pushed_at,
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
    const projects = selectOpenSourceRepos(repos);
    return projects.length > 0 ? projects : FALLBACK_PROJECTS;
  } catch {
    return FALLBACK_PROJECTS;
  }
}

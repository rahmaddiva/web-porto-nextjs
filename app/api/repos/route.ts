import { NextResponse } from "next/server";

const USERNAME = "rahmaddiva";

export async function GET() {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const res = await fetch(
    `https://api.github.com/users/${USERNAME}/repos?sort=pushed&direction=desc&per_page=100`,
    { headers, next: { revalidate: 3600 } }
  );
  if (!res.ok) {
    return NextResponse.json({ error: "GitHub unavailable" }, { status: 502 });
  }
  const repos = await res.json();
  const picks = repos
    .filter((r: { fork: boolean; archived: boolean }) => !r.fork && !r.archived)
    .slice(0, 6)
    .map(
      (r: {
        name: string;
        html_url: string;
        description: string | null;
        language: string | null;
        stargazers_count: number;
        pushed_at: string;
      }) => ({
        name: r.name,
        url: r.html_url,
        description: r.description,
        language: r.language,
        stars: r.stargazers_count,
        updated: r.pushed_at,
      })
    );
  return NextResponse.json(picks);
}

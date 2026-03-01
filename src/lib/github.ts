/**
 * Fetch raw README.md content from a GitHub repository.
 */

const RAW_BASE = "https://raw.githubusercontent.com";

export async function fetchReadme(
  repo: string,
  branch = "main",
  path = "README.md",
): Promise<string> {
  const url = `${RAW_BASE}/${repo}/${branch}/${path}`;
  const res = await fetch(url, { next: { revalidate: 86400 } });

  if (!res.ok) {
    // Some repos use "master" instead of "main"
    if (branch === "main") {
      return fetchReadme(repo, "master", path);
    }
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }

  return res.text();
}

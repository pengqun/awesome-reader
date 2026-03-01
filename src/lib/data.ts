/**
 * Data loading utilities for awesome-lists.
 * Used at build time (SSG) to fetch and parse all lists.
 */

import { AwesomeList } from "@/types";
import { fetchReadme } from "./github";
import { parseAwesomeList } from "./parser";
import { awesomeLists, AwesomeListMeta } from "./registry";

/**
 * Load and parse a single awesome-list.
 */
async function loadList(meta: AwesomeListMeta): Promise<AwesomeList> {
  try {
    const markdown = await fetchReadme(meta.repo, meta.branch, meta.path);
    const { categories, entryCount } = parseAwesomeList(markdown);

    return {
      slug: meta.slug,
      name: meta.name,
      repo: meta.repo,
      description: meta.description,
      categories,
      entryCount,
    };
  } catch (error) {
    console.error(`Failed to load ${meta.name}:`, error);
    // Return list with empty categories on failure
    return {
      slug: meta.slug,
      name: meta.name,
      repo: meta.repo,
      description: meta.description,
      categories: [],
      entryCount: 0,
    };
  }
}

/**
 * Load all awesome-lists from the registry.
 */
export async function loadAllLists(): Promise<AwesomeList[]> {
  const results = await Promise.allSettled(
    awesomeLists.map((meta) => loadList(meta)),
  );

  return results
    .filter(
      (r): r is PromiseFulfilledResult<AwesomeList> => r.status === "fulfilled",
    )
    .map((r) => r.value);
}

/**
 * Load a single awesome-list by slug.
 */
export async function loadListBySlug(
  slug: string,
): Promise<AwesomeList | null> {
  const meta = awesomeLists.find((l) => l.slug === slug);
  if (!meta) return null;
  return loadList(meta);
}

/**
 * Get all available slugs (for static generation).
 */
export function getAllSlugs(): string[] {
  return awesomeLists.map((l) => l.slug);
}

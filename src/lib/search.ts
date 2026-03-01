/**
 * Search utilities for awesome-lists.
 */

import { AwesomeList, SearchEntry } from "@/types";

/**
 * Flatten all entries from all lists into a searchable array.
 */
export function buildSearchIndex(lists: AwesomeList[]): SearchEntry[] {
  const entries: SearchEntry[] = [];

  for (const list of lists) {
    for (const cat of list.categories) {
      for (const entry of cat.entries) {
        entries.push({
          ...entry,
          listSlug: list.slug,
          listName: list.name,
          categoryName: cat.name,
        });
      }
      for (const sub of cat.subcategories) {
        for (const entry of sub.entries) {
          entries.push({
            ...entry,
            listSlug: list.slug,
            listName: list.name,
            categoryName: `${cat.name} > ${sub.name}`,
          });
        }
      }
    }
  }

  return entries;
}

/**
 * Search entries by query string.
 */
export function searchEntries(
  index: SearchEntry[],
  query: string,
  limit = 50,
): SearchEntry[] {
  if (!query.trim()) return [];

  const q = query.toLowerCase();
  const results: SearchEntry[] = [];

  for (const entry of index) {
    if (results.length >= limit) break;
    if (
      entry.name.toLowerCase().includes(q) ||
      entry.description.toLowerCase().includes(q)
    ) {
      results.push(entry);
    }
  }

  return results;
}

/**
 * Data models for Awesome Reader
 */

export interface AwesomeList {
  slug: string;
  name: string;
  repo: string;
  description: string;
  categories: Category[];
  entryCount: number;
}

export interface Category {
  name: string;
  description?: string;
  entries: Entry[];
  subcategories: Category[];
}

export interface Entry {
  name: string;
  url: string;
  description: string;
}

/**
 * Flattened entry with category context, used for search.
 */
export interface SearchEntry extends Entry {
  listSlug: string;
  listName: string;
  categoryName: string;
}

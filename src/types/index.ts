/**
 * Data models for Awesome Reader
 * Will be implemented in Phase 2
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

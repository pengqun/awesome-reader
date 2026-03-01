/**
 * Markdown parser for awesome-lists.
 *
 * Parses the typical awesome-list format:
 *   ## Category
 *   _Optional description_
 *   - [Name](url) - Description
 *   ### Subcategory
 *   - [Name](url) - Description
 */

import { Category, Entry } from "@/types";

interface Line {
  text: string;
  index: number;
}

/**
 * Parse a markdown entry line into an Entry object.
 * Supports formats:
 *   - [Name](url) - Description
 *   - [Name](url) — Description
 *   - [Name](url): Description
 *   - [Name](url)
 */
function parseEntry(line: string): Entry | null {
  // Match: - [Name](url) followed by optional separator and description
  const match = line.match(
    /^[-*]\s+\[([^\]]+)\]\(([^)]+)\)\s*(?:[-–—:]\s*(.*))?$/,
  );
  if (!match) return null;

  return {
    name: match[1].trim(),
    url: match[2].trim(),
    description: match[3]?.trim() ?? "",
  };
}

/**
 * Extract an italic description from a line, e.g. _description_ or *description*
 */
function parseItalicDescription(line: string): string | null {
  const match = line.match(/^[_*]([^_*]+)[_*]$/);
  return match ? match[1].trim() : null;
}

/**
 * Determine the heading level (number of #) and text.
 */
function parseHeading(line: string): { level: number; text: string } | null {
  const match = line.match(/^(#{1,6})\s+(.+)$/);
  if (!match) return null;
  return { level: match[1].length, text: match[2].trim() };
}

/**
 * Sections to skip (common non-content sections in awesome-lists).
 */
const SKIP_SECTIONS = new Set([
  "contents",
  "table of contents",
  "contributing",
  "contribute",
  "license",
  "licence",
  "footnotes",
  "credits",
  "acknowledgements",
  "about",
  "related",
  "other awesome lists",
  "related lists",
]);

function shouldSkipSection(name: string): boolean {
  return SKIP_SECTIONS.has(name.toLowerCase().trim());
}

/**
 * Parse awesome-list markdown into structured categories.
 */
export function parseAwesomeList(markdown: string): {
  categories: Category[];
  entryCount: number;
} {
  const lines: Line[] = markdown.split("\n").map((text, index) => ({
    text: text.trimEnd(),
    index,
  }));

  const categories: Category[] = [];
  let totalEntries = 0;

  // Track current state
  let currentCategory: Category | null = null;
  let currentSubcategory: Category | null = null;
  let skipUntilNextH2 = false;

  for (const { text } of lines) {
    const trimmed = text.trim();
    if (!trimmed) continue;

    // Check for headings
    const heading = parseHeading(trimmed);

    if (heading) {
      if (heading.level === 1) {
        // Skip H1 (title)
        continue;
      }

      if (heading.level === 2) {
        // New top-level category
        if (shouldSkipSection(heading.text)) {
          skipUntilNextH2 = true;
          currentCategory = null;
          currentSubcategory = null;
          continue;
        }

        skipUntilNextH2 = false;
        currentCategory = {
          name: heading.text,
          entries: [],
          subcategories: [],
        };
        currentSubcategory = null;
        categories.push(currentCategory);
        continue;
      }

      if (heading.level === 3 && currentCategory && !skipUntilNextH2) {
        // New subcategory
        if (shouldSkipSection(heading.text)) {
          currentSubcategory = null;
          continue;
        }

        currentSubcategory = {
          name: heading.text,
          entries: [],
          subcategories: [],
        };
        currentCategory.subcategories.push(currentSubcategory);
        continue;
      }

      continue;
    }

    if (skipUntilNextH2) continue;

    // Check for italic description
    if (currentCategory || currentSubcategory) {
      const desc = parseItalicDescription(trimmed);
      if (desc) {
        const target = currentSubcategory ?? currentCategory;
        if (target) target.description = desc;
        continue;
      }
    }

    // Try to parse as entry
    // Strip leading whitespace/indentation for parsing
    const stripped = trimmed.replace(/^\s*/, "");
    const entry = parseEntry(stripped);
    if (entry) {
      totalEntries++;
      if (currentSubcategory) {
        currentSubcategory.entries.push(entry);
      } else if (currentCategory) {
        currentCategory.entries.push(entry);
      }
    }
  }

  // Filter out empty categories
  const filtered = categories.filter(
    (c) => c.entries.length > 0 || c.subcategories.length > 0,
  );

  return { categories: filtered, entryCount: totalEntries };
}

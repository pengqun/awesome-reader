"use client";

import { useState, useMemo } from "react";
import { SearchEntry } from "@/types";
import { searchEntries } from "@/lib/search";

interface SearchClientProps {
  searchIndex: SearchEntry[];
}

export default function SearchClient({ searchIndex }: SearchClientProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(
    () => searchEntries(searchIndex, query),
    [searchIndex, query],
  );

  // Get unique list names for displaying filter context
  const resultsByList = useMemo(() => {
    const grouped: Record<string, SearchEntry[]> = {};
    for (const entry of results) {
      if (!grouped[entry.listName]) grouped[entry.listName] = [];
      grouped[entry.listName].push(entry);
    }
    return grouped;
  }, [results]);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Search Awesome Lists</h1>

      <div className="relative mb-8">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search across all awesome lists..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          className="w-full rounded-xl border border-foreground/15 bg-foreground/5 pl-10 pr-4 py-3 text-sm placeholder:text-foreground/40 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
        />
      </div>

      {query && (
        <p className="text-sm text-foreground/50 mb-4">
          {results.length} result{results.length !== 1 ? "s" : ""} found
        </p>
      )}

      {Object.entries(resultsByList).map(([listName, entries]) => (
        <div key={listName} className="mb-6">
          <h2 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-2">
            {listName}
          </h2>
          <div className="space-y-2">
            {entries.map((entry, i) => (
              <a
                key={`${entry.url}-${i}`}
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg border border-foreground/10 p-4 transition-all hover:border-foreground/20 hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-semibold text-blue-500">
                      {entry.name}
                    </h3>
                    {entry.description && (
                      <p className="mt-1 text-sm text-foreground/60">
                        {entry.description}
                      </p>
                    )}
                  </div>
                  <span className="shrink-0 text-xs text-foreground/40 bg-foreground/5 rounded px-2 py-0.5">
                    {entry.categoryName}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}

      {query && results.length === 0 && (
        <div className="text-center py-12 text-foreground/50">
          <p className="text-lg mb-1">No results found</p>
          <p className="text-sm">Try a different search term</p>
        </div>
      )}

      {!query && (
        <div className="text-center py-12 text-foreground/50">
          <p className="text-lg mb-1">Start typing to search</p>
          <p className="text-sm">
            Search across all awesome lists for frameworks, libraries, and tools
          </p>
        </div>
      )}
    </div>
  );
}

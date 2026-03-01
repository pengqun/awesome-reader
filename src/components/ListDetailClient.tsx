"use client";

import { useState, useEffect } from "react";
import { AwesomeList } from "@/types";
import Sidebar from "./Sidebar";
import CategorySection from "./CategorySection";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default function ListDetailClient({ list }: { list: AwesomeList }) {
  const [activeCategory, setActiveCategory] = useState(
    list.categories[0] ? slugify(list.categories[0].name) : "",
  );
  const [filterText, setFilterText] = useState("");

  // Track scroll position to update active category
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px" },
    );

    list.categories.forEach((cat) => {
      const el = document.getElementById(slugify(cat.name));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [list.categories]);

  const handleCategoryClick = (slug: string) => {
    const el = document.getElementById(slug);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveCategory(slug);
    }
  };

  // Filter categories and entries by search text
  const filteredCategories = filterText
    ? list.categories
        .map((cat) => {
          const q = filterText.toLowerCase();
          const filteredEntries = cat.entries.filter(
            (e) =>
              e.name.toLowerCase().includes(q) ||
              e.description.toLowerCase().includes(q),
          );
          const filteredSubs = cat.subcategories
            .map((sub) => ({
              ...sub,
              entries: sub.entries.filter(
                (e) =>
                  e.name.toLowerCase().includes(q) ||
                  e.description.toLowerCase().includes(q),
              ),
            }))
            .filter((sub) => sub.entries.length > 0);
          return {
            ...cat,
            entries: filteredEntries,
            subcategories: filteredSubs,
          };
        })
        .filter((cat) => cat.entries.length > 0 || cat.subcategories.length > 0)
    : list.categories;

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar
        categories={list.categories}
        activeCategory={activeCategory}
        onCategoryClick={handleCategoryClick}
      />

      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="border-b border-foreground/10 px-6 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div>
              <h1 className="text-2xl font-bold">{list.name}</h1>
              <p className="text-sm text-foreground/60 mt-1">
                {list.description}
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs text-foreground/50">
                <span>{list.categories.length} categories</span>
                <span>{list.entryCount} entries</span>
                <a
                  href={`https://github.com/${list.repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono hover:text-blue-500 transition-colors"
                >
                  {list.repo}
                </a>
              </div>
            </div>
          </div>

          {/* In-list search */}
          <div className="mt-4 max-w-md">
            <input
              type="text"
              placeholder={`Search in ${list.name}...`}
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="w-full rounded-lg border border-foreground/15 bg-foreground/5 px-3 py-2 text-sm placeholder:text-foreground/40 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-8">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((cat) => (
              <CategorySection key={cat.name} category={cat} />
            ))
          ) : (
            <p className="text-foreground/50 text-sm">
              {filterText
                ? `No entries matching "${filterText}"`
                : "No entries found."}
            </p>
          )}
        </div>

        {/* Mobile category picker */}
        <div className="lg:hidden fixed bottom-4 right-4">
          <select
            value={activeCategory}
            onChange={(e) => handleCategoryClick(e.target.value)}
            className="rounded-lg border border-foreground/20 bg-background px-3 py-2 text-sm shadow-lg focus:outline-none focus:border-blue-500"
          >
            {list.categories.map((cat) => (
              <option key={cat.name} value={slugify(cat.name)}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </main>
    </div>
  );
}

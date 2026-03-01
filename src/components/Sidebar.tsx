"use client";

import { Category } from "@/types";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

interface SidebarProps {
  categories: Category[];
  activeCategory: string;
  onCategoryClick: (slug: string) => void;
}

export default function Sidebar({
  categories,
  activeCategory,
  onCategoryClick,
}: SidebarProps) {
  return (
    <aside className="w-64 shrink-0 overflow-y-auto border-r border-foreground/10 p-4 hidden lg:block">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground/50 mb-3">
        Categories
      </h3>
      <nav className="space-y-0.5">
        {categories.map((cat) => {
          const slug = slugify(cat.name);
          const isActive = activeCategory === slug;
          return (
            <button
              key={slug}
              onClick={() => onCategoryClick(slug)}
              className={`block w-full text-left rounded-md px-3 py-1.5 text-sm transition-colors ${
                isActive
                  ? "bg-blue-500/10 text-blue-500 font-medium"
                  : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
              }`}
            >
              {cat.name}
              <span className="ml-1.5 text-xs text-foreground/40">
                {cat.entries.length +
                  cat.subcategories.reduce(
                    (acc, sub) => acc + sub.entries.length,
                    0,
                  )}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

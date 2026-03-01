import { Category } from "@/types";
import EntryCard from "./EntryCard";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default function CategorySection({
  category,
}: {
  category: Category;
}) {
  return (
    <section id={slugify(category.name)} className="scroll-mt-20">
      <h2 className="text-xl font-bold mb-1">{category.name}</h2>
      {category.description && (
        <p className="text-sm text-foreground/60 italic mb-3">
          {category.description}
        </p>
      )}

      {/* Direct entries */}
      {category.entries.length > 0 && (
        <div className="grid gap-2 sm:grid-cols-2 mb-4">
          {category.entries.map((entry) => (
            <EntryCard key={entry.url} entry={entry} />
          ))}
        </div>
      )}

      {/* Subcategories */}
      {category.subcategories.map((sub) => (
        <div key={sub.name} className="mt-4">
          <h3
            id={slugify(sub.name)}
            className="text-base font-semibold text-foreground/80 mb-1 scroll-mt-20"
          >
            {sub.name}
          </h3>
          {sub.description && (
            <p className="text-sm text-foreground/50 italic mb-2">
              {sub.description}
            </p>
          )}
          {sub.entries.length > 0 && (
            <div className="grid gap-2 sm:grid-cols-2">
              {sub.entries.map((entry) => (
                <EntryCard key={entry.url} entry={entry} />
              ))}
            </div>
          )}
        </div>
      ))}
    </section>
  );
}

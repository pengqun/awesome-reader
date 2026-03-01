import { loadAllLists } from "@/lib/data";
import ListCard from "@/components/ListCard";

export default async function Home() {
  const lists = await loadAllLists();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Awesome Reader
        </h1>
        <p className="mt-3 text-lg text-foreground/60 max-w-xl mx-auto">
          A better reading experience for GitHub awesome-lists. Browse curated
          lists of awesome frameworks, libraries, and tools.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {lists.map((list) => (
          <ListCard key={list.slug} list={list} />
        ))}
      </div>
    </div>
  );
}

import Link from "next/link";
import { AwesomeList } from "@/types";

export default function ListCard({ list }: { list: AwesomeList }) {
  return (
    <Link
      href={`/list/${list.slug}`}
      className="group block rounded-xl border border-foreground/10 p-5 transition-all hover:border-foreground/25 hover:shadow-md"
    >
      <h2 className="text-lg font-semibold group-hover:text-blue-500 transition-colors">
        {list.name}
      </h2>
      <p className="mt-2 text-sm text-foreground/60 line-clamp-2">
        {list.description}
      </p>
      <div className="mt-4 flex items-center gap-3 text-xs text-foreground/50">
        <span className="flex items-center gap-1">
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          {list.categories.length} categories
        </span>
        <span className="flex items-center gap-1">
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
          {list.entryCount} entries
        </span>
        <span className="ml-auto font-mono text-foreground/40">
          {list.repo}
        </span>
      </div>
    </Link>
  );
}

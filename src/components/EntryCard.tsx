import { Entry } from "@/types";

export default function EntryCard({ entry }: { entry: Entry }) {
  return (
    <a
      href={entry.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-lg border border-foreground/10 p-4 transition-all hover:border-foreground/20 hover:shadow-sm"
    >
      <h4 className="text-sm font-semibold text-blue-500 hover:underline">
        {entry.name}
      </h4>
      {entry.description && (
        <p className="mt-1 text-sm text-foreground/60">{entry.description}</p>
      )}
    </a>
  );
}

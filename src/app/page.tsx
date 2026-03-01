export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center gap-6 text-center max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Awesome Reader
        </h1>
        <p className="text-lg text-foreground/70">
          A better reading experience for GitHub awesome-lists. Browse curated
          lists of awesome frameworks, libraries, and tools.
        </p>
        <div className="mt-4 px-4 py-2 rounded-lg bg-foreground/5 text-sm text-foreground/60">
          Coming soon &mdash; homepage with awesome-list cards
        </div>
      </main>
    </div>
  );
}

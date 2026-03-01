import { Metadata } from "next";
import { loadAllLists } from "@/lib/data";
import { buildSearchIndex } from "@/lib/search";
import SearchClient from "@/components/SearchClient";

export const metadata: Metadata = {
  title: "Search | Awesome Reader",
  description: "Search across all awesome lists for frameworks, libraries, and tools.",
};

export default async function SearchPage() {
  const lists = await loadAllLists();
  const searchIndex = buildSearchIndex(lists);

  return <SearchClient searchIndex={searchIndex} />;
}

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { loadListBySlug, getAllSlugs } from "@/lib/data";
import ListDetailClient from "@/components/ListDetailClient";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const list = await loadListBySlug(params.slug);
  if (!list) return { title: "Not Found" };

  return {
    title: `${list.name} | Awesome Reader`,
    description: list.description,
    openGraph: {
      title: `${list.name} | Awesome Reader`,
      description: list.description,
    },
  };
}

export default async function ListPage({ params }: PageProps) {
  const list = await loadListBySlug(params.slug);
  if (!list) notFound();

  return <ListDetailClient list={list} />;
}

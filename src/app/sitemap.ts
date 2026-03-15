import { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/data";

const BASE_URL = process.env.SITE_URL ?? "https://awesome-reader.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getAllSlugs();

  const listPages: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE_URL}/list/${slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/search`,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...listPages,
  ];
}

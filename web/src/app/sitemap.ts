import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://phantomcat.works";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/news`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  try {
    const apiBase = process.env.API_BASE_URL || "http://localhost:8787";
    const res = await fetch(`${apiBase}/api/news?limit=100`);
    if (res.ok) {
      const data = await res.json();
      const newsPages: MetadataRoute.Sitemap = (data.items ?? []).map(
        (item: { slug: string; date: string }) => ({
          url: `${BASE_URL}/news/${item.slug}`,
          lastModified: new Date(item.date),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        }),
      );
      return [...staticPages, ...newsPages];
    }
  } catch {
    // fallback to static pages only
  }

  return staticPages;
}

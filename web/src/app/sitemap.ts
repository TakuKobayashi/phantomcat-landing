import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://phantomcat.works";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/news`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
  ];

  try {
    // ビルド時はデータを直接インポートしてサイトマップ生成
    const { newsItems } = await import("@/api/data");
    const newsPages: MetadataRoute.Sitemap = newsItems.map((item) => ({
      url: `${BASE_URL}/news/${item.slug}`,
      lastModified: new Date(item.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
    return [...staticPages, ...newsPages];
  } catch {
    return staticPages;
  }
}

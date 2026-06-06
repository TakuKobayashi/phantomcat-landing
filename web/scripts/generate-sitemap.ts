/**
 * next build 後に out/sitemap.xml を生成する
 * news-slugs.json（generate-content.ts が事前生成）を参照する
 *
 * 実行: tsx scripts/generate-sitemap.ts
 */
import { writeFile, readFile } from "fs/promises";
import { join } from "path";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://phantomcat.works";
const OUT_DIR = join(process.cwd(), "out");
const SLUGS_PATH = join(process.cwd(), "src", "lib", "news-slugs.json");

interface SlugEntry {
  slug: string;
  date: string;
}

async function main() {
  let newsSlugs: SlugEntry[] = [];
  try {
    const raw = await readFile(SLUGS_PATH, "utf-8");
    newsSlugs = JSON.parse(raw) as SlugEntry[];
  } catch {
    console.warn("⚠ news-slugs.json not found. Run generate:content first.");
  }

  const pages = [
    { url: `${BASE_URL}/`, lastmod: new Date().toISOString(), priority: "1.0", changefreq: "weekly" },
    { url: `${BASE_URL}/news/`, lastmod: new Date().toISOString(), priority: "0.8", changefreq: "daily" },
    ...newsSlugs.map((item) => ({
      url: `${BASE_URL}/news/${item.slug}/`,
      lastmod: new Date(item.date).toISOString(),
      priority: "0.6",
      changefreq: "monthly",
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${p.url}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  await writeFile(join(OUT_DIR, "sitemap.xml"), xml, "utf-8");
  console.log(`✅ sitemap.xml generated (${pages.length} URLs)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

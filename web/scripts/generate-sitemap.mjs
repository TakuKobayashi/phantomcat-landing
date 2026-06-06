/**
 * ビルド後に out/sitemap.xml を生成するスクリプト
 * news-data.ts をそのまま読み込めないため、worker/src/data.ts と同期が必要
 * → sitemap用のJSONを別途管理するか、ここで直接定義する
 *
 * シンプルな方法: web/src/lib/news-data.ts のスラッグ一覧を
 * web/src/lib/news-slugs.json として出力し、それを読む
 */
import { writeFile, readFile } from "fs/promises";
import { join } from "path";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://phantomcat.works";
const OUT_DIR = join(process.cwd(), "out");

// news-slugs.json は next build 時に生成される（後述のプラグインで対応）
// なければ空配列で続行（最低限のsitemapを生成）
let newsSlugs = [];
try {
  const raw = await readFile(join(process.cwd(), "src/lib/news-slugs.json"), "utf-8");
  newsSlugs = JSON.parse(raw);
} catch {
  console.warn("news-slugs.json not found, sitemap will have no news entries");
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
console.log("✅ sitemap.xml generated");

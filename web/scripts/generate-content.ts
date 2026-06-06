/**
 * content/news/*.md を読み込み、以下を生成する:
 *   web/src/lib/news-data.ts    … Next.js SSG が import するデータ
 *   web/src/lib/news-slugs.json … sitemap 生成用スラッグ一覧
 *
 * 実行: tsx scripts/generate-content.ts
 */
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { loadNewsItems } from "../../content/parse.js";

const CONTENT_DIR = join(process.cwd(), "..", "content");
const LIB_DIR = join(process.cwd(), "src", "lib");

async function main() {
  await mkdir(LIB_DIR, { recursive: true });

  const items = await loadNewsItems(CONTENT_DIR);

  // --- news-data.ts 生成 ---
  const tsLines = [
    `// このファイルは自動生成されます。直接編集しないでください。`,
    `// 記事は content/news/*.md を編集してください。`,
    `import type { NewsItem } from "@/types/news";`,
    ``,
    `export const newsItems: NewsItem[] = [`,
    ...items.map(
      (item) =>
        `  {
    slug: ${JSON.stringify(item.slug)},
    title: ${JSON.stringify(item.title)},
    date: ${JSON.stringify(item.date)},
    tags: ${JSON.stringify(item.tags)},
    excerpt: ${JSON.stringify(item.excerpt)},
    content: ${JSON.stringify(item.content)},
  },`,
    ),
    `];`,
    ``,
  ];

  await writeFile(join(LIB_DIR, "news-data.ts"), tsLines.join("\n"), "utf-8");
  console.log(`✅ news-data.ts generated (${items.length} articles)`);

  // --- news-slugs.json 生成 ---
  const slugs = items.map(({ slug, date }) => ({ slug, date }));
  await writeFile(join(LIB_DIR, "news-slugs.json"), JSON.stringify(slugs, null, 2), "utf-8");
  console.log(`✅ news-slugs.json generated`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

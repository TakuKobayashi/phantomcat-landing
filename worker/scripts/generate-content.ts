/**
 * content/news/*.md を読み込み、以下を生成する:
 *   worker/src/generated/news-data.ts … Hono API が import するデータ
 *
 * 実行: tsx scripts/generate-content.ts
 */
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { loadNewsItems } from "../../content/parse.js";

const CONTENT_DIR = join(process.cwd(), "..", "content");
const GENERATED_DIR = join(process.cwd(), "src", "generated");

async function main() {
  await mkdir(GENERATED_DIR, { recursive: true });

  const items = await loadNewsItems(CONTENT_DIR);

  const tsLines = [
    `// このファイルは自動生成されます。直接編集しないでください。`,
    `// 記事は content/news/*.md を編集してください。`,
    ``,
    `export interface NewsItem {`,
    `  slug: string;`,
    `  title: string;`,
    `  date: string;`,
    `  tags: string[];`,
    `  excerpt: string;`,
    `  content: string;`,
    `}`,
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

  await writeFile(join(GENERATED_DIR, "news-data.ts"), tsLines.join("\n"), "utf-8");
  console.log(`✅ worker/src/generated/news-data.ts generated (${items.length} articles)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

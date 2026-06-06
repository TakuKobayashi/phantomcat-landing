/**
 * web/src/lib/news-data.ts からスラッグ一覧JSONを生成する
 * next build の前に実行することで sitemap.xml 生成に使う
 * TypeScript を直接パースするのが難しいため、正規表現でslug/dateを抽出する
 */
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const dataPath = join(process.cwd(), "src/lib/news-data.ts");
const outPath = join(process.cwd(), "src/lib/news-slugs.json");

const src = await readFile(dataPath, "utf-8");

// slug: "xxx" と date: "xxx" を対で抽出
const slugs = [];
const entries = src.matchAll(/slug:\s*"([^"]+)"[\s\S]*?date:\s*"([^"]+)"/g);
for (const match of entries) {
  slugs.push({ slug: match[1], date: match[2] });
}

await writeFile(outPath, JSON.stringify(slugs, null, 2), "utf-8");
console.log(`✅ news-slugs.json generated (${slugs.length} entries)`);

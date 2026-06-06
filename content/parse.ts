import { readdir, readFile } from "fs/promises";
import { join } from "path";

export interface NewsItem {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  content: string;
}

/** frontmatter を手動パース（外部依存なし） */
function parseFrontmatter(src: string): { meta: Record<string, unknown>; body: string } {
  const match = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: src };

  const [, frontRaw, body] = match;
  const meta: Record<string, unknown> = {};

  let currentKey = "";
  let inArray = false;
  const arrayValues: string[] = [];

  for (const line of frontRaw.split(/\r?\n/)) {
    const arrayItem = line.match(/^\s{2,}-\s+(.+)$/);
    if (arrayItem) {
      arrayValues.push(arrayItem[1].trim());
      continue;
    }
    if (inArray && currentKey) {
      meta[currentKey] = [...arrayValues];
      arrayValues.length = 0;
      inArray = false;
    }
    const kv = line.match(/^([^:]+):\s*(.*)$/);
    if (!kv) continue;
    const [, key, value] = kv;
    const trimmedValue = value.trim();
    if (trimmedValue === "") {
      currentKey = key.trim();
      inArray = true;
    } else {
      meta[key.trim()] = trimmedValue;
    }
  }
  if (inArray && currentKey) {
    meta[currentKey] = [...arrayValues];
  }

  return { meta, body: body.trim() };
}

/** content/news/ 以下の全MDファイルを読み込んでNewsItem[]を返す */
export async function loadNewsItems(contentDir: string): Promise<NewsItem[]> {
  const newsDir = join(contentDir, "news");
  const files = (await readdir(newsDir)).filter((f) => f.endsWith(".md"));

  const items: NewsItem[] = [];
  for (const file of files) {
    const src = await readFile(join(newsDir, file), "utf-8");
    const { meta, body } = parseFrontmatter(src);

    items.push({
      slug: String(meta.slug ?? file.replace(/\.md$/, "")),
      title: String(meta.title ?? ""),
      date: String(meta.date ?? ""),
      tags: Array.isArray(meta.tags) ? (meta.tags as string[]) : [],
      excerpt: String(meta.excerpt ?? ""),
      content: body,
    });
  }

  return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

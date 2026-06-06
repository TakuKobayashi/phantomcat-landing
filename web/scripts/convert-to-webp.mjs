/**
 * next build 後に out/ 内の jpg/png を WebP に変換するスクリプト
 * 元ファイルは残しつつ .webp を追加生成する
 */
import { readdir, readFile, writeFile } from "fs/promises";
import { join, extname, basename } from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const OUT_DIR = join(process.cwd(), "out");

async function findImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findImages(fullPath)));
    } else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

async function main() {
  console.log("🖼  Converting images to WebP...");
  const images = await findImages(OUT_DIR);

  let count = 0;
  for (const imgPath of images) {
    const webpPath = imgPath.replace(/\.(jpg|jpeg|png)$/i, ".webp");
    try {
      await sharp(imgPath).webp({ quality: 85 }).toFile(webpPath);
      count++;
      console.log(`  ✓ ${webpPath.replace(OUT_DIR, "")}`);
    } catch (err) {
      console.warn(`  ✗ Failed: ${imgPath}`, err.message);
    }
  }
  console.log(`✅ Converted ${count} image(s) to WebP.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

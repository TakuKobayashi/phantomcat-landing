import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",      // SSG: out/ に静的ファイルを生成
  trailingSlash: true,   // out/news/slug/index.html 形式にする
  images: {
    unoptimized: true,   // export時はNext.js画像最適化が使えないためoff、sharp scriptで代替
  },
};

export default nextConfig;

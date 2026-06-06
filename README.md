# Night of the Phantom Cat — Official Website

## アーキテクチャ

```
Cloudflare Workers (1プロジェクト)
├── /api/*  → Hono  (worker/src/)
└── /*      → Next.js SSG 静的ファイル (web/out/) ← Wrangler Assets
```

## ディレクトリ構成

```
phantomcat-landing/
├── content/
│   ├── news/              ★ 記事はここに .md ファイルを追加するだけ
│   │   ├── game-announcement.md
│   │   └── dev-log-01.md
│   └── parse.ts           共通 frontmatter パーサー
├── web/                   Next.js SSG
│   ├── scripts/           ビルドスクリプト（tsx で実行）
│   │   ├── generate-content.ts   → src/lib/news-data.ts + news-slugs.json 生成
│   │   ├── generate-sitemap.ts   → out/sitemap.xml 生成
│   │   └── convert-to-webp.ts    → out/ 内画像を WebP 変換
│   ├── src/
│   │   ├── lib/
│   │   │   ├── news-data.ts      ※自動生成・編集禁止
│   │   │   └── news-slugs.json   ※自動生成・編集禁止
│   │   └── ...
│   └── out/               ビルド成果物（gitignore）
└── worker/                Cloudflare Workers + Hono
    ├── scripts/
    │   └── generate-content.ts   → src/generated/news-data.ts 生成
    ├── src/
    │   ├── generated/
    │   │   └── news-data.ts      ※自動生成・編集禁止
    │   ├── index.ts
    │   └── routes/news.ts
    └── wrangler.jsonc
```

## セットアップ

```bash
pnpm install
```

## 開発

```bash
pnpm dev        # Next.js dev server → http://localhost:3000
```

## プレビュー（本番相当）

```bash
pnpm preview    # next build + wrangler dev → http://localhost:8787
```

## デプロイ

```bash
pnpm deploy
```

## 記事の追加方法

1. `content/news/your-slug.md` を作成（frontmatter 形式）
2. `pnpm deploy`

```markdown
---
slug: your-slug
title: 記事タイトル
date: 2025-06-01
tags:
  - お知らせ
excerpt: 記事の概要
---

本文を Markdown で書く
```

## 各スクリプト単体実行

```bash
# web/ 内のスクリプト
pnpm --filter web generate:content   # MD → news-data.ts 生成
pnpm --filter web generate:sitemap   # out/sitemap.xml 生成
pnpm --filter web convert:images     # 画像 → WebP 変換

# worker/ 内のスクリプト
pnpm --filter phantomcat-landing-worker generate:content  # MD → generated/news-data.ts 生成
```

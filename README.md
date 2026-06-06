# Night of the Phantom Cat — Official Website

## アーキテクチャ

```
Cloudflare Workers (1プロジェクト)
├── /api/*   → Hono (worker/src/)
└── /*       → Next.js SSG 静的ファイル (web/out/) ← Wrangler Assets
```

## 構成

```
phantomcat-landing/
├── web/                          # Next.js SSG
│   ├── src/
│   │   ├── app/                  # ページ (/, /news, /news/[slug])
│   │   ├── components/           # Header, Footer, sections
│   │   ├── lib/news-data.ts      # 記事データ（ここに追記してデプロイ）
│   │   └── styles/globals.css
│   ├── scripts/
│   │   ├── generate-news-slugs.mjs   # sitemap用スラッグJSON生成
│   │   ├── generate-sitemap.mjs      # out/sitemap.xml 生成
│   │   └── convert-to-webp.mjs       # out/ 内の画像をWebP変換
│   └── out/                      # ビルド成果物 (git ignore)
└── worker/                       # Cloudflare Workers (Hono)
    ├── src/
    │   ├── index.ts              # /api/* → Hono, /* → Assets
    │   ├── data.ts               # APIのデータ（web/lib/news-data.tsと同期）
    │   └── routes/news.ts        # GET /api/news, /api/news/:slug
    └── wrangler.jsonc
```

## セットアップ

```bash
pnpm install
```

## 開発

```bash
pnpm dev        # Next.js dev server → http://localhost:3000
                # APIは使えない（Honoはwrangler dev経由のみ）
```

## プレビュー（本番相当の動作確認）

```bash
pnpm preview    # next build → wrangler dev → http://localhost:8787
                # /api/* も静的ファイルも1つのWorkerで動作確認できる
```

## デプロイ

```bash
pnpm deploy     # next build → wrangler deploy
```

## 記事の追加方法

1. `web/src/lib/news-data.ts` に記事を追記
2. `worker/src/data.ts` にも同じ記事を追記（APIデータと同期）
3. `pnpm deploy`

## 環境変数

`web/.env.local` に設定（任意）:
```
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

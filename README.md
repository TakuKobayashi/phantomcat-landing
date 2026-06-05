# Night of the Phantom Cat — Official Website

対戦型追いかけっこゲーム「Night of the Phantom Cat」公式サイトのモノレポです。

## 構成

```
phantom-cat/
├── web/       # Next.js 16 (SSR) — フロントエンド
└── server/    # Hono + Cloudflare Workers — Web API
```

## 必要な環境

- Node.js 20+
- pnpm 10+

## セットアップ

```bash
# 依存関係のインストール
pnpm install

# web の開発サーバー起動
pnpm dev:web        # http://localhost:3000

# server の開発サーバー起動
pnpm dev:server     # http://localhost:8787

# フォーマット
pnpm format
pnpm format:check
```

## 環境変数

### web (.env.local)

```
NEXT_PUBLIC_BASE_URL=https://your-domain.com
API_BASE_URL=http://localhost:8787   # 開発時
```

### server (.dev.vars)

特に必要なし（将来の拡張時に追加）

## デプロイ

```bash
# Web フロントエンド（Cloudflare Workers + OpenNext）
cd web && pnpm deploy

# API サーバー（Cloudflare Workers）
cd server && pnpm deploy
```

## ニュース記事の追加

`server/src/data/news.ts` にエントリを追加してください。
記事本文は Markdown 形式で記述します（`# h1`, `## h2`, `**bold**` など）。

## SNS

- X (Twitter): [@phantomcatworks](https://x.com/phantomcatworks)

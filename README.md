# Night of the Phantom Cat — Official Website

対戦型追いかけっこゲーム「Night of the Phantom Cat」公式サイトのモノレポです。

## アーキテクチャ

```
1つの Cloudflare Worker で全て配信
┌─────────────────────────────────┐
│  worker.ts (カスタムエントリ)     │
│                                 │
│  /api/* ──→ Hono (src/api/)     │
│  それ以外 ──→ Next.js (OpenNext) │
│                                 │
│  静的アセット: .open-next/assets │
└─────────────────────────────────┘
```

## 構成

```
phantom-cat/
└── web/
    ├── worker.ts              # Cloudflare Worker エントリーポイント
    ├── wrangler.jsonc         # Wrangler 設定
    ├── open-next.config.ts    # OpenNext 設定
    ├── next.config.ts         # Next.js 設定
    └── src/
        ├── api/               # Hono APIルート & データ
        │   ├── news.ts        # GET /api/news, /api/news/:slug
        │   └── data.ts        # ニュース記事データ (Markdown)
        ├── app/               # Next.js App Router
        │   ├── page.tsx       # トップページ
        │   ├── news/          # お知らせ一覧 / 記事詳細
        │   ├── sitemap.ts
        │   └── robots.ts
        ├── components/
        │   ├── layout/        # Header, Footer
        │   └── sections/      # Hero, About, Features, News, Wishlist
        ├── styles/globals.css # デザインシステム
        └── types/news.ts
```

## セットアップ

```bash
# Node.js 20+ / pnpm 10+ が必要
pnpm install
```

## 開発

```bash
pnpm dev        # Next.js dev server → http://localhost:3000
                # ※ 開発時は API フォールバック (data.ts 直接読み込み) を使用
```

## ビルド & プレビュー

```bash
pnpm preview    # next build → opennextjs build → wrangler dev
                # 本番と同じ Worker ランタイムでローカル確認
```

## デプロイ

```bash
pnpm deploy     # next build → opennextjs build → wrangler deploy
```

## 環境変数

| 変数 | 説明 | デフォルト |
|------|------|-----------|
| `NEXT_PUBLIC_BASE_URL` | 本番ドメイン | `https://phantomcat.works` |

## ニュース記事の追加

`web/src/api/data.ts` に記事オブジェクトを追記してください。
本文 (`content`) は Markdown 形式です。

## SNS

- X (Twitter): [@phantomcatworks](https://x.com/phantomcatworks)

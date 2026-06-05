// Custom Cloudflare Worker entrypoint
// - /api/* → Hono
// - それ以外 → @opennextjs/cloudflare が生成した Next.js ハンドラ
//
// @ts-ignore: generated at build time by `opennextjs-cloudflare build`
import nextHandler from "./.open-next/worker.js";

import { Hono } from "hono";
import { cors } from "hono/cors";
import newsRouter from "./src/api/news";

// ── Hono app (API routes only) ──────────────────────────────────────────────
const api = new Hono<{ Bindings: CloudflareEnv }>();

api.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET"],
  }),
);

api.route("/api/news", newsRouter);
api.get("/api/health", (c) => c.json({ status: "ok" }));

// ── Unified fetch handler ───────────────────────────────────────────────────
export default {
  async fetch(request: Request, env: CloudflareEnv, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // /api/* → Hono
    if (url.pathname.startsWith("/api/")) {
      return api.fetch(request, env, ctx);
    }

    // それ以外 → Next.js (OpenNext)
    return nextHandler.fetch(request, env, ctx);
  },
} satisfies ExportedHandler<CloudflareEnv>;

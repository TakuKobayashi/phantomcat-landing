import { Hono } from "hono";
import { handle } from "hono/vercel";
import { newsItems } from "@/lib/news-data";

export const runtime = "edge";

const app = new Hono().basePath("/api/news");

app.get("/:slug", (c) => {
  const slug = c.req.param("slug");
  const item = newsItems.find((n) => n.slug === slug);
  if (!item) return c.json({ error: "Not found" }, 404);
  return c.json(item);
});

export const GET = handle(app);

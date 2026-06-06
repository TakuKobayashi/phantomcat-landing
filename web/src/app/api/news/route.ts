import { Hono } from "hono";
import { handle } from "hono/vercel";
import { newsItems } from "@/lib/news-data";

export const runtime = "edge";

const app = new Hono().basePath("/api/news");

app.get("/", (c) => {
  const page = Number(c.req.query("page") ?? "1");
  const limit = Number(c.req.query("limit") ?? "10");
  const offset = (page - 1) * limit;

  const items = [...newsItems]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(offset, offset + limit)
    .map(({ content: _content, ...rest }) => rest);

  return c.json({ items, total: newsItems.length });
});

export const GET = handle(app);

import { Hono } from "hono";
import { newsItems } from "../generated/news-data";

const newsRouter = new Hono();

newsRouter.get("/", (c) => {
  const page = Number(c.req.query("page") ?? "1");
  const limit = Number(c.req.query("limit") ?? "10");
  const offset = (page - 1) * limit;

  const items = [...newsItems]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(offset, offset + limit)
    .map(({ content: _content, ...rest }) => rest);

  return c.json({ items, total: newsItems.length });
});

newsRouter.get("/:slug", (c) => {
  const slug = c.req.param("slug");
  const item = newsItems.find((n) => n.slug === slug);
  if (!item) return c.json({ error: "Not found" }, 404);
  return c.json(item);
});

export default newsRouter;

import { Hono } from "hono";
import { cors } from "hono/cors";
import { cache } from "hono/cache";
import newsRouter from "./routes/news";

type Env = {
  ASSETS: Fetcher;
};

const app = new Hono<{ Bindings: Env }>();

// /api/* に CORS とキャッシュを適用
app.use("/api/*", cors({ origin: "*", allowMethods: ["GET"] }));
app.use(
  "/api/*",
  cache({ cacheName: "phantom-cat-api", cacheControl: "public, max-age=300" }),
);

app.route("/api/news", newsRouter);
app.get("/api/health", (c) => c.json({ status: "ok" }));

// /api/* 以外は Next.js SSG の静的アセットを返す
app.all("*", (c) => {
  return c.env.ASSETS.fetch(c.req.raw);
});

export default app;

import { Hono } from "hono";
import { cors } from "hono/cors";
import { cache } from "hono/cache";
import newsRouter from "./routes/news";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: ["http://localhost:3000", "https://your-domain.com"],
    allowMethods: ["GET"],
  }),
);

app.use(
  "/api/*",
  cache({
    cacheName: "phantom-cat-api",
    cacheControl: "public, max-age=300",
  }),
);

app.route("/api/news", newsRouter);

app.get("/api/health", (c) => c.json({ status: "ok" }));

export default app;

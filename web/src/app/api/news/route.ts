import { type NextRequest, NextResponse } from "next/server";
import { newsItems } from "@/lib/news-data";

export const runtime = "edge";

export function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? "10");
  const offset = (page - 1) * limit;

  const items = [...newsItems]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(offset, offset + limit)
    .map(({ content: _content, ...rest }) => rest);

  return NextResponse.json({ items, total: newsItems.length });
}

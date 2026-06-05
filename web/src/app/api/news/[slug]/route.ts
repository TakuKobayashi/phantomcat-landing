import { type NextRequest, NextResponse } from "next/server";
import { newsItems } from "@/lib/news-data";

export const runtime = "edge";

export function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  return params.then(({ slug }) => {
    const item = newsItems.find((n) => n.slug === slug);
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(item);
  });
}

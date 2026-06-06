import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { newsItems } from "@/lib/news-data";
import styles from "./page.module.css";

// SSG: ビルド時に全スラッグのHTMLを生成する
export function generateStaticParams() {
  return newsItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = newsItems.find((n) => n.slug === slug);
  if (!article) return { title: "記事が見つかりません" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      tags: article.tags,
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function renderMarkdown(md: string): string {
  return md
    .split("\n\n")
    .map((block) => {
      if (block.startsWith("# ")) return `<h1>${block.slice(2)}</h1>`;
      if (block.startsWith("## ")) return `<h2>${block.slice(3)}</h2>`;
      if (block.startsWith("### ")) return `<h3>${block.slice(4)}</h3>`;
      const inline = block.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
      return `<p>${inline.replace(/\n/g, "<br>")}</p>`;
    })
    .join("\n");
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = newsItems.find((n) => n.slug === slug);
  if (!article) notFound();

  const contentHtml = renderMarkdown(article.content);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={`container ${styles.inner}`}>
          <Link href="/news/" className={styles.back}>← お知らせ一覧へ</Link>
          <article className={styles.article}>
            <header className={styles.articleHead}>
              <div className={styles.meta}>
                <time dateTime={article.date}>{formatDate(article.date)}</time>
                <div className={styles.tags}>
                  {article.tags.map((tag) => (
                    <span key={tag} className="tag tag-teal">{tag}</span>
                  ))}
                </div>
              </div>
              <h1 className={styles.title}>{article.title}</h1>
              <p className={styles.lead}>{article.excerpt}</p>
            </header>
            <div className={styles.divider} />
            <div className={styles.body} dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </article>
          <div className={styles.share}>
            <span className={styles.shareLabel}>Share</span>
            <a
              href={`https://x.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`https://phantomcat.works/news/${article.slug}/`)}&via=phantomcatworks`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              𝕏 でシェア
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

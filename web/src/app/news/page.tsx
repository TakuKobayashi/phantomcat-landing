import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { NewsItem } from "@/types/news";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "お知らせ",
  description: "Night of the Phantom Cat の最新情報・開発日誌をお届けします。",
};

async function getAllNews(): Promise<Omit<NewsItem, "content">[]> {
  const baseUrl = process.env.API_BASE_URL || "http://localhost:8787";
  try {
    const res = await fetch(`${baseUrl}/api/news?limit=50`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.items ?? [];
  } catch {
    return [];
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function NewsListPage() {
  const news = await getAllNews();

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <div className={styles.head}>
            <Link href="/" className={styles.back}>
              ← ホームへ戻る
            </Link>
            <p className="section-eyebrow">News</p>
            <h1 className={`section-title ${styles.title}`}>お知らせ</h1>
          </div>

          <div className={styles.list}>
            {news.length === 0 ? (
              <p className={styles.empty}>近日公開予定です。しばらくお待ちください。</p>
            ) : (
              news.map((item) => (
                <Link key={item.slug} href={`/news/${item.slug}`} className={`card ${styles.item}`}>
                  <time className={styles.date} dateTime={item.date}>
                    {formatDate(item.date)}
                  </time>
                  <div className={styles.tags}>
                    {item.tags.map((tag) => (
                      <span key={tag} className="tag tag-teal">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className={styles.itemTitle}>{item.title}</h2>
                  <p className={styles.excerpt}>{item.excerpt}</p>
                </Link>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

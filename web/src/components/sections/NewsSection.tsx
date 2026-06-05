import Link from "next/link";
import styles from "./NewsSection.module.css";
import { newsItems } from "@/lib/news-data";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function NewsSection() {
  const news = [...newsItems]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)
    .map(({ content: _content, ...rest }) => rest);

  return (
    <section id="news" className={styles.news}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <p className="section-eyebrow">News</p>
            <h2 className={`section-title ${styles.title}`}>お知らせ</h2>
          </div>
          <Link href="/news" className={`btn btn-outline ${styles.viewAll}`}>
            すべて見る →
          </Link>
        </div>

        {news.length === 0 ? (
          <div className={styles.empty}>
            <p>近日公開予定です。SNSでフォローして最新情報をお見逃しなく！</p>
            <a
              href="https://x.com/phantomcatworks"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              𝕏 フォロー
            </a>
          </div>
        ) : (
          <div className={styles.list}>
            {news.map((item) => (
              <Link key={item.slug} href={`/news/${item.slug}`} className={`card ${styles.item}`}>
                <div className={styles.itemMeta}>
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
                </div>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.excerpt}>{item.excerpt}</p>
                <span className={styles.readMore}>続きを読む →</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

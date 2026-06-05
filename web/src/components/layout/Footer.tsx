import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} id="contact">
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.brandName}>NIGHT OF THE PHANTOM CAT</span>
            <p className={styles.tagline}>逃げるか、捕まえるか。3分で決着。</p>
          </div>

          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <span className={styles.linkGroupTitle}>Follow</span>
              <a
                href="https://x.com/phantomcatworks"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                𝕏 @phantomcatworks
              </a>
            </div>

            <div className={styles.linkGroup}>
              <span className={styles.linkGroupTitle}>Get the game</span>
              <a
                href="#wishlist"
                className={styles.link}
              >
                itch.io（近日公開）
              </a>
              <a
                href="#wishlist"
                className={styles.link}
              >
                Steam（近日公開）
              </a>
            </div>

            <div className={styles.linkGroup}>
              <span className={styles.linkGroupTitle}>Site</span>
              <a href="#about" className={styles.link}>
                About
              </a>
              <a href="#news" className={styles.link}>
                News
              </a>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <p className={styles.copy}>&copy; {year} Phantom Cat Works. All rights reserved.</p>
          <p className={styles.disclaimer}>
            本サイトのゲーム画像・テキストの無断転載を禁じます。
          </p>
        </div>
      </div>
    </footer>
  );
}

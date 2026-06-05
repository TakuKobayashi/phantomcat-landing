"use client";

import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import styles from "./WishlistSection.module.css";

export default function WishlistSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="wishlist" className={styles.wishlist}>
      {/* Background glow effects */}
      <div className={styles.glow1} aria-hidden="true" />
      <div className={styles.glow2} aria-hidden="true" />

      <div className="container">
        <motion.div
          className={styles.inner}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="section-eyebrow" style={{ textAlign: "center" }}>
            Coming Soon
          </p>
          <h2 className={styles.title}>
            ゲームの
            <br />
            <span className={styles.titleAccent}>リリースを待て</span>
          </h2>
          <p className={styles.body}>
            itch.io および Steam にて近日配信予定。
            <br />
            リリース情報はSNSで最速お届けします。フォローして見逃すな！
          </p>

          <div className={styles.platforms}>
            <a
              href="#"
              className={`btn ${styles.btnItch}`}
              aria-label="itch.io ウィッシュリスト（近日公開）"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 245 220"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M31.99 1.365C21.287 7.72.2 31.945 0 38.298v10c0 12.522 11.712 23.523 22.223 23.523 12.14 0 22.318-10.2 22.318-22.def M122.5 0C119.2 0 116 .9 113 2.6L31.99 1.365z" />
                <path d="M122.5 50.5c-19.882 0-36 16.118-36 36s16.118 36 36 36 36-16.118 36-36-16.118-36-36-36z" />
              </svg>
              itch.io（近日公開）
            </a>

            <a
              href="#"
              className={`btn ${styles.btnSteam}`}
              aria-label="Steam ウィッシュリスト（近日公開）"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.711L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.624 0 11.999-5.375 11.999-12S18.603 0 11.979 0z" />
              </svg>
              Steam（近日公開）
            </a>
          </div>

          <div className={styles.social}>
            <span className={styles.socialLabel}>最新情報はこちら</span>
            <a
              href="https://x.com/phantomcatworks"
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-outline ${styles.socialBtn}`}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              @phantomcatworks をフォロー
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

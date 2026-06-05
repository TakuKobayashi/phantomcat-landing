"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className={styles.hero} aria-label="Hero">
      {/* Parallax key art */}
      <motion.div className={styles.keyArt} style={{ y }}>
        <Image
          src="/images/key-art.jpg"
          alt="Night of the Phantom Cat — Key Art"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center top" }}
        />
        <div className={styles.keyArtOverlay} />
      </motion.div>

      {/* Animated stars */}
      <div className={styles.stars} aria-hidden="true">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className={styles.star}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div className={`container ${styles.content}`} style={{ opacity }}>
        <motion.span
          className={`section-eyebrow ${styles.eyebrow}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Indie Game — Coming Soon
        </motion.span>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className={styles.titleNight}>Night of the</span>
          <span className={styles.titlePhantom}>Phantom</span>
          <span className={styles.titleCat}>Cat</span>
        </motion.h1>

        <motion.p
          className={styles.catch}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          逃げるか、捕まえるか。<br />
          <strong>3分で決着。</strong>対戦型追いかけっこゲーム
        </motion.p>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <a
            href="https://x.com/phantomcatworks"
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn-primary ${styles.btnMain}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            最新情報をフォロー
          </a>
          <a href="#about" className={`btn btn-outline ${styles.btnSub}`}>
            ゲームを見る
          </a>
        </motion.div>

        {/* Platform badges */}
        <motion.div
          className={styles.platforms}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
        >
          <span className={`tag ${styles.platformTag}`}>itch.io 近日公開</span>
          <span className={`tag ${styles.platformTag}`}>Steam 近日公開</span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        aria-hidden="true"
      >
        <span className={styles.scrollLine} />
        <span className={styles.scrollLabel}>Scroll</span>
      </motion.div>
    </section>
  );
}

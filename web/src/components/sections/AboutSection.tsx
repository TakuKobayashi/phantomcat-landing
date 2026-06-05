"use client";

import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import styles from "./AboutSection.module.css";

const stats = [
  { value: "3", unit: "分", label: "1マッチの所要時間" },
  { value: "1 vs N", unit: "", label: "非対称対戦" },
  { value: "∞", unit: "", label: "リプレイ性" },
];

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="about" className={`stars-bg ${styles.about}`}>
      <div className="container">
        <div className={styles.grid}>
          {/* Left: text */}
          <div className={styles.textCol}>
            <motion.p
              className="section-eyebrow"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              About the Game
            </motion.p>

            <motion.h2
              className={`section-title ${styles.heading}`}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              夜の街を
              <br />
              <span className={styles.headingAccent}>舞台に</span>
            </motion.h2>

            <motion.div
              className={styles.body}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <p>
                謎の黒猫「ファントムキャット」は、赤いマントをひるがえし夜の都市を疾走する。
                警察チームは包囲網を張り、ファントムキャットを追い詰めろ。
              </p>
              <p>
                逃げる側と捕まえる側——まったく異なる視点と戦略が交錯する、
                非対称マルチプレイヤーゲームです。
              </p>
              <p>
                <strong>1マッチはたった3分。</strong>
                テンポよく遊べる手軽さと、戦術の深みを両立させたゲームデザインを目指しています。
              </p>
            </motion.div>

            <motion.div
              className={styles.statRow}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {stats.map((s, i) => (
                <div key={i} className={styles.stat}>
                  <span className={styles.statValue}>
                    {s.value}
                    <small>{s.unit}</small>
                  </span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: decorative card */}
          <motion.div
            className={styles.visual}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className={styles.visualCard}>
              <div className={styles.eyeGlow} aria-hidden="true" />
              <div className={styles.catSilhouette} aria-hidden="true">
                <svg viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Cat silhouette */}
                  <ellipse cx="100" cy="130" rx="60" ry="75" fill="rgba(13,11,26,0.9)" />
                  <ellipse cx="100" cy="85" rx="45" ry="42" fill="rgba(13,11,26,0.9)" />
                  {/* Ears */}
                  <polygon
                    points="62,55 48,15 82,48"
                    fill="rgba(13,11,26,0.9)"
                    stroke="rgba(192,25,42,0.6)"
                    strokeWidth="1"
                  />
                  <polygon
                    points="138,55 152,15 118,48"
                    fill="rgba(13,11,26,0.9)"
                    stroke="rgba(192,25,42,0.6)"
                    strokeWidth="1"
                  />
                  {/* Eyes */}
                  <ellipse cx="83" cy="82" rx="9" ry="10" fill="#22c55e" />
                  <ellipse cx="117" cy="82" rx="9" ry="10" fill="#22c55e" />
                  <ellipse cx="83" cy="82" rx="3" ry="8" fill="#0d0b1a" />
                  <ellipse cx="117" cy="82" rx="3" ry="8" fill="#0d0b1a" />
                  {/* Eye shine */}
                  <circle cx="79" cy="78" r="2" fill="white" opacity="0.8" />
                  <circle cx="113" cy="78" r="2" fill="white" opacity="0.8" />
                  {/* Cape */}
                  <path
                    d="M 55 120 Q 20 160 30 200 Q 100 195 170 200 Q 180 160 145 120 Z"
                    fill="var(--color-crimson)"
                    opacity="0.85"
                  />
                  <path
                    d="M 55 120 Q 20 160 30 200 Q 100 195 170 200 Q 180 160 145 120 Z"
                    fill="url(#capeGrad)"
                    opacity="0.4"
                  />
                  <defs>
                    <radialGradient id="capeGrad" cx="50%" cy="0%" r="100%">
                      <stop offset="0%" stopColor="#e8263b" />
                      <stop offset="100%" stopColor="#7a0010" />
                    </radialGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                </svg>
              </div>
              <div className={styles.visualLabel}>
                <span>PHANTOM CAT</span>
                <span className={styles.visualSub}>逃げる側</span>
              </div>
            </div>

            {/* Floating badge */}
            <div className={styles.floatBadge}>
              <span className={styles.floatBadgeText}>VS</span>
              <span className={styles.floatBadgeSub}>警察チーム</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

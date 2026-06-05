"use client";

import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import styles from "./FeaturesSection.module.css";

const features = [
  {
    icon: "🎭",
    title: "非対称対戦",
    desc: "ファントムキャット側（逃げる）vs 警察チーム側（捕まえる）。まったく異なるルールと戦術で勝利を目指せ。",
    tag: "Core Mechanic",
    tagStyle: "teal",
  },
  {
    icon: "⏱",
    title: "3分決着",
    desc: "1マッチはわずか3分。スキマ時間でも楽しめるテンポ感。だが、その3分に全てが詰まっている。",
    tag: "Game Design",
    tagStyle: "teal",
  },
  {
    icon: "🌆",
    title: "夜の都市を駆ける",
    desc: "暗がりに隠れ、路地を抜け、ビルの屋上を跳び渡る。都市の夜はファントムキャットの遊び場だ。",
    tag: "Stage",
    tagStyle: "default",
  },
  {
    icon: "👁",
    title: "見つけるな、見つけられるな",
    desc: "警察は連携で包囲網を構築。ファントムキャットは隠密行動で包囲を突破せよ。",
    tag: "Strategy",
    tagStyle: "default",
  },
  {
    icon: "🔥",
    title: "高いリプレイ性",
    desc: "ランダム要素とプレイヤーの判断が毎回異なる展開を生む。同じマッチは二度とない。",
    tag: "Replayability",
    tagStyle: "crimson",
  },
  {
    icon: "🐱",
    title: "個性豊かなキャラ",
    desc: "ファントムキャット、警察犬、市民キャット——ユニークなキャラクターたちが夜の街に集う。",
    tag: "Characters",
    tagStyle: "crimson",
  },
];

export default function FeaturesSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="features" className={styles.features}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-eyebrow">Features</p>
          <h2 className={`section-title ${styles.title}`}>
            ゲームの<span className={styles.titleAccent}>特徴</span>
          </h2>
        </motion.div>

        <div className={styles.grid}>
          {features.map((f, i) => (
            <motion.div
              key={i}
              className={`card ${styles.card}`}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
            >
              <span className={styles.cardIcon} aria-hidden="true">
                {f.icon}
              </span>
              <div className={styles.cardContent}>
                <div className={styles.cardTop}>
                  <h3 className={styles.cardTitle}>{f.title}</h3>
                  <span className={`tag tag-${f.tagStyle}`}>{f.tag}</span>
                </div>
                <p className={styles.cardDesc}>{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

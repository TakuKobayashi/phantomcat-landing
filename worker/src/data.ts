export interface NewsItem {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  content: string;
}

export const newsItems: NewsItem[] = [
  {
    slug: "game-announcement",
    title: "「Night of the Phantom Cat」開発開始のお知らせ",
    date: "2025-05-01",
    tags: ["お知らせ", "開発日誌"],
    excerpt: "対戦型追いかけっこゲーム「Night of the Phantom Cat」の開発を開始しました。",
    content: `# 「Night of the Phantom Cat」開発開始のお知らせ

対戦型追いかけっこゲーム **Night of the Phantom Cat** の開発を正式に開始しました。

## ゲームコンセプト

**逃げるか、捕まえるか。3分で決着。**

本作は、ファントムキャットが警察の追跡をかいくぐりながら街を駆け抜けるスリリングな非対称対戦ゲームです。

## 開発チーム

少人数のインディーチームで開発を進めています。今後もXアカウント（@phantomcatworks）で最新情報をお届けします！`,
  },
  {
    slug: "dev-log-01",
    title: "開発日誌 #01 ― キャラクターデザイン公開",
    date: "2025-05-20",
    tags: ["開発日誌", "アート"],
    excerpt: "ファントムキャットと警察キャラクターのデザインが完成しました。",
    content: `# 開発日誌 #01 ― キャラクターデザイン公開

今回はキャラクターデザインの進捗をご報告します。

## ファントムキャット

赤いマントをまとった謎の黒猫。夜の街を自在に駆け抜けます。緑の瞳が闇の中で光り、その正体を誰も知らない——。

## 警察キャラクター

街の秩序を守るため、ファントムキャットを追跡します。チームワークで包囲網を張り巡らせましょう。

次回の開発日誌もお楽しみに！`,
  },
];

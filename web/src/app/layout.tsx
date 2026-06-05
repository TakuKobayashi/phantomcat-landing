import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://phantomcat.works";
const GAME_TITLE = "Night of the Phantom Cat";
const DESCRIPTION =
  "逃げるか、捕まえるか。3分で決着。非対称対戦型追いかけっこゲーム「Night of the Phantom Cat」公式サイト。itch.io・Steam配信予定。";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${GAME_TITLE} — 公式サイト`,
    template: `%s | ${GAME_TITLE}`,
  },
  description: DESCRIPTION,
  keywords: [
    "Night of the Phantom Cat",
    "インディーゲーム",
    "対戦ゲーム",
    "追いかけっこ",
    "非対称対戦",
    "itch.io",
    "Steam",
    "indie game",
    "asymmetric multiplayer",
    "cat game",
  ],
  authors: [{ name: "Phantom Cat Works" }],
  creator: "Phantom Cat Works",
  publisher: "Phantom Cat Works",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: BASE_URL,
    siteName: GAME_TITLE,
    title: `${GAME_TITLE} — 逃げるか、捕まえるか。3分で決着。`,
    description: DESCRIPTION,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Night of the Phantom Cat — Key Art",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@phantomcatworks",
    creator: "@phantomcatworks",
    title: `${GAME_TITLE} — 逃げるか、捕まえるか。3分で決着。`,
    description: DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d0b1a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import NewsSection from "@/components/sections/NewsSection";
import WishlistSection from "@/components/sections/WishlistSection";

export const metadata: Metadata = {
  title: "Night of the Phantom Cat — 公式サイト",
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <NewsSection />
        <WishlistSection />
      </main>
      <Footer />
    </>
  );
}

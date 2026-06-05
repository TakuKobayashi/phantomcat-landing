"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import styles from "./Header.module.css";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#features", label: "Features" },
  { href: "#news", label: "News" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <a href="/" className={styles.logo} aria-label="Night of the Phantom Cat — Home">
          <span className={styles.logoIcon}>🐱</span>
          <span className={styles.logoText}>PHANTOM CAT</span>
        </a>

        {/* Desktop nav */}
        <nav className={styles.nav} aria-label="Main navigation">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              className={styles.navLink}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        {/* CTA */}
        <motion.a
          href="#wishlist"
          className={`btn btn-primary ${styles.cta}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          ウィッシュリスト
        </motion.a>

        {/* Mobile hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={menuOpen}
        >
          <span className={menuOpen ? styles.barOpen : ""}></span>
          <span className={menuOpen ? styles.barOpen : ""}></span>
          <span className={menuOpen ? styles.barOpen : ""}></span>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={styles.mobileLink}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="#wishlist" className={`btn btn-primary ${styles.mobileCta}`}>
              ウィッシュリスト
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

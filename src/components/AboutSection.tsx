"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useInView } from "motion/react";
import ChannelStats from "@/components/ChannelStats";
import { useTranslations } from "next-intl";

/* ── Leaf data ── */
interface PageFace {
  type: "cover" | "image" | "text" | "backcover";
  src?: string;
  alt?: string;
  keys?: string[];
}
interface Leaf { front: PageFace; back: PageFace; }

const LEAVES: Leaf[] = [
  {
    front: { type: "cover" },
    back: { type: "image", src: "/assets/almir-photo.jpg", alt: "Almir Santos" },
  },
  {
    front: { type: "text", keys: ["text1a", "text1b"] },
    back: { type: "image", src: "/assets/collection-01.jpg", alt: "Game Collection" },
  },
  {
    front: { type: "text", keys: ["text2a", "text2b"] },
    back: { type: "image", src: "/assets/collection-02.jpg", alt: "Game Collection" },
  },
  {
    front: { type: "text", keys: ["text3a", "text3b"] },
    back: { type: "image", src: "/assets/collection-03.jpg", alt: "Game Collection" },
  },
  {
    front: { type: "text", keys: ["text4a", "text4b"] },
    back: { type: "image", src: "/assets/collection-04.jpg", alt: "Game Collection" },
  },
  {
    front: { type: "text", keys: ["text5a"] },
    back: { type: "backcover" },
  },
];

/* ── Page face renderer ── */
function FaceContent({ face, t }: { face: PageFace; t: ReturnType<typeof useTranslations> }) {
  switch (face.type) {
    case "cover":
      return (
        <div className="abt-page abt-cover">
          <div className="abt-cover-badge">EDIÇÃO ESPECIAL</div>
          <div className="abt-cover-title-wrap">
            <h3 className="abt-cover-title">{t("title")}</h3>
          </div>
          <div className="abt-cover-channel">ALMIR SANTOS GAMES</div>
          <div className="abt-cover-year">EST. 2020</div>
        </div>
      );
    case "image":
      return (
        <div className={`abt-page abt-img ${face.src === "/assets/almir-photo.jpg" ? "abt-img--contain" : ""}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={face.src}
            alt={face.alt || ""}
            className={face.src === "/assets/almir-photo.jpg" ? "abt-img-contain" : "abt-img-cover"}
            draggable={false}
          />
        </div>
      );
    case "text":
      return (
        <div className="abt-page abt-txt">
          <div className="abt-txt-inner">
            {face.keys?.map((key) => (
              <p key={key} className="abt-txt-p">{t(key)}</p>
            ))}
          </div>
        </div>
      );
    case "backcover":
      return (
        <div className="abt-page abt-backcover">
          <div className="abt-bc-emoji">🎮</div>
          <div className="abt-bc-name">ALMIR SANTOS</div>
          <div className="abt-bc-sub">GAMES</div>
        </div>
      );
    default:
      return null;
  }
}

/* ── Main component ── */
export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [isSettled, setIsSettled] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const t = useTranslations("About");
  const tMag = useTranslations("Magazine");

  const total = LEAVES.length;
  const isOpen = currentPage > 0;

  const handleClick = useCallback(() => {
    if (!isSettled) {
      setIsSettled(true);
      setTimeout(() => setCurrentPage(1), 700);
      return;
    }
    if (currentPage < total) setCurrentPage((p) => p + 1);
  }, [isSettled, currentPage, total]);

  const prev = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentPage > 0) setCurrentPage((p) => p - 1);
  }, [currentPage]);

  const next = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentPage < total) setCurrentPage((p) => p + 1);
  }, [currentPage, total]);

  const close = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPage(0);
    setIsSettled(false);
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center py-16 sm:py-24"
    >
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-6 sm:mb-10 flex flex-col items-center"
      >
        <h2 className="section-title hero-glitch text-white text-center" data-text={t("title")}>
          {t("title")}
        </h2>
      </motion.div>

      {/* Magazine viewport */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="abt-viewport"
      >
        {/* Stage (floating / settled) */}
        <div
          className={`abt-stage ${isSettled ? "abt-settled" : "abt-floating"} ${isOpen ? "abt-opened" : ""}`}
          onClick={handleClick}
        >
          {/* Shadow under floater */}
          {!isSettled && <div className="abt-shadow" />}

          {/* 3D book */}
          <div className="abt-perspective">
            <div className="abt-book">
              {LEAVES.map((leaf, i) => {
                const flipped = i < currentPage;
                const z = flipped ? total + i : total - i;
                return (
                  <div key={i} className={`abt-leaf${flipped ? " abt-leaf--flip" : ""}`} style={{ zIndex: z }}>
                    <div className="abt-face abt-face--front">
                      <FaceContent face={leaf.front} t={t} />
                    </div>
                    <div className="abt-face abt-face--back">
                      <FaceContent face={leaf.back} t={t} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Hint */}
        {!isSettled && (
          <motion.div className="abt-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
            {tMag("clickToOpen")}
          </motion.div>
        )}

        {/* Nav */}
        {isSettled && (
          <motion.div className="abt-nav" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
            <button className="abt-nav-btn" onClick={prev} disabled={currentPage === 0} aria-label="Previous page">◀</button>
            <span className="abt-nav-counter">{currentPage} / {total}</span>
            <button className="abt-nav-btn" onClick={next} disabled={currentPage >= total} aria-label="Next page">▶</button>
            <button className="abt-nav-btn abt-nav-close" onClick={close} aria-label="Close">✕</button>
          </motion.div>
        )}
      </motion.div>

      {/* Channel Stats */}
      <div className="w-full mt-8 site-container channel-stats-integrated">
        <ChannelStats />
      </div>
      <style dangerouslySetInnerHTML={{ __html: `.channel-stats-integrated > section { min-height: auto !important; padding: 0 !important; }` }} />
    </section>
  );
}

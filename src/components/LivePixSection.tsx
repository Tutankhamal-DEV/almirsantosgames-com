"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Heart, ExternalLink, Star, Copy, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import RetroButton from "./RetroButton";

/* ── URLs ─────────────────────────────────────────────── */
const LIVEPIX_URL = "https://livepix.gg/almirsantos10";
const MEMBRO_URL = "https://www.youtube.com/@AlmirSantos/join";
const PIX_KEY = "2abd7000-f8fd-4d99-a685-5aa284a888c5";

/* ── Support Card ────────────────────────────────────── */

interface CardProps {
  href: string;
  imageSrc: string;
  imageSrcSet: string;
  imageAlt: string;
  title: string;
  description: string;
  cta: string;
  ctaIcon: React.ReactNode;
  delay: number;
  isInView: boolean;
}

function SupportCard({
  href,
  imageSrc,
  imageSrcSet,
  imageAlt,
  title,
  description,
  cta,
  ctaIcon,
  delay,
  isInView,
}: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="support-card-motion"
    >
      <div className="glow-card support-card-outer">
        <div className="glow-card-fill support-card-fill">
          {/* QR Code Image */}
          <div className="support-qr-container">
            {/* eslint-disable-next-line @next/next/no-img-element -- uses srcSet for responsive delivery */}
            <img
              src={imageSrc}
              srcSet={imageSrcSet}
              sizes="(max-width: 640px) 120px, 176px"
              alt={imageAlt}
              width={176}
              height={176}
              className="support-qr-img"
              draggable={false}
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Title */}
          <h3 className="font-pixel support-card-title">
            {title}
          </h3>

          {/* Description */}
          <p className="font-mono support-card-desc">
            {description}
          </p>

          {/* CTA Button — direct link */}
          <RetroButton
            href={href}
            icon={ctaIcon}
            label={cta}
            trailing={
              <ExternalLink size={14} color="#fff" className="icon-trailing-dim" />
            }
            className="w-full justify-center"
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ── Pix Copy Card ───────────────────────────────────── */

function PixCopyCard({
  delay,
  isInView,
}: {
  delay: number;
  isInView: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const t = useTranslations("LivePix");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PIX_KEY);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = PIX_KEY;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="support-card-motion"
    >
      <div className="glow-card support-card-outer">
        <div className="glow-card-fill support-card-fill">
          {/* Pix Image */}
          <div className="support-qr-container">
            {/* eslint-disable-next-line @next/next/no-img-element -- uses srcSet for responsive delivery */}
            <img
              src="/assets/logo_pix_direto_md.webp"
              srcSet="/assets/logo_pix_direto_sm.webp 120w, /assets/logo_pix_direto_md.webp 176w, /assets/logo_pix_direto_lg.webp 260w"
              sizes="(max-width: 640px) 120px, 176px"
              alt={t("pixImageAlt")}
              width={176}
              height={176}
              className="support-qr-img"
              draggable={false}
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Title */}
          <h3 className="font-pixel support-card-title">
            {t("pixTitle")}
          </h3>

          {/* Description */}
          <p className="font-mono pix-card-desc">
            {t("pixDesc")}
          </p>

          {/* Pix Key Display */}
          <div className="font-mono pix-key-display">
            {PIX_KEY}
          </div>

          {/* Copy Button — matches RetroButton style */}
          <motion.button
            onClick={handleCopy}
            whileHover={{ y: -3 }}
            whileTap={{ y: 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className={`retro-btn w-full justify-center`}
          >
            {copied ? (
              <Check size={16} color="#22c55e" />
            ) : (
              <Copy size={16} color="#fff" />
            )}
            <span
              className={`font-mono pix-copy-btn-label ${copied ? "pix-copy-success" : ""}`}
            >
              {copied ? "Copiado!" : t("pixCta")}
            </span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Section ───────────────────────────────────────── */

export default function SupportSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const t = useTranslations("LivePix");

  return (
    <section
      id="livepix"
      ref={ref}
      className="relative z-10 flex items-center justify-center livepix-section"
    >
      <div className="site-container">
        {/* Section Header — standardized pattern */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="livepix-header"
        >
          <h2
            className="section-title hero-glitch text-white"
            data-text={t("title")}
          >
            {t("title")}
          </h2>
          <p className="font-mono livepix-subtitle">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* 3 Support Cards Grid */}
        <div className="livepix-grid max-lg:!grid-cols-1">
          {/* Seja Membro */}
          <SupportCard
            href={MEMBRO_URL}
            imageSrc="/assets/seja_membro_almir_md.webp"
            imageSrcSet="/assets/seja_membro_almir_sm.webp 120w, /assets/seja_membro_almir_md.webp 176w, /assets/seja_membro_almir_lg.webp 260w"
            imageAlt={t("memberImageAlt")}
            title={t("memberTitle")}
            description={t("memberDesc")}
            cta={t("memberCta")}
            ctaIcon={<Star size={16} color="#fff" />}
            delay={0.2}
            isInView={isInView}
          />

          {/* LivePix */}
          <SupportCard
            href={LIVEPIX_URL}
            imageSrc="/assets/livepix_almir_md.webp"
            imageSrcSet="/assets/livepix_almir_sm.webp 120w, /assets/livepix_almir_md.webp 176w, /assets/livepix_almir_lg.webp 260w"
            imageAlt={t("livepixImageAlt")}
            title={t("livepixTitle")}
            description={t("livepixDesc")}
            cta={t("livepixCta")}
            ctaIcon={<Heart size={16} color="#fff" />}
            delay={0.35}
            isInView={isInView}
          />

          {/* Pix Direto — Copiar Chave */}
          <PixCopyCard delay={0.5} isInView={isInView} />
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { Heart, ExternalLink, Star, Copy, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import RetroButton from "./RetroButton";

/* ── URLs ─────────────────────────────────────────────── */
const LIVEPIX_URL = "https://livepix.gg/almirsantos10";
const MEMBRO_URL = "https://www.youtube.com/@AlmirSantos/join";
const PIX_KEY = "pix@almirsantosgames.com";

/* ── Support Card ────────────────────────────────────── */

interface CardProps {
  href: string;
  imageSrc: string;
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
      style={{ height: "100%" }}
    >
      <div className="glow-card" style={{ height: "100%" }}>
        <div
          className="glow-card-fill"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            height: "100%",
            padding: "32px 24px",
          }}
        >
          {/* QR Code Image */}
          <div
            style={{
              width: "180px",
              height: "180px",
              borderRadius: "12px",
              overflow: "hidden",
              marginBottom: "20px",
              border: "2px solid rgba(249,115,22,0.4)",
              backgroundColor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={176}
              height={176}
              style={{ objectFit: "contain" }}
              draggable={false}
            />
          </div>

          {/* Title */}
          <h3
            className="font-pixel"
            style={{
              color: "#fff",
              fontSize: "24px",
              marginBottom: "12px",
              letterSpacing: "0.1em",
            }}
          >
            {title}
          </h3>

          {/* Description */}
          <p
            className="font-mono"
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "15px",
              lineHeight: "1.7",
              marginBottom: "24px",
              maxWidth: "280px",
              flex: 1,
            }}
          >
            {description}
          </p>

          {/* CTA Button — direct link */}
          <RetroButton
            href={href}
            icon={ctaIcon}
            label={cta}
            trailing={
              <ExternalLink size={14} color="#fff" style={{ opacity: 0.6 }} />
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
      style={{ height: "100%" }}
    >
      <div className="glow-card" style={{ height: "100%" }}>
        <div
          className="glow-card-fill"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            height: "100%",
            padding: "32px 24px",
          }}
        >
          {/* Pix Image */}
          <div
            style={{
              width: "180px",
              height: "180px",
              borderRadius: "12px",
              overflow: "hidden",
              marginBottom: "20px",
              border: "2px solid rgba(249,115,22,0.4)",
              backgroundColor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src="/assets/logo_pix_direto.png"
              alt={t("pixImageAlt")}
              width={176}
              height={176}
              style={{ objectFit: "contain" }}
              draggable={false}
            />
          </div>

          {/* Title */}
          <h3
            className="font-pixel"
            style={{
              color: "#fff",
              fontSize: "24px",
              marginBottom: "12px",
              letterSpacing: "0.1em",
            }}
          >
            {t("pixTitle")}
          </h3>

          {/* Description */}
          <p
            className="font-mono"
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "15px",
              lineHeight: "1.7",
              marginBottom: "16px",
              maxWidth: "280px",
            }}
          >
            {t("pixDesc")}
          </p>

          {/* Pix Key Display */}
          <div
            className="font-mono"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(249,115,22,0.3)",
              borderRadius: "8px",
              padding: "8px 16px",
              marginBottom: "16px",
              fontSize: "13px",
              color: "#f97316",
              letterSpacing: "0.03em",
              wordBreak: "break-all",
            }}
          >
            {PIX_KEY}
          </div>

          {/* Copy Button */}
          <motion.button
            onClick={handleCopy}
            whileHover={{ y: -3 }}
            whileTap={{ y: 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className={`retro-btn w-full justify-center ${copied ? "!border-green-500 !shadow-[0_5px_0_#166534]" : ""}`}
          >
            {copied ? (
              <Check size={16} color="#22c55e" />
            ) : (
              <Copy size={16} color="#fff" />
            )}
            <span
              className="font-mono"
              style={{
                fontSize: "14px",
                color: copied ? "#22c55e" : "#fff",
                letterSpacing: "0.12em",
                fontWeight: "bold",
                textShadow: "0 1px 3px rgba(0,0,0,0.6)",
              }}
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
      className="relative z-10 flex items-center justify-center"
      style={{ minHeight: "100vh", padding: "60px 24px" }}
    >
      <div style={{ width: "100%", maxWidth: "1000px", margin: "0 auto" }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <div className="glow-card" style={{ display: "inline-block" }}>
            <div className="glow-card-fill" style={{ padding: "28px 52px" }}>
              <h2
                className="font-pixel hero-glitch"
                data-text={t("title")}
                style={{
                  color: "#fff",
                  fontSize: "30px",
                  letterSpacing: "0.12em",
                  marginBottom: "10px",
                }}
              >
                {t("title")}
              </h2>
              <p
                className="font-mono"
                style={{ color: "rgba(220,220,220,0.8)", fontSize: "15px" }}
              >
                {t("subtitle")}
              </p>
            </div>
          </div>
        </motion.div>

        {/* 3 Support Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "24px",
          }}
        >
          {/* Seja Membro */}
          <SupportCard
            href={MEMBRO_URL}
            imageSrc="/assets/seja_membro_almir.png"
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
            imageSrc="/assets/livepix_almir.png"
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

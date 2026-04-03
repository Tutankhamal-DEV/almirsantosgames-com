"use client";

import { useTranslations } from "next-intl";
import Hero from "@/components/Hero";
import YouTubeLiveSection from "@/components/YouTubeLiveSection";
import LatestVideosSection from "@/components/LatestVideosSection";
import LivePixSection from "@/components/LivePixSection";
import MagazineSection from "@/components/MagazineSection";
import AboutSection from "@/components/AboutSection";

export default function Home() {
  const t = useTranslations("Footer");

  return (
    <>
      <Hero />

      {/* About Section (Now includes ChannelStats) */}
      <AboutSection />

      {/* Decorative divider */}
      <div className="relative z-10 site-container">
        <div className="h-px bg-gradient-to-r from-transparent via-retro-red/50 to-transparent" />
      </div>

      <YouTubeLiveSection />

      <div className="relative z-10 site-container">
        <div className="h-px bg-gradient-to-r from-transparent via-retro-gold/30 to-transparent" />
      </div>

      <LatestVideosSection />

      <div className="relative z-10 site-container">
        <div className="h-px bg-gradient-to-r from-transparent via-retro-gold/30 to-transparent" />
      </div>

      <LivePixSection />

      <div className="relative z-10 site-container">
        <div className="h-px bg-gradient-to-r from-transparent via-retro-gold/30 to-transparent" />
      </div>

      <MagazineSection />

      {/* Footer */}
      <footer className="relative z-10 bg-retro-black/80 backdrop-blur-md border-t border-retro-red/20">
        <div className="site-container py-8 flex flex-col items-center gap-4 text-center max-w-4xl">
          <p className="font-mono text-xs md:text-sm text-white/70">
            <span className="text-[#FF3333]">{t("developedBy")}</span>{" "}
            <a
              href="https://tutankhamal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="dev-glitch text-[#FF3333]"
              data-text="Tutankhamal DEV"
            >
              Tutankhamal DEV
            </a>
          </p>
          <p className="font-mono text-xs text-white/60 leading-relaxed max-w-2xl italic">
            &quot;Trata-se de um pequeno gesto de agradecimento, feito por mim, André (Tutankhamal), mas é em nome de toda a comunidade e entregue a uma pessoa que sem dúvidas traz alegria para o dia de muitas pessias.&quot;
          </p>
          <p className="font-mono text-[10px] text-white/40 mt-2">
            {t("rights", { year: new Date().getFullYear() })}
          </p>
        </div>
      </footer>
    </>
  );
}

"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { Home, Radio, Play, Heart, Menu, X, BookOpen } from "lucide-react";
import { useLiveStatus } from "@/lib/LiveContext";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { locales, type Locale } from "@/i18n/routing";

/* ── Locale metadata ──────────────────────────────────── */
const LOCALE_META: Record<Locale, { flag: string; name: string }> = {
  pt: { flag: "🇧🇷", name: "Português" },
  en: { flag: "🇺🇸", name: "English" },
  es: { flag: "🇪🇸", name: "Español" },
  fr: { flag: "🇫🇷", name: "Français" },
  it: { flag: "🇮🇹", name: "Italiano" },
  de: { flag: "🇩🇪", name: "Deutsch" },
  nl: { flag: "🇳🇱", name: "Nederlands" },
  ru: { flag: "🇷🇺", name: "Русский" },
  zh: { flag: "🇨🇳", name: "中文" },
  ja: { flag: "🇯🇵", name: "日本語" },
  ko: { flag: "🇰🇷", name: "한국어" },
  ar: { flag: "🇸🇦", name: "العربية" },
  hi: { flag: "🇮🇳", name: "हिन्दी" },
  tr: { flag: "🇹🇷", name: "Türkçe" },
  pl: { flag: "🇵🇱", name: "Polski" },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const { isLive } = useLiveStatus();
  const t = useTranslations("Navbar");
  const rawLocale = useLocale();
  const locale = (rawLocale in LOCALE_META ? rawLocale : "pt") as Locale;
  const router = useRouter();
  const pathname = usePathname();

  /* ── Scrollspy — tracks which section is in viewport ── */
  useEffect(() => {
    const SECTION_IDS = ["hero", "live", "videos", "livepix", "magazine"];
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.35, rootMargin: "-48px 0px 0px 0px" },
      );
      io.observe(el);
      observers.push(io);
    });

    return () => observers.forEach((io) => io.disconnect());
  }, []);

  const NAV_LINKS = useMemo(() => [
    { href: "#hero" as const, label: t("home"), icon: Home, id: "home" },
    { href: "#live" as const, label: t("live"), icon: Radio, id: "live" },
    { href: "#videos" as const, label: t("videos"), icon: Play, id: "videos" },
    {
      href: "#livepix" as const,
      label: t("support"),
      icon: Heart,
      id: "apoie",
    },
    {
      href: "#magazine" as const,
      label: t("magazine"),
      icon: BookOpen,
      id: "magazine",
    },
  ], [t]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setIsOpen(false);
    setLangOpen(false);
    // Delay scroll so menu close animation doesn't conflict
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        const navHeight = 48;
        const top =
          (target as HTMLElement).getBoundingClientRect().top +
          window.scrollY -
          navHeight;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 100);
  };

  const switchLocale = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
    setLangOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1001] bg-retro-black/80 backdrop-blur-md border-b border-retro-red/20">
      <div className="navbar-container">
        <div className="flex items-center justify-between h-10 sm:h-12">
          {/* Brand — left */}
          <a
            href="#hero"
            onClick={(e) => handleClick(e, "#hero")}
            className="font-pixel text-xs sm:text-sm text-white hover:text-retro-gold transition-colors whitespace-nowrap flex items-center gap-2 shrink-0"
            aria-label="Almir Santos Games"
          >
            <Image
              src="/assets/almirsantos_hero_animation.avif"
              alt="Logo"
              width={247}
              height={220}
              className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
              unoptimized
            />
          </a>

          {/* Desktop: Nav Links — centered, fills available space */}
          <div className="hidden sm:flex items-center justify-center flex-1 gap-3 lg:gap-5 min-w-0">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={`font-mono text-xs lg:text-sm transition-colors duration-300 flex items-center gap-1 lg:gap-1.5 whitespace-nowrap ${link.id === "live" && isLive
                  ? "text-red-500 hover:text-red-400"
                  : activeSection === link.href.slice(1)
                    ? "nav-link-active"
                    : "text-white hover:text-red-500"
                  }`}
              >
                {link.id === "live" && isLive ? (
                  <span className="live-pulse-icon">
                    <link.icon size={14} />
                  </span>
                ) : (
                  <link.icon size={14} />
                )}
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop: Language Switcher — right */}
          <div className="hidden sm:block relative shrink-0 ml-2">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="retro-btn-sm font-mono text-xs"
              aria-label="Language"
            >
              <span className="text-base leading-none">{LOCALE_META[locale].flag}</span>
              <span
                className="uppercase text-white font-bold tracking-wider"
                style={{ fontSize: "11px" }}
              >
                {locale}
              </span>
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute right-0 top-full mt-2 rounded-xl overflow-hidden shadow-2xl"
                  style={{
                    background: "rgba(8, 8, 8, 0.95)",
                    border: "1px solid rgba(220, 38, 38, 0.15)",
                    backdropFilter: "blur(20px)",
                    width: "360px",
                    maxHeight: "420px",
                    overflowY: "auto",
                  }}
                >
                  <div className="grid grid-cols-2 p-3 gap-1.5">
                    {locales.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => switchLocale(loc)}
                        className={`text-left px-4 py-3 font-mono flex items-center gap-3 rounded-xl transition-all duration-150 ${loc === locale
                          ? "text-retro-gold bg-retro-gold/10 shadow-[inset_0_0_0_1px_rgba(212,160,23,0.25)]"
                          : "text-white/70 hover:text-white hover:bg-white/8"
                          }`}
                      >
                        <span className="text-xl leading-none shrink-0">{LOCALE_META[loc].flag}</span>
                        <span className="text-sm truncate">{LOCALE_META[loc].name}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile: Language + Menu — grid ensures equal size */}
          <div className="sm:hidden grid grid-cols-2 gap-1.5">
            <button
              onClick={() => {
                setLangOpen(!langOpen);
                setIsOpen(false);
              }}
              className="retro-btn-sm font-mono text-xs justify-center"
              style={{ padding: '4px 8px', gap: '4px' }}
              aria-label="Language"
            >
              <span className="text-xs leading-none">{LOCALE_META[locale].flag}</span>
              <span
                className="uppercase text-white font-bold tracking-wider"
                style={{ fontSize: '10px' }}
              >
                {locale}
              </span>
            </button>

            <button
              onClick={() => {
                setIsOpen(!isOpen);
                setLangOpen(false);
              }}
              className="retro-btn-sm font-mono text-xs justify-center"
              style={{ padding: '4px 8px', gap: '4px' }}
              aria-label="Menu"
            >
              {isOpen ? (
                <X size={13} color="#fff" />
              ) : (
                <Menu size={13} color="#fff" />
              )}
              <span
                className="uppercase text-white font-bold tracking-wider"
                style={{ fontSize: '10px' }}
              >
                Menu
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile backdrop — closes menu on tap outside */}
      <AnimatePresence>
        {(isOpen || langOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="sm:hidden fixed inset-0 bg-black/50 z-0 pointer-events-none"
            onClick={() => {
              setIsOpen(false);
              setLangOpen(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden bg-retro-black/95 border-t border-retro-red/20 overflow-hidden relative z-10"
          >
            <div className="flex flex-col items-center px-4 py-3 gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={`font-mono text-base transition-colors py-3 border-b border-retro-red/10 flex items-center justify-center gap-3 w-full ${link.id === "live" && isLive
                    ? "text-red-500 hover:text-red-400"
                    : activeSection === link.href.slice(1)
                      ? "nav-link-active"
                      : "text-white hover:text-red-500"
                    }`}
                >
                  {link.id === "live" && isLive ? (
                    <span className="live-pulse-icon">
                      <link.icon size={18} />
                    </span>
                  ) : (
                    <link.icon size={18} />
                  )}
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Language Dropdown */}
      <AnimatePresence>
        {langOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden bg-retro-black/95 border-t border-retro-red/20 overflow-hidden relative z-10"
          >
            <div className="grid grid-cols-2 px-4 py-3 gap-2 max-h-[300px] overflow-y-auto">
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => switchLocale(loc)}
                  className={`text-left px-3 py-3 font-mono text-sm flex items-center gap-2 rounded transition-colors ${loc === locale
                    ? "text-retro-gold bg-retro-gold/10"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                >
                  <span className="text-lg">{LOCALE_META[loc].flag}</span>
                  <span className="truncate">{LOCALE_META[loc].name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav >
  );
}

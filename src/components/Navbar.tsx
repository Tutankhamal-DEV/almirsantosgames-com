'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { Home, Radio, Play, Heart, Globe } from 'lucide-react';
import { useLiveStatus } from '@/lib/LiveContext';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { locales, type Locale } from '@/i18n/routing';

/* ── Locale metadata ──────────────────────────────────── */
const LOCALE_META: Record<Locale, { flag: string; name: string }> = {
    pt: { flag: '🇧🇷', name: 'Português' },
    en: { flag: '🇺🇸', name: 'English' },
    es: { flag: '🇪🇸', name: 'Español' },
    fr: { flag: '🇫🇷', name: 'Français' },
    it: { flag: '🇮🇹', name: 'Italiano' },
    de: { flag: '🇩🇪', name: 'Deutsch' },
    nl: { flag: '🇳🇱', name: 'Nederlands' },
    ru: { flag: '🇷🇺', name: 'Русский' },
    zh: { flag: '🇨🇳', name: '中文' },
    ja: { flag: '🇯🇵', name: '日本語' },
    ko: { flag: '🇰🇷', name: '한국어' },
    ar: { flag: '🇸🇦', name: 'العربية' },
    hi: { flag: '🇮🇳', name: 'हिन्दी' },
    tr: { flag: '🇹🇷', name: 'Türkçe' },
    pl: { flag: '🇵🇱', name: 'Polski' },
};

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const { isLive } = useLiveStatus();
    const t = useTranslations('Navbar');
    const rawLocale = useLocale();
    const locale = (rawLocale in LOCALE_META ? rawLocale : 'pt') as Locale;
    const router = useRouter();
    const pathname = usePathname();

    const NAV_LINKS = [
        { href: '#hero' as const, label: t('home'), icon: Home, id: 'home' },
        { href: '#live' as const, label: t('live'), icon: Radio, id: 'live' },
        { href: '#videos' as const, label: t('videos'), icon: Play, id: 'videos' },
        { href: '#livepix' as const, label: t('support'), icon: Heart, id: 'apoie' },
    ];

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false);
    };

    const switchLocale = (newLocale: Locale) => {
        router.replace(pathname, { locale: newLocale });
        setLangOpen(false);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-[998] bg-retro-black/80 backdrop-blur-md border-b border-retro-red/20">
            <div className="site-container">
                <div className="flex items-center justify-between h-10 sm:h-12">
                    {/* Brand */}
                    <a
                        href="#hero"
                        onClick={(e) => handleClick(e, '#hero')}
                        className="font-pixel text-xs sm:text-sm text-white hover:text-retro-gold transition-colors whitespace-nowrap flex items-center gap-2"
                    >
                        <Image
                            src="/assets/almirsantos_hero_animation.avif"
                            alt="Logo"
                            width={32}
                            height={32}
                            className="w-6 h-6 sm:w-8 sm:h-8"
                            unoptimized
                        />
                        ALMIR SANTOS GAMES
                    </a>

                    {/* Desktop Links + Language Switcher */}
                    <div className="hidden sm:flex items-center gap-4">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => handleClick(e, link.href)}
                                className={`font-mono text-sm transition-colors duration-300 flex items-center gap-1.5 whitespace-nowrap ${link.id === 'live' && isLive
                                    ? 'text-red-500 hover:text-red-400'
                                    : 'text-white hover:text-red-500'
                                    }`}
                            >
                                {link.id === 'live' && isLive ? (
                                    <span className="live-pulse-icon">
                                        <link.icon size={16} />
                                    </span>
                                ) : (
                                    <link.icon size={16} />
                                )}
                                {link.label}
                            </a>
                        ))}

                        {/* Language Switcher (Desktop) */}
                        <div className="relative">
                            <button
                                onClick={() => setLangOpen(!langOpen)}
                                className="flex items-center gap-1.5 font-mono text-sm text-white/70 hover:text-white transition-colors px-2 py-1 rounded border border-white/10 hover:border-white/30"
                                aria-label="Language"
                            >
                                <Globe size={14} />
                                <span>{LOCALE_META[locale].flag}</span>
                                <span className="uppercase text-xs">{locale}</span>
                            </button>
                            <AnimatePresence>
                                {langOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute right-0 top-full mt-1 bg-retro-black/95 border border-retro-red/20 rounded-lg overflow-hidden shadow-2xl w-44 max-h-[320px] overflow-y-auto"
                                        style={{ backdropFilter: 'blur(12px)' }}
                                    >
                                        {locales.map((loc) => (
                                            <button
                                                key={loc}
                                                onClick={() => switchLocale(loc)}
                                                className={`w-full text-left px-3 py-2 font-mono text-sm flex items-center gap-2 transition-colors ${loc === locale
                                                    ? 'text-retro-gold bg-retro-gold/10'
                                                    : 'text-white/70 hover:text-white hover:bg-white/5'
                                                    }`}
                                            >
                                                <span>{LOCALE_META[loc].flag}</span>
                                                <span>{LOCALE_META[loc].name}</span>
                                                {loc === locale && <span className="ml-auto text-retro-gold">✓</span>}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Mobile: Language + Hamburger */}
                    <div className="sm:hidden flex items-center gap-2">
                        {/* Language button (mobile) */}
                        <button
                            onClick={() => { setLangOpen(!langOpen); setIsOpen(false); }}
                            className="flex items-center gap-1 text-white/70 hover:text-white transition-colors p-1"
                            aria-label="Language"
                        >
                            <span className="text-sm">{LOCALE_META[locale].flag}</span>
                        </button>

                        {/* Hamburger */}
                        <button
                            onClick={() => { setIsOpen(!isOpen); setLangOpen(false); }}
                            className="flex flex-col gap-1 p-2"
                            aria-label="Menu"
                        >
                            <span
                                className={`block w-5 h-[2px] bg-white transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-[6px]' : ''
                                    }`}
                            />
                            <span
                                className={`block w-5 h-[2px] bg-white transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''
                                    }`}
                            />
                            <span
                                className={`block w-5 h-[2px] bg-white transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-[6px]' : ''
                                    }`}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="sm:hidden bg-retro-black/95 border-t border-retro-red/20 overflow-hidden"
                    >
                        <div className="flex flex-col px-4 py-3 gap-3">
                            {NAV_LINKS.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => handleClick(e, link.href)}
                                    className={`font-mono text-sm transition-colors py-2 border-b border-retro-red/10 flex items-center gap-2 ${link.id === 'live' && isLive
                                        ? 'text-red-500 hover:text-red-400'
                                        : 'text-white hover:text-red-500'
                                        }`}
                                >
                                    {link.id === 'live' && isLive ? (
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
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Language Dropdown */}
            <AnimatePresence>
                {langOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="sm:hidden bg-retro-black/95 border-t border-retro-red/20 overflow-hidden"
                    >
                        <div className="grid grid-cols-2 px-4 py-3 gap-1 max-h-[300px] overflow-y-auto">
                            {locales.map((loc) => (
                                <button
                                    key={loc}
                                    onClick={() => switchLocale(loc)}
                                    className={`text-left px-3 py-2 font-mono text-sm flex items-center gap-2 rounded transition-colors ${loc === locale
                                        ? 'text-retro-gold bg-retro-gold/10'
                                        : 'text-white/70 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <span>{LOCALE_META[loc].flag}</span>
                                    <span className="truncate">{LOCALE_META[loc].name}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

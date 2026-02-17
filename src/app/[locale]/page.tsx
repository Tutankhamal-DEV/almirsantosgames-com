'use client';

import { useTranslations } from 'next-intl';
import Hero from "@/components/Hero";
import ChannelStats from "@/components/ChannelStats";
import YouTubeLiveSection from "@/components/YouTubeLiveSection";
import LatestVideosSection from "@/components/LatestVideosSection";
import LivePixSection from "@/components/LivePixSection";

export default function Home() {
    const t = useTranslations('Footer');

    return (
        <>
            <Hero />

            {/* Channel Stats */}
            <ChannelStats />

            {/* Decorative divider */}
            <div className="relative z-10 site-container"><div className="h-px bg-gradient-to-r from-transparent via-retro-red/50 to-transparent" /></div>

            <YouTubeLiveSection />

            <div className="relative z-10 site-container"><div className="h-px bg-gradient-to-r from-transparent via-retro-gold/30 to-transparent" /></div>

            <LatestVideosSection />

            <div className="relative z-10 site-container"><div className="h-px bg-gradient-to-r from-transparent via-retro-gold/30 to-transparent" /></div>

            <LivePixSection />

            {/* Footer */}
            <footer className="relative z-10 bg-retro-black/80 backdrop-blur-md border-t border-retro-red/20">
                <div className="site-container py-6 flex flex-col items-center gap-3">
                    <p className="font-mono text-xs text-white/60">
                        {t('rights', { year: new Date().getFullYear() })}
                    </p>
                    <p className="font-mono text-xs text-white/70">
                        {t('developedBy')}{' '}
                        <a
                            href="https://tutankhamal.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="dev-glitch"
                            data-text="Tutankhamal DEV"
                        >
                            Tutankhamal DEV
                        </a>
                    </p>
                </div>
            </footer>
        </>
    );
}

'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'motion/react';
import { Heart, ExternalLink, Star, Wallet } from 'lucide-react';
import { useTranslations } from 'next-intl';

/* ── URLs ─────────────────────────────────────────────── */
const LIVEPIX_URL = 'https://livepix.gg/almirsantos10';
const MEMBRO_URL = 'https://www.youtube.com/@AlmirSantos/join';
const PIX_URL = 'https://livepix.gg/almirsantos10/pix';

/* ── (card styles handled by .glow-card in globals.css) ── */

const ctaBtnBase: React.CSSProperties = {
    padding: '14px 28px',
    borderRadius: '10px',
    backgroundColor: 'rgba(30, 20, 10, 0.7)',
    border: '2px solid #f97316',
    boxShadow:
        '0 5px 0 #b45309, 0 8px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,180,80,0.2)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    textDecoration: 'none',
    width: '100%',
};

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

function SupportCard({ href, imageSrc, imageAlt, title, description, cta, ctaIcon, delay, isInView }: CardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay, ease: 'easeOut' }}
            style={{ height: '100%' }}
        >
            <div className="glow-card" style={{ height: '100%' }}>
                <div
                    className="glow-card-fill"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        height: '100%',
                        padding: '32px 24px',
                    }}
                >
                    {/* QR Code Image */}
                    <div
                        style={{
                            width: '180px',
                            height: '180px',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            marginBottom: '20px',
                            border: '2px solid rgba(249,115,22,0.4)',
                            backgroundColor: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            width={176}
                            height={176}
                            style={{ objectFit: 'contain' }}
                            draggable={false}
                        />
                    </div>

                    {/* Title */}
                    <h3
                        className="font-pixel"
                        style={{ color: '#fff', fontSize: '24px', marginBottom: '12px', letterSpacing: '0.1em' }}
                    >
                        {title}
                    </h3>

                    {/* Description */}
                    <p
                        className="font-mono"
                        style={{
                            color: 'rgba(255,255,255,0.85)', fontSize: '15px',
                            lineHeight: '1.7', marginBottom: '24px', maxWidth: '280px',
                            flex: 1,
                        }}
                    >
                        {description}
                    </p>

                    {/* CTA Button — direct link */}
                    <motion.a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -3 }}
                        whileTap={{ y: 2 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        style={ctaBtnBase}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow =
                                '0 5px 0 #991b1b, 0 0 20px rgba(220,38,38,0.5), 0 0 40px rgba(220,38,38,0.3), inset 0 1px 0 rgba(255,100,100,0.3)';
                            e.currentTarget.style.borderColor = '#dc2626';
                            e.currentTarget.style.backgroundColor = 'rgba(220, 38, 38, 0.25)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow =
                                '0 5px 0 #b45309, 0 8px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,180,80,0.2)';
                            e.currentTarget.style.borderColor = '#f97316';
                            e.currentTarget.style.backgroundColor = 'rgba(30, 20, 10, 0.7)';
                        }}
                    >
                        {ctaIcon}
                        <span className="font-mono" style={{ fontSize: '14px', color: '#fff', letterSpacing: '0.12em', fontWeight: 'bold', textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>
                            {cta}
                        </span>
                        <ExternalLink size={14} color="#fff" style={{ opacity: 0.6 }} />
                    </motion.a>
                </div>
            </div>
        </motion.div>
    );
}

/* ── Main Section ───────────────────────────────────────── */

export default function SupportSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    const t = useTranslations('LivePix');

    return (
        <section
            id="livepix"
            ref={ref}
            className="relative z-10 flex items-center justify-center"
            style={{ minHeight: '100vh', padding: '60px 24px' }}
        >
            <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    style={{ textAlign: 'center', marginBottom: '48px' }}
                >
                    <div className="glow-card" style={{ display: 'inline-block' }}>
                        <div className="glow-card-fill" style={{ padding: '28px 52px' }}>
                            <h2
                                className="font-pixel"
                                style={{ color: '#fff', fontSize: '30px', letterSpacing: '0.12em', marginBottom: '10px' }}
                            >
                                {t('title')}
                            </h2>
                            <p
                                className="font-mono"
                                style={{ color: 'rgba(220,220,220,0.8)', fontSize: '15px' }}
                            >
                                {t('subtitle')}
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* 3 Support Cards Grid */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                        gap: '24px',
                    }}
                >
                    {/* Seja Membro */}
                    <SupportCard
                        href={MEMBRO_URL}
                        imageSrc="/assets/seja_membro_almir.png"
                        imageAlt={t('memberImageAlt')}
                        title={t('memberTitle')}
                        description={t('memberDesc')}
                        cta={t('memberCta')}
                        ctaIcon={<Star size={16} color="#fff" />}
                        delay={0.2}
                        isInView={isInView}
                    />

                    {/* LivePix */}
                    <SupportCard
                        href={LIVEPIX_URL}
                        imageSrc="/assets/livepix_almir.png"
                        imageAlt={t('livepixImageAlt')}
                        title={t('livepixTitle')}
                        description={t('livepixDesc')}
                        cta={t('livepixCta')}
                        ctaIcon={<Heart size={16} color="#fff" />}
                        delay={0.35}
                        isInView={isInView}
                    />

                    {/* Pix Direto */}
                    <SupportCard
                        href={PIX_URL}
                        imageSrc="/assets/logo_pix_direto.png"
                        imageAlt={t('pixImageAlt')}
                        title={t('pixTitle')}
                        description={t('pixDesc')}
                        cta={t('pixCta')}
                        ctaIcon={<Wallet size={16} color="#fff" />}
                        delay={0.5}
                        isInView={isInView}
                    />
                </div>
            </div>
        </section>
    );
}

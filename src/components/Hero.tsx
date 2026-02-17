'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { Youtube, Instagram } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Hero() {
    const t = useTranslations('Hero');
    return (
        <section
            id="hero"
            className="relative min-h-screen flex flex-col items-center justify-center site-container"
        >
            {/* Hero Logo — outside the box */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="relative z-10"
            >
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    onClick={() => window.dispatchEvent(new Event('toggle-canvas-scene'))}
                    className="cursor-pointer outline-none focus:outline-none"
                >
                    <Image
                        src="/assets/almirsantos_hero_animation.avif"
                        alt="Almir Santos Games Logo"
                        width={500}
                        height={500}
                        priority
                        className="w-[180px] sm:w-[260px] md:w-[340px] h-auto"
                        unoptimized
                    />
                </motion.div>
            </motion.div>

            {/* Title — no box, just drop shadow */}
            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
                className="hero-glitch relative z-10 mt-6 font-pixel text-center text-white text-lg sm:text-2xl md:text-3xl tracking-wider"
                data-text="ALMIR SANTOS GAMES"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)' }}
            >
                ALMIR SANTOS GAMES
            </motion.h1>

            {/* Social CTAs */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
                className="relative z-10 flex items-center gap-4 mt-6"
            >
                <motion.a
                    href="https://www.youtube.com/@AlmirSantos"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    whileTap={{ y: 2 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '16px 36px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(30, 20, 10, 0.7)',
                        backdropFilter: 'blur(12px)',
                        border: '2px solid #f97316',
                        boxShadow: '0 5px 0 #b45309, 0 8px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,180,80,0.2)',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 5px 0 #991b1b, 0 0 20px rgba(220,38,38,0.5), 0 0 40px rgba(220,38,38,0.3), inset 0 1px 0 rgba(255,100,100,0.3)';
                        e.currentTarget.style.borderColor = '#dc2626';
                        e.currentTarget.style.backgroundColor = 'rgba(220, 38, 38, 0.25)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 5px 0 #b45309, 0 8px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,180,80,0.2)';
                        e.currentTarget.style.borderColor = '#f97316';
                        e.currentTarget.style.backgroundColor = 'rgba(30, 20, 10, 0.7)';
                    }}
                >
                    <Youtube size={24} color="#fff" />
                    <span className="font-mono" style={{ fontSize: '18px', color: '#fff', letterSpacing: '0.1em', fontWeight: 'bold', textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>
                        YOUTUBE
                    </span>
                </motion.a>

                <motion.a
                    href="https://www.instagram.com/almirsantoslives/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    whileTap={{ y: 2 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '16px 36px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(30, 20, 10, 0.7)',
                        backdropFilter: 'blur(12px)',
                        border: '2px solid #f97316',
                        boxShadow: '0 5px 0 #b45309, 0 8px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,180,80,0.2)',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 5px 0 #991b1b, 0 0 20px rgba(220,38,38,0.5), 0 0 40px rgba(220,38,38,0.3), inset 0 1px 0 rgba(255,100,100,0.3)';
                        e.currentTarget.style.borderColor = '#dc2626';
                        e.currentTarget.style.backgroundColor = 'rgba(220, 38, 38, 0.25)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 5px 0 #b45309, 0 8px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,180,80,0.2)';
                        e.currentTarget.style.borderColor = '#f97316';
                        e.currentTarget.style.backgroundColor = 'rgba(30, 20, 10, 0.7)';
                    }}
                >
                    <Instagram size={24} color="#fff" />
                    <span className="font-mono" style={{ fontSize: '18px', color: '#fff', letterSpacing: '0.1em', fontWeight: 'bold', textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>
                        INSTAGRAM
                    </span>
                </motion.a>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2 }}
                className="absolute bottom-8 z-10"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="font-mono text-retro-chrome text-xs tracking-widest uppercase">
                        {t('scroll')}
                    </span>
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="text-retro-gold"
                    >
                        <path
                            d="M10 4 L10 14 M5 10 L10 15 L15 10"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </motion.div>
            </motion.div>
        </section>
    );
}

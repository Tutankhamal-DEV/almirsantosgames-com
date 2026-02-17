'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { Youtube, Instagram } from 'lucide-react';
import { useTranslations } from 'next-intl';
import RetroButton from './RetroButton';

/* ── Catchphrases shown on logo click ── */
const CATCHPHRASES = [
    'Enfia o Dedo!',
    'AÍDENTO',
    'A FULEPA',
    'ETA OREIA LASCADA',
    'CADE O HOMEM MAL',
    'MEU NOME É ALMIR E EU NÃO TÔ NEM AÍ, SÓ QUERO JOGAR MEU VIDEOGAME',
];

let phraseIndex = 0;

export default function Hero() {
    const t = useTranslations('Hero');
    const [bubbles, setBubbles] = useState<{ id: number; text: string; x: number; y: number }[]>([]);

    const handleLogoClick = useCallback(() => {
        window.dispatchEvent(new Event('toggle-canvas-scene'));

        // Pick the next phrase in order, cycling
        const text = CATCHPHRASES[phraseIndex % CATCHPHRASES.length];
        phraseIndex++;

        // Random horizontal offset around center
        const x = 40 + Math.random() * 20; // 40-60% from left
        const y = -10 - Math.random() * 20; // above the logo

        const id = Date.now() + Math.random();
        setBubbles(prev => [...prev, { id, text, x, y }]);

        // Auto-remove after animation
        setTimeout(() => {
            setBubbles(prev => prev.filter(b => b.id !== id));
        }, 2500);
    }, []);

    return (
        <section
            id="hero"
            className="relative min-h-screen flex flex-col items-center justify-center site-container"
        >
            {/* Hero Logo */}
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
                    onClick={handleLogoClick}
                    onDragStart={(e) => e.preventDefault()}
                    className="cursor-pointer outline-none focus:outline-none relative select-none"
                >
                    <Image
                        src="/assets/almirsantos_hero_animation.avif"
                        alt="Almir Santos Games Logo"
                        width={500}
                        height={500}
                        priority
                        className="w-[180px] sm:w-[260px] md:w-[340px] h-auto select-none pointer-events-none"
                        unoptimized
                        draggable={false}
                    />
                </motion.div>

                {/* Catchphrase Bubbles */}
                <AnimatePresence>
                    {bubbles.map((bubble) => (
                        <motion.div
                            key={bubble.id}
                            initial={{ opacity: 0, scale: 0.3, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: -20 }}
                            exit={{ opacity: 0, scale: 0.6, y: -60 }}
                            transition={{ duration: 0.35, ease: 'easeOut' }}
                            className="absolute pointer-events-none z-20"
                            style={{
                                left: '50%',
                                top: '10%',
                                transform: 'translateX(-50%)',
                            }}
                        >
                            <div className="catchphrase-bubble">
                                {bubble.text}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Title */}
            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
                className="hero-glitch relative z-10 mt-6 font-pixel text-center text-white text-sm sm:text-xl md:text-2xl tracking-wider"
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
                <RetroButton
                    href="https://www.youtube.com/@AlmirSantos"
                    icon={<Youtube size={24} color="#fff" />}
                    label="YOUTUBE"
                />
                <RetroButton
                    href="https://www.instagram.com/_u/almirsantoslives/"
                    icon={<Instagram size={24} color="#fff" />}
                    label="INSTAGRAM"
                />
            </motion.div>

            {/* Scroll indicator — smooth continuous float, fades out */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 6, delay: 1.5, times: [0, 0.1, 0.75, 1], ease: 'easeInOut' }}
                className="absolute bottom-8 z-10 pointer-events-none"
            >
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="font-mono text-retro-chrome text-xs tracking-widest uppercase">
                        {t('scroll')}
                    </span>
                    <motion.svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="text-retro-gold"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <path
                            d="M10 4 L10 14 M5 10 L10 15 L15 10"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </motion.svg>
                </motion.div>
            </motion.div>
        </section>
    );
}

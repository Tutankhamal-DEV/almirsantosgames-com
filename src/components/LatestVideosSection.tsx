'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'motion/react';
import { useYouTubeVideos } from '@/lib/youtube';
import { useTranslations } from 'next-intl';

/* ── Thumbnail Card — replaces iframe until user clicks ── */
function VideoCard({ video, index, isInView, watchLabel }: {
    video: { id: string; title: string; thumbnail: string };
    index: number;
    isInView: boolean;
    watchLabel: string;
}) {
    const [loaded, setLoaded] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    // IntersectionObserver to defer even the thumbnail until card is near viewport
    const observerRef = useCallback((node: HTMLDivElement | null) => {
        if (!node) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    io.disconnect();
                }
            },
            { rootMargin: '200px' }
        );
        io.observe(node);
        return () => io.disconnect();
    }, []);

    return (
        <motion.div
            key={video.id}
            ref={(node) => {
                (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
                observerRef(node);
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: 0.6,
                delay: 0.1 * index,
                ease: 'easeOut',
            }}
            whileHover={{ scale: 1.03 }}
            className="group"
        >
            <div className="retro-border glass-shimmer rounded-lg overflow-hidden transition-all duration-300 group-hover:border-retro-gold group-hover:shadow-[0_0_20px_rgba(212,160,23,0.3)] relative z-[1000]">
                <div className="aspect-video w-full relative">
                    {loaded ? (
                        <iframe
                            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                            title={video.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full border-0"
                        />
                    ) : isVisible ? (
                        <button
                            onClick={() => setLoaded(true)}
                            className="w-full h-full relative cursor-pointer border-0 p-0 bg-retro-black block"
                            aria-label={watchLabel}
                        >
                            {/* Thumbnail */}
                            <img
                                src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                                alt={video.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            {/* Play button overlay */}
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'rgba(0,0,0,0.3)',
                                    transition: 'background 0.3s',
                                }}
                                className="group-hover:!bg-black/50"
                            >
                                <svg width="60" height="60" viewBox="0 0 68 48" fill="none">
                                    <path d="M66.52 7.74C65.78 4.86 63.5 2.59 60.63 1.86 55.35.5 34 .5 34 .5S12.65.5 7.37 1.86C4.5 2.59 2.22 4.86 1.48 7.74.14 13.02.14 24 .14 24s0 10.98 1.34 16.26c.74 2.88 3.02 5.15 5.89 5.89C12.65 47.5 34 47.5 34 47.5s21.35 0 26.63-1.35c2.87-.74 5.15-3.01 5.89-5.89C67.86 34.98 67.86 24 67.86 24s0-10.98-1.34-16.26z" fill="#FF0000" />
                                    <path d="M27.16 34.97L44.92 24 27.16 13.03v21.94z" fill="#fff" />
                                </svg>
                            </div>
                        </button>
                    ) : (
                        /* Placeholder skeleton before IO triggers */
                        <div className="w-full h-full bg-retro-black animate-pulse" />
                    )}
                </div>
            </div>
            <p className="mt-2 font-mono text-sm text-white truncate group-hover:text-red-500 transition-colors">
                {video.title}
            </p>
        </motion.div>
    );
}

export default function LatestVideosSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const { videos: allVideos, loading } = useYouTubeVideos(15);
    const videos = allVideos.slice(1, 10); // skip featured, take next 9 (3x3)
    const t = useTranslations('LatestVideos');

    if (!loading && videos.length === 0) return null;

    return (
        <section
            id="videos"
            ref={ref}
            className="relative z-10 min-h-screen flex flex-col justify-center py-16 sm:py-24"
        >
            <div className="site-container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="mb-10 text-center"
                >
                    <h2 className="section-title text-white">{t('title')}</h2>
                    <div className="mt-4 mx-auto w-24 h-[2px] bg-gradient-to-r from-transparent via-retro-red to-transparent" />
                </motion.div>

                {/* Videos Grid */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <span className="font-mono text-retro-chrome/50 text-sm animate-pulse">{t('loading')}</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {videos.map((video, index) => (
                            <VideoCard
                                key={video.id}
                                video={video}
                                index={index}
                                isInView={isInView}
                                watchLabel={t('watch', { title: video.title })}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

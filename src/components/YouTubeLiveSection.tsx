"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { useLiveStatus } from "@/lib/LiveContext";
import { useYouTubeVideos, CHANNEL_ID } from "@/lib/youtube";
import { useTranslations } from "next-intl";

export default function YouTubeLiveSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { isLive, liveVideoId } = useLiveStatus();
  const { videos, loading } = useYouTubeVideos(1);
  const fallbackVideo = videos[0] ?? null;
  const t = useTranslations("YouTubeLive");

  // Use live video if live, otherwise use latest from RSS
  const videoId = isLive && liveVideoId ? liveVideoId : fallbackVideo?.id;
  const videoTitle = fallbackVideo?.title ?? "";

  // IO-gated iframe: only mount iframe when section nears viewport
  const [iframeReady, setIframeReady] = useState(false);
  const iframeGateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = iframeGateRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIframeReady(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="live"
      ref={ref}
      className="relative z-10 min-h-screen flex flex-col justify-center py-16 sm:py-24"
    >
      <div className="site-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          {isLive ? (
            <span className="live-pulse-dot" />
          ) : (
            <span className="inline-block w-3 h-3 rounded-full bg-white/30" />
          )}
          <h2
            className="section-title hero-glitch text-white"
            data-text={isLive ? t("liveNow") : t("lastLive")}
          >
            {isLive ? t("liveNow") : t("lastLive")}
          </h2>
        </motion.div>

        {/* Main Content: Video + Chat (side-by-side when live) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className={`flex gap-4 ${isLive ? "flex-col lg:flex-row" : "flex-col"}`}
        >
          {/* Video Player */}
          <div
            ref={iframeGateRef}
            className={`retro-border glass-shimmer rounded-lg overflow-hidden relative z-[1000] ${isLive ? "lg:flex-[3]" : "w-full"}`}
          >
            <div className="aspect-video w-full">
              {loading ? (
                <div className="w-full h-full flex items-center justify-center bg-retro-black">
                  <span className="font-mono text-white/50 text-sm animate-pulse">
                    {t("loading")}
                  </span>
                </div>
              ) : videoId && iframeReady ? (
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}${isLive ? "?autoplay=1" : ""}`}
                  title={videoTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : videoId ? (
                /* Thumbnail placeholder until IO triggers */
                <div className="w-full h-full relative bg-retro-black">
                  <img
                    src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
                    alt={videoTitle}
                    width={480}
                    height={360}
                    className="w-full h-full object-cover opacity-60"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-white/50 text-sm animate-pulse">
                      {t("loadingPlayer")}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-retro-black">
                  <p className="font-mono text-white/50 text-sm">
                    {t("noVideo")}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Live Chat — only visible when live */}
          {isLive && videoId && (
            <div className="retro-border rounded-lg overflow-hidden relative z-[1000] lg:flex-[2]">
              <div className="w-full h-full min-h-[400px] lg:min-h-0">
                <iframe
                  src={`https://www.youtube.com/live_chat?v=${videoId}&embed_domain=${typeof window !== "undefined" ? window.location.hostname : "localhost"}`}
                  title="Chat ao vivo"
                  className="w-full h-full border-0"
                  style={{ minHeight: "400px" }}
                />
              </div>
            </div>
          )}
        </motion.div>

        {/* Video title + Channel link */}
        {videoId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-4"
          >
            <p className="font-mono text-base text-white truncate">
              {videoTitle}
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 text-center"
        >
          <a
            href={`https://www.youtube.com/channel/${CHANNEL_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm text-white hover:text-red-500 transition-colors duration-300"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814Z" />
              <path
                d="m9.545 15.568 6.273-3.568-6.273-3.568v7.136Z"
                fill="#0a0a0a"
              />
            </svg>
            {t("visitChannel")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

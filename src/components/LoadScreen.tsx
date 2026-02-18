"use client";

import { useState, useEffect, useCallback } from "react";

const AVIF_SRC = "/assets/almirsantos_hero_animation.avif";
const MIN_DISPLAY_MS = 800;

export default function LoadScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const dismiss = useCallback(() => {
    setFadeOut(true);
    setTimeout(() => {
      document.body.style.overflow = "";
      setVisible(false);
    }, 500);
  }, []);

  useEffect(() => {
    const start = Date.now();
    let done = false;

    // Preload the AVIF image
    const img = new Image();
    img.src = AVIF_SRC;

    const finish = () => {
      if (done) return;
      done = true;
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
      setTimeout(dismiss, remaining);
    };

    img.onload = finish;
    img.onerror = finish;

    // Fallback timeout — don't block forever
    const fallback = setTimeout(finish, 6000);

    // Lock body scroll while loadscreen is visible
    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(fallback);
      document.body.style.overflow = "";
    };
  }, [dismiss]);

  // Remove from DOM after fade
  if (!visible) return null;

  return (
    <div
      className={`loadscreen ${fadeOut ? "loadscreen--fade" : ""}`}
      aria-hidden="true"
    >
      {/* Scanline overlay */}
      <div className="loadscreen__scanlines" />

      {/* Content */}
      <div className="loadscreen__content">
        {/* Glitch title */}
        <h1
          className="loadscreen__title hero-glitch"
          data-text="ALMIR SANTOS GAMES"
        >
          ALMIR SANTOS GAMES
        </h1>

        {/* Progress bar */}
        <div className="loadscreen__bar-track">
          <div className="loadscreen__bar-fill" />
        </div>

        <p className="loadscreen__hint">LOADING...</p>
      </div>
    </div>
  );
}

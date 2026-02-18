"use client";

import { useEffect } from "react";

/**
 * Blocks right-click, DevTools shortcuts, and image dragging/downloading.
 * Render once in the root layout — no UI, side-effect only.
 */
export default function DevGuard() {
  useEffect(() => {
    /* ── Block right-click ────────────────────── */
    const onCtx = (e: MouseEvent) => e.preventDefault();

    /* ── Block DevTools shortcuts ─────────────── */
    const onKey = (e: KeyboardEvent) => {
      // F12
      if (e.key === "F12") {
        e.preventDefault();
        return;
      }
      // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C
      if (
        e.ctrlKey &&
        e.shiftKey &&
        ["I", "J", "C"].includes(e.key.toUpperCase())
      ) {
        e.preventDefault();
        return;
      }
      // Ctrl+U  (View source)
      if (e.ctrlKey && e.key.toUpperCase() === "U") {
        e.preventDefault();
        return;
      }
    };

    /* ── Block ALL dragging (images, links, etc.) ── */
    const onDrag = (e: DragEvent) => e.preventDefault();

    /* ── Inject global CSS to disable drag/select on images ── */
    const style = document.createElement("style");
    style.textContent = `
            * {
                -webkit-user-drag: none !important;
                -khtml-user-drag: none !important;
                -moz-user-drag: none !important;
                -o-user-drag: none !important;
                user-drag: none !important;
            }
            img {
                -webkit-user-select: none !important;
                user-select: none !important;
                pointer-events: auto;
            }
        `;
    document.head.appendChild(style);

    document.addEventListener("contextmenu", onCtx);
    document.addEventListener("keydown", onKey);
    document.addEventListener("dragstart", onDrag);

    return () => {
      document.removeEventListener("contextmenu", onCtx);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("dragstart", onDrag);
      document.head.removeChild(style);
    };
  }, []);

  return null;
}

"use client";

import { useState, useEffect, useCallback } from "react";

const SCENES = [
  { id: 0, name: "Standard", icon: "🔥" },
  { id: 1, name: "Platformer", icon: "🌴" },
  { id: 2, name: "Spaceship", icon: "🚀" },
  { id: 3, name: "Racing", icon: "🏎️" },
  { id: 4, name: "Sports", icon: "⚽" },
  { id: 5, name: "FPS", icon: "🌆" },
];

export default function DynamicBackgroundsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const [activeScene, setActiveScene] = useState(0);

  // Hide navbar and scanlines on this page
  useEffect(() => {
    document.body.classList.add("dynamic-bg-page");
    return () => document.body.classList.remove("dynamic-bg-page");
  }, []);

  // Right-click handler
  const handleContextMenu = useCallback((e: MouseEvent) => {
    e.preventDefault();
    // Keep menu within viewport
    const x = Math.min(e.clientX, window.innerWidth - 220);
    const y = Math.min(e.clientY, window.innerHeight - SCENES.length * 44 - 60);
    setMenuPos({ x, y });
    setMenuOpen(true);
  }, []);

  // Close menu on any click
  const handleClick = useCallback(() => {
    setMenuOpen(false);
  }, []);

  // Escape key closes menu
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setMenuOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleContextMenu, handleClick, handleKeyDown]);

  const selectScene = (id: number) => {
    setActiveScene(id);
    window.dispatchEvent(new CustomEvent("set-canvas-scene", { detail: id }));
    setMenuOpen(false);
  };

  return (
    <>
      {/* Invisible full-viewport layer for context menu — content is just the canvas behind */}
      <div className="dynamic-bg-viewport" />

      {/* Hint text */}
      <div className="dynamic-bg-hint">Right-click to select background</div>

      {/* Custom context menu */}
      {menuOpen && (
        <div
          className="dynamic-bg-menu"
          style={{ left: menuPos.x, top: menuPos.y }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="dynamic-bg-menu-title">Select Background</div>
          {SCENES.map((scene) => (
            <button
              key={scene.id}
              className={`dynamic-bg-menu-item ${activeScene === scene.id ? "active" : ""}`}
              onClick={() => selectScene(scene.id)}
            >
              <span className="dynamic-bg-menu-icon">{scene.icon}</span>
              <span className="dynamic-bg-menu-label">{scene.name}</span>
              {activeScene === scene.id && (
                <span className="dynamic-bg-menu-check">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

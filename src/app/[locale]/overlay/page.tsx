"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { Gamepad2, Monitor } from "lucide-react";

/* ── Scenes (same as CanvasBackground) ── */
const SCENES = [
    { id: 0, name: "Standard", icon: "🔥" },
    { id: 1, name: "Platformer", icon: "🌴" },
    { id: 2, name: "Spaceship", icon: "🚀" },
    { id: 3, name: "Racing", icon: "🏎️" },
    { id: 4, name: "Sports", icon: "⚽" },
    { id: 5, name: "FPS", icon: "🌆" },
];

/* ── Donation cards data ── */
const DONATION_CARDS = [
    {
        id: "membro",
        title: "SEJA MEMBRO",
        url: "youtube.com/@AlmirSantos/join",
        fullUrl: "https://www.youtube.com/@AlmirSantos/join",
        imageSrc: "/assets/seja_membro_almir_md.webp",
        imageAlt: "QR Code — Seja Membro",
        colorClass: "overlay-card-red",
        extraImage: "",
    },
    {
        id: "livepix",
        title: "LIVEPIX",
        url: "livepix.gg/almirsantos10",
        fullUrl: "https://livepix.gg/almirsantos10",
        imageSrc: "/assets/livepix_almir_md.webp",
        imageAlt: "QR Code — LivePix",
        colorClass: "overlay-card-orange",
        extraImage: "",
    },
    {
        id: "pix",
        title: "PIX DIRETO",
        url: "2abd7000-f8fd-4d99-a685-5aa284a888c5",
        fullUrl: "",
        imageSrc: "/assets/logo_pix_direto_md.webp",
        imageAlt: "QR Code — Pix Direto",
        colorClass: "overlay-card-gold",
        extraImage: "",
    },
    {
        id: "superup",
        title: "SUPERUP JOGOS",
        url: "Revista SuperUp",
        fullUrl: "",
        imageSrc: "/assets/revista_superup_qrcode.png",
        imageAlt: "QR Code — SuperUp Jogos",
        extraImage: "/assets/superupjogos.png",
        colorClass: "overlay-card-green",
    },
];

const CARD_DURATION = 30000; // 30 seconds per card

export default function OverlayPage() {
    /* ── State ── */
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
    const [activeScene, setActiveScene] = useState(0);
    const [gameTitle, setGameTitle] = useState("RETRO GAME");
    const [consoleName, setConsoleName] = useState("SNES");
    const [showBg, setShowBg] = useState(true);
    const [showScanlines, setShowScanlines] = useState(true);
    const [transparentBg, setTransparentBg] = useState(false);
    const [activeCard, setActiveCard] = useState(0);
    const [cardTransition, setCardTransition] = useState<"enter" | "exit" | "idle">("enter");
    const [menuTab, setMenuTab] = useState<"bg" | "text" | "display">("bg");

    // Temp inputs for modal
    const [tempTitle, setTempTitle] = useState(gameTitle);
    const [tempConsole, setTempConsole] = useState(consoleName);

    const cardTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [avifLoaded, setAvifLoaded] = useState(false);
    const [magazineOpen, setMagazineOpen] = useState(false);

    /* ── Body class management ── */
    useEffect(() => {
        document.body.classList.add("overlay-page");
        return () => document.body.classList.remove("overlay-page");
    }, []);

    /* ── Position context menu via ref (avoids inline styles) ── */
    useEffect(() => {
        if (menuRef.current && menuOpen) {
            menuRef.current.style.left = `${menuPos.x}px`;
            menuRef.current.style.top = `${menuPos.y}px`;
        }
    }, [menuOpen, menuPos]);

    /* ── Transparent/scanlines/bg control ── */
    useEffect(() => {
        document.body.classList.toggle("overlay-no-bg", !showBg);
        document.body.classList.toggle("overlay-no-scanlines", !showScanlines);
        document.body.classList.toggle("overlay-transparent", transparentBg);
    }, [showBg, showScanlines, transparentBg]);

    /* ── Card carousel timer ── */
    useEffect(() => {
        const advanceCard = () => {
            setCardTransition("exit");
            setTimeout(() => {
                setActiveCard((prev) => (prev + 1) % DONATION_CARDS.length);
                setCardTransition("enter");
                setTimeout(() => setCardTransition("idle"), 800);
            }, 600);
        };

        cardTimerRef.current = setInterval(advanceCard, CARD_DURATION);

        // Initial entrance animation clears after 800ms
        const initTimer = setTimeout(() => setCardTransition("idle"), 800);

        return () => {
            if (cardTimerRef.current) clearInterval(cardTimerRef.current);
            clearTimeout(initTimer);
        };
    }, []);

    /* ── Auto-open magazine when SuperUp card is active ── */
    useEffect(() => {
        const isSuperUp = DONATION_CARDS[activeCard]?.id === "superup";
        if (!isSuperUp) {
            queueMicrotask(() => setMagazineOpen(false));
            return;
        }
        const timer = setTimeout(() => setMagazineOpen(true), 1500);
        return () => clearTimeout(timer);
    }, [activeCard]);

    /* ── Right-click context menu ── */
    const handleClick = useCallback(() => {
        setMenuOpen(false);
    }, []);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") setMenuOpen(false);
    }, []);

    /* ── Scene selection ── */
    const selectScene = (id: number) => {
        setActiveScene(id);
        window.dispatchEvent(new CustomEvent("set-canvas-scene", { detail: id }));
    };

    /* ── Apply text settings ── */
    const applyTexts = () => {
        setGameTitle(tempTitle);
        setConsoleName(tempConsole);
        setMenuOpen(false);
    };

    /* ── Sync temp inputs when opening the menu ── */
    const openMenu = useCallback(
        (x: number, y: number) => {
            setMenuPos({ x, y });
            setTempTitle(gameTitle);
            setTempConsole(consoleName);
            setMenuOpen(true);
            setMenuTab("bg");
        },
        [gameTitle, consoleName],
    );

    const handleContextMenuFull = useCallback(
        (e: MouseEvent) => {
            e.preventDefault();
            const x = Math.min(e.clientX, window.innerWidth - 320);
            const y = Math.min(e.clientY, window.innerHeight - 400);
            openMenu(x, y);
        },
        [openMenu],
    );

    useEffect(() => {
        window.addEventListener("contextmenu", handleContextMenuFull);
        window.addEventListener("click", handleClick);
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("contextmenu", handleContextMenuFull);
            window.removeEventListener("click", handleClick);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleContextMenuFull, handleClick, handleKeyDown]);

    const card = DONATION_CARDS[activeCard];

    return (
        <>
            {/* Full-viewport overlay container */}
            <div className="overlay-container">
                {/* ── LEFT SIDEBAR (20%) ── */}
                <aside className="overlay-sidebar">
                    {/* Animated Logo */}
                    <div className="overlay-logo">
                        <div className="overlay-logo-inner">
                            {/* Static placeholder */}
                            <Image
                                src="/assets/almirsantos_logo_placeholder.webp"
                                alt="Almir Santos Games"
                                width={200}
                                height={200}
                                className={`overlay-logo-img ${avifLoaded ? "hidden" : ""}`}
                                draggable={false}
                                priority
                            />
                            {/* Animated AVIF */}
                            <Image
                                src="/assets/almirsantos_hero_animation.avif"
                                alt="Almir Santos Games"
                                width={200}
                                height={200}
                                className={`overlay-logo-img ${avifLoaded ? "" : "opacity-0 absolute inset-0"}`}
                                unoptimized
                                draggable={false}
                                onLoad={() => setAvifLoaded(true)}
                            />
                        </div>
                        <div className="overlay-logo-glow" />
                    </div>

                    {/* Game Info */}
                    <div className="overlay-game-info">
                        <div className="overlay-game-label">
                            <Gamepad2 size={14} strokeWidth={2.5} />
                            <span>JOGANDO</span>
                        </div>
                        <h2 className="overlay-game-title hero-glitch" data-text={gameTitle}>
                            {gameTitle}
                        </h2>
                        <div className="overlay-console-badge">
                            <Monitor size={14} strokeWidth={2.5} />
                            <span className="overlay-console-name">{consoleName}</span>
                        </div>
                    </div>

                    {/* Donation Card Carousel */}
                    <div className="overlay-card-area">
                        <div className="overlay-card-indicator">
                            {DONATION_CARDS.map((c, i) => (
                                <span
                                    key={c.id}
                                    className={`overlay-dot ${i === activeCard ? "active" : ""}`}
                                />
                            ))}
                        </div>

                        <div
                            className={`overlay-donation-card overlay-card-${cardTransition} ${card.colorClass}`}
                        >
                            {card.id === "superup" ? (
                                /* ── 3D Magazine for SuperUp ── */
                                <div className="overlay-card-body overlay-card-body--magazine">
                                    <div className="overlay-magazine-container">
                                        <div className="magazine-wrapper">
                                            {/* Inside page — QR Code */}
                                            <div className="magazine-back">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src="/assets/revista_superup_qrcode.png"
                                                    alt="QR Code — SuperUp Jogos"
                                                    width={180}
                                                    height={180}
                                                    draggable={false}
                                                />
                                            </div>
                                            {/* Cover — pivots from left spine */}
                                            <div className={`magazine-front ${magazineOpen ? "magazine-cover-open" : ""}`}>
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src="/assets/superupjogos.png"
                                                    alt="SuperUp Jogos"
                                                    width={220}
                                                    height={300}
                                                    draggable={false}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="overlay-card-info">
                                        <div className="overlay-card-title">
                                            {card.title}
                                        </div>
                                        <div className="overlay-card-url">{card.url}</div>
                                    </div>
                                </div>
                            ) : (
                                /* ── Normal card layout ── */
                                <div className="overlay-card-body">
                                    <div className="overlay-card-qr">
                                        <Image
                                            src={card.imageSrc}
                                            alt={card.imageAlt}
                                            width={140}
                                            height={140}
                                            className="overlay-card-qr-img"
                                            draggable={false}
                                            unoptimized
                                        />
                                    </div>
                                    <div className="overlay-card-info">
                                        <div className="overlay-card-title">
                                            {card.title}
                                        </div>
                                        <div className="overlay-card-url">{card.url}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </aside>

                {/* ── RIGHT GAME AREA (80%) — Empty/Transparent ── */}
                <div className="overlay-game-area" />
            </div>

            {/* Hint */}
            <div className="overlay-hint">Clique direito para configurar overlay</div>

            {/* ── Context Menu ── */}
            {menuOpen && (
                <div
                    ref={menuRef}
                    className="overlay-menu"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Tab Selector */}
                    <div className="overlay-menu-tabs">
                        <button
                            className={`overlay-menu-tab ${menuTab === "bg" ? "active" : ""}`}
                            onClick={() => setMenuTab("bg")}
                        >
                            🎨 Fundo
                        </button>
                        <button
                            className={`overlay-menu-tab ${menuTab === "text" ? "active" : ""}`}
                            onClick={() => setMenuTab("text")}
                        >
                            ✏️ Textos
                        </button>
                        <button
                            className={`overlay-menu-tab ${menuTab === "display" ? "active" : ""}`}
                            onClick={() => setMenuTab("display")}
                        >
                            ⚙️ Exibição
                        </button>
                    </div>

                    {/* ── TAB: Background ── */}
                    {menuTab === "bg" && (
                        <div className="overlay-menu-body">
                            <div className="overlay-menu-section-title">Selecionar Background</div>
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

                    {/* ── TAB: Texts ── */}
                    {menuTab === "text" && (
                        <div className="overlay-menu-body">
                            <div className="overlay-menu-section-title">Informações da Live</div>
                            <div className="overlay-menu-field">
                                <label className="overlay-menu-label">Título do Jogo</label>
                                <input
                                    type="text"
                                    className="overlay-menu-input"
                                    value={tempTitle}
                                    onChange={(e) => setTempTitle(e.target.value)}
                                    placeholder="Nome do jogo..."
                                    maxLength={40}
                                />
                            </div>
                            <div className="overlay-menu-field">
                                <label className="overlay-menu-label">Plataforma / Console</label>
                                <input
                                    type="text"
                                    className="overlay-menu-input"
                                    value={tempConsole}
                                    onChange={(e) => setTempConsole(e.target.value)}
                                    placeholder="Ex: SNES, PS1, MEGA DRIVE..."
                                    maxLength={30}
                                />
                            </div>
                            <button
                                className="overlay-menu-apply"
                                onClick={applyTexts}
                            >
                                ✓ Aplicar
                            </button>
                        </div>
                    )}

                    {/* ── TAB: Display ── */}
                    {menuTab === "display" && (
                        <div className="overlay-menu-body">
                            <div className="overlay-menu-section-title">Configurações de Exibição</div>
                            <label className="overlay-menu-toggle">
                                <span>Background Animado</span>
                                <input
                                    type="checkbox"
                                    checked={showBg}
                                    onChange={() => setShowBg(!showBg)}
                                />
                                <span className="overlay-toggle-slider" />
                            </label>
                            <label className="overlay-menu-toggle">
                                <span>Scanlines (CRT)</span>
                                <input
                                    type="checkbox"
                                    checked={showScanlines}
                                    onChange={() => setShowScanlines(!showScanlines)}
                                />
                                <span className="overlay-toggle-slider" />
                            </label>
                            <label className="overlay-menu-toggle">
                                <span>Fundo Transparente</span>
                                <input
                                    type="checkbox"
                                    checked={transparentBg}
                                    onChange={() => setTransparentBg(!transparentBg)}
                                />
                                <span className="overlay-toggle-slider" />
                            </label>
                            <p className="overlay-menu-hint">
                                Fundo transparente é ideal para uso no OBS como Browser Source com chroma key.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

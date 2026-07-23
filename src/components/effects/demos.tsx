"use client";

import { useRef, type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Spotlight card — needs cursor tracking for the --mx / --my vars   */
/* ------------------------------------------------------------------ */
function SpotlightCardDemo() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className="fx-spotlight-card"
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      <div className="text-[0.7rem] uppercase tracking-[0.2em] text-amber-300/70">
        Premium
      </div>
      <div className="mt-2 text-lg font-bold text-amber-50">
        Hover the surface
      </div>
      <p className="mt-1 text-sm text-amber-100/50">
        Light bends toward your cursor in real time.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Master demo registry                                              */
/* ------------------------------------------------------------------ */
export function Demo({ id }: { id: string }): ReactNode {
  switch (id) {
    /* ---------- Buttons ---------- */
    case "liquid-btn":
      return <button className="fx-liquid-btn">Launch Now</button>;
    case "neon-btn":
      return <button className="fx-neon-btn">Activate</button>;
    case "sheen-btn":
      return <button className="fx-sheen-btn">Get Started</button>;
    case "press-btn":
      return <button className="fx-press-btn">Press Me</button>;
    case "magnetic-btn":
      return <button className="fx-magnetic-btn">Explore</button>;

    /* ---------- Cards ---------- */
    case "spotlight-card":
      return <SpotlightCardDemo />;
    case "glow-card":
      return (
        <div className="fx-glow-card">
          <div className="text-[0.7rem] uppercase tracking-[0.2em] text-amber-300/70">
            Animated
          </div>
          <div className="mt-2 text-lg font-bold text-amber-50">
            Ignite the border
          </div>
          <p className="mt-1 text-sm text-amber-100/50">
            Hover to wake the gradient glow.
          </p>
        </div>
      );
    case "flip-card":
      return (
        <div className="fx-flip-card" tabIndex={0}>
          <div className="fx-flip-card-inner">
            <div className="fx-flip-face fx-flip-front">
              <div className="text-[0.7rem] uppercase tracking-[0.2em] text-amber-300/70">
                Front
              </div>
              <div className="text-lg font-bold text-amber-50">Hover to flip</div>
            </div>
            <div className="fx-flip-face fx-flip-back">
              <div className="text-[0.7rem] uppercase tracking-[0.2em] text-rose-300/70">
                Back
              </div>
              <div className="text-lg font-bold text-rose-50">Surprise</div>
            </div>
          </div>
        </div>
      );
    case "glass-card":
      return (
        <div className="fx-glass-card">
          <div className="text-[0.7rem] uppercase tracking-[0.2em] text-amber-300/70">
            Frosted
          </div>
          <div className="mt-2 text-lg font-bold text-amber-50">Glass panel</div>
          <p className="mt-1 text-sm text-amber-100/60">
            Translucency with layered light.
          </p>
        </div>
      );

    /* ---------- Text ---------- */
    case "gradient-text":
      return <span className="fx-grad-text">Aurora</span>;
    case "glitch-text":
      return (
        <span className="fx-glitch-text" data-text="GLITCH">
          GLITCH
        </span>
      );
    case "neon-text":
      return <span className="fx-neon-text">OPEN</span>;
    case "layer-text":
      return <span className="fx-layer-text">DEPTH</span>;

    /* ---------- Loaders ---------- */
    case "orbit-loader":
      return (
        <div className="fx-orbit-loader">
          <div className="fx-orbit-ring" />
          <div className="fx-orbit-core" />
          <div className="fx-orbit-spin">
            <div className="fx-orbit-dot r1" />
          </div>
          <div className="fx-orbit-spin s2">
            <div className="fx-orbit-dot r2" />
          </div>
          <div className="fx-orbit-spin s3">
            <div className="fx-orbit-dot r3" />
          </div>
        </div>
      );
    case "morph-loader":
      return <div className="fx-morph-loader" />;
    case "pulse-dots":
      return (
        <div className="fx-pulse-dots">
          <span />
          <span />
          <span />
        </div>
      );
    case "ring-loader":
      return <div className="fx-ring-loader" />;

    /* ---------- Backgrounds ---------- */
    case "mesh-bg":
      return <div className="fx-mesh-bg" />;
    case "aurora-bg":
      return <div className="fx-aurora-bg" />;
    case "grid-bg":
      return <div className="fx-grid-bg" />;
    case "orbs-bg":
      return <div className="fx-orbs-bg" />;

    /* ---------- Controls ---------- */
    case "neon-toggle":
      return (
        <label className="fx-neon-toggle">
          <input type="checkbox" />
          <span className="fx-neon-toggle-track" />
        </label>
      );
    case "glow-input":
      return (
        <div className="fx-glow-input">
          <input placeholder="Focus me…" />
        </div>
      );
    case "daynight-toggle":
      return (
        <label className="fx-daynight-toggle">
          <input type="checkbox" />
          <span className="fx-daynight-scene" />
        </label>
      );

    default:
      return null;
  }
}

export type CategoryId =
  | "buttons"
  | "cards"
  | "text"
  | "loaders"
  | "backgrounds"
  | "controls";

export interface Category {
  id: CategoryId;
  name: string;
  tagline: string;
  icon: string; // lucide icon name resolved in component
}

export interface Effect {
  id: string;
  name: string;
  category: CategoryId;
  description: string;
  tags: string[];
  css: string;
}

export const categories: Category[] = [
  {
    id: "buttons",
    name: "Buttons",
    tagline: "Tactile, magnetic, alive",
    icon: "MousePointerClick",
  },
  {
    id: "cards",
    name: "Cards",
    tagline: "Depth, light, motion",
    icon: "LayoutGrid",
  },
  {
    id: "text",
    name: "Typography",
    tagline: "Letters that breathe",
    icon: "Type",
  },
  {
    id: "loaders",
    name: "Loaders",
    tagline: "Waiting, beautifully",
    icon: "LoaderCircle",
  },
  {
    id: "backgrounds",
    name: "Backgrounds",
    tagline: "Atmospheres & scenes",
    icon: "Sparkles",
  },
  {
    id: "controls",
    name: "Inputs & Toggles",
    tagline: "Switches with soul",
    icon: "ToggleRight",
  },
];

export const effects: Effect[] = [
  /* ----------------------------- BUTTONS ----------------------------- */
  {
    id: "liquid-btn",
    name: "Liquid Goo Button",
    category: "buttons",
    description:
      "A pill button whose hover bubble melts through a gooey SVG filter — organic, fluid, unforgettable.",
    tags: ["hover", "filter", "organic"],
    css: `.fx-liquid-btn {
  position: relative;
  border: none;
  cursor: pointer;
  padding: 0.9rem 2rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.02em;
  color: #1a1208;
  background: linear-gradient(120deg, #f5c451, #f59e0b);
  isolation: isolate;
  overflow: hidden;
}

.fx-liquid-btn::before,
.fx-liquid-btn::after {
  content: "";
  position: absolute;
  inset: auto -30% -60% -30%;
  height: 120%;
  border-radius: 50%;
  background: linear-gradient(120deg, #fb7185, #e11d48);
  z-index: -1;
  transform: translateY(120%);
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  filter: blur(2px);
}

.fx-liquid-btn::after {
  inset: auto -40% -70% 10%;
  background: linear-gradient(120deg, #e11d48, #be123c);
  transition-delay: 0.05s;
}

.fx-liquid-btn:hover::before,
.fx-liquid-btn:hover::after {
  transform: translateY(0);
}`,
  },
  {
    id: "neon-btn",
    name: "Neon Pulse Button",
    category: "buttons",
    description:
      "A glowing call-to-action with a pulsing halo. Pure CSS box-shadow stacking builds the neon bloom.",
    tags: ["glow", "neon", "cta"],
    css: `.fx-neon-btn {
  position: relative;
  padding: 0.95rem 2.2rem;
  border: 1px solid rgba(245, 158, 11, 0.6);
  border-radius: 14px;
  background: rgba(245, 158, 11, 0.08);
  color: #fcd34d;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-size: 0.82rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow:
    0 0 6px rgba(245, 158, 11, 0.5),
    0 0 14px rgba(245, 158, 11, 0.35),
    inset 0 0 8px rgba(245, 158, 11, 0.18);
  animation: neon-pulse 2.4s ease-in-out infinite;
}

.fx-neon-btn:hover {
  background: rgba(245, 158, 11, 0.16);
  color: #fff7e6;
  box-shadow:
    0 0 10px rgba(245, 158, 11, 0.8),
    0 0 28px rgba(245, 158, 11, 0.6),
    0 0 60px rgba(244, 63, 94, 0.4),
    inset 0 0 14px rgba(245, 158, 11, 0.3);
}

@keyframes neon-pulse {
  0%, 100% {
    box-shadow:
      0 0 6px rgba(245, 158, 11, 0.5),
      0 0 14px rgba(245, 158, 11, 0.35),
      inset 0 0 8px rgba(245, 158, 11, 0.18);
  }
  50% {
    box-shadow:
      0 0 12px rgba(245, 158, 11, 0.7),
      0 0 30px rgba(245, 158, 11, 0.5),
      inset 0 0 12px rgba(245, 158, 11, 0.28);
  }
}`,
  },
  {
    id: "sheen-btn",
    name: "Gradient Sheen Button",
    category: "buttons",
    description:
      "A glossy gradient button with a diagonal light sheen that sweeps across on hover.",
    tags: ["gradient", "sheen", "premium"],
    css: `.fx-sheen-btn {
  position: relative;
  overflow: hidden;
  padding: 0.95rem 2.1rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(120deg, #f59e0b, #f43f5e 55%, #be123c);
  box-shadow: 0 12px 30px -10px rgba(244, 63, 94, 0.6);
}

.fx-sheen-btn::after {
  content: "";
  position: absolute;
  top: 0;
  left: -120%;
  width: 60%;
  height: 100%;
  background: linear-gradient(
    100deg,
    transparent,
    rgba(255, 255, 255, 0.55),
    transparent
  );
  transform: skewX(-20deg);
  transition: left 0.6s ease;
}

.fx-sheen-btn:hover::after {
  left: 130%;
}`,
  },
  {
    id: "press-btn",
    name: "3D Press Button",
    category: "buttons",
    description:
      "A chunky 3D button that physically depresses on click using layered transforms and shadows.",
    tags: ["3d", "tactile", "click"],
    css: `.fx-press-btn {
  position: relative;
  border: none;
  cursor: pointer;
  padding: 0.9rem 2rem;
  border-radius: 14px;
  font-weight: 700;
  letter-spacing: 0.03em;
  color: #1a1208;
  background: linear-gradient(180deg, #fcd34d, #f59e0b);
  box-shadow:
    0 6px 0 #b45309,
    0 8px 18px rgba(180, 83, 9, 0.4);
  transition: transform 0.12s ease, box-shadow 0.12s ease;
}

.fx-press-btn:hover {
  transform: translateY(-1px);
  box-shadow:
    0 7px 0 #b45309,
    0 10px 22px rgba(180, 83, 9, 0.5);
}

.fx-press-btn:active {
  transform: translateY(6px);
  box-shadow:
    0 0 0 #b45309,
    0 2px 8px rgba(180, 83, 9, 0.4);
}`,
  },
  {
    id: "magnetic-btn",
    name: "Magnetic Border Button",
    category: "buttons",
    description:
      "A transparent button ringed by a conic gradient border that orbits on hover — the aura never sits still.",
    tags: ["border", "animated", "conic"],
    css: `.fx-magnetic-btn {
  position: relative;
  z-index: 0;
  padding: 0.95rem 2rem;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  font-weight: 600;
  color: #fde68a;
  background: #14121c;
  isolation: isolate;
}

.fx-magnetic-btn::before {
  content: "";
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  z-index: -2;
  background: conic-gradient(
    from 0deg,
    #f59e0b,
    #f43f5e,
    #fbbf24,
    #f59e0b
  );
  animation: magnetic-spin 4s linear infinite;
}

.fx-magnetic-btn::after {
  content: "";
  position: absolute;
  inset: 2px;
  border-radius: inherit;
  z-index: -1;
  background: #14121c;
}

.fx-magnetic-btn:hover::before {
  animation-duration: 1.4s;
  filter: blur(6px) saturate(1.4);
}

@keyframes magnetic-spin {
  to { transform: rotate(360deg); }
}`,
  },

  /* ----------------------------- CARDS ----------------------------- */
  {
    id: "spotlight-card",
    name: "Spotlight Card",
    category: "cards",
    description:
      "A radial spotlight that follows the cursor across the card surface, revealing a hidden glow.",
    tags: ["hover", "cursor", "glow"],
    css: `.fx-spotlight-card {
  position: relative;
  width: 100%;
  padding: 1.75rem;
  border-radius: 18px;
  border: 1px solid rgba(245, 158, 11, 0.18);
  background: linear-gradient(180deg, #1c1828, #15121f);
  overflow: hidden;
  isolation: isolate;
}

.fx-spotlight-card::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: radial-gradient(
    220px circle at var(--mx, 50%) var(--my, 50%),
    rgba(245, 158, 11, 0.22),
    transparent 60%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.fx-spotlight-card:hover::before {
  opacity: 1;
}`,
  },
  {
    id: "glow-card",
    name: "Glow Border Card",
    category: "cards",
    description:
      "A card whose border ignites into a soft animated gradient glow on hover. Pure CSS, no JS.",
    tags: ["glow", "border", "animated"],
    css: `.fx-glow-card {
  position: relative;
  width: 100%;
  padding: 1.75rem;
  border-radius: 18px;
  background: #171420;
  isolation: isolate;
  transition: transform 0.3s ease;
}

.fx-glow-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(135deg, #f59e0b, #f43f5e, #fbbf24, #f59e0b);
  background-size: 300% 300%;
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0.4;
  transition: opacity 0.3s ease;
  animation: glow-pan 6s linear infinite;
}

.fx-glow-card:hover {
  transform: translateY(-3px);
}

.fx-glow-card:hover::before {
  opacity: 1;
}

@keyframes glow-pan {
  to { background-position: 300% 0; }
}`,
  },
  {
    id: "flip-card",
    name: "3D Flip Card",
    category: "cards",
    description:
      "A two-faced card that flips in 3D space on hover. Backface visibility keeps each side hidden until revealed.",
    tags: ["3d", "flip", "hover"],
    css: `.fx-flip-card {
  position: relative;
  width: 100%;
  height: 180px;
  perspective: 1000px;
  cursor: pointer;
}

.fx-flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transform-style: preserve-3d;
}

.fx-flip-card:hover .fx-flip-card-inner,
.fx-flip-card:focus-within .fx-flip-card-inner {
  transform: rotateY(180deg);
}

.fx-flip-face {
  position: absolute;
  inset: 0;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  padding: 1.5rem;
  text-align: center;
}

.fx-flip-front {
  background: linear-gradient(160deg, #2a1d12, #1a1320);
  border: 1px solid rgba(245, 158, 11, 0.25);
}

.fx-flip-back {
  background: linear-gradient(160deg, #3b1422, #1a1320);
  border: 1px solid rgba(244, 63, 94, 0.3);
  transform: rotateY(180deg);
}`,
  },
  {
    id: "glass-card",
    name: "Glassmorphism Card",
    category: "cards",
    description:
      "Frosted glass with a tinted blur, layered light streaks, and a subtle inner highlight.",
    tags: ["glass", "blur", "frosted"],
    css: `.fx-glass-card {
  position: relative;
  width: 100%;
  padding: 1.75rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(16px) saturate(1.3);
  -webkit-backdrop-filter: blur(16px) saturate(1.3);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow:
    0 20px 50px -20px rgba(0, 0, 0, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.18);
  overflow: hidden;
}

.fx-glass-card::before {
  content: "";
  position: absolute;
  top: -60%;
  left: -20%;
  width: 80%;
  height: 120%;
  background: linear-gradient(120deg, transparent, rgba(245, 158, 11, 0.35), transparent);
  transform: rotate(20deg);
  filter: blur(18px);
}`,
  },

  /* ----------------------------- TEXT ----------------------------- */
  {
    id: "gradient-text",
    name: "Animated Gradient Text",
    category: "text",
    description:
      "Text filled with a flowing multi-stop gradient that drifts forever. Background-clip magic.",
    tags: ["gradient", "animated", "clip"],
    css: `.fx-grad-text {
  font-weight: 800;
  font-size: 2.4rem;
  letter-spacing: -0.02em;
  background: linear-gradient(
    90deg,
    #fbbf24,
    #f43f5e,
    #f59e0b,
    #fda4af,
    #fbbf24
  );
  background-size: 250% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: grad-text-flow 5s linear infinite;
}

@keyframes grad-text-flow {
  to { background-position: 250% center; }
}`,
  },
  {
    id: "glitch-text",
    name: "Glitch Text",
    category: "text",
    description:
      "A cyberpunk glitch built from dual pseudo-element clones offset and clipped with chromatic split.",
    tags: ["glitch", "cyberpunk", "clip"],
    css: `.fx-glitch-text {
  position: relative;
  font-weight: 800;
  font-size: 2.4rem;
  letter-spacing: 0.02em;
  color: #fde68a;
}

.fx-glitch-text::before,
.fx-glitch-text::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
}

.fx-glitch-text::before {
  left: 2px;
  color: #f43f5e;
  animation: glitch-1 2.5s infinite linear alternate-reverse;
  clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
}

.fx-glitch-text::after {
  left: -2px;
  color: #38bdf8;
  animation: glitch-2 1.8s infinite linear alternate-reverse;
  clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
}

@keyframes glitch-1 {
  0% { clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%); }
  20% { clip-path: polygon(0 40%, 100% 40%, 100% 41%, 0 41%); }
  40% { clip-path: polygon(0 78%, 100% 78%, 100% 82%, 0 82%); }
  60% { clip-path: polygon(0 12%, 100% 12%, 100% 16%, 0 16%); }
  80% { clip-path: polygon(0 55%, 100% 55%, 100% 58%, 0 58%); }
  100% { clip-path: polygon(0 30%, 100% 30%, 100% 34%, 0 34%); }
}

@keyframes glitch-2 {
  0% { clip-path: polygon(0 88%, 100% 88%, 100% 90%, 0 90%); }
  50% { clip-path: polygon(0 22%, 100% 22%, 100% 26%, 0 26%); }
  100% { clip-path: polygon(0 64%, 100% 64%, 100% 68%, 0 68%); }
}`,
  },
  {
    id: "neon-text",
    name: "Neon Sign Text",
    category: "text",
    description:
      "A flickering neon tube sign with layered text-shadow bloom and a subtle power-on flicker.",
    tags: ["neon", "glow", "flicker"],
    css: `.fx-neon-text {
  font-weight: 800;
  font-size: 2.6rem;
  letter-spacing: 0.04em;
  color: #fff7e6;
  text-shadow:
    0 0 6px #fbbf24,
    0 0 14px #f59e0b,
    0 0 30px #f59e0b,
    0 0 60px #b45309;
  animation: neon-flicker 4s infinite;
}

@keyframes neon-flicker {
  0%, 18%, 22%, 25%, 53%, 57%, 100% {
    text-shadow:
      0 0 6px #fbbf24,
      0 0 14px #f59e0b,
      0 0 30px #f59e0b,
      0 0 60px #b45309;
    opacity: 1;
  }
  20%, 24%, 55% {
    text-shadow: none;
    opacity: 0.7;
  }
}`,
  },
  {
    id: "layer-text",
    name: "3D Layered Text",
    category: "text",
    description:
      "Extruded 3D letters stacked from dozens of offset shadows, with a parallax tilt on hover.",
    tags: ["3d", "extrude", "shadow"],
    css: `.fx-layer-text {
  font-weight: 900;
  font-size: 2.6rem;
  letter-spacing: 0.02em;
  color: #fcd34d;
  transform: perspective(600px) rotateX(18deg);
  transform-style: preserve-3d;
  text-shadow:
    0 1px 0 #d97706,
    0 2px 0 #b45309,
    0 3px 0 #92400e,
    0 4px 0 #78350f,
    0 5px 0 #6b330d,
    0 6px 1px rgba(0,0,0,0.1),
    0 0 5px rgba(0,0,0,0.15),
    0 1px 3px rgba(0,0,0,0.35),
    0 3px 5px rgba(0,0,0,0.4),
    0 5px 10px rgba(0,0,0,0.45),
    0 10px 10px rgba(0,0,0,0.4),
    0 20px 20px rgba(0,0,0,0.35);
  transition: transform 0.4s ease;
}

.fx-layer-text:hover {
  transform: perspective(600px) rotateX(8deg) translateY(-4px);
}`,
  },

  /* ----------------------------- LOADERS ----------------------------- */
  {
    id: "orbit-loader",
    name: "Orbital Loader",
    category: "loaders",
    description:
      "Three satellites orbit a golden core at staggered radii and speeds — a tiny solar system.",
    tags: ["orbit", "spinner", "staggered"],
    css: `.fx-orbit-loader {
  position: relative;
  width: 80px;
  height: 80px;
}

.fx-orbit-core {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #fde68a, #f59e0b);
  box-shadow: 0 0 18px rgba(245, 158, 11, 0.8);
  transform: translate(-50%, -50%);
}

.fx-orbit-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px dashed rgba(245, 158, 11, 0.25);
}

.fx-orbit-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  margin: -5px;
  border-radius: 50%;
  background: #f43f5e;
  box-shadow: 0 0 10px rgba(244, 63, 94, 0.8);
}

.fx-orbit-dot.r1 { transform: rotate(0deg) translateX(20px); }
.fx-orbit-dot.r2 { transform: rotate(120deg) translateX(32px); background: #fbbf24; }
.fx-orbit-dot.r3 { transform: rotate(240deg) translateX(40px); background: #fb7185; }

.fx-orbit-spin {
  position: absolute;
  inset: 0;
  animation: orbit-spin 2.2s linear infinite;
}

.fx-orbit-spin.s2 { animation-duration: 3s; animation-direction: reverse; }
.fx-orbit-spin.s3 { animation-duration: 4s; }

@keyframes orbit-spin { to { transform: rotate(360deg); } }`,
  },
  {
    id: "morph-loader",
    name: "Morphing Blob Loader",
    category: "loaders",
    description:
      "A blob that fluidly morphs between organic shapes using animated border-radius keyframes.",
    tags: ["morph", "blob", "organic"],
    css: `.fx-morph-loader {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #f59e0b, #f43f5e);
  box-shadow: 0 0 30px rgba(244, 63, 94, 0.5);
  animation: morph 6s linear infinite, morph-spin 8s linear infinite;
}

@keyframes morph {
  0%, 100% { border-radius: 42% 58% 63% 37% / 41% 44% 56% 59%; }
  25% { border-radius: 62% 38% 41% 59% / 58% 64% 36% 42%; }
  50% { border-radius: 38% 62% 56% 44% / 63% 38% 62% 37%; }
  75% { border-radius: 56% 44% 36% 64% / 42% 56% 44% 58%; }
}

@keyframes morph-spin {
  to { transform: rotate(360deg); }
}`,
  },
  {
    id: "pulse-dots",
    name: "Pulse Dots Loader",
    category: "loaders",
    description:
      "Three dots that ripple in sequence — a classic, refined with a soft golden halo on each bounce.",
    tags: ["dots", "pulse", "sequence"],
    css: `.fx-pulse-dots {
  display: flex;
  gap: 0.7rem;
  align-items: center;
}

.fx-pulse-dots span {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #fde68a, #f59e0b);
  box-shadow: 0 0 12px rgba(245, 158, 11, 0.7);
  animation: pulse-bounce 1.2s ease-in-out infinite;
}

.fx-pulse-dots span:nth-child(2) { animation-delay: 0.18s; background: radial-gradient(circle at 30% 30%, #fecaca, #f43f5e); box-shadow: 0 0 12px rgba(244, 63, 94, 0.7); }
.fx-pulse-dots span:nth-child(3) { animation-delay: 0.36s; }

@keyframes pulse-bounce {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.6; }
  40% { transform: scale(1.2); opacity: 1; }
}`,
  },
  {
    id: "ring-loader",
    name: "Dual Ring Spinner",
    category: "loaders",
    description:
      "Two counter-rotating gradient arcs that chase each other — depth from a single element.",
    tags: ["ring", "spinner", "gradient"],
    css: `.fx-ring-loader {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background:
    conic-gradient(from 0deg, transparent 0 60%, #f59e0b 80% 100%),
    conic-gradient(from 180deg, transparent 0 60%, #f43f5e 80% 100%);
  -webkit-mask: radial-gradient(circle, transparent 56%, #000 58%);
  mask: radial-gradient(circle, transparent 56%, #000 58%);
  animation: ring-spin 1.4s linear infinite;
  filter: drop-shadow(0 0 8px rgba(245, 158, 11, 0.5));
}

@keyframes ring-spin {
  to { transform: rotate(360deg); }
}`,
  },

  /* ----------------------------- BACKGROUNDS ----------------------------- */
  {
    id: "mesh-bg",
    name: "Mesh Gradient Backdrop",
    category: "backgrounds",
    description:
      "Overlapping radial gradients drift slowly to form a living mesh gradient — no images, no JS.",
    tags: ["mesh", "gradient", "drift"],
    css: `.fx-mesh-bg {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 220px;
  border-radius: 18px;
  overflow: hidden;
  background: #14121c;
}

.fx-mesh-bg::before {
  content: "";
  position: absolute;
  inset: -30%;
  background:
    radial-gradient(closest-side, rgba(245, 158, 11, 0.7), transparent),
    radial-gradient(closest-side, rgba(244, 63, 94, 0.7), transparent),
    radial-gradient(closest-side, rgba(251, 191, 36, 0.6), transparent),
    radial-gradient(closest-side, rgba(190, 18, 60, 0.7), transparent);
  background-size: 60% 60%, 55% 55%, 50% 50%, 65% 65%;
  background-position:
    10% 20%, 80% 15%, 30% 80%, 75% 75%;
  background-repeat: no-repeat;
  animation: mesh-drift 14s ease-in-out infinite alternate;
  filter: blur(8px);
}

@keyframes mesh-drift {
  to {
    background-position:
      70% 30%, 20% 60%, 80% 70%, 30% 20%;
  }
}`,
  },
  {
    id: "aurora-bg",
    name: "Aurora Waves",
    category: "backgrounds",
    description:
      "Translucent ribbons of light sweep across the sky like the northern lights — pure CSS conic gradients.",
    tags: ["aurora", "waves", "atmosphere"],
    css: `.fx-aurora-bg {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 220px;
  border-radius: 18px;
  overflow: hidden;
  background: #0c0a14;
}

.fx-aurora-bg::before,
.fx-aurora-bg::after {
  content: "";
  position: absolute;
  inset: -50%;
  background: conic-gradient(
    from 90deg at 50% 50%,
    transparent 0deg,
    rgba(245, 158, 11, 0.45) 60deg,
    rgba(244, 63, 94, 0.4) 120deg,
    transparent 200deg
  );
  filter: blur(40px);
  animation: aurora-wave 12s linear infinite;
}

.fx-aurora-bg::after {
  animation-duration: 18s;
  animation-direction: reverse;
  background: conic-gradient(
    from 270deg at 50% 50%,
    transparent 0deg,
    rgba(251, 191, 36, 0.4) 80deg,
    rgba(190, 18, 60, 0.5) 160deg,
    transparent 240deg
  );
}

@keyframes aurora-wave {
  to { transform: rotate(360deg); }
}`,
  },
  {
    id: "grid-bg",
    name: "Pulse Grid",
    category: "backgrounds",
    description:
      "A perspective grid that ripples outward from center — a retro-synthwave floor that never stops moving.",
    tags: ["grid", "retro", "pulse"],
    css: `.fx-grid-bg {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 220px;
  border-radius: 18px;
  overflow: hidden;
  background: #0c0a14;
  display: grid;
  place-items: center;
}

.fx-grid-bg::before {
  content: "";
  position: absolute;
  inset: -50%;
  background-image:
    linear-gradient(rgba(245, 158, 11, 0.4) 1px, transparent 1px),
    linear-gradient(90deg, rgba(244, 63, 94, 0.4) 1px, transparent 1px);
  background-size: 38px 38px;
  transform: perspective(420px) rotateX(60deg);
  transform-origin: center top;
  animation: grid-pan 4s linear infinite;
  mask-image: linear-gradient(180deg, transparent, black 40%, black 70%, transparent);
}

@keyframes grid-pan {
  to { background-position: 0 38px, 38px 0; }
}`,
  },
  {
    id: "orbs-bg",
    name: "Floating Orbs",
    category: "backgrounds",
    description:
      "Soft luminous orbs float and crossfade across a deep void — calm, premium ambient motion.",
    tags: ["orbs", "ambient", "blur"],
    css: `.fx-orbs-bg {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 220px;
  border-radius: 18px;
  overflow: hidden;
  background: radial-gradient(circle at 50% 50%, #1a1320, #0c0a14);
}

.fx-orbs-bg::before,
.fx-orbs-bg::after,
.fx-orb-extra {
  content: "";
  position: absolute;
  border-radius: 50%;
  filter: blur(28px);
}

.fx-orbs-bg::before {
  width: 120px; height: 120px;
  top: 15%; left: 20%;
  background: rgba(245, 158, 11, 0.55);
  animation: orb-float 9s ease-in-out infinite;
}

.fx-orbs-bg::after {
  width: 100px; height: 100px;
  bottom: 18%; right: 22%;
  background: rgba(244, 63, 94, 0.5);
  animation: orb-float 11s ease-in-out infinite reverse;
}

@keyframes orb-float {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.8; }
  50% { transform: translate(30px, -20px) scale(1.15); opacity: 1; }
}`,
  },

  /* ----------------------------- CONTROLS ----------------------------- */
  {
    id: "neon-toggle",
    name: "Neon Toggle",
    category: "controls",
    description:
      "A switch that ignites a golden neon trail when flipped — built on a hidden checkbox and pseudo-elements.",
    tags: ["toggle", "neon", "switch"],
    css: `.fx-neon-toggle {
  display: inline-grid;
  cursor: pointer;
}

.fx-neon-toggle input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.fx-neon-toggle-track {
  width: 64px;
  height: 32px;
  border-radius: 999px;
  background: #2a2336;
  border: 1px solid rgba(245, 158, 11, 0.2);
  position: relative;
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.fx-neon-toggle-track::after {
  content: "";
  position: absolute;
  top: 3px;
  left: 3px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #fde68a;
  transition: transform 0.3s cubic-bezier(0.4, 0.2, 0.2, 1), background 0.3s ease;
}

.fx-neon-toggle input:checked + .fx-neon-toggle-track {
  background: rgba(245, 158, 11, 0.22);
  box-shadow:
    0 0 12px rgba(245, 158, 11, 0.6),
    inset 0 0 8px rgba(245, 158, 11, 0.4);
}

.fx-neon-toggle input:checked + .fx-neon-toggle-track::after {
  transform: translateX(32px);
  background: #f59e0b;
  box-shadow: 0 0 12px rgba(245, 158, 11, 0.9);
}`,
  },
  {
    id: "glow-input",
    name: "Glow Underline Input",
    category: "controls",
    description:
      "A borderless field whose underline blooms into a gradient glow on focus, with a sliding label.",
    tags: ["input", "focus", "underline"],
    css: `.fx-glow-input {
  position: relative;
  width: 100%;
}

.fx-glow-input input {
  width: 100%;
  padding: 0.8rem 0.4rem;
  border: none;
  background: transparent;
  color: #fde68a;
  font-size: 1rem;
  outline: none;
}

.fx-glow-input input::placeholder {
  color: rgba(253, 230, 138, 0.4);
}

.fx-glow-input::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: rgba(245, 158, 11, 0.25);
}

.fx-glow-input::before {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #f59e0b, #f43f5e);
  box-shadow: 0 0 10px rgba(245, 158, 11, 0.8);
  transition: width 0.4s ease, left 0.4s ease;
}

.fx-glow-input:focus-within::before {
  width: 100%;
  left: 0;
}`,
  },
  {
    id: "daynight-toggle",
    name: "Day / Night Switch",
    category: "controls",
    description:
      "A scene-aware switch where a sun morphs into a moon among drifting stars — a miniature world in a pill.",
    tags: ["toggle", "scene", "playful"],
    css: `.fx-daynight-toggle {
  display: inline-grid;
  cursor: pointer;
}

.fx-daynight-toggle input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.fx-daynight-scene {
  width: 84px;
  height: 36px;
  border-radius: 999px;
  background: linear-gradient(180deg, #7dd3fc, #38bdf8);
  position: relative;
  overflow: hidden;
  transition: background 0.5s ease;
}

.fx-daynight-scene::before {
  content: "";
  position: absolute;
  top: 4px;
  left: 4px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #fde68a, #f59e0b);
  box-shadow: 0 0 12px rgba(253, 224, 71, 0.9);
  transition: transform 0.5s cubic-bezier(0.4, 0.2, 0.2, 1), background 0.5s ease, box-shadow 0.5s ease;
}

.fx-daynight-toggle input:checked + .fx-daynight-scene {
  background: linear-gradient(180deg, #1e1b4b, #0c0a14);
}

.fx-daynight-toggle input:checked + .fx-daynight-scene::before {
  transform: translateX(48px);
  background: radial-gradient(circle at 35% 35%, #f1f5f9, #94a3b8);
  box-shadow:
    0 0 10px rgba(241, 245, 249, 0.6),
    inset -6px -3px 0 rgba(12, 10, 20, 0.5);
}`,
  },
];

export const effectById = (id: string) => effects.find((e) => e.id === id);

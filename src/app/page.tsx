"use client";

import { useMemo, useState } from "react";
import {
  Code2,
  Github,
  LayoutGrid,
  LoaderCircle,
  MousePointerClick,
  Search,
  Sparkles,
  ToggleRight,
  Type,
  Zap,
} from "lucide-react";
import { categories, effects, type CategoryId } from "@/lib/effects-data";
import { EffectCard } from "@/components/effects/effect-card";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MousePointerClick,
  LayoutGrid,
  Type,
  LoaderCircle,
  Sparkles,
  ToggleRight,
};

type Filter = "all" | CategoryId;

export default function Page() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return effects.filter((e) => {
      const inCat = filter === "all" || e.category === filter;
      const inQ =
        !q ||
        e.name.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.tags.some((t) => t.toLowerCase().includes(q));
      return inCat && inQ;
    });
  }, [filter, query]);

  // When "all", render grouped by category; otherwise a flat grid.
  const grouped = useMemo(() => {
    if (filter !== "all") return null;
    return categories
      .map((cat) => ({
        cat,
        items: filtered.filter((e) => e.category === cat.id),
      }))
      .filter((g) => g.items.length > 0);
  }, [filter, filtered]);

  const totalCount = effects.length;

  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Global effect stylesheet — injected once */}
      <style dangerouslySetInnerHTML={{ __html: effects.map((e) => e.css).join("\n\n") }} />

      {/* ----------------------------- Header ----------------------------- */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#top" className="group flex items-center gap-2.5">
            <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-amber-300 via-amber-500 to-rose-500 shadow-[0_8px_24px_-8px_rgba(244,63,94,0.6)]">
              <Code2 className="h-4.5 w-4.5 text-amber-950" strokeWidth={2.4} />
            </span>
            <div className="leading-none">
              <div className="text-base font-extrabold tracking-tight brand-gradient-text">
                AURUM
              </div>
              <div className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-muted-foreground">
                CSS Atelier
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
            <a href="#collection" className="transition-colors hover:text-foreground">
              Collection
            </a>
            <a href="#categories" className="transition-colors hover:text-foreground">
              Categories
            </a>
            <a href="#about" className="transition-colors hover:text-foreground">
              About
            </a>
          </nav>

          <a
            href="#collection"
            className="inline-flex items-center gap-2 rounded-lg border border-amber-400/40 bg-amber-400/10 px-3.5 py-2 text-xs font-semibold text-amber-200 transition-colors hover:bg-amber-400/20"
          >
            <Zap className="h-3.5 w-3.5" />
            Browse effects
          </a>
        </div>
      </header>

      {/* ----------------------------- Hero ----------------------------- */}
      <section id="top" className="relative overflow-hidden">
        <div className="aurora pointer-events-none" />
        <div className="pointer-events-none absolute inset-0 grid-texture opacity-30" />

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 sm:pt-28 lg:px-8 lg:pt-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1.5 text-xs font-medium text-amber-200">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
              </span>
              {totalCount} hand-crafted effects · pure CSS · zero dependencies
            </div>

            <h1 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="brand-gradient-text">Aurum</span>
              <span className="block text-amber-50">CSS Atelier</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              A curated atelier of magnificent, production-ready CSS effects. Every
              piece ships with a live demo and copy-ready code — built to make your
              interface stand out, not blend in.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#collection"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-300 via-amber-500 to-rose-500 px-6 py-3 text-sm font-bold text-amber-950 shadow-[0_16px_40px_-12px_rgba(244,63,94,0.6)] transition-transform hover:-translate-y-0.5"
              >
                <Sparkles className="h-4 w-4" />
                Enter the collection
              </a>
              <a
                href="#categories"
                className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-card/50 px-6 py-3 text-sm font-semibold text-foreground/90 backdrop-blur transition-colors hover:border-amber-400/40"
              >
                <LayoutGrid className="h-4 w-4" />
                Explore categories
              </a>
            </div>

            {/* Stats */}
            <div className="mx-auto mt-14 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/50 bg-border/40 sm:grid-cols-4">
              {[
                { k: `${totalCount}`, v: "Effects" },
                { k: "6", v: "Categories" },
                { k: "0", v: "Dependencies" },
                { k: "100%", v: "Pure CSS" },
              ].map((s) => (
                <div key={s.v} className="bg-card/60 px-4 py-5 backdrop-blur">
                  <div className="text-2xl font-black brand-gradient-text sm:text-3xl">
                    {s.k}
                  </div>
                  <div className="mt-1 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------- Category rail ----------------------------- */}
      <section id="categories" className="sticky top-16 z-40 border-y border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="fancy-scroll -mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-1 lg:pb-0">
            <FilterPill
              active={filter === "all"}
              onClick={() => setFilter("all")}
              icon={<LayoutGrid className="h-3.5 w-3.5" />}
              label="All"
              count={totalCount}
            />
            {categories.map((c) => {
              const Icon = iconMap[c.icon] ?? Sparkles;
              const count = effects.filter((e) => e.category === c.id).length;
              return (
                <FilterPill
                  key={c.id}
                  active={filter === c.id}
                  onClick={() => setFilter(c.id)}
                  icon={<Icon className="h-3.5 w-3.5" />}
                  label={c.name}
                  count={count}
                />
              );
            })}
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search effects…"
              className="w-full rounded-lg border border-border/60 bg-card/50 py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20"
            />
          </div>
        </div>
      </section>

      {/* ----------------------------- Collection ----------------------------- */}
      <main id="collection" className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          {filtered.length === 0 ? (
            <div className="grid place-items-center rounded-2xl border border-dashed border-border/60 py-24 text-center">
              <Search className="h-8 w-8 text-muted-foreground" />
              <p className="mt-4 text-lg font-semibold text-foreground">No effects found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try a different keyword or clear the filters.
              </p>
              <button
                onClick={() => {
                  setQuery("");
                  setFilter("all");
                }}
                className="mt-5 rounded-lg border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-xs font-semibold text-amber-200 transition-colors hover:bg-amber-400/20"
              >
                Reset filters
              </button>
            </div>
          ) : grouped ? (
            <div className="space-y-16">
              {grouped.map(({ cat, items }) => {
                const Icon = iconMap[cat.icon] ?? Sparkles;
                return (
                  <section key={cat.id} id={cat.id} className="scroll-mt-36">
                    <div className="mb-6 flex items-end justify-between gap-4 border-b border-border/40 pb-4">
                      <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 place-items-center rounded-xl border border-amber-400/30 bg-amber-400/10 text-amber-300">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <h2 className="text-xl font-bold text-amber-50 sm:text-2xl">
                            {cat.name}
                          </h2>
                          <p className="text-sm text-muted-foreground">{cat.tagline}</p>
                        </div>
                      </div>
                      <span className="hidden text-sm font-medium text-muted-foreground sm:block">
                        {items.length} {items.length === 1 ? "piece" : "pieces"}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {items.map((e, i) => (
                        <EffectCard key={e.id} effect={e} index={i} />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          ) : (
            <div>
              <div className="mb-6 flex items-end justify-between gap-4 border-b border-border/40 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-amber-50 sm:text-2xl">
                    {categories.find((c) => c.id === filter)?.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {categories.find((c) => c.id === filter)?.tagline}
                  </p>
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((e, i) => (
                  <EffectCard key={e.id} effect={e} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ----------------------------- About strip ----------------------------- */}
      <section id="about" className="border-t border-border/50 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <Code2 className="h-5 w-5" />,
                title: "Copy-ready code",
                body: "Every effect ships as clean, self-contained CSS. No frameworks, no build step — paste and go.",
              },
              {
                icon: <Sparkles className="h-5 w-5" />,
                title: "Crafted to stand out",
                body: "Each piece is tuned for that magnificent, brand-forward feel. Polished motion, deliberate color, real depth.",
              },
              {
                icon: <Zap className="h-5 w-5" />,
                title: "Lightweight by design",
                body: "Pure CSS means GPU-friendly animations and tiny payloads. Performance you can feel.",
              },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-border/50 bg-background/40 p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-amber-400/30 bg-amber-400/10 text-amber-300">
                  {f.icon}
                </span>
                <h3 className="mt-4 text-lg font-bold text-amber-50">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------- Footer ----------------------------- */}
      <footer className="mt-auto border-t border-border/50 bg-background/60 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-amber-300 via-amber-500 to-rose-500">
                <Code2 className="h-4 w-4 text-amber-950" strokeWidth={2.4} />
              </span>
              <div className="leading-none">
                <div className="text-sm font-extrabold brand-gradient-text">AURUM</div>
                <div className="text-[0.58rem] font-medium uppercase tracking-[0.3em] text-muted-foreground">
                  CSS Atelier
                </div>
              </div>
            </div>

            <p className="order-3 text-center text-xs text-muted-foreground md:order-2">
              Crafted with pure CSS &amp; care. © {new Date().getFullYear()} Aurum Atelier —
              copy freely, build magnificently.
            </p>

            <div className="order-2 flex items-center gap-3 md:order-3">
              <a
                href="#top"
                className="rounded-lg border border-border/60 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-amber-400/40 hover:text-amber-200"
              >
                Back to top
              </a>
              <a
                href="#collection"
                className="inline-flex items-center gap-1.5 rounded-lg border border-amber-400/40 bg-amber-400/10 px-3 py-1.5 text-xs font-semibold text-amber-200 transition-colors hover:bg-amber-400/20"
              >
                <Github className="h-3.5 w-3.5" />
                Collection
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  icon,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all ${
        active
          ? "border-amber-400/50 bg-amber-400/15 text-amber-100 shadow-[0_0_18px_-6px_rgba(245,158,11,0.7)]"
          : "border-border/60 bg-card/40 text-muted-foreground hover:border-amber-400/30 hover:text-foreground"
      }`}
    >
      {icon}
      {label}
      <span
        className={`ml-0.5 rounded-full px-1.5 py-px text-[0.6rem] ${
          active ? "bg-amber-400/25 text-amber-100" : "bg-secondary/60 text-muted-foreground"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

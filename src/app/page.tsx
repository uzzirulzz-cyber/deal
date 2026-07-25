"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Building2,
  Globe2,
  Home,
  Layers,
  MapPin,
  Search,
  ShoppingBag,
  Sparkles,
  Tag,
  TrendingUp,
  Zap,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  location: string;
  status: string;
  featured: boolean;
  seller: string;
  offers: number;
  description: string | null;
}

interface ApiResponse {
  source: string;
  count: number;
  products: Product[];
}

const CATEGORY_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  Websites: Globe2,
  Domains: Tag,
  FinTech: TrendingUp,
  "Digital Products": Layers,
  "Real Estate": Home,
};

const CATEGORY_ACCENT: Record<string, string> = {
  Websites: "from-amber-300 via-amber-500 to-orange-500",
  "Real Estate": "from-emerald-300 via-amber-400 to-rose-500",
  Domains: "from-rose-300 via-rose-500 to-pink-600",
  FinTech: "from-yellow-200 via-amber-400 to-rose-500",
  "Digital Products": "from-fuchsia-300 via-rose-500 to-amber-500",
};

type Filter = "all" | string;

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: ApiResponse = await res.json();
        if (!cancelled) {
          setProducts(data.products);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) setError(String(e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(() => {
    const map = new Map<string, number>();
    products.forEach((p) => map.set(p.category, (map.get(p.category) ?? 0) + 1));
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
  }, [products]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const inCat = filter === "all" || p.category === filter;
      const inQ =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.description ?? "").toLowerCase().includes(q);
      return inCat && inQ;
    });
  }, [products, filter, query]);

  const grouped = useMemo(() => {
    if (filter !== "all") return null;
    return categories
      .map((c) => ({ ...c, items: filtered.filter((p) => p.category === c.name) }))
      .filter((g) => g.items.length > 0);
  }, [filter, filtered, categories]);

  const totalValue = useMemo(
    () => products.reduce((s, p) => s + p.price, 0),
    [products]
  );

  return (
    <div className="relative flex min-h-screen flex-col">
      {/* ----------------------------- Header ----------------------------- */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#top" className="group flex items-center gap-2.5">
            <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-amber-300 via-amber-500 to-rose-500 shadow-[0_8px_24px_-8px_rgba(244,63,94,0.6)]">
              <Building2 className="h-4.5 w-4.5 text-amber-950" strokeWidth={2.4} />
            </span>
            <div className="leading-none">
              <div className="text-base font-extrabold tracking-tight brand-gradient-text">
                MAKE THIS DEAL
              </div>
              <div className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-muted-foreground">
                Atelier · Marketplace
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
            <a href="#collection" className="transition-colors hover:text-foreground">
              Listings
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
            Browse deals
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
              Live from makethisdeal.biz · PostgreSQL backed
            </div>

            <h1 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="brand-gradient-text">Buy, Sell &amp; Invest</span>
              <span className="block text-amber-50">in Businesses Worldwide</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              A magnificent, brand-forward showcase of real marketplace listings —
              domains, websites, fintech &amp; digital products — pulled live from the
              database and dressed in gold-grade CSS.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#collection"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-300 via-amber-500 to-rose-500 px-6 py-3 text-sm font-bold text-amber-950 shadow-[0_16px_40px_-12px_rgba(244,63,94,0.6)] transition-transform hover:-translate-y-0.5"
              >
                <Sparkles className="h-4 w-4" />
                Explore the deals
              </a>
              <a
                href="#categories"
                className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-card/50 px-6 py-3 text-sm font-semibold text-foreground/90 backdrop-blur transition-colors hover:border-amber-400/40"
              >
                <Layers className="h-4 w-4" />
                Browse categories
              </a>
            </div>

            {/* Stats */}
            <div className="mx-auto mt-14 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/50 bg-border/40 sm:grid-cols-4">
              {[
                { k: `${loading ? "—" : products.length}`, v: "Live Listings" },
                { k: `${loading ? "—" : categories.length}`, v: "Categories" },
                {
                  k: loading ? "—" : `$${(totalValue / 1000).toFixed(1)}K`,
                  v: "Total Value",
                },
                { k: "PG", v: "Neon Database" },
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
      <section
        id="categories"
        className="sticky top-16 z-40 border-y border-border/50 bg-background/80 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="fancy-scroll -mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-1 lg:pb-0">
            <FilterPill
              active={filter === "all"}
              onClick={() => setFilter("all")}
              icon={<Layers className="h-3.5 w-3.5" />}
              label="All"
              count={products.length}
            />
            {categories.map((c) => {
              const Icon = CATEGORY_ICON[c.name] ?? Tag;
              return (
                <FilterPill
                  key={c.name}
                  active={filter === c.name}
                  onClick={() => setFilter(c.name)}
                  icon={<Icon className="h-3.5 w-3.5" />}
                  label={c.name}
                  count={c.count}
                />
              );
            })}
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search listings…"
              className="w-full rounded-lg border border-border/60 bg-card/50 py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20"
            />
          </div>
        </div>
      </section>

      {/* ----------------------------- Collection ----------------------------- */}
      <main id="collection" className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          {loading ? (
            <SkeletonGrid />
          ) : error ? (
            <ErrorState error={error} />
          ) : filtered.length === 0 ? (
            <EmptyState
              onReset={() => {
                setQuery("");
                setFilter("all");
              }}
            />
          ) : grouped ? (
            <div className="space-y-16">
              {grouped.map((g) => {
                const Icon = CATEGORY_ICON[g.name] ?? Tag;
                const accent = CATEGORY_ACCENT[g.name] ?? "from-amber-300 via-amber-500 to-rose-500";
                return (
                  <section key={g.name} id={g.name} className="scroll-mt-36">
                    <div className="mb-6 flex items-end justify-between gap-4 border-b border-border/40 pb-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${accent} text-amber-950 shadow-[0_8px_24px_-10px_rgba(244,63,94,0.7)]`}
                        >
                          <Icon className="h-5 w-5" strokeWidth={2.2} />
                        </span>
                        <div>
                          <h2 className="text-xl font-bold text-amber-50 sm:text-2xl">
                            {g.name}
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            {g.count} {g.count === 1 ? "listing" : "listings"} · live from the marketplace
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {g.items.map((p, i) => (
                        <ProductCard key={p.id} product={p} index={i} accent={accent} />
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
                  <h2 className="text-xl font-bold text-amber-50 sm:text-2xl">{filter}</h2>
                  <p className="text-sm text-muted-foreground">
                    {filtered.length} {filtered.length === 1 ? "listing" : "listings"}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((p, i) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    index={i}
                    accent={CATEGORY_ACCENT[p.category] ?? "from-amber-300 via-amber-500 to-rose-500"}
                  />
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
                icon: <Globe2 className="h-5 w-5" />,
                title: "Real marketplace data",
                body: "Listings are pulled live from makethisdeal.biz and stored in a Neon PostgreSQL database — what you see is what's really for sale.",
              },
              {
                icon: <Sparkles className="h-5 w-5" />,
                title: "Magnificent by design",
                body: "Every card is dressed in gold-grade CSS — glow borders, gradient accents, and depth that makes a deal feel worth making.",
              },
              {
                icon: <Zap className="h-5 w-5" />,
                title: "Built to close deals",
                body: "Featured badges, offer counts, seller identity, and instant category filtering — the storefront for a global business exchange.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-border/50 bg-background/40 p-6"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-amber-400/30 bg-amber-400/10 text-amber-300">
                  {f.icon}
                </span>
                <h3 className="mt-4 text-lg font-bold text-amber-50">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.body}
                </p>
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
                <Building2 className="h-4 w-4 text-amber-950" strokeWidth={2.4} />
              </span>
              <div className="leading-none">
                <div className="text-sm font-extrabold brand-gradient-text">MAKE THIS DEAL</div>
                <div className="text-[0.58rem] font-medium uppercase tracking-[0.3em] text-muted-foreground">
                  Atelier · Marketplace
                </div>
              </div>
            </div>

            <p className="order-3 text-center text-xs text-muted-foreground md:order-2">
              Real listings from makethisdeal.biz · powered by Neon PostgreSQL · ©{" "}
              {new Date().getFullYear()} Make This Deal Atelier
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
                <ShoppingBag className="h-3.5 w-3.5" />
                Listings
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Product card                                                      */
/* ------------------------------------------------------------------ */
function ProductCard({
  product,
  index,
  accent,
}: {
  product: Product;
  index: number;
  accent: string;
}) {
  return (
    <article
      className="fx-glow-card group relative flex flex-col p-5"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      {/* Top row: badges */}
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-amber-200">
          {product.category}
        </span>
        <div className="flex items-center gap-1.5">
          {product.status && product.status !== "Active" && (
            <span
              className={`rounded-full px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider ${
                product.status === "AVAILABLE"
                  ? "bg-emerald-400/20 text-emerald-200"
                  : product.status === "SOLD"
                    ? "bg-rose-400/20 text-rose-200"
                    : "bg-amber-400/20 text-amber-200"
              }`}
            >
              {product.status}
            </span>
          )}
          {product.featured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-300 to-rose-500 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-amber-950">
              <Sparkles className="h-2.5 w-2.5" /> Featured
            </span>
          )}
        </div>
      </div>

      {/* Name */}
      <h3 className="mt-3 text-lg font-bold leading-snug text-amber-50">
        {product.name}
      </h3>

      {/* Location + seller */}
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {product.location}
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="grid h-4 w-4 place-items-center rounded-full bg-gradient-to-br from-amber-400 to-rose-500 text-[0.5rem] font-bold text-amber-950">
            {product.seller.charAt(0)}
          </span>
          {product.seller}
        </span>
      </div>

      {/* Description */}
      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {product.description ?? "No description available."}
      </p>

      {/* Price */}
      <div className="mt-4 flex items-end justify-between border-t border-border/40 pt-4">
        <div>
          <div className="text-[0.62rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Price
          </div>
          <div className="text-2xl font-black brand-gradient-text">
            ${product.price.toLocaleString()}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[0.62rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Offers
          </div>
          <div className="text-lg font-bold text-amber-100">{product.offers}</div>
        </div>
      </div>

      {/* CTA */}
      <button
        className={`mt-4 w-full rounded-xl bg-gradient-to-r ${accent} py-2.5 text-sm font-bold text-amber-950 opacity-90 shadow-[0_10px_24px_-12px_rgba(244,63,94,0.6)] transition-all hover:opacity-100 hover:shadow-[0_14px_30px_-10px_rgba(244,63,94,0.75)]`}
      >
        View Details
      </button>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  States                                                            */
/* ------------------------------------------------------------------ */
function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-72 animate-pulse rounded-2xl border border-border/40 bg-card/40"
        />
      ))}
    </div>
  );
}

function ErrorState({ error }: { error: string }) {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-rose-400/40 py-24 text-center">
      <p className="text-lg font-semibold text-rose-200">Couldn't load listings</p>
      <p className="mt-1 max-w-md text-sm text-muted-foreground">{error}</p>
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-border/60 py-24 text-center">
      <Search className="h-8 w-8 text-muted-foreground" />
      <p className="mt-4 text-lg font-semibold text-foreground">No listings found</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Try a different keyword or clear the filters.
      </p>
      <button
        onClick={onReset}
        className="mt-5 rounded-lg border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-xs font-semibold text-amber-200 transition-colors hover:bg-amber-400/20"
      >
        Reset filters
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Filter pill                                                       */
/* ------------------------------------------------------------------ */
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

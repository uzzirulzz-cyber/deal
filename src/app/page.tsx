"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Building2,
  Globe2,
  Home,
  Layers,
  MapPin,
  Search,
  Tag,
  TrendingUp,
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
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-sm bg-foreground text-background">
              <Building2 className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <span className="text-base font-normal tracking-tight brand-text">Sentinel</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-normal text-foreground/70 md:flex">
            <a href="#collection" className="sentinel-link">Listings</a>
            <a href="#categories" className="sentinel-link">Categories</a>
            <a href="#about" className="sentinel-link">About</a>
          </nav>

          <a href="#collection" className="sentinel-btn-outline !py-2 !px-5 text-xs">
            Browse deals
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      {/* ----------------------------- Hero (ink section) ----------------------------- */}
      <section id="top" className="section-ink relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-texture opacity-100" />

        <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 sm:pt-36 lg:px-8 lg:pt-44">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-normal text-white/70">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              {loading ? "Loading live listings…" : `${products.length} live listings · PostgreSQL backed`}
            </div>

            <h1 className="text-5xl font-normal leading-[1.04] tracking-tight sm:text-7xl lg:text-8xl">
              Buy, Sell &amp; Invest
              <span className="block text-white/45">in Businesses Worldwide</span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-base font-normal leading-relaxed text-white/60 sm:text-lg">
              A refined marketplace of real listings — domains, websites, fintech,
              real estate &amp; digital products — pulled live from makethisdeal.biz.
              Magnificent through restraint.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a href="#collection" className="sentinel-btn !bg-white !text-foreground !border-white hover:!bg-transparent hover:!text-white">
                Explore the deals
              </a>
              <a href="#categories" className="sentinel-btn-outline !border-white/40 !text-white hover:!bg-white hover:!text-foreground">
                Browse categories
              </a>
            </div>
          </div>

          {/* Stats — hairline divided */}
          <div className="mx-auto mt-20 grid max-w-4xl grid-cols-2 border-t border-white/10 sm:grid-cols-4">
            {[
              { k: loading ? "—" : `${products.length}`, v: "Live Listings" },
              { k: loading ? "—" : `${categories.length}`, v: "Categories" },
              {
                k: loading ? "—" : `$${(totalValue / 1000).toFixed(1)}K`,
                v: "Total Value",
              },
              { k: "PG", v: "Neon Database" },
            ].map((s, i) => (
              <div
                key={s.v}
                className={`px-6 py-7 ${i % 2 !== 0 ? "border-l border-white/10" : ""} ${
                  i >= 2 ? "border-t border-white/10 sm:border-t-0" : ""
                }`}
              >
                <div className="text-3xl font-normal text-white sm:text-4xl">{s.k}</div>
                <div className="mt-2 text-[0.68rem] font-normal uppercase tracking-[0.18em] text-white/45">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------- Marquee strip ----------------------------- */}
      <div className="border-b border-border bg-background py-4">
        <div className="marquee-track">
          <MarqueeItems categories={categories} />
          <MarqueeItems categories={categories} />
        </div>
      </div>

      {/* ----------------------------- Category rail ----------------------------- */}
      <section
        id="categories"
        className="sticky top-16 z-40 border-b border-border bg-background/90 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3.5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="fancy-scroll -mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-1 lg:pb-0">
            <FilterPill
              active={filter === "all"}
              onClick={() => setFilter("all")}
              label="All"
              count={products.length}
            />
            {categories.map((c) => (
              <FilterPill
                key={c.name}
                active={filter === c.name}
                onClick={() => setFilter(c.name)}
                label={c.name}
                count={c.count}
              />
            ))}
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search listings…"
              className="w-full rounded-full border border-border bg-background py-2 pl-9 pr-3 text-sm font-normal text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-foreground"
            />
          </div>
        </div>
      </section>

      {/* ----------------------------- Collection ----------------------------- */}
      <main id="collection" className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
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
            <div className="space-y-24">
              {grouped.map((g) => {
                const Icon = CATEGORY_ICON[g.name] ?? Tag;
                return (
                  <section key={g.name} id={g.name} className="scroll-mt-36">
                    <div className="mb-10 flex items-end justify-between gap-4 border-b border-border pb-6">
                      <div className="flex items-center gap-4">
                        <span className="grid h-11 w-11 place-items-center rounded-sm border border-foreground/20 text-foreground">
                          <Icon className="h-5 w-5" strokeWidth={1.5} />
                        </span>
                        <div>
                          <h2 className="text-3xl font-normal tracking-tight text-foreground sm:text-4xl">
                            {g.name}
                          </h2>
                          <p className="mt-1 text-sm font-normal text-muted-foreground">
                            {g.count} {g.count === 1 ? "listing" : "listings"} · live from the marketplace
                          </p>
                        </div>
                      </div>
                      <span className="hidden text-sm font-normal text-muted-foreground sm:block">
                        {String(g.items.length).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
                      {g.items.map((p, i) => (
                        <ProductCard key={p.id} product={p} index={i} />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          ) : (
            <div>
              <div className="mb-10 flex items-end justify-between gap-4 border-b border-border pb-6">
                <div>
                  <h2 className="text-3xl font-normal tracking-tight text-foreground sm:text-4xl">
                    {filter}
                  </h2>
                  <p className="mt-1 text-sm font-normal text-muted-foreground">
                    {filtered.length} {filtered.length === 1 ? "listing" : "listings"}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ----------------------------- About strip ----------------------------- */}
      <section id="about" className="border-t border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-normal tracking-tight text-foreground sm:text-4xl">
              A bespoke approach to the marketplace.
            </h2>
            <p className="mt-4 text-base font-normal leading-relaxed text-muted-foreground">
              Every listing is pulled live from makethisdeal.biz and stored in a Neon
              PostgreSQL database. The interface follows the Sentinel theme —
              monochrome, editorial, and built to let the deals speak.
            </p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-3">
            {[
              {
                k: "01",
                title: "Real marketplace data",
                body: "Listings are pulled live from makethisdeal.biz and stored in Neon PostgreSQL — what you see is what's really for sale.",
              },
              {
                k: "02",
                title: "Refined by design",
                body: "The Sentinel theme — pure monochrome, Montserrat, weight 400, hairline borders. Magnificent through restraint, not decoration.",
              },
              {
                k: "03",
                title: "Built to close deals",
                body: "Featured badges, offer counts, seller identity, and instant category filtering — the storefront for a global business exchange.",
              },
            ].map((f) => (
              <div key={f.k} className="bg-background p-8">
                <div className="text-xs font-normal tracking-[0.2em] text-muted-foreground">
                  {f.k}
                </div>
                <h3 className="mt-4 text-lg font-normal text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm font-normal leading-relaxed text-muted-foreground">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------- CTA band ----------------------------- */}
      <section className="section-ink">
        <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <h2 className="text-4xl font-normal tracking-tight sm:text-5xl">
            Ready to make a deal?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base font-normal text-white/55">
            Browse the full collection of live listings, or list your own business for sale.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#collection" className="sentinel-btn !bg-white !text-foreground !border-white hover:!bg-transparent hover:!text-white">
              Browse listings
            </a>
            <a href="#top" className="sentinel-btn-outline !border-white/40 !text-white hover:!bg-white hover:!text-foreground">
              Back to top
            </a>
          </div>
        </div>
      </section>

      {/* ----------------------------- Footer ----------------------------- */}
      <footer className="border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-sm bg-foreground text-background">
                <Building2 className="h-3.5 w-3.5" strokeWidth={1.75} />
              </span>
              <span className="text-sm font-normal brand-text">Sentinel</span>
            </div>

            <p className="order-3 text-center text-xs font-normal text-muted-foreground md:order-2">
              Real listings from makethisdeal.biz · Neon PostgreSQL · Sentinel theme · ©{" "}
              {new Date().getFullYear()}
            </p>

            <div className="order-2 flex items-center gap-5 text-xs font-normal md:order-3">
              <a href="#collection" className="sentinel-link">Listings</a>
              <a href="#about" className="sentinel-link">About</a>
              <a href="#top" className="sentinel-link">Top</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Marquee items                                                     */
/* ------------------------------------------------------------------ */
function MarqueeItems({ categories }: { categories: { name: string; count: number }[] }) {
  const words = [
    "Buy", "Sell", "Invest", "Domains", "Websites", "FinTech",
    "Real Estate", "Digital Products", "Worldwide", "Together We Grow Strong",
    ...categories.map((c) => c.name),
  ];
  return (
    <div className="flex shrink-0 items-center">
      {words.map((w, i) => (
        <span key={i} className="flex items-center">
          <span className="px-6 text-sm font-normal uppercase tracking-[0.2em] text-muted-foreground">
            {w}
          </span>
          <span className="text-foreground/20">/</span>
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Product card — Sentinel: hairline border, monochrome, weight 400  */
/* ------------------------------------------------------------------ */
function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <article className="group relative flex flex-col bg-card p-7 transition-colors hover:bg-muted/40">
      {/* Top row: category + status */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-[0.62rem] font-normal uppercase tracking-[0.18em] text-muted-foreground">
          {product.category}
        </span>
        <div className="flex items-center gap-2">
          {product.status && product.status !== "Active" && (
            <span className="text-[0.6rem] font-normal uppercase tracking-[0.14em] text-foreground/60">
              {product.status}
            </span>
          )}
          {product.featured && (
            <span className="rounded-full bg-foreground px-2 py-0.5 text-[0.58rem] font-normal uppercase tracking-[0.12em] text-background">
              Featured
            </span>
          )}
        </div>
      </div>

      {/* Index number — editorial detail */}
      <div className="mt-4 text-[0.62rem] font-normal tracking-[0.2em] text-muted-foreground/60">
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Name */}
      <h3 className="mt-2 text-xl font-normal leading-snug tracking-tight text-foreground">
        {product.name}
      </h3>

      {/* Location + seller */}
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-normal text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <MapPin className="h-3 w-3" strokeWidth={1.5} />
          {product.location}
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-foreground text-[0.45rem] font-medium text-background">
            {product.seller.charAt(0)}
          </span>
          {product.seller}
        </span>
      </div>

      {/* Description */}
      <p className="mt-4 line-clamp-3 flex-1 text-sm font-normal leading-relaxed text-muted-foreground">
        {product.description ?? "No description available."}
      </p>

      {/* Price */}
      <div className="mt-6 flex items-end justify-between border-t border-border pt-5">
        <div>
          <div className="text-[0.6rem] font-normal uppercase tracking-[0.18em] text-muted-foreground">
            Price
          </div>
          <div className="mt-1 text-2xl font-normal tracking-tight text-foreground">
            ${product.price.toLocaleString()}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[0.6rem] font-normal uppercase tracking-[0.18em] text-muted-foreground">
            Offers
          </div>
          <div className="mt-1 text-lg font-normal text-foreground">{product.offers}</div>
        </div>
      </div>

      {/* CTA — outline that fills on hover */}
      <button className="sentinel-btn-outline mt-5 w-full justify-center !py-2.5 text-xs">
        View Details
        <ArrowUpRight className="h-3.5 w-3.5" />
      </button>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  States                                                            */
/* ------------------------------------------------------------------ */
function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-80 animate-pulse bg-muted/40" />
      ))}
    </div>
  );
}

function ErrorState({ error }: { error: string }) {
  return (
    <div className="grid place-items-center rounded-sm border border-border py-24 text-center">
      <p className="text-lg font-normal text-foreground">Couldn't load listings</p>
      <p className="mt-1 max-w-md text-sm font-normal text-muted-foreground">{error}</p>
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="grid place-items-center rounded-sm border border-border py-24 text-center">
      <Search className="h-7 w-7 text-muted-foreground" strokeWidth={1.5} />
      <p className="mt-4 text-lg font-normal text-foreground">No listings found</p>
      <p className="mt-1 text-sm font-normal text-muted-foreground">
        Try a different keyword or clear the filters.
      </p>
      <button onClick={onReset} className="sentinel-btn-outline mt-5 !py-2 !px-5 text-xs">
        Reset filters
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Filter pill — monochrome                                          */
/* ------------------------------------------------------------------ */
function FilterPill({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-normal transition-colors ${
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground"
      }`}
    >
      {label}
      <span className={active ? "text-background/60" : "text-muted-foreground/60"}>{count}</span>
    </button>
  );
}

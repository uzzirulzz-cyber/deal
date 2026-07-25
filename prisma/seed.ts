/**
 * Seed script — inserts REAL products scraped from makethisdeal.biz
 * (a global business marketplace: "Buy, Sell & Invest in Businesses Worldwide").
 *
 * Run with: bun run seed
 */
import { db } from "../src/lib/db";

interface SeedProduct {
  name: string;
  category: string;
  price: number;
  location: string;
  status: string;
  featured: boolean;
  seller: string;
  offers: number;
  description: string;
}

const products: SeedProduct[] = [
  {
    name: "ZXC Sigma Ivory",
    category: "Websites",
    price: 1200,
    location: "Pakistan",
    status: "Active",
    featured: true,
    seller: "PlayBeat Digital",
    offers: 1,
    description:
      "Production SaaS application deployed on Vercel. Features a modern UI, clean codebase, and is ready for immediate commercial use or further development. Business model: SaaS / Productivity. Target market: business professionals and startups.",
  },
  {
    name: "Malik Indol",
    category: "Websites",
    price: 1800,
    location: "Pakistan",
    status: "Active",
    featured: true,
    seller: "PlayBeat Digital",
    offers: 2,
    description:
      "An established website asset with a clean, deployable codebase. Suited for buyers looking to acquire and scale an existing web property within the productivity space.",
  },
  {
    name: "PlayBeatTV.buzz",
    category: "Domains",
    price: 1400,
    location: "Pakistan",
    status: "Active",
    featured: true,
    seller: "PlayBeat Digital",
    offers: 0,
    description:
      "Premium branded domain in the .buzz extension — ideal for a streaming, entertainment, or media-tech venture looking for a punchy, memorable web address.",
  },
  {
    name: "BlockExchange.buzz",
    category: "FinTech",
    price: 1900,
    location: "Pakistan",
    status: "Active",
    featured: true,
    seller: "PlayBeat Digital",
    offers: 2,
    description:
      "A fintech/crypto-focused brand asset built around a high-recall .buzz domain. Positioned for a blockchain exchange or digital-asset trading platform.",
  },
  {
    name: "PlayBeatDigital.world",
    category: "Domains",
    price: 2000,
    location: "Pakistan",
    status: "Active",
    featured: true,
    seller: "PlayBeat Digital",
    offers: 0,
    description:
      "Global-scope branded domain in the .world extension. A strong, brandable identity for a digital media or entertainment network with worldwide ambition.",
  },
  {
    name: "PlayBeat.digital",
    category: "Domains",
    price: 2000,
    location: "Pakistan",
    status: "Active",
    featured: true,
    seller: "PlayBeat Digital",
    offers: 1,
    description:
      "Category-defining .digital domain for the PlayBeat brand. A clean, modern identity perfect for a digital products or streaming business.",
  },
  {
    name: "PlayBeat.live",
    category: "Domains",
    price: 1800,
    location: "Pakistan",
    status: "Active",
    featured: true,
    seller: "PlayBeat Digital",
    offers: 0,
    description:
      "Live-streaming ready branded domain in the .live extension. Tailor-made for real-time broadcasting, events, or live entertainment platforms.",
  },
  {
    name: "MagxTV",
    category: "Digital Products",
    price: 1900,
    location: "Pakistan",
    status: "Active",
    featured: false,
    seller: "PlayBeat Digital",
    offers: 0,
    description:
      "A complete digital product asset targeted at the streaming/IPTV space. Comes packaged and ready for handover to a new operator.",
  },
  {
    name: "NexTradePro.top",
    category: "FinTech",
    price: 900,
    location: "Pakistan",
    status: "Active",
    featured: false,
    seller: "PlayBeat Digital",
    offers: 1,
    description:
      "An affordable entry-point fintech brand built on the .top extension. Suited for a trading platform, signals service, or trading-tools SaaS.",
  },
  {
    name: "BuzzCryp.buzz",
    category: "FinTech",
    price: 1900,
    location: "Pakistan",
    status: "Active",
    featured: false,
    seller: "PlayBeat Digital",
    offers: 0,
    description:
      "A crypto-native branded domain on the .buzz extension. High-recall identity for a cryptocurrency news, community, or exchange project.",
  },
  {
    name: "BrockExchange.quest",
    category: "FinTech",
    price: 1900,
    location: "Pakistan",
    status: "Active",
    featured: true,
    seller: "PlayBeat Digital",
    offers: 0,
    description:
      "A fintech brand asset on the .quest extension, positioned for a digital-asset exchange or trading-quest themed platform.",
  },
];

async function main() {
  console.log(`Seeding ${products.length} real products from makethisdeal.biz…`);

  // Clean slate
  await db.product.deleteMany({});

  for (const p of products) {
    await db.product.create({ data: p });
    console.log(`  ✓ ${p.name} (${p.category}, $${p.price})`);
  }

  const total = await db.product.count();
  console.log(`\nDone. ${total} products now live in PostgreSQL.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });

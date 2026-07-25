/**
 * Insert script — adds REAL luxury real estate listings scraped from
 * propertyatlas.lifestyle ("PropertyAtlas — Luxury Real Estate Lifestyle")
 * into the marketplace, under a new "Real Estate" category.
 *
 * Per the user's instruction, each listing is added at $2,300 (the user's
 * listing price). The real market value (PKR) is preserved in the description
 * for transparency.
 *
 * Run with: bun prisma/add-real-estate.ts
 */
import { db } from "../src/lib/db";

interface EstateListing {
  name: string;
  type: string;
  location: string;
  status: string;
  marketPricePkr: string;
  description: string;
}

const listings: EstateListing[] = [
  {
    name: "Rawal Lake View Villa",
    type: "Villa",
    location: "Bani Gala, Islamabad",
    status: "RENTED",
    marketPricePkr: "Rs 850,000/mo",
    description:
      "Stunning villa with direct Rawal Lake access, vaulted ceilings, and walls of glass opening to a sprawling deck. The ultimate Bani Gala lifestyle with serene waterfront views. Market value: Rs 850,000/mo (rented). Source: propertyatlas.lifestyle.",
  },
  {
    name: "The Pinnacle Penthouse",
    type: "Penthouse",
    location: "F-8, Islamabad",
    status: "RENTED",
    marketPricePkr: "Rs 1,200,000/mo",
    description:
      "Ultra-luxury penthouse occupying the top floor of Centaurus with 360-degree views of Islamabad, private elevator, wraparound terrace, and designer interiors. Market value: Rs 1,200,000/mo (rented). Source: propertyatlas.lifestyle.",
  },
  {
    name: "Centaurus Towers (Pre-Construction)",
    type: "Apartment",
    location: "F-8, Islamabad",
    status: "AVAILABLE",
    marketPricePkr: "Rs 65,000,000",
    description:
      "An iconic 40-story residential tower currently under construction in the heart of Islamabad. Featuring luxury residences, sky lounge, and premium amenities. Market value: Rs 65,000,000 (ongoing project). Source: propertyatlas.lifestyle.",
  },
  {
    name: "Gulberg Greens Duplex Residences",
    type: "Duplex",
    location: "Gulberg Greens, Islamabad",
    status: "SOLD",
    marketPricePkr: "Rs 42,000,000",
    description:
      "Sophisticated duplex apartments in Gulberg Greens with landscaped entrances, private garages, and spacious modern layouts. Premium location near the Islamabad expressway. Market value: Rs 42,000,000 (sold). Source: propertyatlas.lifestyle.",
  },
  {
    name: "Capital Smart City (Phase 2)",
    type: "House",
    location: "Chakri Road, Islamabad",
    status: "AVAILABLE",
    marketPricePkr: "Rs 35,000,000",
    description:
      "Phase 2 of the popular Capital Smart City master-planned community. 200 villas with clubhouse, nature trails, and parks. Smart-city infrastructure throughout. Market value: Rs 35,000,000 (ongoing project). Source: propertyatlas.lifestyle.",
  },
  {
    name: "Blue Area Business Tower",
    type: "Commercial",
    location: "Blue Area, Islamabad",
    status: "SOLD",
    marketPricePkr: "Rs 320,000,000",
    description:
      "Class-A commercial office tower in Blue Area, Islamabad's central business district. Flexible floor plans, premium building systems, and stunning lobby. Ideal for corporate headquarters. Market value: Rs 320,000,000 (sold). Source: propertyatlas.lifestyle.",
  },
  {
    name: "DHA Phase 2 Townhomes",
    type: "Townhouse",
    location: "DHA Phase 2, Islamabad",
    status: "SOLD",
    marketPricePkr: "Rs 38,000,000",
    description:
      "Elegant modern townhomes in DHA Phase 2 with contemporary facades, private rooftop decks, and energy-efficient design. Steps from the DHA Club and commercial market. Market value: Rs 38,000,000 (sold). Source: propertyatlas.lifestyle.",
  },
  {
    name: "F-11 Family Home",
    type: "House",
    location: "F-11, Islamabad",
    status: "SOLD",
    marketPricePkr: "Rs 48,000,000",
    description:
      "Charming family home on a quiet street in F-11. Renovated kitchen, marble floors, private lawn, and spacious basement. Move-in ready in one of Islamabad's most sought-after sectors. Market value: Rs 48,000,000 (sold). Source: propertyatlas.lifestyle.",
  },
  {
    name: "The Crescent Apartments",
    type: "Apartment",
    location: "Bahria Town, Islamabad",
    status: "SOLD",
    marketPricePkr: "Rs 22,500,000",
    description:
      "Contemporary apartment building in Bahria Town Phase 8 offering bright open-plan units with premium finishes, rooftop terrace, and 24/7 concierge security. Market value: Rs 22,500,000 (sold). Source: propertyatlas.lifestyle.",
  },
  {
    name: "Margalla View Luxury Villa",
    type: "Villa",
    location: "F-7, Islamabad",
    status: "SOLD",
    marketPricePkr: "Rs 185,000,000",
    description:
      "A breathtaking modern villa in F-7 with panoramic Margalla Hills views, infinity pool, and smart-home automation throughout. Designed by award-winning architects with premium finishes. Market value: Rs 185,000,000 (sold). Source: propertyatlas.lifestyle.",
  },
];

async function main() {
  console.log(
    `Adding ${listings.length} real estate listings from propertyatlas.lifestyle at $2,300 each…`
  );

  let added = 0;
  for (const l of listings) {
    const existing = await db.product.findFirst({ where: { name: l.name } });
    if (existing) {
      console.log(`  · skip (exists): ${l.name}`);
      continue;
    }
    await db.product.create({
      data: {
        name: l.name,
        category: "Real Estate",
        price: 2300, // user-specified listing price
        location: l.location,
        status: l.status,
        featured: ["Margalla View Luxury Villa", "The Pinnacle Penthouse", "Centaurus Towers (Pre-Construction)"].includes(
          l.name
        ),
        seller: "PropertyAtlas",
        offers: 0,
        description: `${l.description} Property type: ${l.type}. Market price: ${l.marketPricePkr}.`,
      },
    });
    added++;
    console.log(`  ✓ ${l.name} — ${l.type} · ${l.location} · ${l.marketPricePkr}`);
  }

  const total = await db.product.count();
  console.log(`\nDone. Added ${added} new real estate listings.`);
  console.log(`Total products in marketplace: ${total}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });

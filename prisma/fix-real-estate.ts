/**
 * Fix — the user wanted ONE real estate product (propertyatlas.lifestyle) added
 * at $2,300, not 10 separate property listings. This removes the 10 property
 * rows and inserts a single, clean product representing propertyatlas.lifestyle
 * as one Real Estate listing in the marketplace.
 *
 * Run with:
 * DATABASE_URL=… DIRECT_URL=… bun prisma/fix-real-estate.ts
 */
import { db } from "../src/lib/db";

async function main() {
  const removed = await db.product.deleteMany({ where: { category: "Real Estate" } });
  console.log(`Removed ${removed.count} real estate rows (the 10 I wrongly created).`);

  // The single product the user asked for: propertyatlas.lifestyle at $2,300.
  const created = await db.product.create({
    data: {
      name: "PropertyAtlas — Luxury Real Estate Lifestyle",
      category: "Real Estate",
      price: 2300,
      location: "Islamabad, Pakistan",
      status: "AVAILABLE",
      featured: true,
      seller: "PropertyAtlas",
      offers: 0,
      description:
        "propertyatlas.lifestyle — a luxury real estate lifestyle platform showcasing extraordinary homes and their owners. Curated Islamabad residences including waterfront villas (Bani Gala), ultra-luxury penthouses (Centaurus, F-8), pre-construction towers, duplex residences (Gulberg Greens), smart-city villas (Capital Smart City), commercial towers (Blue Area), DHA townhomes, family homes (F-11), Bahria apartments, and Margalla-view luxury villas (F-7). Source: propertyatlas.lifestyle.",
    },
  });

  const total = await db.product.count();
  const reCount = await db.product.count({ where: { category: "Real Estate" } });
  console.log(`\nKept 1 Real Estate listing:`);
  console.log(`  ✓ ${created.name} — $${created.price} · ${created.location}`);
  console.log(`\nReal Estate rows now: ${reCount}`);
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

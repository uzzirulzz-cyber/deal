import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

// GET /api/products — returns real products from PostgreSQL (sourced from makethisdeal.biz)
export async function GET() {
  try {
    const products = await db.product.findMany({
      orderBy: [{ featured: "desc" }, { price: "desc" }],
    });

    return NextResponse.json({
      source: "makethisdeal.biz",
      count: products.length,
      products,
    });
  } catch (err) {
    console.error("Failed to fetch products:", err);
    return NextResponse.json(
      { error: "Failed to load products", detail: String(err) },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Prevents Next.js from evaluating this route at build time
export const dynamic = "force-dynamic";

const itemSchema = z.object({
  name:     z.string(),
  price:    z.number().positive(),
  quantity: z.number().int().positive(),
  size:     z.string().optional(),
  color:    z.string().optional(),
});

const bodySchema = z.object({
  items: z.array(itemSchema).min(1),
  lang:  z.enum(["NO", "EN"]).default("NO"),
});

export async function POST(req: NextRequest) {
  try {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
    }

    // Dynamic import keeps Stripe out of the build-time module graph
    const { default: Stripe } = await import("stripe");
    const stripe = new Stripe(key, { apiVersion: "2026-07-29.dahlia" });

    const body = await req.json();
    const { items, lang } = bodySchema.parse(body);

    const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3001";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      locale: lang === "NO" ? "no" : "en",
      line_items: items.map((item) => ({
        price_data: {
          currency: "nok",
          product_data: {
            name: item.name,
            description: item.size ? `Størrelse: ${item.size}` : undefined,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      shipping_address_collection: {
        allowed_countries: ["NO", "SE", "DK", "FI"],
      },
      success_url: `${base}/ordre/suksess?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${base}/ordre/avbrutt`,
      metadata: { source: "truecollarclub-web" },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Kunne ikke opprette betalingsøkt" },
      { status: 500 }
    );
  }
}

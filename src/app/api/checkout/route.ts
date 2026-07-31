import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

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
    const body = await req.json();
    const { items, lang } = bodySchema.parse(body);

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-07-29.dahlia",
    });

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
      metadata: {
        source: "truecollarclub-web",
      },
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

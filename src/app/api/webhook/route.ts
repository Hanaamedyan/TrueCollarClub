import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const { default: Stripe } = await import("stripe");
  const stripe = new Stripe(key, { apiVersion: "2026-07-29.dahlia" });

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? "";
  const body = await req.text();
  const sig  = req.headers.get("stripe-signature") ?? "";

  let event: import("stripe").Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as import("stripe").Stripe.Checkout.Session;
      console.log("Betaling fullført:", session.id, "Beløp:", session.amount_total);
      // TODO: send bekreftelse på e-post, oppdater lager, logg ordre
      break;
    }
    case "payment_intent.payment_failed": {
      const pi = event.data.object as import("stripe").Stripe.PaymentIntent;
      console.warn("Betaling feilet:", pi.id);
      break;
    }
  }

  return NextResponse.json({ received: true });
}

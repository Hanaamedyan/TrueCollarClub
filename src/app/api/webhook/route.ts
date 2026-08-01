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

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as import("stripe").Stripe.Checkout.Session;

    try {
      // Hent full session med line_items og customer details
      const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ["line_items", "customer_details"],
      });

      const customerDetails = fullSession.customer_details;
      const lineItems = fullSession.line_items?.data ?? [];

      const orderData = {
        customerName:    customerDetails?.name    ?? "Kunde",
        customerEmail:   customerDetails?.email   ?? "",
        orderId:         session.id,
        totalAmount:     session.amount_total      ?? 0,
        shippingAddress: customerDetails?.address ?? null,
        items: lineItems.map((item) => ({
          name:     item.description ?? item.price?.product?.toString() ?? "Produkt",
          quantity: item.quantity ?? 1,
          price:    item.price?.unit_amount ?? 0,
        })),
      };

      await sendOrderEmails(orderData);
    } catch (err) {
      console.error("Failed to send order emails:", err);
    }
  }

  if (event.type === "payment_intent.payment_failed") {
    const pi = event.data.object as import("stripe").Stripe.PaymentIntent;
    console.warn("Betaling feilet:", pi.id);
  }

  return NextResponse.json({ received: true });
}

async function sendOrderEmails(data: {
  customerName: string;
  customerEmail: string;
  orderId: string;
  totalAmount: number;
  shippingAddress: import("stripe").Stripe.Address | null;
  items: { name: string; quantity: number; price: number }[];
}) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.warn("RESEND_API_KEY not set — skipping emails");
    return;
  }

  const { Resend } = await import("resend");
  const resend = new Resend(resendKey);

  const from    = process.env.RESEND_FROM_EMAIL   ?? "ordre@truecollarclub.no";
  const notifyTo = process.env.RESEND_NOTIFY_EMAIL ?? "hei@truecollarclub.no";

  const { buildCustomerEmail, buildNotifyEmail } = await import("@/lib/emails");

  // 1. Kjøpsbekreftelse til kunden
  if (data.customerEmail) {
    await resend.emails.send({
      from,
      to:      data.customerEmail,
      subject: "Takk for bestillingen din! 📦 TrueCollarClub",
      html:    buildCustomerEmail(data),
    });
  }

  // 2. Varsel om ny ordre til deg
  await resend.emails.send({
    from,
    to:      notifyTo,
    subject: `Ny ordre: ${data.customerName} — ${(data.totalAmount / 100).toLocaleString("nb-NO")} kr`,
    html:    buildNotifyEmail(data),
  });

  console.log(`Order emails sent for ${data.orderId}`);
}

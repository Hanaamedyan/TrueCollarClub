import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name:    z.string().min(2),
  email:   z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    // Log to console (in production, integrate with email service like Resend/SendGrid)
    console.log("Contact form submission:", data);

    // TODO: integrate with email provider
    // Example with Resend: await resend.emails.send({ from, to, subject, html })

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}

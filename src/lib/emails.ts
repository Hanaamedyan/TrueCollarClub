type OrderItem = {
  name: string;
  quantity: number;
  price: number; // i øre (fra Stripe)
};

type OrderEmailData = {
  customerName: string;
  customerEmail: string;
  orderId: string;
  items: OrderItem[];
  totalAmount: number; // i øre
  shippingAddress?: {
    line1?: string | null;
    city?: string | null;
    postal_code?: string | null;
    country?: string | null;
  } | null;
};

function formatAmount(amountInOere: number) {
  return (amountInOere / 100).toLocaleString("nb-NO") + " kr";
}

export function buildCustomerEmail(data: OrderEmailData): string {
  const itemRows = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #EEF2FF;font-size:14px;color:#374151;">
          ${item.name} <span style="color:#6B7280;">× ${item.quantity}</span>
        </td>
        <td style="padding:12px 0;border-bottom:1px solid #EEF2FF;font-size:14px;color:#0F1F4B;font-weight:600;text-align:right;">
          ${formatAmount(item.price * item.quantity)}
        </td>
      </tr>`
    )
    .join("");

  const address = data.shippingAddress
    ? `${data.shippingAddress.line1 ?? ""}, ${data.shippingAddress.postal_code ?? ""} ${data.shippingAddress.city ?? ""}, ${data.shippingAddress.country ?? ""}`
    : "Ikke oppgitt";

  return `<!DOCTYPE html>
<html lang="nb">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F8F7F4;font-family:'Inter',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F7F4;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:560px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(15,31,75,0.10);">

        <!-- Header -->
        <tr>
          <td style="background:#0F1F4B;padding:32px 40px;text-align:center;">
            <p style="margin:0;color:#ffffff;font-size:28px;font-weight:900;letter-spacing:4px;font-family:Georgia,serif;">TCC</p>
            <p style="margin:6px 0 0;color:rgba(255,255,255,0.6);font-size:11px;letter-spacing:3px;text-transform:uppercase;">TrueCollarClub</p>
          </td>
        </tr>

        <!-- Checkmark -->
        <tr>
          <td style="padding:36px 40px 0;text-align:center;">
            <div style="width:64px;height:64px;background:#F0FDF4;border-radius:50%;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;">
              <span style="font-size:32px;">✅</span>
            </div>
            <h1 style="margin:0;font-size:22px;font-weight:900;color:#0F1F4B;">Takk for bestillingen!</h1>
            <p style="margin:8px 0 0;font-size:15px;color:#6B7280;">
              Hei ${data.customerName}, vi har mottatt bestillingen din.
            </p>
          </td>
        </tr>

        <!-- Order ID -->
        <tr>
          <td style="padding:24px 40px 0;">
            <div style="background:#F8F7F4;border-radius:12px;padding:14px 18px;">
              <p style="margin:0;font-size:11px;color:#9CA3AF;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Ordrenummer</p>
              <p style="margin:4px 0 0;font-size:13px;color:#0F1F4B;font-family:monospace;word-break:break-all;">${data.orderId}</p>
            </div>
          </td>
        </tr>

        <!-- Items -->
        <tr>
          <td style="padding:24px 40px 0;">
            <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#0F1F4B;text-transform:uppercase;letter-spacing:1px;">Din bestilling</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              ${itemRows}
              <tr>
                <td style="padding:16px 0 0;font-size:15px;font-weight:700;color:#0F1F4B;">Totalt</td>
                <td style="padding:16px 0 0;font-size:18px;font-weight:900;color:#0F1F4B;text-align:right;">${formatAmount(data.totalAmount)}</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Shipping -->
        <tr>
          <td style="padding:24px 40px 0;">
            <div style="background:#F8F7F4;border-radius:12px;padding:14px 18px;">
              <p style="margin:0;font-size:11px;color:#9CA3AF;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Leveringsadresse</p>
              <p style="margin:4px 0 0;font-size:14px;color:#0F1F4B;">${address}</p>
            </div>
          </td>
        </tr>

        <!-- Next steps -->
        <tr>
          <td style="padding:24px 40px 0;">
            <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#0F1F4B;text-transform:uppercase;letter-spacing:1px;">Hva skjer nå?</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              ${["📦 Vi pakker bestillingen din", "🚚 Sendt innen 1–3 virkedager", "📬 Levert til deg"]
                .map((step, i) => `
                <tr>
                  <td style="padding:8px 0;font-size:14px;color:#374151;">
                    <span style="display:inline-block;width:22px;height:22px;background:#0F1F4B;border-radius:50%;color:#fff;font-size:11px;font-weight:900;text-align:center;line-height:22px;margin-right:10px;">${i + 1}</span>
                    ${step}
                  </td>
                </tr>`).join("")}
            </table>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style="padding:32px 40px;text-align:center;">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/butikk"
               style="display:inline-block;padding:14px 32px;background:#F59E0B;color:#0F1F4B;font-weight:700;font-size:15px;border-radius:12px;text-decoration:none;">
              Fortsett å handle →
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#F8F7F4;padding:24px 40px;text-align:center;border-top:1px solid #EEF2FF;">
            <p style="margin:0;font-size:12px;color:#9CA3AF;">
              Spørsmål? Svar på denne e-posten eller kontakt oss på
              <a href="mailto:hei@truecollarclub.no" style="color:#0F1F4B;">hei@truecollarclub.no</a>
            </p>
            <p style="margin:8px 0 0;font-size:11px;color:#D1D5DB;">© 2025 TrueCollarClub. Bergen, Norge.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function buildNotifyEmail(data: OrderEmailData): string {
  const itemList = data.items
    .map((i) => `• ${i.name} × ${i.quantity} — ${formatAmount(i.price * i.quantity)}`)
    .join("\n");

  return `
    <h2 style="color:#0F1F4B;">Ny ordre mottatt! 🎉</h2>
    <p><strong>Kunde:</strong> ${data.customerName} (${data.customerEmail})</p>
    <p><strong>Ordre-ID:</strong> <code>${data.orderId}</code></p>
    <p><strong>Totalt:</strong> ${formatAmount(data.totalAmount)}</p>
    <p><strong>Produkter:</strong></p>
    <pre style="background:#F8F7F4;padding:12px;border-radius:8px;">${itemList}</pre>
    <p><strong>Leveringsadresse:</strong><br/>
      ${data.shippingAddress?.line1 ?? ""}<br/>
      ${data.shippingAddress?.postal_code ?? ""} ${data.shippingAddress?.city ?? ""}<br/>
      ${data.shippingAddress?.country ?? ""}
    </p>
  `;
}

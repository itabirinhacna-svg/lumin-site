import { markPurchasePaid } from "@/lib/db";
import { verifyWebhookSignature } from "@/lib/payments";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-atlas-signature");

  if (!verifyWebhookSignature(rawBody, signature)) {
    return Response.json({ ok: false, error: "invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(rawBody) as {
    purchaseId?: string;
    status?: string;
    gatewayReference?: string;
  };

  if (!payload.purchaseId || payload.status !== "paid") {
    return Response.json({ ok: false, error: "invalid payload" }, { status: 400 });
  }

  const purchase = await markPurchasePaid(payload.purchaseId, payload.gatewayReference);

  if (!purchase) {
    return Response.json({ ok: false, error: "purchase not found" }, { status: 404 });
  }

  return Response.json({ ok: true, purchaseId: purchase.id, status: purchase.status });
}

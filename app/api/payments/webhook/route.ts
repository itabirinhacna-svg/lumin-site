import { env } from "@/lib/env";
import { updatePurchaseStatus, type PurchaseStatus } from "@/lib/db";
import { getMercadoPagoPaymentById } from "@/lib/mercado-pago";
import { verifyWebhookSignature } from "@/lib/payments";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-BenThec-signature");

  const allowMercadoPagoDirect = env.paymentProvider === "mercado-pago" && Boolean(env.mercadoPagoAccessToken);

  if (!allowMercadoPagoDirect && !verifyWebhookSignature(rawBody, signature)) {
    return Response.json({ ok: false, error: "invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(rawBody) as {
    purchaseId?: string;
    status?: string;
    gatewayReference?: string;
    type?: string;
    action?: string;
    data?: {
      id?: string | number;
    };
  };

  if ((!payload.purchaseId || !payload.status) && allowMercadoPagoDirect && payload.data?.id) {
    const payment = await getMercadoPagoPaymentById(String(payload.data.id));

    if (!payment?.external_reference || !payment.status) {
      return Response.json({ ok: false, error: "payment not found" }, { status: 404 });
    }

    payload.purchaseId = payment.external_reference;
    payload.status = payment.status;
    payload.gatewayReference = String(payment.id);
  }

  if (!payload.purchaseId || !payload.status) {
    return Response.json({ ok: false, error: "invalid payload" }, { status: 400 });
  }

  const statusMap: Record<string, PurchaseStatus> = {
    paid: "paid",
    approved: "approved",
    pending: "pending",
    cancelled: "cancelled",
    canceled: "cancelled",
    expired: "expired",
    refunded: "refunded",
    failed: "failed",
  };

  const mappedStatus = statusMap[payload.status.toLowerCase()];

  if (!mappedStatus) {
    return Response.json({ ok: false, error: "unsupported status" }, { status: 400 });
  }

  const purchase = await updatePurchaseStatus(payload.purchaseId, mappedStatus, payload.gatewayReference);

  if (!purchase) {
    return Response.json({ ok: false, error: "purchase not found" }, { status: 404 });
  }

  return Response.json({ ok: true, purchaseId: purchase.id, status: purchase.status });
}

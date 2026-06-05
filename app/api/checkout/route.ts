import { NextResponse } from "next/server";
import { createEnrollment } from "@/lib/db";
import { getPlanById } from "@/lib/data";
import { env } from "@/lib/env";
import { isMockProvider } from "@/lib/payments";
import { consumeRateLimit, getClientKey, isSameOriginRequest } from "@/lib/request-security";
import { applySessionCookie } from "@/lib/session";
import { normalizeDocument, normalizeEmail, sanitizeText, validateCheckoutPayload } from "@/lib/validators";

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  const rateLimit = consumeRateLimit(`checkout:${getClientKey(request)}`, 6, 15 * 60 * 1000);

  if (!rateLimit.ok) {
    return NextResponse.json(
      { ok: false, error: "too_many_requests", retryAfter: rateLimit.retryAfterSeconds },
      { status: 429 }
    );
  }

  const formData = await request.formData();
  const planId = String(formData.get("planId") ?? "");
  const name = sanitizeText(String(formData.get("name") ?? ""));
  const email = normalizeEmail(String(formData.get("email") ?? ""));
  const document = normalizeDocument(String(formData.get("document") ?? ""));
  const password = String(formData.get("password") ?? "");
  const paymentMethod = String(formData.get("paymentMethod") ?? "");
  const coupon = sanitizeText(String(formData.get("coupon") ?? ""));
  const acceptTerms = String(formData.get("acceptTerms") ?? "") === "on";

  const plan = getPlanById(planId);
  const errors = validateCheckoutPayload({
    planId,
    name,
    email,
    document,
    password,
    paymentMethod,
    coupon,
    acceptTerms
  });

  if (!plan || errors.length > 0) {
    return NextResponse.redirect(new URL("/checkout", request.url), 303);
  }

  try {
    const { user } = await createEnrollment({
      name,
      email,
      document,
      password,
      planId: plan.id,
      planName: plan.name,
      paymentMethod,
      coupon,
      provider: env.paymentProvider,
      autoApprove: isMockProvider()
    });

    const destination = isMockProvider() ? "/checkout/sucesso" : "/checkout/pendente";
    const response = NextResponse.redirect(new URL(destination, request.url), 303);
    applySessionCookie(response, user.id, user.role);
    return response;
  } catch {
    return NextResponse.redirect(new URL("/login", request.url), 303);
  }
}


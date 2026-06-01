import { NextResponse } from "next/server";
import { createEnrollment } from "@/lib/db";
import { getPlanById } from "@/lib/data";
import { env } from "@/lib/env";
import { isMockProvider } from "@/lib/payments";
import { isSameOriginRequest } from "@/lib/request-security";
import { applySessionCookie } from "@/lib/session";

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  const formData = await request.formData();
  const planId = String(formData.get("planId") ?? "");
  const name = String(formData.get("name") ?? "");
  const email = String(formData.get("email") ?? "");
  const document = String(formData.get("document") ?? "");
  const password = String(formData.get("password") ?? "");
  const paymentMethod = String(formData.get("paymentMethod") ?? "");
  const coupon = String(formData.get("coupon") ?? "");

  const plan = getPlanById(planId);

  if (!plan || !name || !email || !document || password.length < 8 || !paymentMethod) {
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


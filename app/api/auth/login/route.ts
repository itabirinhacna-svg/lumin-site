import { NextResponse } from "next/server";
import { authenticateUser } from "@/lib/db";
import { consumeRateLimit, getClientKey, isSameOriginRequest } from "@/lib/request-security";
import { applySessionCookie } from "@/lib/session";
import { normalizeEmail, validateLoginPayload } from "@/lib/validators";

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  const rateLimit = consumeRateLimit(`login:${getClientKey(request)}`, 8, 10 * 60 * 1000);

  if (!rateLimit.ok) {
    return NextResponse.json(
      { ok: false, error: "too_many_requests", retryAfter: rateLimit.retryAfterSeconds },
      { status: 429 }
    );
  }

  const formData = await request.formData();
  const email = normalizeEmail(String(formData.get("email") ?? ""));
  const password = String(formData.get("password") ?? "");

  if (validateLoginPayload(email, password).length > 0) {
    return NextResponse.redirect(new URL("/login", request.url), 303);
  }

  const user = await authenticateUser(email, password);

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url), 303);
  }

  const destination = user.role === "admin" ? "/admin" : "/aluno";
  const response = NextResponse.redirect(new URL(destination, request.url), 303);
  applySessionCookie(response, user.id, user.role);
  return response;
}

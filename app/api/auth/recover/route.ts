import { NextResponse } from "next/server";
import { isSameOriginRequest } from "@/lib/request-security";
import { sendPasswordRecovery } from "@/lib/supabase";
import { normalizeEmail } from "@/lib/validators";

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  const formData = await request.formData();
  const email = normalizeEmail(String(formData.get("email") ?? ""));

  if (!email) {
    return NextResponse.redirect(new URL("/login", request.url), 303);
  }

  try {
    await sendPasswordRecovery(email);
  } catch {
    // Mantemos o retorno silencioso para nao expor estado de conta.
  }

  return NextResponse.redirect(new URL("/login?recover=sent", request.url), 303);
}

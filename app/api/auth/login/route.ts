import { NextResponse } from "next/server";
import { authenticateUser } from "@/lib/db";
import { isSameOriginRequest } from "@/lib/request-security";
import { applySessionCookie } from "@/lib/session";

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  const formData = await request.formData();
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
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

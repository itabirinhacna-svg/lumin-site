import { NextResponse } from "next/server";
import { isSameOriginRequest } from "@/lib/request-security";
import { clearSessionCookie } from "@/lib/session";

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  const response = NextResponse.redirect(new URL("/login", request.url), 303);
  clearSessionCookie(response);
  return response;
}

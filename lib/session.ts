import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { env, isProduction } from "@/lib/env";
import type { UserRole } from "@/lib/db";

type SessionPayload = {
  sessionId: string;
  userId: string;
  role: UserRole;
  expiresAt: number;
};

export const SESSION_COOKIE_NAME = "atlas_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;

function sign(encodedPayload: string) {
  return createHmac("sha256", env.sessionSecret).update(encodedPayload).digest("base64url");
}

function encodePayload(payload: SessionPayload) {
  return Buffer.from(JSON.stringify(payload)).toString("base64url");
}

function decodePayload(encodedPayload: string) {
  return JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as SessionPayload;
}

export function createSessionToken(userId: string, role: UserRole) {
  const payload: SessionPayload = {
    sessionId: randomUUID(),
    userId,
    role,
    expiresAt: Date.now() + SESSION_DURATION_SECONDS * 1000
  };
  const encodedPayload = encodePayload(payload);
  const signature = sign(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export function verifySessionToken(token: string | undefined) {
  if (!token) {
    return null;
  }

  const [encodedPayload, providedSignature] = token.split(".");

  if (!encodedPayload || !providedSignature) {
    return null;
  }

  const expectedSignature = sign(encodedPayload);
  const providedBuffer = Buffer.from(providedSignature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (providedBuffer.length !== expectedBuffer.length) {
    return null;
  }

  if (!timingSafeEqual(providedBuffer, expectedBuffer)) {
    return null;
  }

  const payload = decodePayload(encodedPayload);

  if (payload.expiresAt <= Date.now()) {
    return null;
  }

  return payload;
}

export async function getSession() {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(SESSION_COOKIE_NAME)?.value);
}

export function applySessionCookie(response: NextResponse, userId: string, role: UserRole) {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: createSessionToken(userId, role),
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction(),
    path: "/",
    maxAge: SESSION_DURATION_SECONDS
  });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction(),
    path: "/",
    maxAge: 0
  });
}

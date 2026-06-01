import { createHmac, timingSafeEqual } from "node:crypto";
import { env } from "@/lib/env";

export function isMockProvider() {
  return env.paymentProvider === "mock";
}

export function verifyWebhookSignature(rawBody: string, signature: string | null) {
  if (!signature) {
    return false;
  }

  const expected = createHmac("sha256", env.paymentWebhookSecret).update(rawBody).digest("hex");
  const expectedBuffer = Buffer.from(expected, "utf8");
  const receivedBuffer = Buffer.from(signature, "utf8");

  if (expectedBuffer.length !== receivedBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, receivedBuffer);
}

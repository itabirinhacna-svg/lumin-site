import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const KEY_LENGTH = 64;

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derived = scryptSync(password, salt, KEY_LENGTH).toString("hex");
  return `${salt}:${derived}`;
}

export function verifyPassword(password: string, storedHash: string) {
  const [salt, expectedHash] = storedHash.split(":");

  if (!salt || !expectedHash) {
    return false;
  }

  const actualHash = scryptSync(password, salt, KEY_LENGTH).toString("hex");
  const expectedBuffer = Buffer.from(expectedHash, "hex");
  const actualBuffer = Buffer.from(actualHash, "hex");

  if (expectedBuffer.length !== actualBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, actualBuffer);
}

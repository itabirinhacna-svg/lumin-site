import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { env } from "@/lib/env";
import { hashPassword, verifyPassword } from "@/lib/password";

export type UserRole = "student" | "admin";
export type PurchaseStatus = "pending" | "paid" | "failed";

export type UserRecord = {
  id: string;
  name: string;
  email: string;
  document: string;
  passwordHash: string;
  role: UserRole;
  createdAt: string;
  lastLoginAt?: string;
};

export type PurchaseRecord = {
  id: string;
  userId: string;
  planId: string;
  planName: string;
  paymentMethod: string;
  coupon?: string;
  status: PurchaseStatus;
  provider: string;
  createdAt: string;
  paidAt?: string;
  gatewayReference?: string;
};

type DatabaseShape = {
  users: UserRecord[];
  purchases: PurchaseRecord[];
};

const dbPath = path.join(process.cwd(), "data", "app-db.json");
const DEMO_EMAIL = "demo@benthec.com";
const DEMO_PASSWORD = "123456";

async function ensureDbFile() {
  await mkdir(path.dirname(dbPath), { recursive: true });

  try {
    await readFile(dbPath, "utf8");
  } catch {
    const initialDb: DatabaseShape = { users: [], purchases: [] };
    await writeFile(dbPath, JSON.stringify(initialDb, null, 2), "utf8");
  }
}

async function readDb() {
  await ensureDbFile();
  const raw = await readFile(dbPath, "utf8");
  return JSON.parse(raw) as DatabaseShape;
}

async function writeDb(db: DatabaseShape) {
  await writeFile(dbPath, JSON.stringify(db, null, 2), "utf8");
}

export async function ensureSeedData() {
  const db = await readDb();
  const existingAdmin = db.users.find((user) => user.role === "admin");
  const demoUser = db.users.find((user) => user.email === DEMO_EMAIL);

  if (!existingAdmin) {
    db.users.push({
      id: randomUUID(),
      name: "Administrador BenThec",
      email: env.adminEmail.toLowerCase(),
      document: "00000000000",
      passwordHash: hashPassword(env.adminPassword),
      role: "admin",
      createdAt: new Date().toISOString()
    });
  }

  if (!demoUser) {
    const userId = randomUUID();

    db.users.push({
      id: userId,
      name: "Aluno Demo BenThec",
      email: DEMO_EMAIL,
      document: "11111111111",
      passwordHash: hashPassword(DEMO_PASSWORD),
      role: "student",
      createdAt: new Date().toISOString()
    });

    db.purchases.push({
      id: randomUUID(),
      userId,
      planId: "agua-doce-completo",
      planName: "Aprova Agua Doce Completo - Demo",
      paymentMethod: "mock",
      status: "paid",
      provider: "mock",
      createdAt: new Date().toISOString(),
      paidAt: new Date().toISOString()
    });
  } else {
    const demoPurchase = db.purchases.find((purchase) => purchase.userId === demoUser.id && purchase.status === "paid");

    if (demoPurchase) {
      demoPurchase.planId = "agua-doce-completo";
      demoPurchase.planName = "Aprova Agua Doce Completo - Demo";
    }
  }

  await writeDb(db);
}

export async function getUserById(userId: string) {
  const db = await readDb();
  return db.users.find((user) => user.id === userId) ?? null;
}

export async function getUserByEmail(email: string) {
  const db = await readDb();
  return db.users.find((user) => user.email === email.trim().toLowerCase()) ?? null;
}

export async function authenticateUser(email: string, password: string) {
  await ensureSeedData();
  const db = await readDb();
  const user = db.users.find((entry) => entry.email === email.trim().toLowerCase());

  if (!user || !verifyPassword(password, user.passwordHash)) {
    return null;
  }

  user.lastLoginAt = new Date().toISOString();
  await writeDb(db);
  return user;
}

type EnrollmentInput = {
  name: string;
  email: string;
  document: string;
  password: string;
  planId: string;
  planName: string;
  paymentMethod: string;
  coupon?: string;
  provider: string;
  autoApprove: boolean;
};

export async function createEnrollment(input: EnrollmentInput) {
  await ensureSeedData();
  const db = await readDb();
  const email = input.email.trim().toLowerCase();
  let user = db.users.find((entry) => entry.email === email) ?? null;

  if (user) {
    const matches = verifyPassword(input.password, user.passwordHash);

    if (!matches) {
      throw new Error("ACCOUNT_EXISTS_WITH_DIFFERENT_PASSWORD");
    }
  } else {
    user = {
      id: randomUUID(),
      name: input.name.trim(),
      email,
      document: input.document.replace(/\D/g, ""),
      passwordHash: hashPassword(input.password),
      role: "student",
      createdAt: new Date().toISOString()
    };
    db.users.push(user);
  }

  const purchase: PurchaseRecord = {
    id: randomUUID(),
    userId: user.id,
    planId: input.planId,
    planName: input.planName,
    paymentMethod: input.paymentMethod,
    coupon: input.coupon?.trim() || undefined,
    status: input.autoApprove ? "paid" : "pending",
    provider: input.provider,
    createdAt: new Date().toISOString(),
    paidAt: input.autoApprove ? new Date().toISOString() : undefined
  };

  db.purchases.push(purchase);
  await writeDb(db);

  return { user, purchase };
}

export async function getPurchasesForUser(userId: string) {
  const db = await readDb();
  return db.purchases.filter((purchase) => purchase.userId === userId);
}

export async function getActivePurchaseForUser(userId: string) {
  const purchases = await getPurchasesForUser(userId);
  return purchases.find((purchase) => purchase.status === "paid") ?? null;
}

export async function markPurchasePaid(purchaseId: string, gatewayReference?: string) {
  const db = await readDb();
  const purchase = db.purchases.find((entry) => entry.id === purchaseId);

  if (!purchase) {
    return null;
  }

  purchase.status = "paid";
  purchase.gatewayReference = gatewayReference;
  purchase.paidAt = new Date().toISOString();
  await writeDb(db);

  return purchase;
}

export async function getAdminSnapshot() {
  await ensureSeedData();
  const db = await readDb();

  return {
    totalUsers: db.users.length,
    totalStudents: db.users.filter((user) => user.role === "student").length,
    totalPurchases: db.purchases.length,
    paidPurchases: db.purchases.filter((purchase) => purchase.status === "paid").length,
    pendingPurchases: db.purchases.filter((purchase) => purchase.status === "pending").length,
    purchases: db.purchases.slice().reverse().slice(0, 8)
  };
}

export async function getHealthSnapshot() {
  await ensureSeedData();
  const db = await readDb();

  return {
    ok: true,
    checkedAt: new Date().toISOString(),
    users: db.users.length,
    purchases: db.purchases.length,
    provider: env.paymentProvider
  };
}


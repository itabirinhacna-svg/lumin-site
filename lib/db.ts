import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { getPlanById } from "@/lib/data";
import { env } from "@/lib/env";
import { hashPassword, verifyPassword } from "@/lib/password";
import {
  createEssayRecord,
  createQuestionAttemptRecord,
  createPurchaseRecord,
  createSimulationAttemptRecord,
  getProfileByEmail,
  getProfileById,
  getStudentProgressRecord,
  isSupabaseEnabled,
  listEssaysForAdminRemote,
  listEssaysForUserRemote,
  listProfilesByRole,
  listPurchasesForUser,
  listRecentPurchases,
  signInWithPassword,
  signUpWithPassword,
  upsertStudentProgressRecord,
  updateEssayRecord,
  updateProfileLastLogin,
  updatePurchaseRecordStatus,
  upsertProfile,
  type SupabaseEssay,
} from "@/lib/supabase";
import {
  applyGamificationEvent,
  createInitialGamificationRecord,
  finalizeGamificationSnapshot,
  inferCareerTrack,
  type AchievementKey,
  type GamificationEventType,
  type PersistedGamificationRecord,
} from "@/lib/gamification";
import type { ConcursoBreakdown, EnemBreakdown, RedacaoLinha, RedacaoStatus, RedacaoSubmission } from "@/lib/redacao";

export type UserRole = "student" | "admin" | "corrector";
export type PurchaseStatus = "pending" | "paid" | "failed" | "approved" | "cancelled" | "expired" | "refunded";
export type EssayContext = "ENEM" | "PMES" | "Municipais";
export type ProductAccessKey =
  | "agua-doce"
  | "pmes"
  | "redacao-enem"
  | "redacao-concursos"
  | "redacao-pmes"
  | "enem";

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
  productSlug: ProductAccessKey;
  products: ProductAccessKey[];
  paymentMethod: string;
  coupon?: string;
  status: PurchaseStatus;
  provider: string;
  amountLabel?: string;
  createdAt: string;
  paidAt?: string;
  gatewayReference?: string;
};

export type EssayRecord = {
  id: string;
  userId: string;
  title: string;
  linha: RedacaoLinha;
  contexto: EssayContext;
  instructions: string;
  body: string;
  attachmentRef?: string;
  attachmentName?: string;
  attachmentMimeType?: string;
  notes?: string;
  status: RedacaoStatus;
  scoreLabel: string;
  devolutiva: string;
  pontosFortes: string[];
  pontosMelhoria: string[];
  errosRecorrentes: string[];
  planoEvolucao: string[];
  proximaMeta: string;
  submittedAt: string;
  updatedAt: string;
  enemBreakdown?: EnemBreakdown;
  concursoBreakdown?: ConcursoBreakdown;
};

export type SupportRequestRecord = {
  id: string;
  userId: string;
  subject: string;
  message: string;
  status: "aberto" | "respondido";
  response?: string;
  createdAt: string;
  updatedAt: string;
};

export type QuestionAttemptRecord = {
  id: string;
  userId: string;
  questionId: string;
  selectedOption?: string;
  isCorrect?: boolean;
  productSlug: ProductAccessKey;
  discipline: string;
  subject: string;
  microSubject: string;
  createdAt: string;
};

export type SimulationAttemptRecord = {
  id: string;
  userId: string;
  simulationMode: string;
  productSlug: ProductAccessKey;
  scorePercent: number;
  summary: Record<string, unknown>;
  createdAt: string;
};

export type GamificationRecord = PersistedGamificationRecord & {
  userId: string;
  productSlug: ProductAccessKey;
  trackSlug: string;
};

type DatabaseShape = {
  users: UserRecord[];
  purchases: PurchaseRecord[];
  essays: EssayRecord[];
  supportRequests: SupportRequestRecord[];
  questionAttempts: QuestionAttemptRecord[];
  simulationAttempts: SimulationAttemptRecord[];
  gamification: GamificationRecord[];
};

const dbPath = path.join(process.cwd(), "data", "app-db.json");
const DEMO_EMAIL = "demo@benthec.com";
const DEMO_PASSWORD = "123456";
const DEMO_PASSWORD_ALT = "12345678";
const storageAdapter = {
  kind: isSupabaseEnabled() ? ("supabase" as const) : ("json-file" as const),
  target: isSupabaseEnabled() ? env.supabaseUrl : dbPath,
  futureTargets: ["Supabase", "Postgres"],
};

function mapPlanToProducts(planId: string): ProductAccessKey[] {
  const plan = getPlanById(planId);

  if (!plan) {
    return ["agua-doce"];
  }

  switch (plan.productSlug) {
    case "agua-doce":
      return ["agua-doce"];
    case "pmes":
      return ["pmes"];
    case "enem":
      return ["enem"];
    case "redacao-enem":
      return ["redacao-enem"];
    case "redacao-pmes":
      return ["redacao-pmes"];
    case "redacao-concursos":
      return ["redacao-concursos"];
    default:
      return ["agua-doce"];
  }
}

function mapPlanToPrimaryProduct(planId: string): ProductAccessKey {
  return mapPlanToProducts(planId)[0] ?? "agua-doce";
}

function mapSupabaseRole(role: UserRole): UserRole {
  return role === "corrector" ? "corrector" : role;
}

function mapSupabaseProfileToUser(profile: {
  id: string;
  name: string;
  email: string;
  document: string;
  role: UserRole;
  created_at: string;
  last_login_at?: string | null;
}): UserRecord {
  return {
    id: profile.id,
    name: profile.name,
    email: profile.email,
    document: profile.document,
    passwordHash: "supabase-auth",
    role: mapSupabaseRole(profile.role),
    createdAt: profile.created_at,
    lastLoginAt: profile.last_login_at ?? undefined,
  };
}

function mapSupabasePurchaseToRecord(purchase: {
  id: string;
  user_id: string;
  product_slug: string;
  plan_id: string;
  plan_name: string;
  products: string[];
  payment_method: string;
  coupon?: string | null;
  status: string;
  provider: string;
  amount_label?: string | null;
  created_at: string;
  paid_at?: string | null;
  gateway_reference?: string | null;
}): PurchaseRecord {
  return {
    id: purchase.id,
    userId: purchase.user_id,
    productSlug: (purchase.product_slug as ProductAccessKey) ?? "agua-doce",
    planId: purchase.plan_id,
    planName: purchase.plan_name,
    products: (purchase.products as ProductAccessKey[]) ?? ["agua-doce"],
    paymentMethod: purchase.payment_method,
    coupon: purchase.coupon ?? undefined,
    status: purchase.status as PurchaseStatus,
    provider: purchase.provider,
    amountLabel: purchase.amount_label ?? undefined,
    createdAt: purchase.created_at,
    paidAt: purchase.paid_at ?? undefined,
    gatewayReference: purchase.gateway_reference ?? undefined,
  };
}

function mapSupabaseEssayToRecord(essay: SupabaseEssay): EssayRecord {
  return {
    id: essay.id,
    userId: essay.user_id,
    title: essay.title,
    linha: essay.linha as RedacaoLinha,
    contexto: essay.contexto as EssayContext,
    instructions: essay.instructions,
    body: essay.body,
    attachmentRef: essay.attachment_ref ?? undefined,
    attachmentName: essay.attachment_name ?? undefined,
    attachmentMimeType: essay.attachment_mime_type ?? undefined,
    notes: essay.notes ?? undefined,
    status: essay.status as RedacaoStatus,
    scoreLabel: essay.score_label,
    devolutiva: essay.devolutiva,
    pontosFortes: essay.pontos_fortes ?? [],
    pontosMelhoria: essay.pontos_melhoria ?? [],
    errosRecorrentes: essay.erros_recorrentes ?? [],
    planoEvolucao: essay.plano_evolucao ?? [],
    proximaMeta: essay.proxima_meta,
    submittedAt: essay.submitted_at,
    updatedAt: essay.updated_at,
    enemBreakdown: (essay.enem_breakdown as EnemBreakdown | undefined) ?? undefined,
    concursoBreakdown: (essay.concurso_breakdown as ConcursoBreakdown | undefined) ?? undefined,
  };
}

async function ensureDbFile() {
  await mkdir(path.dirname(dbPath), { recursive: true });

  try {
    await readFile(dbPath, "utf8");
  } catch {
    const initialDb: DatabaseShape = {
      users: [],
      purchases: [],
      essays: [],
      supportRequests: [],
      questionAttempts: [],
      simulationAttempts: [],
      gamification: [],
    };
    await writeFile(dbPath, JSON.stringify(initialDb, null, 2), "utf8");
  }
}

async function readDb() {
  await ensureDbFile();
  const raw = await readFile(dbPath, "utf8");
  const parsed = JSON.parse(raw) as Partial<DatabaseShape>;

  return {
    users: parsed.users ?? [],
    purchases: parsed.purchases ?? [],
    essays: parsed.essays ?? [],
    supportRequests: parsed.supportRequests ?? [],
    questionAttempts: parsed.questionAttempts ?? [],
    simulationAttempts: parsed.simulationAttempts ?? [],
    gamification: parsed.gamification ?? [],
  } satisfies DatabaseShape;
}

async function writeDb(db: DatabaseShape) {
  await writeFile(dbPath, JSON.stringify(db, null, 2), "utf8");
}

async function ensureSeedDataLocal() {
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
      createdAt: new Date().toISOString(),
    });
  }

  if (!db.users.find((user) => user.role === "corrector")) {
    db.users.push({
      id: randomUUID(),
      name: "Corretor BenThec",
      email: "corretor@benthec.local",
      document: "22222222222",
      passwordHash: hashPassword("Corretor123!"),
      role: "corrector",
      createdAt: new Date().toISOString(),
    });
  }

  if (!demoUser) {
    const userId = randomUUID();

    db.users.push({
      id: userId,
      name: "Aluno Demo BenThec",
      email: DEMO_EMAIL,
      document: "11111111111",
      passwordHash: hashPassword(DEMO_PASSWORD_ALT),
      role: "student",
      createdAt: new Date().toISOString(),
    });

    db.purchases.push({
      id: randomUUID(),
      userId,
      productSlug: "agua-doce",
      planId: "agua-doce-fundamental-portal",
      planName: "Aprova Agua Doce Fundamental Portal - Demo",
      products: ["agua-doce"],
      paymentMethod: "mock",
      status: "paid",
      provider: "mock",
      createdAt: new Date().toISOString(),
      paidAt: new Date().toISOString(),
      amountLabel: "R$ 59,90",
    });
  } else {
    demoUser.passwordHash = hashPassword(DEMO_PASSWORD_ALT);
  }

  await writeDb(db);
}

export async function ensureSeedData() {
  if (isSupabaseEnabled()) {
    return;
  }
  await ensureSeedDataLocal();
}

async function authenticateUserLocal(email: string, password: string) {
  await ensureSeedDataLocal();
  const db = await readDb();
  const user = db.users.find((entry) => entry.email === email.trim().toLowerCase());
  const isDemoLogin =
    email.trim().toLowerCase() === DEMO_EMAIL && (password === DEMO_PASSWORD || password === DEMO_PASSWORD_ALT);

  if (!user || (!verifyPassword(password, user.passwordHash) && !isDemoLogin)) {
    return null;
  }

  user.lastLoginAt = new Date().toISOString();
  await writeDb(db);
  return user;
}

async function getUserByIdLocal(userId: string) {
  const db = await readDb();
  return db.users.find((user) => user.id === userId) ?? null;
}

async function getUserByEmailLocal(email: string) {
  const db = await readDb();
  return db.users.find((user) => user.email === email.trim().toLowerCase()) ?? null;
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

async function createEnrollmentLocal(input: EnrollmentInput) {
  await ensureSeedDataLocal();
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
      createdAt: new Date().toISOString(),
    };
    db.users.push(user);
  }

  const plan = getPlanById(input.planId);
  const purchase: PurchaseRecord = {
    id: randomUUID(),
    userId: user.id,
    productSlug: mapPlanToPrimaryProduct(input.planId),
    planId: input.planId,
    planName: input.planName,
    products: mapPlanToProducts(input.planId),
    paymentMethod: input.paymentMethod,
    coupon: input.coupon?.trim() || undefined,
    status: input.autoApprove ? "paid" : "pending",
    provider: input.provider,
    createdAt: new Date().toISOString(),
    paidAt: input.autoApprove ? new Date().toISOString() : undefined,
    amountLabel: plan?.price,
  };

  db.purchases.push(purchase);
  await writeDb(db);

  return { user, purchase };
}

async function getPurchasesForUserLocal(userId: string) {
  const db = await readDb();
  return db.purchases.filter((purchase) => purchase.userId === userId);
}

async function getActivePurchaseForUserLocal(userId: string) {
  const purchases = await getPurchasesForUserLocal(userId);
  return purchases.find((purchase) => purchase.status === "paid" || purchase.status === "approved") ?? null;
}

async function markPurchasePaidLocal(purchaseId: string, gatewayReference?: string) {
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

async function updatePurchaseStatusLocal(purchaseId: string, status: PurchaseStatus, gatewayReference?: string) {
  const db = await readDb();
  const purchase = db.purchases.find((entry) => entry.id === purchaseId);

  if (!purchase) {
    return null;
  }

  purchase.status = status;
  purchase.gatewayReference = gatewayReference ?? purchase.gatewayReference;
  if (status === "paid" || status === "approved") {
    purchase.paidAt = new Date().toISOString();
  }
  await writeDb(db);
  return purchase;
}

async function createEssaySubmissionLocal(input: EssayInput) {
  await ensureSeedDataLocal();
  const db = await readDb();
  const now = new Date().toISOString();

  const essay: EssayRecord = {
    id: randomUUID(),
    userId: input.userId,
    title: input.title.trim(),
    linha: input.linha,
    contexto: input.contexto,
    instructions: input.instructions.trim(),
    body: input.body?.trim() ?? "",
    attachmentRef: input.attachmentRef?.trim() || undefined,
    attachmentName: input.attachmentName?.trim() || undefined,
    attachmentMimeType: input.attachmentMimeType?.trim() || undefined,
    notes: input.notes?.trim() || undefined,
    status: "recebida",
    scoreLabel: "Aguardando correcao",
    devolutiva: "Texto recebido com sucesso. Assim que a leitura comecar, voce vai enxergar aqui os pontos fortes, os ajustes e a meta da proxima escrita.",
    pontosFortes: ["Envio realizado com sucesso"],
    pontosMelhoria: ["Aguardando leitura da equipe"],
    errosRecorrentes: ["Ainda nao avaliado"],
    planoEvolucao: [
      "Releia o comando e destaque as palavras centrais.",
      "Guarde uma ideia principal para cada paragrafo antes da reescrita.",
    ],
    proximaMeta:
      input.linha === "ENEM"
        ? "Enquanto a correcao nao chega, separe um repertorio simples para reforcar sua proxima versao."
        : "Enquanto a correcao nao chega, releia o comando e verifique se a resposta ficou direta.",
    submittedAt: now,
    updatedAt: now,
    enemBreakdown:
      input.linha === "ENEM"
        ? {
            c1: 0,
            c2: 0,
            c3: 0,
            c4: 0,
            c5: 0,
          }
        : undefined,
    concursoBreakdown:
      input.linha === "Concursos"
        ? {
            tema: 0,
            argumentacao: 0,
            estrutura: 0,
            gramatica: 0,
            coesao: 0,
            clareza: 0,
            objetividade: 0,
          }
        : undefined,
  };

  db.essays.push(essay);
  await writeDb(db);
  return essay;
}

async function listEssaysForUserLocal(userId: string) {
  await ensureSeedDataLocal();
  const db = await readDb();
  return db.essays
    .filter((essay) => essay.userId === userId)
    .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
}

async function listEssaysForAdminLocal() {
  await ensureSeedDataLocal();
  const db = await readDb();
  return db.essays
    .slice()
    .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))
    .map((essay) => ({
      ...essay,
      user: db.users.find((user) => user.id === essay.userId) ?? null,
    }));
}

type EssayInput = {
  userId: string;
  title: string;
  linha: RedacaoLinha;
  contexto: EssayContext;
  instructions: string;
  body?: string;
  attachmentRef?: string;
  attachmentName?: string;
  attachmentMimeType?: string;
  notes?: string;
};

type EssayCorrectionInput = {
  essayId: string;
  status: RedacaoStatus;
  scoreLabel: string;
  devolutiva: string;
  pontosFortes: string[];
  pontosMelhoria: string[];
  errosRecorrentes: string[];
  planoEvolucao: string[];
  proximaMeta: string;
  enemBreakdown?: EnemBreakdown;
  concursoBreakdown?: ConcursoBreakdown;
};

async function updateEssayCorrectionLocal(input: EssayCorrectionInput) {
  await ensureSeedDataLocal();
  const db = await readDb();
  const essay = db.essays.find((entry) => entry.id === input.essayId);

  if (!essay) {
    return null;
  }

  essay.status = input.status;
  essay.scoreLabel = input.scoreLabel;
  essay.devolutiva = input.devolutiva;
  essay.pontosFortes = input.pontosFortes;
  essay.pontosMelhoria = input.pontosMelhoria;
  essay.errosRecorrentes = input.errosRecorrentes;
  essay.planoEvolucao = input.planoEvolucao;
  essay.proximaMeta = input.proximaMeta;
  essay.enemBreakdown = input.enemBreakdown;
  essay.concursoBreakdown = input.concursoBreakdown;
  essay.updatedAt = new Date().toISOString();

  await writeDb(db);
  return essay;
}

export async function getUserById(userId: string) {
  if (isSupabaseEnabled()) {
    const profile = await getProfileById(userId);
    return profile ? mapSupabaseProfileToUser(profile) : null;
  }
  return getUserByIdLocal(userId);
}

export async function getUserByEmail(email: string) {
  if (isSupabaseEnabled()) {
    const profile = await getProfileByEmail(email.trim().toLowerCase());
    return profile ? mapSupabaseProfileToUser(profile) : null;
  }
  return getUserByEmailLocal(email);
}

export async function authenticateUser(email: string, password: string) {
  if (!isSupabaseEnabled()) {
    return authenticateUserLocal(email, password);
  }

  const authUser = await signInWithPassword(email.trim().toLowerCase(), password);
  if (!authUser?.id) {
    return null;
  }

  const profile = await getProfileById(authUser.id);
  if (!profile) {
    return null;
  }

  await updateProfileLastLogin(profile.id);
  return mapSupabaseProfileToUser(profile);
}

export async function createEnrollment(input: EnrollmentInput) {
  if (!isSupabaseEnabled()) {
    return createEnrollmentLocal(input);
  }

  const email = input.email.trim().toLowerCase();
  const document = input.document.replace(/\D/g, "");
  const existingProfile = await getProfileByEmail(email);
  let userId = existingProfile?.id ?? null;

  if (existingProfile) {
    const authUser = await signInWithPassword(email, input.password);
    if (!authUser?.id) {
      throw new Error("ACCOUNT_EXISTS_WITH_DIFFERENT_PASSWORD");
    }
    userId = authUser.id;
  } else {
    const authUser = await signUpWithPassword(email, input.password, {
      name: input.name.trim(),
      document,
      role: "student",
    });

    if (!authUser?.id) {
      throw new Error("SUPABASE_SIGNUP_FAILED");
    }
    userId = authUser.id;
  }

  const profile = await upsertProfile({
    id: userId,
    name: input.name.trim(),
    email,
    document,
    role: "student",
    last_login_at: new Date().toISOString(),
  });

  if (!profile) {
    throw new Error("PROFILE_UPSERT_FAILED");
  }

  const plan = getPlanById(input.planId);
  const purchase = await createPurchaseRecord({
    user_id: profile.id,
    product_slug: mapPlanToPrimaryProduct(input.planId),
    plan_id: input.planId,
    plan_name: input.planName,
    products: mapPlanToProducts(input.planId),
    payment_method: input.paymentMethod,
    coupon: input.coupon?.trim() || undefined,
    status: input.autoApprove ? "paid" : "pending",
    provider: input.provider,
    amount_label: plan?.price,
    paid_at: input.autoApprove ? new Date().toISOString() : null,
  });

  if (!purchase) {
    throw new Error("PURCHASE_CREATE_FAILED");
  }

  return {
    user: mapSupabaseProfileToUser(profile),
    purchase: mapSupabasePurchaseToRecord(purchase),
  };
}

export async function getPurchasesForUser(userId: string) {
  if (isSupabaseEnabled()) {
    const purchases = await listPurchasesForUser(userId);
    return purchases.map(mapSupabasePurchaseToRecord);
  }
  return getPurchasesForUserLocal(userId);
}

export async function getActivePurchaseForUser(userId: string) {
  const purchases = await getPurchasesForUser(userId);
  return purchases.find((purchase) => purchase.status === "paid" || purchase.status === "approved") ?? null;
}

export async function markPurchasePaid(purchaseId: string, gatewayReference?: string) {
  if (isSupabaseEnabled()) {
    const purchase = await updatePurchaseRecordStatus(purchaseId, {
      status: "paid",
      gateway_reference: gatewayReference,
      paid_at: new Date().toISOString(),
    });
    return purchase ? mapSupabasePurchaseToRecord(purchase) : null;
  }
  return markPurchasePaidLocal(purchaseId, gatewayReference);
}

export async function updatePurchaseStatus(purchaseId: string, status: PurchaseStatus, gatewayReference?: string) {
  if (isSupabaseEnabled()) {
    const purchase = await updatePurchaseRecordStatus(purchaseId, {
      status,
      gateway_reference: gatewayReference,
      paid_at: status === "paid" || status === "approved" ? new Date().toISOString() : null,
    });
    return purchase ? mapSupabasePurchaseToRecord(purchase) : null;
  }
  return updatePurchaseStatusLocal(purchaseId, status, gatewayReference);
}

export async function getAdminSnapshot() {
  await ensureSeedData();

  if (isSupabaseEnabled()) {
    const [students, admins, correctors, purchases, essays] = await Promise.all([
      listProfilesByRole("student"),
      listProfilesByRole("admin"),
      listProfilesByRole("corrector"),
      listRecentPurchases(8),
      listEssaysForAdminRemote(),
    ]);

    return {
      totalUsers: students.length + admins.length + correctors.length,
      totalStudents: students.length,
      totalPurchases: purchases.length,
      paidPurchases: purchases.filter((purchase) => purchase.status === "paid" || purchase.status === "approved").length,
      pendingPurchases: purchases.filter((purchase) => purchase.status === "pending").length,
      essayQueue: essays.filter((essay) => essay.status !== "devolvida").length,
      purchases: purchases.map(mapSupabasePurchaseToRecord),
      essays: essays.map((essay) => ({
        ...mapSupabaseEssayToRecord(essay),
        user: essay.user ? mapSupabaseProfileToUser(essay.user) : null,
      })),
      adapter: storageAdapter,
    };
  }

  const db = await readDb();
  return {
    totalUsers: db.users.length,
    totalStudents: db.users.filter((user) => user.role === "student").length,
    totalPurchases: db.purchases.length,
    paidPurchases: db.purchases.filter((purchase) => purchase.status === "paid" || purchase.status === "approved").length,
    pendingPurchases: db.purchases.filter((purchase) => purchase.status === "pending").length,
    essayQueue: db.essays.filter((essay) => essay.status !== "devolvida").length,
    purchases: db.purchases.slice().reverse().slice(0, 8),
    essays: db.essays.slice().sort((a, b) => b.submittedAt.localeCompare(a.submittedAt)).slice(0, 12),
    adapter: storageAdapter,
  };
}

export async function getHealthSnapshot() {
  await ensureSeedData();

  if (isSupabaseEnabled()) {
    const purchases = await listRecentPurchases(5);
    return {
      ok: true,
      checkedAt: new Date().toISOString(),
      users: (await listProfilesByRole("student")).length,
      purchases: purchases.length,
      provider: env.paymentProvider,
      adapter: "supabase",
    };
  }

  const db = await readDb();
  return {
    ok: true,
    checkedAt: new Date().toISOString(),
    users: db.users.length,
    purchases: db.purchases.length,
    provider: env.paymentProvider,
    adapter: "json-file",
  };
}

function mapProgressRecordToGamification(userId: string, productSlug: ProductAccessKey, trackSlug: string, raw: string | null | undefined) {
  try {
    const parsed = raw ? (JSON.parse(raw) as PersistedGamificationRecord) : null;
    if (parsed) {
      return {
        ...createInitialGamificationRecord(parsed.career),
        ...parsed,
        userId,
        productSlug,
        trackSlug,
      } satisfies GamificationRecord;
    }
  } catch {
    // keep bootstrap fallback below
  }

  return {
    ...createInitialGamificationRecord(inferCareerTrack(productSlug)),
    userId,
    productSlug,
    trackSlug,
  } satisfies GamificationRecord;
}

async function persistGamificationRecord(record: GamificationRecord) {
  if (isSupabaseEnabled()) {
    await upsertStudentProgressRecord({
      user_id: record.userId,
      product_slug: record.productSlug,
      track_slug: record.trackSlug,
      lesson_slug: JSON.stringify({
        career: record.career,
        xpTotal: record.xpTotal,
        streakDays: record.streakDays,
        lessonsCompleted: record.lessonsCompleted,
        correctAnswers: record.correctAnswers,
        questionsResolved: record.questionsResolved,
        unitsCompleted: record.unitsCompleted,
        simulationsCompleted: record.simulationsCompleted,
        essaysSubmitted: record.essaysSubmitted,
        essaysCorrected: record.essaysCorrected,
        disciplinesCompleted: record.disciplinesCompleted,
        unlockedAchievements: record.unlockedAchievements,
        lastAchievement: record.lastAchievement,
        updatedAt: record.updatedAt,
      }),
      progress_percent: Math.min(100, Math.max(0, Math.round((record.xpTotal / 2000) * 100))),
    });
    return;
  }

  const db = await readDb();
  const index = db.gamification.findIndex(
    (entry) => entry.userId === record.userId && entry.productSlug === record.productSlug && entry.trackSlug === record.trackSlug,
  );

  if (index >= 0) {
    db.gamification[index] = record;
  } else {
    db.gamification.push(record);
  }

  await writeDb(db);
}

export async function getGamificationRecord(userId: string, productSlug: ProductAccessKey, trackSlug = "__gamification__") {
  if (isSupabaseEnabled()) {
    const progress = await getStudentProgressRecord(userId, productSlug, trackSlug);
    return mapProgressRecordToGamification(userId, productSlug, trackSlug, progress?.lesson_slug);
  }

  await ensureSeedDataLocal();
  const db = await readDb();
  const current = db.gamification.find((entry) => entry.userId === userId && entry.productSlug === productSlug && entry.trackSlug === trackSlug);

  if (current) {
    return current;
  }

  const seeded: GamificationRecord = {
    ...createInitialGamificationRecord(inferCareerTrack(productSlug)),
    userId,
    productSlug,
    trackSlug,
  };
  db.gamification.push(seeded);
  await writeDb(db);
  return seeded;
}

export async function getGamificationSnapshot(userId: string, productSlug: ProductAccessKey, trackSlug = "__gamification__") {
  const record = await getGamificationRecord(userId, productSlug, trackSlug);
  return finalizeGamificationSnapshot(record);
}

export async function recordGamificationEvent(input: {
  userId: string;
  productSlug: ProductAccessKey;
  event: GamificationEventType;
  trackSlug?: string;
}) {
  const current = await getGamificationRecord(input.userId, input.productSlug, input.trackSlug ?? "__gamification__");
  const next: GamificationRecord = {
    ...applyGamificationEvent(current, input.event),
    userId: current.userId,
    productSlug: current.productSlug,
    trackSlug: current.trackSlug,
  };
  await persistGamificationRecord(next);
  return finalizeGamificationSnapshot(next);
}

export async function unlockAchievement(input: {
  userId: string;
  productSlug: ProductAccessKey;
  achievement: AchievementKey;
  trackSlug?: string;
}) {
  const current = await getGamificationRecord(input.userId, input.productSlug, input.trackSlug ?? "__gamification__");
  const next: GamificationRecord = {
    ...current,
    unlockedAchievements: Array.from(new Set([...current.unlockedAchievements, input.achievement])),
    lastAchievement: input.achievement,
    updatedAt: new Date().toISOString(),
  };
  await persistGamificationRecord(next);
  return finalizeGamificationSnapshot(next);
}

export async function recordQuestionAttempt(input: Omit<QuestionAttemptRecord, "id" | "createdAt">) {
  const createdAt = new Date().toISOString();

  if (isSupabaseEnabled()) {
    await createQuestionAttemptRecord({
      user_id: input.userId,
      question_id: input.questionId,
      selected_option: input.selectedOption ?? null,
      is_correct: input.isCorrect ?? null,
      product_slug: input.productSlug,
      discipline: input.discipline,
      subject: input.subject,
      micro_subject: input.microSubject,
      created_at: createdAt,
    });
    return;
  }

  const db = await readDb();
  db.questionAttempts.push({
    id: randomUUID(),
    createdAt,
    ...input,
  });
  await writeDb(db);
}

export async function recordSimulationAttempt(input: Omit<SimulationAttemptRecord, "id" | "createdAt">) {
  const createdAt = new Date().toISOString();

  if (isSupabaseEnabled()) {
    await createSimulationAttemptRecord({
      user_id: input.userId,
      simulation_mode: input.simulationMode,
      product_slug: input.productSlug,
      score_percent: input.scorePercent,
      summary: input.summary,
      created_at: createdAt,
    });
    return;
  }

  const db = await readDb();
  db.simulationAttempts.push({
    id: randomUUID(),
    createdAt,
    ...input,
  });
  await writeDb(db);
}

export async function createEssaySubmission(input: EssayInput) {
  if (isSupabaseEnabled()) {
    const essay = await createEssayRecord({
      user_id: input.userId,
      title: input.title.trim(),
      linha: input.linha,
      contexto: input.contexto,
      instructions: input.instructions.trim(),
      body: input.body?.trim() ?? "",
      attachment_ref: input.attachmentRef?.trim() || null,
      attachment_name: input.attachmentName?.trim() || null,
      attachment_mime_type: input.attachmentMimeType?.trim() || null,
      notes: input.notes?.trim() || null,
      status: "recebida",
      score_label: "Aguardando correcao",
      devolutiva:
        "Texto recebido com sucesso. Assim que a leitura comecar, voce vai enxergar aqui os pontos fortes, os ajustes e a meta da proxima escrita.",
      pontos_fortes: ["Envio realizado com sucesso"],
      pontos_melhoria: ["Aguardando leitura da equipe"],
      erros_recorrentes: ["Ainda nao avaliado"],
      plano_evolucao: [
        "Releia o comando e destaque as palavras centrais.",
        "Guarde uma ideia principal para cada paragrafo antes da reescrita.",
      ],
      proxima_meta:
        input.linha === "ENEM"
          ? "Enquanto a correcao nao chega, separe um repertorio simples para reforcar sua proxima versao."
          : "Enquanto a correcao nao chega, releia o comando e verifique se a resposta ficou direta.",
      enem_breakdown:
        input.linha === "ENEM"
          ? {
              c1: 0,
              c2: 0,
              c3: 0,
              c4: 0,
              c5: 0,
            }
          : null,
      concurso_breakdown:
        input.linha === "Concursos"
          ? {
              tema: 0,
              argumentacao: 0,
              estrutura: 0,
              gramatica: 0,
              coesao: 0,
              clareza: 0,
              objetividade: 0,
            }
          : null,
    });

    if (!essay) {
      throw new Error("ESSAY_CREATE_FAILED");
    }
    await recordGamificationEvent({
      userId: input.userId,
      productSlug: input.linha === "ENEM" ? "redacao-enem" : input.contexto === "PMES" ? "redacao-pmes" : "redacao-concursos",
      event: "essay_submitted",
    });
    return mapSupabaseEssayToRecord(essay);
  }
  const submission = await createEssaySubmissionLocal(input);
  await recordGamificationEvent({
    userId: input.userId,
    productSlug: input.linha === "ENEM" ? "redacao-enem" : input.contexto === "PMES" ? "redacao-pmes" : "redacao-concursos",
    event: "essay_submitted",
  });
  return submission;
}

export async function listEssaysForUser(userId: string) {
  if (isSupabaseEnabled()) {
    const essays = await listEssaysForUserRemote(userId);
    return essays.map(mapSupabaseEssayToRecord);
  }
  return listEssaysForUserLocal(userId);
}

export async function listEssaysForAdmin() {
  if (isSupabaseEnabled()) {
    const essays = await listEssaysForAdminRemote();
    return essays.map((essay) => ({
      ...mapSupabaseEssayToRecord(essay),
      user: essay.user ? mapSupabaseProfileToUser(essay.user) : null,
    }));
  }
  return listEssaysForAdminLocal();
}

export async function updateEssayCorrection(input: EssayCorrectionInput) {
  if (isSupabaseEnabled()) {
    const essay = await updateEssayRecord({
      essayId: input.essayId,
      status: input.status,
      score_label: input.scoreLabel,
      devolutiva: input.devolutiva,
      pontos_fortes: input.pontosFortes,
      pontos_melhoria: input.pontosMelhoria,
      erros_recorrentes: input.errosRecorrentes,
      plano_evolucao: input.planoEvolucao,
      proxima_meta: input.proximaMeta,
      enem_breakdown: input.enemBreakdown ?? null,
      concurso_breakdown: input.concursoBreakdown ?? null,
    });
    if (!essay) {
      return null;
    }
    await recordGamificationEvent({
      userId: essay.user_id,
      productSlug: essay.linha === "ENEM" ? "redacao-enem" : essay.contexto === "PMES" ? "redacao-pmes" : "redacao-concursos",
      event: "essay_corrected",
    });
    return mapSupabaseEssayToRecord(essay);
  }
  const essay = await updateEssayCorrectionLocal(input);
  if (!essay) {
    return null;
  }
  await recordGamificationEvent({
    userId: essay.userId,
    productSlug: essay.linha === "ENEM" ? "redacao-enem" : essay.contexto === "PMES" ? "redacao-pmes" : "redacao-concursos",
    event: "essay_corrected",
  });
  return essay;
}

export function mapEssayRecordToSubmission(essay: EssayRecord): RedacaoSubmission {
  return {
    id: essay.id,
    title: essay.title,
    linha: essay.linha,
    contexto: essay.contexto,
    submittedAt: essay.submittedAt.slice(0, 10),
    status: essay.status,
    scoreLabel: essay.scoreLabel,
    devolutiva: essay.devolutiva,
    pontosFortes: essay.pontosFortes,
    pontosMelhoria: essay.pontosMelhoria,
    errosRecorrentes: essay.errosRecorrentes,
    planoEvolucao: essay.planoEvolucao,
    proximaMeta: essay.proximaMeta,
    attachmentRef: essay.attachmentRef,
    attachmentName: essay.attachmentName,
    notes: essay.notes,
    enemBreakdown: essay.enemBreakdown,
    concursoBreakdown: essay.concursoBreakdown,
  };
}

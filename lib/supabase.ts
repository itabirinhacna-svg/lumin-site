import { env, hasSupabaseConfig } from "@/lib/env";

type SupabaseKeyMode = "anon" | "service";

type AuthUser = {
  id: string;
  email?: string;
  user_metadata?: Record<string, unknown>;
};

type ProfileRole = "student" | "admin" | "corrector";

export type SupabaseProfile = {
  id: string;
  name: string;
  email: string;
  document: string;
  role: ProfileRole;
  created_at: string;
  last_login_at?: string | null;
};

export type SupabasePurchase = {
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
  gateway_reference?: string | null;
  created_at: string;
  paid_at?: string | null;
};

export type SupabaseEssay = {
  id: string;
  user_id: string;
  title: string;
  linha: string;
  contexto: string;
  instructions: string;
  body: string;
  attachment_ref?: string | null;
  attachment_name?: string | null;
  attachment_mime_type?: string | null;
  notes?: string | null;
  status: string;
  score_label: string;
  devolutiva: string;
  pontos_fortes: string[];
  pontos_melhoria: string[];
  erros_recorrentes: string[];
  plano_evolucao: string[];
  proxima_meta: string;
  submitted_at: string;
  updated_at: string;
  enem_breakdown?: Record<string, number> | null;
  concurso_breakdown?: Record<string, number> | null;
};

export type SupabaseStudentProgress = {
  id: string;
  user_id: string;
  product_slug: string;
  track_slug: string;
  lesson_slug?: string | null;
  progress_percent: number;
  created_at: string;
  updated_at: string;
};

export type SupabaseQuestionAttempt = {
  id: string;
  user_id: string;
  question_id: string;
  selected_option?: string | null;
  is_correct?: boolean | null;
  product_slug: string;
  discipline: string;
  subject: string;
  micro_subject: string;
  created_at: string;
};

export type SupabaseSimulationAttempt = {
  id: string;
  user_id: string;
  simulation_mode: string;
  product_slug: string;
  score_percent: number;
  summary: Record<string, unknown>;
  created_at: string;
};

type PostgrestOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  keyMode?: SupabaseKeyMode;
  query?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  headers?: HeadersInit;
  prefer?: string;
};

function getSupabaseKey(mode: SupabaseKeyMode) {
  return mode === "service" ? env.supabaseServiceRoleKey : env.supabaseAnonKey;
}

function buildUrl(path: string, query?: PostgrestOptions["query"]) {
  const url = new URL(path, env.supabaseUrl);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }
  }
  return url.toString();
}

async function supabaseFetch<T>(path: string, options: PostgrestOptions = {}) {
  if (!hasSupabaseConfig()) {
    throw new Error("SUPABASE_NOT_CONFIGURED");
  }

  const keyMode = options.keyMode ?? "service";
  const apiKey = getSupabaseKey(keyMode);
  const response = await fetch(buildUrl(path, options.query), {
    method: options.method ?? (options.body ? "POST" : "GET"),
    headers: {
      apikey: apiKey,
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...(options.prefer ? { Prefer: options.prefer } : {}),
      ...(options.headers ?? {}),
    },
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`SUPABASE_REQUEST_FAILED:${response.status}:${text}`);
  }

  if (response.status === 204) {
    return null as T;
  }

  return (await response.json()) as T;
}

export function isSupabaseEnabled() {
  return hasSupabaseConfig();
}

export async function signInWithPassword(email: string, password: string) {
  const response = await fetch(`${env.supabaseUrl}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      apikey: env.supabaseAnonKey,
      Authorization: `Bearer ${env.supabaseAnonKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as { user?: AuthUser };
  return data.user ?? null;
}

export async function signUpWithPassword(email: string, password: string, metadata: Record<string, unknown>) {
  const response = await fetch(`${env.supabaseUrl}/auth/v1/signup`, {
    method: "POST",
    headers: {
      apikey: env.supabaseAnonKey,
      Authorization: `Bearer ${env.supabaseAnonKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      data: metadata,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`SUPABASE_SIGNUP_FAILED:${response.status}:${text}`);
  }

  const data = (await response.json()) as { user?: AuthUser };
  return data.user ?? null;
}

export async function sendPasswordRecovery(email: string) {
  const response = await fetch(`${env.supabaseUrl}/auth/v1/recover`, {
    method: "POST",
    headers: {
      apikey: env.supabaseAnonKey,
      Authorization: `Bearer ${env.supabaseAnonKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      redirect_to: `${env.appUrl}/login`,
    }),
    cache: "no-store",
  });

  return response.ok;
}

export async function getProfileById(profileId: string) {
  const rows = await supabaseFetch<SupabaseProfile[]>("/rest/v1/profiles", {
    query: {
      id: `eq.${profileId}`,
      select: "*",
      limit: 1,
    },
  });

  return rows[0] ?? null;
}

export async function getProfileByEmail(email: string) {
  const rows = await supabaseFetch<SupabaseProfile[]>("/rest/v1/profiles", {
    query: {
      email: `eq.${email}`,
      select: "*",
      limit: 1,
    },
  });

  return rows[0] ?? null;
}

export async function upsertProfile(profile: Omit<SupabaseProfile, "created_at"> & { created_at?: string }) {
  const rows = await supabaseFetch<SupabaseProfile[]>("/rest/v1/profiles", {
    method: "POST",
    body: {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      document: profile.document,
      role: profile.role,
      last_login_at: profile.last_login_at ?? null,
      created_at: profile.created_at ?? new Date().toISOString(),
    },
    prefer: "resolution=merge-duplicates,return=representation",
    headers: {
      "Content-Profile": "public",
    },
  });

  return rows[0] ?? null;
}

export async function updateProfileLastLogin(profileId: string) {
  const rows = await supabaseFetch<SupabaseProfile[]>("/rest/v1/profiles", {
    method: "PATCH",
    query: {
      id: `eq.${profileId}`,
      select: "*",
    },
    body: { last_login_at: new Date().toISOString() },
    prefer: "return=representation",
  });

  return rows[0] ?? null;
}

export async function createPurchaseRecord(payload: Omit<SupabasePurchase, "id" | "created_at"> & { id?: string; created_at?: string }) {
  const rows = await supabaseFetch<SupabasePurchase[]>("/rest/v1/purchases", {
    method: "POST",
    body: {
      id: payload.id,
      user_id: payload.user_id,
      product_slug: payload.product_slug,
      plan_id: payload.plan_id,
      plan_name: payload.plan_name,
      products: payload.products,
      payment_method: payload.payment_method,
      coupon: payload.coupon ?? null,
      status: payload.status,
      provider: payload.provider,
      amount_label: payload.amount_label ?? null,
      gateway_reference: payload.gateway_reference ?? null,
      paid_at: payload.paid_at ?? null,
      created_at: payload.created_at ?? new Date().toISOString(),
    },
    prefer: "return=representation",
  });

  return rows[0] ?? null;
}

export async function listPurchasesForUser(userId: string) {
  return supabaseFetch<SupabasePurchase[]>("/rest/v1/purchases", {
    query: {
      user_id: `eq.${userId}`,
      select: "*",
      order: "created_at.desc",
    },
  });
}

export async function listRecentPurchases(limit = 8) {
  return supabaseFetch<SupabasePurchase[]>("/rest/v1/purchases", {
    query: {
      select: "*",
      order: "created_at.desc",
      limit,
    },
  });
}

export async function updatePurchaseRecordStatus(purchaseId: string, payload: { status: string; gateway_reference?: string; paid_at?: string | null }) {
  const rows = await supabaseFetch<SupabasePurchase[]>("/rest/v1/purchases", {
    method: "PATCH",
    query: {
      id: `eq.${purchaseId}`,
      select: "*",
    },
    body: payload,
    prefer: "return=representation",
  });

  return rows[0] ?? null;
}

export async function createEssayRecord(payload: Omit<SupabaseEssay, "id" | "submitted_at" | "updated_at"> & { id?: string; submitted_at?: string; updated_at?: string }) {
  const rows = await supabaseFetch<SupabaseEssay[]>("/rest/v1/essays", {
    method: "POST",
    body: {
      ...payload,
      submitted_at: payload.submitted_at ?? new Date().toISOString(),
      updated_at: payload.updated_at ?? new Date().toISOString(),
    },
    prefer: "return=representation",
  });

  return rows[0] ?? null;
}

export async function listEssaysForUserRemote(userId: string) {
  return supabaseFetch<SupabaseEssay[]>("/rest/v1/essays", {
    query: {
      user_id: `eq.${userId}`,
      select: "*",
      order: "submitted_at.desc",
    },
  });
}

export async function listEssaysForAdminRemote() {
  const essays = await supabaseFetch<SupabaseEssay[]>("/rest/v1/essays", {
    query: {
      select: "*",
      order: "submitted_at.desc",
    },
  });

  const profiles = await supabaseFetch<SupabaseProfile[]>("/rest/v1/profiles", {
    query: {
      select: "id,name,email,role,document,created_at,last_login_at",
    },
  });

  return essays.map((essay) => ({
    ...essay,
    user: profiles.find((profile) => profile.id === essay.user_id) ?? null,
  }));
}

export async function updateEssayRecord(payload: {
  essayId: string;
  status: string;
  score_label: string;
  devolutiva: string;
  pontos_fortes: string[];
  pontos_melhoria: string[];
  erros_recorrentes: string[];
  plano_evolucao: string[];
  proxima_meta: string;
  enem_breakdown?: Record<string, number> | null;
  concurso_breakdown?: Record<string, number> | null;
}) {
  const rows = await supabaseFetch<SupabaseEssay[]>("/rest/v1/essays", {
    method: "PATCH",
    query: {
      id: `eq.${payload.essayId}`,
      select: "*",
    },
    body: {
      status: payload.status,
      score_label: payload.score_label,
      devolutiva: payload.devolutiva,
      pontos_fortes: payload.pontos_fortes,
      pontos_melhoria: payload.pontos_melhoria,
      erros_recorrentes: payload.erros_recorrentes,
      plano_evolucao: payload.plano_evolucao,
      proxima_meta: payload.proxima_meta,
      enem_breakdown: payload.enem_breakdown ?? null,
      concurso_breakdown: payload.concurso_breakdown ?? null,
      updated_at: new Date().toISOString(),
    },
    prefer: "return=representation",
  });

  return rows[0] ?? null;
}

export async function listProfilesByRole(role: ProfileRole) {
  return supabaseFetch<SupabaseProfile[]>("/rest/v1/profiles", {
    query: {
      role: `eq.${role}`,
      select: "*",
      order: "created_at.desc",
    },
  });
}

export async function getStudentProgressRecord(userId: string, productSlug: string, trackSlug: string) {
  const rows = await supabaseFetch<SupabaseStudentProgress[]>("/rest/v1/student_progress", {
    query: {
      user_id: `eq.${userId}`,
      product_slug: `eq.${productSlug}`,
      track_slug: `eq.${trackSlug}`,
      select: "*",
      order: "updated_at.desc",
      limit: 1,
    },
  });

  return rows[0] ?? null;
}

export async function upsertStudentProgressRecord(
  payload: Omit<SupabaseStudentProgress, "id" | "created_at" | "updated_at"> & { id?: string; created_at?: string; updated_at?: string },
) {
  const existing = await getStudentProgressRecord(payload.user_id, payload.product_slug, payload.track_slug);

  if (existing) {
    const rows = await supabaseFetch<SupabaseStudentProgress[]>("/rest/v1/student_progress", {
      method: "PATCH",
      query: {
        id: `eq.${existing.id}`,
        select: "*",
      },
      body: {
        lesson_slug: payload.lesson_slug ?? null,
        progress_percent: payload.progress_percent,
        updated_at: payload.updated_at ?? new Date().toISOString(),
      },
      prefer: "return=representation",
    });

    return rows[0] ?? null;
  }

  const rows = await supabaseFetch<SupabaseStudentProgress[]>("/rest/v1/student_progress", {
    method: "POST",
    body: {
      user_id: payload.user_id,
      product_slug: payload.product_slug,
      track_slug: payload.track_slug,
      lesson_slug: payload.lesson_slug ?? null,
      progress_percent: payload.progress_percent,
      created_at: payload.created_at ?? new Date().toISOString(),
      updated_at: payload.updated_at ?? new Date().toISOString(),
    },
    prefer: "return=representation",
  });

  return rows[0] ?? null;
}

export async function createQuestionAttemptRecord(payload: Omit<SupabaseQuestionAttempt, "id" | "created_at"> & { id?: string; created_at?: string }) {
  const rows = await supabaseFetch<SupabaseQuestionAttempt[]>("/rest/v1/question_attempts", {
    method: "POST",
    body: {
      ...payload,
      created_at: payload.created_at ?? new Date().toISOString(),
    },
    prefer: "return=representation",
  });

  return rows[0] ?? null;
}

export async function createSimulationAttemptRecord(payload: Omit<SupabaseSimulationAttempt, "id" | "created_at"> & { id?: string; created_at?: string }) {
  const rows = await supabaseFetch<SupabaseSimulationAttempt[]>("/rest/v1/simulation_attempts", {
    method: "POST",
    body: {
      ...payload,
      created_at: payload.created_at ?? new Date().toISOString(),
    },
    prefer: "return=representation",
  });

  return rows[0] ?? null;
}

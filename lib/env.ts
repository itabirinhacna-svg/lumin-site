export const env = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  sessionSecret:
    process.env.SESSION_SECRET ?? "dev-secret-change-this-before-production-BenThec-premium-2026",
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  supabaseGoogleAuthEnabled: process.env.NEXT_PUBLIC_SUPABASE_GOOGLE_AUTH_ENABLED === "true",
  paymentProvider: process.env.PAYMENT_PROVIDER ?? "mock",
  mercadoPagoPublicKey: process.env.MERCADO_PAGO_PUBLIC_KEY ?? "",
  mercadoPagoAccessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN ?? process.env.MERCADO_PAGO_TOKEN ?? "",
  mercadoPagoWebhookSecret: process.env.MERCADO_PAGO_WEBHOOK_SECRET ?? "",
  mercadoPagoToken: process.env.MERCADO_PAGO_TOKEN ?? "",
  stripeSecretKey: process.env.STRIPE_SECRET_KEY ?? "",
  asaasApiKey: process.env.ASAAS_API_KEY ?? "",
  paymentWebhookSecret: process.env.PAYMENT_WEBHOOK_SECRET ?? "dev-webhook-secret",
  genericWebhookSecret: process.env.WEBHOOK_SECRET ?? process.env.PAYMENT_WEBHOOK_SECRET ?? "dev-webhook-secret",
  nextPublicGaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
  nextPublicMetaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
  nextPublicClarityId: process.env.NEXT_PUBLIC_CLARITY_ID ?? "",
  adminEmail: process.env.ADMIN_EMAIL ?? "admin@BenThecaprova.local",
  adminPassword: process.env.ADMIN_PASSWORD ?? "ChangeMe123!",
  nodeEnv: process.env.NODE_ENV ?? "development",
};

export function hasSupabaseConfig() {
  return Boolean(env.supabaseUrl && env.supabaseAnonKey && env.supabaseServiceRoleKey);
}

export function getConfigWarnings() {
  const warnings: string[] = [];

  if (env.sessionSecret.includes("dev-secret-change-this")) {
    warnings.push("SESSION_SECRET esta no valor de desenvolvimento.");
  }

  if (env.adminPassword === "ChangeMe123!") {
    warnings.push("ADMIN_PASSWORD ainda usa a senha bootstrap padrao.");
  }

  if (env.paymentProvider === "mock") {
    warnings.push("PAYMENT_PROVIDER esta em mock, com aprovacao imediata local.");
  }

  if (!hasSupabaseConfig()) {
    warnings.push("Supabase ainda nao esta configurado. A persistencia segue no adaptador local.");
  }

  if (!env.mercadoPagoAccessToken && !env.mercadoPagoToken && !env.stripeSecretKey && !env.asaasApiKey) {
    warnings.push("Nenhuma chave de gateway foi configurada ainda. O checkout segue em modo demonstracao.");
  }

  return warnings;
}

export function isProduction() {
  return env.nodeEnv === "production";
}

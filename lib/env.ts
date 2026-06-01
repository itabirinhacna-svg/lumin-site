export const env = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  sessionSecret:
    process.env.SESSION_SECRET ?? "dev-secret-change-this-before-production-BenThec-premium-2026",
  paymentProvider: process.env.PAYMENT_PROVIDER ?? "mock",
  paymentWebhookSecret: process.env.PAYMENT_WEBHOOK_SECRET ?? "dev-webhook-secret",
  adminEmail: process.env.ADMIN_EMAIL ?? "admin@BenThecaprova.local",
  adminPassword: process.env.ADMIN_PASSWORD ?? "ChangeMe123!",
  nodeEnv: process.env.NODE_ENV ?? "development"
};

export function getConfigWarnings() {
  const warnings: string[] = [];

  if (env.sessionSecret.includes("dev-secret-change-this")) {
    warnings.push("SESSION_SECRET estÃ¡ no valor de desenvolvimento.");
  }

  if (env.adminPassword === "ChangeMe123!") {
    warnings.push("ADMIN_PASSWORD ainda usa a senha bootstrap padrÃ£o.");
  }

  if (env.paymentProvider === "mock") {
    warnings.push("PAYMENT_PROVIDER estÃ¡ em mock, com aprovaÃ§Ã£o imediata local.");
  }

  return warnings;
}

export function isProduction() {
  return env.nodeEnv === "production";
}


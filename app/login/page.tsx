import { redirect } from "next/navigation";
import { BrandMark } from "@/components/brand-mark";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCurrentUser } from "@/lib/access";
import { env } from "@/lib/env";

type LoginPageProps = {
  searchParams?: Promise<{
    recover?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const currentUser = await getCurrentUser();
  const params = (await searchParams) ?? {};

  if (currentUser) {
    redirect(currentUser.role === "student" ? "/area" : "/admin");
  }

  return (
    <>
      <SiteHeader ctaLabel="Ver catalogo" ctaHref="/#catalogo" />

      <main className="section">
        <div className="page-shell" style={{ maxWidth: 760 }}>
          <section className="soft-panel" style={{ padding: "28px 22px", display: "grid", gap: 22 }}>
            <div style={{ display: "grid", gap: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <BrandMark variant="summit" />
              </div>

              <div>
                <h1 className="display-title" style={{ fontSize: "clamp(2.8rem, 8vw, 4.4rem)", color: "#fff", maxWidth: "10ch", marginBottom: 8 }}>
                  Bem-vindo de volta
                </h1>
                <p style={{ color: "#cbd5e1", fontSize: "1.1rem" }}>Entre e siga para a proxima etapa da sua trilha.</p>
              </div>
            </div>

            <section className="glass-card" style={{ background: "#111827", borderColor: "rgba(255,255,255,.08)", padding: 18 }}>
              <div className="kicker" style={{ color: "#f3cf6f" }}>
                Acesso demo
              </div>
              <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
                <strong style={{ fontSize: "1.1rem" }}>demo@benthec.com</strong>
                <strong style={{ color: "#f3cf6f", fontSize: "1.05rem" }}>12345678</strong>
              </div>
              <p style={{ marginTop: 12 }}>Dashboard, biblioteca, questoes, simulados e redacao ja liberados.</p>
            </section>

            {env.supabaseGoogleAuthEnabled ? (
              <section className="glass-card" style={{ background: "#111827", borderColor: "rgba(255,255,255,.08)", padding: 18 }}>
                <strong>Google login configurado</strong>
                <p style={{ marginTop: 8 }}>Ative o provider no Supabase para usar a entrada com Google em producao.</p>
              </section>
            ) : null}

            {params.recover === "sent" ? (
              <section className="glass-card" style={{ background: "#111827", borderColor: "rgba(255,255,255,.08)", padding: 18 }}>
                <strong>Recuperacao enviada</strong>
                <p style={{ marginTop: 8 }}>Se o e-mail existir na base, voce recebe o link de redefinicao.</p>
              </section>
            ) : null}

            <div style={{ display: "flex", alignItems: "center", gap: 14, color: "#64748b" }}>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.08)" }} />
              <span>ou</span>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.08)" }} />
            </div>

            <form action="/api/auth/login" method="post" style={{ display: "grid", gap: 16 }}>
              <div className="field" style={{ marginBottom: 0 }}>
                <label htmlFor="login-email" style={{ color: "#fff", fontSize: "1rem" }}>
                  Email
                </label>
                <input id="login-email" name="email" type="email" placeholder="voce@exemplo.com" required />
              </div>
              <div className="field" style={{ marginBottom: 0 }}>
                <label htmlFor="login-password" style={{ color: "#fff", fontSize: "1rem" }}>
                  Senha
                </label>
                <input id="login-password" name="password" type="password" placeholder="Sua senha" minLength={8} required />
              </div>
              <div className="actions" style={{ marginTop: 4 }}>
                <button type="submit" className="btn" style={{ width: "100%", minHeight: 56, fontSize: "1.15rem" }}>
                  Entrar
                </button>
              </div>
            </form>

            <form action="/api/auth/recover" method="post" className="glass-card" style={{ background: "#111827", borderColor: "rgba(255,255,255,.08)", padding: 18, display: "grid", gap: 12 }}>
              <strong>Esqueci minha senha</strong>
              <p>Digite seu e-mail para receber a recuperacao quando o Supabase estiver configurado.</p>
              <div className="field" style={{ marginBottom: 0 }}>
                <label htmlFor="recover-email" style={{ color: "#fff", fontSize: "1rem" }}>
                  Email para recuperacao
                </label>
                <input id="recover-email" name="email" type="email" placeholder="voce@exemplo.com" required />
              </div>
              <button type="submit" className="btn-ghost" style={{ minHeight: 48 }}>
                Enviar recuperacao
              </button>
            </form>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

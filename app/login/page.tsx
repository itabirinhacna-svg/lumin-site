import { redirect } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCurrentUser } from "@/lib/access";

export default async function LoginPage() {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    redirect(currentUser.role === "admin" ? "/admin" : "/aluno");
  }

  return (
    <>
      <SiteHeader ctaLabel="Quero organizar meus estudos" ctaHref="/checkout" />

      <main className="section">
        <div className="page-shell" style={{ maxWidth: 1100 }}>
          <div className="auth-grid" style={{ alignItems: "stretch" }}>
            <section className="auth-card" style={{ background: "#0f172a", borderColor: "rgba(255,255,255,.08)" }}>
              <div className="kicker" style={{ color: "#f3cf6f" }}>
                Acesso do aluno
              </div>
              <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", color: "#fff" }}>Entre para continuar sua trilha.</h1>
              <p style={{ color: "#cbd5e1" }}>
                Login simples, sessão segura e entrada direta na plataforma para seguir a preparação do Aprova Água
                Doce.
              </p>

              <form action="/api/auth/login" method="post">
                <div className="field">
                  <label htmlFor="login-email" style={{ color: "#e2e8f0" }}>
                    E-mail
                  </label>
                  <input id="login-email" name="email" type="email" placeholder="voce@exemplo.com" required />
                </div>
                <div className="field">
                  <label htmlFor="login-password" style={{ color: "#e2e8f0" }}>
                    Senha
                  </label>
                  <input
                    id="login-password"
                    name="password"
                    type="password"
                    placeholder="Sua senha"
                    minLength={8}
                    required
                  />
                </div>
                <div className="actions">
                  <button type="submit" className="btn">
                    Entrar na plataforma
                  </button>
                </div>
              </form>
            </section>

            <section className="glass-card" style={{ background: "#111827", borderColor: "rgba(255,255,255,.08)" }}>
              <div className="kicker" style={{ color: "#f3cf6f" }}>
                Acesso demo
              </div>
              <h2 style={{ color: "#fff", marginTop: 0 }}>Use hoje para navegar na plataforma.</h2>
              <div className="lesson-real-note" style={{ marginTop: 12 }}>
                <strong style={{ display: "block", marginBottom: 8 }}>demo@benthec.com</strong>
                <strong>12345678</strong>
              </div>
              <ul className="list-clean" style={{ marginTop: 18 }}>
                <li>Entrada direta para /area</li>
                <li>Biblioteca, progresso, questões e simulados já visíveis</li>
                <li>Fluxo pronto para apresentação comercial hoje</li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

import { redirect } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCurrentUser } from "@/lib/access";
import { env } from "@/lib/env";

export default async function LoginPage() {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    redirect(currentUser.role === "admin" ? "/admin" : "/aluno");
  }

  return (
    <>
      <SiteHeader ctaLabel="Ver pacotes" ctaHref="/#pacotes" />
      <main className="section">
        <div className="page-shell auth-grid">
          <section className="auth-card">
            <div className="kicker">Acesso do aluno</div>
            <h1 style={{ fontSize: "clamp(2.3rem, 5vw, 4rem)" }}>Entre para continuar seus estudos.</h1>
            <p>
              Este login jÃ¡ usa conta persistida e prepara a sessÃ£o segura do usuÃ¡rio. O redirecionamento respeita o
              perfil do acesso.
            </p>
            <form action="/api/auth/login" method="post">
              <div className="field">
                <label htmlFor="login-email">E-mail</label>
                <input id="login-email" name="email" type="email" placeholder="voce@exemplo.com" required />
              </div>
              <div className="field">
                <label htmlFor="login-password">Senha</label>
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
          <section className="glass-card">
            <div className="kicker">Bootstrap local</div>
            <h3>Admin inicial para validaÃ§Ã£o</h3>
            <ul className="list-clean">
              <li>E-mail inicial: {env.adminEmail}</li>
              <li>Senha inicial: definida em ADMIN_PASSWORD</li>
              <li>Troque os valores de .env antes de publicar</li>
              <li>Compras liberam acesso do aluno automaticamente no modo mock</li>
            </ul>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}


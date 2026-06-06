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
      <SiteHeader ctaLabel="Comecar" ctaHref="/checkout" />
      <main className="section">
        <div className="page-shell auth-grid">
          <section className="auth-card">
            <div className="kicker">Acesso do aluno</div>
            <h1 style={{ fontSize: "clamp(2.3rem, 5vw, 4rem)" }}>Entre para continuar seus estudos.</h1>
            <p>
              Este login já usa conta persistida e prepara a sessão segura do usuário. O redirecionamento respeita o
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
                  minLength={6}
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
            <div className="kicker">Acesso demo</div>
            <h3>Entrar na plataforma sem cadastro</h3>
            <ul className="list-clean">
              <li>E-mail demo: demo@benthec.com</li>
              <li>Senha demo: 123456</li>
              <li>Ao entrar, o fluxo leva direto para /area</li>
              <li>Admin local continua disponivel em {env.adminEmail}</li>
            </ul>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}


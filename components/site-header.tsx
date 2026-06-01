import Link from "next/link";
import { getCurrentUser } from "@/lib/access";

type SiteHeaderProps = {
  ctaLabel?: string;
  ctaHref?: string;
};

export async function SiteHeader({
  ctaLabel = "ComeÃ§ar agora",
  ctaHref = "/checkout"
}: SiteHeaderProps) {
  const currentUser = await getCurrentUser();

  return (
    <header className="site-header">
      <div className="page-shell nav-row">
        <Link href="/" className="brand">
          <span className="brand-mark">A+</span>
          <span>BENTHEC</span>
        </Link>
        <nav className="nav-links">
          <Link href="/#pacotes">Pacotes</Link>
          <Link href="/#metodo">MÃ©todo</Link>
          <Link href="/#seguranca">SeguranÃ§a</Link>
          <Link href="/aluno">Ãrea do aluno</Link>
          <Link href="/admin">Admin</Link>
        </nav>
        <div className="actions">
          {currentUser ? (
            <>
              <Link href={currentUser.role === "admin" ? "/admin" : "/aluno"} className="btn-ghost">
                {currentUser.role === "admin" ? "Painel admin" : "Minha Ã¡rea"}
              </Link>
              <form action="/api/auth/logout" method="post">
                <button type="submit" className="btn-secondary">
                  Sair
                </button>
              </form>
            </>
          ) : (
            <Link href="/login" className="btn-ghost">
              Entrar
            </Link>
          )}
          <Link href={ctaHref} className="btn">
            {ctaLabel}
          </Link>
        </div>
      </div>
    </header>
  );
}


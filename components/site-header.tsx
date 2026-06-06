import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { getCurrentUser } from "@/lib/access";

type SiteHeaderProps = {
  ctaLabel?: string;
  ctaHref?: string;
};

export async function SiteHeader({
  ctaLabel = "Comecar",
  ctaHref = "/checkout"
}: SiteHeaderProps) {
  const currentUser = await getCurrentUser();

  return (
    <header className="site-header">
      <div className="page-shell nav-row">
        <Link href="/" className="brand" aria-label="BenThec">
          <BrandMark compact />
        </Link>

        <nav className="nav-links">
          <Link href="/#trilhas">Trilhas</Link>
          <Link href="/#agua-doce">Aprova Agua Doce</Link>
          <Link href="/#metodo">Metodo</Link>
          {!currentUser ? <Link href="/login">Entrar</Link> : null}
        </nav>

        <div className="actions">
          {currentUser ? (
            <>
              <Link href={currentUser.role === "admin" ? "/admin" : "/aluno"} className="btn-ghost">
                {currentUser.role === "admin" ? "Painel" : "Minha area"}
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

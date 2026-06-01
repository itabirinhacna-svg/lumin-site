import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="page-shell footer-row">
        <div>
          <strong>BENTHEC</strong>
          <p>Plataforma digital para concursos e ENEM com foco em conversÃ£o, retenÃ§Ã£o e recorrÃªncia.</p>
        </div>
        <div className="tag-row">
          <Link href="/termos" className="pill">
            Termos
          </Link>
          <Link href="/privacidade" className="pill">
            Privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}


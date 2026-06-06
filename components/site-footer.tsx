import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="page-shell footer-row">
        <div className="footer-brand">
          <BrandMark />
          <p>Plataforma educacional para estudo guiado, biblioteca digital e acompanhamento de aprovacao.</p>
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

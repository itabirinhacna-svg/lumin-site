import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="page-shell footer-row">
        <div className="footer-brand">
          <BrandMark />
          <p>Vamos por partes. A BenThec acompanha voce da retomada ate a aprovacao.</p>
        </div>
        <div className="tag-row">
          <Link href="/quem-somos" className="pill">
            Sobre
          </Link>
          <Link href="/faq" className="pill">
            FAQ
          </Link>
          <Link href="/metodologia" className="pill">
            Metodologia
          </Link>
          <Link href="/como-funciona" className="pill">
            Como funciona
          </Link>
          <Link href="/garantia" className="pill">
            Garantia
          </Link>
          <Link href="/suporte" className="pill">
            Suporte
          </Link>
          <Link href="/termos" className="pill">
            Termos
          </Link>
          <Link href="/privacidade" className="pill">
            Privacidade
          </Link>
          <Link href="/reembolso" className="pill">
            Reembolso
          </Link>
          <Link href="/lgpd" className="pill">
            LGPD
          </Link>
        </div>
      </div>
    </footer>
  );
}

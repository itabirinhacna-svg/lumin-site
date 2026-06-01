import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function CheckoutPendingPage() {
  return (
    <>
      <SiteHeader ctaLabel="Voltar ao checkout" ctaHref="/checkout" />
      <main className="section">
        <div className="page-shell glass-card">
          <div className="kicker">Pagamento pendente</div>
          <h1 style={{ fontSize: "clamp(2.3rem, 5vw, 4rem)" }}>Seu pedido foi criado e está aguardando confirmação.</h1>
          <p>
            Quando o gateway confirmar o pagamento via webhook, o acesso ao conteúdo será liberado automaticamente.
          </p>
          <div className="actions">
            <Link href="/login" className="btn">
              Acompanhar conta
            </Link>
            <Link href="/" className="btn-ghost">
              Voltar ao site
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

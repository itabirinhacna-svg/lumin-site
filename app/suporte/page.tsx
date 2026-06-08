import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function SupportPage() {
  return (
    <>
      <SiteHeader ctaLabel="Falar no WhatsApp" ctaHref="https://wa.me/5527999850434?text=Ola,%20preciso%20de%20ajuda%20na%20BenThec." />
      <main className="section">
        <div className="page-shell glass-card">
          <div className="kicker">Suporte</div>
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>Voce nao precisa resolver tudo sozinho.</h1>
          <p style={{ marginTop: 10 }}>Atendimento para trilha, acesso, pagamento, redacao e rotina de estudo.</p>
          <div className="actions" style={{ marginTop: 18 }}>
            <Link href="https://wa.me/5527999850434?text=Ola,%20preciso%20de%20ajuda%20na%20BenThec." className="btn" target="_blank">
              Chamar suporte
            </Link>
            <Link href="/faq" className="btn-secondary">
              Ler FAQ
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

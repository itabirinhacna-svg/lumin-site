import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function ReembolsoPage() {
  return (
    <>
      <SiteHeader ctaLabel="Falar com suporte" ctaHref="/suporte" />
      <main className="section">
        <div className="page-shell" style={{ maxWidth: 860, display: "grid", gap: 18 }}>
          <section className="hero-card">
            <div className="kicker">Politica de reembolso</div>
            <h1 style={{ fontSize: "clamp(2.3rem, 5vw, 4rem)" }}>Garantia de 7 dias.</h1>
            <p className="hero-copy">
              Se a compra nao fizer sentido para voce nesse inicio, a BenThec trabalha com pedido de reembolso dentro do prazo legal de 7 dias.
            </p>
          </section>

          <section className="glass-card">
            <strong>Como pedir</strong>
            <ul className="list-clean" style={{ marginTop: 12 }}>
              <li>Envie o pedido pelo suporte ou WhatsApp.</li>
              <li>Informe nome, e-mail da conta e plano comprado.</li>
              <li>A equipe confirma o protocolo e acompanha a devolucao.</li>
            </ul>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

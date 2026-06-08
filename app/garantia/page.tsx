import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function GuaranteePage() {
  return (
    <>
      <SiteHeader ctaLabel="Conhecer planos" ctaHref="/checkout" />
      <main className="section">
        <div className="page-shell" style={{ maxWidth: 920, display: "grid", gap: 18 }}>
          <section className="hero-card">
            <div className="kicker">Garantia</div>
            <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>Voce tem 7 dias para decidir com tranquilidade.</h1>
            <p className="hero-copy">
              Se a compra nao fizer sentido para voce nesse inicio, a BenThec respeita a garantia legal de 7 dias e acompanha o pedido pelo suporte.
            </p>
          </section>

          <section className="glass-card">
            <strong>Como acionar a garantia</strong>
            <ul className="list-clean" style={{ marginTop: 12 }}>
              <li>Fale com o suporte da BenThec.</li>
              <li>Informe nome, e-mail da conta e plano comprado.</li>
              <li>A equipe confirma o recebimento e acompanha o processo.</li>
            </ul>
            <div className="actions" style={{ marginTop: 18 }}>
              <Link href="/reembolso" className="btn-secondary">Ver politica de reembolso</Link>
              <Link href="/suporte" className="btn">Falar com suporte</Link>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

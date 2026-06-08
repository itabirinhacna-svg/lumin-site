import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function FutureTracksPage() {
  return (
    <>
      <SiteHeader ctaLabel="Voltar ao catalogo" ctaHref="/#catalogo" />

      <main className="section">
        <div className="page-shell" style={{ maxWidth: 980 }}>
          <section className="glass-card">
            <div className="kicker">Futuras trilhas</div>
            <h1 style={{ fontSize: "clamp(2.3rem, 5vw, 4rem)" }}>Roadmap visivel sem prometer o que ainda nao foi curado.</h1>
            <ul className="feature-list" style={{ marginTop: 18 }}>
              <li>Novos editais municipais por cargo</li>
              <li>Expansao PMES separada do Aprova Agua Doce</li>
              <li>Frentes ENEM e redacao com catalogo proprio</li>
            </ul>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

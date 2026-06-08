import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function ENEMPage() {
  return (
    <>
      <SiteHeader ctaLabel="Ver produto de redacao" ctaHref="/redacao" />

      <main className="section">
        <div className="page-shell" style={{ display: "grid", gap: 22 }}>
          <section className="hero-card">
            <div className="kicker">Estrutura futura</div>
            <h1 style={{ fontSize: "clamp(2.3rem, 5vw, 4.4rem)" }}>ENEM com trilhas, acompanhamento e redacao.</h1>
            <p className="hero-copy">
              A plataforma ja comporta uma frente ENEM com produto proprio, fluxo de redacao e estudo guiado por rotina.
            </p>
          </section>

          <section className="glass-card">
            <div className="kicker">O que esta preparado</div>
            <ul className="feature-list" style={{ marginTop: 16 }}>
              <li>Trilhas com rotina e proximo passo claro</li>
              <li>Integracao direta com o produto de redacao</li>
              <li>Base visual e de navegacao pronta para expansao comercial</li>
            </ul>
            <div className="actions" style={{ marginTop: 18 }}>
              <Link href="/redacao" className="btn">
                Conhecer redacao
              </Link>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function AboutPage() {
  return (
    <>
      <SiteHeader ctaLabel="Conhecer planos" ctaHref="/checkout" />
      <main className="section">
        <div className="page-shell glass-card">
          <div className="kicker">Quem somos</div>
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>A BenThec existe para acompanhar quem retomou os estudos.</h1>
          <p style={{ marginTop: 10 }}>
            Nosso trabalho junta trilha guiada, curadoria, pratica e correcao humana para concursos municipais, PMES, ENEM e redacao. O foco nao e despejar PDF; e ajudar o aluno a avancar com seguranca.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

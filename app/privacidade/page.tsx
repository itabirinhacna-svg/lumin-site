import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader ctaLabel="Entrar" ctaHref="/login" />
      <main className="section">
        <div className="page-shell glass-card">
          <div className="kicker">Privacidade</div>
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>Seus dados entram para liberar acesso, acompanhar compra e manter seu historico.</h1>
          <p style={{ marginTop: 10 }}>
            A base atual usa dados de cadastro, compra, progresso e redacao para operar a plataforma. O objetivo e liberar o produto certo, registrar o historico do aluno e sustentar o fluxo de suporte e correcao humana.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

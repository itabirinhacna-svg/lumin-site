import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function LgpdPage() {
  return (
    <>
      <SiteHeader ctaLabel="Privacidade" ctaHref="/privacidade" />
      <main className="section">
        <div className="page-shell glass-card">
          <div className="kicker">LGPD</div>
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>Tratamento de dados com minimo necessario e controle de acesso.</h1>
          <p style={{ marginTop: 10 }}>
            A base atual registra dados de cadastro, compras e redacoes para liberar acesso e manter o fluxo do aluno. Em producao, a operacao juridica deve complementar esta pagina com base legal, retencao e direitos do titular.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

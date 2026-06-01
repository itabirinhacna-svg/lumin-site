import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader ctaLabel="Entrar" ctaHref="/login" />
      <main className="section">
        <div className="page-shell glass-card">
          <div className="kicker">Privacidade</div>
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>Tratamento de dados com foco em confiança.</h1>
          <p>
            A estrutura da plataforma foi pensada para operar com coleta mínima necessária, trilhas de auditoria e acesso
            segmentado. Na versão de produção, esta página deve detalhar finalidade, base legal, retenção e direitos do titular.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

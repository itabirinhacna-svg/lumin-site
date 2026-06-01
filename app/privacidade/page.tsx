import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader ctaLabel="Entrar" ctaHref="/login" />
      <main className="section">
        <div className="page-shell glass-card">
          <div className="kicker">Privacidade</div>
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>Tratamento de dados com foco em confianÃ§a.</h1>
          <p>
            A estrutura da plataforma foi pensada para operar com coleta mÃ­nima necessÃ¡ria, trilhas de auditoria e acesso
            segmentado. Na versÃ£o de produÃ§Ã£o, esta pÃ¡gina deve detalhar finalidade, base legal, retenÃ§Ã£o e direitos do titular.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}


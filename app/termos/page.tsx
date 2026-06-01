import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function TermsPage() {
  return (
    <>
      <SiteHeader ctaLabel="Assinar agora" ctaHref="/checkout" />
      <main className="section">
        <div className="page-shell glass-card">
          <div className="kicker">Termos de uso</div>
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>Base legal da plataforma.</h1>
          <p>
            Esta pÃ¡gina existe para consolidar regras de acesso, uso do conteÃºdo, proteÃ§Ã£o de propriedade intelectual e
            polÃ­tica de cancelamento. Em produÃ§Ã£o, vale complementar com jurÃ­dico e polÃ­tica de privacidade alinhada Ã  LGPD.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}


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
            Esta página existe para consolidar regras de acesso, uso do conteúdo, proteção de propriedade intelectual e
            política de cancelamento. Em produção, vale complementar com jurídico e política de privacidade alinhada à LGPD.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

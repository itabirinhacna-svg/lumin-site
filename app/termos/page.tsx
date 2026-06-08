import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function TermsPage() {
  return (
    <>
      <SiteHeader ctaLabel="Assinar agora" ctaHref="/checkout" />
      <main className="section">
        <div className="page-shell glass-card">
          <div className="kicker">Termos de uso</div>
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>Compra, acesso, uso do conteudo e suporte descritos sem promessa falsa.</h1>
          <p style={{ marginTop: 10 }}>
            Ao comprar, o aluno recebe acesso ao produto contratado, biblioteca, trilha, questoes, simulados e, quando houver, redacao com correcao humana. Conteudos de terceiros seguem com autoria preservada e uso como referencia/curadoria, nunca como material proprio copiado.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

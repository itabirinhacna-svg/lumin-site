import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const faqs = [
  {
    question: "O que eu recebo depois da compra?",
    answer: "Voce recebe acesso ao produto comprado, trilhas guiadas, biblioteca digital, questoes, simulados e, quando aplicavel, fluxo de redacao com correcao humana.",
  },
  {
    question: "Como funciona a trilha?",
    answer: "A trilha mostra aula atual, leitura, video, questoes, revisao e proximo passo. O aluno entra e continua de onde parou.",
  },
  {
    question: "Como funciona a correcao humana?",
    answer: "A equipe BenThec recebe o envio, coloca o texto em fila, corrige por criterio oficial e devolve nota, pontos fortes, pontos fracos e proxima meta em ate 24 horas.",
  },
  {
    question: "Quando eu acesso depois da compra?",
    answer: "No modo demonstracao, o acesso libera na hora. Em producao, o acesso libera conforme aprovacao do pagamento pelo gateway configurado.",
  },
];

export default function FaqPage() {
  return (
    <>
      <SiteHeader ctaLabel="Ver planos" ctaHref="/checkout" />
      <main className="section">
        <div className="page-shell" style={{ display: "grid", gap: 18 }}>
          <section className="hero-card">
            <div className="kicker">FAQ</div>
            <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>Perguntas que costumam travar a decisao de compra.</h1>
            <p className="hero-copy">Aqui voce entende o que recebe, como acessa e como funciona o acompanhamento.</p>
          </section>
          {faqs.map((item) => (
            <article key={item.question} className="glass-card">
              <strong>{item.question}</strong>
              <p style={{ marginTop: 10 }}>{item.answer}</p>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

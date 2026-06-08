import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const steps = [
  {
    title: "Escolha o produto certo",
    text: "Voce entra pelo plano que mais combina com seu momento: apostila, apostila com simulados ou portal completo.",
  },
  {
    title: "Continue de onde parou",
    text: "A area do aluno mostra a proxima missao, a aula atual, as revisoes pendentes e o proximo simulado.",
  },
  {
    title: "Estude em fluxo guiado",
    text: "Cada aula junta video, leitura, questoes e revisao. O aluno nao precisa montar sozinho a propria rotina.",
  },
  {
    title: "Escreva e receba retorno humano",
    text: "Na redacao, o envio entra na fila da equipe BenThec, recebe correcao humana e devolutiva com proxima meta.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <SiteHeader ctaLabel="Ver planos" ctaHref="/checkout" />
      <main className="section">
        <div className="page-shell" style={{ display: "grid", gap: 18 }}>
          <section className="hero-card">
            <div className="kicker">Como funciona</div>
            <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>Uma plataforma para estudar com caminho claro.</h1>
            <p className="hero-copy">Na BenThec, o aluno nao recebe so conteudo. Ele recebe direcao: o que estudar agora, como praticar e qual e a proxima etapa.</p>
          </section>

          <div className="section-grid">
            {steps.map((step, index) => (
              <article key={step.title} className="plan-card">
                <div className="kicker">Passo {index + 1}</div>
                <strong>{step.title}</strong>
                <p style={{ marginTop: 10 }}>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

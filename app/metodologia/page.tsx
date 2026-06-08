import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function MethodologyPage() {
  return (
    <>
      <SiteHeader ctaLabel="Entrar" ctaHref="/login" />
      <main className="section">
        <div className="page-shell" style={{ display: "grid", gap: 18 }}>
          <section className="hero-card">
            <div className="kicker">Metodologia</div>
            <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>Video, leitura, questoes e revisao no mesmo fluxo.</h1>
            <p className="hero-copy">A BenThec nao joga material no colo do aluno. Cada etapa mostra o que estudar, por que isso cai e o que vem depois.</p>
          </section>
          <section className="glass-card">
            <strong>Como a trilha funciona na pratica</strong>
            <p style={{ marginTop: 10 }}>
              Primeiro o aluno entra na aula atual. Depois assiste ao video principal, le o resumo BenThec, faz questoes imediatas e fecha com revisao curta. O objetivo e nunca deixar a pessoa perdida entre PDF, video e gabarito.
            </p>
          </section>
          <div className="section-grid">
            {["Objetivo da aula", "Video validado", "Resumo BenThec", "Questoes da etapa", "Revisao curta", "Proximo passo"].map((step, index) => (
              <article key={step} className="plan-card">
                <div className="kicker">Etapa {index + 1}</div>
                <strong>{step}</strong>
              </article>
            ))}
          </div>
          <section className="section-grid">
            <article className="plan-card">
              <div className="kicker">Concursos</div>
              <p style={{ marginTop: 8 }}>A trilha prepara o aluno para edital, banca, rotina de questoes e revisao por microassunto.</p>
            </article>
            <article className="plan-card">
              <div className="kicker">ENEM</div>
              <p style={{ marginTop: 8 }}>A jornada mistura areas, treino gradual e redacao com devolutiva humana especializada.</p>
            </article>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

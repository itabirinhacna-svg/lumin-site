import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { requireStudentAccess } from "@/lib/access";
import { listEssaysForUser, mapEssayRecordToSubmission } from "@/lib/db";
import {
  getConcursoCriteriaTotal,
  getEnemCompetencyTotal,
  getPreviousSubmissionFromSameLinha,
  redacaoHistoricoDemo,
} from "@/lib/redacao";

type RedacaoDevolutivaPageProps = {
  searchParams?: Promise<{
    essay?: string;
  }>;
};

export default async function RedacaoDevolutivaPage({ searchParams }: RedacaoDevolutivaPageProps) {
  const { user } = await requireStudentAccess();
  const params = (await searchParams) ?? {};
  const savedEssays = (await listEssaysForUser(user.id)).map(mapEssayRecordToSubmission);
  const entries = savedEssays.length > 0 ? savedEssays : redacaoHistoricoDemo;
  const latest = entries.find((item) => item.id === params.essay) ?? entries[0];
  const previous =
    savedEssays.length > 0
      ? entries.find((item) => item.id !== latest.id && item.linha === latest.linha) ?? null
      : getPreviousSubmissionFromSameLinha(latest.id, latest.linha);
  const enemScore = getEnemCompetencyTotal(latest.enemBreakdown);
  const concursoScore = getConcursoCriteriaTotal(latest.concursoBreakdown);
  const previousScore =
    previous?.linha === "ENEM"
      ? getEnemCompetencyTotal(previous.enemBreakdown)
      : previous?.linha === "Concursos"
        ? getConcursoCriteriaTotal(previous.concursoBreakdown)
        : null;

  const breakdown =
    latest.linha === "ENEM"
      ? [
          ["Competencia 1", latest.enemBreakdown?.c1 ?? 0, 200],
          ["Competencia 2", latest.enemBreakdown?.c2 ?? 0, 200],
          ["Competencia 3", latest.enemBreakdown?.c3 ?? 0, 200],
          ["Competencia 4", latest.enemBreakdown?.c4 ?? 0, 200],
          ["Competencia 5", latest.enemBreakdown?.c5 ?? 0, 200],
        ]
      : [
          ["Tema", latest.concursoBreakdown?.tema ?? 0, 15],
          ["Argumentacao", latest.concursoBreakdown?.argumentacao ?? 0, 18],
          ["Estrutura", latest.concursoBreakdown?.estrutura ?? 0, 15],
          ["Gramatica", latest.concursoBreakdown?.gramatica ?? 0, 15],
          ["Coesao", latest.concursoBreakdown?.coesao ?? 0, 15],
          ["Clareza", latest.concursoBreakdown?.clareza ?? 0, 12],
          ["Objetividade", latest.concursoBreakdown?.objetividade ?? 0, 10],
        ];

  return (
    <>
      <SiteHeader ctaLabel="Enviar redacao" ctaHref="/redacao/envio" />

      <main className="section">
        <div className="page-shell" style={{ maxWidth: 980, display: "grid", gap: 20 }}>
          <section className="glass-card">
            <div className="kicker">Devolutiva BenThec</div>
            <h1 style={{ fontSize: "clamp(2.1rem, 5vw, 3.8rem)" }}>Parecer de correcao com proximo passo visivel.</h1>
            <p style={{ marginTop: 10 }}>
              A devolutiva precisa mostrar onde voce melhorou, onde repete erro e o que fazer na proxima escrita.
            </p>
          </section>

          <article className="plan-card">
            <div className="kicker">{latest.linha}</div>
            <h2 style={{ marginTop: 8 }}>{latest.title}</h2>
            <p style={{ marginTop: 10 }}>
              <strong>Nota:</strong> {latest.linha === "ENEM" ? `${enemScore} / 1000` : `${concursoScore} / 100`}
            </p>
            <p style={{ marginTop: 10 }}>
              <strong>Evolucao:</strong> {latest.scoreLabel}
            </p>
            <p style={{ marginTop: 10 }}>{latest.devolutiva}</p>
            {latest.attachmentRef ? (
              <p style={{ marginTop: 10 }}>
                <strong>Arquivo manuscrito:</strong>{" "}
                <a href={latest.attachmentRef} target="_blank" rel="noreferrer">
                  {latest.attachmentName ?? "Abrir envio"}
                </a>
              </p>
            ) : null}
            {latest.notes ? (
              <p style={{ marginTop: 10 }}>
                <strong>Observacoes do aluno:</strong> {latest.notes}
              </p>
            ) : null}
            {previous ? (
              <div className="glass-card" style={{ padding: 18, marginTop: 16 }}>
                <strong>Comparacao com o envio anterior</strong>
                <p style={{ marginTop: 8 }}>
                  Antes: {previousScore} {previous.linha === "ENEM" ? "/ 1000" : "/ 100"} | Agora: {latest.linha === "ENEM" ? `${enemScore} / 1000` : `${concursoScore} / 100`}
                </p>
                <p style={{ marginTop: 8 }}>Voce ja consegue enxergar o que subiu e o que ainda precisa de treino.</p>
              </div>
            ) : null}
          </article>

          <section className="glass-card">
            <strong>Grafico de avaliacao</strong>
            <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
              {breakdown.map(([label, value, total]) => {
                const percent = Math.round((Number(value) / Number(total)) * 100);

                return (
                  <article key={String(label)} style={{ display: "grid", gap: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                      <strong>{label}</strong>
                      <span>{value} / {total}</span>
                    </div>
                    <div style={{ height: 10, borderRadius: 999, background: "#1f2937", overflow: "hidden" }}>
                      <div style={{ width: `${percent}%`, height: "100%", background: "linear-gradient(90deg, #c58b00, #15803d)" }} />
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <div className="section-grid">
            <section className="glass-card">
              <strong>Pontos fortes</strong>
              <ul className="list-clean" style={{ marginTop: 14 }}>
                {latest.pontosFortes.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </section>

            <section className="glass-card">
              <strong>Pontos de melhoria</strong>
              <ul className="list-clean" style={{ marginTop: 14 }}>
                {latest.pontosMelhoria.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </section>
          </div>

          <div className="section-grid">
            <section className="glass-card">
              <strong>Erros recorrentes</strong>
              <ul className="list-clean" style={{ marginTop: 14 }}>
                {latest.errosRecorrentes.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </section>

            <section className="glass-card">
              <strong>Plano de evolucao</strong>
              <ul className="list-clean" style={{ marginTop: 14 }}>
                {latest.planoEvolucao.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </section>
          </div>

          <section className="glass-card">
            <strong>Meta da proxima redacao</strong>
            <p style={{ marginTop: 10 }}>{latest.proximaMeta}</p>
          </section>

          <section className="glass-card">
            <strong>Plano de melhoria desta devolutiva</strong>
            <div className="section-grid" style={{ marginTop: 16 }}>
              <article className="plan-card">
                <div className="kicker">Agora</div>
                <p>Releia os pontos fortes para repetir o que ja funcionou.</p>
              </article>
              <article className="plan-card">
                <div className="kicker">Na proxima escrita</div>
                <p>Escolha um unico ponto fraco para atacar, sem tentar corrigir tudo de uma vez.</p>
              </article>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

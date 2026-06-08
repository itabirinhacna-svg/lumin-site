import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { requireStudentAccess } from "@/lib/access";
import { listEssaysForUser, mapEssayRecordToSubmission } from "@/lib/db";
import { getConcursoCriteriaTotal, getEnemCompetencyTotal, redacaoHistoricoDemo } from "@/lib/redacao";

export default async function RedacaoHistoricoPage() {
  const { user } = await requireStudentAccess();
  const savedEssays = (await listEssaysForUser(user.id)).map(mapEssayRecordToSubmission);
  const entries = savedEssays.length > 0 ? savedEssays : redacaoHistoricoDemo;
  const enemSubmissions = entries.filter((item) => item.linha === "ENEM");
  const concursoSubmissions = entries.filter((item) => item.linha === "Concursos");
  const pmesSubmissions = entries.filter((item) => item.contexto === "PMES");
  const reviewedSubmissions = entries.filter((item) => item.status === "devolvida");
  const reviewedScores = reviewedSubmissions.map((item) =>
    item.linha === "ENEM" ? getEnemCompetencyTotal(item.enemBreakdown) : getConcursoCriteriaTotal(item.concursoBreakdown),
  );
  const averageScore = reviewedScores.length > 0 ? Math.round(reviewedScores.reduce((sum, value) => sum + value, 0) / reviewedScores.length) : 0;

  return (
    <>
      <SiteHeader ctaLabel="Enviar nova redacao" ctaHref="/redacao/envio" />

      <main className="section">
        <div className="page-shell" style={{ display: "grid", gap: 20 }}>
          <section className="hero-card">
            <div className="kicker">Historico de evolucao</div>
            <h1 style={{ fontSize: "clamp(2.1rem, 5vw, 3.8rem)" }}>Aqui voce enxerga o que melhorou e o que vem depois.</h1>
            <p className="hero-copy">Cada texto mostra nota, criterio, erros recorrentes e a meta da proxima escrita.</p>
          </section>

          <section className="section-grid">
            <article className="glass-card">
              <strong>Ultimas redacoes</strong>
              <p style={{ marginTop: 8 }}>{entries.length} envio(s) ja passaram pelo fluxo.</p>
            </article>
            <article className="glass-card">
              <strong>Media atual</strong>
              <p style={{ marginTop: 8 }}>{reviewedSubmissions.length > 0 ? averageScore : "Aguardando primeiras correcoes"}</p>
            </article>
            <article className="glass-card">
              <strong>Evolucao mensal</strong>
              <p style={{ marginTop: 8 }}>A plataforma mostra quando a escrita sobe de nivel e onde voce ainda precisa insistir.</p>
            </article>
            <article className="glass-card">
              <strong>Proximo objetivo</strong>
              <p style={{ marginTop: 8 }}>Transformar cada devolutiva em uma nova escrita mais segura.</p>
            </article>
          </section>

          <section className="section-grid">
            <article className="plan-card">
              <div className="kicker">ENEM</div>
              <h2 style={{ marginTop: 8 }}>{enemSubmissions.length} envio(s)</h2>
              <p style={{ marginTop: 10 }}>Acompanhe crescimento por competencia e fortaleca repertorio, proposta de intervencao e leitura do tema.</p>
            </article>
            <article className="plan-card">
              <div className="kicker">Concursos</div>
              <h2 style={{ marginTop: 8 }}>{concursoSubmissions.length} envio(s)</h2>
              <p style={{ marginTop: 10 }}>Acompanhe resposta ao tema, desenvolvimento, coesao, gramatica e clareza da escrita.</p>
            </article>
            <article className="plan-card">
              <div className="kicker">PMES</div>
              <h2 style={{ marginTop: 8 }}>{pmesSubmissions.length} envio(s)</h2>
              <p style={{ marginTop: 10 }}>Veja separado o que foi treinado para a frente policial, sem misturar com ENEM ou municipais.</p>
            </article>
          </section>

          {entries.map((item) => {
            const score = item.linha === "ENEM" ? `${getEnemCompetencyTotal(item.enemBreakdown)} / 1000` : `${getConcursoCriteriaTotal(item.concursoBreakdown)} / 100`;

            return (
              <article key={item.id} className="plan-card">
                <div className="kicker">{item.linha} | {item.contexto}</div>
                <h2 style={{ marginTop: 8 }}>{item.title}</h2>
                <p style={{ marginTop: 10 }}>
                  <strong>Enviada em:</strong> {item.submittedAt}
                </p>
                <p style={{ marginTop: 10 }}>
                  <strong>Status:</strong> {item.status}
                </p>
                <p style={{ marginTop: 10 }}>
                  <strong>Nota atual:</strong> {score}
                </p>
                {item.attachmentRef ? (
                  <p style={{ marginTop: 10 }}>
                    <strong>Redacao manuscrita:</strong>{" "}
                    <Link href={item.attachmentRef} target="_blank">
                      {item.attachmentName ?? "Abrir arquivo enviado"}
                    </Link>
                  </p>
                ) : null}
                {item.notes ? (
                  <p style={{ marginTop: 10 }}>
                    <strong>Observacoes:</strong> {item.notes}
                  </p>
                ) : null}
                <p style={{ marginTop: 10 }}>
                  <strong>Evolucao:</strong> {item.scoreLabel}
                </p>
                <p style={{ marginTop: 10 }}>{item.devolutiva}</p>

                <div className="section-grid" style={{ marginTop: 16 }}>
                  <div className="glass-card">
                    <strong>Pontos fortes</strong>
                    <ul className="list-clean" style={{ marginTop: 10 }}>
                      {item.pontosFortes.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="glass-card">
                    <strong>Pontos de melhoria</strong>
                    <ul className="list-clean" style={{ marginTop: 10 }}>
                      {item.pontosMelhoria.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="section-grid" style={{ marginTop: 16 }}>
                  <div className="glass-card">
                    <strong>Erros recorrentes</strong>
                    <ul className="list-clean" style={{ marginTop: 10 }}>
                      {item.errosRecorrentes.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="glass-card">
                    <strong>Plano de evolucao</strong>
                    <ul className="list-clean" style={{ marginTop: 10 }}>
                      {item.planoEvolucao.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="glass-card" style={{ padding: 18, marginTop: 16 }}>
                  <strong>Meta da proxima redacao</strong>
                  <p style={{ marginTop: 8 }}>{item.proximaMeta}</p>
                </div>
                <div className="actions" style={{ marginTop: 16 }}>
                  <Link href={`/redacao/devolutiva?essay=${item.id}`} className="btn-secondary">
                    Abrir devolutiva
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

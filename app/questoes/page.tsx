import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { curadoria } from "@/lib/curadoria";
import { getQuestoesByArea, getQuestoesOverview } from "@/lib/questoes";

const areaLabels = {
  operacionais: "Operacionais",
  saude: "Saude",
  magisterio: "Magisterio",
} as const;

export default function QuestoesPage() {
  const overview = getQuestoesOverview();

  return (
    <>
      <SiteHeader ctaLabel="Voltar ao AVA" ctaHref="/aluno" />

      <main className="section">
        <div className="page-shell">
          <div className="hero-card" style={{ marginBottom: 24 }}>
            <div className="kicker">Banco autoral em estilo IDESG</div>
            <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>Questoes reais para o Aprova Agua Doce</h1>
            <p className="hero-copy">
              Banco inicial autoral, inspirado no padrao objetivo da banca e alinhado ao conteudo programatico do
              edital. Sem reproducao de prova protegida.
            </p>

            <div className="tag-row" style={{ marginTop: 18 }}>
              <span className="pill">{overview.totalQuestoes} questoes</span>
              <span className="pill">{overview.cargoCount} cargos</span>
              <span className="pill">{overview.disciplinaCount} frentes de estudo</span>
            </div>
          </div>

          <div className="section-grid">
            {overview.porArea.map((item) => (
              <article key={item.area} className="glass-card">
                <div className="kicker">{areaLabels[item.area]}</div>
                <h2>{item.total} questoes</h2>
                <p style={{ marginTop: 10 }}>
                  {item.area === "operacionais"
                    ? "Leitura objetiva, matematica basica e rotina funcional."
                    : item.area === "saude"
                      ? "SUS, seguranca assistencial e fundamentos tecnicos."
                      : "Pedagogia, inclusao, anos iniciais e AEE."}
                </p>
              </article>
            ))}
          </div>

          <div style={{ display: "grid", gap: 24, marginTop: 24 }}>
            {curadoria.map((group) => {
              const areaQuestoes = getQuestoesByArea(group.slug);

              return (
                <section key={group.slug} className="glass-card">
                  <div className="kicker">{group.title}</div>
                  <h2 style={{ marginTop: 8 }}>{group.description}</h2>
                  <p style={{ marginTop: 10 }}>{areaQuestoes.length} questoes autorais disponiveis nesta area.</p>

                  <div style={{ display: "grid", gap: 16, marginTop: 18 }}>
                    {group.tracks.map((track) => {
                      const trackQuestions = areaQuestoes.filter((questao) => questao.cargoSlug === track.slug);

                      return (
                        <article key={track.slug} className="plan-card">
                          <div className="kicker">{track.titulo}</div>
                          <p style={{ marginTop: 8 }}>{trackQuestions.length} questoes iniciais em estilo IDESG.</p>

                          <div style={{ display: "grid", gap: 14, marginTop: 16 }}>
                            {trackQuestions.slice(0, 2).map((questao) => (
                              <div key={questao.id} className="glass-card" style={{ padding: 18 }}>
                                <strong>{questao.disciplina}</strong>
                                <p style={{ marginTop: 8 }}>{questao.enunciado}</p>
                                <ul className="list-clean" style={{ marginTop: 10 }}>
                                  {questao.alternativas.map((alternativa) => (
                                    <li key={alternativa.letra}>
                                      {alternativa.letra}) {alternativa.texto}
                                    </li>
                                  ))}
                                </ul>
                                <p style={{ marginTop: 10 }}>
                                  <strong>Gabarito:</strong> {questao.gabarito} · <strong>Nivel:</strong> {questao.nivel}
                                </p>
                                <p style={{ marginTop: 8 }}>{questao.comentario}</p>
                              </div>
                            ))}
                          </div>

                          <div className="actions" style={{ marginTop: 16 }}>
                            <Link href={`/aluno/aula-demo?trilha=${track.slug}`} className="btn-secondary">
                              Revisar na aula demo
                            </Link>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

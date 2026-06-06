import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSimuladosResolvidos } from "@/lib/simulados";

const areaLabels = {
  operacionais: "Operacionais",
  saude: "Saude",
  magisterio: "Magisterio",
} as const;

export default function SimuladosPage() {
  const simulados = getSimuladosResolvidos();

  return (
    <>
      <SiteHeader ctaLabel="Voltar ao AVA" ctaHref="/aluno" />

      <main className="section">
        <div className="page-shell">
          <div className="hero-card" style={{ marginBottom: 24 }}>
            <div className="kicker">Simulados iniciais</div>
            <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>Treino por area do Aprova Agua Doce</h1>
            <p className="hero-copy">
              Cada simulado usa o banco autoral em estilo IDESG para transformar biblioteca em pratica orientada.
            </p>
          </div>

          <div style={{ display: "grid", gap: 20 }}>
            {simulados.map((simulado) => (
              <article key={simulado.id} className="plan-card">
                <div className="plan-badge">{areaLabels[simulado.area]}</div>
                <div className="kicker" style={{ marginTop: 18 }}>
                  {simulado.tempoSugerido}
                </div>
                <h2 style={{ marginTop: 8 }}>{simulado.titulo}</h2>
                <p style={{ marginTop: 10 }}>{simulado.descricao}</p>

                <ul className="feature-list" style={{ marginTop: 16 }}>
                  {simulado.instrucoes.map((instrucao) => (
                    <li key={instrucao}>{instrucao}</li>
                  ))}
                </ul>

                <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
                  {simulado.questoes.map((questao, index) =>
                    questao ? (
                      <div key={questao.id} className="glass-card" style={{ padding: 18 }}>
                        <strong>
                          Questao {index + 1} · {questao.cargo}
                        </strong>
                        <p style={{ marginTop: 8 }}>{questao.enunciado}</p>
                        <p style={{ marginTop: 8 }}>
                          <strong>Disciplina:</strong> {questao.disciplina} · <strong>Gabarito:</strong> {questao.gabarito}
                        </p>
                      </div>
                    ) : null,
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

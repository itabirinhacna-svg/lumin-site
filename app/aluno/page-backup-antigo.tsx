import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { lessons, timeline } from "@/lib/data";
import { requireStudentAccess } from "@/lib/access";

export default async function StudentAreaPage() {
  const { user, purchase } = await requireStudentAccess();

  return (
    <>
      <SiteHeader ctaLabel="Meu plano" ctaHref="/checkout" />
      <main>
        <section className="dashboard-hero">
          <div className="page-shell">
            <div className="dashboard-grid">
              <article className="hero-card">
                <div className="eyebrow">Área do aluno</div>
                <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)" }}>Bem-vindo de volta, {user.name}.</h1>
                <p className="hero-copy">
                  Seu plano <strong>{purchase.planName}</strong> está ativo. Hoje o foco é revisão de Constitucional,
                  treino de questões e redação curta de manutenção.
                </p>
                <div className="tag-row">
                  <span className="pill">Plano ativo</span>
                  <span className="pill">Pagamento: {purchase.paymentMethod.toUpperCase()}</span>
                  <span className="pill">Compra confirmada</span>
                </div>
              </article>
              <article className="glass-card">
                <div className="kicker">Próxima meta</div>
                <h3>Fechar a semana sem acumular revisão</h3>
                <p>
                  Você está bem posicionada. Priorize 25 questões comentadas e depois avance para a aula de Direito
                  Administrativo.
                </p>
                <div className="actions">
                  <Link href="#biblioteca" className="btn">
                    Continuar estudos
                  </Link>
                  <Link href="/checkout" className="btn-ghost">
                    Upgrade de plano
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="page-shell">
            <div className="stats-grid">
              <article className="metric-card">
                <strong className="metric-value">82%</strong>
                <p>Aproveitamento em simulados recentes</p>
              </article>
              <article className="metric-card">
                <strong className="metric-value">126h</strong>
                <p>Tempo estudado no mês</p>
              </article>
              <article className="metric-card">
                <strong className="metric-value">312</strong>
                <p>Questões resolvidas na semana</p>
              </article>
              <article className="metric-card">
                <strong className="metric-value">9.1</strong>
                <p>Score de consistência</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="page-shell library-grid">
            <article className="table-card">
              <div className="kicker">Trilha atual</div>
              <h2 style={{ fontSize: "2.1rem" }}>Plano de execução das próximas semanas</h2>
              <table>
                <thead>
                  <tr>
                    <th>Período</th>
                    <th>Foco</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {timeline.map((item) => (
                    <tr key={item.week}>
                      <td>{item.week}</td>
                      <td>{item.focus}</td>
                      <td>
                        <span className={item.status === "Concluído" ? "status-ok" : "status-warn"}>{item.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>
            <article className="glass-card">
              <div className="kicker">Próximas revisões</div>
              <h3>Agenda inteligente de retenção</h3>
              <ul className="list-clean">
                <li>Hoje, 19h: Constitucional, princípios fundamentais</li>
                <li>Amanhã, 7h: 20 questões de Informática</li>
                <li>Sexta, 20h: revisão 7 dias de Português</li>
                <li>Domingo, 8h: simulado parcial com análise</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="section" id="biblioteca">
          <div className="page-shell">
            <div style={{ marginBottom: 24 }}>
              <div className="kicker">Biblioteca</div>
              <h2>Continue exatamente de onde você parou.</h2>
              <p>Essa área mostra o que mais importa para o aluno retornar com clareza e sem dispersão.</p>
            </div>
            <div className="section-grid">
              {lessons.map((lesson) => (
                <article className="lesson-card" key={lesson.title}>
                  <div className="kicker">{lesson.meta}</div>
                  <h3>{lesson.title}</h3>
                  <p>Aula priorizada pelo seu plano atual e pelo desempenho das últimas baterias de questões.</p>
                  <Link href="/aluno/aula-demo" className="btn-secondary">
                    Assistir aula
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

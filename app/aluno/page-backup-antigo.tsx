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
                <div className="eyebrow">Ãrea do aluno</div>
                <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)" }}>Bem-vindo de volta, {user.name}.</h1>
                <p className="hero-copy">
                  Seu plano <strong>{purchase.planName}</strong> estÃ¡ ativo. Hoje o foco Ã© revisÃ£o de Constitucional,
                  treino de questÃµes e redaÃ§Ã£o curta de manutenÃ§Ã£o.
                </p>
                <div className="tag-row">
                  <span className="pill">Plano ativo</span>
                  <span className="pill">Pagamento: {purchase.paymentMethod.toUpperCase()}</span>
                  <span className="pill">Compra confirmada</span>
                </div>
              </article>
              <article className="glass-card">
                <div className="kicker">PrÃ³xima meta</div>
                <h3>Fechar a semana sem acumular revisÃ£o</h3>
                <p>
                  VocÃª estÃ¡ bem posicionada. Priorize 25 questÃµes comentadas e depois avance para a aula de Direito
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
                <p>Tempo estudado no mÃªs</p>
              </article>
              <article className="metric-card">
                <strong className="metric-value">312</strong>
                <p>QuestÃµes resolvidas na semana</p>
              </article>
              <article className="metric-card">
                <strong className="metric-value">9.1</strong>
                <p>Score de consistÃªncia</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="page-shell library-grid">
            <article className="table-card">
              <div className="kicker">Trilha atual</div>
              <h2 style={{ fontSize: "2.1rem" }}>Plano de execuÃ§Ã£o das prÃ³ximas semanas</h2>
              <table>
                <thead>
                  <tr>
                    <th>PerÃ­odo</th>
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
                        <span className={item.status === "ConcluÃ­do" ? "status-ok" : "status-warn"}>{item.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>
            <article className="glass-card">
              <div className="kicker">PrÃ³ximas revisÃµes</div>
              <h3>Agenda inteligente de retenÃ§Ã£o</h3>
              <ul className="list-clean">
                <li>Hoje, 19h: Constitucional, princÃ­pios fundamentais</li>
                <li>AmanhÃ£, 7h: 20 questÃµes de InformÃ¡tica</li>
                <li>Sexta, 20h: revisÃ£o 7 dias de PortuguÃªs</li>
                <li>Domingo, 8h: simulado parcial com anÃ¡lise</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="section" id="biblioteca">
          <div className="page-shell">
            <div style={{ marginBottom: 24 }}>
              <div className="kicker">Biblioteca</div>
              <h2>Continue exatamente de onde vocÃª parou.</h2>
              <p>Essa Ã¡rea mostra o que mais importa para o aluno retornar com clareza e sem dispersÃ£o.</p>
            </div>
            <div className="section-grid">
              {lessons.map((lesson) => (
                <article className="lesson-card" key={lesson.title}>
                  <div className="kicker">{lesson.meta}</div>
                  <h3>{lesson.title}</h3>
                  <p>Aula priorizada pelo seu plano atual e pelo desempenho das Ãºltimas baterias de questÃµes.</p>
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


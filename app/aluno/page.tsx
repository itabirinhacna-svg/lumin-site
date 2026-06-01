import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { requireStudentAccess } from "@/lib/access";

const trilha = [
  { etapa: "Entenda", status: "Concluído" },
  { etapa: "Assista", status: "Concluído" },
  { etapa: "Leia", status: "Concluído" },
  { etapa: "Pratique", status: "Agora" },
  { etapa: "Revise", status: "Próximo" },
  { etapa: "Conclua", status: "Pendente" },
];

const modulos = [
  "Português",
  "Matemática",
  "Conhecimentos Específicos",
  "Simulados",
];

const revisoes = [
  "Português: interpretação de texto",
  "Matemática: operações fundamentais",
  "Específicos: conteúdo do cargo",
  "Revisão final da semana",
];

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
                <div className="eyebrow">Área do aluno BenThec</div>
                <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)" }}>
                  Continue sua trilha, {user.name}.
                </h1>
                <p className="hero-copy">
                  Seu plano <strong>{purchase.planName}</strong> está ativo. A preparação agora segue por etapas:
                  conteúdo, aula, material, questões, revisão e simulado.
                </p>
                <div className="tag-row">
                  <span className="pill">Aprova Água Doce</span>
                  <span className="pill">Trilha guiada</span>
                  <span className="pill">Acompanhamento ativo</span>
                </div>
              </article>

              <article className="glass-card">
                <div className="kicker">Próxima missão</div>
                <h3>Português · Etapa 4 de 6</h3>
                <p>
                  Agora o foco é praticar questões do conteúdo estudado e registrar os pontos de dúvida para revisão.
                </p>
                <div className="actions">
                  <Link href="#trilha" className="btn">
                    Continuar trilha
                  </Link>
                  <Link href="#atendimento" className="btn-ghost">
                    Falar com a equipe
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
                <strong className="metric-value">42%</strong>
                <p>Progresso da trilha atual</p>
              </article>
              <article className="metric-card">
                <strong className="metric-value">3/6</strong>
                <p>Etapas concluídas</p>
              </article>
              <article className="metric-card">
                <strong className="metric-value">4</strong>
                <p>Módulos principais</p>
              </article>
              <article className="metric-card">
                <strong className="metric-value">1</strong>
                <p>Simulado recomendado</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="trilha">
          <div className="page-shell library-grid">
            <article className="table-card">
              <div className="kicker">Trilha atual</div>
              <h2 style={{ fontSize: "2.1rem" }}>Aprova Água Doce · Plano de estudos</h2>
              <table>
                <thead>
                  <tr>
                    <th>Etapa</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {trilha.map((item) => (
                    <tr key={item.etapa}>
                      <td>{item.etapa}</td>
                      <td>
                        <span className={item.status === "Concluído" ? "status-ok" : "status-warn"}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>

            <article className="glass-card">
              <div className="kicker">Próximas revisões</div>
              <h3>Agenda de retenção</h3>
              <ul className="list-clean">
                {revisoes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="section" id="biblioteca">
          <div className="page-shell">
            <div style={{ marginBottom: 24 }}>
              <div className="kicker">Minhas trilhas</div>
              <h2>Estude por módulos, não por aulas soltas.</h2>
              <p>
                Cada módulo reúne orientação, videoaula curada, material de apoio, questões e revisão.
              </p>
            </div>

            <div className="section-grid">
              {modulos.map((modulo) => (
                <article className="lesson-card" key={modulo}>
                  <div className="kicker">Aprova Água Doce</div>
                  <h3>{modulo}</h3>
                  <p>
                    Módulo organizado para avançar com clareza, sem excesso de conteúdo e com foco no edital.
                  </p>
                  <Link href="/aluno/aula-demo" className="btn-secondary">
                    Abrir módulo
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="atendimento">
          <div className="page-shell">
            <article className="glass-card">
              <div className="kicker">Atendimento</div>
              <h3>Precisa de orientação?</h3>
              <p>
                Use o suporte da BenThec para tirar dúvidas sobre a trilha, organização dos estudos e próximos passos.
              </p>
              <div className="actions">
                <Link
                  href="https://wa.me/5527999850434?text=Olá,%20quero%20suporte%20na%20minha%20trilha%20BenThec."
                  className="btn"
                  target="_blank"
                >
                  Falar no WhatsApp
                </Link>
              </div>
            </article>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { requireStudentAccess } from "@/lib/access";
import { lessons, timeline } from "@/lib/data";

const trilha = [
  { etapa: "Entenda", status: "Concluido" },
  { etapa: "Assista", status: "Concluido" },
  { etapa: "Leia", status: "Concluido" },
  { etapa: "Pratique", status: "Agora" },
  { etapa: "Revise", status: "Proximo" },
  { etapa: "Conclua", status: "Pendente" }
];

const modulos = [
  {
    name: "Portugues e interpretacao",
    description: "Aulas, material resumido, questoes guiadas e revisao 24h/7d."
  },
  {
    name: "Matematica e raciocinio logico",
    description: "Base de fixacao para ganhar velocidade e reduzir erro bobo."
  },
  {
    name: "Conhecimentos especificos",
    description: "Blocos por edital, com foco no que mais cai para o seu cargo."
  },
  {
    name: "Simulados e reta final",
    description: "Treinos de prova, ajuste de estrategia e revisao orientada."
  }
];

const supportItems = [
  "Duvdas sobre o modulo atual",
  "Orientacao sobre ritmo e revisao",
  "Ajuste de trilha para edital"
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
                <div className="eyebrow">Area do aluno BENTHEC</div>
                <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)" }}>Continue sua trilha, {user.name}.</h1>
                <p className="hero-copy">
                  Seu plano <strong>{purchase.planName}</strong> esta ativo. A plataforma organiza seu estudo em
                  conteudo, aula, material, questoes, revisao e simulado.
                </p>
                <div className="tag-row">
                  <span className="pill">Compra confirmada</span>
                  <span className="pill">Trilha guiada</span>
                  <span className="pill">Acompanhamento ativo</span>
                </div>
              </article>

              <article className="glass-card">
                <div className="kicker">Painel rapido</div>
                <h3>Seu proximo passo esta claro</h3>
                <ul className="lesson-list">
                  <li>Plano ativo: {purchase.planName}</li>
                  <li>Status da matricula: liberada para estudo</li>
                  <li>Missao atual: pratica com questoes de Portugues</li>
                </ul>
                <div className="actions" style={{ marginTop: 18 }}>
                  <Link href="#trilha" className="btn">
                    Continuar trilha
                  </Link>
                  <Link href="#atendimento" className="btn-ghost">
                    Pedir suporte
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
                <p>Etapas concluidas</p>
              </article>
              <article className="metric-card">
                <strong className="metric-value">4</strong>
                <p>Modulos principais</p>
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
              <h2 style={{ fontSize: "2.1rem" }}>Plano de estudos com sequencia operacional</h2>
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
                        <span className={item.status === "Concluido" ? "status-ok" : "status-warn"}>{item.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>

            <article className="glass-card">
              <div className="kicker">Agenda recomendada</div>
              <h3>Proximas semanas</h3>
              <ul className="lesson-list">
                {timeline.map((item) => (
                  <li key={item.week}>
                    <strong>{item.week}</strong>: {item.focus}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="section" id="biblioteca">
          <div className="page-shell">
            <div style={{ marginBottom: 24 }}>
              <div className="kicker">Minha biblioteca</div>
              <h2>Estude por modulos, nao por acumulacao.</h2>
              <p>
                Cada modulo combina aula, material de apoio, pratica e revisao para manter ritmo e consistencia.
              </p>
            </div>

            <div className="section-grid">
              {modulos.map((modulo) => (
                <article className="lesson-card" key={modulo.name}>
                  <div className="kicker">{purchase.planName}</div>
                  <h3>{modulo.name}</h3>
                  <p>{modulo.description}</p>
                  <Link href="/aluno/aula-demo" className="btn-secondary">
                    Abrir modulo
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="page-shell library-grid">
            <article className="glass-card">
              <div className="kicker">Aulas para continuar</div>
              <h3>Fila de estudo</h3>
              <ul className="lesson-list">
                {lessons.map((lesson) => (
                  <li key={lesson.title}>
                    <strong>{lesson.title}</strong>
                    <br />
                    {lesson.meta}
                  </li>
                ))}
              </ul>
            </article>

            <article className="glass-card" id="atendimento">
              <div className="kicker">Atendimento</div>
              <h3>Suporte academico e operacional</h3>
              <ul className="lesson-list">
                {supportItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="actions" style={{ marginTop: 18 }}>
                <Link
                  href="https://wa.me/5527999850434?text=Ola,%20quero%20suporte%20na%20minha%20trilha%20BENTHEC."
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

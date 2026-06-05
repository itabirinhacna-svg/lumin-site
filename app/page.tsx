import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { disciplines, lessons, plans, securityPillars, stats, timeline } from "@/lib/data";

const pillars = [
  {
    title: "Venda com clareza",
    description: "Pacotes organizados por objetivo, com promessas concretas, diferenciais e CTA direto para compra."
  },
  {
    title: "Estudo com metodo",
    description: "O aluno entra, compra, recebe acesso e segue uma trilha guiada dentro da plataforma."
  },
  {
    title: "Operacao segura",
    description: "Sessao httpOnly, validacao no servidor, webhook assinado e area protegida por compra aprovada."
  }
];

const deliverables = [
  "Landing premium para concursos, ENEM e vestibulares",
  "Checkout com cadastro de conta, plano e forma de pagamento",
  "Area do aluno com trilha, biblioteca, revisoes e suporte",
  "Painel admin para acompanhar usuarios e compras"
];

export default function HomePage() {
  const featuredPlan = plans.find((plan) => plan.featured) ?? plans[0];

  return (
    <>
      <SiteHeader ctaLabel="Comprar agora" ctaHref="/checkout" />

      <main>
        <section className="hero">
          <div className="page-shell hero-grid">
            <article className="hero-card">
              <div className="eyebrow">Plataforma premium para concursos e ENEM</div>
              <h1>Venda os pacotes certos e entregue estudo real dentro do site.</h1>
              <p className="hero-copy">
                A BENTHEC foi estruturada para operar como produto educacional digital: vitrine comercial, checkout,
                criacao de conta, acesso protegido e area do aluno com trilhas de estudo, revisoes e acompanhamento.
              </p>

              <div className="actions">
                <Link href="/checkout" className="btn">
                  Ver pacotes e comprar
                </Link>
                <Link href="/aluno" className="btn-ghost">
                  Explorar area do aluno
                </Link>
              </div>

              <div className="hero-badges" style={{ marginTop: 20 }}>
                <span className="pill">Compra e acesso no mesmo fluxo</span>
                <span className="pill">Foco em retencao e recorrencia</span>
                <span className="pill">Pronto para evoluir para producao</span>
              </div>
            </article>

            <div className="hero-stack">
              <article className="glass-card hero-panel">
                <div className="kicker">Pacote em destaque</div>
                <h3>{featuredPlan.name}</h3>
                <p>{featuredPlan.description}</p>
                <div className="price">
                  <strong>{featuredPlan.price}</strong>
                  <span>{featuredPlan.installment}</span>
                </div>
                <ul className="feature-list">
                  {featuredPlan.features.slice(0, 3).map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </article>

              <article className="glass-card hero-panel">
                <div className="kicker">Dentro da experiencia</div>
                <ul className="lesson-list">
                  {deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="page-shell">
            <div className="stats-grid">
              {stats.map((stat) => (
                <article className="metric-card" key={stat.label}>
                  <strong className="metric-value">{stat.value}</strong>
                  <p>{stat.label}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="pacotes">
          <div className="page-shell">
            <div style={{ marginBottom: 24 }}>
              <div className="kicker">Pacotes disponiveis</div>
              <h2>Modelos de oferta para entrada, escala e premium.</h2>
              <p>
                Os planos ja estao organizados para atender desde quem precisa de base e rotina ate quem quer
                acompanhamento mais intenso para concursos e ENEM.
              </p>
            </div>

            <div className="plan-grid">
              {plans.map((plan) => (
                <article className={`plan-card${plan.featured ? " featured" : ""}`} key={plan.id}>
                  {plan.featured ? <span className="plan-badge">Mais vendido</span> : null}
                  <div className="kicker">{plan.audience}</div>
                  <h3>{plan.name}</h3>
                  <p>{plan.description}</p>
                  <div className="price">
                    <strong>{plan.price}</strong>
                    <span>{plan.installment}</span>
                  </div>
                  <ul className="feature-list">
                    {plan.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  <div className="actions" style={{ marginTop: 18 }}>
                    <Link href={`/checkout?plan=${plan.id}`} className="btn">
                      Escolher plano
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="metodo">
          <div className="page-shell section-grid">
            {pillars.map((pillar) => (
              <article className="glass-card" key={pillar.title}>
                <div className="kicker">Pilar</div>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="page-shell cta-strip">
            <div>
              <div className="eyebrow">Trilha de estudo</div>
              <h2>O aluno nao compra so aulas. Compra direcao.</h2>
              <p>
                A experiencia da plataforma foi desenhada para reduzir abandono: rotina clara, modulos organizados,
                revisoes recomendadas e proximo passo sempre visivel.
              </p>
            </div>
            <div className="glass-card" style={{ background: "rgba(255,255,255,0.12)", borderColor: "rgba(255,255,255,0.15)" }}>
              <div className="kicker" style={{ color: "rgba(255,255,255,0.75)" }}>Semana do aluno</div>
              <ul className="lesson-list">
                {timeline.map((item) => (
                  <li key={item.week}>
                    <strong>{item.week}</strong>: {item.focus}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="page-shell library-grid">
            <article className="table-card">
              <div className="kicker">Biblioteca de aprendizagem</div>
              <h2>Disciplinas e conteudos com cara de plataforma.</h2>
              <table>
                <thead>
                  <tr>
                    <th>Frente</th>
                    <th>Objetivo</th>
                  </tr>
                </thead>
                <tbody>
                  {disciplines.map((discipline, index) => (
                    <tr key={discipline}>
                      <td>{discipline}</td>
                      <td>{index < 2 ? "Base e constancia" : "Aprofundamento e prova"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>

            <article className="glass-card">
              <div className="kicker">Aulas em destaque</div>
              <h3>Exemplos de conteudo que o aluno encontra depois da compra</h3>
              <ul className="lesson-list">
                {lessons.map((lesson) => (
                  <li key={lesson.title}>
                    <strong>{lesson.title}</strong>
                    <br />
                    {lesson.meta}
                  </li>
                ))}
              </ul>
              <div className="actions" style={{ marginTop: 18 }}>
                <Link href="/aluno/aula-demo" className="btn-secondary">
                  Ver aula demonstrativa
                </Link>
              </div>
            </article>
          </div>
        </section>

        <section className="section" id="seguranca">
          <div className="page-shell">
            <div style={{ marginBottom: 24 }}>
              <div className="kicker">Seguranca e confiabilidade</div>
              <h2>Fundacao pronta para operar com mais controle.</h2>
              <p>
                O projeto nao esta so bonito. Ele ja organiza sessao, acesso, compra e validacoes para suportar uma
                operacao educacional digital com mais seriedade.
              </p>
            </div>

            <div className="section-grid">
              {securityPillars.map((pillar) => (
                <article className="glass-card" key={pillar}>
                  <div className="kicker">Controle</div>
                  <p>{pillar}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="page-shell">
            <div className="cta-strip">
              <div>
                <div className="eyebrow">Pronto para conversao</div>
                <h2>Agora o fluxo ficou claro: mostrar, vender, liberar e reter.</h2>
                <p>
                  O aluno conhece os pacotes, compra, cria conta e segue estudando dentro da plataforma. Essa e a base
                  certa para depois conectar gateway real, banco gerenciado e observabilidade.
                </p>
              </div>
              <div className="actions" style={{ alignItems: "center", justifyContent: "center" }}>
                <Link href="/checkout" className="btn">
                  Ir para checkout
                </Link>
                <Link href="/login" className="btn-ghost" style={{ color: "white", borderColor: "rgba(255,255,255,0.2)" }}>
                  Entrar na plataforma
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

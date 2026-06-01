import Link from "next/link";
import { SectionTitle } from "@/components/section-title";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { disciplines, lessons, plans, securityPillars, stats } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero">
          <div className="page-shell hero-grid">
            <div className="hero-card">
              <span className="eyebrow">Plataforma premium para aprovação real</span>
              <h1>Venda pacotes, retenha alunos e entregue estudo sério dentro do seu próprio site.</h1>
              <p className="hero-copy">
                Estrutura pensada para o mercado educacional digital: vitrine forte, checkout claro, área do aluno
                elegante e uma jornada de estudo que transmite valor desde o primeiro acesso.
              </p>
              <div className="actions">
                <Link href="/checkout" className="btn">
                  Ver pacote principal
                </Link>
                <Link href="/aluno" className="btn-ghost">
                  Explorar área do aluno
                </Link>
              </div>
              <div className="hero-badges" style={{ marginTop: 22 }}>
                <span className="tag">Concursos</span>
                <span className="tag">ENEM</span>
                <span className="tag">Mentoria</span>
                <span className="tag">Biblioteca digital</span>
              </div>
            </div>
            <div className="hero-stack">
              <div className="glass-card hero-panel">
                <div className="kicker">Performance comercial</div>
                <h3>Landing, oferta e prova de valor</h3>
                <p>Pacotes com narrativa premium, diferenciação por perfil e CTA forte para reduzir atrito de compra.</p>
              </div>
              <div className="glass-card hero-panel">
                <div className="kicker">Entrega contínua</div>
                <h3>Aluno compra e já entra para estudar</h3>
                <p>Conteúdo organizado por trilha, progresso, aulas em destaque e materiais para retenção.</p>
              </div>
              <div className="glass-card hero-panel">
                <div className="kicker">Segurança operacional</div>
                <h3>Acesso controlado por plano</h3>
                <p>Base pronta para autenticação forte, autorização por compra e auditoria de uso.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="page-shell">
            <div className="stats-grid">
              {stats.map((item) => (
                <article className="metric-card" key={item.label}>
                  <strong className="metric-value">{item.value}</strong>
                  <p>{item.label}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="metodo">
          <div className="page-shell">
            <SectionTitle
              kicker="Método"
              title="Arquitetura de produto para quem vende educação e precisa que o aluno permaneça."
              description="O site foi desenhado para equilibrar aquisição, credibilidade e experiência de estudo. Isso importa no educacional porque a compra é emocional, mas a retenção depende da entrega."
            />
            <div className="section-grid">
              <article className="glass-card">
                <h3>Jornada de conversão</h3>
                <p>Hero com posicionamento, prova social, pacotes objetivos e CTA distribuído pela página.</p>
              </article>
              <article className="glass-card">
                <h3>Experiência do aluno</h3>
                <p>Dashboard com progresso, agenda de revisão, aulas recomendadas e biblioteca filtrável.</p>
              </article>
              <article className="glass-card">
                <h3>Escala operacional</h3>
                <p>Base preparada para gestão de produtos, matrículas, relatórios e futuros fluxos de afiliados.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="pacotes">
          <div className="page-shell">
            <SectionTitle
              kicker="Pacotes"
              title="Ofertas premium para diferentes momentos da jornada."
              description="Cada plano comunica um nível de profundidade, suporte e velocidade de resultado. Isso ajuda a aumentar ticket sem confundir a escolha."
            />
            <div className="plan-grid">
              {plans.map((plan) => (
                <article className={`plan-card${plan.featured ? " featured" : ""}`} key={plan.name}>
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
                  <div style={{ marginTop: 18 }}>
                    <Link href="/checkout" className={plan.featured ? "btn" : "btn-secondary"}>
                      Selecionar plano
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="page-shell">
            <SectionTitle
              kicker="Conteúdo"
              title="Biblioteca organizada para estudo de verdade, não só para parecer completa."
              description="O aluno precisa enxergar caminho. Em vez de uma área confusa cheia de aulas soltas, a proposta aqui é priorizar sequenciamento, revisão e foco por objetivo."
            />
            <div className="section-grid">
              <article className="glass-card">
                <h3>Disciplinas centrais</h3>
                <ul className="list-clean">
                  {disciplines.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="glass-card">
                <h3>Aulas em destaque</h3>
                <ul className="lesson-list">
                  {lessons.map((lesson) => (
                    <li key={lesson.title}>
                      <strong>{lesson.title}</strong>
                      <p>{lesson.meta}</p>
                    </li>
                  ))}
                </ul>
              </article>
              <article className="glass-card">
                <h3>Ativos de retenção</h3>
                <ul className="list-clean">
                  <li>Trilhas por edital</li>
                  <li>Simulados e correção comentada</li>
                  <li>Redações, discursivas e feedback</li>
                  <li>Alertas de revisão e consistência</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="seguranca">
          <div className="page-shell">
            <div className="cta-strip">
              <div>
                <div className="kicker" style={{ color: "rgba(255,255,255,0.7)" }}>
                  Segurança e operação
                </div>
                <h2>Seu produto educacional precisa passar confiança antes e depois da compra.</h2>
                <p>
                  A base construída já separa a camada pública da área autenticada e deixa espaço claro para autenticação,
                  cobrança, liberação de conteúdo e observabilidade.
                </p>
              </div>
              <ul className="feature-list">
                {securityPillars.map((pillar) => (
                  <li key={pillar}>{pillar}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

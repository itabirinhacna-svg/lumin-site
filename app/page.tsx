import Link from "next/link";
import { LogoProposals } from "@/components/logo-proposals";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCuradoriaOverview } from "@/lib/curadoria";
import { getCatalogProducts, getAprovaGroups } from "@/lib/produtos";
import { getQuestoesOverview } from "@/lib/questoes";
import { redacaoPlanos } from "@/lib/redacao";
import { getSimuladosResolvidos } from "@/lib/simulados";

export default function HomePage() {
  const overview = getCuradoriaOverview();
  const products = getCatalogProducts();
  const aguaDoceGroups = getAprovaGroups();
  const questionsOverview = getQuestoesOverview();
  const simulados = getSimuladosResolvidos();

  return (
    <>
      <SiteHeader ctaLabel="Quero organizar meus estudos" ctaHref="/checkout" />

      <main className="catalog-home">
        <style>{`
          .catalog-home {
            min-height: 100vh;
            background:
              radial-gradient(circle at top left, rgba(197,139,0,.14), transparent 24%),
              radial-gradient(circle at top right, rgba(255,255,255,.04), transparent 20%),
              linear-gradient(180deg, #020617 0%, #0f172a 56%, #020617 100%);
            color: #fff;
          }

          .catalog-shell {
            width: min(1180px, calc(100% - 28px));
            margin: 0 auto;
          }

          .catalog-section {
            padding: 24px 0 52px;
          }

          .catalog-hero,
          .catalog-grid,
          .catalog-stats,
          .catalog-groups,
          .catalog-steps {
            display: grid;
            gap: 16px;
          }

          .catalog-copy h1,
          .catalog-copy p,
          .catalog-card h2,
          .catalog-card h3,
          .catalog-card p,
          .catalog-head h2,
          .catalog-head p {
            margin: 0;
          }

          .catalog-copy,
          .catalog-hero-panel {
            display: grid;
            gap: 14px;
          }

          .catalog-copy h1 {
            max-width: 8ch;
            font-size: clamp(3.2rem, 12vw, 5.9rem);
            line-height: .92;
            letter-spacing: -.08em;
          }

          .catalog-copy p,
          .catalog-card p,
          .catalog-head p,
          .catalog-card li {
            color: #cbd5e1;
            line-height: 1.72;
          }

          .catalog-badge {
            width: fit-content;
            min-height: 34px;
            display: inline-flex;
            align-items: center;
            padding: 0 14px;
            border-radius: 999px;
            background: rgba(197,139,0,.12);
            border: 1px solid rgba(197,139,0,.24);
            color: #f3cf6f;
            font-size: 12px;
            font-weight: 900;
            letter-spacing: .08em;
            text-transform: uppercase;
          }

          .catalog-eyebrow {
            color: #e2e8f0;
            font-size: .98rem;
            font-weight: 600;
            max-width: 38ch;
          }

          .catalog-actions,
          .catalog-links,
          .catalog-pills {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
          }

          .catalog-btn,
          .catalog-btn-ghost,
          .catalog-link {
            min-height: 48px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0 20px;
            border-radius: 999px;
            text-decoration: none;
            font-weight: 900;
          }

          .catalog-btn {
            background: linear-gradient(135deg, #c58b00, #9b6b00);
            color: #fff;
            box-shadow: 0 18px 36px rgba(197,139,0,.24);
          }

          .catalog-btn-ghost,
          .catalog-link {
            color: #fff;
            background: rgba(255,255,255,.04);
            border: 1px solid rgba(255,255,255,.12);
          }

          .catalog-card,
          .catalog-stat {
            border-radius: 28px;
            background: rgba(15,23,42,.78);
            border: 1px solid rgba(255,255,255,.08);
            box-shadow: 0 18px 48px rgba(2,6,23,.24);
            padding: 22px;
          }

          .catalog-pill {
            min-height: 36px;
            display: inline-flex;
            align-items: center;
            padding: 0 12px;
            border-radius: 999px;
            background: rgba(255,255,255,.05);
            border: 1px solid rgba(255,255,255,.08);
            color: #e2e8f0;
            font-size: 13px;
            font-weight: 800;
          }

          .catalog-hero-panel {
            align-content: start;
          }

          .catalog-stack {
            display: grid;
            gap: 12px;
          }

          .catalog-mini-grid {
            display: grid;
            gap: 12px;
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .catalog-mini-card {
            border-radius: 22px;
            background: rgba(255,255,255,.04);
            border: 1px solid rgba(255,255,255,.08);
            padding: 16px;
          }

          .catalog-mini-card strong {
            display: block;
            font-size: 1.1rem;
            margin-bottom: 4px;
          }

          .catalog-stat strong {
            display: block;
            margin-bottom: 8px;
            font-size: 2rem;
            line-height: 1;
          }

          .catalog-list {
            padding: 0;
            margin: 0;
            list-style: none;
            display: grid;
            gap: 10px;
          }

          .catalog-list li {
            position: relative;
            padding-left: 18px;
          }

          .catalog-list li::before {
            content: "";
            position: absolute;
            left: 0;
            top: 10px;
            width: 7px;
            height: 7px;
            border-radius: 999px;
            background: #c58b00;
          }

          @media (min-width: 980px) {
            .catalog-hero {
              grid-template-columns: .95fr 1.05fr;
              align-items: start;
            }

            .catalog-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }

            .catalog-stats {
              grid-template-columns: repeat(4, minmax(0, 1fr));
            }

            .catalog-groups {
              grid-template-columns: repeat(3, minmax(0, 1fr));
            }

            .catalog-steps {
              grid-template-columns: repeat(3, minmax(0, 1fr));
            }
          }
        `}</style>

        <section className="catalog-section">
          <div className="catalog-shell">
            <div className="catalog-hero">
              <div className="catalog-copy">
                <span className="catalog-badge">BenThec</span>
                <h1>Voce nao precisa estudar sozinho.</h1>
                <p className="catalog-eyebrow">Assista, leia e pratique no mesmo fluxo. Seu proximo passo aparece logo na entrada.</p>
                <div className="catalog-actions">
                  <Link href="/checkout" className="catalog-btn">
                    Quero organizar meus estudos
                  </Link>
                  <Link href="/login" className="catalog-btn-ghost">
                    Ja tenho conta
                  </Link>
                </div>
                <div className="catalog-pills">
                  <span className="catalog-pill">Curso por cargo</span>
                  <span className="catalog-pill">Acompanhamento visivel</span>
                  <span className="catalog-pill">Leitura, video e pratica</span>
                </div>
              </div>

              <div className="catalog-hero-panel">
                <article className="catalog-card">
                  <span className="catalog-badge">Assinaturas ativas</span>
                  <div className="catalog-mini-grid" style={{ marginTop: 14 }}>
                    <div className="catalog-mini-card">
                      <strong>Aprova Agua Doce</strong>
                      <p>Trilhas por cargo</p>
                    </div>
                    <div className="catalog-mini-card">
                      <strong>Redacao</strong>
                      <p>ENEM e concursos</p>
                    </div>
                    <div className="catalog-mini-card">
                      <strong>PMES</strong>
                      <p>Produto em construcao</p>
                    </div>
                    <div className="catalog-mini-card">
                      <strong>ENEM</strong>
                      <p>Frente futura</p>
                    </div>
                  </div>
                  <div className="catalog-links" style={{ marginTop: 18 }}>
                    <Link href="/produtos/aprova-agua-doce" className="catalog-link">
                      Ver Aprova Agua Doce
                    </Link>
                    <Link href="/redacao" className="catalog-link">
                      Abrir Redacao
                    </Link>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="catalog-section" id="catalogo">
          <div className="catalog-shell">
            <div className="catalog-head" style={{ display: "grid", gap: 12, marginBottom: 24 }}>
              <span className="catalog-badge">Escolha seu caminho</span>
              <h2>O que voce compra aqui.</h2>
              <p>Cada produto foi separado para a pessoa entender rapido se ja pode entrar agora ou se ainda vai esperar a proxima abertura.</p>
            </div>

            <div className="catalog-grid">
              {products.map((product) => (
                <article className="catalog-card" key={product.slug}>
                  <span className="catalog-badge">{product.status}</span>
                  <h3 style={{ marginTop: 12 }}>{product.title}</h3>
                  <p style={{ marginTop: 10 }}>{product.audience}</p>
                  <ul className="catalog-list" style={{ marginTop: 16 }}>
                    {product.benefits.slice(0, 3).map((benefit) => (
                      <li key={benefit}>{benefit}</li>
                    ))}
                  </ul>
                  <div className="catalog-links" style={{ marginTop: 18 }}>
                    <Link href={product.ctaHref} className="catalog-btn">
                      {product.ctaLabel}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="catalog-section">
          <div className="catalog-shell">
            <div className="catalog-stats">
              <article className="catalog-stat">
                <strong>{overview.trackCount}</strong>
                <p>Cargos e trilhas reais no Aprova Agua Doce.</p>
              </article>
              <article className="catalog-stat">
                <strong>{overview.pdfCount}</strong>
                <p>PDFs visiveis e acessiveis pela interface.</p>
              </article>
              <article className="catalog-stat">
                <strong>{questionsOverview.totalQuestoes}</strong>
                <p>Questoes autorais integradas ao fluxo.</p>
              </article>
              <article className="catalog-stat">
                <strong>{simulados.length}</strong>
                <p>Simulados iniciais por area ja liberados.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="catalog-section" id="agua-doce">
          <div className="catalog-shell">
            <div className="catalog-head" style={{ display: "grid", gap: 12, marginBottom: 24 }}>
              <span className="catalog-badge">Aprova Agua Doce</span>
              <h2>O curso conversa com o cargo da pessoa.</h2>
              <p>Operacionais, saude e magisterio aparecem separados, com pagina propria para cada cargo que ja esta no acervo.</p>
            </div>

            <div className="catalog-groups">
              {aguaDoceGroups.map((group) => (
                <article className="catalog-card" key={group.slug}>
                  <span className="catalog-badge">{group.title}</span>
                  <h3 style={{ marginTop: 12 }}>{group.tracks.length} trilhas liberadas</h3>
                  <ul className="catalog-list" style={{ marginTop: 16 }}>
                    {group.tracks.slice(0, 4).map((track) => (
                      <li key={track.slug}>
                        <strong>{track.titulo}</strong>
                        <br />
                        {track.materiais.length} materiais
                      </li>
                    ))}
                  </ul>
                  <div className="catalog-links" style={{ marginTop: 18 }}>
                    <Link href="/produtos/aprova-agua-doce" className="catalog-link">
                      Ver cargos
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="catalog-section" id="metodo">
          <div className="catalog-shell">
            <div className="catalog-head" style={{ display: "grid", gap: 12, marginBottom: 24 }}>
              <span className="catalog-badge">Por que comprar aqui</span>
              <h2>A compra nao termina no checkout.</h2>
              <p>Depois da compra, a pessoa entra e ja encontra o primeiro passo sem precisar procurar.</p>
            </div>

            <div className="catalog-steps">
              <article className="catalog-card">
                <span className="catalog-badge">1. Cargo certo</span>
                <h3 style={{ marginTop: 12 }}>O aluno entra no curso do proprio cargo.</h3>
              </article>
              <article className="catalog-card">
                <span className="catalog-badge">2. Proximo passo</span>
                <h3 style={{ marginTop: 12 }}>Tudo importante fica a poucos cliques.</h3>
              </article>
              <article className="catalog-card">
                <span className="catalog-badge">3. Expansao</span>
                <h3 style={{ marginTop: 12 }}>Redacao, PMES e ENEM entram sem bagunca.</h3>
              </article>
            </div>

            <div className="catalog-links" style={{ marginTop: 24 }}>
              <Link href="/checkout" className="catalog-btn">
                Comprar agora
              </Link>
              <Link href="/area" className="catalog-btn-ghost">
                Ver ambiente do aluno
              </Link>
            </div>
          </div>
        </section>

        <section className="catalog-section">
          <div className="catalog-shell">
            <div className="catalog-grid">
              <article className="catalog-card">
                <span className="catalog-badge">Redacao</span>
                <h3 style={{ marginTop: 12 }}>Redacao com acompanhamento de verdade.</h3>
                <ul className="catalog-list" style={{ marginTop: 16 }}>
                  {redacaoPlanos.map((plan) => (
                    <li key={plan.slug}>
                      <strong>{plan.title}</strong>
                      <br />
                      {plan.price} e {plan.features[0].toLowerCase()}
                    </li>
                  ))}
                </ul>
                <div className="catalog-links" style={{ marginTop: 18 }}>
                  <Link href="/redacao" className="catalog-link">
                    Abrir produto de redacao
                  </Link>
                </div>
              </article>

              <article className="catalog-card">
                <span className="catalog-badge">Futuro comercial</span>
                <h3 style={{ marginTop: 12 }}>PMES, ENEM e futuras trilhas ja aparecem de forma separada.</h3>
                <p style={{ marginTop: 10 }}>
                  Assim a pessoa entende o que ja pode comprar agora e o que ainda esta chegando.
                </p>
                <div className="catalog-links" style={{ marginTop: 18 }}>
                  <Link href="/pmes" className="catalog-link">
                    Ver PMES
                  </Link>
                  <Link href="/enem" className="catalog-link">
                    Ver ENEM
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="catalog-section">
          <div className="catalog-shell">
            <div className="catalog-head" style={{ display: "grid", gap: 12, marginBottom: 24 }}>
              <span className="catalog-badge">Marca BenThec</span>
              <h2>Trilha, crescimento e aprovacao.</h2>
              <p>Separei tres caminhos visuais para a marca carregar mais sentido e emocao.</p>
            </div>
            <LogoProposals />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

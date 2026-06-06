import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { curadoria, estruturaFutura, getCuradoriaOverview, getFeaturedTrack } from "@/lib/curadoria";

const journey = [
  "Diagnostico e trilha",
  "Apostilas liberadas",
  "Estudo guiado",
  "Revisao por etapa",
  "Suporte proximo",
  "Aprovacao",
];

export default function HomePage() {
  const overview = getCuradoriaOverview();
  const featuredTrack = getFeaturedTrack();

  return (
    <>
      <SiteHeader ctaLabel="Comecar" ctaHref="/checkout" />

      <main className="benthec-launch-home">
        <style>{`
          .benthec-launch-home {
            min-height: 100vh;
            background:
              radial-gradient(circle at top left, rgba(197,139,0,.14), transparent 22%),
              radial-gradient(circle at top right, rgba(255,255,255,.06), transparent 20%),
              linear-gradient(180deg, #020617 0%, #0f172a 52%, #020617 100%);
            color: #ffffff;
          }

          .bl-shell {
            width: min(1140px, calc(100% - 28px));
            margin: 0 auto;
          }

          .bl-section {
            padding: 28px 0 72px;
          }

          .bl-hero {
            display: grid;
            gap: 20px;
            padding-top: 24px;
          }

          .bl-badge {
            width: fit-content;
            min-height: 34px;
            display: inline-flex;
            align-items: center;
            padding: 0 14px;
            border-radius: 999px;
            border: 1px solid rgba(197,139,0,.24);
            background: rgba(197,139,0,.12);
            color: #f3cf6f;
            font-size: 12px;
            font-weight: 900;
            letter-spacing: .08em;
            text-transform: uppercase;
          }

          .bl-copy,
          .bl-head {
            display: grid;
            gap: 16px;
          }

          .bl-copy h1,
          .bl-copy p,
          .bl-head h2,
          .bl-head p,
          .bl-card h3,
          .bl-card p {
            margin: 0;
          }

          .bl-copy h1 {
            max-width: 10ch;
            font-size: clamp(3rem, 14vw, 5.5rem);
            line-height: .93;
            letter-spacing: -.08em;
          }

          .bl-copy p,
          .bl-head p,
          .bl-card p,
          .bl-list li {
            color: #cbd5e1;
            line-height: 1.75;
          }

          .bl-actions,
          .bl-chip-row {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
          }

          .bl-btn,
          .bl-btn-ghost {
            min-height: 50px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0 20px;
            border-radius: 999px;
            text-decoration: none;
            font-weight: 900;
          }

          .bl-btn {
            background: linear-gradient(135deg, #c58b00, #9b6b00);
            color: #ffffff;
            box-shadow: 0 18px 36px rgba(197,139,0,.28);
          }

          .bl-btn-ghost {
            border: 1px solid rgba(255,255,255,.12);
            background: rgba(255,255,255,.04);
            color: #ffffff;
          }

          .bl-chip,
          .bl-status {
            min-height: 36px;
            display: inline-flex;
            align-items: center;
            padding: 0 12px;
            border-radius: 999px;
            border: 1px solid rgba(255,255,255,.08);
            background: rgba(255,255,255,.05);
            color: #e2e8f0;
            font-size: 13px;
            font-weight: 800;
          }

          .bl-app,
          .bl-card,
          .bl-stat,
          .bl-track,
          .bl-journey-item {
            border-radius: 28px;
            border: 1px solid rgba(255,255,255,.08);
            background: rgba(15,23,42,.72);
            box-shadow: 0 18px 48px rgba(2,6,23,.24);
          }

          .bl-app {
            display: grid;
            gap: 16px;
            padding: 18px;
          }

          .bl-app-top,
          .bl-track-top {
            display: flex;
            justify-content: space-between;
            gap: 14px;
            align-items: flex-start;
          }

          .bl-app-top strong,
          .bl-track-top strong {
            display: block;
            font-size: 1.1rem;
          }

          .bl-app-top span,
          .bl-track-top span {
            display: block;
            margin-top: 4px;
            color: #94a3b8;
            font-size: 13px;
          }

          .bl-app-grid,
          .bl-stats,
          .bl-track-grid,
          .bl-grid-3,
          .bl-journey,
          .bl-pmes {
            display: grid;
            gap: 14px;
          }

          .bl-menu {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px;
            padding: 12px;
            border-radius: 22px;
            border: 1px solid rgba(255,255,255,.08);
            background: rgba(255,255,255,.04);
          }

          .bl-menu span {
            min-height: 42px;
            display: grid;
            place-items: center;
            border-radius: 14px;
            background: rgba(255,255,255,.03);
            color: #cbd5e1;
            font-size: 12px;
            font-weight: 800;
            text-align: center;
            padding: 0 10px;
          }

          .bl-menu span:first-child {
            background: linear-gradient(135deg, #c58b00, #9b6b00);
            color: #ffffff;
          }

          .bl-preview {
            border-radius: 24px;
            background: #ffffff;
            color: #0f172a;
            padding: 22px;
          }

          .bl-preview p {
            color: #475569;
          }

          .bl-preview-grid {
            display: grid;
            gap: 10px;
            margin-top: 16px;
          }

          .bl-preview-grid span {
            display: flex;
            justify-content: space-between;
            gap: 12px;
            padding: 12px 14px;
            border-radius: 16px;
            background: #e2e8f0;
            color: #334155;
            font-size: 14px;
            font-weight: 800;
          }

          .bl-preview-grid b {
            color: #15803d;
          }

          .bl-stat,
          .bl-card,
          .bl-track,
          .bl-journey-item {
            padding: 22px;
          }

          .bl-stat strong {
            display: block;
            margin-bottom: 10px;
            font-size: 2rem;
            line-height: 1;
          }

          .bl-track {
            display: grid;
            gap: 16px;
          }

          .bl-track-list {
            padding: 0;
            margin: 0;
            list-style: none;
            display: grid;
            gap: 10px;
          }

          .bl-track-list li {
            position: relative;
            padding-left: 18px;
          }

          .bl-track-list li::before {
            content: "";
            position: absolute;
            left: 0;
            top: 10px;
            width: 7px;
            height: 7px;
            border-radius: 999px;
            background: #c58b00;
          }

          .bl-links {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }

          .bl-link {
            min-height: 42px;
            display: inline-flex;
            align-items: center;
            padding: 0 14px;
            border-radius: 999px;
            border: 1px solid rgba(255,255,255,.08);
            background: rgba(255,255,255,.04);
            color: #ffffff;
            text-decoration: none;
            font-weight: 800;
          }

          .bl-list {
            padding: 0;
            margin: 0;
            list-style: none;
            display: grid;
            gap: 12px;
          }

          .bl-list li {
            position: relative;
            padding-left: 18px;
          }

          .bl-list li::before {
            content: "";
            position: absolute;
            left: 0;
            top: 10px;
            width: 7px;
            height: 7px;
            border-radius: 999px;
            background: #15803d;
          }

          .bl-journey-item {
            text-align: center;
          }

          .bl-journey-num {
            width: 42px;
            height: 42px;
            display: grid;
            place-items: center;
            margin: 0 auto 12px;
            border-radius: 14px;
            background: rgba(197,139,0,.14);
            color: #f3cf6f;
            font-weight: 900;
          }

          @media (min-width: 960px) {
            .bl-hero {
              grid-template-columns: .92fr 1.08fr;
              align-items: center;
              gap: 38px;
            }

            .bl-app-grid {
              grid-template-columns: 180px 1fr;
            }

            .bl-menu {
              grid-template-columns: 1fr;
              align-content: start;
            }

            .bl-stats {
              grid-template-columns: repeat(4, minmax(0, 1fr));
            }

            .bl-grid-3 {
              grid-template-columns: repeat(3, minmax(0, 1fr));
            }

            .bl-track-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }

            .bl-journey {
              grid-template-columns: repeat(6, minmax(0, 1fr));
            }

            .bl-pmes {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }
        `}</style>

        <section className="bl-section" id="inicio">
          <div className="bl-shell">
            <div className="bl-hero">
              <div className="bl-copy">
                <span className="bl-badge">Preparacao acompanhada BenThec</span>
                <h1>Voce nao precisa estudar sozinho.</h1>
                <p>
                  Plano de estudos. Acompanhamento proximo. Questoes. Videoaulas. Tudo organizado para levar voce ate
                  a aprovacao.
                </p>

                <div className="bl-actions">
                  <Link href="/checkout" className="bl-btn">
                    Quero organizar meus estudos
                  </Link>
                  <Link href="/login" className="bl-btn-ghost">
                    Ja tenho conta
                  </Link>
                </div>

                <div className="bl-chip-row">
                  <span className="bl-chip">Aprova Agua Doce</span>
                  <span className="bl-chip">{overview.trackCount} trilhas reais</span>
                  <span className="bl-chip">{overview.pdfCount} PDFs integraveis</span>
                </div>
              </div>

              <div className="bl-app">
                <div className="bl-app-top">
                  <div>
                    <strong>Continue sua trilha</strong>
                    <span>{featuredTrack.titulo}</span>
                  </div>
                  <span className="bl-status">{featuredTrack.bibliotecaStatus}</span>
                </div>

                <div className="bl-app-grid">
                  <aside className="bl-menu">
                    <span>Inicio</span>
                    <span>Minha Trilha</span>
                    <span>Materiais</span>
                    <span>Biblioteca</span>
                    <span>Suporte</span>
                  </aside>

                  <article className="bl-preview">
                    <h3>{featuredTrack.titulo}</h3>
                    <p>{featuredTrack.resumo}</p>

                    <div className="bl-preview-grid">
                      {featuredTrack.checklist.slice(0, 5).map((step, index) => (
                        <span key={step}>
                          {step}
                          <b>{index < 3 ? "liberado" : index === 3 ? "em foco" : "proximo"}</b>
                        </span>
                      ))}
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bl-section">
          <div className="bl-shell">
            <div className="bl-stats">
              <article className="bl-stat">
                <strong>{overview.trackCount}</strong>
                <p>Trilhas organizadas para o Aprova Agua Doce.</p>
              </article>
              <article className="bl-stat">
                <strong>{overview.materialCount}</strong>
                <p>Materiais mapeados com curadoria real por cargo.</p>
              </article>
              <article className="bl-stat">
                <strong>{overview.pdfCount}</strong>
                <p>PDFs prontos para estudo e download dentro da plataforma.</p>
              </article>
              <article className="bl-stat">
                <strong>{overview.readyTrackCount}</strong>
                <p>Trilhas com biblioteca completa em PDF e Markdown.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="bl-section" id="agua-doce">
          <div className="bl-shell">
            <div className="bl-head" style={{ marginBottom: 24 }}>
              <span className="bl-badge">Aprova Agua Doce</span>
              <h2>O lancamento ja tem curadoria, biblioteca e cargos mapeados.</h2>
              <p>
                Cada trilha foi montada sobre o acervo pedagogico real produzido para o edital, sem depender de copy
                comercial generica ou pacotes inventados.
              </p>
            </div>

            <div className="bl-track-grid">
              {curadoria.map((group) => (
                <article className="bl-card" key={group.slug}>
                  <div className="bl-track-top">
                    <div>
                      <strong>{group.title}</strong>
                      <span>{group.description}</span>
                    </div>
                    <span className="bl-status">{group.tracks.length} trilhas</span>
                  </div>

                  <ul className="bl-track-list">
                    {group.tracks.map((track) => (
                      <li key={track.slug}>
                        <strong>{track.titulo}</strong>
                        <br />
                        {track.materiais.length} materiais reais · {track.bibliotecaStatus}
                      </li>
                    ))}
                  </ul>

                  <div className="bl-links">
                    <Link href="/trilhas" className="bl-link">
                      Ver trilhas
                    </Link>
                    <Link href="/login" className="bl-link">
                      Entrar no AVA
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bl-section" id="metodo">
          <div className="bl-shell">
            <div className="bl-head" style={{ marginBottom: 24 }}>
              <span className="bl-badge">Metodo BenThec</span>
              <h2>Direcao clara para transformar apostila em progresso real.</h2>
              <p>
                A plataforma nao vende so acesso. Ela organiza a rotina do aluno em sequencia de estudo, biblioteca,
                revisao e acompanhamento.
              </p>
            </div>

            <div className="bl-journey">
              {journey.map((item, index) => (
                <article className="bl-journey-item" key={item}>
                  <div className="bl-journey-num">{index + 1}</div>
                  <strong>{item}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bl-section">
          <div className="bl-shell">
            <div className="bl-grid-3">
              <article className="bl-card">
                <div className="bl-head" style={{ gap: 10 }}>
                  <span className="bl-badge">Biblioteca real</span>
                  <h2>Apostilas e materiais ja produzidos entram no fluxo.</h2>
                </div>
                <ul className="bl-list">
                  <li>PDF e Markdown por trilha, com leitura e download.</li>
                  <li>Status honesto: biblioteca pronta, video demo ou itens em curadoria.</li>
                  <li>Links diretos para o aluno estudar imediatamente.</li>
                </ul>
              </article>

              <article className="bl-card">
                <div className="bl-head" style={{ gap: 10 }}>
                  <span className="bl-badge">Acompanhamento</span>
                  <h2>O aluno entende onde esta e o que vem depois.</h2>
                </div>
                <ul className="bl-list">
                  <li>Checklist de estudo por etapa.</li>
                  <li>Trilhas separadas por cargo e area.</li>
                  <li>Suporte por WhatsApp integrado na jornada.</li>
                </ul>
              </article>

              <article className="bl-card">
                <div className="bl-head" style={{ gap: 10 }}>
                  <span className="bl-badge">Expansao futura</span>
                  <h2>PMES fica preparado sem desviar o foco atual.</h2>
                </div>
                <div className="bl-pmes">
                  {estruturaFutura.categories.map((category) => (
                    <div key={category.slug}>
                      <strong>{category.title}</strong>
                      <p>{category.disciplinas.join(" · ")}</p>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

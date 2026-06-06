import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { curadoria, getCuradoriaOverview, getFeaturedTrack } from "@/lib/curadoria";
import { getQuestoesOverview } from "@/lib/questoes";
import { getSimuladosResolvidos } from "@/lib/simulados";

export default function HomePage() {
  const overview = getCuradoriaOverview();
  const featuredTrack = getFeaturedTrack();
  const questionsOverview = getQuestoesOverview();
  const simulados = getSimuladosResolvidos();

  return (
    <>
      <SiteHeader ctaLabel="Começar" ctaHref="/checkout" />

      <main className="home-premium">
        <style>{`
          .home-premium {
            min-height: 100vh;
            background:
              radial-gradient(circle at top left, rgba(197,139,0,.14), transparent 24%),
              radial-gradient(circle at top right, rgba(255,255,255,.05), transparent 22%),
              linear-gradient(180deg, #020617 0%, #0f172a 56%, #020617 100%);
            color: #ffffff;
          }

          .hp-shell {
            width: min(1120px, calc(100% - 28px));
            margin: 0 auto;
          }

          .hp-section {
            padding: 28px 0 68px;
          }

          .hp-hero {
            display: grid;
            gap: 20px;
            align-items: center;
          }

          .hp-badge {
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

          .hp-copy,
          .hp-head,
          .hp-preview,
          .hp-card,
          .hp-track {
            display: grid;
            gap: 16px;
          }

          .hp-copy h1,
          .hp-copy p,
          .hp-head h2,
          .hp-head p,
          .hp-card h3,
          .hp-card p,
          .hp-preview p {
            margin: 0;
          }

          .hp-copy h1 {
            max-width: 9ch;
            font-size: clamp(3rem, 13vw, 5.4rem);
            line-height: .93;
            letter-spacing: -.08em;
          }

          .hp-copy p,
          .hp-head p,
          .hp-card p,
          .hp-track li {
            color: #cbd5e1;
            line-height: 1.75;
          }

          .hp-actions,
          .hp-chips,
          .hp-links {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
          }

          .hp-btn,
          .hp-btn-ghost,
          .hp-link {
            min-height: 50px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0 20px;
            border-radius: 999px;
            text-decoration: none;
            font-weight: 900;
          }

          .hp-btn {
            background: linear-gradient(135deg, #c58b00, #9b6b00);
            color: #ffffff;
            box-shadow: 0 18px 36px rgba(197,139,0,.26);
          }

          .hp-btn-ghost,
          .hp-link {
            color: #ffffff;
            background: rgba(255,255,255,.04);
            border: 1px solid rgba(255,255,255,.12);
          }

          .hp-chip,
          .hp-status {
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

          .hp-preview-surface,
          .hp-card,
          .hp-stat,
          .hp-track {
            border-radius: 28px;
            border: 1px solid rgba(255,255,255,.08);
            background: rgba(15,23,42,.78);
            box-shadow: 0 18px 48px rgba(2,6,23,.24);
          }

          .hp-preview-surface {
            padding: 18px;
          }

          .hp-preview-shell {
            display: grid;
            gap: 14px;
          }

          .hp-preview-top {
            display: flex;
            justify-content: space-between;
            gap: 14px;
            align-items: flex-start;
          }

          .hp-preview-top strong {
            display: block;
            font-size: 1.05rem;
          }

          .hp-preview-top span {
            display: block;
            margin-top: 4px;
            color: #94a3b8;
            font-size: 13px;
          }

          .hp-preview-panel {
            border-radius: 24px;
            background: #111827;
            padding: 22px;
          }

          .hp-progress {
            margin-top: 16px;
            height: 12px;
            border-radius: 999px;
            background: #1f2937;
            overflow: hidden;
          }

          .hp-progress span {
            display: block;
            width: 58%;
            height: 100%;
            background: linear-gradient(90deg, #15803d, #22c55e);
          }

          .hp-checklist {
            display: grid;
            gap: 10px;
            margin-top: 16px;
          }

          .hp-checklist span {
            display: flex;
            justify-content: space-between;
            gap: 10px;
            padding: 12px 14px;
            border-radius: 16px;
            background: rgba(255,255,255,.04);
            color: #e2e8f0;
            font-weight: 800;
          }

          .hp-checklist b {
            color: #15803d;
          }

          .hp-stats,
          .hp-grid-3,
          .hp-track-grid {
            display: grid;
            gap: 14px;
          }

          .hp-stat,
          .hp-card,
          .hp-track {
            padding: 22px;
          }

          .hp-stat strong {
            display: block;
            font-size: 2rem;
            line-height: 1;
          }

          .hp-track-list {
            padding: 0;
            margin: 0;
            list-style: none;
            display: grid;
            gap: 10px;
          }

          .hp-track-list li {
            position: relative;
            padding-left: 18px;
          }

          .hp-track-list li::before {
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
            .hp-hero {
              grid-template-columns: .9fr 1.1fr;
              gap: 36px;
            }

            .hp-stats {
              grid-template-columns: repeat(4, minmax(0, 1fr));
            }

            .hp-grid-3 {
              grid-template-columns: repeat(3, minmax(0, 1fr));
            }

            .hp-track-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }
        `}</style>

        <section className="hp-section" id="inicio">
          <div className="hp-shell">
            <div className="hp-hero">
              <div className="hp-copy">
                <span className="hp-badge">Plataforma BenThec</span>
                <h1>Você não precisa estudar sozinho.</h1>
                <p>
                  A BenThec organiza sua preparação com plano de estudos, trilhas guiadas, apostilas, questões,
                  simulados e acompanhamento para transformar esforço em aprovação.
                </p>

                <div className="hp-actions">
                  <Link href="/checkout" className="hp-btn">
                    Quero organizar meus estudos
                  </Link>
                  <Link href="/login" className="hp-btn-ghost">
                    Já tenho conta
                  </Link>
                </div>

                <div className="hp-chips">
                  <span className="hp-chip">Aprova Água Doce</span>
                  <span className="hp-chip">{overview.pdfCount} apostilas em PDF</span>
                  <span className="hp-chip">{questionsOverview.totalQuestoes} questões iniciais</span>
                </div>
              </div>

              <div className="hp-preview-surface">
                <div className="hp-preview-shell">
                  <div className="hp-preview-top">
                    <div>
                      <strong>Continue sua trilha</strong>
                      <span>{featuredTrack.titulo}</span>
                    </div>
                    <span className="hp-status">Progresso guiado</span>
                  </div>

                  <article className="hp-preview-panel">
                    <h3 style={{ margin: 0 }}>{featuredTrack.titulo}</h3>
                    <p style={{ marginTop: 8, color: "#cbd5e1" }}>{featuredTrack.resumo}</p>

                    <div className="hp-progress">
                      <span />
                    </div>

                    <div className="hp-checklist">
                      <span>Entenda <b>feito</b></span>
                      <span>Assista <b>feito</b></span>
                      <span>Leia <b>feito</b></span>
                      <span>Pratique <b>agora</b></span>
                      <span>Revise <b>próximo</b></span>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="hp-section">
          <div className="hp-shell">
            <div className="hp-stats">
              <article className="hp-stat">
                <strong>{overview.trackCount}</strong>
                <p>Trilhas organizadas para o edital.</p>
              </article>
              <article className="hp-stat">
                <strong>{overview.materialCount}</strong>
                <p>Materiais ligados ao fluxo do aluno.</p>
              </article>
              <article className="hp-stat">
                <strong>{questionsOverview.totalQuestoes}</strong>
                <p>Questões autorais em estilo de banca.</p>
              </article>
              <article className="hp-stat">
                <strong>{simulados.length}</strong>
                <p>Simulados iniciais por área.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="hp-section" id="agua-doce">
          <div className="hp-shell">
            <div className="hp-head" style={{ marginBottom: 24 }}>
              <span className="hp-badge">Aprova Água Doce</span>
              <h2>Uma experiência de estudo que parece produto, não template.</h2>
              <p>
                O aluno entra, entende o próximo passo, abre a apostila, resolve questões e segue a trilha com apoio
                e direção.
              </p>
            </div>

            <div className="hp-track-grid">
              {curadoria.map((group) => (
                <article className="hp-track" key={group.slug}>
                  <div className="hp-head" style={{ gap: 10 }}>
                    <span className="hp-badge">{group.title}</span>
                    <h3 style={{ margin: 0 }}>{group.description}</h3>
                  </div>

                  <ul className="hp-track-list">
                    {group.tracks.map((track) => (
                      <li key={track.slug}>
                        <strong>{track.titulo}</strong>
                        <br />
                        {track.materiais.length} materiais reais · {track.bibliotecaStatus}
                      </li>
                    ))}
                  </ul>

                  <div className="hp-links">
                    <Link href="/trilhas" className="hp-link">
                      Ver trilhas
                    </Link>
                    <Link href="/login" className="hp-link">
                      Entrar
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="hp-section" id="metodo">
          <div className="hp-shell">
            <div className="hp-grid-3">
              <article className="hp-card">
                <span className="hp-badge">Plano de estudos</span>
                <h3>O aluno sabe o que estudar hoje.</h3>
                <p>Rotina clara com foco no edital, sem dispersão e sem depender de organização manual.</p>
              </article>

              <article className="hp-card">
                <span className="hp-badge">Questões e simulados</span>
                <h3>Treino orientado no estilo da banca.</h3>
                <p>Banco inicial autoral e simulados por área para transformar teoria em prática real.</p>
              </article>

              <article className="hp-card">
                <span className="hp-badge">Acompanhamento</span>
                <h3>Suporte próximo dentro do fluxo.</h3>
                <p>Biblioteca, aula demo, checklist, progresso e canal direto para continuidade dos estudos.</p>
              </article>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

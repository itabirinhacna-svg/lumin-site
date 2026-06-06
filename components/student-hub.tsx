import Link from "next/link";
import { curadoria, getCuradoriaOverview, getFeaturedTrack, type CuradoriaTrilha } from "@/lib/curadoria";
import { getQuestoesByCargoSlug, getQuestoesOverview } from "@/lib/questoes";
import { getSimuladosByArea } from "@/lib/simulados";
import { getVideosByCargoSlug, getVideosOverview } from "@/lib/videos-curados";

type StudentHubProps = {
  viewerName?: string;
  planName?: string;
  supportHref: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
};

function getFocusTrack(tracks: CuradoriaTrilha[]) {
  return tracks[0] ?? getFeaturedTrack();
}

export function StudentHub({
  viewerName,
  planName,
  supportHref,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: StudentHubProps) {
  const overview = getCuradoriaOverview();
  const focusTrack = getFeaturedTrack();
  const focusQuestions = getQuestoesByCargoSlug(focusTrack.slug);
  const focusSimulados = getSimuladosByArea(focusTrack.area);
  const focusVideos = getVideosByCargoSlug(focusTrack.slug);
  const questionsOverview = getQuestoesOverview();
  const videosOverview = getVideosOverview();
  const headline = viewerName ? `Ola, ${viewerName.split(" ")[0]}.` : "Seu ambiente de estudos.";

  return (
    <main className="ava-real-page">
      <style>{`
        .ava-real-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at top left, rgba(197,139,0,.10), transparent 18%),
            linear-gradient(180deg, #020617 0%, #0f172a 100%);
          color: #f8fafc;
          font-family: Inter, system-ui, sans-serif;
        }

        .ava-real-shell {
          min-height: 100vh;
          display: grid;
        }

        .ava-real-sidebar {
          background: rgba(2,6,23,.96);
          border-right: 1px solid #1e293b;
          padding: 22px 18px;
          position: sticky;
          top: 0;
          align-self: start;
          height: 100vh;
        }

        .ava-real-brand,
        .ava-real-topbar,
        .ava-real-grid,
        .ava-real-library-grid,
        .ava-real-stats,
        .ava-real-track-groups,
        .ava-real-pills,
        .ava-real-links,
        .ava-real-track-links {
          display: grid;
          gap: 14px;
        }

        .ava-real-brand {
          margin-bottom: 28px;
        }

        .ava-real-brand strong {
          color: #c58b00;
          font-size: 1.35rem;
          letter-spacing: -.03em;
        }

        .ava-real-brand span,
        .ava-real-copy p,
        .ava-real-card p,
        .ava-real-list li,
        .ava-real-track li {
          color: #94a3b8;
          line-height: 1.65;
        }

        .ava-real-nav {
          display: grid;
          gap: 8px;
        }

        .ava-real-nav a,
        .ava-real-nav span {
          min-height: 46px;
          display: flex;
          align-items: center;
          padding: 0 14px;
          border-radius: 14px;
          color: #e2e8f0;
          text-decoration: none;
          font-weight: 700;
        }

        .ava-real-nav span {
          background: linear-gradient(135deg, rgba(197,139,0,.18), rgba(197,139,0,.08));
          border: 1px solid rgba(197,139,0,.22);
          color: #ffffff;
        }

        .ava-real-main {
          padding: 18px 14px 28px;
        }

        .ava-real-topbar {
          margin-bottom: 18px;
        }

        .ava-real-copy h1,
        .ava-real-copy p,
        .ava-real-card h2,
        .ava-real-card h3 {
          margin: 0;
        }

        .ava-real-copy h1 {
          font-size: clamp(2rem, 5vw, 3rem);
          letter-spacing: -.05em;
        }

        .ava-real-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .ava-real-btn,
        .ava-real-btn-ghost,
        .ava-real-link {
          min-height: 46px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 18px;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 800;
        }

        .ava-real-btn {
          background: linear-gradient(135deg, #c58b00, #9b6b00);
          color: #ffffff;
        }

        .ava-real-btn-ghost,
        .ava-real-link {
          color: #ffffff;
          border: 1px solid rgba(255,255,255,.12);
          background: rgba(255,255,255,.04);
        }

        .ava-real-card,
        .ava-real-track,
        .ava-real-stat {
          border-radius: 24px;
          background: rgba(15,23,42,.72);
          border: 1px solid rgba(255,255,255,.08);
          box-shadow: 0 18px 48px rgba(2,6,23,.26);
          padding: 22px;
        }

        .ava-real-kicker {
          color: #f3cf6f;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .ava-real-focus {
          display: grid;
          gap: 18px;
        }

        .ava-real-focus-top {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          align-items: flex-start;
        }

        .ava-real-focus-top strong {
          display: block;
          margin-top: 8px;
          font-size: clamp(2rem, 6vw, 3rem);
        }

        .ava-real-meter {
          width: 108px;
          height: 108px;
          border-radius: 30px;
          display: grid;
          place-items: center;
          background: #0f172a;
          color: #f3cf6f;
          font-size: 1rem;
          font-weight: 900;
          text-align: center;
          border: 1px solid rgba(255,255,255,.08);
          padding: 12px;
        }

        .ava-real-bar {
          height: 14px;
          border-radius: 999px;
          background: #1e293b;
          overflow: hidden;
        }

        .ava-real-bar span {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #15803d, #22c55e);
        }

        .ava-real-checklist {
          display: grid;
          gap: 10px;
        }

        .ava-real-check {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 16px;
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.06);
        }

        .ava-real-check strong {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 999px;
          font-size: 14px;
        }

        .ava-real-check.done strong {
          background: rgba(21,128,61,.18);
          color: #bbf7d0;
        }

        .ava-real-check.current strong {
          background: rgba(197,139,0,.16);
          color: #f3cf6f;
        }

        .ava-real-check.next strong {
          background: rgba(255,255,255,.08);
          color: #cbd5e1;
        }

        .ava-real-stats {
          margin-bottom: 14px;
        }

        .ava-real-stat strong {
          display: block;
          margin-bottom: 8px;
          font-size: 1.8rem;
          line-height: 1;
        }

        .ava-real-pill {
          min-height: 36px;
          display: inline-flex;
          align-items: center;
          padding: 0 12px;
          border-radius: 999px;
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.08);
          color: #e2e8f0;
          font-size: 13px;
          font-weight: 700;
        }

        .ava-real-list,
        .ava-real-track-list {
          padding: 0;
          margin: 0;
          list-style: none;
          display: grid;
          gap: 10px;
        }

        .ava-real-list li,
        .ava-real-track-list li {
          padding-left: 18px;
          position: relative;
        }

        .ava-real-list li::before,
        .ava-real-track-list li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 10px;
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: #c58b00;
        }

        .ava-real-track {
          display: grid;
          gap: 14px;
        }

        .ava-real-track h3,
        .ava-real-track p {
          margin: 0;
        }

        .ava-real-track-links,
        .ava-real-links {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .ava-real-note {
          color: #f8fafc;
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.06);
          border-radius: 18px;
          padding: 16px;
          line-height: 1.65;
        }

        @media (min-width: 960px) {
          .ava-real-shell {
            grid-template-columns: 260px 1fr;
          }

          .ava-real-main {
            padding: 24px 28px 34px;
          }

          .ava-real-grid {
            grid-template-columns: 1.15fr .85fr;
          }

          .ava-real-library-grid {
            grid-template-columns: .9fr 1.1fr;
          }

          .ava-real-track-groups {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .ava-real-stats {
            grid-template-columns: repeat(6, minmax(0, 1fr));
          }
        }
      `}</style>

      <div className="ava-real-shell">
        <aside className="ava-real-sidebar">
          <div className="ava-real-brand">
            <strong>BenThec</strong>
            <span>Preparacao acompanhada</span>
          </div>

          <nav className="ava-real-nav">
            <span>Inicio</span>
            <a href="#trilhas">Minha Trilha</a>
            <Link href="/aluno/aula-demo">Videos</Link>
            <a href="#biblioteca">Materiais</a>
            <Link href="/questoes">Questoes</Link>
            <Link href="/simulados">Simulados</Link>
            <a href="#suporte">Suporte</a>
          </nav>
        </aside>

        <section className="ava-real-main">
          <header className="ava-real-topbar">
            <div className="ava-real-copy">
              <h1>{headline}</h1>
              <p>
                {planName
                  ? `${planName} ativo com biblioteca real do Aprova Agua Doce e fluxo de estudo organizado.`
                  : "Area pronta para navegar trilhas, materiais e acompanhamento do Aprova Agua Doce."}
              </p>
            </div>

            <div className="ava-real-actions">
              <Link href={primaryHref} className="ava-real-btn">
                {primaryLabel}
              </Link>
              <Link href={secondaryHref} className="ava-real-btn-ghost">
                {secondaryLabel}
              </Link>
            </div>
          </header>

          <div className="ava-real-stats">
            <article className="ava-real-stat">
              <strong>{overview.trackCount}</strong>
              <p>Trilhas ativas para o edital de Agua Doce.</p>
            </article>
            <article className="ava-real-stat">
              <strong>{overview.materialCount}</strong>
              <p>Materiais conectados ao acervo real.</p>
            </article>
            <article className="ava-real-stat">
              <strong>{overview.pdfCount}</strong>
              <p>PDFs prontos para download.</p>
            </article>
            <article className="ava-real-stat">
              <strong>{overview.markdownCount}</strong>
              <p>Arquivos de apoio em Markdown integraveis.</p>
            </article>
            <article className="ava-real-stat">
              <strong>{questionsOverview.totalQuestoes}</strong>
              <p>Questoes autorais em estilo IDESG.</p>
            </article>
            <article className="ava-real-stat">
              <strong>{videosOverview.pendentes}</strong>
              <p>Videos ainda pendentes de curadoria valida.</p>
            </article>
          </div>

          <div className="ava-real-grid">
            <article className="ava-real-card ava-real-focus">
              <div className="ava-real-focus-top">
                <div>
                  <span className="ava-real-kicker">Minha trilha</span>
                  <strong>{focusTrack.titulo}</strong>
                  <p>{focusTrack.proximaAcao}</p>
                </div>
                <div className="ava-real-meter">Banco inicial liberado</div>
              </div>

              <div className="ava-real-bar">
                <span />
              </div>

              <div className="ava-real-checklist">
                {focusTrack.checklist.map((step, index) => (
                  <div className={`ava-real-check ${index < 4 ? "done" : index === 4 ? "current" : "next"}`} key={step}>
                    <span>{step}</span>
                    <strong>{index < 4 ? "OK" : index === 4 ? ">" : "..."}</strong>
                  </div>
                ))}
              </div>
            </article>

            <aside style={{ display: "grid", gap: 14 }}>
              <article className="ava-real-card">
                <span className="ava-real-kicker">Painel rapido</span>
                <h3 style={{ margin: "10px 0 8px" }}>O que ja esta liberado</h3>
                <div className="ava-real-pills">
                  <span className="ava-real-pill">Biblioteca pronta</span>
                  <span className="ava-real-pill">Aula demo integrada</span>
                  <span className="ava-real-pill">{focusQuestions.length} questoes para a trilha</span>
                </div>
              </article>

              <article className="ava-real-card" id="questoes">
                <span className="ava-real-kicker">Questoes</span>
                <h3 style={{ margin: "10px 0 8px" }}>{focusQuestions.length} questoes para {focusTrack.titulo}</h3>
                <p className="ava-real-note">
                  Banco autoral inicial liberado com base no conteudo programatico e no formato objetivo da banca.
                </p>
                <div className="ava-real-links" style={{ marginTop: 14 }}>
                  <Link href="/questoes" className="ava-real-link">
                    Abrir banco de questoes
                  </Link>
                </div>
              </article>

              <article className="ava-real-card" id="simulados">
                <span className="ava-real-kicker">Simulados</span>
                <h3 style={{ margin: "10px 0 8px" }}>{focusSimulados.length} simulado(s) por area</h3>
                <p className="ava-real-note">Treinos iniciais liberados para Operacionais, Saude e Magisterio.</p>
                <div className="ava-real-links" style={{ marginTop: 14 }}>
                  <Link href="/simulados" className="ava-real-link">
                    Abrir simulados
                  </Link>
                </div>
              </article>
            </aside>
          </div>

          <section style={{ marginTop: 18 }} id="biblioteca">
            <div className="ava-real-library-grid">
              <article className="ava-real-card">
                <span className="ava-real-kicker">Biblioteca real</span>
                <h2 style={{ margin: "10px 0 8px" }}>Materiais que o aluno consegue abrir hoje</h2>
                <ul className="ava-real-list">
                  {focusTrack.materiais.map((material) => (
                    <li key={material.id}>
                      <strong>{material.titulo}</strong>
                      <br />
                      PDF: {material.pdfSizeLabel} · MD: {material.markdownSizeLabel}
                    </li>
                  ))}
                </ul>

                <div className="ava-real-links" style={{ marginTop: 16 }}>
                  {focusTrack.materiais.slice(0, 2).map((material) => (
                    <Link
                      href={`/api/materials/${material.id}?variant=pdf`}
                      key={material.id}
                      className="ava-real-link"
                      target="_blank"
                    >
                      Abrir {material.modulo}
                    </Link>
                  ))}
                </div>
              </article>

              <article className="ava-real-card" id="trilhas">
                <span className="ava-real-kicker">Trilhas por area</span>
                <h2 style={{ margin: "10px 0 8px" }}>Curadoria organizada por cargo</h2>
                <div className="ava-real-track-groups">
                  {curadoria.map((group) => {
                    const groupFocus = getFocusTrack(group.tracks);

                    return (
                      <article className="ava-real-track" key={group.slug}>
                        <div>
                          <h3>{group.title}</h3>
                          <p>{group.description}</p>
                        </div>

                        <ul className="ava-real-track-list">
                          {group.tracks.map((track) => {
                            const totalTrackQuestions = getQuestoesByCargoSlug(track.slug).length;

                            return (
                              <li key={track.slug}>
                                <strong>{track.titulo}</strong>
                                <br />
                                {track.materiais.length} materiais · {totalTrackQuestions} questoes
                              </li>
                            );
                          })}
                        </ul>

                        <div className="ava-real-track-links">
                          <Link href={`/aluno/aula-demo?trilha=${groupFocus.slug}`} className="ava-real-link">
                            Abrir trilha
                          </Link>
                          <Link href="/trilhas" className="ava-real-link">
                            Ver catalogo
                          </Link>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </article>
            </div>
          </section>

          <section style={{ marginTop: 18 }} id="suporte">
            <article className="ava-real-card">
              <span className="ava-real-kicker">Suporte</span>
              <h2 style={{ margin: "10px 0 8px" }}>Acompanhamento humano e proxima etapa</h2>
              <p>
                O aluno ja consegue entrar, navegar pela trilha, baixar apostilas, resolver questoes e continuar a
                aula demonstrativa. O suporte permanece acoplado ao fluxo para ajustes de estudo e duvidas da jornada.
              </p>

              <div className="ava-real-note" style={{ marginTop: 16 }}>
                Videos curados para esta trilha: {focusVideos.length}. Com link validado nesta sprint:{" "}
                {focusVideos.filter((video) => video.url).length}. Pendentes:{" "}
                {focusVideos.filter((video) => video.status === "pendente de curadoria").length}.
              </div>

              <div className="ava-real-links" style={{ marginTop: 18 }}>
                <Link href={supportHref} className="ava-real-btn" target="_blank">
                  Falar no WhatsApp
                </Link>
                <Link href="/aluno/aula-demo" className="ava-real-btn-ghost">
                  Abrir aula demo
                </Link>
                <Link href="/questoes" className="ava-real-btn-ghost">
                  Resolver questoes
                </Link>
              </div>
            </article>
          </section>
        </section>
      </div>
    </main>
  );
}

import Link from "next/link";
import { getCurrentUser } from "@/lib/access";
import { curadoria, getCuradoriaOverview, getFeaturedTrack } from "@/lib/curadoria";
import { getQuestoesByCargoSlug, getQuestoesOverview } from "@/lib/questoes";
import { getSimuladosByArea } from "@/lib/simulados";

export default async function AreaPage() {
  const currentUser = await getCurrentUser();
  const featuredTrack = getFeaturedTrack();
  const overview = getCuradoriaOverview();
  const questionsOverview = getQuestoesOverview();
  const trackQuestions = getQuestoesByCargoSlug(featuredTrack.slug);
  const areaSimulados = getSimuladosByArea(featuredTrack.area);

  return (
    <main className="ava-delivery-page">
      <style>{`
        .ava-delivery-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at top left, rgba(197,139,0,.10), transparent 20%),
            linear-gradient(180deg, #020617 0%, #0f172a 100%);
          color: #fff;
        }

        .ad-shell {
          width: min(1180px, calc(100% - 28px));
          margin: 0 auto;
          padding: 24px 0 40px;
          display: grid;
          gap: 18px;
        }

        .ad-top,
        .ad-stats,
        .ad-grid,
        .ad-links,
        .ad-track-grid {
          display: grid;
          gap: 14px;
        }

        .ad-card,
        .ad-panel {
          border-radius: 28px;
          border: 1px solid rgba(255,255,255,.08);
          background: rgba(15,23,42,.78);
          box-shadow: 0 18px 48px rgba(2,6,23,.24);
          padding: 22px;
        }

        .ad-kicker {
          color: #f3cf6f;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .ad-top h1,
        .ad-top p,
        .ad-card h2,
        .ad-card h3,
        .ad-card p {
          margin: 0;
        }

        .ad-top h1 {
          font-size: clamp(2.2rem, 5vw, 4rem);
          letter-spacing: -.05em;
        }

        .ad-top p,
        .ad-card p,
        .ad-card li {
          color: #cbd5e1;
          line-height: 1.7;
        }

        .ad-actions,
        .ad-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .ad-btn,
        .ad-btn-ghost {
          min-height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 18px;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 900;
        }

        .ad-btn {
          background: linear-gradient(135deg, #c58b00, #9b6b00);
          color: #fff;
        }

        .ad-btn-ghost {
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.12);
          color: #fff;
        }

        .ad-pill {
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

        .ad-stat strong {
          display: block;
          font-size: 2rem;
          line-height: 1;
        }

        .ad-progress {
          margin-top: 16px;
          height: 12px;
          border-radius: 999px;
          background: #1f2937;
          overflow: hidden;
        }

        .ad-progress span {
          display: block;
          width: 58%;
          height: 100%;
          background: linear-gradient(90deg, #15803d, #22c55e);
        }

        .ad-checklist,
        .ad-list {
          padding: 0;
          margin: 0;
          list-style: none;
          display: grid;
          gap: 10px;
        }

        .ad-checklist li,
        .ad-list li {
          padding-left: 18px;
          position: relative;
        }

        .ad-checklist li::before,
        .ad-list li::before {
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
          .ad-stats {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }

          .ad-grid {
            grid-template-columns: 1.1fr .9fr;
          }

          .ad-track-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
      `}</style>

      <div className="ad-shell">
        <header className="ad-panel ad-top">
          <div className="ad-kicker">Área do aluno</div>
          <h1>Continue sua trilha.</h1>
          <p>
            {currentUser
              ? `Olá, ${currentUser.name.split(" ")[0]}.`
              : "Entre para liberar sua rotina completa."} Aprova Água Doce com biblioteca, questões,
            simulados, suporte e próximo passo visível.
          </p>

          <div className="ad-actions">
            <Link href="/aluno/aula-demo" className="ad-btn">
              Continue sua trilha
            </Link>
            <Link href="/questoes" className="ad-btn-ghost">
              Questões
            </Link>
            <Link href="/simulados" className="ad-btn-ghost">
              Simulados
            </Link>
          </div>
        </header>

        <div className="ad-stats">
          <article className="ad-card ad-stat">
            <strong>{overview.pdfCount}</strong>
            <p>Apostilas em PDF</p>
          </article>
          <article className="ad-card ad-stat">
            <strong>{questionsOverview.totalQuestoes}</strong>
            <p>Questões em estilo de banca</p>
          </article>
          <article className="ad-card ad-stat">
            <strong>{areaSimulados.length}</strong>
            <p>Simulados da área</p>
          </article>
          <article className="ad-card ad-stat">
            <strong>{curadoria.length}</strong>
            <p>Frentes principais</p>
          </article>
        </div>

        <div className="ad-grid">
          <article className="ad-card">
            <div className="ad-kicker">Aprova Água Doce</div>
            <h2 style={{ marginTop: 8 }}>{featuredTrack.titulo}</h2>
            <p style={{ marginTop: 10 }}>{featuredTrack.resumo}</p>

            <div className="ad-progress">
              <span />
            </div>

            <ul className="ad-checklist" style={{ marginTop: 18 }}>
              <li>Entenda a trilha e o edital</li>
              <li>Abra a apostila principal</li>
              <li>Resolva as questões da disciplina</li>
              <li>Avance para o simulado da área</li>
              <li>Peça suporte quando travar</li>
            </ul>
          </article>

          <article className="ad-card">
            <div className="ad-kicker">Painel rápido</div>
            <h3 style={{ marginTop: 8 }}>O que já está liberado hoje</h3>

            <div className="ad-pills" style={{ marginTop: 16 }}>
              <span className="ad-pill">Biblioteca</span>
              <span className="ad-pill">Questões</span>
              <span className="ad-pill">Simulados</span>
              <span className="ad-pill">Suporte</span>
            </div>

            <ul className="ad-list" style={{ marginTop: 18 }}>
              <li>{trackQuestions.length} questões para a trilha em destaque</li>
              <li>{featuredTrack.materiais.length} materiais na biblioteca da trilha</li>
              <li>{areaSimulados.length} simulado(s) disponível(is) para o bloco atual</li>
            </ul>

            <div className="ad-links" style={{ marginTop: 18 }}>
              <Link href="/aluno/aula-demo" className="ad-btn">
                Aula demo
              </Link>
              <Link
                href="https://wa.me/5527999850434?text=Ola,%20quero%20suporte%20na%20minha%20trilha%20BenThec."
                className="ad-btn-ghost"
                target="_blank"
              >
                Suporte
              </Link>
            </div>
          </article>
        </div>

        <section className="ad-track-grid">
          {curadoria.map((group) => (
            <article className="ad-card" key={group.slug}>
              <div className="ad-kicker">{group.title}</div>
              <h3 style={{ marginTop: 8 }}>{group.description}</h3>
              <ul className="ad-list" style={{ marginTop: 16 }}>
                {group.tracks.slice(0, 3).map((track) => (
                  <li key={track.slug}>
                    <strong>{track.titulo}</strong>
                    <br />
                    {track.bibliotecaStatus}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

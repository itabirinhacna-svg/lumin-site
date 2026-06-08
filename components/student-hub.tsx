import Link from "next/link";
import type { ReactNode } from "react";
import { AchievementShareCard } from "@/components/achievement-share-card";
import { FlashcardsBoard } from "@/components/flashcards-board";
import { LibraryHub, type LibraryItem } from "@/components/library-hub";
import { QuickNav } from "@/components/quick-nav";
import { VideosHub, type VideoHubItem } from "@/components/videos-hub";
import { type CuradoriaTrilha, getCuradoriaOverview, getTrackProgress, getTrackProgressDetails } from "@/lib/curadoria";
import { flashcards } from "@/lib/flashcards";
import type { GamificationSnapshot } from "@/lib/gamification";
import { getQuestoesDisponiveisParaCargo } from "@/lib/questoes";
import { getRedacaoOverview } from "@/lib/redacao";
import { getSimuladosDisponiveisParaCargo } from "@/lib/simulados";
import { getConteudosByCargoSlug, getConteudosByProduto, getVideosOverview } from "@/lib/videos-curados";

type StudentHubProps = {
  viewerName: string;
  planName: string;
  productSlug: string;
  planFeatures: string[];
  supportHref: string;
  tracks: CuradoriaTrilha[];
  gamification: GamificationSnapshot;
  redacaoSnapshot: {
    total: number;
    pending: number;
    latestTitle: string | null;
    latestStatus: string | null;
  };
};

type SidebarItem = {
  label: string;
  href: string;
  icon: SidebarIconName;
};

type SidebarIconName =
  | "dashboard"
  | "tracks"
  | "plan"
  | "questions"
  | "videos"
  | "simulados"
  | "flashcards"
  | "library"
  | "writing"
  | "support";

function getPrimaryTrack(tracks: CuradoriaTrilha[]) {
  return tracks[0];
}

function getDailyMissions(primaryTrack: CuradoriaTrilha, nextStep: string, pendingReviews: number, essayPending: number) {
  return [
    {
      title: "Missao 1",
      description: `Abrir ${primaryTrack.titulo} e seguir por ${nextStep.toLowerCase()}.`,
    },
    {
      title: "Missao 2",
      description: pendingReviews > 0 ? `Fechar ${pendingReviews} revisao(oes) curta(s) pendente(s).` : "Manter a revisao curta em dia depois da aula.",
    },
    {
      title: "Missao 3",
      description: essayPending > 0 ? "Acompanhar a redacao em andamento e revisar a devolutiva." : "Separar um tema de redacao para nao deixar a escrita para depois.",
    },
  ];
}

function getProgressAverage(tracks: CuradoriaTrilha[]) {
  if (tracks.length === 0) {
    return 0;
  }

  const total = tracks.reduce((sum, track) => sum + getTrackProgress(track.slug), 0);
  return Math.round(total / tracks.length);
}

function classifyDiscipline(text: string, slug?: string): LibraryItem["disciplina"] {
  const normalized = `${text} ${slug ?? ""}`.toLowerCase();

  if (normalized.includes("portugues")) return "Portugues";
  if (normalized.includes("matemat")) return "Matematica";
  if (normalized.includes("racioc")) return "Raciocinio";
  if (normalized.includes("atual")) return "Atualidades";
  if (normalized.includes("constitucional") || normalized.includes("administrativo") || normalized.includes("direitos") || normalized.includes("legisl")) return "Direito";
  if (normalized.includes("pmes")) return "PMES";
  if (normalized.includes("redacao")) return "Redacao";
  return "Portugues";
}

function SidebarIcon({ name }: { name: SidebarIconName }) {
  const iconProps = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const;

  const icons: Record<SidebarIconName, ReactNode> = {
    dashboard: (
      <svg {...iconProps}><rect x="3" y="3" width="7" height="8" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="15" width="7" height="6" rx="1.5" /></svg>
    ),
    tracks: (
      <svg {...iconProps}><path d="M4 18c2-4 5-6 8-6h6" /><path d="M14 6h6v6" /><path d="M20 6l-7 7" /></svg>
    ),
    plan: (
      <svg {...iconProps}><path d="M7 4h10" /><path d="M7 12h10" /><path d="M7 20h10" /><circle cx="4" cy="4" r="1" /><circle cx="4" cy="12" r="1" /><circle cx="4" cy="20" r="1" /></svg>
    ),
    questions: (
      <svg {...iconProps}><path d="M9.5 9a2.5 2.5 0 1 1 3.6 2.2c-.8.4-1.1.8-1.1 1.8" /><circle cx="12" cy="17" r="1" /><path d="M5 4h14v16H5z" /></svg>
    ),
    videos: (
      <svg {...iconProps}><rect x="3" y="5" width="14" height="14" rx="2" /><path d="m10 9 4 3-4 3z" /><path d="M17 10l4-2v8l-4-2" /></svg>
    ),
    simulados: (
      <svg {...iconProps}><path d="M8 6h12" /><path d="M8 12h12" /><path d="M8 18h12" /><path d="m4 6 1 1 2-2" /><path d="m4 12 1 1 2-2" /><path d="m4 18 1 1 2-2" /></svg>
    ),
    flashcards: (
      <svg {...iconProps}><rect x="4" y="7" width="14" height="10" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2" /></svg>
    ),
    library: (
      <svg {...iconProps}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 17V5A2.5 2.5 0 0 1 9 2.5h11v17H6.5z" /></svg>
    ),
    writing: (
      <svg {...iconProps}><path d="m4 20 4.5-1 9-9a2.1 2.1 0 0 0-3-3l-9 9L4 20z" /><path d="m13.5 6.5 3 3" /></svg>
    ),
    support: (
      <svg {...iconProps}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><path d="M8 9h8" /><path d="M8 13h5" /></svg>
    ),
  };

  return icons[name];
}

export function StudentHub({
  viewerName,
  planName,
  productSlug,
  planFeatures,
  supportHref,
  tracks,
  gamification,
  redacaoSnapshot,
}: StudentHubProps) {
  const overview = getCuradoriaOverview();
  const redacaoOverview = getRedacaoOverview();
  const videosOverview = getVideosOverview();
  const primaryTrack = getPrimaryTrack(tracks);

  if (!primaryTrack) {
    return (
      <main className="section">
        <div className="page-shell">
          <section className="hero-card" style={{ display: "grid", gap: 18 }}>
            <div className="kicker">Area do aluno</div>
            <h1>Seu acesso ainda nao liberou uma trilha completa.</h1>
            <p>
              Enquanto isso, voce ja consegue experimentar a aula gratuita, resolver um mini simulado, testar 10 questoes e escolher o produto certo para seguir estudando.
            </p>
            <div className="section-grid" style={{ marginTop: 8 }}>
              <article className="plan-card">
                <strong>Aula gratuita</strong>
                <p style={{ marginTop: 8 }}>Veja como a trilha funciona antes de comprar.</p>
                <div className="actions" style={{ marginTop: 14 }}>
                  <Link href="/login" className="btn-secondary">Entrar com demo</Link>
                </div>
              </article>
              <article className="plan-card">
                <strong>Mini simulado gratis</strong>
                <p style={{ marginTop: 8 }}>Treino curto para sentir o fluxo da plataforma.</p>
                <div className="actions" style={{ marginTop: 14 }}>
                  <Link href="/simulados" className="btn-secondary">Abrir simulado</Link>
                </div>
              </article>
              <article className="plan-card">
                <strong>10 questoes gratis</strong>
                <p style={{ marginTop: 8 }}>Leia, responda e so depois veja a correcao.</p>
                <div className="actions" style={{ marginTop: 14 }}>
                  <Link href="/questoes" className="btn-secondary">Abrir questoes</Link>
                </div>
              </article>
              <article className="plan-card">
                <strong>Produtos disponiveis</strong>
                <p style={{ marginTop: 8 }}>Aprova Agua Doce, PMES, ENEM e Redacao em planos separados.</p>
                <div className="actions" style={{ marginTop: 14 }}>
                  <Link href="/checkout" className="btn">Ver planos e comprar</Link>
                </div>
              </article>
            </div>
          </section>
        </div>
      </main>
    );
  }

  const primaryQuestions = getQuestoesDisponiveisParaCargo(primaryTrack.slug, primaryTrack.area);
  const primarySimulados = getSimuladosDisponiveisParaCargo(primaryTrack.area);
  const primaryVideos = getConteudosByCargoSlug(primaryTrack.slug, "video");
  const writingVideos = getConteudosByProduto("redacao").filter((item) => item.url).slice(0, 2);
  const progressAverage = getProgressAverage(tracks);
  const primaryProgress = getTrackProgressDetails(primaryTrack.slug);
  const pendingReviews = Math.max(0, tracks.reduce((sum, track) => sum + Math.max(0, getTrackProgressDetails(track.slug).totalCount - getTrackProgressDetails(track.slug).completedCount - 1), 0));
  const dailyMissions = getDailyMissions(primaryTrack, primaryProgress.nextStep, pendingReviews, redacaoSnapshot.pending || redacaoOverview.pendentes);
  const progressLabel = `${primaryTrack.titulo} - ${getTrackProgress(primaryTrack.slug)}% da trilha concluida`;

  const sidebarItems: SidebarItem[] = [
    { label: "Dashboard", href: "#dashboard", icon: "dashboard" },
    { label: "Trilhas", href: "#trilhas", icon: "tracks" },
    { label: "Meu Plano", href: "#plano", icon: "plan" },
    { label: "Banco de Questoes", href: "#questoes", icon: "questions" },
    { label: "Videoaulas", href: "#videos", icon: "videos" },
    { label: "Simulados", href: "#simulados", icon: "simulados" },
    { label: "Flashcards", href: "#flashcards", icon: "flashcards" },
    { label: "Biblioteca", href: "#biblioteca", icon: "library" },
    { label: "Redacao", href: "#redacao", icon: "writing" },
    { label: "Suporte", href: "#suporte", icon: "support" },
  ];

  const recommendedVideoItems: VideoHubItem[] = [
    ...primaryVideos.filter((item) => item.url).slice(0, 4).map((item) => ({
      id: item.id,
      disciplina: item.disciplina,
      titulo: item.titulo,
      duracao: item.duracao,
      descricao: item.observacao,
      status: item.status,
      validacao: item.validacao,
      url: item.url,
      actionHref: `/aluno/cargos/${primaryTrack.slug}#videos`,
      actionLabel: "Abrir trilha",
    })),
    ...writingVideos.map((item) => ({
      id: item.id,
      disciplina: item.disciplina,
      titulo: item.titulo,
      duracao: item.duracao,
      descricao: item.observacao,
      status: item.status,
      validacao: item.validacao,
      url: item.url,
      actionHref: "/redacao",
      actionLabel: "Abrir Redacao",
    })),
  ].slice(0, 6);

  const libraryItems: LibraryItem[] = [
    ...tracks.flatMap((track) =>
      track.materiais.slice(0, 3).map((material) => ({
        id: material.id,
        tipo: "Apostila",
        disciplina: classifyDiscipline(material.titulo, track.slug),
        titulo: material.titulo,
        paginas: material.pdfSizeLabel,
        descricao: material.resumo,
        readHref: `/aluno/cargos/${track.slug}#biblioteca`,
        downloadHref: material.pdfExists ? `/api/materials/${material.id}?variant=pdf` : null,
        fallbackHref: `/aluno/cargos/${track.slug}`,
      })),
    ),
    {
      id: "pmes-guia",
      tipo: "Guia",
      disciplina: "PMES",
      titulo: "Mapa de estudo PMES",
      paginas: "Leitura digital",
      descricao: "Disciplinas, modulos e proximo passo da frente policial.",
      readHref: "/pmes",
      fallbackHref: "/pmes",
    },
    {
      id: "redacao-guia",
      tipo: "Guia",
      disciplina: "Redacao",
      titulo: "Acompanhamento de redacao",
      paginas: "Fluxo persistido",
      descricao: "Envio, historico, devolutiva e proxima escrita no mesmo lugar.",
      readHref: "/redacao",
      fallbackHref: "/redacao",
    },
  ];

  return (
    <main className="student-lovable-page">
      <style>{`
        .student-lovable-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at top left, rgba(197,139,0,.14), transparent 24%),
            radial-gradient(circle at top right, rgba(255,255,255,.04), transparent 18%),
            linear-gradient(180deg, #020617 0%, #0f172a 52%, #020617 100%);
          color: #f8fafc;
        }

        .student-lovable-shell {
          min-height: 100vh;
          display: grid;
        }

        .student-lovable-sidebar {
          position: sticky;
          top: 0;
          align-self: start;
          height: 100vh;
          background: rgba(2,6,23,.95);
          border-right: 1px solid rgba(255,255,255,.08);
          padding: 20px 16px 28px;
          display: grid;
          grid-template-rows: auto auto 1fr auto;
          gap: 18px;
        }

        @media (max-width: 1079px) {
          .student-lovable-sidebar {
            display: none;
          }
        }

        .student-lovable-brand,
        .student-lovable-main,
        .student-lovable-hero,
        .student-lovable-stats,
        .student-lovable-grid,
        .student-lovable-section-grid,
        .student-lovable-actions,
        .student-lovable-stack,
        .student-lovable-sidebar nav {
          display: grid;
          gap: 14px;
        }

        .student-lovable-brand {
          padding: 6px 4px;
        }

        .student-lovable-brand strong {
          color: #fff;
          font-size: 1.2rem;
        }

        .student-lovable-brand span,
        .student-lovable-copy p,
        .student-lovable-card p,
        .student-lovable-card li,
        .student-lovable-stat p {
          color: #94a3b8;
          line-height: 1.55;
        }

        .student-lovable-nav-link,
        .student-lovable-nav-current {
          min-height: 46px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 14px;
          border-radius: 16px;
          color: #e2e8f0;
          text-decoration: none;
          font-weight: 700;
          border: 1px solid rgba(255,255,255,.05);
          background: rgba(255,255,255,.03);
        }

        .student-lovable-nav-current {
          background: linear-gradient(135deg, rgba(197,139,0,.18), rgba(197,139,0,.08));
          border-color: rgba(197,139,0,.16);
        }

        .student-lovable-sidebar-footer {
          padding: 14px;
          border-radius: 18px;
          background: rgba(15,23,42,.8);
          border: 1px solid rgba(255,255,255,.08);
        }

        .student-lovable-main {
          padding: 18px 14px 42px;
        }

        .student-lovable-main > section {
          scroll-margin-top: 90px;
        }

        .student-lovable-copy h1,
        .student-lovable-copy p,
        .student-lovable-card h2,
        .student-lovable-card h3,
        .student-lovable-card h4,
        .student-lovable-stat h3 {
          margin: 0;
        }

        .student-lovable-copy h1 {
          font-size: clamp(2.4rem, 6vw, 3.9rem);
          letter-spacing: -.05em;
        }

        .student-lovable-card,
        .student-lovable-stat {
          border-radius: 28px;
          background: rgba(15,23,42,.82);
          border: 1px solid rgba(255,255,255,.08);
          box-shadow: 0 18px 48px rgba(2,6,23,.28);
          padding: 20px;
        }

        .student-lovable-stat strong {
          display: block;
          font-size: 1.7rem;
          line-height: 1;
          margin-bottom: 8px;
        }

        .student-lovable-kicker {
          color: #f3cf6f;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .student-lovable-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .student-lovable-pill {
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

        .student-lovable-progress {
          height: 10px;
          border-radius: 999px;
          background: #1f2937;
          overflow: hidden;
        }

        .student-lovable-progress span {
          display: block;
          height: 100%;
          background: linear-gradient(90deg, #15803d, #22c55e);
        }

        .student-lovable-compact {
          display: grid;
          gap: 12px;
        }

        .student-lovable-compact-row {
          display: grid;
          gap: 12px;
        }

        .student-lovable-note {
          color: #cbd5e1;
          font-size: .95rem;
        }

        .student-lovable-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 10px;
        }

        .student-lovable-list li {
          position: relative;
          padding-left: 18px;
        }

        .student-lovable-list li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 10px;
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: #c58b00;
        }

        @media (min-width: 1080px) {
          .student-lovable-shell {
            grid-template-columns: 286px 1fr;
          }

          .student-lovable-main {
            padding: 24px 28px 52px;
          }

          .student-lovable-stats {
            grid-template-columns: repeat(5, minmax(0, 1fr));
          }

          .student-lovable-grid {
            grid-template-columns: 1.15fr .85fr;
          }

          .student-lovable-section-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .student-lovable-compact-row {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>

      <div className="student-lovable-shell">
        <aside className="student-lovable-sidebar">
          <div className="student-lovable-brand">
            <strong>BenThec</strong>
            <span>Voce nao esta estudando sozinho.</span>
          </div>

          <div className="student-lovable-nav-current">
            <SidebarIcon name="dashboard" />
            <span>Continue daqui</span>
          </div>

          <nav>
            {sidebarItems.map((item) => (
              <a key={item.label} href={item.href} className="student-lovable-nav-link">
                <SidebarIcon name={item.icon} />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="student-lovable-sidebar-footer">
            <div className="student-lovable-kicker">Seu plano de hoje</div>
            <p style={{ marginTop: 8 }}>
              Assista, leia e pratique. Quando terminar, siga para o proximo bloco sem perder tempo.
            </p>
          </div>
        </aside>

        <section className="student-lovable-main">
          <QuickNav
            title="Menu do aluno"
            items={sidebarItems.map((item) => ({ label: item.label, href: item.href }))}
          />

          <section id="dashboard" className="student-lovable-hero">
            <div className="student-lovable-copy">
              <div className="student-lovable-kicker">Dashboard do aluno</div>
              <h1>Ola, {viewerName.split(" ")[0]}.</h1>
              <p>{planName} ativo. Veja o que fazer agora e siga sem perder ritmo.</p>
            </div>

            <div className="student-lovable-actions">
              <Link href={`/aluno/aula-demo?trilha=${primaryTrack.slug}`} className="btn">
                Continue daqui
              </Link>
              <Link href={`/aluno/cargos/${primaryTrack.slug}`} className="btn-secondary">
                Abrir trilha atual
              </Link>
              <Link href="/redacao/envio" className="btn-ghost">
                Enviar redacao
              </Link>
            </div>
          </section>

          <section className="student-lovable-grid" style={{ marginTop: 4 }}>
            <article className="student-lovable-card">
              <div className="student-lovable-kicker">XP e nivel</div>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 12 }}>
                <img src={gamification.level.badgePath} alt={gamification.level.name} width={72} height={72} style={{ borderRadius: 18 }} />
                <div style={{ display: "grid", gap: 6 }}>
                  <span style={{ color: "#f3cf6f", fontWeight: 800 }}>Nivel {gamification.level.level}</span>
                  <span style={{ color: "#94a3b8" }}>{gamification.level.description}</span>
                </div>
              </div>
              <h2 style={{ marginTop: 10 }}>{gamification.level.name}</h2>
              <p style={{ marginTop: 10 }}>{gamification.xpTotal} XP acumulado no seu ritmo atual.</p>
              <div className="student-lovable-progress" style={{ marginTop: 16 }}>
                <span style={{ width: `${gamification.progressToNextLevel}%`, background: "linear-gradient(90deg, #c58b00, #f3cf6f)" }} />
              </div>
              <p style={{ marginTop: 10 }}>
                {gamification.nextLevel
                  ? `Faltam ${Math.max(0, gamification.xpForNextLevel - gamification.xpIntoCurrentLevel)} XP para chegar a ${gamification.nextLevel.name}.`
                  : "Voce alcancou o topo atual desta carreira na BenThec."}
              </p>
              <div className="student-lovable-pills" style={{ marginTop: 14 }}>
                <span className="student-lovable-pill">Sequencia: {gamification.streakDays} dia(s)</span>
                <span className="student-lovable-pill">Ultima conquista: {gamification.lastAchievementDefinition?.title ?? "Comece pela primeira aula"}</span>
              </div>
            </article>

            <article className="student-lovable-card">
              <div className="student-lovable-kicker">Proxima missao</div>
              <h3 style={{ marginTop: 10 }}>{gamification.nextMission}</h3>
              <div className="student-lovable-compact" style={{ marginTop: 16 }}>
                {dailyMissions.map((mission) => (
                  <div key={mission.title} className="plan-card" style={{ background: "rgba(17,24,39,.72)", padding: 16 }}>
                    <strong>{mission.title}</strong>
                    <p style={{ marginTop: 8 }}>{mission.description}</p>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="student-lovable-stats">
            <article className="student-lovable-stat">
              <strong>{progressAverage}%</strong>
              <p>Progresso semanal das trilhas liberadas.</p>
            </article>
            <article className="student-lovable-stat">
              <strong>{primaryQuestions.questoes.length}</strong>
              <p>Questoes prontas para praticar agora.</p>
            </article>
            <article className="student-lovable-stat">
              <strong>{primarySimulados.length}</strong>
              <p>Simulados esperando sua proxima bateria.</p>
            </article>
            <article className="student-lovable-stat">
              <strong>{pendingReviews}</strong>
              <p>Revisoes pendentes nas suas trilhas.</p>
            </article>
            <article className="student-lovable-stat">
              <strong>{gamification.level.level}</strong>
              <p>Nivel atual da sua carreira BenThec.</p>
            </article>
          </section>

          <section className="student-lovable-section-grid" style={{ marginTop: 18 }}>
            {gamification.achievementStates.slice(0, 4).map((achievement) => (
              <article
                key={achievement.key}
                className="student-lovable-card"
                style={{
                  background: achievement.unlocked ? "linear-gradient(135deg, rgba(197,139,0,.14), rgba(21,128,61,.08))" : undefined,
                }}
              >
                <div className="student-lovable-kicker">{achievement.unlocked ? "Conquista liberada" : "Conquista em andamento"}</div>
                <h3 style={{ marginTop: 10 }}>{achievement.title}</h3>
                <p style={{ marginTop: 10 }}>{achievement.description}</p>
                <p style={{ marginTop: 10, color: "#94a3b8" }}>
                  {achievement.unlocked
                    ? "Desbloqueada no seu progresso atual."
                    : `${Math.min(achievement.progress, achievement.progressTarget)} / ${achievement.progressTarget} para desbloquear.`}
                </p>
              </article>
            ))}
          </section>

          <section className="student-lovable-grid" style={{ marginTop: 18 }}>
            <AchievementShareCard
              title={`${viewerName.split(" ")[0]} alcancou ${gamification.level.name}`}
              subtitle={`${planName} - ${progressLabel}`}
              message={gamification.level.unlockMessage}
              progressLabel={progressLabel}
            />

            <article className="student-lovable-card">
              <div className="student-lovable-kicker">Proximas conquistas</div>
              <h3 style={{ marginTop: 10 }}>{gamification.nextAchievement?.title ?? "Todas as conquistas-base liberadas"}</h3>
              <ul className="student-lovable-list" style={{ marginTop: 16 }}>
                {(gamification.achievementStates.filter((item) => !item.unlocked).slice(0, 3)).map((achievement) => (
                  <li key={achievement.key}>
                    <strong>{achievement.title}</strong>
                    <br />
                    {`${Math.min(achievement.progress, achievement.progressTarget)} / ${achievement.progressTarget}`}
                  </li>
                ))}
              </ul>
            </article>
          </section>

          <section className="student-lovable-grid" style={{ marginTop: 18 }}>
            <article className="student-lovable-card">
              <div className="student-lovable-kicker">Trilha atual</div>
              <h2 style={{ marginTop: 10 }}>{primaryTrack.titulo}</h2>
              <p style={{ marginTop: 10 }}>{primaryProgress.currentStep}</p>
              <div className="student-lovable-progress" style={{ marginTop: 16 }}>
                <span style={{ width: `${getTrackProgress(primaryTrack.slug)}%` }} />
              </div>
              <div className="student-lovable-compact-row" style={{ marginTop: 18 }}>
                <div className="plan-card" style={{ background: "rgba(17,24,39,.72)", padding: 16 }}>
                  <div className="student-lovable-kicker">Proxima aula</div>
                  <strong>{primaryTrack.materiais[0]?.titulo}</strong>
                </div>
                <div className="plan-card" style={{ background: "rgba(17,24,39,.72)", padding: 16 }}>
                  <div className="student-lovable-kicker">Proximo passo</div>
                  <strong>{primaryProgress.nextStep}</strong>
                </div>
              </div>
            </article>

            <article className="student-lovable-card">
              <div className="student-lovable-kicker">Plano de hoje</div>
              <h3 style={{ marginTop: 10 }}>Assista, leia e pratique</h3>
              <div className="student-lovable-compact" style={{ marginTop: 16 }}>
                <div className="plan-card" style={{ background: "rgba(17,24,39,.72)", padding: 16 }}>
                  <strong>Revisao pendente</strong>
                  <p style={{ marginTop: 6 }}>{pendingReviews} bloco(s) pedem revisao curta.</p>
                </div>
                <div className="plan-card" style={{ background: "rgba(17,24,39,.72)", padding: 16 }}>
                  <strong>Redacao</strong>
                  <p style={{ marginTop: 6 }}>{redacaoSnapshot.latestTitle ?? "Escolha um tema para escrever hoje."}</p>
                </div>
              </div>
              <div className="actions" style={{ marginTop: 18 }}>
                <Link href="/redacao/envio" className="btn">
                  Proxima redacao
                </Link>
                <Link href={supportHref} className="btn-ghost" target="_blank">
                  Falar com a equipe
                </Link>
              </div>
            </article>
          </section>

          <section id="trilhas" style={{ marginTop: 22 }}>
            <div className="student-lovable-section-grid">
              {tracks.map((track) => (
                <article className="student-lovable-card" key={track.slug}>
                  <div className="student-lovable-kicker">Aprova Agua Doce</div>
                  <h3 style={{ marginTop: 10 }}>{track.titulo}</h3>
                  <div className="student-lovable-progress" style={{ marginTop: 16 }}>
                    <span style={{ width: `${getTrackProgress(track.slug)}%` }} />
                  </div>
                  <ul className="student-lovable-list" style={{ marginTop: 16 }}>
                    <li>{track.materiais.length} materiais liberados</li>
                    <li>{getTrackProgress(track.slug)}% concluido</li>
                    <li>{getTrackProgressDetails(track.slug).nextStep}</li>
                  </ul>
                  <div className="actions" style={{ marginTop: 18 }}>
                    <Link href={`/aluno/cargos/${track.slug}`} className="btn">
                      Continuar
                    </Link>
                  </div>
                </article>
              ))}

              <article className="student-lovable-card">
                <div className="student-lovable-kicker">PMES</div>
                <h3 style={{ marginTop: 10 }}>Produto futuro no mesmo painel</h3>
                <p style={{ marginTop: 10 }}>Portugues, Raciocinio Logico e Matematico, Historia, Geografia e Redacao PMES.</p>
                <ul className="student-lovable-list" style={{ marginTop: 16 }}>
                  <li>Disciplinas separadas por modulo</li>
                  <li>Curadoria em andamento</li>
                  <li>Base pronta para questoes e simulados</li>
                </ul>
                <div className="actions" style={{ marginTop: 18 }}>
                  <Link href="/pmes" className="btn-secondary">Abrir PMES</Link>
                </div>
              </article>

              <article className="student-lovable-card">
                <div className="student-lovable-kicker">Redacao ENEM</div>
                <h3 style={{ marginTop: 10 }}>Escreva, receba retorno e veja a nota subir</h3>
                <p style={{ marginTop: 10 }}>Competencias oficiais, historico, evolucao e devolutiva no mesmo fluxo.</p>
                <div className="actions" style={{ marginTop: 18 }}>
                  <Link href="/redacao" className="btn-secondary">Abrir Redacao ENEM</Link>
                </div>
              </article>

              <article className="student-lovable-card">
                <div className="student-lovable-kicker">Redacao Concursos</div>
                <h3 style={{ marginTop: 10 }}>Treino para municipais e policiais</h3>
                <p style={{ marginTop: 10 }}>Tema, argumentacao, estrutura, gramatica, coesao e clareza em devolutiva visivel.</p>
                <div className="actions" style={{ marginTop: 18 }}>
                  <Link href="/redacao?linha=Concursos" className="btn-secondary">Abrir Redacao Concursos</Link>
                </div>
              </article>
            </div>
          </section>

          <section id="plano" style={{ marginTop: 22 }}>
            <div className="student-lovable-section-grid">
              <article className="student-lovable-card">
                <div className="student-lovable-kicker">Meu plano</div>
                <h2 style={{ marginTop: 10 }}>{planName}</h2>
                <ul className="student-lovable-list" style={{ marginTop: 18 }}>
                  {planFeatures.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <div className="actions" style={{ marginTop: 18 }}>
                  <Link href="/checkout" className="btn-ghost">Ver planos</Link>
                </div>
              </article>

              <article className="student-lovable-card">
                <div className="student-lovable-kicker">Desbloqueio recomendado</div>
                <h3 style={{ marginTop: 10 }}>Voce ja comecou sua jornada.</h3>
                <p style={{ marginTop: 10 }}>
                  Desbloqueie acompanhamento completo para acelerar sua evolucao.
                </p>
                <ul className="student-lovable-list" style={{ marginTop: 16 }}>
                  {productSlug === "agua-doce" ? <li>Se voce esta com apostila, o Portal Completo encurta o caminho com trilha, video e revisao.</li> : null}
                  {productSlug === "pmes" ? <li>Quem esta em PMES acelera mais com Redacao PMES e treino discursivo semanal.</li> : null}
                  {productSlug === "enem" ? <li>Quem esta no ENEM sobe mais com Redacao ENEM integrada ao estudo das quatro areas.</li> : null}
                  {productSlug !== "redacao-enem" && productSlug !== "redacao-pmes" && productSlug !== "redacao-concursos" ? <li>Redacao humana especializada ajuda a transformar conteudo em aprovacao real.</li> : null}
                </ul>
                <div className="actions" style={{ marginTop: 18 }}>
                  <Link href="/checkout" className="btn">Ver recomendacoes</Link>
                </div>
              </article>
            </div>
          </section>

          <section id="questoes" style={{ marginTop: 22 }}>
            <article className="student-lovable-card">
              <div className="student-lovable-kicker">Banco de questoes</div>
              <h2 style={{ marginTop: 10 }}>Pratique agora</h2>
              <div className="student-lovable-section-grid" style={{ marginTop: 18 }}>
                {primaryQuestions.questoes.slice(0, 4).map((questao) => (
                  <article key={questao.id} className="plan-card" style={{ background: "rgba(17,24,39,.86)" }}>
                    <div className="student-lovable-kicker">{questao.disciplina}</div>
                    <h4 style={{ marginTop: 8 }}>{questao.assunto}</h4>
                    <p style={{ marginTop: 8 }}>{questao.enunciado}</p>
                    <div className="student-lovable-pills" style={{ marginTop: 14 }}>
                      <span className="student-lovable-pill">{questao.nivel}</span>
                      <span className="student-lovable-pill">{questao.bancaEstilo}</span>
                    </div>
                    <div className="actions" style={{ marginTop: 14 }}>
                      <Link href={`/questoes?trilha=${primaryTrack.slug}`} className="btn-secondary">
                        Abrir questoes
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </article>
          </section>

          <section id="videos" style={{ marginTop: 22 }}>
            <article className="student-lovable-card">
              <div className="student-lovable-kicker">Videoaulas recomendadas</div>
              <h2 style={{ marginTop: 10 }}>Aulas no mesmo fluxo</h2>
              <div style={{ marginTop: 18 }}>
                <VideosHub items={recommendedVideoItems} />
              </div>
            </article>
          </section>

          <section id="simulados" style={{ marginTop: 22 }}>
            <article className="student-lovable-card">
              <div className="student-lovable-kicker">Simulados</div>
              <h2 style={{ marginTop: 10 }}>Treino da semana</h2>
              <div className="student-lovable-section-grid" style={{ marginTop: 18 }}>
                {primarySimulados.map((simulado) => (
                  <article key={simulado.id} className="plan-card" style={{ background: "rgba(17,24,39,.86)" }}>
                    <div className="student-lovable-kicker">{simulado.area}</div>
                    <h3 style={{ marginTop: 8 }}>{simulado.titulo}</h3>
                    <p style={{ marginTop: 8 }}>{simulado.descricao}</p>
                    <div className="student-lovable-pills" style={{ marginTop: 14 }}>
                      <span className="student-lovable-pill">{simulado.tempoSugerido}</span>
                      <span className="student-lovable-pill">{simulado.questaoIds.length} questoes</span>
                    </div>
                    <div className="actions" style={{ marginTop: 14 }}>
                      <Link href={`/simulados?area=${primaryTrack.area}`} className="btn">
                        Abrir simulado
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </article>
          </section>

          <section id="flashcards" style={{ marginTop: 22 }}>
            <article className="student-lovable-card">
              <div className="student-lovable-kicker">Flashcards</div>
              <h2 style={{ marginTop: 10 }}>Revisao rapida</h2>
              <div style={{ marginTop: 18 }}>
                <FlashcardsBoard cards={flashcards} />
              </div>
            </article>
          </section>

          <section id="biblioteca" style={{ marginTop: 22 }}>
            <article className="student-lovable-card">
              <div className="student-lovable-kicker">Biblioteca</div>
              <h2 style={{ marginTop: 10 }}>Leitura e download</h2>
              <div style={{ marginTop: 18 }}>
                <LibraryHub items={libraryItems} />
              </div>
            </article>
          </section>

          <section id="redacao" style={{ marginTop: 22 }}>
            <div className="student-lovable-section-grid">
              <article className="student-lovable-card">
                <div className="student-lovable-kicker">Redacao pendente</div>
                <h3 style={{ marginTop: 10 }}>{redacaoSnapshot.latestTitle ?? "Envie sua primeira redacao"}</h3>
                <p className="student-lovable-note" style={{ marginTop: 10 }}>{redacaoSnapshot.latestTitle ? `Status: ${redacaoSnapshot.latestStatus}` : "Escolha um tema e comece hoje."}</p>
                <div className="actions" style={{ marginTop: 18 }}>
                  <Link href="/redacao/envio" className="btn">Enviar redacao</Link>
                  <Link href="/redacao/historico" className="btn-ghost">Ver historico</Link>
                </div>
              </article>

              <article className="student-lovable-card">
                <div className="student-lovable-kicker">Evolucao da escrita</div>
                <h3 style={{ marginTop: 10 }}>{redacaoSnapshot.total} envio(s) no fluxo</h3>
                <ul className="student-lovable-list" style={{ marginTop: 16 }}>
                  <li>ENEM, concursos e PMES no mesmo ambiente</li>
                  <li>Historico, status e devolutiva conectados</li>
                  <li>Proxima redacao recomendada visivel para o aluno</li>
                </ul>
                <div className="actions" style={{ marginTop: 18 }}>
                  <Link href="/redacao/devolutiva" className="btn-secondary">Abrir devolutiva</Link>
                </div>
              </article>
            </div>
          </section>

          <section id="suporte" style={{ marginTop: 22 }}>
            <article className="student-lovable-card">
              <div className="student-lovable-kicker">Suporte</div>
              <h2 style={{ marginTop: 10 }}>Vamos seguir juntos</h2>
              <p style={{ marginTop: 10 }}>
                Se travar, fale com a equipe. Seu plano de hoje continua aqui esperando o proximo passo.
              </p>
              <div className="actions" style={{ marginTop: 18 }}>
                <Link href={supportHref} className="btn" target="_blank">
                  Falar com a equipe
                </Link>
                <Link href={`/aluno/aula-demo?trilha=${primaryTrack.slug}`} className="btn-secondary">
                  Voltar para a aula
                </Link>
              </div>
            </article>
          </section>
        </section>
      </div>
    </main>
  );
}

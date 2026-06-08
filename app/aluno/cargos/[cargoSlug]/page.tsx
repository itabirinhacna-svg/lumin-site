import Link from "next/link";
import { redirect } from "next/navigation";
import { LessonVideoPanel } from "@/components/lesson-video-panel";
import { DisciplineCompletionPanel } from "@/components/discipline-completion-panel";
import { MaterialReader } from "@/components/material-reader";
import { QuestionsPractice } from "@/components/questions-practice";
import { QuickNav } from "@/components/quick-nav";
import { SiteHeader } from "@/components/site-header";
import { StudyCallout } from "@/components/study-callout";
import { TrackModulesBoard, type TrackModuleItem } from "@/components/track-modules-board";
import { requireStudentAccess } from "@/lib/access";
import { getAguaDoceCoverageByCargoSlug } from "@/lib/agua-doce-matriz";
import { getCuradoriaTrack, getTrackProgressDetails } from "@/lib/curadoria";
import { getJornadaByTrack } from "@/lib/jornada-aprovacao";
import { readMaterialMarkdown } from "@/lib/material-reading";
import { getTracksForPlan } from "@/lib/produtos";
import { getQuestoesDisponiveisParaCargo } from "@/lib/questoes";
import { getRedacaoOverview } from "@/lib/redacao";
import { getSimuladosDisponiveisParaCargo } from "@/lib/simulados";
import { getConteudosByCargoSlug } from "@/lib/videos-curados";

type CargoPageProps = {
  params: Promise<{
    cargoSlug: string;
  }>;
};

function buildTrackModules(track: NonNullable<ReturnType<typeof getCuradoriaTrack>>, currentIndex: number, nextIndex: number) {
  return track.materiais.map((material, index): TrackModuleItem => ({
    id: material.slug,
    disciplina: material.modulo,
    topicoEdital: material.titulo,
    status: index < currentIndex ? "concluido" : index === currentIndex ? "em-andamento" : "nao-iniciado",
    isCurrent: index === currentIndex,
    isNext: index === nextIndex,
    progressLabel:
      index < currentIndex
        ? "Voce ja passou por esta unidade e pode revisar quando quiser."
        : index === currentIndex
          ? "Esta e a unidade aberta agora. Assista, leia, pratique e avance."
          : "Esta unidade fica na sequencia da sua trilha.",
    actionLabel: index === currentIndex ? "Abrir aula atual" : index === nextIndex ? "Ver proxima aula" : "Abrir unidade",
    actionHref: `/aluno/aula-demo?trilha=${track.slug}&unidade=${index + 1}`,
    lessons: [
      {
        id: `${material.slug}-lesson`,
        title: material.titulo,
        summary: material.resumo,
        pdfHref: material.pdfExists ? `/api/materials/${material.id}?variant=pdf` : null,
      },
    ],
  }));
}

function buildTrailItems(materials: { titulo: string }[]) {
  return [
    { label: "Inicio", href: "#inicio" },
    { label: "Apresentacao", href: "#apresentacao" },
    ...materials.map((material, index) => ({
      label: `Unidade ${index + 1}`,
      href: `#unidade-${index + 1}`,
      title: material.titulo,
    })),
    { label: "Revisao", href: "#revisao" },
    { label: "Simulado", href: "#simulado" },
  ];
}

function getCurrentDisciplineProgress(materials: { modulo: string }[], currentIndex: number) {
  const moduloAtual = materials[currentIndex]?.modulo;
  if (!moduloAtual) {
    return 0;
  }

  const sameDiscipline = materials.filter((item) => item.modulo === moduloAtual);
  const currentPosition = sameDiscipline.findIndex((item) => item === materials[currentIndex]);
  return Math.round(((Math.max(currentPosition, 0) + 1) / sameDiscipline.length) * 100);
}

export default async function CargoStudentPage({ params }: CargoPageProps) {
  const { user, purchase } = await requireStudentAccess();
  const { cargoSlug } = await params;
  const track = getCuradoriaTrack(cargoSlug);
  const allowedTracks = getTracksForPlan(purchase.planId);
  const allowed = allowedTracks.some((item) => item.slug === cargoSlug);

  if (!track || !allowed) {
    redirect("/area");
  }

  const questionBundle = getQuestoesDisponiveisParaCargo(track.slug, track.area);
  const simulados = getSimuladosDisponiveisParaCargo(track.area);
  const jornada = getJornadaByTrack(track.slug);
  const etapaAtual = jornada[0];
  const videos = getConteudosByCargoSlug(track.slug, "video");
  const complementares = getConteudosByCargoSlug(track.slug, "complementar");
  const progress = getTrackProgressDetails(track.slug);
  const coverage = getAguaDoceCoverageByCargoSlug(track.slug);
  const redacaoOverview = getRedacaoOverview();
  const currentModuleIndex = Math.min(progress.completedCount, Math.max(0, track.materiais.length - 1));
  const nextModuleIndex = Math.min(currentModuleIndex + 1, Math.max(0, track.materiais.length - 1));
  const leituraDigital = etapaAtual ? readMaterialMarkdown(etapaAtual.apostila, 220) : [];
  const videoPrincipal = etapaAtual?.videoPrincipal ?? videos.find((item) => item.url) ?? videos[0] ?? null;
  const modules = buildTrackModules(track, currentModuleIndex, nextModuleIndex);
  const currentMaterial = track.materiais[currentModuleIndex] ?? track.materiais[0];
  const trailItems = buildTrailItems(track.materiais);
  const disciplineProgress = getCurrentDisciplineProgress(track.materiais, currentModuleIndex);

  return (
    <>
      <SiteHeader ctaLabel="Voltar ao painel" ctaHref="/area" />

      <main className="section ava-page">
        <style>{`
          .ava-page {
            background:
              radial-gradient(circle at top right, rgba(197,139,0,.14), transparent 24%),
              linear-gradient(180deg, #020617 0%, #0b1120 100%);
          }

          .ava-shell {
            display: grid;
            gap: 18px;
          }

          .ava-sidebar {
            position: sticky;
            top: 92px;
            align-self: start;
            border-radius: 28px;
            background: rgba(10,14,23,.94);
            border: 1px solid rgba(255,255,255,.08);
            padding: 18px 14px;
            display: none;
            gap: 16px;
          }

          .ava-sidebar-group {
            display: grid;
            gap: 10px;
          }

          .ava-sidebar-title {
            margin: 0;
            padding: 10px 12px;
            border-radius: 14px;
            background: rgba(255,255,255,.06);
            font-size: .95rem;
            font-weight: 800;
          }

          .ava-sidebar-link {
            display: grid;
            gap: 3px;
            padding: 12px 12px 12px 14px;
            border-radius: 16px;
            color: #f8fafc;
            text-decoration: none;
            border: 1px solid rgba(255,255,255,.06);
            background: rgba(255,255,255,.02);
          }

          .ava-sidebar-link strong {
            font-size: .95rem;
          }

          .ava-sidebar-link span {
            color: #94a3b8;
            font-size: .82rem;
          }

          .ava-main {
            display: grid;
            gap: 18px;
          }

          .ava-cover,
          .ava-panel {
            border-radius: 30px;
            border: 1px solid rgba(255,255,255,.08);
            background: rgba(15,23,42,.88);
            box-shadow: 0 20px 60px rgba(2,6,23,.26);
            padding: 22px;
          }

          .ava-cover {
            display: grid;
            gap: 18px;
          }

          .ava-cover p,
          .ava-panel p,
          .ava-panel li {
            color: #cbd5e1;
          }

          .ava-progress {
            height: 10px;
            border-radius: 999px;
            background: rgba(255,255,255,.08);
            overflow: hidden;
          }

          .ava-progress > span {
            display: block;
            height: 100%;
            background: linear-gradient(90deg, #c58b00 0%, #f3cf6f 45%, #16a34a 100%);
          }

          .ava-stat-grid,
          .ava-material-grid,
          .ava-unit-grid {
            display: grid;
            gap: 14px;
          }

          .ava-stat,
          .ava-material-card {
            border-radius: 22px;
            border: 1px solid rgba(255,255,255,.08);
            background: rgba(2,6,23,.3);
            padding: 16px;
          }

          .ava-mini-nav {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }

          .ava-mini-nav a {
            min-height: 40px;
            display: inline-flex;
            align-items: center;
            padding: 0 14px;
            border-radius: 999px;
            background: rgba(255,255,255,.04);
            border: 1px solid rgba(255,255,255,.08);
            color: #f8fafc;
            text-decoration: none;
            font-weight: 700;
          }

          @media (min-width: 1100px) {
            .ava-shell {
              grid-template-columns: 280px minmax(0, 1fr);
              align-items: start;
            }

            .ava-sidebar {
              display: grid;
            }

            .ava-stat-grid {
              grid-template-columns: repeat(3, minmax(0, 1fr));
            }

            .ava-material-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }
        `}</style>

        <div className="page-shell ava-shell">
          <aside className="ava-sidebar">
            <div className="ava-sidebar-group">
              <h2 className="ava-sidebar-title">Minha Trilha</h2>
              {trailItems.map((item) => (
                <a key={item.label} href={item.href} className="ava-sidebar-link">
                  <strong>{item.label}</strong>
                  {"title" in item ? <span>{item.title}</span> : null}
                </a>
              ))}
            </div>

            <div className="ava-sidebar-group">
              <h2 className="ava-sidebar-title">Meus Materiais</h2>
              <a href="#leitura" className="ava-sidebar-link"><strong>Livro digital</strong><span>Leitura principal da etapa</span></a>
              <a href="#pdf" className="ava-sidebar-link"><strong>Apostila PDF</strong><span>Arquivo de apoio para baixar</span></a>
              <a href="#questoes" className="ava-sidebar-link"><strong>Gabarito</strong><span>Liberado so depois da tentativa</span></a>
              <a href="#video" className="ava-sidebar-link"><strong>Videos</strong><span>Player dentro da aula</span></a>
              <a href="#questoes" className="ava-sidebar-link"><strong>Questoes</strong><span>Treino guiado por etapa</span></a>
              <a href="#recursos" className="ava-sidebar-link"><strong>Recursos interativos</strong><span>Simulados, revisao e suporte</span></a>
            </div>
          </aside>

          <div className="ava-main">
            <QuickNav
              title="Menu da trilha"
              items={[
                { label: "Minha Trilha", href: "#inicio" },
                { label: "Proxima Aula", href: "#video" },
                { label: "Biblioteca", href: "#leitura" },
                { label: "Videos", href: "#video" },
                { label: "Questoes", href: "#questoes" },
                { label: "Simulados", href: "#simulado" },
                { label: "Redacao", href: "/redacao" },
                { label: "Historico", href: "/redacao/historico" },
                { label: "Suporte", href: "#suporte" },
              ]}
            />

            <section id="inicio" className="ava-cover">
              <div>
                <div className="kicker">{track.publico}</div>
                <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.7rem)", marginTop: 10 }}>{track.titulo}</h1>
                <p style={{ marginTop: 12 }}>
                  Esta trilha agora funciona como curso guiado: voce entra, ve a unidade atual, entende o que estuda agora e ja enxerga o proximo passo.
                </p>
              </div>

              <div className="ava-progress">
                <span style={{ width: `${progress.progress}%` }} />
              </div>

              <div className="ava-stat-grid">
                <article className="ava-stat">
                  <strong>Continue daqui</strong>
                  <p style={{ marginTop: 8 }}>{progress.currentStep}</p>
                </article>
                <article className="ava-stat">
                  <strong>Proxima aula</strong>
                  <p style={{ marginTop: 8 }}>{progress.nextStep}</p>
                </article>
                <article className="ava-stat">
                  <strong>Progresso visual</strong>
                  <p style={{ marginTop: 8 }}>{progress.progress}% da trilha percorrida.</p>
                </article>
              </div>

              <div style={{ display: "grid", gap: 14 }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
                    <strong>Barra de progresso geral</strong>
                    <span>{progress.progress}%</span>
                  </div>
                  <div className="ava-progress">
                    <span style={{ width: `${progress.progress}%` }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
                    <strong>Barra de progresso da disciplina</strong>
                    <span>{disciplineProgress}%</span>
                  </div>
                  <div className="ava-progress">
                    <span style={{ width: `${disciplineProgress}%`, background: "linear-gradient(90deg, #f3cf6f 0%, #c58b00 100%)" }} />
                  </div>
                </div>
              </div>

              <div className="ava-mini-nav">
                <Link href={`/aluno/aula-demo?trilha=${track.slug}`} className="btn">Continuar de onde parou</Link>
                <a href={`#unidade-${currentModuleIndex + 1}`} className="btn-secondary">Abrir unidade atual</a>
                <a href={`#unidade-${Math.min(nextModuleIndex + 1, modules.length)}`} className="btn-ghost">Ver proxima unidade</a>
              </div>
            </section>

            <section id="apresentacao" className="ava-panel">
              <div className="kicker">Apresentacao</div>
              <h2 style={{ marginTop: 8 }}>Como esta trilha foi organizada</h2>
              <p style={{ marginTop: 10 }}>
                Primeiro voce entra na unidade atual. Depois assiste ao video, faz a leitura digital, pratica com as questoes e fecha com revisao. O PDF fica como apoio. O gabarito so aparece depois da sua tentativa.
              </p>
              <div className="ava-material-grid" style={{ marginTop: 18 }}>
                <article className="ava-material-card">
                  <strong>Status de cobertura</strong>
                  <p style={{ marginTop: 8 }}>
                    {coverage.completos} completo(s), {coverage.parciais} parcial(is) e {coverage.ausentes} ausente(s) neste cargo.
                  </p>
                </article>
                <article className="ava-material-card">
                  <strong>Materiais liberados</strong>
                  <p style={{ marginTop: 8 }}>
                    {track.materiais.length} unidade(s), {questionBundle.questoes.length} questoes e {simulados.length} simulado(s) da area.
                  </p>
                </article>
              </div>
            </section>

            <section id={`unidade-${currentModuleIndex + 1}`} className="ava-panel">
              <TrackModulesBoard
                title="Unidades do seu curso"
                subtitle="A trilha foi separada por unidade para voce estudar sem se perder no conteudo."
                continueHref={`/aluno/aula-demo?trilha=${track.slug}`}
                completeHref="#questoes"
                nextHref={`#unidade-${Math.min(nextModuleIndex + 1, modules.length)}`}
                modules={modules}
              />
            </section>

            <section id="video">
              <LessonVideoPanel
                title={videoPrincipal?.titulo ?? "Curadoria em validacao"}
                description={
                  videoPrincipal?.url
                    ? "O video da unidade ja fica dentro da plataforma. Depois dele, siga para a leitura e para as questoes."
                    : "Esta unidade ja tem contexto pedagogico e roteiro de estudo. Enquanto o link final do video entra, voce pode seguir com leitura, questoes e revisao."
                }
                disciplina={etapaAtual?.modulo ?? currentMaterial.modulo}
                nextStep={progress.nextStep}
                video={videoPrincipal}
              />
            </section>

            <section id="leitura" className="ava-panel">
              <div className="kicker">Livro digital</div>
              <h2 style={{ marginTop: 8 }}>Texto BenThec da unidade atual</h2>
              <p style={{ marginTop: 10 }}>
                Aqui fica a leitura principal da aula. O objetivo e estudar sem sair da trilha, com ritmo parecido com AVA de faculdade e curso premium.
              </p>

              {etapaAtual ? (
                <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
                  <StudyCallout variant="destaque" title="Objetivo da aula">
                    {etapaAtual.objetivoDaAula}
                  </StudyCallout>
                  <StudyCallout variant="cai-na-prova" title="Como isso aparece na prova">
                    {etapaAtual.porQueCaiNaProva}
                  </StudyCallout>
                  <StudyCallout variant="exemplo" title="Exemplo pratico">
                    Pense neste conteudo dentro da rotina do cargo: primeiro voce identifica a situacao, depois aplica a regra certa e so entao marca a alternativa.
                  </StudyCallout>
                </div>
              ) : null}

              <div style={{ marginTop: 22 }}>
                {leituraDigital.length > 0 ? (
                  <MaterialReader blocks={leituraDigital} />
                ) : (
                  <p>A leitura digital desta unidade ainda nao foi encontrada.</p>
                )}
              </div>
            </section>

            <section id="pdf" className="ava-panel">
              <div className="kicker">Apostila PDF</div>
              <h2 style={{ marginTop: 8 }}>Arquivo de apoio da unidade</h2>
              <div className="ava-material-grid" style={{ marginTop: 18 }}>
                {track.materiais.map((material, index) => (
                  <article key={material.id} className="ava-material-card">
                    <div className="kicker">Unidade {index + 1}</div>
                    <h3 style={{ marginTop: 8 }}>{material.titulo}</h3>
                    <p style={{ marginTop: 8 }}>{material.resumo}</p>
                    <div className="actions" style={{ marginTop: 14 }}>
                      <Link href={`/aluno/aula-demo?trilha=${track.slug}&unidade=${index + 1}`} className="btn-ghost">
                        Ler agora
                      </Link>
                      {material.pdfExists ? (
                        <Link href={`/api/materials/${material.id}?variant=pdf`} className="btn-secondary" target="_blank">
                          Baixar
                        </Link>
                      ) : (
                        <span className="btn-secondary" aria-disabled="true" style={{ pointerEvents: "none", opacity: 0.55 }}>
                          Disponivel em breve
                        </span>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section id="questoes">
              <QuestionsPractice
                title={`Questoes da trilha - ${track.titulo}`}
                description="Voce responde primeiro. Depois a correcao, a explicacao e a sugestao de revisao aparecem."
                questions={questionBundle.questoes}
                storageKey={`benthec-question-history-${track.slug}`}
                productSlug={purchase.productSlug}
                trackSlug={track.slug}
              />
            </section>

            <section id="revisao" className="ava-panel">
              <div className="kicker">Revisao</div>
              <h2 style={{ marginTop: 8 }}>Feche a etapa antes de correr para a proxima</h2>
              <StudyCallout variant="resumo" title="Revisao rapida">
                {etapaAtual?.miniRevisao ?? "Volte aos pontos principais da unidade, releia o enunciado com calma e revise os erros que apareceram no treino."}
              </StudyCallout>
            </section>

            <section id="simulado" className="ava-panel">
              <div className="kicker">Simulado</div>
              <h2 style={{ marginTop: 8 }}>Depois da unidade, siga para o treino maior</h2>
              <div className="ava-material-grid" style={{ marginTop: 18 }}>
                <article className="ava-material-card">
                  <strong>Proximo simulado</strong>
                  <p style={{ marginTop: 8 }}>{simulados[0]?.titulo ?? "Simulado da area em preparacao"}</p>
                  <p style={{ marginTop: 8 }}>{simulados[0]?.descricao ?? "O treino maior entra logo depois desta unidade."}</p>
                </article>
                <article className="ava-material-card" id="recursos">
                  <strong>Recursos complementares</strong>
                  <p style={{ marginTop: 8 }}>{complementares.length} material(is) complementar(es) mapeado(s) para revisao desta frente.</p>
                  <p style={{ marginTop: 8 }}>{redacaoOverview.pendentes} redacao(oes) em andamento no fluxo de acompanhamento.</p>
                </article>
              </div>
              <div className="actions" style={{ marginTop: 18 }}>
                <Link href={`/simulados?area=${track.area}`} className="btn">
                  Abrir simulados
                </Link>
                <Link href="/redacao" className="btn-secondary">
                  Ir para redacao
                </Link>
              </div>
            </section>

            <section className="ava-panel">
              <DisciplineCompletionPanel
                trackSlug={track.slug}
                totalUnits={track.materiais.length}
                disciplineName={track.titulo}
                nextHref={`/simulados?area=${track.area}`}
                fallbackMission={progress.nextStep}
                productSlug={purchase.productSlug}
              />
            </section>

            <section id="suporte" className="ava-panel">
              <div className="kicker">Suporte</div>
              <h2 style={{ marginTop: 8 }}>Se travar, a gente segue com voce.</h2>
              <p style={{ marginTop: 10 }}>
                Seu curso agora tem caminho claro. Se aparecer duvida, voce nao precisa procurar sozinho onde continuar.
              </p>
              <div className="actions" style={{ marginTop: 18 }}>
                <Link
                  href="https://wa.me/5527999850434?text=Ola,%20preciso%20de%20ajuda%20na%20minha%20trilha%20BenThec."
                  className="btn"
                  target="_blank"
                >
                  Falar com suporte
                </Link>
                <Link href={`/aluno/aula-demo?trilha=${track.slug}`} className="btn-secondary">
                  Abrir aula guiada
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

import Link from "next/link";
import { QuestionsPractice } from "@/components/questions-practice";
import { JourneyProgress } from "@/components/journey-progress";
import { LessonVideoPanel } from "@/components/lesson-video-panel";
import { MaterialReader } from "@/components/material-reader";
import { QuickNav } from "@/components/quick-nav";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StudyCallout } from "@/components/study-callout";
import { UnitCompletionPanel } from "@/components/unit-completion-panel";
import { requireStudentAccess } from "@/lib/access";
import { getCuradoriaTrack, getFeaturedTrack, getTrackProgressDetails } from "@/lib/curadoria";
import { getJornadaByTrack } from "@/lib/jornada-aprovacao";
import { readMaterialMarkdown } from "@/lib/material-reading";
import { getPremiumLessonBundle } from "@/lib/premium-lessons";
import { getTracksForPlan } from "@/lib/produtos";

type LessonDemoPageProps = {
  searchParams?: Promise<{
    trilha?: string;
    unidade?: string;
  }>;
};

function parseDurationInMinutes(duration?: string | null) {
  if (!duration) return null;
  const normalized = duration.trim();
  const hhmmss = normalized.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);

  if (hhmmss) {
    const hasHours = Boolean(hhmmss[3]);
    const hours = hasHours ? Number(hhmmss[1]) : 0;
    const minutes = Number(hasHours ? hhmmss[2] : hhmmss[1]);
    const seconds = Number(hasHours ? hhmmss[3] : hhmmss[2]);
    return Math.max(1, Math.round(hours * 60 + minutes + seconds / 60));
  }

  const numeric = normalized.match(/(\d{1,3})/);
  return numeric ? Number(numeric[1]) : null;
}

function getEstimatedStudyTime(videoDuration?: string | null, readingBlocks = 0, questionsCount = 0) {
  const videoMinutes = parseDurationInMinutes(videoDuration) ?? 12;
  const readingMinutes = Math.max(6, Math.round(readingBlocks * 1.5));
  const practiceMinutes = Math.max(6, questionsCount * 2);
  return videoMinutes + readingMinutes + practiceMinutes;
}

function getDisciplineProgress(jornada: ReturnType<typeof getJornadaByTrack>, unitIndex: number, modulo: string) {
  const sameDiscipline = jornada.filter((item) => item.modulo === modulo);
  if (sameDiscipline.length === 0) {
    return 0;
  }

  const currentPosition = sameDiscipline.findIndex((item) => item.id === jornada[unitIndex]?.id);
  return Math.round(((Math.max(currentPosition, 0) + 1) / sameDiscipline.length) * 100);
}

function getLessonFallbackSummary(title: string) {
  return [
    `Ponto central da aula: ${title}.`,
    "Leia com foco em identificar a ideia principal antes de partir para as questoes.",
    "Feche a etapa registrando em uma frase o que voce precisa lembrar na prova.",
  ];
}

export default async function LessonDemoPage({ searchParams }: LessonDemoPageProps) {
  const { purchase } = await requireStudentAccess();
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const trackSlug = resolvedSearchParams?.trilha;
  const requestedUnit = Number(resolvedSearchParams?.unidade ?? "1");
  const currentTrack = (trackSlug ? getCuradoriaTrack(trackSlug) : null) ?? getFeaturedTrack();
  const allowedTracks = getTracksForPlan(purchase.planId);

  if (!allowedTracks.some((item) => item.slug === currentTrack.slug)) {
    return null;
  }

  const jornada = getJornadaByTrack(currentTrack.slug);
  if (jornada.length === 0) {
    return null;
  }

  const unitIndex = Number.isFinite(requestedUnit) ? Math.min(Math.max(requestedUnit - 1, 0), jornada.length - 1) : 0;
  const etapaAtual = jornada[unitIndex];
  const leituraDigital = readMaterialMarkdown(etapaAtual.apostila, 240);
  const progress = getTrackProgressDetails(currentTrack.slug);
  const premiumBundle = getPremiumLessonBundle(etapaAtual.modulo, etapaAtual.titulo, currentTrack.slug);
  const previousHref = `/aluno/aula-demo?trilha=${currentTrack.slug}&unidade=${Math.max(1, unitIndex)}`;
  const nextHref = `/aluno/aula-demo?trilha=${currentTrack.slug}&unidade=${Math.min(jornada.length, unitIndex + 2)}`;
  const estimatedTime = getEstimatedStudyTime(etapaAtual.videoPrincipal?.duracao, leituraDigital.length, etapaAtual.questoesRelacionadas.length);
  const disciplineProgress = getDisciplineProgress(jornada, unitIndex, etapaAtual.modulo);
  const primaryLesson = premiumBundle?.lessons[0];
  const objectiveText = primaryLesson?.objective ?? etapaAtual.objetivoDaAula;
  const whyItFallsText = primaryLesson?.whyItFalls ?? etapaAtual.porQueCaiNaProva;
  const summaryItems = primaryLesson?.structuredSummary ?? getLessonFallbackSummary(etapaAtual.titulo);
  const nextMissionText = primaryLesson?.nextMission ?? etapaAtual.proximoPasso;

  return (
    <>
      <SiteHeader ctaLabel="Voltar ao curso" ctaHref={`/aluno/cargos/${currentTrack.slug}`} />

      <main className="section ava-lesson-page">
        <style>{`
          .ava-lesson-page {
            background:
              radial-gradient(circle at top left, rgba(197,139,0,.14), transparent 24%),
              linear-gradient(180deg, #020617 0%, #0b1120 100%);
          }

          .ava-lesson-shell {
            display: grid;
            gap: 18px;
          }

          .ava-lesson-sidebar {
            position: sticky;
            top: 92px;
            align-self: start;
            display: none;
            gap: 16px;
            border-radius: 28px;
            border: 1px solid rgba(255,255,255,.08);
            background: rgba(10,14,23,.95);
            padding: 16px;
          }

          .ava-lesson-sidebar h2 {
            margin: 0;
            padding: 10px 12px;
            border-radius: 14px;
            background: rgba(255,255,255,.06);
            font-size: .96rem;
          }

          .ava-lesson-link {
            display: grid;
            gap: 4px;
            padding: 12px 14px;
            border-radius: 16px;
            color: #f8fafc;
            text-decoration: none;
            border: 1px solid rgba(255,255,255,.06);
            background: rgba(255,255,255,.02);
          }

          .ava-lesson-link span {
            color: #94a3b8;
            font-size: .82rem;
          }

          .ava-lesson-main {
            display: grid;
            gap: 18px;
          }

          .ava-tabs {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            padding: 10px;
            border-radius: 22px;
            background: rgba(2,6,23,.88);
            border: 1px solid rgba(255,255,255,.08);
          }

          .ava-tab {
            min-height: 42px;
            display: inline-flex;
            align-items: center;
            padding: 0 14px;
            border-radius: 14px;
            color: #f8fafc;
            text-decoration: none;
            font-weight: 700;
            background: rgba(255,255,255,.04);
          }

          .ava-tab.active {
            background: linear-gradient(135deg, rgba(197,139,0,.26), rgba(197,139,0,.12));
          }

          .ava-lesson-card,
          .ava-strip-card {
            border-radius: 30px;
            border: 1px solid rgba(255,255,255,.08);
            background: rgba(15,23,42,.9);
            box-shadow: 0 20px 60px rgba(2,6,23,.24);
            padding: 22px;
          }

          .ava-lesson-card p,
          .ava-strip-card p {
            color: #cbd5e1;
          }

          .ava-unit-strip {
            display: grid;
            gap: 12px;
          }

          .ava-unit-chip {
            min-width: 180px;
            border-radius: 18px;
            border: 1px solid rgba(255,255,255,.08);
            background: rgba(255,255,255,.03);
            padding: 14px;
          }

          .ava-unit-chip.active {
            border-color: rgba(197,139,0,.34);
            box-shadow: 0 0 0 1px rgba(197,139,0,.18) inset;
          }

          .ava-unit-chip span {
            color: #94a3b8;
            font-size: .8rem;
          }

          .ava-actions-row {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }

          .ava-premium-stack {
            display: grid;
            gap: 18px;
            margin-top: 22px;
          }

          .ava-premium-block {
            display: grid;
            gap: 14px;
            padding: 20px;
            border-radius: 24px;
            border: 1px solid rgba(255,255,255,.08);
            background: rgba(255,255,255,.03);
          }

          .ava-quick-grid {
            display: grid;
            gap: 10px;
          }

          .ava-quick-item {
            border-radius: 18px;
            border: 1px solid rgba(255,255,255,.08);
            background: rgba(2,6,23,.42);
            padding: 16px;
            display: grid;
            gap: 8px;
          }

          @media (min-width: 1100px) {
            .ava-lesson-shell {
              grid-template-columns: 280px minmax(0, 1fr);
              align-items: start;
            }

            .ava-lesson-sidebar {
              display: grid;
            }

            .ava-unit-strip {
              grid-template-columns: repeat(5, minmax(0, 1fr));
            }
          }
        `}</style>

        <div className="page-shell ava-lesson-shell">
          <aside className="ava-lesson-sidebar">
            <div style={{ display: "grid", gap: 10 }}>
              <h2>Minha Trilha</h2>
              <a href="#inicio" className="ava-lesson-link"><strong>Inicio</strong><span>Panorama da unidade</span></a>
              <a href="#introducao" className="ava-lesson-link"><strong>Apresentacao</strong><span>Boas-vindas da aula</span></a>
              {jornada.map((item, index) => (
                <Link key={item.id} href={`/aluno/aula-demo?trilha=${currentTrack.slug}&unidade=${index + 1}`} className="ava-lesson-link">
                  <strong>Unidade {index + 1}</strong>
                  <span>{item.modulo}</span>
                </Link>
              ))}
              <a href="#revisao" className="ava-lesson-link"><strong>Revisao</strong><span>Fechamento da aula</span></a>
              <a href={`/simulados?area=${currentTrack.area}`} className="ava-lesson-link"><strong>Simulado</strong><span>Treino maior da area</span></a>
            </div>

            <div style={{ display: "grid", gap: 10 }}>
              <h2>Meus Materiais</h2>
              <a href="#leitura" className="ava-lesson-link"><strong>Livro digital</strong><span>Leitura principal</span></a>
              <a href="#pdf" className="ava-lesson-link"><strong>Apostila PDF</strong><span>Arquivo de apoio</span></a>
              <a href="#video" className="ava-lesson-link"><strong>Videos</strong><span>Player dentro da aula</span></a>
              <a href="#questoes" className="ava-lesson-link"><strong>Questoes</strong><span>Treino da etapa</span></a>
              <a href="#revisao" className="ava-lesson-link"><strong>Recursos interativos</strong><span>Revisao e proximo passo</span></a>
            </div>
          </aside>

          <div className="ava-lesson-main">
            <QuickNav
              title="Menu da aula"
              items={[
                { label: "Minha Trilha", href: "#inicio" },
                { label: "Proxima Aula", href: "#proximo-passo" },
                { label: "Biblioteca", href: "#leitura" },
                { label: "Videos", href: "#video" },
                { label: "Leitura", href: "#leitura" },
                { label: "Questoes", href: "#questoes" },
                { label: "Simulados", href: `/simulados?area=${currentTrack.area}` },
                { label: "Redacao", href: "/redacao" },
                { label: "Historico", href: "/redacao/historico" },
                { label: "Suporte", href: "#suporte" },
              ]}
            />

            <div className="ava-tabs">
              <a href="#inicio" className="ava-tab active">Inicio</a>
              <a href="#leitura" className="ava-tab">Livro Didatico</a>
              <a href="#video" className="ava-tab">Videos da Disciplina</a>
              <a href="#questoes" className="ava-tab">Objetos de Aprendizagem</a>
            </div>

            <section id="inicio" className="ava-lesson-card">
              <div className="kicker">Minha trilha</div>
              <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.6rem)", marginTop: 10 }}>{currentTrack.titulo}</h1>
              <p style={{ marginTop: 10 }}>
                Esta aula foi montada para parecer caminho de estudo: voce entra, entende o foco, aprende o essencial e avanca para a proxima unidade.
              </p>
              <div style={{ marginTop: 18 }}>
                <JourneyProgress
                  currentLabel={progress.currentStep}
                  nextLabel={progress.nextStep}
                  progress={progress.progress}
                  steps={progress.steps}
                />
              </div>
            </section>

            <section className="ava-strip-card">
              <div className="ava-actions-row">
                <Link href={previousHref} className="btn-secondary">Anterior</Link>
                <Link href={nextHref} className="btn-secondary">Proximo</Link>
                <a href="#revisao" className="btn-ghost">Marcar como assistido</a>
                <a href="#proximo-passo" className="btn">Concluir aula</a>
              </div>

              <div className="ava-unit-strip" style={{ marginTop: 18 }}>
                {jornada.slice(0, 5).map((item, index) => (
                  <Link
                    key={item.id}
                    href={`/aluno/aula-demo?trilha=${currentTrack.slug}&unidade=${index + 1}`}
                    className={`ava-unit-chip${index === unitIndex ? " active" : ""}`}
                  >
                    <strong>{item.titulo}</strong>
                    <span>{index === unitIndex ? "Aula aberta agora" : `Unidade ${index + 1}`}</span>
                  </Link>
                ))}
              </div>
            </section>

            <section id="introducao" className="ava-lesson-card">
              <div className="kicker">Apresentacao</div>
              <h2 style={{ marginTop: 8 }}>Boas-vindas a esta unidade</h2>
              <p style={{ marginTop: 10 }}>
                {primaryLesson?.opening ??
                  "Vamos por partes. Primeiro entenda o objetivo da aula. Depois veja o exemplo, assista ao video e pratique com as questoes relacionadas."}
              </p>
            </section>

            <section className="ava-lesson-card">
              <div className="kicker">1. Objetivo da aula</div>
              <h2 style={{ marginTop: 8 }}>{etapaAtual.titulo}</h2>
              <p style={{ marginTop: 10 }}>{objectiveText}</p>
              <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
                <StudyCallout variant="resumo" title="Tempo estimado">
                  Reserve cerca de {estimatedTime} minutos para fechar esta aula com video, leitura, questoes e revisao.
                </StudyCallout>
                <StudyCallout variant="cai-na-prova" title="Importancia para o edital">
                  {whyItFallsText}
                </StudyCallout>
              </div>
            </section>

            {premiumBundle ? (
              <section className="ava-lesson-card">
                <div className="kicker">2. Aula premium</div>
                <h2 style={{ marginTop: 8 }}>{premiumBundle.label}</h2>
                <p style={{ marginTop: 10 }}>
                  Aqui a aula sai do modo catalogo e entra no modo professor guiando seu estudo: conceito, exemplo, alerta de erro, dica de banca e proxima missao.
                </p>

                <div className="ava-premium-stack">
                  {premiumBundle.lessons.map((lesson, index) => (
                    <article key={lesson.slug} className="ava-premium-block">
                      <div className="kicker">Microaula {index + 1}</div>
                      <h3 style={{ margin: 0, fontSize: "1.5rem" }}>{lesson.title}</h3>
                      <p style={{ margin: 0 }}>{lesson.objective}</p>

                      <StudyCallout variant="destaque" title="Explicacao principal robusta">
                        <div style={{ display: "grid", gap: 10 }}>
                          {lesson.explanation.map((paragraph) => (
                            <p key={paragraph} style={{ margin: 0 }}>
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </StudyCallout>

                      <StudyCallout variant="exemplo" title="Exemplo pratico">
                        {lesson.example}
                      </StudyCallout>

                      <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
                        <StudyCallout variant="erro-comum" title="Erro comum">
                          {lesson.commonError}
                        </StudyCallout>
                        <StudyCallout variant="dica-banca" title="Dica de banca">
                          {lesson.bankTip}
                        </StudyCallout>
                      </div>

                      <StudyCallout variant="resumo" title="Guarde isso">
                        <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8 }}>
                          {lesson.keepThis.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </StudyCallout>

                      <StudyCallout variant="questao-comentada" title="Mini exercicio">
                        {lesson.miniExercise}
                      </StudyCallout>

                      <section style={{ display: "grid", gap: 12 }}>
                        <strong style={{ color: "#fff", fontSize: "1.05rem" }}>Questoes rapidas</strong>
                        <div className="ava-quick-grid">
                          {lesson.quickQuestions.map((question) => (
                            <div key={question.prompt} className="ava-quick-item">
                              <strong style={{ color: "#f8fafc" }}>{question.prompt}</strong>
                              <p style={{ margin: 0, color: "#cbd5e1" }}>{question.answerGuide}</p>
                            </div>
                          ))}
                        </div>
                      </section>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

            <section id="video">
              <LessonVideoPanel
                title={etapaAtual.videoPrincipal?.titulo ?? "Curadoria em validacao"}
                description={
                  etapaAtual.videoPrincipal?.url
                    ? "O video principal desta aula ja fica embutido aqui dentro. Assista e siga sem sair da trilha."
                    : "Esta etapa ja tem curadoria aprovada. Enquanto o link final do video entra, a aula continua com texto BenThec, questoes e revisao."
                }
                disciplina={etapaAtual.modulo}
                nextStep={nextMissionText}
                video={etapaAtual.videoPrincipal}
              />
            </section>

            <section id="leitura" className="ava-lesson-card">
              <div className="kicker">3. Livro digital</div>
              <p style={{ marginTop: 10 }}>
                Leia esta parte com calma. Nao precisa aprender tudo hoje. O foco e entender a ideia central e reconhecer como ela aparece na prova.
              </p>

              <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
                <StudyCallout variant="resumo" title="Resumo estruturado">
                  <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8 }}>
                    {summaryItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </StudyCallout>
                {!premiumBundle ? (
                  <StudyCallout variant="destaque" title="Mini exercicio">
                    Explique com suas palavras o ponto central desta aula antes de seguir para as questoes.
                  </StudyCallout>
                ) : null}
              </div>

              <div style={{ marginTop: 22 }}>
                {leituraDigital.length > 0 ? (
                  <MaterialReader blocks={leituraDigital} />
                ) : (
                  <p>Leitura digital em preparacao.</p>
                )}
              </div>
            </section>

            <section id="pdf" className="ava-lesson-card">
              <div className="kicker">4. Apostila PDF</div>
              <p style={{ marginTop: 10 }}>O PDF continua como apoio secundario desta aula.</p>
              <div className="actions" style={{ marginTop: 18 }}>
                {etapaAtual.apostila.pdfExists ? (
                  <Link href={`/api/materials/${etapaAtual.apostila.id}?variant=pdf`} className="btn-secondary" target="_blank">
                    Baixar PDF
                  </Link>
                ) : (
                  <span className="btn-secondary" aria-disabled="true" style={{ opacity: 0.55, pointerEvents: "none" }}>
                    PDF em breve
                  </span>
                )}
              </div>
            </section>

            <section id="questoes">
              <QuestionsPractice
                title={`Questoes da etapa - ${etapaAtual.modulo}`}
                description="Voce le, marca a alternativa, confirma a resposta e so depois recebe gabarito, comentario e revisao sugerida."
                questions={etapaAtual.questoesRelacionadas}
                storageKey={`benthec-lesson-practice-${currentTrack.slug}-${etapaAtual.apostila.slug}-${unitIndex + 1}`}
                productSlug={purchase.productSlug}
                trackSlug={currentTrack.slug}
              />
            </section>

            <section id="revisao" className="ava-lesson-card">
              <div className="kicker">5. Revisao rapida</div>
              <h2 style={{ marginTop: 8 }}>Fechamento da unidade</h2>
              <p style={{ marginTop: 10 }}>{etapaAtual.miniRevisao}</p>
              <div style={{ marginTop: 18 }}>
                <StudyCallout variant="destaque" title="Proxima missao">
                  {nextMissionText}
                </StudyCallout>
              </div>
              <div id="proximo-passo" style={{ marginTop: 18 }}>
                <UnitCompletionPanel
                  unitLabel={`Unidade ${unitIndex + 1} - ${etapaAtual.titulo}`}
                  nextMission={nextMissionText}
                  previousHref={previousHref}
                  nextHref={nextHref}
                  completionKey={`benthec-unit-completion-${currentTrack.slug}-${unitIndex + 1}`}
                  generalProgress={progress.progress}
                  disciplineProgress={disciplineProgress}
                  productSlug={purchase.productSlug}
                  trackSlug={currentTrack.slug}
                />
              </div>
            </section>

            <section id="suporte" className="ava-lesson-card">
              <div className="kicker">Suporte</div>
              <h2 style={{ marginTop: 8 }}>Voce nao esta estudando sozinho</h2>
              <p style={{ marginTop: 10 }}>
                Se alguma parte travar, fale com a equipe e siga no mesmo fluxo, sem perder o ponto em que voce parou.
              </p>
              <div className="actions" style={{ marginTop: 18 }}>
                <Link
                  href="https://wa.me/5527999850434?text=Ola,%20preciso%20de%20ajuda%20na%20minha%20aula%20BenThec."
                  className="btn"
                  target="_blank"
                >
                  Pedir ajuda
                </Link>
                <Link href={`/simulados?area=${currentTrack.area}`} className="btn-secondary">
                  Ir para simulados
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

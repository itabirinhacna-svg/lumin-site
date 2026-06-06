import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { requireStudentAccess } from "@/lib/access";
import { getCuradoriaTrack, getFeaturedTrack } from "@/lib/curadoria";
import { getQuestoesByCargoSlug } from "@/lib/questoes";
import { getSimuladosByArea } from "@/lib/simulados";
import { getVideosByCargoSlug } from "@/lib/videos-curados";

type LessonDemoPageProps = {
  searchParams?: Promise<{
    trilha?: string;
  }>;
};

export default async function LessonDemoPage({ searchParams }: LessonDemoPageProps) {
  await requireStudentAccess();

  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const trackSlug = resolvedSearchParams?.trilha;
  const currentTrack = (trackSlug ? getCuradoriaTrack(trackSlug) : null) ?? getFeaturedTrack();
  const primaryMaterial = currentTrack.materiais[0];
  const complementaryMaterials = currentTrack.materiais.slice(1);
  const questoes = getQuestoesByCargoSlug(currentTrack.slug);
  const simulados = getSimuladosByArea(currentTrack.area);
  const videos = getVideosByCargoSlug(currentTrack.slug);

  return (
    <>
      <SiteHeader ctaLabel="Voltar ao painel" ctaHref="/aluno" />

      <main className="section">
        <style>{`
          .lesson-real-shell {
            display: grid;
            gap: 18px;
          }

          .lesson-real-video {
            position: relative;
            width: 100%;
            padding-top: 56.25%;
            overflow: hidden;
            border-radius: 24px;
            border: 1px solid rgba(255,255,255,.08);
            box-shadow: var(--shadow);
            background: #020617;
          }

          .lesson-real-video iframe {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            border: 0;
          }

          .lesson-real-grid {
            display: grid;
            gap: 18px;
          }

          .lesson-real-row {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 18px;
          }

          .lesson-real-pills {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 18px;
          }

          .lesson-real-pill {
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

          .lesson-real-progress {
            margin-top: 16px;
            height: 12px;
            background: #e2e8f0;
            border-radius: 999px;
            overflow: hidden;
          }

          .lesson-real-progress span {
            display: block;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, #c58b00, #15803d);
          }

          .lesson-real-note {
            padding: 16px;
            border-radius: 18px;
            background: rgba(255,255,255,.04);
            border: 1px solid rgba(255,255,255,.06);
            color: #f8fafc;
            line-height: 1.65;
          }

          @media (min-width: 980px) {
            .lesson-real-shell {
              grid-template-columns: 1.15fr .85fr;
              align-items: start;
            }

            .lesson-real-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }
        `}</style>

        <div className="page-shell">
          <div className="lesson-real-shell">
            <section className="hero-card">
              <div className="kicker">Aula demonstrativa do AVA</div>
              <h1 style={{ fontSize: "clamp(2.1rem, 5vw, 3.8rem)" }}>{currentTrack.titulo}</h1>
              <p className="hero-copy">{currentTrack.resumo}</p>

              <div className="lesson-real-pills">
                <span className="lesson-real-pill">{currentTrack.bibliotecaStatus}</span>
                <span className="lesson-real-pill">{questoes.length} questoes liberadas</span>
                <span className="lesson-real-pill">{simulados.length} simulado(s) da area</span>
              </div>

              <div className="lesson-real-video" style={{ marginTop: 20 }}>
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Videoaula demonstrativa"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="lesson-real-grid" style={{ marginTop: 18 }}>
                <article className="glass-card">
                  <div className="kicker">Apostila principal</div>
                  <h3>{primaryMaterial.titulo}</h3>
                  <p>{primaryMaterial.resumo}</p>
                  <div className="lesson-real-row">
                    <Link href={`/api/materials/${primaryMaterial.id}?variant=pdf`} className="btn-secondary" target="_blank">
                      Abrir PDF
                    </Link>
                    <Link
                      href={`/api/materials/${primaryMaterial.id}?variant=markdown`}
                      className="btn-ghost"
                      target="_blank"
                    >
                      Ler Markdown
                    </Link>
                  </div>
                </article>

                <article className="glass-card">
                  <div className="kicker">Progresso da trilha</div>
                  <h3>Leitura, pratica e revisao</h3>
                  <p>Agora a trilha combina material, questoes autorais e treino por area dentro do mesmo fluxo.</p>
                  <div className="lesson-real-progress">
                    <span />
                  </div>
                  <p style={{ marginTop: 12 }}>Etapa atual: leitura orientada, pratica no estilo da banca e revisao comentada.</p>
                </article>
              </div>
            </section>

            <aside style={{ display: "grid", gap: 18 }}>
              <article className="glass-card">
                <div className="kicker">Materiais complementares</div>
                {complementaryMaterials.length ? (
                  <ul className="list-clean">
                    {complementaryMaterials.map((material) => (
                      <li key={material.id}>
                        <strong>{material.titulo}</strong>
                        <br />
                        {material.resumo}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="lesson-real-note">Esta trilha concentra o estudo principal em um unico caderno de apoio.</p>
                )}
              </article>

              <article className="glass-card">
                <div className="kicker">Questoes da trilha</div>
                <ul className="list-clean">
                  {questoes.slice(0, 3).map((questao) => (
                    <li key={questao.id}>
                      <strong>{questao.disciplina}</strong>
                      <br />
                      {questao.enunciado}
                    </li>
                  ))}
                </ul>
                <div className="lesson-real-row">
                  <Link href="/questoes" className="btn-secondary">
                    Ver banco completo
                  </Link>
                  <Link href="/simulados" className="btn-ghost">
                    Abrir simulados
                  </Link>
                </div>
              </article>

              <article className="glass-card">
                <div className="kicker">Curadoria de videos</div>
                <div className="lesson-real-note">
                  Videos mapeados para esta trilha: {videos.length}. Com link validado nesta sprint:{" "}
                  {videos.filter((video) => video.url).length}. Pendentes de curadoria:{" "}
                  {videos.filter((video) => video.status === "pendente de curadoria").length}.
                </div>
              </article>

              <article className="glass-card">
                <div className="kicker">Proxima etapa</div>
                <h3>{currentTrack.proximaAcao}</h3>
                <p>Depois da leitura, avance para as questoes e o simulado da area antes de seguir para nova revisao.</p>
                <div className="lesson-real-row">
                  <Link href="/aluno" className="btn">
                    Voltar ao AVA
                  </Link>
                  <Link
                    href="https://wa.me/5527999850434?text=Ola,%20preciso%20de%20ajuda%20na%20minha%20trilha%20BenThec."
                    className="btn-ghost"
                    target="_blank"
                  >
                    WhatsApp
                  </Link>
                </div>
              </article>
            </aside>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

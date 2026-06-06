import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { requireStudentAccess } from "@/lib/access";
import { getCuradoriaTrack, getFeaturedTrack } from "@/lib/curadoria";
import { getQuestoesByCargoSlug } from "@/lib/questoes";

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
  const questoes = getQuestoesByCargoSlug(currentTrack.slug);

  return (
    <>
      <SiteHeader ctaLabel="Voltar ao painel" ctaHref="/aluno" />

      <main className="section">
        <div className="page-shell">
          <div className="auth-grid" style={{ alignItems: "start" }}>
            <section className="hero-card" style={{ background: "#0f172a", borderColor: "rgba(255,255,255,.08)" }}>
              <div className="kicker" style={{ color: "#f3cf6f" }}>
                Aula demo
              </div>
              <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "#fff" }}>{currentTrack.titulo}</h1>
              <p className="hero-copy" style={{ color: "#cbd5e1" }}>
                Player, apostila, questões, checklist e próxima etapa dentro de uma experiência de estudo com cara de
                app moderno.
              </p>

              <div
                style={{
                  position: "relative",
                  width: "100%",
                  paddingTop: "56.25%",
                  overflow: "hidden",
                  borderRadius: 24,
                  background: "#020617",
                  border: "1px solid rgba(255,255,255,.08)",
                  marginTop: 20,
                }}
              >
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Videoaula demonstrativa"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
                />
              </div>

              <div className="section-grid" style={{ marginTop: 18 }}>
                <article className="glass-card" style={{ background: "#111827", borderColor: "rgba(255,255,255,.08)" }}>
                  <div className="kicker" style={{ color: "#f3cf6f" }}>
                    Apostila
                  </div>
                  <h3 style={{ color: "#fff" }}>{primaryMaterial.titulo}</h3>
                  <p style={{ color: "#cbd5e1" }}>{primaryMaterial.resumo}</p>
                  <div className="actions" style={{ marginTop: 18 }}>
                    <Link href={`/api/materials/${primaryMaterial.id}?variant=pdf`} className="btn-secondary" target="_blank">
                      Abrir PDF
                    </Link>
                  </div>
                </article>

                <article className="glass-card" style={{ background: "#111827", borderColor: "rgba(255,255,255,.08)" }}>
                  <div className="kicker" style={{ color: "#f3cf6f" }}>
                    Checklist
                  </div>
                  <ul className="list-clean">
                    <li>Ler a apostila principal</li>
                    <li>Assistir a aula</li>
                    <li>Resolver questões da trilha</li>
                    <li>Revisar os erros</li>
                    <li>Seguir para a próxima etapa</li>
                  </ul>
                </article>
              </div>
            </section>

            <aside style={{ display: "grid", gap: 18 }}>
              <article className="glass-card" style={{ background: "#0f172a", borderColor: "rgba(255,255,255,.08)" }}>
                <div className="kicker" style={{ color: "#f3cf6f" }}>
                  Questões da aula
                </div>
                <ul className="list-clean">
                  {questoes.slice(0, 3).map((questao) => (
                    <li key={questao.id}>
                      <strong style={{ color: "#fff" }}>{questao.disciplina}</strong>
                      <br />
                      {questao.enunciado}
                    </li>
                  ))}
                </ul>
              </article>

              <article className="glass-card" style={{ background: "#0f172a", borderColor: "rgba(255,255,255,.08)" }}>
                <div className="kicker" style={{ color: "#f3cf6f" }}>
                  Progresso
                </div>
                <h3 style={{ color: "#fff" }}>Próxima etapa visível</h3>
                <p style={{ color: "#cbd5e1" }}>Depois da aula, avance para as questões e siga a trilha sem perder ritmo.</p>
                <div
                  style={{
                    marginTop: 16,
                    height: 12,
                    borderRadius: 999,
                    background: "#1f2937",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ width: "58%", height: "100%", background: "linear-gradient(90deg, #15803d, #22c55e)" }} />
                </div>
                <div className="actions" style={{ marginTop: 18 }}>
                  <Link href="/questoes" className="btn">
                    Próxima etapa
                  </Link>
                  <Link
                    href="https://wa.me/5527999850434?text=Ola,%20preciso%20de%20ajuda%20na%20minha%20trilha%20BenThec."
                    className="btn-ghost"
                    target="_blank"
                  >
                    Suporte
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

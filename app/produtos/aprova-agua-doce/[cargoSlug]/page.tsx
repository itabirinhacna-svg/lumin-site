import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCuradoriaTrack, getTrackProgress } from "@/lib/curadoria";
import { getQuestoesDisponiveisParaCargo } from "@/lib/questoes";
import { getSimuladosDisponiveisParaCargo } from "@/lib/simulados";
import { getConteudosByCargoSlug } from "@/lib/videos-curados";

type CargoCommercialPageProps = {
  params: Promise<{
    cargoSlug: string;
  }>;
};

export default async function CargoCommercialPage({ params }: CargoCommercialPageProps) {
  const { cargoSlug } = await params;
  const track = getCuradoriaTrack(cargoSlug);

  if (!track) {
    notFound();
  }

  const questionBundle = getQuestoesDisponiveisParaCargo(track.slug, track.area);
  const simulados = getSimuladosDisponiveisParaCargo(track.area);
  const videos = getConteudosByCargoSlug(track.slug, "video");
  const progress = getTrackProgress(track.slug);

  return (
    <>
      <SiteHeader ctaLabel="Quero estudar este cargo" ctaHref="/checkout?plan=agua-doce-completo" />

      <main className="section">
        <div className="page-shell" style={{ display: "grid", gap: 22 }}>
          <section className="hero-card">
            <div className="kicker">{track.publico}</div>
            <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 4.2rem)" }}>{track.titulo}</h1>
            <p className="hero-copy">{track.resumo}</p>

            <div className="tag-row" style={{ marginTop: 18 }}>
              <span className="pill">{track.materiais.length} apostilas e materiais</span>
              <span className="pill">{questionBundle.questoes.length} questoes acessiveis</span>
              <span className="pill">{simulados.length} simulados da area</span>
              <span className="pill">{videos.length} entradas de video por modulo</span>
            </div>

            <div className="actions" style={{ marginTop: 18 }}>
              <Link href="/checkout?plan=agua-doce-completo" className="btn">
                Quero estudar este cargo
              </Link>
              <Link href={`/aluno/cargos/${track.slug}`} className="btn-ghost">
                Ver experiencia do aluno
              </Link>
            </div>
          </section>

          <div className="section-grid" style={{ alignItems: "start" }}>
            <article className="glass-card">
              <div className="kicker">O que a pessoa leva</div>
              <h2 style={{ marginTop: 8 }}>Curso pensado para o proprio cargo</h2>
              <ul className="feature-list" style={{ marginTop: 16 }}>
                <li>Pagina propria com progresso individual</li>
                <li>Biblioteca com PDF e Markdown por modulo</li>
                <li>Questoes {questionBundle.tipo === "proprias" ? "do cargo" : "de base da area"} visiveis na interface</li>
                <li>Simulados da area sem esconder o fluxo do aluno</li>
              </ul>
            </article>

            <article className="glass-card">
              <div className="kicker">Por que faz sentido comprar aqui</div>
              <h2 style={{ marginTop: 8 }}>Voce entra e ja sabe por onde comecar.</h2>
              <p style={{ marginTop: 10 }}>
                Em vez de um monte de material solto, voce recebe uma trilha com video, leitura, questoes e revisao no mesmo fluxo.
              </p>
              <div
                style={{
                  marginTop: 18,
                  height: 12,
                  borderRadius: 999,
                  background: "#1f2937",
                  overflow: "hidden",
                }}
              >
                <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #15803d, #22c55e)" }} />
              </div>
              <p style={{ marginTop: 12 }}>Exemplo de progresso da trilha: {progress}%.</p>
            </article>
          </div>

          <section className="glass-card">
            <div className="kicker">Biblioteca do cargo</div>
            <h2 style={{ marginTop: 8 }}>Materiais ja conectados ao curso</h2>
            <div style={{ display: "grid", gap: 16, marginTop: 18 }}>
              {track.materiais.map((material) => (
                <article key={material.id} className="plan-card">
                  <h3>{material.titulo}</h3>
                  <p style={{ marginTop: 10 }}>{material.resumo}</p>
                  <p style={{ marginTop: 10 }}>
                    PDF {material.pdfSizeLabel} | Markdown {material.markdownSizeLabel}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

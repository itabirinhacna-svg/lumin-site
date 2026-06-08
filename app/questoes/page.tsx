import Link from "next/link";
import { QuestionsPractice } from "@/components/questions-practice";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCuradoriaTrack, getTracksByArea } from "@/lib/curadoria";
import {
  getQuestionBankCoverage,
  getQuestoesByProduto,
  getQuestoesDisponiveisParaCargo,
  getQuestoesOverview,
} from "@/lib/questoes";

const areaLabels = {
  operacionais: "Operacionais",
  saude: "Saude e cuidado",
  magisterio: "Magisterio",
  pmes: "PMES",
  enem: "ENEM",
} as const;

type QuestoesPageProps = {
  searchParams?: Promise<{
    trilha?: string;
    produto?: "pmes" | "agua-doce" | "enem";
  }>;
};

export default async function QuestoesPage({ searchParams }: QuestoesPageProps) {
  const params = (await searchParams) ?? {};
  const selectedTrack = params.trilha ? getCuradoriaTrack(params.trilha) : null;
  const selectedProduct = params.produto === "pmes" || params.produto === "enem" ? params.produto : "agua-doce";
  const overview = getQuestoesOverview();
  const bankCoverage = getQuestionBankCoverage();
  const practiceQuestions = selectedTrack
    ? getQuestoesDisponiveisParaCargo(selectedTrack.slug, selectedTrack.area).questoes
    : getQuestoesByProduto(selectedProduct);

  const title = selectedTrack
    ? `Questoes para ${selectedTrack.titulo}`
    : selectedProduct === "pmes"
      ? "Banco de questoes PMES - estilo IDECAN"
      : selectedProduct === "enem"
        ? "Banco de treino ENEM"
        : "Banco de questoes Aprova Agua Doce";

  const description = selectedTrack
    ? "Voce responde primeiro. Depois a plataforma libera o gabarito, a explicacao e o que merece revisao."
    : selectedProduct === "pmes"
      ? "Questoes separadas por disciplina do edital, com tentativa antes da correcao e foco no estilo objetivo da IDECAN."
      : selectedProduct === "enem"
        ? "Treino por area do ENEM, com resposta primeiro, correcao depois e recorte por disciplina, assunto e dificuldade."
        : "Questoes ligadas as trilhas do Aprova Agua Doce, com filtros por disciplina, assunto, banca e dificuldade.";

  return (
    <>
      <SiteHeader ctaLabel="Voltar ao AVA" ctaHref="/area" />

      <main className="section">
        <div className="page-shell" style={{ display: "grid", gap: 24 }}>
          <div className="hero-card">
            <div className="kicker">
              {selectedProduct === "pmes" ? "Banco autoral em estilo IDECAN" : "Banco autoral em estilo IDESG"}
            </div>
            <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>{title}</h1>
            <p className="hero-copy">{description}</p>

            <div className="tag-row" style={{ marginTop: 18 }}>
              <span className="pill">{overview.totalQuestoes} questoes na base</span>
              <span className="pill">{overview.cargoCount} frentes mapeadas</span>
              <span className="pill">{overview.disciplinaCount} recortes pedagogicos</span>
              <span className="pill">{bankCoverage.estruturaPreparada.join(" / ")}</span>
            </div>

            <div className="actions" style={{ marginTop: 18 }}>
              <Link href="/questoes?produto=agua-doce" className={selectedProduct === "agua-doce" ? "btn" : "btn-secondary"}>
                Aprova Agua Doce
              </Link>
              <Link href="/questoes?produto=pmes" className={selectedProduct === "pmes" ? "btn" : "btn-secondary"}>
                PMES
              </Link>
              <Link href="/questoes?produto=enem" className={selectedProduct === "enem" ? "btn" : "btn-secondary"}>
                ENEM
              </Link>
            </div>
          </div>

          {!selectedTrack && selectedProduct === "agua-doce" ? (
            <div style={{ display: "grid", gap: 24 }}>
              {overview.porArea
                .filter((item) => item.area !== "pmes")
                .map((item) => (
                  <section key={item.area} className="glass-card">
                    <div className="kicker">{areaLabels[item.area]}</div>
                    <h2 style={{ marginTop: 8 }}>{item.total} questoes disponiveis</h2>
                    <p style={{ marginTop: 10 }}>
                      Escolha um cargo para abrir um recorte com filtro, correcao depois da tentativa e leitura comentada.
                    </p>

                    <div style={{ display: "grid", gap: 16, marginTop: 18 }}>
                      {getTracksByArea(item.area as "operacionais" | "saude" | "magisterio").map((track) => {
                        const questionBundle = getQuestoesDisponiveisParaCargo(track.slug, track.area);

                        return (
                          <article key={track.slug} className="plan-card">
                            <div className="kicker">{track.titulo}</div>
                            <p style={{ marginTop: 10 }}>
                              {questionBundle.questoes.length} questoes {questionBundle.tipo === "proprias" ? "do cargo" : "de base da area"}.
                            </p>
                            <div className="actions" style={{ marginTop: 16 }}>
                              <Link href={`/questoes?trilha=${track.slug}`} className="btn-secondary">
                                Abrir questoes
                              </Link>
                              <Link href={`/aluno/cargos/${track.slug}`} className="btn-ghost">
                                Abrir trilha
                              </Link>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </section>
                ))}
            </div>
          ) : null}

          <QuestionsPractice
            title={title}
            description={description}
            questions={practiceQuestions}
            storageKey={`benthec-question-history-${selectedTrack?.slug ?? selectedProduct}`}
            productSlug={selectedProduct}
            trackSlug={selectedTrack?.slug}
          />
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

import Link from "next/link";
import { QuestionsPractice } from "@/components/questions-practice";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getTracksByArea } from "@/lib/curadoria";
import { gerarSimuladoAutomatico, getSimuladoArchitecture, getSimuladoModes, getSimuladosByArea, getSimuladosResolvidos } from "@/lib/simulados";

const areaLabels = {
  operacionais: "Operacionais",
  saude: "Saude e cuidado",
  magisterio: "Magisterio",
  pmes: "PMES",
  enem: "ENEM",
} as const;

type SimuladosPageProps = {
  searchParams?: Promise<{
    area?: "operacionais" | "saude" | "magisterio";
    produto?: "agua-doce" | "pmes" | "enem";
    qtd?: "10" | "20" | "40";
  }>;
};

export default async function SimuladosPage({ searchParams }: SimuladosPageProps) {
  const params = (await searchParams) ?? {};
  const architecture = getSimuladoArchitecture();
  const selectedProduct = params.produto === "pmes" || params.produto === "enem" ? params.produto : "agua-doce";
  const selectedAmount = params.qtd === "20" || params.qtd === "40" ? Number(params.qtd) as 20 | 40 : 10;
  const modes = getSimuladoModes();
  const automatico =
    selectedProduct === "pmes"
      ? gerarSimuladoAutomatico({ produto: "pmes", quantidade: selectedAmount })
      : selectedProduct === "enem"
        ? gerarSimuladoAutomatico({ produto: "enem", quantidade: selectedAmount })
      : gerarSimuladoAutomatico({ produto: "agua-doce", quantidade: selectedAmount, area: params.area ?? "operacionais" });
  const simulados = params.area && selectedProduct === "agua-doce"
    ? getSimuladosByArea(params.area).map((simulado) => ({ ...simulado, questoes: [] as Array<null> }))
    : getSimuladosResolvidos();

  return (
    <>
      <SiteHeader ctaLabel="Voltar ao AVA" ctaHref="/area" />

      <main className="section">
        <div className="page-shell" style={{ display: "grid", gap: 20 }}>
          <div className="hero-card">
            <div className="kicker">Simulados iniciais</div>
            <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>
              {selectedProduct === "pmes" ? "Simulados PMES por peso do edital" : params.area ? `Treino da area ${areaLabels[params.area]}` : "Treino por area do Aprova Agua Doce"}
            </h1>
            <p className="hero-copy">
              A base agora esta preparada para montar blocos de 10, 20 ou 40 questoes, distribuindo automaticamente por disciplina conforme o recorte do produto.
            </p>
          </div>

          <section className="glass-card">
            <div className="kicker">Geracao automatica</div>
            <h2 style={{ marginTop: 8 }}>Monte um simulado em um clique</h2>
            <div className="actions" style={{ marginTop: 16 }}>
              <Link href={`/simulados?produto=${selectedProduct}&qtd=10${params.area ? `&area=${params.area}` : ""}`} className={selectedAmount === 10 ? "btn" : "btn-secondary"}>
                Treino rapido
              </Link>
              <Link href={`/simulados?produto=${selectedProduct}&qtd=20${params.area ? `&area=${params.area}` : ""}`} className={selectedAmount === 20 ? "btn" : "btn-secondary"}>
                Simulado medio
              </Link>
              <Link href={`/simulados?produto=${selectedProduct}&qtd=40${params.area ? `&area=${params.area}` : ""}`} className={selectedAmount === 40 ? "btn" : "btn-secondary"}>
                Simulado completo
              </Link>
            </div>
            <div className="section-grid" style={{ marginTop: 18 }}>
              <article className="plan-card">
                <strong>Quantidade solicitada</strong>
                <p style={{ marginTop: 8 }}>{automatico.quantidadeSolicitada}</p>
              </article>
              <article className="plan-card">
                <strong>Quantidade gerada</strong>
                <p style={{ marginTop: 8 }}>{automatico.quantidadeGerada}</p>
              </article>
              <article className="plan-card">
                <strong>Bancas preparadas</strong>
                <p style={{ marginTop: 8 }}>{architecture.bancasPreparadas.join(", ")}</p>
              </article>
              <article className="plan-card">
                <strong>Filtros combinados</strong>
                <p style={{ marginTop: 8 }}>{architecture.filtros.join(", ")}</p>
              </article>
            </div>
            <div className="section-grid" style={{ marginTop: 18 }}>
              {automatico.distribuicao.map((item) => (
                <article key={item.disciplina} className="plan-card">
                  <div className="kicker">{item.disciplina}</div>
                  <strong>{item.total} questao(oes)</strong>
                </article>
              ))}
            </div>
            <div className="tag-row" style={{ marginTop: 18 }}>
              {modes.map((mode) => (
                <span key={mode.slug} className="pill">
                  {mode.label}: {mode.quantidade}
                </span>
              ))}
            </div>
          </section>

          <div className="section-grid">
            {(Object.keys(areaLabels) as Array<keyof typeof areaLabels>)
              .filter((area) => area !== "pmes")
              .map((area) => (
                <article key={area} className="glass-card">
                  <div className="kicker">{areaLabels[area]}</div>
                  <h2 style={{ marginTop: 8 }}>{getSimuladosByArea(area).length} simulado(s)</h2>
                  <div className="actions" style={{ marginTop: 16 }}>
                    <Link href={`/simulados?area=${area}&produto=agua-doce`} className="btn-secondary">
                      Abrir area
                    </Link>
                  </div>
                </article>
              ))}
            <article className="glass-card">
              <div className="kicker">PMES</div>
              <h2 style={{ marginTop: 8 }}>Simulado por peso do edital</h2>
              <div className="actions" style={{ marginTop: 16 }}>
                <Link href="/simulados?produto=pmes&qtd=10" className="btn-secondary">
                  Abrir PMES
                </Link>
              </div>
            </article>
            <article className="glass-card">
              <div className="kicker">ENEM</div>
              <h2 style={{ marginTop: 8 }}>Simulado por area</h2>
              <div className="actions" style={{ marginTop: 16 }}>
                <Link href="/simulados?produto=enem&qtd=10" className="btn-secondary">
                  Abrir ENEM
                </Link>
              </div>
            </article>
          </div>

          <div style={{ display: "grid", gap: 20 }}>
            <article className="glass-card">
              <div className="kicker">{selectedProduct === "pmes" ? "IDECAN" : selectedProduct === "enem" ? "INEP" : "Simulado inicial"}</div>
              <h2 style={{ marginTop: 8 }}>Simulado automatico atual</h2>
              <p style={{ marginTop: 10 }}>
                {selectedProduct === "pmes"
                  ? "Bloco gerado com foco em Lingua Portuguesa, Raciocinio Logico e Matematico, Historia, Geografia e Redacao."
                  : selectedProduct === "enem"
                    ? "Bloco gerado por area do ENEM, respeitando Linguagens, Matematica, Ciencias Humanas e Ciencias da Natureza."
                    : "Bloco gerado usando o recorte atual do produto municipal, pronto para crescer conforme entram questoes reais."}
              </p>
              <div style={{ marginTop: 18 }}>
                <QuestionsPractice
                  title={automatico.produto === "pmes" ? "Simulado PMES" : automatico.produto === "enem" ? "Simulado ENEM" : "Simulado Agua Doce"}
                  description="Responda primeiro. O gabarito, o comentario e a recomendacao de revisao aparecem so depois da tentativa."
                  questions={automatico.questoes}
                  storageKey={`benthec-simulado-${automatico.id}`}
                  mode="simulado"
                  productSlug={automatico.produto}
                />
              </div>
            </article>

            {selectedProduct === "agua-doce"
              ? simulados.map((simulado) => (
                  <article key={simulado.id} className="plan-card">
                    <div className="kicker">{areaLabels[simulado.area]}</div>
                    <h2 style={{ marginTop: 8 }}>{simulado.titulo}</h2>
                    <p style={{ marginTop: 10 }}>{simulado.descricao}</p>
                    <p style={{ marginTop: 10 }}>
                      <strong>Tempo sugerido:</strong> {simulado.tempoSugerido}
                    </p>
                    <ul className="feature-list" style={{ marginTop: 16 }}>
                      {simulado.instrucoes.map((instrucao) => (
                        <li key={instrucao}>{instrucao}</li>
                      ))}
                    </ul>
                    <div className="actions" style={{ marginTop: 18 }}>
                      {getTracksByArea(simulado.area as "operacionais" | "saude" | "magisterio").slice(0, 2).map((track) => (
                        <Link key={track.slug} href={`/aluno/cargos/${track.slug}`} className="btn-ghost">
                          Ir para {track.titulo}
                        </Link>
                      ))}
                    </div>
                  </article>
                ))
              : null}
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

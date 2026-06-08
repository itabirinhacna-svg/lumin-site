import Link from "next/link";
import { QuickNav } from "@/components/quick-nav";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StudyCallout } from "@/components/study-callout";
import { getPremiumLessonBySlug } from "@/lib/premium-lessons";
import {
  getConcursoCriteriaTotal,
  getEnemCompetencyTotal,
  getRedacaoByLinha,
  getRedacaoOverview,
  redacaoPlanos,
  redacaoTracks,
} from "@/lib/redacao";
import { getConteudosByProduto } from "@/lib/videos-curados";

export default function RedacaoPage() {
  const conteudos = getConteudosByProduto("redacao");
  const overview = getRedacaoOverview();
  const latestEnem = getRedacaoByLinha("ENEM")[0];
  const latestConcursos = getRedacaoByLinha("Concursos")[0];
  const latestPMES = getRedacaoByLinha("Concursos").find((item) => item.contexto === "PMES") ?? latestConcursos;
  const enemVideos = conteudos.filter((item) => item.cargoSlug === "redacao-enem" || item.cargoSlug === "redacao-enem-pendentes");
  const concursosVideos = conteudos.filter((item) => item.cargoSlug !== "redacao-enem" && item.cargoSlug !== "redacao-enem-pendentes");
  const enemLesson = getPremiumLessonBySlug("redacao-enem");
  const pmesLesson = getPremiumLessonBySlug("redacao-pmes");

  return (
    <>
      <SiteHeader ctaLabel="Enviar redacao" ctaHref="/redacao/envio" />

      <main className="section">
        <div className="page-shell" style={{ display: "grid", gap: 22 }}>
          <QuickNav
            title="Menu da redacao"
            items={[
              { label: "Jornada", href: "#jornada" },
              { label: "ENEM", href: "#enem" },
              { label: "Concursos", href: "#concursos" },
              { label: "Planos", href: "#planos" },
              { label: "Historico", href: "/redacao/historico" },
              { label: "Devolutiva", href: "/redacao/devolutiva" },
              { label: "Enviar", href: "/redacao/envio" },
            ]}
          />

          <section id="jornada" className="hero-card">
            <div className="kicker">Redacao BenThec</div>
            <h1 style={{ fontSize: "clamp(2.3rem, 5vw, 4.4rem)" }}>Voce escreve, recebe retorno e enxerga seu crescimento.</h1>
            <p className="hero-copy">
              Aqui a redacao nao some depois do envio. Cada texto volta com nota, leitura por criterio, pontos fortes e um passo firme para a proxima semana.
            </p>
            <div className="glass-card" style={{ padding: 18, marginTop: 18 }}>
              <strong>Correcao humana especializada BenThec.</strong>
              <p style={{ marginTop: 8 }}>
                Devolutiva em ate 24 horas. Avaliacao baseada nos criterios oficiais do edital e metodologia BenThec.
              </p>
            </div>
            <div className="actions" style={{ marginTop: 18 }}>
              <Link href="/redacao/envio" className="btn">
                Enviar redacao
              </Link>
              <Link href="/redacao/historico" className="btn-ghost">
                Ver historico
              </Link>
            </div>
          </section>

          <section className="glass-card">
            <div className="kicker">Fluxo de acompanhamento</div>
            <h2 style={{ marginTop: 8 }}>Seu texto passa por etapas visiveis</h2>
            <div className="section-grid" style={{ marginTop: 18 }}>
              {["Tema", "Orientacao", "Envio", "Correcao", "Devolutiva"].map((step, index) => (
                <article key={step} className="plan-card">
                  <div className="kicker">Etapa {index + 1}</div>
                  <strong>{step}</strong>
                </article>
              ))}
            </div>
            <div className="plan-card" style={{ marginTop: 18 }}>
              <strong>Ultimo movimento</strong>
              <p style={{ marginTop: 8 }}>{latestConcursos?.title ?? latestEnem?.title}</p>
              <p style={{ marginTop: 8 }}>{latestConcursos?.proximaMeta ?? latestEnem?.proximaMeta}</p>
            </div>
          </section>

          <div className="section-grid">
            {redacaoTracks.map((track) => (
              <article key={track.slug} className="glass-card">
                <div className="kicker">{track.title}</div>
                <h2 style={{ marginTop: 8 }}>{track.publico}</h2>
                <p style={{ marginTop: 10 }}>{track.description}</p>
                <ul className="feature-list" style={{ marginTop: 16 }}>
                  {track.journey.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
                <div className="glass-card" style={{ padding: 18, marginTop: 18 }}>
                  <strong>Tema sugerido agora</strong>
                  <p style={{ marginTop: 8 }}>{track.temas[0]?.title}</p>
                  <p style={{ marginTop: 8 }}>{track.temas[0]?.proposal}</p>
                </div>
              </article>
            ))}
          </div>

          <section id="planos" className="section-grid">
            {redacaoPlanos.map((plano) => (
              <article key={plano.slug} className={`plan-card${plano.slug === "intensiva" ? " featured" : ""}`}>
                <div className="kicker">{plano.title}</div>
                <h2 style={{ marginTop: 8 }}>{plano.price}</h2>
                <p style={{ marginTop: 10 }}>{plano.description}</p>
                <p style={{ marginTop: 10 }}>
                  <strong>Prazo:</strong> {plano.turnaround}
                </p>
                <p style={{ marginTop: 10 }}>
                  <strong>Indicado para:</strong> {plano.audience}
                </p>
                <ul className="feature-list" style={{ marginTop: 16 }}>
                  {plano.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <div className="actions" style={{ marginTop: 18 }}>
                  <Link href="/redacao/envio" className="btn">
                    Quero este acompanhamento
                  </Link>
                </div>
              </article>
            ))}
          </section>

          <div className="section-grid">
            <section id="enem" className="glass-card">
              <div className="kicker">Redacao ENEM</div>
              <h2 style={{ marginTop: 8 }}>Jornada separada para quem quer subir nota</h2>
              <ul className="feature-list" style={{ marginTop: 16 }}>
                <li>{overview.enem} envio(s) ja marcado(s) como ENEM</li>
                <li>Correcao preparada por competencia oficial</li>
                <li>Curadoria focada em repertorio, estrutura e proposta de intervencao</li>
              </ul>
              <div className="plan-card" style={{ marginTop: 18 }}>
                <strong>Exemplo de nota atual</strong>
                <p style={{ marginTop: 8 }}>{getEnemCompetencyTotal(latestEnem?.enemBreakdown)} / 1000</p>
              </div>
              <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
                {enemVideos.map((item) => (
                  <article key={item.id} className="plan-card">
                    <h3>{item.titulo}</h3>
                    <p style={{ marginTop: 8 }}>{item.observacao}</p>
                    <p style={{ marginTop: 8 }}>
                      <strong>Status:</strong> {item.status}
                    </p>
                    {item.url ? (
                      <Link href={item.url} className="btn-secondary" target="_blank" style={{ marginTop: 14 }}>
                        Ver orientacao
                      </Link>
                    ) : (
                      <p style={{ marginTop: 14 }}>Curadoria em andamento para esta etapa.</p>
                    )}
                  </article>
                ))}
              </div>
              {enemLesson ? (
                <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
                  <StudyCallout variant="destaque" title="Estrutura dissertativo-argumentativa">
                    <div style={{ display: "grid", gap: 10 }}>
                      {enemLesson.explanation.map((paragraph) => (
                        <p key={paragraph} style={{ margin: 0 }}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </StudyCallout>
                  <StudyCallout variant="dica-banca" title="Guarde isso">
                    <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8 }}>
                      {enemLesson.keepThis.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </StudyCallout>
                </div>
              ) : null}
            </section>

            <section id="concursos" className="glass-card">
              <div className="kicker">Redacao Concursos</div>
              <h2 style={{ marginTop: 8 }}>Jornada separada para municipais e policiais</h2>
              <ul className="feature-list" style={{ marginTop: 16 }}>
                <li>{overview.concursos} envio(s) ja marcado(s) como Concursos</li>
                <li>Correcao preparada por tema, argumentacao, estrutura, gramatica, coesao, clareza e objetividade</li>
                <li>Foco em comando curto, linguagem firme e resposta direta</li>
              </ul>
              <div className="plan-card" style={{ marginTop: 18 }}>
                <strong>Exemplo de nota atual</strong>
                <p style={{ marginTop: 8 }}>{getConcursoCriteriaTotal(latestConcursos?.concursoBreakdown)} / 100</p>
              </div>
              <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
                {concursosVideos.map((item) => (
                  <article key={item.id} className="plan-card">
                    <h3>{item.titulo}</h3>
                    <p style={{ marginTop: 8 }}>{item.observacao}</p>
                    <p style={{ marginTop: 8 }}>
                      <strong>Status:</strong> {item.status}
                    </p>
                    {item.url ? (
                      <Link href={item.url} className="btn-secondary" target="_blank" style={{ marginTop: 14 }}>
                        Ver orientacao
                      </Link>
                    ) : (
                      <p style={{ marginTop: 14 }}>Curadoria em andamento para esta etapa.</p>
                    )}
                  </article>
                ))}
              </div>
              {pmesLesson ? (
                <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
                  <StudyCallout variant="destaque" title="Como a redacao PMES deve soar">
                    <div style={{ display: "grid", gap: 10 }}>
                      {pmesLesson.explanation.map((paragraph) => (
                        <p key={paragraph} style={{ margin: 0 }}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </StudyCallout>
                  <StudyCallout variant="erro-comum" title="Erro comum">
                    {pmesLesson.commonError}
                  </StudyCallout>
                </div>
              ) : null}
            </section>
          </div>

          <section className="glass-card">
            <div className="kicker">Redacao PMES</div>
            <h2 style={{ marginTop: 8 }}>Frente separada para a escrita policial</h2>
            <p style={{ marginTop: 10 }}>
              A PMES aparece aqui como uma linha propria dentro da redacao de concursos: comando curto, objetividade, fechamento firme e leitura de banca.
            </p>
            <div className="section-grid" style={{ marginTop: 18 }}>
              <article className="plan-card">
                <strong>Fluxo atual</strong>
                <ul className="feature-list" style={{ marginTop: 12 }}>
                  <li>{overview.pmes} envio(s) com contexto PMES no historico demo/persistido</li>
                  <li>Criticos de concursos ja aplicados: tema, argumentacao, estrutura, gramatica, coesao, clareza e objetividade</li>
                  <li>Uso do mesmo fluxo persistido de envio, status, historico e devolutiva</li>
                </ul>
              </article>
              <article className="plan-card">
                <strong>Proxima redacao recomendada</strong>
                <p style={{ marginTop: 8 }}>{latestPMES?.title ?? "Seguranca publica e confianca social"}</p>
                <p style={{ marginTop: 8 }}>{latestPMES?.proximaMeta ?? "Treinar resposta direta e fechamento objetivo."}</p>
                <div className="actions" style={{ marginTop: 16 }}>
                  <Link href="/redacao/envio?linha=Concursos" className="btn">
                    Enviar redacao PMES
                  </Link>
                  <Link href="/pmes" className="btn-ghost">
                    Ver produto PMES
                  </Link>
                </div>
              </article>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

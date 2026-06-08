import Link from "next/link";
import { QuickNav } from "@/components/quick-nav";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StudyCallout } from "@/components/study-callout";
import { getPmesCoverageOverview, pmesMatriz } from "@/lib/pmes-matriz";
import { getCuradoriaVideosByProduto } from "@/lib/curadoria-videos";
import { getPremiumLessonBySlug } from "@/lib/premium-lessons";

type PmesDisciplineCard = {
  slug: string;
  title: string;
  subtitle: string;
  topics: string[];
  status: "curadoria validada";
};

const pmesTracks: PmesDisciplineCard[] = [
  {
    slug: "pmes-portugues",
    title: "Lingua Portuguesa",
    subtitle: "Interpretacao, leitura de comando, pontuacao, sintaxe e gramatica de prova.",
    topics: ["Interpretacao de texto", "Pontuacao", "Concordancia", "Classes gramaticais"],
    status: "curadoria validada",
  },
  {
    slug: "pmes-matematica-raciocinio",
    title: "Raciocinio Logico e Matematico",
    subtitle: "Porcentagem, proporcao, problemas, sequencias e leitura logica.",
    topics: ["Porcentagem", "Regra de tres", "Problemas", "Sequencias logicas"],
    status: "curadoria validada",
  },
  {
    slug: "pmes-historia",
    title: "Historia do Brasil e do Espirito Santo",
    subtitle: "Republica, formacao historica e marcos cobrados em prova objetiva.",
    topics: ["Republica no Brasil", "Historia do Espirito Santo", "Periodizacao", "Contexto historico"],
    status: "curadoria validada",
  },
  {
    slug: "pmes-geografia",
    title: "Geografia Geral, do Brasil e do Espirito Santo",
    subtitle: "Territorio, urbanizacao, regionalizacao e leitura de espaco.",
    topics: ["Urbanizacao", "Territorio", "Regionalizacao", "Geografia do Espirito Santo"],
    status: "curadoria validada",
  },
  {
    slug: "pmes-redacao",
    title: "Redacao PMES",
    subtitle: "Leitura do comando, objetividade, argumentacao e fechamento firme.",
    topics: ["Leitura do comando", "Tese", "Desenvolvimento objetivo", "Fechamento"],
    status: "curadoria validada",
  },
];

export default function PMESPage() {
  const relevantes = getCuradoriaVideosByProduto("pmes");
  const coverage = getPmesCoverageOverview();
  const comEmbed = relevantes.filter((item) => item.playlistVideoEspecifico).length;
  const linkPendente = relevantes.filter((item) => !item.playlistVideoEspecifico).length;
  const progressoConstrucao = Math.round(((coverage.completos + coverage.parciais) / Math.max(1, coverage.total)) * 100);
  const portuguesPremium = [
    getPremiumLessonBySlug("interpretacao-textual"),
    getPremiumLessonBySlug("tipologia-textual"),
    getPremiumLessonBySlug("generos-textuais"),
    getPremiumLessonBySlug("variacao-linguistica"),
    getPremiumLessonBySlug("coesao-e-coerencia"),
  ].filter(Boolean);
  const redacaoPmesPremium = getPremiumLessonBySlug("redacao-pmes");
  const trilhaDisciplinas: Record<string, string[]> = {
    "pmes-portugues": ["Portugues"],
    "pmes-matematica-raciocinio": ["Raciocinio Logico e Matematico"],
    "pmes-historia": ["Historia"],
    "pmes-geografia": ["Geografia"],
    "pmes-redacao": ["Redacao PMES"],
  };

  return (
    <>
      <SiteHeader ctaLabel="Ver redacao PMES" ctaHref="/redacao?linha=Concursos" />

      <main className="section pmes-ava-page">
        <style>{`
          .pmes-ava-page {
            background:
              radial-gradient(circle at top right, rgba(197,139,0,.14), transparent 22%),
              linear-gradient(180deg, #020617 0%, #0b1120 100%);
          }

          .pmes-ava-shell {
            display: grid;
            gap: 18px;
          }

          .pmes-ava-sidebar {
            position: sticky;
            top: 92px;
            align-self: start;
            display: none;
            gap: 14px;
            border-radius: 28px;
            padding: 16px;
            border: 1px solid rgba(255,255,255,.08);
            background: rgba(9,14,26,.95);
          }

          .pmes-ava-sidebar h2 {
            margin: 0;
            padding: 10px 12px;
            border-radius: 14px;
            background: rgba(255,255,255,.06);
            font-size: .95rem;
          }

          .pmes-ava-sidebar a {
            display: grid;
            gap: 4px;
            padding: 12px 14px;
            border-radius: 16px;
            text-decoration: none;
            color: #f8fafc;
            border: 1px solid rgba(255,255,255,.06);
            background: rgba(255,255,255,.02);
          }

          .pmes-ava-sidebar a span {
            color: #94a3b8;
            font-size: .82rem;
          }

          @media (min-width: 1100px) {
            .pmes-ava-shell {
              grid-template-columns: 280px minmax(0, 1fr);
              align-items: start;
            }

            .pmes-ava-sidebar {
              display: grid;
            }
          }
        `}</style>

        <div className="page-shell pmes-ava-shell">
          <aside className="pmes-ava-sidebar">
            <div style={{ display: "grid", gap: 10 }}>
              <h2>Minha Trilha</h2>
              <a href="#disciplinas"><strong>Inicio</strong><span>Disciplinas da prova</span></a>
              <a href="#disciplinas"><strong>Unidade 1</strong><span>Portugues</span></a>
              <a href="#disciplinas"><strong>Unidade 2</strong><span>Raciocinio Logico e Matematico</span></a>
              <a href="#disciplinas"><strong>Unidade 3</strong><span>Historia e Geografia</span></a>
              <a href="#redacao-pmes"><strong>Revisao</strong><span>Redacao PMES</span></a>
              <a href="/simulados?produto=pmes&qtd=20"><strong>Simulado</strong><span>Treino PMES</span></a>
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              <h2>Meus Materiais</h2>
              <a href="#escopo"><strong>Livro digital</strong><span>Escopo da trilha</span></a>
              <a href="#curadoria"><strong>Videos</strong><span>Curadoria validada</span></a>
              <a href="/questoes?produto=pmes"><strong>Questoes</strong><span>Treino por disciplina</span></a>
              <a href="/simulados?produto=pmes&qtd=20"><strong>Gabarito</strong><span>Liberado apos tentativa</span></a>
              <a href="#redacao-pmes"><strong>Recursos interativos</strong><span>Redacao e revisao</span></a>
            </div>
          </aside>

          <div style={{ display: "grid", gap: 22 }}>
          <QuickNav
            title="Menu PMES"
            items={[
              { label: "Minha Trilha", href: "#disciplinas" },
              { label: "Proxima Aula", href: "#disciplinas" },
              { label: "Biblioteca", href: "#escopo" },
              { label: "Videos", href: "#curadoria" },
              { label: "Questoes", href: "/questoes?produto=pmes" },
              { label: "Simulados", href: "/simulados?produto=pmes&qtd=20" },
              { label: "Redacao", href: "#redacao-pmes" },
              { label: "Historico", href: "/redacao/historico" },
              { label: "Suporte", href: "/redacao" },
            ]}
          />

          <section className="hero-card">
            <div className="kicker">PMES alinhada ao edital</div>
            <h1 style={{ fontSize: "clamp(2.3rem, 5vw, 4.4rem)" }}>Somente os blocos centrais da prova.</h1>
            <p className="hero-copy">
              Aqui a PMES funciona como trilha separada: Portugues, Raciocinio Logico e Matematico, Historia, Geografia e Redacao, sem misturar ENEM ou municipais.
            </p>
            <div className="glass-card" style={{ padding: 18, marginTop: 18 }}>
              <strong>Progresso de construcao</strong>
              <p style={{ marginTop: 8 }}>{relevantes.length} item(ns) de curadoria validados pelo usuario, com {comEmbed} video(s) ja embutiveis.</p>
              <p style={{ marginTop: 8 }}>Cobertura atual do edital prioritario: {progressoConstrucao}% dos microassuntos ja estao ao menos parcialmente sustentados na trilha.</p>
              <div style={{ height: 10, borderRadius: 999, background: "#1f2937", overflow: "hidden", marginTop: 14 }}>
                <div style={{ width: `${progressoConstrucao}%`, height: "100%", background: "linear-gradient(90deg, #c58b00, #15803d)" }} />
              </div>
            </div>
          </section>

          <section id="disciplinas" className="section-grid">
            {pmesTracks.map((trilha) => {
              const trilhaVideos = relevantes.filter((item) => trilhaDisciplinas[trilha.slug]?.includes(item.disciplina));
              const hasStarted = trilhaVideos.length > 0;

              return (
                <article key={trilha.slug} className="plan-card">
                  <div className="kicker">{trilha.title}</div>
                  <h2 style={{ marginTop: 8 }}>{hasStarted ? "Cobertura em andamento" : "Curadoria validada"}</h2>
                  <p style={{ marginTop: 10 }}>{trilha.subtitle}</p>
                  <ul className="feature-list" style={{ marginTop: 16 }}>
                    {trilha.topics.map((topic) => (
                      <li key={topic}>{topic}</li>
                    ))}
                  </ul>
                  <div className="glass-card" style={{ padding: 18, marginTop: 18 }}>
                    <strong>Status da frente</strong>
                    <p style={{ marginTop: 8 }}>{trilhaVideos.length} microassunto(s) com curadoria validada pelo usuario</p>
                    <p style={{ marginTop: 8 }}>{trilhaVideos.filter((item) => item.playlistVideoEspecifico).length} video(s) com link final inserido</p>
                  </div>
                  <div className="actions" style={{ marginTop: 18 }}>
                    <Link href="/questoes?produto=pmes" className="btn-secondary">
                      Abrir questoes PMES
                    </Link>
                  </div>
                </article>
              );
            })}
          </section>

          <section className="glass-card">
            <div className="kicker">Aulas-base da PMES</div>
            <h2 style={{ marginTop: 8 }}>Conteudo mais forte para os blocos que mais travam o aluno</h2>
            <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
              {portuguesPremium.map((lesson) => (
                <article key={lesson.slug} className="plan-card">
                  <div className="kicker">{lesson.title}</div>
                  <p style={{ marginTop: 8 }}>{lesson.objective}</p>
                  <p style={{ marginTop: 8 }}>{lesson.example}</p>
                  <StudyCallout variant="dica-banca" title="Dica BenThec">
                    {lesson.bankTip}
                  </StudyCallout>
                </article>
              ))}
              {redacaoPmesPremium ? (
                <article className="plan-card">
                  <div className="kicker">Redacao PMES</div>
                  <p style={{ marginTop: 8 }}>{redacaoPmesPremium.objective}</p>
                  <StudyCallout variant="erro-comum" title="Erro comum">
                    {redacaoPmesPremium.commonError}
                  </StudyCallout>
                </article>
              ) : null}
            </div>
          </section>

          <section id="curadoria" className="glass-card">
            <div className="kicker">Curadoria de videos</div>
            <h2 style={{ marginTop: 8 }}>Cada video aparece com contexto de edital</h2>
            <div className="section-grid" style={{ marginTop: 18 }}>
              {relevantes.slice(0, 12).map((item) => (
                <article key={item.id} className="plan-card">
                  <div className="kicker">{item.disciplina}</div>
                  <h3 style={{ marginTop: 8 }}>{item.microassunto}</h3>
                  <p style={{ marginTop: 8 }}>{item.observacaoPedagogica}</p>
                  <p style={{ marginTop: 8 }}>
                    <strong>Canal:</strong> {item.canal}
                  </p>
                  <div className="tag-row" style={{ marginTop: 12 }}>
                    <span className="pill">{item.duracaoMedia ?? "Duracao media nao informada"}</span>
                    <span className="pill">{item.usoRecomendado}</span>
                    <span className="pill">{item.status}</span>
                  </div>
                  <div className="actions" style={{ marginTop: 14 }}>
                    {item.playlistVideoEspecifico ? (
                      <Link href={item.playlistVideoEspecifico} className="btn-secondary" target="_blank">
                        Assistir no YouTube
                      </Link>
                    ) : (
                      <span className="btn-secondary" aria-disabled="true" style={{ opacity: 0.5, pointerEvents: "none" }}>
                        Curadoria validada - link pendente de insercao
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
            <p style={{ marginTop: 16, color: "#94a3b8" }}>
              {linkPendente} microassunto(s) ja estao validados pelo usuario, mas ainda aguardam o link final para embed ou abertura segura.
            </p>
          </section>

          <section className="glass-card">
            <div className="kicker">Cobertura do edital</div>
            <h2 style={{ marginTop: 8 }}>O que ja esta iniciado e o que ainda falta fechar</h2>
            <div className="section-grid" style={{ marginTop: 18 }}>
              {coverage.porDisciplina.map((item) => {
                const faltantes = pmesMatriz
                  .filter((row) => row.disciplina === item.disciplina && row.statusCobertura === "AUSENTE")
                  .slice(0, 4);

                return (
                  <article key={item.disciplina} className="plan-card">
                    <div className="kicker">{item.disciplina}</div>
                    <p style={{ marginTop: 10 }}>
                      <strong>Total:</strong> {item.total}
                      <br />
                      <strong>Completo:</strong> {item.completos}
                      <br />
                      <strong>Parcial:</strong> {item.parciais}
                      <br />
                      <strong>Ausente:</strong> {item.ausentes}
                      <br />
                      <strong>Cobertura:</strong> {item.percentualCobertura}%
                    </p>
                    <div className="glass-card" style={{ padding: 16, marginTop: 14 }}>
                      <strong>Microassuntos ausentes</strong>
                      {faltantes.length > 0 ? (
                        <ul className="feature-list" style={{ marginTop: 10 }}>
                          {faltantes.map((topico) => (
                            <li key={topico.microassunto}>{topico.microassunto}</li>
                          ))}
                        </ul>
                      ) : (
                        <p style={{ marginTop: 10 }}>Todos os microassuntos desta frente ja tem pelo menos cobertura parcial.</p>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section id="redacao-pmes" className="glass-card">
            <div className="kicker">Redacao PMES</div>
            <h2 style={{ marginTop: 8 }}>A discursiva policial fica separada da jornada ENEM.</h2>
            <ul className="feature-list" style={{ marginTop: 16 }}>
              <li>Leitura do comando da banca</li>
              <li>Resposta objetiva e aderente ao tema</li>
              <li>Devolutiva por criterio de concursos e PMES</li>
            </ul>
            <div className="actions" style={{ marginTop: 18 }}>
              <Link href="/redacao?linha=Concursos" className="btn">
                Abrir redacao PMES
              </Link>
            </div>
          </section>

          <section id="escopo" className="glass-card">
            <div className="kicker">Escopo atual</div>
            <h2 style={{ marginTop: 8 }}>O que fica fora deste recorte</h2>
            <ul className="feature-list" style={{ marginTop: 16 }}>
              <li>ENEM nao aparece aqui.</li>
              <li>Concursos municipais nao entram na trilha PMES.</li>
              <li>Conteudos fora do edital principal ficam marcados como complementares.</li>
            </ul>
          </section>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

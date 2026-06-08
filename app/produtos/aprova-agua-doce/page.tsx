import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getAprovaGroups } from "@/lib/produtos";

export default function AprovaAguaDocePage() {
  const groups = getAprovaGroups();

  return (
    <>
      <SiteHeader ctaLabel="Ir para checkout" ctaHref="/checkout" />

      <main className="section">
        <div className="page-shell" style={{ display: "grid", gap: 22 }}>
          <section className="hero-card">
            <div className="kicker">Aprova Agua Doce</div>
            <h1 style={{ fontSize: "clamp(2.3rem, 5vw, 4.4rem)" }}>Escolha o cargo certo e entre em um curso feito para ele.</h1>
            <p className="hero-copy">
              Aqui o aluno nao compra um pacote generico. Ele entra no cargo dele, abre a biblioteca correta, resolve questoes coerentes com a trilha e continua a jornada com proximo passo visivel.
            </p>
            <div className="actions" style={{ marginTop: 18 }}>
              <Link href="/checkout?plan=agua-doce-completo" className="btn">
                Entrar no Aprova Agua Doce
              </Link>
              <Link href="/area" className="btn-ghost">
                Ver area do aluno
              </Link>
            </div>
          </section>

          {groups.map((group) => (
            <section key={group.slug} className="glass-card">
              <div className="kicker">{group.title}</div>
              <h2 style={{ marginTop: 8 }}>{group.tracks.length} cargos e trilhas liberadas</h2>
              <p style={{ marginTop: 10 }}>{group.tracks[0]?.publico ? `Publico-alvo: ${group.tracks[0].publico}.` : ""} Cada pagina abaixo mostra beneficios, biblioteca, questoes e acesso direto ao cargo.</p>

              <div style={{ display: "grid", gap: 16, marginTop: 18 }}>
                {group.tracks.map((track) => (
                  <article key={track.slug} className="plan-card">
                    <div className="kicker">{track.publico}</div>
                    <h3 style={{ marginTop: 8 }}>{track.titulo}</h3>
                    <p style={{ marginTop: 10 }}>{track.resumo}</p>
                    <ul className="feature-list" style={{ marginTop: 16 }}>
                      <li>{track.materiais.length} materiais ligados a interface</li>
                      <li>{track.questoesStatus === "disponivel" ? "Banco inicial de questoes do cargo" : "Banco inicial pela area do edital"}</li>
                      <li>{track.simuladosStatus === "disponivel" ? "Simulados ja liberados" : "Simulados da area prontos para uso"}</li>
                    </ul>
                    <div className="actions" style={{ marginTop: 18 }}>
                      <Link href={`/produtos/aprova-agua-doce/${track.slug}`} className="btn">
                        Ver curso do cargo
                      </Link>
                      <Link href={`/checkout?plan=agua-doce-completo`} className="btn-secondary">
                        Comprar
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

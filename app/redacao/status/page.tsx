import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { requireStudentAccess } from "@/lib/access";
import { listEssaysForUser, mapEssayRecordToSubmission } from "@/lib/db";
import { redacaoHistoricoDemo } from "@/lib/redacao";

const statusSteps = [
  { key: "recebida", title: "Recebida", text: "Seu texto entrou na fila e ja esta registrado no historico." },
  { key: "em-correcao", title: "Em correcao", text: "Estamos lendo seu texto e anotando o que voce fez bem e o que precisa ajustar." },
  { key: "devolvida", title: "Corrigida", text: "A nota e a devolutiva ficam prontas para consulta." },
  { key: "devolutiva", title: "Devolutiva", text: "Voce recebe pontos fortes, pontos de melhoria e a meta da proxima redacao." },
];

type RedacaoStatusPageProps = {
  searchParams?: Promise<{
    essay?: string;
  }>;
};

export default async function RedacaoStatusPage({ searchParams }: RedacaoStatusPageProps) {
  const { user } = await requireStudentAccess();
  const params = (await searchParams) ?? {};
  const savedEssays = (await listEssaysForUser(user.id)).map(mapEssayRecordToSubmission);
  const source = savedEssays.length > 0 ? savedEssays : redacaoHistoricoDemo;
  const latest = source.find((item) => item.id === params.essay) ?? source[0];

  return (
    <>
      <SiteHeader ctaLabel="Ver historico" ctaHref="/redacao/historico" />

      <main className="section">
        <div className="page-shell" style={{ maxWidth: 980, display: "grid", gap: 20 }}>
          <section className="glass-card">
            <div className="kicker">Status da correcao</div>
            <h1 style={{ fontSize: "clamp(2.1rem, 5vw, 3.8rem)" }}>Seu texto nao some depois do envio.</h1>
            <p style={{ marginTop: 10 }}>Voce acompanha cada etapa sem ficar no escuro.</p>
            <div className="plan-card" style={{ marginTop: 18 }}>
              <strong>Agora</strong>
              <p style={{ marginTop: 8 }}>{latest.title}</p>
              <p style={{ marginTop: 8 }}>Linha: {latest.linha}</p>
              <p style={{ marginTop: 8 }}>Contexto: {latest.contexto}</p>
              <p style={{ marginTop: 8 }}>Status atual: {latest.status}</p>
              {latest.attachmentRef ? (
                <p style={{ marginTop: 8 }}>
                  Manuscrita enviada: <a href={latest.attachmentRef} target="_blank" rel="noreferrer">{latest.attachmentName ?? "Abrir arquivo"}</a>
                </p>
              ) : null}
            </div>
          </section>

          <div className="section-grid">
            {statusSteps.map((step, index) => {
              const active =
                latest.status === "recebida"
                  ? step.key === "recebida"
                  : latest.status === "em-correcao"
                    ? step.key === "em-correcao"
                    : step.key === "devolvida" || step.key === "devolutiva";

              return (
                <article
                  key={step.title}
                  className="plan-card"
                  style={{
                    borderColor: active ? "rgba(197,139,0,.3)" : undefined,
                    background: active ? "linear-gradient(135deg, rgba(197,139,0,.14), rgba(197,139,0,.05))" : undefined,
                  }}
                >
                  <div className="kicker">Etapa {index + 1}</div>
                  <h2 style={{ marginTop: 8 }}>{step.title}</h2>
                  <p style={{ marginTop: 10 }}>{step.text}</p>
                </article>
              );
            })}
          </div>

          <section className="glass-card">
            <strong>Proximo objetivo</strong>
            <p style={{ marginTop: 8 }}>{latest.proximaMeta}</p>
          </section>

          <section className="glass-card">
            <strong>O que fazer agora</strong>
            <ul className="list-clean" style={{ marginTop: 12 }}>
              <li>Se a redacao ainda esta recebida, releia o comando e marque o ponto principal.</li>
              <li>Se ja entrou em correcao, volte para a ultima devolutiva e compare o que mudou.</li>
              <li>Quando a devolutiva chegar, escolha um unico ajuste para a proxima escrita.</li>
            </ul>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

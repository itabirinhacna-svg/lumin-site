import Link from "next/link";
import { redirect } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { requireStaffAccess } from "@/lib/access";
import { getAdminSnapshot, listEssaysForAdmin, updateEssayCorrection } from "@/lib/db";
import { getConfigWarnings } from "@/lib/env";

export default async function AdminPage() {
  const currentUser = await requireStaffAccess();
  const snapshot = await getAdminSnapshot();
  const essays = await listEssaysForAdmin();
  const warnings = getConfigWarnings();

  async function saveEssayCorrection(formData: FormData) {
    "use server";

    await requireStaffAccess();
    const essayId = String(formData.get("essayId") ?? "");
    const linha = String(formData.get("linha") ?? "Concursos");
    const contexto = String(formData.get("contexto") ?? "Municipais");
    const devolutiva = String(formData.get("devolutiva") ?? "").trim();
    const pontosFortes = String(formData.get("pontosFortes") ?? "").split("\n").map((item) => item.trim()).filter(Boolean);
    const pontosMelhoria = String(formData.get("pontosMelhoria") ?? "").split("\n").map((item) => item.trim()).filter(Boolean);
    const errosRecorrentes = String(formData.get("errosRecorrentes") ?? "").split("\n").map((item) => item.trim()).filter(Boolean);
    const planoEvolucao = String(formData.get("planoEvolucao") ?? "").split("\n").map((item) => item.trim()).filter(Boolean);
    const proximaMeta = String(formData.get("proximaMeta") ?? "").trim();

    if (!essayId || !devolutiva || !proximaMeta) {
      redirect("/admin");
    }

    if (linha === "ENEM") {
      const c1 = Number(formData.get("c1") ?? 0);
      const c2 = Number(formData.get("c2") ?? 0);
      const c3 = Number(formData.get("c3") ?? 0);
      const c4 = Number(formData.get("c4") ?? 0);
      const c5 = Number(formData.get("c5") ?? 0);
      const total = c1 + c2 + c3 + c4 + c5;

      await updateEssayCorrection({
        essayId,
        status: "devolvida",
        scoreLabel: `${total} / 1000`,
        devolutiva,
        pontosFortes,
        pontosMelhoria,
        errosRecorrentes,
        planoEvolucao,
        proximaMeta,
        enemBreakdown: { c1, c2, c3, c4, c5 },
      });
    } else {
      const tema = Number(formData.get("tema") ?? 0);
      const argumentacao = Number(formData.get("argumentacao") ?? 0);
      const estrutura = Number(formData.get("estrutura") ?? 0);
      const gramatica = Number(formData.get("gramatica") ?? 0);
      const coesao = Number(formData.get("coesao") ?? 0);
      const clareza = Number(formData.get("clareza") ?? 0);
      const objetividade = contexto === "PMES" ? Number(formData.get("objetividade") ?? 0) : 0;
      const total = tema + argumentacao + estrutura + gramatica + coesao + clareza + objetividade;

      await updateEssayCorrection({
        essayId,
        status: "devolvida",
        scoreLabel: `${total} / 100`,
        devolutiva,
        pontosFortes,
        pontosMelhoria,
        errosRecorrentes,
        planoEvolucao,
        proximaMeta,
        concursoBreakdown: { tema, argumentacao, estrutura, gramatica, coesao, clareza, objetividade },
      });
    }

    redirect("/admin");
  }

  return (
    <>
      <SiteHeader ctaLabel="Ver checkout" ctaHref="/checkout" />
      <main className="section">
        <div className="page-shell" style={{ display: "grid", gap: 24 }}>
          <div style={{ display: "grid", gap: 12 }}>
            <div className="kicker">Painel operacional</div>
            <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 4.4rem)" }}>Compras, fila de redacao e liberacao de acesso.</h1>
            <p>
              {currentUser.role === "corrector"
                ? "Painel do corretor para acompanhar a fila, abrir arquivos e publicar devolutivas."
                : "Painel da equipe para acompanhar pagamento, fila de correcao humana e adaptador atual de persistencia."}
            </p>
          </div>

          <div className="admin-grid">
            <article className="metric-card">
              <strong className="metric-value">{snapshot.totalStudents}</strong>
              <p>Alunos cadastrados</p>
            </article>
            <article className="metric-card">
              <strong className="metric-value">{snapshot.paidPurchases}</strong>
              <p>Compras aprovadas</p>
            </article>
            <article className="metric-card">
              <strong className="metric-value">{snapshot.pendingPurchases}</strong>
              <p>Compras pendentes</p>
            </article>
            <article className="metric-card">
              <strong className="metric-value">{snapshot.essayQueue}</strong>
              <p>Redacoes aguardando fila</p>
            </article>
          </div>

          <div className="admin-grid">
            <article className="table-card">
              <div className="kicker">Ultimas compras</div>
              <h3>Fluxo comercial persistido</h3>
              <table>
                <thead>
                  <tr>
                    <th>Plano</th>
                    <th>Pagamento</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {snapshot.purchases.length > 0 ? (
                    snapshot.purchases.map((purchase) => (
                      <tr key={purchase.id}>
                        <td>{purchase.planName}</td>
                        <td>{purchase.paymentMethod.toUpperCase()}</td>
                        <td>
                          <span className={purchase.status === "paid" || purchase.status === "approved" ? "status-ok" : "status-warn"}>
                            {purchase.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>Nenhuma compra ainda</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </article>

            <article className="glass-card">
              <div className="kicker">Checklist de producao</div>
              <ul className="list-clean">
                {warnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
                <li>Adaptador atual: {snapshot.adapter.kind}</li>
                <li>Alvo futuro: {snapshot.adapter.futureTargets.join(" / ")}</li>
                <li>Pagamento real entra sem reescrever a interface.</li>
              </ul>
            </article>
          </div>

          <section className="glass-card">
            <div className="kicker">Correcao humana especializada BenThec</div>
            <h2 style={{ marginTop: 8 }}>Fila operacional de redacao</h2>
            <p style={{ marginTop: 10 }}>
              Devolutiva em ate 24 horas. Avaliacao baseada nos criterios oficiais do edital e metodologia BenThec.
            </p>
            <div style={{ display: "grid", gap: 18, marginTop: 18 }}>
              {essays.length > 0 ? (
                essays.map((essay) => (
                  <article key={essay.id} className="plan-card" style={{ display: "grid", gap: 14 }}>
                    <div style={{ display: "grid", gap: 8 }}>
                      <strong>{essay.title}</strong>
                      <p><strong>Aluno:</strong> {essay.user?.name ?? "Aluno nao localizado"}</p>
                      <p><strong>Linha:</strong> {essay.linha} | <strong>Contexto:</strong> {essay.contexto} | <strong>Status:</strong> {essay.status}</p>
                      {essay.attachmentRef ? (
                        <p>
                          <strong>Arquivo:</strong>{" "}
                          <Link href={essay.attachmentRef} target="_blank">
                            {essay.attachmentName ?? "Abrir envio"}
                          </Link>
                        </p>
                      ) : null}
                      {essay.body ? (
                        <div className="glass-card" style={{ padding: 14 }}>
                          <strong>Texto digitado</strong>
                          <p style={{ marginTop: 8 }}>{essay.body.slice(0, 400)}{essay.body.length > 400 ? "..." : ""}</p>
                        </div>
                      ) : null}
                    </div>

                    <form action={saveEssayCorrection} style={{ display: "grid", gap: 12 }}>
                      <input type="hidden" name="essayId" value={essay.id} />
                      <input type="hidden" name="linha" value={essay.linha} />
                      <input type="hidden" name="contexto" value={essay.contexto} />

                      {essay.linha === "ENEM" ? (
                        <div className="section-grid">
                          {["c1", "c2", "c3", "c4", "c5"].map((field, index) => (
                            <label key={field} className="field">
                              <span>Competencia {index + 1}</span>
                              <input name={field} type="number" min="0" max="200" defaultValue={field === "c5" ? 160 : 140} />
                            </label>
                          ))}
                        </div>
                      ) : (
                        <div className="section-grid">
                          {[
                            ["tema", 14],
                            ["argumentacao", 18],
                            ["estrutura", 14],
                            ["gramatica", 14],
                            ["coesao", 14],
                            ["clareza", 12],
                            ...(essay.contexto === "PMES" ? [["objetividade", 10] as const] : []),
                          ].map(([field, initial]) => (
                            <label key={field} className="field">
                              <span>{String(field)}</span>
                              <input name={String(field)} type="number" min="0" max="20" defaultValue={initial} />
                            </label>
                          ))}
                        </div>
                      )}

                      <label className="field">
                        <span>Devolutiva</span>
                        <textarea name="devolutiva" defaultValue={essay.devolutiva} style={{ minHeight: 120 }} />
                      </label>
                      <label className="field">
                        <span>Pontos fortes</span>
                        <textarea name="pontosFortes" defaultValue={essay.pontosFortes.join("\n")} style={{ minHeight: 100 }} />
                      </label>
                      <label className="field">
                        <span>Pontos de melhoria</span>
                        <textarea name="pontosMelhoria" defaultValue={essay.pontosMelhoria.join("\n")} style={{ minHeight: 100 }} />
                      </label>
                      <label className="field">
                        <span>Erros recorrentes</span>
                        <textarea name="errosRecorrentes" defaultValue={essay.errosRecorrentes.join("\n")} style={{ minHeight: 100 }} />
                      </label>
                      <label className="field">
                        <span>Plano de evolucao</span>
                        <textarea name="planoEvolucao" defaultValue={essay.planoEvolucao.join("\n")} style={{ minHeight: 100 }} />
                      </label>
                      <label className="field">
                        <span>Proxima meta</span>
                        <textarea name="proximaMeta" defaultValue={essay.proximaMeta} style={{ minHeight: 90 }} />
                      </label>
                      <div className="actions">
                        <button type="submit" className="btn">Marcar como corrigida</button>
                      </div>
                    </form>
                  </article>
                ))
              ) : (
                <article className="plan-card">
                  <strong>Nenhuma redacao recebida ainda.</strong>
                </article>
              )}
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

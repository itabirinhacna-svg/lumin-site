import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { requireUser } from "@/lib/access";
import { getAdminSnapshot } from "@/lib/db";
import { getConfigWarnings } from "@/lib/env";

export default async function AdminPage() {
  await requireUser("admin");
  const snapshot = await getAdminSnapshot();
  const warnings = getConfigWarnings();

  return (
    <>
      <SiteHeader ctaLabel="Ver checkout" ctaHref="/checkout" />
      <main className="section">
        <div className="page-shell">
          <div style={{ marginBottom: 24 }}>
            <div className="kicker">Admin</div>
            <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 4.4rem)" }}>Painel operacional do produto educacional.</h1>
            <p>Este painel já consome dados persistidos de usuários e compras para facilitar a evolução do backoffice.</p>
          </div>

          <div className="admin-grid" style={{ marginBottom: 24 }}>
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
              <strong className="metric-value">{snapshot.totalUsers}</strong>
              <p>Usuários totais</p>
            </article>
          </div>

          <div className="admin-grid">
            <article className="table-card">
              <div className="kicker">Últimas compras</div>
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
                          <span className={purchase.status === "paid" ? "status-ok" : "status-warn"}>{purchase.status}</span>
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
              <div className="kicker">Checklist de produção</div>
              <ul className="list-clean">
                {warnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
                <li>Substituir o adaptador local por banco relacional gerenciado</li>
                <li>Conectar o provedor de pagamento real e seu webhook oficial</li>
                <li>Adicionar observabilidade, antifraude e trilha de auditoria</li>
              </ul>
            </article>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

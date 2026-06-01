import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getConfigWarnings } from "@/lib/env";
import { plans } from "@/lib/data";

export default function CheckoutPage() {
  const featured = plans.find((plan) => plan.featured) ?? plans[1];
  const warnings = getConfigWarnings();

  return (
    <>
      <SiteHeader ctaLabel="Entrar na área do aluno" ctaHref="/aluno" />
      <main className="section">
        <div className="page-shell">
          <div className="checkout-grid">
            <section className="plan-card featured">
              <span className="plan-badge">Plano em destaque</span>
              <div className="kicker">Checkout com criação de conta</div>
              <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>{featured.name}</h1>
              <p>{featured.description}</p>
              <div className="price">
                <strong>{featured.price}</strong>
                <span>{featured.installment}</span>
              </div>
              <ul className="feature-list">
                {featured.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <div className="tag-row" style={{ marginTop: 18 }}>
                <span className="pill">Cria conta e matrícula</span>
                <span className="pill">Sessão segura em cookie httpOnly</span>
                <span className="pill">Pronto para webhook de pagamento</span>
              </div>
            </section>

            <section className="auth-card">
              <div className="kicker">Finalizar compra</div>
              <h2 style={{ fontSize: "2.2rem" }}>Dados do aluno</h2>
              <form action="/api/checkout" method="post">
                <div className="field">
                  <label htmlFor="planId">Plano</label>
                  <select id="planId" name="planId" defaultValue={featured.id} required>
                    {plans.map((plan) => (
                      <option key={plan.id} value={plan.id}>
                        {plan.name} • {plan.price}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="name">Nome completo</label>
                  <input id="name" name="name" placeholder="Seu nome" required />
                </div>
                <div className="field">
                  <label htmlFor="email">E-mail</label>
                  <input id="email" name="email" type="email" placeholder="voce@exemplo.com" required />
                </div>
                <div className="field">
                  <label htmlFor="document">CPF</label>
                  <input id="document" name="document" placeholder="000.000.000-00" required />
                </div>
                <div className="field">
                  <label htmlFor="password">Senha de acesso</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Crie uma senha forte"
                    minLength={8}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="paymentMethod">Forma de pagamento</label>
                  <select id="paymentMethod" name="paymentMethod" defaultValue="pix" required>
                    <option value="pix">PIX</option>
                    <option value="card">Cartão de crédito</option>
                    <option value="boleto">Boleto</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="coupon">Cupom</label>
                  <input id="coupon" name="coupon" placeholder="Opcional" />
                </div>

                <div className="glass-card" style={{ padding: 18, marginBottom: 18 }}>
                  <strong>Fluxo atual</strong>
                  <p style={{ marginTop: 8 }}>
                    No ambiente local, o provedor padrão é mock e a compra aprova na hora para validar o acesso do aluno.
                    Em produção, basta ligar o gateway e o webhook.
                  </p>
                </div>

                {warnings.length > 0 ? (
                  <div className="glass-card" style={{ padding: 18, marginBottom: 18 }}>
                    <strong>Pendências de produção</strong>
                    <ul className="list-clean" style={{ marginTop: 10 }}>
                      {warnings.map((warning) => (
                        <li key={warning}>{warning}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="actions">
                  <button type="submit" className="btn">
                    Comprar e liberar acesso
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

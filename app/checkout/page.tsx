import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getConfigWarnings } from "@/lib/env";
import { plans } from "@/lib/data";

type CheckoutPageProps = {
  searchParams?: Promise<{
    plan?: string;
  }>;
};

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const params = (await searchParams) ?? {};
  const featured = plans.find((plan) => plan.id === params.plan) ?? plans.find((plan) => plan.featured) ?? plans[1];
  const warnings = getConfigWarnings();

  return (
    <>
      <SiteHeader ctaLabel="Entrar na area do aluno" ctaHref="/aluno" />
      <main className="section">
        <div className="page-shell">
          <div className="checkout-grid">
            <section className="plan-card featured">
              <span className="plan-badge">Plano selecionado</span>
              <div className="kicker">Aprova Agua Doce</div>
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
                <span className="pill">Conta e matricula no mesmo fluxo</span>
                <span className="pill">Biblioteca real do edital</span>
                <span className="pill">Acesso liberado por status da compra</span>
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
                        {plan.name} - {plan.price}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="name">Nome completo</label>
                  <input id="name" name="name" placeholder="Seu nome completo" minLength={5} required />
                </div>
                <div className="field">
                  <label htmlFor="email">E-mail</label>
                  <input id="email" name="email" type="email" placeholder="voce@exemplo.com" required />
                </div>
                <div className="field">
                  <label htmlFor="document">CPF</label>
                  <input id="document" name="document" placeholder="00000000000" inputMode="numeric" required />
                </div>
                <div className="field">
                  <label htmlFor="password">Senha de acesso</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Use letra maiuscula, minuscula e numero"
                    minLength={8}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="paymentMethod">Forma de pagamento</label>
                  <select id="paymentMethod" name="paymentMethod" defaultValue="pix" required>
                    <option value="pix">PIX</option>
                    <option value="card">Cartao de credito</option>
                    <option value="boleto">Boleto</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="coupon">Cupom</label>
                  <input id="coupon" name="coupon" placeholder="Opcional" />
                </div>
                <label
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                    marginBottom: 18,
                    color: "var(--muted)"
                  }}
                >
                  <input type="checkbox" name="acceptTerms" required style={{ marginTop: 5 }} />
                  <span>
                    Li e aceito os <a href="/termos">termos</a> e a <a href="/privacidade">politica de privacidade</a>.
                  </span>
                </label>

                <div className="glass-card" style={{ padding: 18, marginBottom: 18 }}>
                  <strong>O que o aluno recebe</strong>
                  <p style={{ marginTop: 8 }}>
                    A compra libera a area do aluno, trilhas organizadas, biblioteca com apostilas em PDF e Markdown e
                    o fluxo guiado do Aprova Agua Doce.
                  </p>
                </div>

                <div className="glass-card" style={{ padding: 18, marginBottom: 18 }}>
                  <strong>Seguranca do fluxo</strong>
                  <p style={{ marginTop: 8 }}>
                    O checkout valida origem da requisicao, aplica limite de tentativas e confere dados essenciais no
                    servidor antes de criar conta e matricula.
                  </p>
                </div>

                <div className="glass-card" style={{ padding: 18, marginBottom: 18 }}>
                  <strong>Fluxo atual</strong>
                  <p style={{ marginTop: 8 }}>
                    No ambiente local, o provedor padrao e mock e a compra aprova na hora para validar o acesso do
                    aluno. Em producao, basta ligar o gateway e o webhook.
                  </p>
                </div>

                {warnings.length > 0 ? (
                  <div className="glass-card" style={{ padding: 18, marginBottom: 18 }}>
                    <strong>Pendencias de producao</strong>
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

import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getConfigWarnings } from "@/lib/env";
import { plans } from "@/lib/data";
import { getCheckoutProviderState } from "@/lib/payments";

type CheckoutPageProps = {
  searchParams?: Promise<{
    plan?: string;
  }>;
};

const checkoutGroups = [
  {
    title: "Aprova Agua Doce",
    sections: [
      {
        title: "Fundamental",
        planIds: [
          "agua-doce-fundamental-apostila",
          "agua-doce-fundamental-apostila-simulados",
          "agua-doce-fundamental-portal",
        ],
      },
      {
        title: "Medio",
        planIds: [
          "agua-doce-medio-apostila",
          "agua-doce-medio-apostila-simulados",
          "agua-doce-medio-portal",
        ],
      },
      {
        title: "Saude",
        planIds: [
          "agua-doce-saude-apostila",
          "agua-doce-saude-apostila-simulados",
          "agua-doce-saude-portal",
        ],
      },
      {
        title: "Magisterio",
        planIds: [
          "agua-doce-magisterio-apostila",
          "agua-doce-magisterio-apostila-simulados",
          "agua-doce-pedagogicos-completo",
          "agua-doce-mapa-completo",
          "agua-doce-mapb-aee-completo",
        ],
      },
    ],
  },
  {
    title: "PMES",
    sections: [{ title: "Planos PMES", planIds: ["pmes-essencial", "pmes-premium", "pmes-intensivo"] }],
  },
  {
    title: "ENEM",
    sections: [{ title: "Planos ENEM", planIds: ["enem-completo", "enem-premium"] }],
  },
  {
    title: "Redacao",
    sections: [
      {
        title: "Redacao ENEM",
        planIds: ["redacao-enem-light", "redacao-enem-plus", "redacao-enem-intensivo"],
      },
      {
        title: "Redacao PMES",
        planIds: ["redacao-pmes-basico", "redacao-pmes-intermediario", "redacao-pmes-intensivo"],
      },
    ],
  },
];

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const params = (await searchParams) ?? {};
  const featured = plans.find((plan) => plan.id === params.plan) ?? plans.find((plan) => plan.featured) ?? plans[1];
  const warnings = getConfigWarnings();
  const providers = getCheckoutProviderState();

  return (
    <>
      <SiteHeader ctaLabel="Entrar na area do aluno" ctaHref="/area" />
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
              <div className="glass-card" style={{ padding: 18, marginTop: 18 }}>
                <strong>Linhas de produto</strong>
                <ul className="list-clean" style={{ marginTop: 10 }}>
                  <li>Aprova Agua Doce: produto ativo com trilhas por cargo</li>
                  <li>Redacao ENEM: jornada propria de envio, correcao e devolutiva</li>
                  <li>Redacao Concursos: criterio proprio para municipais e policiais</li>
                  <li>PMES: frente futura separada do fluxo atual</li>
                </ul>
              </div>
            </section>

            <section className="auth-card">
              <div className="kicker">Finalizar compra</div>
              <h2 style={{ fontSize: "2.2rem" }}>Seu acesso comeca aqui</h2>
              <div className="glass-card" style={{ padding: 18, marginBottom: 18 }}>
                <strong>Escolha seu plano por card</strong>
                <p style={{ marginTop: 8 }}>
                  A compra nao depende mais de select. Escolha o card do produto, volte para esta etapa e finalize seus dados.
                </p>
              </div>
              <div className="glass-card" style={{ padding: 18, marginBottom: 18 }}>
                <strong>Comparacao rapida entre formatos</strong>
                <div className="section-grid" style={{ marginTop: 14 }}>
                  <article className="plan-card">
                    <div className="kicker">Apostila</div>
                    <p style={{ marginTop: 8 }}>Para quem quer leitura direta e download do material.</p>
                  </article>
                  <article className="plan-card">
                    <div className="kicker">Apostila + Simulados</div>
                    <p style={{ marginTop: 8 }}>Para quem quer material e treino PDF no mesmo pacote.</p>
                  </article>
                  <article className="plan-card">
                    <div className="kicker">Portal Completo</div>
                    <p style={{ marginTop: 8 }}>Para quem quer trilha, video, questoes, revisao e acompanhamento em fluxo guiado.</p>
                  </article>
                </div>
              </div>
              <div style={{ display: "grid", gap: 18, marginBottom: 20 }}>
                {checkoutGroups.map((group) => (
                  <section key={group.title} className="glass-card" style={{ padding: 18 }}>
                    <div className="kicker">{group.title}</div>
                    <div style={{ display: "grid", gap: 16, marginTop: 14 }}>
                      {group.sections.map((section) => (
                        <div key={section.title} style={{ display: "grid", gap: 12 }}>
                          <strong>{section.title}</strong>
                          <div className="section-grid">
                            {section.planIds.map((planId) => {
                              const plan = plans.find((item) => item.id === planId);
                              if (!plan) return null;

                              const selected = plan.id === featured.id;

                              return (
                                <article
                                  key={plan.id}
                                  className="plan-card"
                                  style={{
                                    borderColor: selected ? "rgba(197,139,0,.4)" : undefined,
                                    boxShadow: selected ? "0 0 0 1px rgba(197,139,0,.22) inset" : undefined,
                                  }}
                                >
                                  <div className="kicker">{plan.name.replace(/^Aprova Agua Doce\s+/i, "").replace(/^Redacao /i, "")}</div>
                                  <h3 style={{ marginTop: 8 }}>{plan.price}</h3>
                                  <p style={{ marginTop: 8 }}>{plan.description}</p>
                                  <p style={{ marginTop: 8, color: "var(--muted)" }}>{plan.installment}</p>
                                  <ul className="feature-list" style={{ marginTop: 12 }}>
                                    {plan.features.slice(0, 3).map((feature) => (
                                      <li key={feature}>{feature}</li>
                                    ))}
                                  </ul>
                                  <div className="actions" style={{ marginTop: 14 }}>
                                    <Link href={`/checkout?plan=${plan.id}`} className={selected ? "btn" : "btn-secondary"}>
                                      {selected ? "Plano selecionado" : "Escolher plano"}
                                    </Link>
                                  </div>
                                </article>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
              <div className="glass-card" style={{ padding: 18, marginBottom: 18 }}>
                <strong>Produtos relacionados</strong>
                <div className="section-grid" style={{ marginTop: 14 }}>
                  <article className="plan-card">
                    <div className="kicker">Upsell</div>
                    <strong>Redacao</strong>
                    <p style={{ marginTop: 8 }}>Boa escolha para quem quer subir consistencia de escrita junto com a prova objetiva.</p>
                  </article>
                  <article className="plan-card">
                    <div className="kicker">Upsell</div>
                    <strong>PMES</strong>
                    <p style={{ marginTop: 8 }}>Indicado para quem quer separar uma frente policial com trilha e simulados proprios.</p>
                  </article>
                  <article className="plan-card">
                    <div className="kicker">Upsell</div>
                    <strong>ENEM</strong>
                    <p style={{ marginTop: 8 }}>Ideal para quem tambem precisa de uma trilha de quatro areas e redacao acompanhada.</p>
                  </article>
                </div>
              </div>
              <form action="/api/checkout" method="post">
                <input type="hidden" id="planId" name="planId" value={featured.id} />
                <div className="glass-card" style={{ padding: 18, marginBottom: 18 }}>
                  <strong>Plano escolhido</strong>
                  <p style={{ marginTop: 8 }}>{featured.name}</p>
                  <p style={{ marginTop: 8 }}>{featured.price} | {featured.installment}</p>
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
                  <strong>O que voce recebe</strong>
                  <p style={{ marginTop: 8 }}>
                    A compra libera a area do aluno, a trilha do seu cargo, a leitura digital, as apostilas em PDF,
                    as questoes e o fluxo guiado do Aprova Agua Doce.
                  </p>
                </div>

                <div className="glass-card" style={{ padding: 18, marginBottom: 18 }}>
                  <strong>Arquitetura pronta para os proximos produtos</strong>
                  <ul className="list-clean" style={{ marginTop: 10 }}>
                    <li>Aprova Agua Doce com checkout ativo nesta demonstracao</li>
                    <li>PMES preparada para checkout proprio no proximo ciclo comercial</li>
                    <li>Redacao ENEM preparada para plano e assinatura separados</li>
                    <li>Redacao Concursos preparada para plano e assinatura separados</li>
                  </ul>
                </div>

                <div className="glass-card" style={{ padding: 18, marginBottom: 18 }}>
                  <strong>Como cuidamos desta etapa</strong>
                  <p style={{ marginTop: 8 }}>
                    Antes de liberar o acesso, a plataforma confere os dados principais e limita tentativas para evitar
                    uso indevido. Assim voce entra no curso certo sem confusao.
                  </p>
                </div>

                <div className="glass-card" style={{ padding: 18, marginBottom: 18 }}>
                  <strong>Fluxo atual</strong>
                  <p style={{ marginTop: 8 }}>
                    Nesta versao de demonstracao, a compra aprova na hora para voce entrar e navegar no produto. Em
                    publicacao comercial, basta conectar o gateway e o webhook.
                  </p>
                </div>

                <div className="glass-card" style={{ padding: 18, marginBottom: 18 }}>
                  <strong>Gateways preparados</strong>
                  <ul className="list-clean" style={{ marginTop: 10 }}>
                    <li>Mercado Pago: {providers.mercadoPagoReady ? "chave inserida" : "aguardando chave"}</li>
                    <li>Stripe: {providers.stripeReady ? "chave inserida" : "aguardando chave"}</li>
                    <li>Asaas: {providers.asaasReady ? "chave inserida" : "aguardando chave"}</li>
                    <li>Modo atual: {providers.isDemo ? "demonstracao honesta" : providers.provider}</li>
                  </ul>
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

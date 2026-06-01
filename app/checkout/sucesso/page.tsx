import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { requireStudentAccess } from "@/lib/access";

export default async function CheckoutSuccessPage() {
  const { user, purchase } = await requireStudentAccess();

  return (
    <>
      <SiteHeader ctaLabel="Ir para meus estudos" ctaHref="/aluno" />
      <main className="section">
        <div className="page-shell glass-card">
          <div className="kicker">Compra concluída</div>
          <h1 style={{ fontSize: "clamp(2.3rem, 5vw, 4rem)" }}>Acesso liberado para {user.name}.</h1>
          <p>
            Seu pedido do plano <strong>{purchase.planName}</strong> foi registrado e a área do aluno já está liberada.
          </p>
          <div className="tag-row" style={{ margin: "18px 0 24px" }}>
            <span className="pill">Status: {purchase.status}</span>
            <span className="pill">Pagamento: {purchase.paymentMethod.toUpperCase()}</span>
          </div>
          <div className="actions">
            <Link href="/aluno" className="btn">
              Começar a estudar
            </Link>
            <Link href="/" className="btn-ghost">
              Voltar para o site
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { requireStudentAccess } from "@/lib/access";

export default async function LessonDemoPage() {
  await requireStudentAccess();

  return (
    <>
      <SiteHeader ctaLabel="Voltar ao painel" ctaHref="/aluno" />
      <main className="section">
        <div className="page-shell dashboard-grid">
          <section className="hero-card">
            <div className="kicker">Aula demonstrativa</div>
            <h1 style={{ fontSize: "clamp(2.1rem, 5vw, 3.8rem)" }}>Ciclo de estudos de alta retenÃ§Ã£o</h1>
            <p>
              Aqui entra o player de vÃ­deo, o material complementar e o controle de progresso. A estrutura jÃ¡ separa bem
              consumo de conteÃºdo, download e CTA de prÃ³xima aula.
            </p>
            <div
              className="glass-card"
              style={{
                minHeight: 300,
                display: "grid",
                placeItems: "center",
                background: "linear-gradient(135deg, rgba(20,76,69,0.95), rgba(198,106,40,0.82))",
                color: "white"
              }}
            >
              <strong style={{ fontSize: "1.3rem" }}>Player protegido com tracking de progresso</strong>
            </div>
          </section>
          <aside className="glass-card">
            <div className="kicker">Materiais</div>
            <ul className="list-clean">
              <li>Resumo em PDF</li>
              <li>Mapa mental em uma pÃ¡gina</li>
              <li>Lista de exercÃ­cios aplicada</li>
              <li>PrÃ³xima revisÃ£o agendada</li>
            </ul>
            <div className="actions" style={{ marginTop: 20 }}>
              <Link href="/aluno" className="btn">
                Concluir e voltar
              </Link>
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}


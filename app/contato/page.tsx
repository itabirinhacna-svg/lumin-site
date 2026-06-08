import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function ContactPage() {
  return (
    <>
      <SiteHeader ctaLabel="Falar com a equipe" ctaHref="/suporte" />
      <main className="section">
        <div className="page-shell glass-card">
          <div className="kicker">Contato</div>
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>Canal direto com a equipe BenThec.</h1>
          <p style={{ marginTop: 10 }}>Atendimento comercial, pedagogico e operacional centralizados.</p>
          <ul className="list-clean" style={{ marginTop: 16 }}>
            <li>WhatsApp: (27) 99985-0434</li>
            <li>Email operacional: suporte@benthec.com.br</li>
            <li>Horario sugerido: segunda a sexta, 8h as 18h</li>
          </ul>
          <div className="actions" style={{ marginTop: 18 }}>
            <Link href="/suporte" className="btn">Abrir suporte</Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

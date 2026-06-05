import Link from "next/link";
import { trilhas } from "@/lib/trilhas-data";

const etapas = ["Entenda", "Assista", "Leia", "Pratique", "Revise", "Conclua"];

export default function AreaPage() {
  const destaques = trilhas.slice(0, 3);

  return (
    <main style={{ minHeight: "100vh", background: "#0F172A", color: "#F8FAFC", fontFamily: "Inter, system-ui, sans-serif" }}>
      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", minHeight: "100vh" }}>
        <aside style={{ background: "#020617", padding: 24, borderRight: "1px solid #1E293B" }}>
          <strong style={{ color: "#C58B00", fontSize: 24 }}>BenThec</strong>
          <p style={{ color: "#94A3B8", fontSize: 13 }}>Preparação acompanhada</p>

          <nav style={{ display: "grid", gap: 12, marginTop: 32 }}>
            {["Início", "Minha Trilha", "Vídeos", "Materiais", "Questões", "Simulados", "Atendimento"].map((item) => (
              <a key={item} href="#" style={{ color: "#E2E8F0", textDecoration: "none", padding: "12px 14px", borderRadius: 14, background: item === "Minha Trilha" ? "#1E293B" : "transparent" }}>
                {item}
              </a>
            ))}
          </nav>
        </aside>

        <section style={{ padding: 32 }}>
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
            <div>
              <h1 style={{ fontSize: 42, margin: 0 }}>Área do Aluno</h1>
              <p style={{ color: "#CBD5E1" }}>Aprova Água Doce · Continue exatamente de onde parou.</p>
            </div>
            <Link href="https://wa.me/5527999850434?text=Olá,%20preciso%20de%20suporte%20na%20minha%20trilha%20BenThec." style={{ background: "#C58B00", color: "#fff", padding: "14px 20px", borderRadius: 999, textDecoration: "none", fontWeight: 800 }}>
              Suporte
            </Link>
          </header>

          <div style={{ display: "grid", gridTemplateColumns: "1.4fr .8fr", gap: 24 }}>
            <article style={{ background: "#111827", border: "1px solid #334155", borderRadius: 28, padding: 28 }}>
              <span style={{ color: "#C58B00", fontWeight: 900 }}>Continue sua trilha</span>
              <h2 style={{ fontSize: 34, margin: "12px 0 4px" }}>Português</h2>
              <p style={{ color: "#CBD5E1" }}>Etapa 3 de 6 · Pratique com questões</p>

              <div style={{ margin: "24px 0", height: 14, background: "#1E293B", borderRadius: 999 }}>
                <div style={{ width: "42%", height: "100%", background: "#15803D", borderRadius: 999 }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10 }}>
                {etapas.map((etapa, index) => (
                  <div key={etapa} style={{ background: index < 3 ? "#064E3B" : index === 3 ? "#C58B00" : "#1E293B", padding: 14, borderRadius: 16, textAlign: "center", fontWeight: 800 }}>
                    {etapa}
                  </div>
                ))}
              </div>

              <Link href="/aluno/aula-demo" style={{ display: "inline-flex", marginTop: 26, background: "#C58B00", color: "#fff", padding: "14px 22px", borderRadius: 999, textDecoration: "none", fontWeight: 900 }}>
                Continuar aula
              </Link>
            </article>

            <aside style={{ display: "grid", gap: 16 }}>
              <div style={{ background: "#111827", border: "1px solid #334155", borderRadius: 24, padding: 22 }}>
                <h3>Próximas atividades</h3>
                <p style={{ color: "#CBD5E1" }}>Resolver questões, revisar erros e avançar para a próxima etapa.</p>
              </div>
              <div style={{ background: "#111827", border: "1px solid #334155", borderRadius: 24, padding: 22 }}>
                <h3>Materiais recentes</h3>
                <p style={{ color: "#CBD5E1" }}>Apostila, resumo BenThec e lista de questões.</p>
              </div>
            </aside>
          </div>

          <section style={{ marginTop: 32 }}>
            <h2>Trilhas disponíveis</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
              <Link href="/trilhas/operacionais" style={cardStyle}>Operacionais</Link>
              <Link href="/trilhas/saude" style={cardStyle}>Saúde</Link>
              <Link href="/trilhas/magisterio" style={cardStyle}>Magistério</Link>
            </div>
          </section>

          <section style={{ marginTop: 32 }}>
            <h2>Primeiros módulos</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
              {destaques.map((trilha) => (
                <Link key={trilha.slug} href="/aluno/aula-demo" style={cardStyle}>
                  <strong>{trilha.titulo}</strong>
                  <span style={{ display: "block", color: "#CBD5E1", marginTop: 8 }}>{trilha.descricao}</span>
                </Link>
              ))}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}

const cardStyle = {
  display: "block",
  background: "#111827",
  border: "1px solid #334155",
  borderRadius: 24,
  padding: 24,
  color: "#F8FAFC",
  textDecoration: "none",
  fontWeight: 900,
} as const;

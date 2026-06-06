import Link from "next/link";
import { getTracksByArea } from "@/lib/curadoria";

export default function SaudePage() {
  const trilhas = getTracksByArea("saude");

  return (
    <main style={page}>
      <div style={wrap}>
        <Link href="/trilhas" style={back}>
          Voltar para trilhas
        </Link>
        <h1 style={title}>Saude</h1>
        <p style={subtitle}>Trilha com biblioteca real para Tecnico em Enfermagem e suporte de estudo guiado.</p>

        <div style={grid}>
          {trilhas.map((trilha) => (
            <Link href={`/aluno/aula-demo?trilha=${trilha.slug}`} key={trilha.slug} style={card}>
              <h2>{trilha.titulo}</h2>
              <p>{trilha.resumo}</p>
              <strong>
                {trilha.materiais.length} materiais · {trilha.bibliotecaStatus}
              </strong>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

const page = {
  minHeight: "100vh",
  background: "#F8F6F1",
  padding: 40,
  fontFamily: "Inter, system-ui, sans-serif",
} as const;
const wrap = { maxWidth: 1200, margin: "0 auto" } as const;
const back = { color: "#C58B00", fontWeight: 900, textDecoration: "none" } as const;
const title = { fontSize: 54, color: "#0F172A", marginBottom: 8 } as const;
const subtitle = { color: "#475569", fontSize: 20 } as const;
const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 20, marginTop: 36 } as const;
const card = {
  background: "#fff",
  border: "1px solid #E2E8F0",
  borderRadius: 24,
  padding: 24,
  textDecoration: "none",
  color: "#0F172A",
  boxShadow: "0 10px 30px rgba(0,0,0,.05)",
} as const;

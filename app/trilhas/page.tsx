import Link from "next/link";
import { curadoria } from "@/lib/curadoria";

export default function TrilhasPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #020617 0%, #0f172a 100%)",
        padding: 40,
        fontFamily: "Inter, system-ui, sans-serif",
        color: "#F8FAFC",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <span
          style={{
            background: "rgba(197,139,0,.12)",
            color: "#F3CF6F",
            padding: "8px 14px",
            borderRadius: 999,
            fontWeight: 800,
            border: "1px solid rgba(197,139,0,.24)",
          }}
        >
          APROVA AGUA DOCE
        </span>

        <h1
          style={{
            fontSize: 56,
            marginTop: 20,
            color: "#FFFFFF",
          }}
        >
          Trilhas de Aprendizagem
        </h1>

        <p
          style={{
            color: "#CBD5E1",
            fontSize: 20,
            maxWidth: 760,
            lineHeight: 1.7,
          }}
        >
          Escolha a area desejada e siga uma jornada organizada com biblioteca real, materiais em PDF e apoio da
          plataforma BenThec.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
            marginTop: 40,
          }}
        >
          {curadoria.map((group) => (
            <Link href={`/trilhas/${group.slug}`} key={group.slug} style={card}>
              <h2 style={{ marginTop: 0 }}>{group.title}</h2>
              <p style={{ color: "#475569", lineHeight: 1.7 }}>{group.description}</p>
              <strong style={{ color: "#0F172A" }}>{group.tracks.length} trilhas conectadas</strong>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

const card = {
  background: "#FFFFFF",
  border: "1px solid #E2E8F0",
  borderRadius: 24,
  padding: 28,
  textDecoration: "none",
  color: "#0F172A",
  boxShadow: "0 10px 30px rgba(0,0,0,.05)",
} as const;

import Link from "next/link";

export default function TrilhasPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#F8F6F1",
        padding: 40,
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <span
          style={{
            background: "#FFF4D6",
            color: "#C58B00",
            padding: "8px 14px",
            borderRadius: 999,
            fontWeight: 800,
          }}
        >
          APROVA ÁGUA DOCE
        </span>

        <h1
          style={{
            fontSize: 56,
            marginTop: 20,
            color: "#0F172A",
          }}
        >
          Trilhas de Aprendizagem
        </h1>

        <p
          style={{
            color: "#475569",
            fontSize: 20,
            maxWidth: 700,
          }}
        >
          Escolha a área desejada e siga uma jornada organizada com
          videoaulas, materiais, questões e revisões.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 24,
            marginTop: 40,
          }}
        >
          <Link href="/trilhas/operacionais" style={card}>
            <h2>Operacionais</h2>
            <p>
              Auxiliar de Serviços Gerais, Merendeira, Motorista e Operador de
              Máquinas.
            </p>
          </Link>

          <Link href="/trilhas/saude" style={card}>
            <h2>Saúde</h2>
            <p>
              Técnico em Enfermagem com trilha organizada por módulos.
            </p>
          </Link>

          <Link href="/trilhas/magisterio" style={card}>
            <h2>Magistério</h2>
            <p>
              Pedagógicos, Educação Infantil, Séries Iniciais e AEE.
            </p>
          </Link>
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

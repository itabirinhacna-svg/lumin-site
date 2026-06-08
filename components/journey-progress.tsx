type JourneyStep = {
  label: string;
  status: "concluida" | "atual" | "pendente";
};

type JourneyProgressProps = {
  currentLabel: string;
  nextLabel: string;
  progress: number;
  steps: JourneyStep[];
};

const statusPalette = {
  concluida: {
    bg: "rgba(21,128,61,.16)",
    border: "rgba(21,128,61,.3)",
    text: "#dcfce7",
    badge: "Concluida",
  },
  atual: {
    bg: "rgba(197,139,0,.14)",
    border: "rgba(197,139,0,.28)",
    text: "#fef3c7",
    badge: "Agora",
  },
  pendente: {
    bg: "rgba(255,255,255,.04)",
    border: "rgba(255,255,255,.08)",
    text: "#e2e8f0",
    badge: "Depois",
  },
} as const;

export function JourneyProgress({ currentLabel, nextLabel, progress, steps }: JourneyProgressProps) {
  return (
    <section className="glass-card" style={{ background: "#0f172a", borderColor: "rgba(255,255,255,.08)" }}>
      <div className="kicker" style={{ color: "#f3cf6f" }}>Continue daqui</div>
      <h2 style={{ marginTop: 8, color: "#fff" }}>{currentLabel}</h2>
      <p style={{ marginTop: 10, color: "#cbd5e1" }}>
        Voce nao precisa pensar no caminho inteiro agora. Termine esta parte e depois siga para <strong>{nextLabel}</strong>.
      </p>

      <div
        style={{
          marginTop: 18,
          height: 12,
          borderRadius: 999,
          background: "#1f2937",
          overflow: "hidden",
        }}
      >
        <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #15803d, #22c55e)" }} />
      </div>

      <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
        {steps.map((step, index) => {
          const palette = statusPalette[step.status];

          return (
            <article
              key={`${step.label}-${index}`}
              style={{
                display: "grid",
                gap: 8,
                padding: 16,
                borderRadius: 20,
                background: palette.bg,
                border: `1px solid ${palette.border}`,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
                <strong style={{ color: palette.text }}>{step.label}</strong>
                <span
                  style={{
                    minHeight: 28,
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "0 10px",
                    borderRadius: 999,
                    background: "rgba(2,6,23,.26)",
                    color: palette.text,
                    fontSize: 12,
                    fontWeight: 800,
                  }}
                >
                  {palette.badge}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

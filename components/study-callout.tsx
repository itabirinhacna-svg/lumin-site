type StudyCalloutVariant =
  | "destaque"
  | "cai-na-prova"
  | "atencao"
  | "exemplo"
  | "dica-banca"
  | "resumo"
  | "erro-comum"
  | "questao-comentada";

type StudyCalloutProps = {
  variant: StudyCalloutVariant;
  title: string;
  children: React.ReactNode;
};

const variantTheme: Record<StudyCalloutVariant, { border: string; background: string; label: string }> = {
  destaque: {
    border: "rgba(197,139,0,.28)",
    background: "linear-gradient(135deg, rgba(197,139,0,.14), rgba(197,139,0,.06))",
    label: "Destaque",
  },
  "cai-na-prova": {
    border: "rgba(34,197,94,.22)",
    background: "linear-gradient(135deg, rgba(34,197,94,.12), rgba(34,197,94,.05))",
    label: "Cai na prova",
  },
  atencao: {
    border: "rgba(239,68,68,.24)",
    background: "linear-gradient(135deg, rgba(239,68,68,.12), rgba(239,68,68,.04))",
    label: "Atencao",
  },
  exemplo: {
    border: "rgba(255,255,255,.12)",
    background: "rgba(255,255,255,.04)",
    label: "Exemplo",
  },
  "dica-banca": {
    border: "rgba(21,128,61,.28)",
    background: "linear-gradient(135deg, rgba(21,128,61,.12), rgba(21,128,61,.04))",
    label: "Dica da banca",
  },
  resumo: {
    border: "rgba(148,163,184,.2)",
    background: "rgba(148,163,184,.08)",
    label: "Resumo",
  },
  "erro-comum": {
    border: "rgba(251,191,36,.24)",
    background: "linear-gradient(135deg, rgba(251,191,36,.12), rgba(251,191,36,.04))",
    label: "Erro comum",
  },
  "questao-comentada": {
    border: "rgba(96,165,250,.26)",
    background: "linear-gradient(135deg, rgba(96,165,250,.12), rgba(96,165,250,.04))",
    label: "Questao comentada",
  },
};

export function StudyCallout({ variant, title, children }: StudyCalloutProps) {
  const theme = variantTheme[variant];

  return (
    <article
      style={{
        display: "grid",
        gap: 10,
        padding: 18,
        borderRadius: 24,
        border: `1px solid ${theme.border}`,
        background: theme.background,
      }}
    >
      <div style={{ color: "#f3cf6f", fontSize: 12, fontWeight: 900, letterSpacing: ".08em", textTransform: "uppercase" }}>
        {theme.label}
      </div>
      <strong style={{ color: "#fff", fontSize: "1.06rem" }}>{title}</strong>
      <div style={{ color: "#e2e8f0", lineHeight: 1.8 }}>{children}</div>
    </article>
  );
}

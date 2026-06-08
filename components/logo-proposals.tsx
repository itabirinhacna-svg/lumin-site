export function LogoProposals() {
  const proposals = [
    {
      title: "Proposta A",
      subtitle: "Trilha ate a aprovacao",
      description: "Uma linha que avanca, muda de nivel e termina em chegada.",
      svg: (
        <svg viewBox="0 0 72 72" aria-hidden="true">
          <rect x="4" y="4" width="64" height="64" rx="18" fill="#0F172A" />
          <path d="M16 49C24 49 26 41 33 41H39C45 41 47 29 56 29" fill="none" stroke="#C58B00" strokeWidth="5" strokeLinecap="round" />
          <circle cx="18" cy="49" r="4" fill="#fff" />
          <circle cx="34" cy="41" r="4" fill="#fff" />
          <circle cx="56" cy="29" r="4" fill="#15803D" />
        </svg>
      ),
    },
    {
      title: "Proposta B",
      subtitle: "Caminho crescente",
      description: "Blocos conectados que mostram crescimento passo a passo.",
      svg: (
        <svg viewBox="0 0 72 72" aria-hidden="true">
          <rect x="4" y="4" width="64" height="64" rx="18" fill="#0F172A" />
          <rect x="16" y="40" width="10" height="12" rx="3" fill="#fff" />
          <rect x="30" y="32" width="10" height="20" rx="3" fill="#C58B00" />
          <rect x="44" y="22" width="10" height="30" rx="3" fill="#15803D" />
          <path d="M18 28L28 28L28 18L38 18" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: "Proposta C",
      subtitle: "Evolucao guiada",
      description: "Pontos de passagem que mostram apoio, direcao e progresso.",
      svg: (
        <svg viewBox="0 0 72 72" aria-hidden="true">
          <rect x="4" y="4" width="64" height="64" rx="18" fill="#0F172A" />
          <path d="M16 49L29 40L40 34L56 22" fill="none" stroke="#C58B00" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="16" cy="49" r="4" fill="#fff" />
          <circle cx="29" cy="40" r="4" fill="#fff" />
          <circle cx="40" cy="34" r="4" fill="#C58B00" />
          <path d="M52 22H58V16" fill="none" stroke="#15803D" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M49 25L58 16" fill="none" stroke="#15803D" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <div className="catalog-grid">
      {proposals.map((proposal) => (
        <article key={proposal.title} className="catalog-card">
          <div style={{ width: 72, height: 72 }}>{proposal.svg}</div>
          <h3 style={{ marginTop: 14 }}>{proposal.title}</h3>
          <p style={{ marginTop: 8 }}>
            <strong>{proposal.subtitle}</strong>
          </p>
          <p style={{ marginTop: 10 }}>{proposal.description}</p>
        </article>
      ))}
    </div>
  );
}

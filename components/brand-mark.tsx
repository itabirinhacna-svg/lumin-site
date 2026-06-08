import type { CSSProperties } from "react";

export const brandMarkVariants = [
  {
    id: "journey",
    title: "Jornada de aprovacao",
    subtitle: "Monograma com trilha e chegada",
  },
  {
    id: "milestone",
    title: "Marcos de evolucao",
    subtitle: "Blocos de progresso em forma de marca",
  },
  {
    id: "summit",
    title: "Chegada ao topo",
    subtitle: "Direcao, subida e ponto de conquista",
  },
] as const;

type BrandMarkVariant = (typeof brandMarkVariants)[number]["id"];

type BrandMarkProps = {
  compact?: boolean;
  className?: string;
  variant?: BrandMarkVariant;
};

export function BrandMark({ compact = false, className, variant = "journey" }: BrandMarkProps) {
  const svgStyle = {
    "--brand-graphite": "#0F172A",
    "--brand-mustard": "#C58B00",
    "--brand-green": "#15803D",
    "--brand-ivory": "#F8FAFC"
  } as CSSProperties;

  const symbol = {
    journey: (
      <>
        <rect x="12" y="12" width="48" height="48" rx="14" fill="rgba(255,255,255,.02)" stroke="rgba(197,139,0,.28)" />
        <path d="M26 22H42" stroke="url(#benthec-track)" strokeWidth="5" strokeLinecap="round" />
        <path d="M26 22V50" stroke="url(#benthec-track)" strokeWidth="5" strokeLinecap="round" />
        <path d="M26 36H39.5" stroke="url(#benthec-track)" strokeWidth="5" strokeLinecap="round" />
        <path d="M26 50H42" stroke="url(#benthec-track)" strokeWidth="5" strokeLinecap="round" />
        <path d="M42 22V50" stroke="var(--brand-ivory)" strokeWidth="4" strokeLinecap="round" />
        <path d="M42 36H34" stroke="var(--brand-ivory)" strokeWidth="4" strokeLinecap="round" />
        <circle cx="47" cy="50" r="3.6" fill="var(--brand-mustard)" />
      </>
    ),
    milestone: (
      <>
        <rect x="12" y="12" width="48" height="48" rx="14" fill="rgba(255,255,255,.02)" stroke="rgba(197,139,0,.22)" />
        <rect x="24" y="21" width="7" height="30" rx="3.5" fill="url(#benthec-track)" />
        <rect x="31" y="21" width="13" height="7" rx="3.5" fill="url(#benthec-track)" />
        <rect x="31" y="34" width="11" height="7" rx="3.5" fill="url(#benthec-track)" />
        <rect x="31" y="47" width="13" height="7" rx="3.5" fill="url(#benthec-track)" />
        <path d="M44 21V51" stroke="var(--brand-ivory)" strokeWidth="4" strokeLinecap="round" />
        <path d="M44 34H36" stroke="var(--brand-ivory)" strokeWidth="4" strokeLinecap="round" />
        <circle cx="49" cy="51" r="3.6" fill="var(--brand-mustard)" />
      </>
    ),
    summit: (
      <>
        <rect x="12" y="12" width="48" height="48" rx="14" fill="rgba(255,255,255,.02)" stroke="rgba(197,139,0,.22)" />
        <path d="M24 49V23H40" stroke="url(#benthec-track)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24 36H38" stroke="url(#benthec-track)" strokeWidth="5" strokeLinecap="round" />
        <path d="M24 49H40" stroke="url(#benthec-track)" strokeWidth="5" strokeLinecap="round" />
        <path d="M41 23V49" stroke="var(--brand-ivory)" strokeWidth="4" strokeLinecap="round" />
        <path d="M41 23H53V17" stroke="var(--brand-mustard)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M47 23L53 17" stroke="var(--brand-mustard)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="46" cy="49" r="3.6" fill="var(--brand-ivory)" />
      </>
    ),
  } as const;

  return (
    <span className={`brand-signature${compact ? " compact" : ""}${className ? ` ${className}` : ""}`}>
      <span className="brand-symbol" aria-hidden="true">
        <svg viewBox="0 0 72 72" role="img" style={svgStyle}>
          <defs>
            <linearGradient id="benthec-track" x1="10" y1="60" x2="60" y2="16" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#8A5B00" />
              <stop offset="0.55" stopColor="var(--brand-mustard)" />
              <stop offset="1" stopColor="#F4D37B" />
            </linearGradient>
            <filter id="brand-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="1 0 0 0 0.772
                        0 1 0 0 0.545
                        0 0 1 0 0
                        0 0 0 .38 0"
              />
            </filter>
          </defs>

          <rect x="4" y="4" width="64" height="64" rx="20" fill="var(--brand-graphite)" />
          <rect x="9" y="9" width="54" height="54" rx="18" fill="rgba(255,255,255,.01)" stroke="rgba(255,255,255,.04)" />
          <rect x="12" y="12" width="48" height="48" rx="14" fill="none" stroke="rgba(197,139,0,.14)" filter="url(#brand-glow)" />
          {symbol[variant]}
        </svg>
      </span>

      <span className="brand-copy">
        <span className="brand-name">BenThec</span>
        {!compact ? <span className="brand-tagline">acompanhamento ate a aprovacao</span> : null}
      </span>
    </span>
  );
}

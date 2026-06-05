import type { CSSProperties } from "react";

type BrandMarkProps = {
  compact?: boolean;
  className?: string;
};

export function BrandMark({ compact = false, className }: BrandMarkProps) {
  const svgStyle = {
    "--brand-graphite": "#0F172A",
    "--brand-mustard": "#C58B00",
    "--brand-green": "#15803D"
  } as CSSProperties;

  return (
    <span className={`brand-signature${compact ? " compact" : ""}${className ? ` ${className}` : ""}`}>
      <span className="brand-symbol" aria-hidden="true">
        <svg viewBox="0 0 72 72" role="img" style={svgStyle}>
          <defs>
            <linearGradient id="benthec-track" x1="10" y1="60" x2="60" y2="16" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="var(--brand-graphite)" />
              <stop offset="0.6" stopColor="var(--brand-mustard)" />
              <stop offset="1" stopColor="var(--brand-green)" />
            </linearGradient>
          </defs>

          <rect x="4" y="4" width="64" height="64" rx="20" fill="var(--brand-graphite)" />
          <path
            d="M17 47C22 47 24 41 28 41H34C38 41 40 34 44 34H51"
            fill="none"
            stroke="url(#benthec-track)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M47 30L55 30L55 22"
            fill="none"
            stroke="var(--brand-green)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M46 31L55 22"
            fill="none"
            stroke="var(--brand-green)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="16" y="42" width="10" height="10" rx="3" fill="#F8FAFC" />
          <rect x="29" y="36" width="10" height="10" rx="3" fill="var(--brand-mustard)" />
          <rect x="42" y="29" width="10" height="10" rx="3" fill="#F8FAFC" />
          <circle cx="55" cy="22" r="4" fill="var(--brand-green)" />
        </svg>
      </span>

      <span className="brand-copy">
        <span className="brand-name">BenThec</span>
        {!compact ? <span className="brand-tagline">trilha, tecnologia e aprovacao</span> : null}
      </span>
    </span>
  );
}

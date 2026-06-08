"use client";

import { useMemo, useState } from "react";

type AchievementShareCardProps = {
  title: string;
  subtitle: string;
  message: string;
  progressLabel: string;
};

function buildCardSvg(title: string, subtitle: string, message: string, progressLabel: string) {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#020617" />
          <stop offset="100%" stop-color="#111827" />
        </linearGradient>
        <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#c58b00" />
          <stop offset="100%" stop-color="#f3cf6f" />
        </linearGradient>
      </defs>
      <rect width="1200" height="630" rx="40" fill="url(#bg)" />
      <rect x="42" y="42" width="1116" height="546" rx="32" fill="none" stroke="rgba(255,255,255,.14)" />
      <text x="88" y="120" fill="#f3cf6f" font-family="Arial, sans-serif" font-size="32" font-weight="700">BenThec</text>
      <text x="88" y="238" fill="#ffffff" font-family="Arial, sans-serif" font-size="64" font-weight="800">${title}</text>
      <text x="88" y="298" fill="#f3cf6f" font-family="Arial, sans-serif" font-size="34" font-weight="700">${subtitle}</text>
      <text x="88" y="380" fill="#cbd5e1" font-family="Arial, sans-serif" font-size="30">${message}</text>
      <text x="88" y="460" fill="#ffffff" font-family="Arial, sans-serif" font-size="36" font-weight="700">${progressLabel}</text>
      <text x="88" y="530" fill="#94a3b8" font-family="Arial, sans-serif" font-size="28">BenThec - estudo guiado ate a aprovacao</text>
      <rect x="820" y="120" width="260" height="260" rx="36" fill="rgba(197,139,0,.12)" stroke="url(#gold)" stroke-width="4" />
      <circle cx="950" cy="250" r="76" fill="url(#gold)" opacity=".16" />
      <path d="M950 180l18 38 42 6-30 29 8 42-38-20-38 20 8-42-30-29 42-6 18-38z" fill="url(#gold)" />
    </svg>
  `.trim();
}

export function AchievementShareCard({ title, subtitle, message, progressLabel }: AchievementShareCardProps) {
  const [status, setStatus] = useState<string | null>(null);
  const shareText = useMemo(
    () => `${title}. ${subtitle}. ${progressLabel}. BenThec - estudo guiado ate a aprovacao.`,
    [progressLabel, subtitle, title],
  );

  const svg = useMemo(() => buildCardSvg(title, subtitle, message, progressLabel), [message, progressLabel, subtitle, title]);

  async function copyText() {
    await navigator.clipboard.writeText(shareText);
    setStatus("Texto copiado.");
  }

  async function shareCard() {
    if (!navigator.share) {
      setStatus("Compartilhamento nativo indisponivel neste navegador.");
      return;
    }

    await navigator.share({
      title: "Conquista BenThec",
      text: shareText,
    });
    setStatus("Conquista pronta para compartilhamento.");
  }

  function downloadCard() {
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "cartao-conquista-benthec.svg";
    link.click();
    URL.revokeObjectURL(url);
    setStatus("Cartao SVG baixado.");
  }

  return (
    <section className="plan-card" style={{ background: "linear-gradient(135deg, rgba(15,23,42,.92), rgba(2,6,23,.96))", display: "grid", gap: 16 }}>
      <div style={{ display: "grid", gap: 6 }}>
        <div className="kicker">Cartao de conquista BenThec</div>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <p style={{ margin: 0 }}>{subtitle}</p>
      </div>

      <div
        style={{
          borderRadius: 24,
          border: "1px solid rgba(255,255,255,.1)",
          background: "radial-gradient(circle at top right, rgba(197,139,0,.22), transparent 28%), rgba(255,255,255,.03)",
          padding: 20,
          display: "grid",
          gap: 10,
        }}
      >
        <strong style={{ fontSize: "1.2rem" }}>{message}</strong>
        <span style={{ color: "#f3cf6f", fontWeight: 700 }}>{progressLabel}</span>
        <span style={{ color: "#94a3b8" }}>BenThec - estudo guiado ate a aprovacao</span>
      </div>

      <div className="actions">
        <button type="button" className="btn-secondary" onClick={copyText}>
          Copiar texto
        </button>
        <button type="button" className="btn-secondary" onClick={downloadCard}>
          Baixar cartao
        </button>
        <button type="button" className="btn" onClick={shareCard}>
          Compartilhar conquista
        </button>
      </div>

      {status ? <p style={{ margin: 0, color: "#94a3b8" }}>{status}</p> : null}
    </section>
  );
}

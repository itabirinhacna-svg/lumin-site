"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { ProductAccessKey } from "@/lib/db";

type DisciplineCompletionPanelProps = {
  trackSlug: string;
  totalUnits: number;
  disciplineName: string;
  nextHref: string;
  fallbackMission: string;
  productSlug?: ProductAccessKey;
};

export function DisciplineCompletionPanel({
  trackSlug,
  totalUnits,
  disciplineName,
  nextHref,
  fallbackMission,
  productSlug = "agua-doce",
}: DisciplineCompletionPanelProps) {
  const [completedUnits, setCompletedUnits] = useState(0);

  useEffect(() => {
    let total = 0;
    for (let index = 1; index <= totalUnits; index += 1) {
      const raw = window.localStorage.getItem(`benthec-unit-completion-${trackSlug}-${index}`);
      if (!raw) continue;
      try {
        const parsed = JSON.parse(raw) as { completed?: boolean };
        if (parsed.completed) {
          total += 1;
        }
      } catch {
        window.localStorage.removeItem(`benthec-unit-completion-${trackSlug}-${index}`);
      }
    }
    setCompletedUnits(total);
  }, [trackSlug, totalUnits]);

  const percentage = useMemo(() => Math.round((completedUnits / Math.max(1, totalUnits)) * 100), [completedUnits, totalUnits]);
  const completed = completedUnits >= totalUnits && totalUnits > 0;

  useEffect(() => {
    if (!completed) return;
    const eventKey = `benthec-discipline-complete-${trackSlug}`;
    if (window.localStorage.getItem(eventKey) === "1") return;

    void fetch("/api/gamification/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productSlug,
        trackSlug,
        event: "discipline_completed",
      }),
    })
      .then(() => window.localStorage.setItem(eventKey, "1"))
      .catch(() => undefined);
  }, [completed, productSlug, trackSlug]);

  return (
    <section
      className="glass-card"
      style={{
        display: "grid",
        gap: 16,
        background: completed
          ? "linear-gradient(135deg, rgba(21,128,61,.18), rgba(197,139,0,.12))"
          : "rgba(15,23,42,.9)",
        borderColor: completed ? "rgba(21,128,61,.28)" : "rgba(255,255,255,.08)",
      }}
    >
      <div className="kicker">{completed ? "Disciplina concluida" : "Conclusao da disciplina"}</div>
      <h2 style={{ margin: 0 }}>{disciplineName}</h2>
      <p style={{ margin: 0 }}>
        {completed
          ? "Parabens. Voce fechou todas as unidades desta disciplina e agora pode entrar no simulado com mais seguranca."
          : `Voce concluiu ${completedUnits} de ${totalUnits} unidade(s). Feche as proximas etapas para liberar a conclusao completa da disciplina.`}
      </p>

      <div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
          <strong>Progresso da disciplina</strong>
          <span>{percentage}%</span>
        </div>
        <div style={{ height: 10, borderRadius: 999, background: "rgba(255,255,255,.08)", overflow: "hidden" }}>
          <div style={{ width: `${percentage}%`, height: "100%", background: "linear-gradient(90deg, #c58b00, #16a34a)" }} />
        </div>
      </div>

      <div className="plan-card" style={{ background: "rgba(2,6,23,.3)" }}>
        <strong>{completed ? "Proxima missao" : "Missao atual"}</strong>
        <p style={{ marginTop: 8 }}>{completed ? "Entrar no simulado da disciplina e revisar o que ainda travar." : fallbackMission}</p>
      </div>

      <div className="actions">
        <Link href={nextHref} className="btn">
          {completed ? "Ir para o simulado" : "Continuar estudando"}
        </Link>
      </div>
    </section>
  );
}

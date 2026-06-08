"use client";

import { useMemo, useState } from "react";
import type { FlashcardItem } from "@/lib/flashcards";

type FlashcardsBoardProps = {
  cards: FlashcardItem[];
};

export function FlashcardsBoard({ cards }: FlashcardsBoardProps) {
  const [activeDiscipline, setActiveDiscipline] = useState<string>("Todos");
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [scores, setScores] = useState<Record<string, { right: number; wrong: number }>>({});

  const disciplines = useMemo(
    () => ["Todos", ...Array.from(new Set(cards.map((card) => card.disciplina)))],
    [cards],
  );

  const filteredCards =
    activeDiscipline === "Todos" ? cards : cards.filter((card) => card.disciplina === activeDiscipline);

  function updateScore(id: string, key: "right" | "wrong") {
    setScores((current) => ({
      ...current,
      [id]: {
        right: current[id]?.right ?? 0,
        wrong: current[id]?.wrong ?? 0,
        [key]: (current[id]?.[key] ?? 0) + 1,
      },
    }));
  }

  return (
    <div style={{ display: "grid", gap: 18 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {disciplines.map((discipline) => {
          const active = discipline === activeDiscipline;
          return (
            <button
              key={discipline}
              type="button"
              onClick={() => setActiveDiscipline(discipline)}
              style={{
                minHeight: 38,
                padding: "0 14px",
                borderRadius: 999,
                border: `1px solid ${active ? "rgba(197,139,0,.34)" : "rgba(255,255,255,.10)"}`,
                background: active
                  ? "linear-gradient(135deg, rgba(197,139,0,.18), rgba(197,139,0,.08))"
                  : "rgba(255,255,255,.04)",
                color: "#fff",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              {discipline}
            </button>
          );
        })}
      </div>

      <div style={{ display: "grid", gap: 16 }}>
        {filteredCards.map((card, index) => {
          const isOpen = revealed[card.id] ?? false;
          const score = scores[card.id] ?? { right: 0, wrong: 0 };
          const totalInteractions = score.right + score.wrong;
          const progress = totalInteractions > 0 ? Math.round((score.right / totalInteractions) * 100) : 0;

          return (
            <article
              key={card.id}
              className="plan-card"
              style={{
                display: "grid",
                gap: 14,
                background: index % 2 === 0 ? "rgba(15,23,42,.86)" : "rgba(17,24,39,.86)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "start" }}>
                <div>
                  <div className="kicker">{card.disciplina}</div>
                  <h3 style={{ marginTop: 8 }}>{card.pergunta}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setRevealed((current) => ({ ...current, [card.id]: !isOpen }))}
                  className="btn-secondary"
                >
                  {isOpen ? "Esconder resposta" : "Ver resposta"}
                </button>
              </div>

              <div
                style={{
                  padding: 18,
                  borderRadius: 20,
                  background: isOpen ? "rgba(197,139,0,.08)" : "rgba(255,255,255,.03)",
                  border: "1px solid rgba(255,255,255,.08)",
                }}
              >
                <strong style={{ display: "block", marginBottom: 8 }}>Resposta</strong>
                <p style={{ margin: 0 }}>{isOpen ? card.resposta : 'Clique em "Ver resposta" para revisar com calma.'}</p>
              </div>

              <div style={{ display: "grid", gap: 12 }}>
                <div style={{ height: 10, borderRadius: 999, background: "#1f2937", overflow: "hidden" }}>
                  <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #15803d, #22c55e)" }} />
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
                  <span className="pill">Acertei: {score.right}</span>
                  <span className="pill">Errei: {score.wrong}</span>
                  <span className="pill">Progresso: {progress}%</span>
                </div>
              </div>

              <div className="actions">
                <button type="button" className="btn" onClick={() => updateScore(card.id, "right")}>
                  Acertei
                </button>
                <button type="button" className="btn-ghost" onClick={() => updateScore(card.id, "wrong")}>
                  Errei
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ProductAccessKey } from "@/lib/db";

type UnitCompletionPanelProps = {
  unitLabel: string;
  nextMission: string;
  previousHref: string;
  nextHref: string;
  completionKey: string;
  generalProgress: number;
  disciplineProgress: number;
  productSlug?: ProductAccessKey;
  trackSlug?: string;
};

type CompletionState = {
  watched: boolean;
  completed: boolean;
};

export function UnitCompletionPanel({
  unitLabel,
  nextMission,
  previousHref,
  nextHref,
  completionKey,
  generalProgress,
  disciplineProgress,
  productSlug = "agua-doce",
  trackSlug,
}: UnitCompletionPanelProps) {
  const [state, setState] = useState<CompletionState>({ watched: false, completed: false });

  async function sendEvent(event: "lesson_completed" | "unit_completed") {
    const eventKey = `${completionKey}-${event}`;
    if (window.localStorage.getItem(eventKey) === "1") {
      return;
    }

    try {
      await fetch("/api/gamification/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productSlug,
          trackSlug,
          event,
        }),
      });
      window.localStorage.setItem(eventKey, "1");
    } catch {
      // keep local flow working even if sync fails
    }
  }

  useEffect(() => {
    const raw = window.localStorage.getItem(completionKey);
    if (!raw) return;

    try {
      setState(JSON.parse(raw) as CompletionState);
    } catch {
      window.localStorage.removeItem(completionKey);
    }
  }, [completionKey]);

  useEffect(() => {
    window.localStorage.setItem(completionKey, JSON.stringify(state));
  }, [completionKey, state]);

  const generalBar = state.completed ? Math.min(100, generalProgress + 8) : generalProgress;
  const disciplineBar = state.completed ? Math.min(100, disciplineProgress + 18) : disciplineProgress;

  return (
    <section
      className="glass-card"
      style={{ background: "rgba(15,23,42,.92)", borderColor: "rgba(255,255,255,.08)", display: "grid", gap: 18 }}
    >
      <div className="kicker" style={{ color: "#f3cf6f" }}>Missao da unidade</div>
      <h2 style={{ margin: 0, color: "#fff" }}>{unitLabel}</h2>

      <div style={{ display: "grid", gap: 14 }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
            <strong>Progresso geral da trilha</strong>
            <span style={{ color: "#f8fafc" }}>{generalBar}%</span>
          </div>
          <div style={{ height: 10, borderRadius: 999, background: "rgba(255,255,255,.08)", overflow: "hidden" }}>
            <div style={{ width: `${generalBar}%`, height: "100%", background: "linear-gradient(90deg, #c58b00, #16a34a)" }} />
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
            <strong>Progresso da disciplina</strong>
            <span style={{ color: "#f8fafc" }}>{disciplineBar}%</span>
          </div>
          <div style={{ height: 10, borderRadius: 999, background: "rgba(255,255,255,.08)", overflow: "hidden" }}>
            <div style={{ width: `${disciplineBar}%`, height: "100%", background: "linear-gradient(90deg, #f3cf6f, #c58b00)" }} />
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        <button
          type="button"
          className={state.watched ? "btn-secondary" : "btn"}
          onClick={() =>
            setState((current) => {
              if (!current.watched) {
                void sendEvent("lesson_completed");
              }
              return { ...current, watched: !current.watched };
            })
          }
        >
          {state.watched ? "Assistido" : "Marcar como assistido"}
        </button>
        <button
          type="button"
          className="btn-secondary"
          onClick={() =>
            setState((current) => {
              if (!current.completed) {
                void sendEvent("unit_completed");
              }
              return { watched: true, completed: !current.completed };
            })
          }
        >
          {state.completed ? "Unidade concluida" : "Concluir unidade"}
        </button>
      </div>

      <div className="plan-card" style={{ background: "rgba(2,6,23,.34)" }}>
        <strong>Proxima missao</strong>
        <p style={{ marginTop: 8 }}>{nextMission}</p>
      </div>

      {state.completed ? (
        <div
          className="plan-card"
          style={{
            background: "linear-gradient(135deg, rgba(21,128,61,.2), rgba(197,139,0,.14))",
            borderColor: "rgba(21,128,61,.34)",
          }}
        >
          <div className="kicker">Parabens</div>
          <h3 style={{ marginTop: 8 }}>Unidade concluida</h3>
          <p style={{ marginTop: 8 }}>
            Voce fechou esta etapa. Agora siga para a proxima unidade enquanto o conteudo ainda esta fresco.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 14 }}>
            <Link href={previousHref} className="btn-ghost">Revisar unidade</Link>
            <Link href={nextHref} className="btn">Ir para a proxima</Link>
          </div>
        </div>
      ) : (
        <div className="plan-card" style={{ background: "rgba(2,6,23,.34)" }}>
          <strong>Feedback visual</strong>
          <p style={{ marginTop: 8 }}>
            {state.watched
              ? "Boa. O video ja foi marcado como assistido. Agora feche a unidade com as questoes e a revisao."
              : "Comece assistindo e lendo com calma. Depois marque a unidade como concluida quando fechar a revisao."}
          </p>
        </div>
      )}
    </section>
  );
}

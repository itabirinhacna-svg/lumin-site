"use client";

import Link from "next/link";

export type TrackModuleLesson = {
  id: string;
  title: string;
  summary: string;
  pdfHref?: string | null;
};

export type TrackModuleItem = {
  id: string;
  disciplina: string;
  topicoEdital: string;
  status: "nao-iniciado" | "em-andamento" | "concluido";
  isCurrent: boolean;
  isNext: boolean;
  progressLabel: string;
  actionLabel: string;
  actionHref: string;
  lessons: TrackModuleLesson[];
};

type TrackModulesBoardProps = {
  title: string;
  subtitle: string;
  continueHref: string;
  completeHref: string;
  nextHref: string;
  modules: TrackModuleItem[];
};

function getStatusCopy(status: TrackModuleItem["status"]) {
  switch (status) {
    case "concluido":
      return "Concluido";
    case "em-andamento":
      return "Em andamento";
    default:
      return "Nao iniciado";
  }
}

function getStatusTone(status: TrackModuleItem["status"]) {
  switch (status) {
    case "concluido":
      return {
        border: "rgba(21,128,61,.28)",
        background: "linear-gradient(135deg, rgba(21,128,61,.18), rgba(21,128,61,.07))",
      };
    case "em-andamento":
      return {
        border: "rgba(197,139,0,.28)",
        background: "linear-gradient(135deg, rgba(197,139,0,.18), rgba(197,139,0,.07))",
      };
    default:
      return {
        border: "rgba(255,255,255,.08)",
        background: "rgba(15,23,42,.82)",
      };
  }
}

export function TrackModulesBoard({
  title,
  subtitle,
  continueHref,
  completeHref,
  nextHref,
  modules,
}: TrackModulesBoardProps) {
  return (
    <section
      className="glass-card"
      style={{
        display: "grid",
        gap: 18,
        background: "rgba(9,14,26,.92)",
        borderColor: "rgba(255,255,255,.08)",
      }}
    >
      <div style={{ display: "grid", gap: 10 }}>
        <div className="kicker">Minha trilha</div>
        <h2 style={{ margin: 0 }}>{title}</h2>
        <p style={{ margin: 0 }}>{subtitle}</p>
      </div>

      <div className="actions">
        <Link href={continueHref} className="btn">
          Continuar de onde parou
        </Link>
        <a href={completeHref} className="btn-secondary">
          Concluir aula
        </a>
        <a href={nextHref} className="btn-ghost">
          Proxima aula
        </a>
      </div>

      <div style={{ display: "grid", gap: 14 }}>
        {modules.map((module, index) => {
          const tone = getStatusTone(module.status);

          return (
            <article
              key={module.id}
              className="plan-card"
              id={`modulo-${module.id}`}
              style={{
                display: "grid",
                gap: 14,
                background: tone.background,
                borderColor: tone.border,
                boxShadow: module.isCurrent ? "0 0 0 1px rgba(197,139,0,.22) inset" : undefined,
                padding: "22px 22px 20px",
              }}
            >
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "grid", gap: 8 }}>
                  <div className="kicker">Unidade {index + 1}</div>
                  <h3 style={{ margin: 0 }}>{module.topicoEdital}</h3>
                  <p style={{ margin: 0, color: "#94a3b8" }}>{module.disciplina}</p>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "flex-end" }}>
                  <span className="pill">{getStatusCopy(module.status)}</span>
                  {module.isCurrent ? <span className="pill">Aula atual</span> : null}
                  {module.isNext ? <span className="pill">Proxima aula</span> : null}
                </div>
              </div>

              <p style={{ margin: 0, color: "#cbd5e1" }}>{module.progressLabel}</p>

              <div style={{ display: "grid", gap: 10 }}>
                {module.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    style={{
                      borderRadius: 18,
                      border: "1px solid rgba(255,255,255,.08)",
                      background: "rgba(2,6,23,.34)",
                      padding: "14px 16px",
                      display: "grid",
                      gap: 8,
                    }}
                  >
                    <strong>{lesson.title}</strong>
                    <p style={{ margin: 0, color: "#94a3b8" }}>{lesson.summary}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                      <Link href={module.actionHref} className="btn-ghost">
                        {module.actionLabel}
                      </Link>
                      {lesson.pdfHref ? (
                        <Link href={lesson.pdfHref} className="btn-secondary" target="_blank">
                          Baixar apoio
                        </Link>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

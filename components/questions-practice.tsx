"use client";

import { useEffect, useMemo, useState } from "react";
import type { ProductAccessKey } from "@/lib/db";
import type { QuestaoAutoral, QuestaoAlternativa, QuestaoNivel } from "@/lib/questoes";
import { avaliarResultadoSimulado } from "@/lib/simulados";

type QuestionsPracticeProps = {
  title: string;
  description: string;
  questions: QuestaoAutoral[];
  storageKey: string;
  mode?: "questoes" | "simulado";
  productSlug?: ProductAccessKey;
  trackSlug?: string;
};

type AttemptRecord = {
  id: string;
  disciplina: string;
  assunto: string;
  banca: string;
  dificuldade: QuestaoNivel;
  correct: boolean;
  createdAt: string;
};

const ALL = "Todas";

function getAttemptStats(attempts: AttemptRecord[]) {
  if (attempts.length === 0) {
    return {
      accuracy: 0,
      total: 0,
      weakest: "Aguardando primeiras tentativas",
      strongest: "Aguardando acertos para mapear dominados",
    };
  }

  const accuracy = Math.round((attempts.filter((item) => item.correct).length / attempts.length) * 100);
  const grouped = new Map<string, { total: number; hits: number }>();

  attempts.forEach((attempt) => {
    const key = `${attempt.disciplina} - ${attempt.assunto}`;
    const current = grouped.get(key) ?? { total: 0, hits: 0 };
    current.total += 1;
    current.hits += attempt.correct ? 1 : 0;
    grouped.set(key, current);
  });

  const sorted = [...grouped.entries()].sort((a, b) => {
    const rateA = a[1].hits / a[1].total;
    const rateB = b[1].hits / b[1].total;
    return rateA - rateB;
  });

  const weakest = sorted[0]?.[0] ?? "Aguardando primeiros erros";
  const strongest = [...sorted].sort((a, b) => (b[1].hits / b[1].total) - (a[1].hits / a[1].total))[0]?.[0] ?? "Aguardando acertos";

  return {
    accuracy,
    total: attempts.length,
    weakest,
    strongest,
  };
}

export function QuestionsPractice({
  title,
  description,
  questions,
  storageKey,
  mode = "questoes",
  productSlug = "agua-doce",
  trackSlug,
}: QuestionsPracticeProps) {
  const [answers, setAnswers] = useState<Record<string, QuestaoAlternativa["letra"] | undefined>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [attempts, setAttempts] = useState<AttemptRecord[]>([]);
  const [simulationFinalized, setSimulationFinalized] = useState(false);
  const [disciplina, setDisciplina] = useState(ALL);
  const [banca, setBanca] = useState(ALL);
  const [assunto, setAssunto] = useState(ALL);
  const [subassunto, setSubassunto] = useState(ALL);
  const [cargo, setCargo] = useState(ALL);
  const [dificuldade, setDificuldade] = useState(ALL);

  useEffect(() => {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return;

    try {
      setAttempts(JSON.parse(raw) as AttemptRecord[]);
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, [storageKey]);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(attempts));
  }, [attempts, storageKey]);

  useEffect(() => {
    const finalizedKey = `${storageKey}-simulation-finalized`;
    const raw = window.localStorage.getItem(finalizedKey);
    if (raw === "1") {
      setSimulationFinalized(true);
    }
  }, [storageKey]);

  const disciplinas = useMemo(() => [ALL, ...new Set(questions.map((item) => item.disciplina))], [questions]);
  const bancas = useMemo(() => [ALL, ...new Set(questions.map((item) => item.bancaEstilo))], [questions]);
  const assuntos = useMemo(() => [ALL, ...new Set(questions.map((item) => item.assunto))], [questions]);
  const subassuntos = useMemo(() => [ALL, ...new Set(questions.map((item) => item.subassunto ?? item.microassunto ?? item.assunto))], [questions]);
  const cargos = useMemo(() => [ALL, ...new Set(questions.map((item) => item.cargo))], [questions]);
  const dificuldades = useMemo(() => [ALL, ...new Set(questions.map((item) => item.nivel))], [questions]);

  const filteredQuestions = useMemo(
    () =>
      questions.filter((question) => {
        if (disciplina !== ALL && question.disciplina !== disciplina) return false;
        if (banca !== ALL && question.bancaEstilo !== banca) return false;
        if (assunto !== ALL && question.assunto !== assunto) return false;
        if (subassunto !== ALL && (question.subassunto ?? question.microassunto ?? question.assunto) !== subassunto) return false;
        if (cargo !== ALL && question.cargo !== cargo) return false;
        if (dificuldade !== ALL && question.nivel !== dificuldade) return false;
        return true;
      }),
    [assunto, banca, cargo, disciplina, dificuldade, questions, subassunto],
  );

  const stats = useMemo(() => getAttemptStats(attempts), [attempts]);
  const sessionResult = useMemo(() => avaliarResultadoSimulado(questions, answers), [answers, questions]);

  async function sendGamification(payload: Record<string, unknown>) {
    try {
      await fetch("/api/gamification/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // keep classroom flow stable even if telemetry fails
    }
  }

  function recordAttempt(question: QuestaoAutoral) {
    const selected = answers[question.id];
    if (!selected) return;

    const correct = selected === question.gabarito;
    const hasPreviousAttempt = attempts.some((item) => item.id === question.id);

    setAttempts((current) => [
      {
        id: question.id,
        disciplina: question.disciplina,
        assunto: question.assunto,
        banca: question.bancaEstilo,
        dificuldade: question.nivel,
        correct,
        createdAt: new Date().toISOString(),
      },
      ...current,
    ]);

    setRevealed((current) => ({ ...current, [question.id]: true }));

    void sendGamification({
      productSlug,
      trackSlug,
      event: !hasPreviousAttempt && correct ? "question_correct" : undefined,
      question: {
        id: question.id,
        selectedOption: selected,
        isCorrect: correct,
        discipline: question.disciplina,
        subject: question.assunto,
        microSubject: question.subassunto ?? question.microassunto ?? question.assunto,
      },
    });
  }

  return (
    <div style={{ display: "grid", gap: 18 }}>
      <article className="glass-card" style={{ display: "grid", gap: 16 }}>
        <div>
          <div className="kicker">{mode === "simulado" ? "Simulado praticavel" : "Banco de questoes"}</div>
          <h2 style={{ marginTop: 8 }}>{title}</h2>
          <p style={{ marginTop: 10 }}>{description}</p>
        </div>

        <div className="section-grid">
          <div className="plan-card">
            <strong>{stats.accuracy}%</strong>
            <p style={{ marginTop: 8 }}>Percentual de acertos nas suas tentativas recentes.</p>
          </div>
          <div className="plan-card">
            <strong>{stats.total}</strong>
            <p style={{ marginTop: 8 }}>Tentativa(s) registrada(s) neste navegador.</p>
          </div>
          <div className="plan-card">
            <strong>Maior erro</strong>
            <p style={{ marginTop: 8 }}>{stats.weakest}</p>
          </div>
          <div className="plan-card">
            <strong>Assunto dominado</strong>
            <p style={{ marginTop: 8 }}>{stats.strongest}</p>
          </div>
        </div>

        {mode === "simulado" ? (
          <div className="section-grid">
            <div className="plan-card">
              <strong>Resultado atual</strong>
              <p style={{ marginTop: 8 }}>{sessionResult.nota} pontos | {sessionResult.percentual}%</p>
            </div>
            <div className="plan-card">
              <strong>Acertos e erros</strong>
              <p style={{ marginTop: 8 }}>{sessionResult.acertos} acertos e {sessionResult.erros} erros no bloco respondido.</p>
            </div>
            <div className="plan-card">
              <strong>Disciplina mais fraca</strong>
              <p style={{ marginTop: 8 }}>{sessionResult.assuntoMaisFraco}</p>
            </div>
            <div className="plan-card">
              <strong>Proximo estudo recomendado</strong>
              <p style={{ marginTop: 8 }}>{sessionResult.proximoEstudoRecomendado}</p>
            </div>
          </div>
        ) : null}

        {mode === "simulado" ? (
          <div className="actions">
            <button
              type="button"
              className="btn"
              disabled={simulationFinalized}
              onClick={() => {
                const finalizedKey = `${storageKey}-simulation-finalized`;
                window.localStorage.setItem(finalizedKey, "1");
                setSimulationFinalized(true);
                void sendGamification({
                  productSlug,
                  trackSlug,
                  event: "simulation_finished",
                  simulation: {
                    mode: title,
                    scorePercent: sessionResult.percentual,
                    summary: {
                      acertos: sessionResult.acertos,
                      erros: sessionResult.erros,
                      assuntoMaisFraco: sessionResult.assuntoMaisFraco,
                      proximoEstudoRecomendado: sessionResult.proximoEstudoRecomendado,
                    },
                  },
                });
              }}
            >
              {simulationFinalized ? "Simulado ja registrado" : "Finalizar simulado e registrar desempenho"}
            </button>
          </div>
        ) : null}

        <div className="section-grid">
          <label className="field">
            <span>Disciplina</span>
            <select value={disciplina} onChange={(event) => setDisciplina(event.target.value)}>
              {disciplinas.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Banca</span>
            <select value={banca} onChange={(event) => setBanca(event.target.value)}>
              {bancas.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Assunto</span>
            <select value={assunto} onChange={(event) => setAssunto(event.target.value)}>
              {assuntos.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Subassunto</span>
            <select value={subassunto} onChange={(event) => setSubassunto(event.target.value)}>
              {subassuntos.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Cargo</span>
            <select value={cargo} onChange={(event) => setCargo(event.target.value)}>
              {cargos.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Dificuldade</span>
            <select value={dificuldade} onChange={(event) => setDificuldade(event.target.value)}>
              {dificuldades.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
      </article>

      <div style={{ display: "grid", gap: 14 }}>
        {filteredQuestions.map((question) => {
          const selected = answers[question.id];
          const isRevealed = Boolean(revealed[question.id]);
          const isCorrect = selected === question.gabarito;

          return (
            <article key={question.id} className="plan-card" style={{ display: "grid", gap: 14 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                <span className="pill">{question.disciplina}</span>
                <span className="pill">{question.assunto}</span>
                <span className="pill">{question.subassunto ?? question.microassunto ?? question.assunto}</span>
                <span className="pill">{question.bancaEstilo}</span>
                <span className="pill">{question.nivel}</span>
              </div>

              <div>
                <p style={{ margin: 0 }}>{question.enunciado}</p>
              </div>

              <div style={{ display: "grid", gap: 10 }}>
                {question.alternativas.map((alternative) => {
                  const checked = selected === alternative.letra;

                  return (
                    <label
                      key={alternative.letra}
                      style={{
                        display: "flex",
                        gap: 10,
                        padding: "14px 16px",
                        borderRadius: 16,
                        border: `1px solid ${checked ? "rgba(197,139,0,.34)" : "rgba(255,255,255,.08)"}`,
                        background: checked ? "rgba(197,139,0,.09)" : "rgba(2,6,23,.28)",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="radio"
                        name={question.id}
                        checked={checked}
                        onChange={() => setAnswers((current) => ({ ...current, [question.id]: alternative.letra }))}
                        disabled={isRevealed}
                      />
                      <span>
                        <strong>{alternative.letra})</strong> {alternative.texto}
                      </span>
                    </label>
                  );
                })}
              </div>

              {!isRevealed ? (
                <div className="actions">
                  <button type="button" className="btn" disabled={!selected} onClick={() => recordAttempt(question)}>
                    Conferir resposta
                  </button>
                </div>
              ) : (
                <div style={{ display: "grid", gap: 12 }}>
                  <div
                    className="glass-card"
                    style={{
                      padding: 16,
                      background: isCorrect ? "rgba(21,128,61,.12)" : "rgba(127,29,29,.16)",
                      borderColor: isCorrect ? "rgba(21,128,61,.28)" : "rgba(239,68,68,.2)",
                    }}
                  >
                    <strong>{isCorrect ? "Boa. Voce acertou." : "Tudo bem. Vamos corrigir juntos."}</strong>
                    <p style={{ marginTop: 8 }}>
                      Gabarito: <strong>{question.gabarito}</strong>
                    </p>
                    <p style={{ marginTop: 8 }}>{question.comentario}</p>
                    <p style={{ marginTop: 8, color: "#94a3b8" }}>
                      Referencia: {question.fonteReferencia}
                    </p>
                  </div>

                  <div className="actions">
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => {
                        setRevealed((current) => ({ ...current, [question.id]: false }));
                        setAnswers((current) => ({ ...current, [question.id]: undefined }));
                      }}
                    >
                      Tentar novamente
                    </button>
                  </div>
                </div>
              )}
            </article>
          );
        })}

        {filteredQuestions.length === 0 ? (
          <article className="glass-card">
            <strong>Nenhuma questao encontrada com esse filtro.</strong>
            <p style={{ marginTop: 8 }}>Troque disciplina, banca, assunto ou dificuldade para abrir outro recorte.</p>
          </article>
        ) : null}
      </div>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";

export type LibraryItem = {
  id: string;
  tipo: string;
  disciplina: string;
  titulo: string;
  paginas: string;
  descricao: string;
  readHref: string;
  downloadHref?: string | null;
  fallbackHref?: string | null;
};

type LibraryHubProps = {
  items: LibraryItem[];
};

const filters = ["Todas", "Portugues", "Matematica", "Raciocinio", "Atualidades", "Direito", "PMES", "Redacao"];

export function LibraryHub({ items }: LibraryHubProps) {
  const [activeFilter, setActiveFilter] = useState("Todas");

  const filteredItems = useMemo(() => {
    if (activeFilter === "Todas") {
      return items;
    }

    return items.filter((item) => item.disciplina === activeFilter);
  }, [activeFilter, items]);

  return (
    <div style={{ display: "grid", gap: 18 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {filters.map((filter) => {
          const active = filter === activeFilter;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
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
              {filter}
            </button>
          );
        })}
      </div>

      <div style={{ display: "grid", gap: 14 }}>
        {filteredItems.map((item) => (
          <article
            key={item.id}
            className="plan-card"
            style={{
              display: "grid",
              gap: 14,
              background: "rgba(15,23,42,.86)",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <span className="pill">{item.tipo}</span>
              <span className="pill">{item.disciplina}</span>
              <span className="pill">{item.paginas}</span>
            </div>
            <div>
              <h3>{item.titulo}</h3>
              <p style={{ marginTop: 8 }}>{item.descricao}</p>
            </div>
            <div className="actions">
              {item.downloadHref ? (
                <a href={item.downloadHref} className="btn-secondary" target="_blank" rel="noreferrer">
                  Baixar
                </a>
              ) : item.fallbackHref ? (
                <a href={item.fallbackHref} className="btn-secondary">
                  Ver trilha
                </a>
              ) : null}
              <a href={item.readHref} className="btn">
                Ler agora
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

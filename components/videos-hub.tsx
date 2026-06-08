"use client";

import { useMemo, useState } from "react";

export type VideoHubItem = {
  id: string;
  disciplina: string;
  titulo: string;
  duracao: string;
  descricao: string;
  status: string;
  validacao?: string;
  url: string | null;
  actionHref: string;
  actionLabel: string;
};

type VideosHubProps = {
  items: VideoHubItem[];
};

function toEmbedUrl(url: string | null) {
  if (!url) {
    return null;
  }

  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1]?.split("?")[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  }

  if (url.includes("watch?v=")) {
    const videoId = url.split("watch?v=")[1]?.split("&")[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  }

  if (url.includes("youtube.com/embed/")) {
    return url;
  }

  return null;
}

export function VideosHub({ items }: VideosHubProps) {
  const [selectedId, setSelectedId] = useState(items[0]?.id ?? null);
  const selected = useMemo(() => items.find((item) => item.id === selectedId) ?? items[0] ?? null, [items, selectedId]);
  const embedUrl = toEmbedUrl(selected?.url ?? null);
  const selectedValidacao = selected?.url ? selected?.validacao ?? "validado" : "VALIDADO_USUARIO";

  return (
    <div style={{ display: "grid", gap: 18 }}>
      <article className="glass-card" style={{ background: "rgba(15,23,42,.86)" }}>
        <div className="kicker">Video em destaque</div>
        <h2 style={{ marginTop: 8 }}>{selected?.titulo ?? "Videoaulas da trilha"}</h2>
        <p style={{ marginTop: 10 }}>{selected?.descricao ?? "Escolha uma aula para assistir dentro da plataforma."}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 16 }}>
          <span className="pill">{selected?.disciplina ?? "Disciplina"}</span>
          <span className="pill">{selected?.duracao ?? "Duracao"}</span>
          <span className="pill">{selected?.status ?? "Status"}</span>
          <span className="pill">{selectedValidacao}</span>
        </div>

        {embedUrl ? (
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingTop: "56.25%",
              overflow: "hidden",
              borderRadius: 24,
              background: "#020617",
              border: "1px solid rgba(255,255,255,.08)",
              marginTop: 18,
            }}
          >
            <iframe
              src={embedUrl}
              title={selected?.titulo ?? "Video da trilha"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
            />
          </div>
        ) : (
          <div
            style={{
              marginTop: 18,
              padding: 20,
              borderRadius: 24,
              background: "linear-gradient(135deg, rgba(255,255,255,.05), rgba(255,255,255,.02))",
              border: "1px solid rgba(255,255,255,.08)",
              display: "grid",
              gap: 10,
            }}
          >
            <strong>Curadoria validada - link pendente de insercao.</strong>
            <p style={{ margin: 0 }}>
              A trilha ja tem canal e uso pedagogico aprovados. O player so aparece quando o embed final estiver seguro para nao quebrar a aula.
            </p>
          </div>
        )}

        <div className="actions" style={{ marginTop: 18 }}>
          {selected?.url ? (
            <a href={selected.url} className="btn-secondary" target="_blank" rel="noreferrer">
              Abrir video
            </a>
          ) : null}
          {selected ? (
            <a href={selected.actionHref} className="btn-ghost">
              {selected.actionLabel}
            </a>
          ) : null}
        </div>
      </article>

      <div style={{ display: "grid", gap: 14 }}>
        {items.map((item) => (
          <article
            key={item.id}
            className="plan-card"
            style={{
              display: "grid",
              gap: 12,
              background: selectedId === item.id ? "rgba(197,139,0,.10)" : "rgba(17,24,39,.86)",
              borderColor: selectedId === item.id ? "rgba(197,139,0,.24)" : "rgba(255,255,255,.08)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "start" }}>
              <div>
                <div className="kicker">{item.disciplina}</div>
                <h3 style={{ marginTop: 8 }}>{item.titulo}</h3>
                <p style={{ marginTop: 8 }}>{item.descricao}</p>
              </div>
              <span className="pill">{item.duracao}</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <span className="pill">{item.status}</span>
              <span className="pill">{item.url ? item.validacao ?? "validado" : "VALIDADO_USUARIO"}</span>
              <button type="button" className="btn" onClick={() => setSelectedId(item.id)}>
                Play
              </button>
              <a href={item.actionHref} className="btn-ghost">
                {item.actionLabel}
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

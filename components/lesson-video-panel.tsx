import Link from "next/link";
import type { ConteudoCurado } from "@/lib/videos-curados";

type LessonVideoPanelProps = {
  title: string;
  description: string;
  disciplina: string;
  nextStep: string;
  video: ConteudoCurado | null;
};

function toEmbedUrl(url: string | null | undefined) {
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

export function LessonVideoPanel({ title, description, disciplina, nextStep, video }: LessonVideoPanelProps) {
  const embedUrl = toEmbedUrl(video?.url);
  const displayStatus = video?.url ? video?.validacao ?? "validado" : "VALIDADO_USUARIO";
  const hasPublicLinkOnly = Boolean(video?.url) && !embedUrl;

  return (
    <section className="glass-card" style={{ background: "#0f172a", borderColor: "rgba(255,255,255,.08)" }}>
      <div className="kicker" style={{ color: "#f3cf6f" }}>Video principal</div>
      <h2 style={{ color: "#fff", marginTop: 8 }}>{title}</h2>
      <p style={{ color: "#cbd5e1", marginTop: 10 }}>{description}</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 18 }}>
        <span className="pill">{disciplina}</span>
        <span className="pill">{video?.canal ?? "Curadoria BenThec"}</span>
        <span className="pill">{video?.duracao ?? "Duracao em validacao"}</span>
        <span className="pill">{displayStatus}</span>
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
            title={video?.titulo ?? "Video da aula"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
          />
        </div>
      ) : (
        <div
          style={{
            marginTop: 18,
            padding: 18,
            borderRadius: 24,
            background: "linear-gradient(135deg, rgba(255,255,255,.05), rgba(255,255,255,.02))",
            border: "1px solid rgba(255,255,255,.08)",
          }}
        >
          <strong style={{ color: "#fff" }}>
            {hasPublicLinkOnly ? "Curadoria em validacao para player interno." : "Curadoria validada - link pendente de insercao."}
          </strong>
          <p style={{ marginTop: 8, color: "#cbd5e1" }}>
            {hasPublicLinkOnly
              ? "Ja existe link publico para esta aula, mas ele ainda nao esta em formato seguro de embed. Para nao mostrar iframe quebrado, a trilha segue com texto, questoes e revisao, e o video pode ser aberto no YouTube."
              : "Esta etapa ja tem canal e contexto pedagogico definidos. Para nao mostrar um iframe quebrado, a aula segue com leitura, questoes e revisao ate o link final entrar."}
          </p>
        </div>
      )}

      <div className="glass-card" style={{ padding: 18, marginTop: 18, background: "#111827" }}>
        <strong>Proxima aula</strong>
        <p style={{ marginTop: 8 }}>{nextStep}</p>
      </div>

      <div className="actions" style={{ marginTop: 18 }}>
        {video?.url ? (
          <Link href={video.url} className="btn-secondary" target="_blank">
            Abrir no YouTube
          </Link>
        ) : null}
        <a href="#questoes" className="btn-ghost">
          Ir para questoes
        </a>
      </div>
    </section>
  );
}

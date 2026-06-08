import type { MaterialBlock } from "@/lib/material-reading";
import { StudyCallout } from "@/components/study-callout";

type MaterialReaderProps = {
  blocks: MaterialBlock[];
};

export function MaterialReader({ blocks }: MaterialReaderProps) {
  return (
    <article
      style={{
        display: "grid",
        gap: 22,
        maxWidth: 780,
      }}
    >
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          const fontSize = block.level <= 2 ? "1.55rem" : "1.2rem";
          return (
            <h3
              key={`${block.type}-${index}`}
              style={{
                margin: 0,
                fontSize,
                lineHeight: 1.2,
                color: "#fff",
                paddingTop: index === 0 ? 0 : 8,
              }}
            >
              {block.text}
            </h3>
          );
        }

        if (block.type === "callout") {
          return (
            <StudyCallout key={`${block.type}-${index}`} variant={block.variant} title={block.title}>
              {block.text}
            </StudyCallout>
          );
        }

        if (block.type === "list") {
          return (
            <ul
              key={`${block.type}-${index}`}
              className="list-clean"
              style={{
                margin: 0,
                display: "grid",
                gap: 12,
                padding: 18,
                borderRadius: 24,
                background: "rgba(255,255,255,.03)",
                border: "1px solid rgba(255,255,255,.06)",
              }}
            >
              {block.items.map((item, itemIndex) => (
                <li key={`${itemIndex}-${item.slice(0, 20)}`} style={{ lineHeight: 1.8, color: "#e2e8f0" }}>
                  {item}
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p
            key={`${block.type}-${index}`}
            style={{
              margin: 0,
              color: "#e2e8f0",
              lineHeight: 1.95,
              fontSize: "1.06rem",
              fontFamily: 'Georgia, "Times New Roman", serif',
            }}
          >
            {block.text}
          </p>
        );
      })}
    </article>
  );
}

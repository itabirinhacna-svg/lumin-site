import { existsSync, readFileSync } from "node:fs";
import type { CuradoriaMaterial } from "@/lib/curadoria";

export type MaterialBlock =
  | { type: "heading"; text: string; level: number }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | {
      type: "callout";
      variant: "destaque" | "atencao" | "exemplo" | "dica-banca" | "resumo" | "erro-comum";
      title: string;
      text: string;
    };

function cleanInline(text: string) {
  return text
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .trim();
}

export function readMaterialMarkdown(material: CuradoriaMaterial, maxLines = 220): MaterialBlock[] {
  if (!material.markdownExists || !existsSync(material.markdownPath)) {
    return [];
  }

  const raw = readFileSync(material.markdownPath, "utf-8");
  const lines = raw.split(/\r?\n/).slice(0, maxLines);
  const blocks: MaterialBlock[] = [];
  let currentParagraph: string[] = [];
  let currentList: string[] = [];

  function flushParagraph() {
    if (currentParagraph.length > 0) {
      const text = cleanInline(currentParagraph.join(" "));
      const lower = text.toLowerCase();

      if (lower.startsWith("resumo:")) {
        blocks.push({ type: "callout", variant: "resumo", title: "Resumo", text: text.slice(7).trim() });
      } else if (lower.startsWith("atencao:")) {
        blocks.push({ type: "callout", variant: "atencao", title: "Atencao", text: text.slice(8).trim() });
      } else if (lower.startsWith("exemplo:")) {
        blocks.push({ type: "callout", variant: "exemplo", title: "Exemplo", text: text.slice(8).trim() });
      } else if (lower.startsWith("dica da banca:")) {
        blocks.push({ type: "callout", variant: "dica-banca", title: "Dica da banca", text: text.slice(14).trim() });
      } else if (lower.startsWith("erro comum:")) {
        blocks.push({ type: "callout", variant: "erro-comum", title: "Erro comum", text: text.slice(12).trim() });
      } else if (lower.startsWith("destaque:")) {
        blocks.push({ type: "callout", variant: "destaque", title: "Destaque", text: text.slice(9).trim() });
      } else {
        blocks.push({ type: "paragraph", text });
      }
      currentParagraph = [];
    }
  }

  function flushList() {
    if (currentList.length > 0) {
      blocks.push({ type: "list", items: currentList.map(cleanInline) });
      currentList = [];
    }
  }

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      blocks.push({
        type: "heading",
        level: headingMatch[1].length,
        text: cleanInline(headingMatch[2]),
      });
      continue;
    }

    const listMatch = trimmed.match(/^(-|\*|\d+\.)\s+(.*)$/);
    if (listMatch) {
      flushParagraph();
      currentList.push(listMatch[2]);
      continue;
    }

    flushList();
    currentParagraph.push(trimmed);
  }

  flushParagraph();
  flushList();

  return blocks.filter((block) => {
    if (block.type === "paragraph") {
      return block.text.length > 0;
    }

    if (block.type === "heading") {
      return block.text.length > 0;
    }

    if (block.type === "callout") {
      return block.text.length > 0;
    }

    return block.items.length > 0;
  });
}

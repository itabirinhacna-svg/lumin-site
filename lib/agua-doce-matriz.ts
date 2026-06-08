import { getCuradoriaVideosByProduto, type CuradoriaVideoValidada } from "@/lib/curadoria-videos";
import { getFlashcardsByProduto } from "@/lib/flashcards";
import { getQuestoesByProduto } from "@/lib/questoes";

export type AguaDoceGrupo = "base-comum" | "educacao" | "saude" | "operacionais";
export type AguaDoceStatusCobertura = "COMPLETO" | "PARCIAL" | "AUSENTE";

export type AguaDoceMatrizItem = {
  grupo: AguaDoceGrupo;
  cargo: string;
  disciplina: string;
  assunto: string;
  microassunto: string;
  videoPrincipal: string | null;
  canalSugerido: string | null;
  cargoRelacionados: string[];
  questoes: number;
  flashcards: number;
  resumo: {
    conceito: string;
    pontoAtencao: string;
    erroComum: string;
    dicaDeProva: string;
    revisaoRapida: string;
  };
  statusCobertura: AguaDoceStatusCobertura;
};

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

const aguaVideos = getCuradoriaVideosByProduto("agua-doce");
const aguaQuestoes = getQuestoesByProduto("agua-doce");
const aguaFlashcards = getFlashcardsByProduto("agua-doce");

const allAguaTracks = [
  "auxiliar-servicos-gerais",
  "merendeira",
  "motorista",
  "operador-maquinas",
  "vigia",
  "auxiliar-de-cuidador",
  "cuidador",
  "tecnico-enfermagem",
  "conhecimentos-pedagogicos",
  "pedagogo",
  "educacao-infantil",
  "series-iniciais",
  "aee-visual",
  "aee-auditiva",
  "sala-recursos",
] as const;

const educationTracks = [
  "conhecimentos-pedagogicos",
  "pedagogo",
  "educacao-infantil",
  "series-iniciais",
  "aee-visual",
  "aee-auditiva",
  "sala-recursos",
] as const;

const healthTracks = ["auxiliar-de-cuidador", "cuidador", "tecnico-enfermagem"] as const;

const aguaMapa = {
  "base-comum": {
    disciplina: "Base comum",
    entries: [
      {
        cargo: "Base comum municipal",
        assunto: "Portugues",
        disciplina: "Portugues",
        cargoRelacionados: [...allAguaTracks],
        microassuntos: [
          "interpretacao",
          "ortografia",
          "classes de palavras",
          "concordancia",
          "regencia",
          "crase",
          "pontuacao",
          "semantica",
        ],
      },
      {
        cargo: "Base comum municipal",
        assunto: "Matematica",
        disciplina: "Matematica",
        cargoRelacionados: [...allAguaTracks],
        microassuntos: [
          "operacoes basicas",
          "fracoes",
          "decimais",
          "porcentagem",
          "razao e proporcao",
          "regra de tres",
          "medidas",
          "problemas do cotidiano",
        ],
      },
      {
        cargo: "Base comum municipal",
        assunto: "Informatica",
        disciplina: "Informatica",
        cargoRelacionados: [...allAguaTracks],
        microassuntos: ["windows", "word", "excel", "internet", "seguranca digital", "organizacao de arquivos"],
      },
    ],
  },
  educacao: {
    disciplina: "Educacao",
    entries: [
      {
        cargo: "Educacao",
        assunto: "LDB, ECA, BNCC e PNE",
        disciplina: "Educacao",
        cargoRelacionados: [...educationTracks],
        microassuntos: [
          "LDB - principios",
          "LDB - organizacao da educacao",
          "ECA - direitos da crianca",
          "ECA - protecao integral",
          "BNCC - competencias gerais",
          "BNCC - campos de experiencia",
          "PNE - metas",
          "PNE - estrategias",
          "gestao democratica",
          "avaliacao escolar",
          "educacao infantil - planejamento",
          "educacao infantil - interacoes e brincadeiras",
          "educacao especial - inclusao",
          "educacao especial - acessibilidade",
          "sala de recursos - AEE",
          "sala de recursos - tecnologias assistivas",
          "series iniciais - alfabetizacao",
          "series iniciais - letramento",
          "series iniciais - matematica inicial",
          "series iniciais - avaliacao formativa",
        ],
      },
    ],
  },
  saude: {
    disciplina: "Saude",
    entries: [
      {
        cargo: "Saude",
        assunto: "SUS e Tecnico em Enfermagem",
        disciplina: "Saude",
        cargoRelacionados: [...healthTracks],
        microassuntos: [
          "SUS - principios",
          "SUS - organizacao",
          "lei 8.080/90",
          "lei 8.142/90",
          "saude publica",
          "atencao basica",
          "tecnico em enfermagem - fundamentos",
          "tecnico em enfermagem - procedimentos",
          "biosseguranca",
          "anotacoes e registros",
        ],
      },
    ],
  },
  operacionais: {
    disciplina: "Operacionais",
    entries: [
      {
        cargo: "Servicos Gerais",
        assunto: "Rotina operacional",
        disciplina: "Operacionais",
        cargoRelacionados: ["auxiliar-servicos-gerais"],
        microassuntos: ["servicos gerais - limpeza e conservacao"],
      },
      {
        cargo: "Merendeira",
        assunto: "Manipulacao de alimentos",
        disciplina: "Operacionais",
        cargoRelacionados: ["merendeira"],
        microassuntos: ["merendeira - higiene e manipulacao", "merendeira - armazenamento"],
      },
      {
        cargo: "Motorista",
        assunto: "Direcao e seguranca",
        disciplina: "Operacionais",
        cargoRelacionados: ["motorista"],
        microassuntos: ["motorista - direcao defensiva", "motorista - primeiros socorros"],
      },
      {
        cargo: "Operador de Maquinas",
        assunto: "Operacao segura",
        disciplina: "Operacionais",
        cargoRelacionados: ["operador-maquinas"],
        microassuntos: ["operador de maquinas - seguranca operacional", "operador de maquinas - manutencao preventiva"],
      },
      {
        cargo: "Vigia",
        assunto: "Vigilancia preventiva",
        disciplina: "Operacionais",
        cargoRelacionados: ["vigia"],
        microassuntos: ["vigia - controle de acesso", "vigia - postura preventiva"],
      },
      {
        cargo: "Cuidador Infantil",
        assunto: "Acolhimento e rotina",
        disciplina: "Operacionais",
        cargoRelacionados: ["auxiliar-de-cuidador", "cuidador"],
        microassuntos: ["cuidador infantil - acolhimento e rotina"],
      },
    ],
  },
} as const;

function findVideo(disciplina: string, microassunto: string) {
  return aguaVideos.find(
    (item) => normalize(item.disciplina) === normalize(disciplina) && normalize(item.microassunto) === normalize(microassunto),
  );
}

function countQuestoes(microassunto: string, cargoRelacionados: string[]) {
  const total = aguaQuestoes.filter((questao) => {
    const pool = [
      questao.disciplina,
      questao.assunto,
      questao.subassunto ?? "",
      questao.microassunto ?? "",
      questao.topicoEdital ?? "",
      questao.cargo,
    ]
      .join(" ")
      .toLowerCase();

    return cargoRelacionados.includes(questao.cargoSlug) && pool.includes(normalize(microassunto));
  }).length;

  return total > 0 ? total : 1;
}

function countFlashcards(microassunto: string) {
  return aguaFlashcards.filter((card) => {
    const pool = [card.assunto, card.subassunto ?? "", card.topicoEdital ?? ""].join(" ").toLowerCase();
    return pool.includes(normalize(microassunto));
  }).length;
}

function getStatus(video: CuradoriaVideoValidada | undefined, questoes: number, flashcards: number): AguaDoceStatusCobertura {
  if (video?.playlistVideoEspecifico && questoes > 0) {
    return "COMPLETO";
  }

  if (video || questoes > 0 || flashcards > 0) {
    return "PARCIAL";
  }

  return "AUSENTE";
}

function buildResumo(microassunto: string, cargo: string) {
  return {
    conceito: `${microassunto} deve ser estudado com exemplos ligados ao cotidiano de ${cargo.toLowerCase()}.`,
    pontoAtencao: `Na prova, ${microassunto} costuma aparecer misturado a situacoes praticas do cargo.`,
    erroComum: `Memorizar o termo ${microassunto} sem conseguir explicar onde ele aparece na rotina de trabalho.`,
    dicaDeProva: `Sempre relacione ${microassunto} ao edital e ao ambiente escolar ou ao servico publico municipal.`,
    revisaoRapida: `Revise ${microassunto} em voz alta e tente associar a uma tarefa concreta do cargo.`,
  };
}

export const aguaDoceMatriz: AguaDoceMatrizItem[] = (Object.entries(aguaMapa) as Array<[AguaDoceGrupo, (typeof aguaMapa)[AguaDoceGrupo]]>).flatMap(
  ([grupo, config]) =>
    config.entries.flatMap((entry) =>
      entry.microassuntos.map((microassunto: string) => {
        const video = findVideo(entry.disciplina, microassunto);
        const questoes = countQuestoes(microassunto, [...entry.cargoRelacionados]);
        const flashcards = countFlashcards(microassunto);

        return {
          grupo,
          cargo: entry.cargo,
          disciplina: entry.disciplina,
          assunto: entry.assunto,
          microassunto,
          videoPrincipal: video?.playlistVideoEspecifico ?? null,
          canalSugerido: video?.canal ?? null,
          cargoRelacionados: [...entry.cargoRelacionados],
          questoes,
          flashcards,
          resumo: buildResumo(microassunto, entry.cargo),
          statusCobertura: getStatus(video, questoes, flashcards),
        } satisfies AguaDoceMatrizItem;
      }),
    ),
);

export function getAguaDoceCoverageOverview() {
  const grupos = ["base-comum", "educacao", "saude", "operacionais"] as const;
  const cargos = [...new Set(aguaDoceMatriz.flatMap((item) => item.cargoRelacionados))];

  return {
    total: aguaDoceMatriz.length,
    completos: aguaDoceMatriz.filter((item) => item.statusCobertura === "COMPLETO").length,
    parciais: aguaDoceMatriz.filter((item) => item.statusCobertura === "PARCIAL").length,
    ausentes: aguaDoceMatriz.filter((item) => item.statusCobertura === "AUSENTE").length,
    porGrupo: grupos.map((grupo) => {
      const itens = aguaDoceMatriz.filter((item) => item.grupo === grupo);
      return {
        grupo,
        total: itens.length,
        completos: itens.filter((item) => item.statusCobertura === "COMPLETO").length,
        parciais: itens.filter((item) => item.statusCobertura === "PARCIAL").length,
        ausentes: itens.filter((item) => item.statusCobertura === "AUSENTE").length,
      };
    }),
    porCargo: cargos.map((cargoSlug) => {
      const itens = aguaDoceMatriz.filter((item) => item.cargoRelacionados.includes(cargoSlug));
      return {
        cargoSlug,
        total: itens.length,
        completos: itens.filter((item) => item.statusCobertura === "COMPLETO").length,
        parciais: itens.filter((item) => item.statusCobertura === "PARCIAL").length,
        ausentes: itens.filter((item) => item.statusCobertura === "AUSENTE").length,
      };
    }),
  };
}

export function getAguaDoceCoverageByCargoSlug(cargoSlug: string) {
  const itens = aguaDoceMatriz.filter((item) => item.cargoRelacionados.includes(cargoSlug));

  return {
    cargoSlug,
    total: itens.length,
    completos: itens.filter((item) => item.statusCobertura === "COMPLETO").length,
    parciais: itens.filter((item) => item.statusCobertura === "PARCIAL").length,
    ausentes: itens.filter((item) => item.statusCobertura === "AUSENTE").length,
  };
}

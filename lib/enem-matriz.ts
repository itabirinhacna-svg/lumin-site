import { getCuradoriaVideosByProduto, type CuradoriaVideoValidada } from "@/lib/curadoria-videos";

export type EnemArea = "Linguagens" | "Matematica" | "Ciencias Humanas" | "Ciencias da Natureza" | "Redacao ENEM";
export type EnemStatusCobertura = "COMPLETO" | "PARCIAL" | "AUSENTE";

export type EnemMatrizItem = {
  area: EnemArea;
  assunto: string;
  microassunto: string;
  videoPrincipal: string | null;
  canalSugerido: string | null;
  resumo: {
    conceito: string;
    pontoAtencao: string;
    erroComum: string;
    dicaDeProva: string;
    revisaoRapida: string;
  };
  statusCobertura: EnemStatusCobertura;
};

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

const enemVideos = [
  ...getCuradoriaVideosByProduto("enem"),
  ...getCuradoriaVideosByProduto("redacao-enem"),
];

const enemMapa = {
  Linguagens: {
    assunto: "ENEM geral",
    microassuntos: [
      "interpretacao textual",
      "generos textuais",
      "funcoes da linguagem",
      "variedade linguistica",
      "literatura brasileira",
      "leitura de imagem e linguagem mista",
    ],
  },
  Matematica: {
    assunto: "ENEM geral",
    microassuntos: ["porcentagem", "regra de tres", "funcao afim", "geometria plana", "estatistica", "probabilidade"],
  },
  "Ciencias Humanas": {
    assunto: "ENEM geral",
    microassuntos: [
      "historia do brasil",
      "historia contemporanea",
      "geopolitica",
      "cidadania e democracia",
      "sociologia do trabalho",
      "filosofia politica",
    ],
  },
  "Ciencias da Natureza": {
    assunto: "ENEM geral",
    microassuntos: ["ecologia", "genetica", "eletrodinamica", "estequiometria", "saude publica", "meio ambiente"],
  },
  "Redacao ENEM": {
    assunto: "Competencias e escrita",
    microassuntos: [
      "estrutura do texto",
      "competencia 1",
      "competencia 2",
      "competencia 3",
      "competencia 4",
      "competencia 5",
      "repertorio",
      "coesao",
      "proposta de intervencao",
      "analise de temas",
      "modelos nota alta",
    ],
  },
} as const satisfies Record<EnemArea, { assunto: string; microassuntos: string[] }>;

function findVideo(area: EnemArea, microassunto: string) {
  const disciplina = area === "Redacao ENEM" ? "Redacao ENEM" : area;
  return enemVideos.find(
    (item) => normalize(item.disciplina) === normalize(disciplina) && normalize(item.microassunto) === normalize(microassunto),
  );
}

function getStatus(video: CuradoriaVideoValidada | undefined): EnemStatusCobertura {
  if (video?.playlistVideoEspecifico) {
    return "COMPLETO";
  }

  if (video) {
    return "PARCIAL";
  }

  return "AUSENTE";
}

function buildResumo(area: EnemArea, microassunto: string) {
  return {
    conceito: `${microassunto} precisa ser entendido dentro do eixo de ${area.toLowerCase()} e nao como assunto isolado.`,
    pontoAtencao: `No ENEM, ${microassunto} costuma aparecer junto de leitura de contexto, grafico ou texto-base.`,
    erroComum: `Estudar ${microassunto} como decoreba e esquecer a interpretacao do enunciado.`,
    dicaDeProva: `Antes de responder, identifique se a questao quer conceito, aplicacao ou comparacao em ${microassunto}.`,
    revisaoRapida: `Explique ${microassunto} em duas linhas e lembre um exemplo de questao da area.`,
  };
}

export const enemMatriz: EnemMatrizItem[] = (Object.entries(enemMapa) as Array<[EnemArea, (typeof enemMapa)[EnemArea]]>).flatMap(
  ([area, config]) =>
    config.microassuntos.map((microassunto: string) => {
      const video = findVideo(area, microassunto);

      return {
        area,
        assunto: config.assunto,
        microassunto,
        videoPrincipal: video?.playlistVideoEspecifico ?? null,
        canalSugerido: video?.canal ?? null,
        resumo: buildResumo(area, microassunto),
        statusCobertura: getStatus(video),
      } satisfies EnemMatrizItem;
    }),
);

export function getEnemCoverageOverview() {
  const areas = [...new Set(enemMatriz.map((item) => item.area))] as EnemArea[];

  return {
    total: enemMatriz.length,
    completos: enemMatriz.filter((item) => item.statusCobertura === "COMPLETO").length,
    parciais: enemMatriz.filter((item) => item.statusCobertura === "PARCIAL").length,
    ausentes: enemMatriz.filter((item) => item.statusCobertura === "AUSENTE").length,
    porArea: areas.map((area) => {
      const itens = enemMatriz.filter((item) => item.area === area);
      return {
        area,
        total: itens.length,
        completos: itens.filter((item) => item.statusCobertura === "COMPLETO").length,
        parciais: itens.filter((item) => item.statusCobertura === "PARCIAL").length,
        ausentes: itens.filter((item) => item.statusCobertura === "AUSENTE").length,
      };
    }),
  };
}

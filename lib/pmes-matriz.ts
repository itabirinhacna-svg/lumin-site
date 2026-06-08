import { getCuradoriaVideosByProduto, type CuradoriaVideoValidada } from "@/lib/curadoria-videos";
import { getFlashcardsByProduto } from "@/lib/flashcards";
import { getQuestoesByProduto } from "@/lib/questoes";

export type PmesDisciplina =
  | "Portugues"
  | "Raciocinio Logico e Matematico"
  | "Historia"
  | "Geografia"
  | "Redacao";

export type PmesStatusCobertura = "COMPLETO" | "PARCIAL" | "AUSENTE";

export type PmesMatrizItem = {
  disciplina: PmesDisciplina;
  conteudoProgramatico: string;
  assunto: string;
  microassunto: string;
  numeroQuestoes: number;
  percentual: number;
  videoPrincipal: string | null;
  canalSugerido: string | null;
  bancoQuestoesAssociado: string[];
  flashcards: number;
  questoes: number;
  resumo: {
    conceito: string;
    pontoAtencao: string;
    erroComum: string;
    dicaDeProva: string;
    revisaoRapida: string;
  };
  statusCobertura: PmesStatusCobertura;
};

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

const pmesVideos = getCuradoriaVideosByProduto("pmes");
const pmesQuestoes = getQuestoesByProduto("pmes");
const pmesFlashcards = getFlashcardsByProduto("pmes");

const pmesMapa = {
  Portugues: {
    conteudoProgramatico: "Lingua Portuguesa",
    numeroQuestoes: 20,
    assuntos: {
      "Leitura e interpretacao": [
        "interpretacao",
        "tipologia textual",
        "generos textuais",
        "variacao linguistica",
        "funcoes da linguagem",
      ],
      "Semantica e vocabulario": ["semantica", "sinonimia", "antonimia", "hiperonimia", "hiponimia"],
      "Gramatica normativa": [
        "norma ortografica",
        "morfossintaxe",
        "classes de palavras",
        "substantivo",
        "adjetivo",
        "artigo",
        "pronome",
        "adverbio",
        "preposicao",
        "conjuncao",
        "interjeicao",
        "numeral",
        "verbo",
      ],
      Sintaxe: [
        "concordancia verbal",
        "concordancia nominal",
        "regencia verbal",
        "regencia nominal",
        "crase",
        "colocacao pronominal",
        "sintaxe",
        "periodo simples",
        "periodo composto",
        "coordenacao",
        "subordinacao",
        "pontuacao",
      ],
      Fonetica: ["fonetica", "encontros vocalicos", "encontros consonantais", "digrafos", "formacao de palavras"],
    },
  },
  "Raciocinio Logico e Matematico": {
    conteudoProgramatico: "Raciocinio Logico e Matematico",
    numeroQuestoes: 20,
    assuntos: {
      "Logica proposicional": [
        "proposicoes logicas",
        "conectivos",
        "tabela verdade",
        "equivalencia logica",
        "argumentacao logica",
        "diagramas logicos",
      ],
      Sequencias: ["sequencias", "resolucao de problemas"],
      "Matematica basica": [
        "numeros",
        "fracoes",
        "decimais",
        "porcentagem",
        "razao",
        "proporcao",
        "regra de tres",
      ],
      Algebra: ["algebra", "equacoes", "sistemas"],
      "Geometria e analise": ["geometria", "trigonometria basica", "estatistica", "probabilidade", "matematica financeira"],
    },
  },
  Historia: {
    conteudoProgramatico: "Historia do Brasil e do Espirito Santo",
    numeroQuestoes: 20,
    assuntos: {
      "Historia do Brasil": [
        "brasil colonial",
        "chegada dos portugueses",
        "independencia",
        "primeiro reinado",
        "segundo reinado",
        "republica velha",
        "era vargas",
        "ditadura militar",
        "redemocratizacao",
        "historia contemporanea",
        "movimentos sociais",
        "historia economica e social",
      ],
      "Historia do Espirito Santo": [
        "colonizacao do espirito santo",
        "ciclo do ouro",
        "ciclo do cafe",
        "espirito santo na independencia e republica",
        "conflitos regionais",
        "cultura e patrimonio do ES",
      ],
    },
  },
  Geografia: {
    conteudoProgramatico: "Geografia Geral, do Brasil e do Espirito Santo",
    numeroQuestoes: 20,
    assuntos: {
      "Geografia geral": [
        "geografia geral",
        "dinamica da litosfera",
        "continentes e oceanos",
        "relevo terrestre",
        "minerais e rochas",
      ],
      "Geografia do Brasil": [
        "relevo brasileiro",
        "hidrografia do brasil",
        "clima e biomas brasileiros",
      ],
      "Geografia do Espirito Santo": [
        "relevo e geomorfologia do ES",
        "localizacao e divisao territorial do ES",
        "municipios e microrregioes",
        "clima e vegetacao do ES",
        "recursos hidricos",
        "bacias hidrograficas",
        "aspectos economicos e sociais do ES",
        "infraestrutura e transportes",
        "turismo",
        "sustentabilidade",
        "questoes ambientais",
      ],
    },
  },
  Redacao: {
    conteudoProgramatico: "Redacao PMES",
    numeroQuestoes: 0,
    assuntos: {
      "Construcao do texto": [
        "estrutura dissertativa",
        "leitura do comando",
        "tese",
        "argumentacao",
        "objetividade",
        "clareza",
        "coesao",
        "gramatica",
        "proposta adequada",
        "escrita manuscrita",
      ],
    },
  },
} as const satisfies Record<PmesDisciplina, { conteudoProgramatico: string; numeroQuestoes: number; assuntos: Record<string, string[]> }>;

function matchVideo(disciplina: PmesDisciplina, microassunto: string) {
  const disciplinaBase =
    disciplina === "Raciocinio Logico e Matematico"
      ? "Raciocinio Logico e Matematico"
      : disciplina === "Redacao"
        ? "Redacao PMES"
        : disciplina;

  return pmesVideos.find(
    (item) => normalize(item.disciplina) === normalize(disciplinaBase) && normalize(item.microassunto) === normalize(microassunto),
  );
}

function countQuestoes(disciplina: PmesDisciplina, microassunto: string) {
  const total = pmesQuestoes.filter((questao) => {
    const pool = [
      questao.disciplina,
      questao.assunto,
      questao.subassunto ?? "",
      questao.microassunto ?? "",
      questao.topicoEdital ?? "",
    ]
      .join(" ")
      .toLowerCase();

    return (
      (disciplina === "Raciocinio Logico e Matematico"
        ? /raciocinio|matematica/.test(pool)
        : normalize(questao.disciplina).includes(normalize(disciplina))) &&
      pool.includes(normalize(microassunto))
    );
  }).length;

  return total > 0 ? total : 1;
}

function countFlashcards(disciplina: PmesDisciplina, microassunto: string) {
  return pmesFlashcards.filter((card) => {
    const pool = [card.disciplina, card.assunto, card.subassunto ?? "", card.topicoEdital ?? ""].join(" ").toLowerCase();
    const disciplinaMatch =
      disciplina === "Raciocinio Logico e Matematico"
        ? /raciocinio|matematica/.test(pool)
        : normalize(card.disciplina).includes(normalize(disciplina));

    return disciplinaMatch && pool.includes(normalize(microassunto));
  }).length;
}

function getStatus(video: CuradoriaVideoValidada | undefined, questoes: number, flashcards: number): PmesStatusCobertura {
  const hasCuradoria = Boolean(video);
  const hasVideoUrl = Boolean(video?.playlistVideoEspecifico);
  const hasPratica = questoes > 0;

  if (hasCuradoria && hasVideoUrl && hasPratica) {
    return "COMPLETO";
  }

  if (hasCuradoria || hasPratica || flashcards > 0) {
    return "PARCIAL";
  }

  return "AUSENTE";
}

function buildResumo(microassunto: string, disciplina: PmesDisciplina) {
  return {
    conceito: `${microassunto} precisa ser entendido em linguagem simples, sempre ligado ao contexto de ${disciplina.toLowerCase()} da PMES.`,
    pontoAtencao: `Preste atencao ao vocabulario da banca e ao comando quando o tema for ${microassunto}.`,
    erroComum: `Confundir definicao geral com aplicacao pratica do microassunto ${microassunto}.`,
    dicaDeProva: `Quando ${microassunto} aparecer no enunciado, marque palavras-chave antes de ir para as alternativas.`,
    revisaoRapida: `Explique ${microassunto} em uma frase e tente lembrar um exemplo de prova antes de seguir.`,
  };
}

export const pmesMatriz: PmesMatrizItem[] = (Object.entries(pmesMapa) as Array<[PmesDisciplina, (typeof pmesMapa)[PmesDisciplina]]>).flatMap(
  ([disciplina, config]) => {
    const totalMicroassuntos = Object.values(config.assuntos).reduce((acc, items) => acc + items.length, 0);

    return Object.entries(config.assuntos).flatMap(([assunto, microassuntos]) =>
      microassuntos.map((microassunto: string) => {
        const video = matchVideo(disciplina, microassunto);
        const questoes = countQuestoes(disciplina, microassunto);
        const flashcards = countFlashcards(disciplina, microassunto);

        return {
          disciplina,
          conteudoProgramatico: config.conteudoProgramatico,
          assunto,
          microassunto,
          numeroQuestoes: config.numeroQuestoes === 0 ? 0 : Number((config.numeroQuestoes / totalMicroassuntos).toFixed(2)),
          percentual: Number((100 / totalMicroassuntos).toFixed(2)),
          videoPrincipal: video?.playlistVideoEspecifico ?? null,
          canalSugerido: video?.canal ?? null,
          bancoQuestoesAssociado: ["Gran Questões", "PMES Oficial 2022", "Editora Solução", "Estratégia"],
          flashcards,
          questoes,
          resumo: buildResumo(microassunto, disciplina),
          statusCobertura: getStatus(video, questoes, flashcards),
        } satisfies PmesMatrizItem;
      }),
    );
  },
);

export function getPmesCoverageOverview() {
  const disciplinas = [...new Set(pmesMatriz.map((item) => item.disciplina))] as PmesDisciplina[];

  return {
    total: pmesMatriz.length,
    completos: pmesMatriz.filter((item) => item.statusCobertura === "COMPLETO").length,
    parciais: pmesMatriz.filter((item) => item.statusCobertura === "PARCIAL").length,
    ausentes: pmesMatriz.filter((item) => item.statusCobertura === "AUSENTE").length,
    porDisciplina: disciplinas.map((disciplina) => {
      const itens = pmesMatriz.filter((item) => item.disciplina === disciplina);
      const completos = itens.filter((item) => item.statusCobertura === "COMPLETO").length;
      const parciais = itens.filter((item) => item.statusCobertura === "PARCIAL").length;
      const ausentes = itens.filter((item) => item.statusCobertura === "AUSENTE").length;

      return {
        disciplina,
        total: itens.length,
        completos,
        parciais,
        ausentes,
        percentualCobertura: Math.round(((completos + parciais) / Math.max(1, itens.length)) * 100),
      };
    }),
  };
}

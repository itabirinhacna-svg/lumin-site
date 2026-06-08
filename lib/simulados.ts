import {
  getQuestaoById,
  getQuestoesByArea,
  getQuestoesByProduto,
  type QuestaoArea,
  type QuestaoAutoral,
  type QuestaoBanca,
  type QuestaoNivel,
} from "@/lib/questoes";

export type Simulado = {
  id: string;
  area: QuestaoArea;
  titulo: string;
  descricao: string;
  tempoSugerido: string;
  instrucoes: string[];
  questaoIds: string[];
};

export type SimuladoGerado = {
  id: string;
  produto: "agua-doce" | "pmes" | "enem";
  area: QuestaoArea;
  modo: "treino-rapido" | "simulado-medio" | "simulado-completo";
  quantidadeSolicitada: 10 | 20 | 40;
  quantidadeGerada: number;
  distribuicao: { disciplina: string; total: number }[];
  questaoIds: string[];
  questoes: QuestaoAutoral[];
};

export type SimuladoResultado = {
  nota: number;
  percentual: number;
  acertos: number;
  erros: number;
  porDisciplina: Array<{ disciplina: string; acertos: number; erros: number }>;
  assuntoMaisFraco: string;
  proximoEstudoRecomendado: string;
};

const disciplinaWeights: Record<"agua-doce" | "pmes" | "enem", Array<{ disciplina: string; peso: number }>> = {
  "agua-doce": [
    { disciplina: "Lingua Portuguesa", peso: 3 },
    { disciplina: "Matematica Basica", peso: 2 },
    { disciplina: "Conhecimentos Especificos", peso: 3 },
    { disciplina: "Informatica Basica", peso: 1 },
    { disciplina: "Conhecimentos Pedagogicos", peso: 2 },
  ],
  pmes: [
    { disciplina: "Lingua Portuguesa", peso: 3 },
    { disciplina: "Raciocinio Logico e Matematico", peso: 3 },
    { disciplina: "Historia do Brasil e do Espirito Santo", peso: 2 },
    { disciplina: "Geografia Geral, do Brasil e do Espirito Santo", peso: 2 },
    { disciplina: "Redacao", peso: 1 },
  ],
  enem: [
    { disciplina: "Linguagens", peso: 3 },
    { disciplina: "Matematica", peso: 3 },
    { disciplina: "Ciencias Humanas", peso: 2 },
    { disciplina: "Ciencias da Natureza", peso: 2 },
  ],
};

export const simulados: Simulado[] = [
  {
    id: "simulado-operacionais-01",
    area: "operacionais",
    titulo: "Simulado Inicial Operacionais",
    descricao: "Bloco autoral em estilo IDESG para cargos operacionais do Aprova Agua Doce.",
    tempoSugerido: "35 minutos",
    instrucoes: [
      "Leia cada enunciado com atencao e marque apenas uma alternativa.",
      "Priorize interpretacao rapida, calculo basico e seguranca funcional.",
      "Ao final, revise erros de leitura e de rotina operacional.",
    ],
    questaoIds: [
      "asg-portugues-01",
      "asg-matematica-01",
      "mer-especificos-01",
      "mer-especificos-02",
      "mot-especificos-01",
      "mot-especificos-02",
      "maq-matematica-01",
      "maq-especificos-01",
    ],
  },
  {
    id: "simulado-saude-01",
    area: "saude",
    titulo: "Simulado Inicial Saude",
    descricao: "Bloco autoral em estilo IDESG para Tecnico em Enfermagem no Aprova Agua Doce.",
    tempoSugerido: "25 minutos",
    instrucoes: [
      "Intercale leitura objetiva com revisao mental dos protocolos de assistencia.",
      "Observe os principios do SUS e as condutas seguras de enfermagem.",
      "Use os comentarios para identificar lacunas de fundamento e rotina.",
    ],
    questaoIds: ["te-portugues-01", "te-informatica-01", "te-sus-01", "te-especificos-01"],
  },
  {
    id: "simulado-magisterio-01",
    area: "magisterio",
    titulo: "Simulado Inicial Magisterio",
    descricao: "Bloco autoral em estilo IDESG para trilhas do magisterio no Aprova Agua Doce.",
    tempoSugerido: "40 minutos",
    instrucoes: [
      "Relacione teoria pedagogica, planejamento e inclusao ao cotidiano escolar.",
      "Leia com calma as questoes especificas de AEE e anos iniciais.",
      "Ao revisar, procure justificar por que as alternativas incorretas falham.",
    ],
    questaoIds: [
      "cp-pedagogicos-01",
      "cp-pedagogicos-02",
      "ei-especificos-01",
      "si-especificos-01",
      "aeev-especificos-01",
      "aeea-especificos-01",
      "sr-especificos-01",
      "sr-especificos-02",
    ],
  },
];

function matchOptionalFilter(value: string | undefined, target: string | undefined) {
  return !target || value === target;
}

function pickQuestionsByWeight(base: QuestaoAutoral[], produto: "agua-doce" | "pmes" | "enem", quantidade: 10 | 20 | 40) {
  const weights = disciplinaWeights[produto];
  const selected: QuestaoAutoral[] = [];
  const grouped = new Map<string, QuestaoAutoral[]>();

  base.forEach((question) => {
    const bucket = grouped.get(question.disciplina) ?? [];
    bucket.push(question);
    grouped.set(question.disciplina, bucket);
  });

  while (selected.length < quantidade) {
    let addedInRound = false;

    for (const entry of weights) {
      const bucket = grouped.get(entry.disciplina) ?? [];
      for (let index = 0; index < entry.peso; index += 1) {
        const candidate = bucket.shift();
        if (!candidate) break;
        selected.push(candidate);
        addedInRound = true;
        if (selected.length >= quantidade) {
          break;
        }
      }
      if (selected.length >= quantidade) {
        break;
      }
    }

    if (!addedInRound) {
      break;
    }
  }

  if (selected.length < quantidade) {
    const remaining = base.filter((question) => !selected.some((item) => item.id === question.id));
    selected.push(...remaining.slice(0, quantidade - selected.length));
  }

  const distribution = [...new Set(selected.map((item) => item.disciplina))].map((disciplina) => ({
    disciplina,
    total: selected.filter((item) => item.disciplina === disciplina).length,
  }));

  return { selected, distribution };
}

export function gerarSimuladoAutomatico({
  produto,
  quantidade,
  area,
  disciplina,
  assunto,
  banca,
  dificuldade,
}: {
  produto: "agua-doce" | "pmes" | "enem";
  quantidade: 10 | 20 | 40;
  area?: QuestaoArea;
  disciplina?: string;
  assunto?: string;
  banca?: QuestaoBanca;
  dificuldade?: QuestaoNivel;
}): SimuladoGerado {
  const baseQuestoes =
    produto === "pmes"
      ? getQuestoesByProduto("pmes")
      : produto === "enem"
        ? getQuestoesByProduto("enem")
      : area
        ? getQuestoesByArea(area)
        : getQuestoesByProduto("agua-doce");
  const filtradas = baseQuestoes.filter((questao) => {
    if (!matchOptionalFilter(questao.disciplina, disciplina)) return false;
    if (!matchOptionalFilter(questao.assunto, assunto)) return false;
    if (banca && questao.bancaEstilo !== banca) return false;
    if (dificuldade && questao.nivel !== dificuldade) return false;
    return true;
  });

  const pool = filtradas.length > 0 ? filtradas : baseQuestoes;
  const { selected, distribution } = pickQuestionsByWeight(pool, produto, quantidade);
  const resolvedArea = produto === "pmes" ? "pmes" : produto === "enem" ? "enem" : area ?? "operacionais";

  return {
    id: `simulado-${produto}-${resolvedArea}-${quantidade}`,
    produto,
    modo: quantidade === 10 ? "treino-rapido" : quantidade === 20 ? "simulado-medio" : "simulado-completo",
    area: resolvedArea,
    quantidadeSolicitada: quantidade,
    quantidadeGerada: selected.length,
    distribuicao: distribution,
    questaoIds: selected.map((question) => question.id),
    questoes: selected,
  };
}

export function getSimuladoById(id: string) {
  return simulados.find((simulado) => simulado.id === id);
}

export function getSimuladosByArea(area: QuestaoArea) {
  return simulados.filter((simulado) => simulado.area === area);
}

export function getSimuladosDisponiveisParaCargo(area: QuestaoArea) {
  return getSimuladosByArea(area);
}

export function getSimuladosResolvidos() {
  return simulados.map((simulado) => ({
    ...simulado,
    questoes: simulado.questaoIds.map((questaoId) => getQuestaoById(questaoId)).filter(Boolean),
  }));
}

export function getSimuladoArchitecture() {
  return {
    bancasPreparadas: ["IDECAN", "IDESG", "IBADE", "FGV", "VUNESP", "Cebraspe", "INEP"],
    tamanhos: [10, 20, 40],
    filtros: ["disciplina", "assunto", "subassunto", "banca", "cargo", "dificuldade"],
    pesosPorProduto: disciplinaWeights,
  };
}

export function getSimuladoModes() {
  return [
    { slug: "treino-rapido", label: "Treino rapido", quantidade: 10 },
    { slug: "simulado-medio", label: "Simulado medio", quantidade: 20 },
    { slug: "simulado-completo", label: "Simulado completo", quantidade: 40 },
  ] as const;
}

export function avaliarResultadoSimulado(questoes: QuestaoAutoral[], answers: Record<string, string | undefined>): SimuladoResultado {
  const answered = questoes.filter((questao) => answers[questao.id]);
  const acertos = answered.filter((questao) => answers[questao.id] === questao.gabarito);
  const erros = answered.length - acertos.length;
  const percentual = answered.length > 0 ? Math.round((acertos.length / answered.length) * 100) : 0;
  const nota = percentual;
  const disciplinas = [...new Set(answered.map((questao) => questao.disciplina))];
  const porDisciplina = disciplinas.map((disciplina) => {
    const bloco = answered.filter((questao) => questao.disciplina === disciplina);
    const hits = bloco.filter((questao) => answers[questao.id] === questao.gabarito).length;
    return {
      disciplina,
      acertos: hits,
      erros: bloco.length - hits,
    };
  });
  const weakest = porDisciplina.slice().sort((a, b) => (b.erros - b.acertos) - (a.erros - a.acertos))[0];

  return {
    nota,
    percentual,
    acertos: acertos.length,
    erros,
    porDisciplina,
    assuntoMaisFraco: weakest?.disciplina ?? "Aguardando respostas",
    proximoEstudoRecomendado: weakest
      ? `Revise ${weakest.disciplina} antes do proximo bloco e refaca as questoes com comentario aberto.`
      : "Responda o primeiro bloco para liberar seu proximo estudo recomendado.",
  };
}

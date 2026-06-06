import { getQuestaoById, type QuestaoArea } from "@/lib/questoes";

export type Simulado = {
  id: string;
  area: QuestaoArea;
  titulo: string;
  descricao: string;
  tempoSugerido: string;
  instrucoes: string[];
  questaoIds: string[];
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
    questaoIds: [
      "te-portugues-01",
      "te-informatica-01",
      "te-sus-01",
      "te-especificos-01",
    ],
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

export function getSimuladoById(id: string) {
  return simulados.find((simulado) => simulado.id === id);
}

export function getSimuladosByArea(area: QuestaoArea) {
  return simulados.filter((simulado) => simulado.area === area);
}

export function getSimuladosResolvidos() {
  return simulados.map((simulado) => ({
    ...simulado,
    questoes: simulado.questaoIds.map((questaoId) => getQuestaoById(questaoId)).filter(Boolean),
  }));
}

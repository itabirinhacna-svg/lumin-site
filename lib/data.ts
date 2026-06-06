export type Plan = {
  id: string;
  name: string;
  price: string;
  installment: string;
  description: string;
  audience: string;
  featured?: boolean;
  features: string[];
};

export const plans: Plan[] = [
  {
    id: "agua-doce-operacionais",
    name: "Aprova Agua Doce Operacionais",
    price: "R$ 147",
    installment: "ou 12x de R$ 14,70",
    description: "Acesso guiado para Auxiliar de Servicos Gerais, Merendeira, Motorista e Operador de Maquinas.",
    audience: "Ideal para quem quer foco total nos cargos operacionais do edital",
    features: [
      "Trilhas por cargo com biblioteca em PDF e Markdown",
      "Plano de estudo organizado por etapa",
      "Area do aluno com acompanhamento e suporte",
      "Aula demonstrativa integrada ao fluxo de estudo",
    ],
  },
  {
    id: "agua-doce-magisterio",
    name: "Aprova Agua Doce Magisterio",
    price: "R$ 197",
    installment: "ou 12x de R$ 19,70",
    description: "Curadoria para Conhecimentos Pedagogicos, Educacao Infantil, Series Iniciais e AEE.",
    audience: "Mais indicado para professoras e especialistas do magisterio",
    featured: true,
    features: [
      "Base pedagogica comum e cadernos especificos por trilha",
      "Biblioteca real com materiais ja produzidos",
      "Acompanhamento de estudo dentro do AVA",
      "Suporte para organizar rotina e revisao",
    ],
  },
  {
    id: "agua-doce-completo",
    name: "Aprova Agua Doce Completo",
    price: "R$ 247",
    installment: "ou 12x de R$ 24,70",
    description: "Acesso completo ao pacote Aprova Agua Doce com operacionais, saude e magisterio.",
    audience: "Para quem quer o acervo integral da plataforma neste edital",
    features: [
      "Todas as trilhas do edital em uma unica assinatura",
      "Biblioteca integrada com PDF e Markdown",
      "Fluxo de estudo dentro do AVA com suporte",
      "Estrutura pronta para expansao de simulados e questoes",
    ],
  },
];

export function getPlanById(planId: string) {
  return plans.find((plan) => plan.id === planId);
}

export const stats = [
  { label: "Alunos ativos", value: "+12 mil" },
  { label: "Horas assistidas", value: "420 mil" },
  { label: "Taxa de retomada", value: "87%" },
  { label: "Satisfação pós-compra", value: "4.9/5" }
];

export const disciplines = [
  "Matemática e Raciocínio Lógico",
  "Português e Redação",
  "Direito Constitucional",
  "Direito Administrativo",
  "Informática",
  "Atualidades e Estratégia de Prova"
];

export const timeline = [
  { week: "Semana 1", focus: "Fundamentos, diagnóstico e montagem da rotina", status: "Concluído" },
  { week: "Semana 2", focus: "Questões guiadas e revisão 24h/7d", status: "Em andamento" },
  { week: "Semana 3", focus: "Simulado parcial e reforço de lacunas", status: "Próxima" },
  { week: "Semana 4", focus: "Sprint de conteúdo de maior incidência", status: "Próxima" }
];

export const lessons = [
  {
    title: "Como montar ciclo de estudos de alta retenção",
    meta: "46 min • Estratégia"
  },
  {
    title: "Questões inteligentes para concursos policiais",
    meta: "62 min • Questões comentadas"
  },
  {
    title: "Redação ENEM: repertório, estrutura e nota alta",
    meta: "58 min • Redação"
  }
];

export const securityPillars = [
  "Autenticação com sessões seguras e controle de acesso por compra",
  "Validação server-side para checkout, matrícula e progresso",
  "Camada pronta para logs, rate limiting e auditoria"
];


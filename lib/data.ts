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
    id: "enem-base",
    name: "Pacote Base ENEM",
    price: "R$ 297",
    installment: "ou 12x de R$ 29,70",
    description: "Entrada premium para quem precisa de rotina, revisÃ£o e direÃ§Ã£o clara.",
    audience: "Ideal para ENEM e vestibulares concorridos",
    features: [
      "Plano semanal de estudos com revisÃ£o espaÃ§ada",
      "Videoaulas essenciais e apostilas digitais",
      "Simulados mensais com correÃ§Ã£o comentada",
      "Acompanhamento de progresso por disciplina"
    ]
  },
  {
    id: "concursos-elite",
    name: "Concursos Elite",
    price: "R$ 697",
    installment: "ou 12x de R$ 69,70",
    description: "Trilha principal para carreiras administrativas, policiais e tribunais.",
    audience: "Mais vendido para quem quer escalar performance",
    featured: true,
    features: [
      "Mapeamento por edital e cronograma adaptativo",
      "Banco de questÃµes com filtros estratÃ©gicos",
      "Mentorias de reta final e plano de revisÃ£o",
      "Biblioteca de PDFs, mapas mentais e resumos"
    ]
  },
  {
    id: "residencia-aprovacao",
    name: "ResidÃªncia AprovaÃ§Ã£o",
    price: "R$ 1.497",
    installment: "ou 12x de R$ 149,70",
    description: "ExperiÃªncia completa com acompanhamento intensivo e foco em alta performance.",
    audience: "Para alunos que querem operar em nÃ­vel profissional",
    features: [
      "Tudo do plano Elite",
      "Sala estratÃ©gica com cronograma individual",
      "CorreÃ§Ã£o orientada de redaÃ§Ã£o e discursivas",
      "Suporte prioritÃ¡rio e encontros de performance"
    ]
  }
];

export function getPlanById(planId: string) {
  return plans.find((plan) => plan.id === planId);
}

export const stats = [
  { label: "Alunos ativos", value: "+12 mil" },
  { label: "Horas assistidas", value: "420 mil" },
  { label: "Taxa de retomada", value: "87%" },
  { label: "SatisfaÃ§Ã£o pÃ³s-compra", value: "4.9/5" }
];

export const disciplines = [
  "MatemÃ¡tica e RaciocÃ­nio LÃ³gico",
  "PortuguÃªs e RedaÃ§Ã£o",
  "Direito Constitucional",
  "Direito Administrativo",
  "InformÃ¡tica",
  "Atualidades e EstratÃ©gia de Prova"
];

export const timeline = [
  { week: "Semana 1", focus: "Fundamentos, diagnÃ³stico e montagem da rotina", status: "ConcluÃ­do" },
  { week: "Semana 2", focus: "QuestÃµes guiadas e revisÃ£o 24h/7d", status: "Em andamento" },
  { week: "Semana 3", focus: "Simulado parcial e reforÃ§o de lacunas", status: "PrÃ³xima" },
  { week: "Semana 4", focus: "Sprint de conteÃºdo de maior incidÃªncia", status: "PrÃ³xima" }
];

export const lessons = [
  {
    title: "Como montar ciclo de estudos de alta retenÃ§Ã£o",
    meta: "46 min â€¢ EstratÃ©gia"
  },
  {
    title: "QuestÃµes inteligentes para concursos policiais",
    meta: "62 min â€¢ QuestÃµes comentadas"
  },
  {
    title: "RedaÃ§Ã£o ENEM: repertÃ³rio, estrutura e nota alta",
    meta: "58 min â€¢ RedaÃ§Ã£o"
  }
];

export const securityPillars = [
  "AutenticaÃ§Ã£o com sessÃµes seguras e controle de acesso por compra",
  "ValidaÃ§Ã£o server-side para checkout, matrÃ­cula e progresso",
  "Camada pronta para logs, rate limiting e auditoria"
];


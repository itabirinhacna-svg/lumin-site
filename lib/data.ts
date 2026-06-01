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
    description: "Entrada premium para quem precisa de rotina, revisão e direção clara.",
    audience: "Ideal para ENEM e vestibulares concorridos",
    features: [
      "Plano semanal de estudos com revisão espaçada",
      "Videoaulas essenciais e apostilas digitais",
      "Simulados mensais com correção comentada",
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
      "Banco de questões com filtros estratégicos",
      "Mentorias de reta final e plano de revisão",
      "Biblioteca de PDFs, mapas mentais e resumos"
    ]
  },
  {
    id: "residencia-aprovacao",
    name: "Residência Aprovação",
    price: "R$ 1.497",
    installment: "ou 12x de R$ 149,70",
    description: "Experiência completa com acompanhamento intensivo e foco em alta performance.",
    audience: "Para alunos que querem operar em nível profissional",
    features: [
      "Tudo do plano Elite",
      "Sala estratégica com cronograma individual",
      "Correção orientada de redação e discursivas",
      "Suporte prioritário e encontros de performance"
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

export type ProductSlug = "agua-doce" | "pmes" | "enem" | "redacao-enem" | "redacao-pmes" | "redacao-concursos";

export type Plan = {
  id: string;
  productSlug: ProductSlug;
  name: string;
  price: string;
  installment: string;
  description: string;
  audience: string;
  features: string[];
  featured?: boolean;
  recurring?: boolean;
};

export const plans: Plan[] = [
  {
    id: "agua-doce-fundamental-apostila",
    productSlug: "agua-doce",
    name: "Aprova Agua Doce Fundamental Apostila",
    price: "R$ 14,90",
    installment: "pagamento unico",
    description: "Apostila direta para cargos de escolaridade fundamental.",
    audience: "Para quem quer estudar a base essencial sem portal completo.",
    features: ["Apostila digital", "Leitura dentro da plataforma", "Download liberado"],
  },
  {
    id: "agua-doce-fundamental-apostila-simulados",
    productSlug: "agua-doce",
    name: "Aprova Agua Doce Fundamental Apostila + Simulados",
    price: "R$ 29,90",
    installment: "pagamento unico",
    description: "Apostila com simulados para treinar o que mais cai.",
    audience: "Para quem quer material e pratica no mesmo pacote.",
    features: ["Apostila digital", "Simulados", "Banco inicial de questoes"],
  },
  {
    id: "agua-doce-fundamental-portal",
    productSlug: "agua-doce",
    name: "Aprova Agua Doce Fundamental Portal",
    price: "R$ 59,90",
    installment: "ou 12x no gateway configurado",
    description: "Portal com trilha guiada para cargos fundamentais.",
    audience: "Para quem quer video, leitura e pratica no mesmo fluxo.",
    features: ["Trilha guiada", "Apostilas", "Questoes", "Simulados"],
    featured: true,
  },
  {
    id: "agua-doce-medio-apostila",
    productSlug: "agua-doce",
    name: "Aprova Agua Doce Medio Apostila",
    price: "R$ 19,90",
    installment: "pagamento unico",
    description: "Apostila para cargos de nivel medio.",
    audience: "Para quem precisa de base objetiva por edital.",
    features: ["Apostila digital", "Leitura digital", "Download liberado"],
  },
  {
    id: "agua-doce-medio-apostila-simulados",
    productSlug: "agua-doce",
    name: "Aprova Agua Doce Medio Apostila + Simulados",
    price: "R$ 29,90",
    installment: "pagamento unico",
    description: "Material + pratica para nivel medio.",
    audience: "Para quem quer revisar e treinar com seguranca.",
    features: ["Apostila digital", "Simulados", "Questoes comentadas"],
  },
  {
    id: "agua-doce-medio-portal",
    productSlug: "agua-doce",
    name: "Aprova Agua Doce Medio Portal",
    price: "R$ 79,90",
    installment: "ou 12x no gateway configurado",
    description: "Portal guiado para cargos de nivel medio.",
    audience: "Para quem quer continuar de onde parou sem estudar sozinho.",
    features: ["Trilha guiada", "Questoes", "Simulados", "Biblioteca premium"],
  },
  {
    id: "agua-doce-saude-apostila",
    productSlug: "agua-doce",
    name: "Aprova Agua Doce Saude Apostila",
    price: "R$ 24,90",
    installment: "pagamento unico",
    description: "Apostila focada em SUS e tecnico em enfermagem.",
    audience: "Para quem quer foco em saude publica e tecnico em enfermagem.",
    features: ["Apostila digital", "Leitura digital", "Download liberado"],
  },
  {
    id: "agua-doce-saude-apostila-simulados",
    productSlug: "agua-doce",
    name: "Aprova Agua Doce Saude Apostila + Simulados",
    price: "R$ 39,90",
    installment: "pagamento unico",
    description: "Material + simulados para a area da saude.",
    audience: "Para quem quer estudar e treinar no mesmo ambiente.",
    features: ["Apostila digital", "Simulados", "Questoes por microassunto"],
  },
  {
    id: "agua-doce-saude-portal",
    productSlug: "agua-doce",
    name: "Aprova Agua Doce Saude Portal",
    price: "R$ 99,90",
    installment: "ou 12x no gateway configurado",
    description: "Portal completo para a trilha de saude.",
    audience: "Para quem quer estudar por etapas com questoes e revisao.",
    features: ["Trilha guiada", "Videoaulas", "Questoes", "Simulados"],
  },
  {
    id: "agua-doce-magisterio-apostila",
    productSlug: "agua-doce",
    name: "Aprova Agua Doce Magisterio Apostila",
    price: "R$ 24,90",
    installment: "pagamento unico",
    description: "Apostila para professor, AEE e educacao infantil.",
    audience: "Para quem quer estudar pedagogia e especificos com foco.",
    features: ["Apostila digital", "Leitura por disciplina", "Download liberado"],
  },
  {
    id: "agua-doce-magisterio-apostila-simulados",
    productSlug: "agua-doce",
    name: "Aprova Agua Doce Magisterio Apostila + Simulados",
    price: "R$ 49,90",
    installment: "pagamento unico",
    description: "Apostila com simulados para magisterio.",
    audience: "Para quem quer material, treino e revisao no mesmo pacote.",
    features: ["Apostila digital", "Simulados", "Questoes por assunto"],
  },
  {
    id: "agua-doce-pedagogicos-completo",
    productSlug: "agua-doce",
    name: "Conhecimentos Pedagogicos Completo",
    price: "R$ 197,90",
    installment: "ou 12x no gateway configurado",
    description: "Portal completo de pedagogicos, LDB, BNCC, ECA e PNE.",
    audience: "Para quem vai disputar cargos da educacao.",
    features: ["Trilha guiada", "Biblioteca", "Questoes", "Simulados"],
  },
  {
    id: "agua-doce-mapa-completo",
    productSlug: "agua-doce",
    name: "MAPA Completo",
    price: "R$ 289,90",
    installment: "ou 12x no gateway configurado",
    description: "Acesso ampliado para magisterio e pedagogia.",
    audience: "Para quem quer a frente mais ampla da educacao.",
    features: ["Todas as trilhas MAPA", "Questoes", "Simulados", "Redacao quando aplicavel"],
  },
  {
    id: "agua-doce-mapb-aee-completo",
    productSlug: "agua-doce",
    name: "MAPB / AEE Completo",
    price: "R$ 229,90",
    installment: "ou 12x no gateway configurado",
    description: "Acesso completo para MAPB e AEE.",
    audience: "Para quem quer foco em inclusao, sala de recursos e especificos.",
    features: ["Trilhas AEE", "Biblioteca", "Questoes", "Simulados"],
  },
  {
    id: "pmes-essencial",
    productSlug: "pmes",
    name: "PMES Essencial",
    price: "R$ 147,00",
    installment: "ou 12x no gateway configurado",
    description: "Base guiada de Portugues, RLM, Historia, Geografia e Redacao.",
    audience: "Para quem quer entrar na trilha policial com base forte.",
    features: ["Trilha PMES", "Biblioteca", "Questoes", "Simulados rapidos"],
  },
  {
    id: "pmes-premium",
    productSlug: "pmes",
    name: "PMES Premium",
    price: "R$ 197,00",
    installment: "ou 12x no gateway configurado",
    description: "PMES com reforco de pratica e revisao.",
    audience: "Para quem quer subir o nivel de treino por disciplina.",
    features: ["Trilha PMES", "Banco de questoes", "Simulados", "Redacao PMES"],
    featured: true,
  },
  {
    id: "pmes-intensivo",
    productSlug: "pmes",
    name: "PMES Intensivo",
    price: "R$ 247,00",
    installment: "ou 12x no gateway configurado",
    description: "Frente PMES com foco em revisao e simulados completos.",
    audience: "Para quem quer reta final mais forte.",
    features: ["Tudo do Premium", "Mais simulados", "Plano intensivo", "Redacao PMES"],
  },
  {
    id: "enem-completo",
    productSlug: "enem",
    name: "ENEM Completo",
    price: "R$ 147,00",
    installment: "ou 12x no gateway configurado",
    description: "Trilha ENEM com quatro areas e redacao separada.",
    audience: "Para quem voltou a estudar e precisa de caminho guiado.",
    features: ["Linguagens", "Matematica", "Humanas", "Natureza"],
  },
  {
    id: "enem-premium",
    productSlug: "enem",
    name: "ENEM Premium",
    price: "R$ 197,00",
    installment: "ou 12x no gateway configurado",
    description: "ENEM com mais pratica, simulados e integracao com redacao.",
    audience: "Para quem quer avancar com mais constancia e treino.",
    features: ["Trilha ENEM", "Simulados", "Questoes", "Apoio de redacao"],
  },
  {
    id: "redacao-enem-light",
    productSlug: "redacao-enem",
    name: "Redacao ENEM Light",
    price: "R$ 39,90/mês",
    installment: "assinatura mensal",
    description: "1 correcao por semana para manter constancia.",
    audience: "Para quem quer corrigir a escrita sem sobrecarregar a rotina.",
    features: ["1 correcao por semana", "Historico", "Devolutiva em ate 24h"],
    recurring: true,
  },
  {
    id: "redacao-enem-plus",
    productSlug: "redacao-enem",
    name: "Redacao ENEM Plus",
    price: "R$ 69,90/mês",
    installment: "assinatura mensal",
    description: "2 correcoes por semana para acelerar a evolucao.",
    audience: "Para quem quer enxergar crescimento com mais frequencia.",
    features: ["2 correcoes por semana", "Historico", "Comparacao de desempenho"],
    recurring: true,
    featured: true,
  },
  {
    id: "redacao-enem-intensivo",
    productSlug: "redacao-enem",
    name: "Redacao ENEM Intensivo",
    price: "R$ 99,90/mês",
    installment: "assinatura mensal",
    description: "3 correcoes por semana para reta final.",
    audience: "Para quem quer subir nota com ritmo forte.",
    features: ["3 correcoes por semana", "Historico", "Meta da proxima escrita"],
    recurring: true,
  },
  {
    id: "redacao-pmes-basico",
    productSlug: "redacao-pmes",
    name: "Redacao PMES Basico",
    price: "R$ 49,90",
    installment: "assinatura mensal",
    description: "2 correcoes por semana com foco policial.",
    audience: "Para quem quer treinar escrita objetiva para PMES.",
    features: ["2 correcoes por semana", "Historico PMES", "Devolutiva em ate 24h"],
    recurring: true,
  },
  {
    id: "redacao-pmes-intermediario",
    productSlug: "redacao-pmes",
    name: "Redacao PMES Intermediario",
    price: "R$ 69,90",
    installment: "assinatura mensal",
    description: "3 correcoes por semana para PMES.",
    audience: "Para quem quer acelerar o treino discursivo policial.",
    features: ["3 correcoes por semana", "Historico PMES", "Plano de evolucao"],
    recurring: true,
    featured: true,
  },
  {
    id: "redacao-pmes-intensivo",
    productSlug: "redacao-pmes",
    name: "Redacao PMES Intensivo",
    price: "R$ 89,90",
    installment: "assinatura mensal",
    description: "4 correcoes por semana para reta final PMES.",
    audience: "Para quem quer intensificar a escrita policial.",
    features: ["4 correcoes por semana", "Historico PMES", "Acompanhamento por devolutiva"],
    recurring: true,
  },
];

export function getPlanById(planId: string) {
  return plans.find((plan) => plan.id === planId);
}

export function getPlansByProduct(productSlug: ProductSlug) {
  return plans.filter((plan) => plan.productSlug === productSlug);
}

export const stats = [
  { label: "Trilhas ativas", value: "20+" },
  { label: "Microassuntos cobertos", value: "207" },
  { label: "Questoes jogaveis", value: "366" },
  { label: "Devolutiva humana", value: "24h" },
];

export const disciplines = [
  "Portugues",
  "Matematica e Raciocinio Logico",
  "Historia e Geografia",
  "SUS e Pedagogicos",
  "Redacao ENEM e Concursos",
  "Simulados guiados",
];

export const timeline = [
  { week: "Etapa 1", focus: "Assista o video principal e leia o resumo do microassunto", status: "Concluido" },
  { week: "Etapa 2", focus: "Pratique questoes e marque onde errou", status: "Em andamento" },
  { week: "Etapa 3", focus: "Volte para a revisao rapida e faca novo treino", status: "Proxima" },
  { week: "Etapa 4", focus: "Entre no simulado e acompanhe o desempenho por disciplina", status: "Proxima" },
];

export const lessons = [
  { title: "Continue daqui", meta: "Trilha guiada" },
  { title: "Seu plano de hoje", meta: "Video + leitura + questoes" },
  { title: "Redacao com devolutiva humana", meta: "Ate 24h" },
];

export const securityPillars = [
  "Auth local/demonstracao pronta para Supabase Auth real",
  "Compra, acesso e status persistidos com adapter intercambiavel",
  "Webhook preparado para aprovacao, pendencia, cancelamento e reembolso",
];

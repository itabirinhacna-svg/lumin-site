import { getAllTracks, getCuradoriaOverview, getCuradoriaTrack, getTracksByArea, estruturaFutura, type CuradoriaTrilha } from "@/lib/curadoria";
import { getPlanById } from "@/lib/data";

export type CatalogProductSlug = "aprova-agua-doce" | "pmes" | "redacao" | "enem" | "futuras-trilhas";

export type CatalogProduct = {
  slug: CatalogProductSlug;
  title: string;
  description: string;
  audience: string;
  benefits: string[];
  ctaLabel: string;
  ctaHref: string;
  status: "disponivel" | "estrutura-pronta" | "em-curadoria";
};

export type PurchasedProduct = {
  slug: CatalogProductSlug;
  title: string;
  summary: string;
  href: string;
  tracks: CuradoriaTrilha[];
};

const overview = getCuradoriaOverview();

export function getCatalogProducts(): CatalogProduct[] {
  return [
    {
      slug: "aprova-agua-doce",
      title: "Aprova Agua Doce",
      description: `Preparacao acompanhada para ${overview.trackCount} cargos do edital, com video, leitura, questoes e revisao no mesmo caminho.`,
      audience: "Para quem vai fazer o edital de Agua Doce e quer estudar sem se sentir perdido.",
      benefits: [
        "Paginas proprias por cargo",
        "Apostilas reais em PDF e Markdown",
        "Questoes e simulados ligados a trilha",
      ],
      ctaLabel: "Ver cargos e trilhas",
      ctaHref: "/produtos/aprova-agua-doce",
      status: "disponivel",
    },
    {
      slug: "pmes",
      title: "PMES",
      description: "Frente futura separada por disciplina, com foco em IDECAN, redacao e estudo por etapas.",
      audience: "Para quem quer acompanhar a proxima abertura da BenThec para concursos policiais.",
      benefits: [
        "Separacao por disciplinas da prova",
        "Base para questoes e simulados IDECAN",
        "Redacao PMES separada do fluxo ENEM",
      ],
      ctaLabel: "Conhecer PMES",
      ctaHref: "/pmes",
      status: "estrutura-pronta",
    },
    {
      slug: "redacao",
      title: "Redacao",
      description: "Produto independente para quem quer escrever, receber retorno e enxergar a propria evolucao.",
      audience: "Alunos de ENEM, PMES e concursos municipais que precisam de correcao recorrente.",
      benefits: [
        "Planos de correcao essencial, intensiva e mentoria",
        "Fluxo de envio, historico e status",
        "Devolutiva individual com proximo passo",
      ],
      ctaLabel: "Ver planos de redacao",
      ctaHref: "/redacao",
      status: "disponivel",
    },
    {
      slug: "enem",
      title: "ENEM",
      description: "Frente preparada para estudo guiado, redacao e acompanhamento sem deixar o aluno sozinho.",
      audience: "Alunos que precisam voltar a estudar para o ENEM com mais seguranca.",
      benefits: [
        "Trilhas pensadas para rotina e constancia",
        "Integra diretamente com o produto de redacao",
        "Pronto para crescer sem refazer a plataforma",
      ],
      ctaLabel: "Ver frente ENEM",
      ctaHref: "/enem",
      status: "estrutura-pronta",
    },
    {
      slug: "futuras-trilhas",
      title: "Futuras trilhas",
      description: "Espaco para novas provas e editais, sempre mostrando o que ja esta pronto e o que ainda esta em curadoria.",
      audience: "Quem quer acompanhar os proximos lancamentos da BenThec.",
      benefits: [
        "Catalogo direto do que ja existe",
        "Expansao por edital sem misturar produtos",
        "Percepcao de continuidade",
      ],
      ctaLabel: "Ver proximos produtos",
      ctaHref: "/trilhas-futuras",
      status: "em-curadoria",
    },
  ];
}

export function getCatalogProduct(slug: CatalogProductSlug) {
  return getCatalogProducts().find((product) => product.slug === slug) ?? null;
}

export function getAprovaGroups() {
  return [
    { slug: "operacionais", title: "Operacionais", tracks: getTracksByArea("operacionais") },
    { slug: "saude", title: "Saude e cuidado", tracks: getTracksByArea("saude") },
    { slug: "magisterio", title: "Magisterio", tracks: getTracksByArea("magisterio") },
  ];
}

export function getTracksForPlan(planId: string) {
  const plan = getPlanById(planId);

  if (!plan) {
    return [];
  }

  if (plan.productSlug === "pmes" || plan.productSlug === "enem" || plan.productSlug.startsWith("redacao")) {
    return [];
  }

  switch (planId) {
    case "agua-doce-operacionais":
    case "agua-doce-fundamental-apostila":
    case "agua-doce-fundamental-apostila-simulados":
    case "agua-doce-fundamental-portal":
      return getTracksByArea("operacionais");
    case "agua-doce-magisterio":
    case "agua-doce-magisterio-apostila":
    case "agua-doce-magisterio-apostila-simulados":
    case "agua-doce-pedagogicos-completo":
    case "agua-doce-mapa-completo":
    case "agua-doce-mapb-aee-completo":
      return getTracksByArea("magisterio");
    case "agua-doce-saude-apostila":
    case "agua-doce-saude-apostila-simulados":
    case "agua-doce-saude-portal":
      return getTracksByArea("saude");
    case "agua-doce-completo":
    case "agua-doce-medio-apostila":
    case "agua-doce-medio-apostila-simulados":
    case "agua-doce-medio-portal":
      return getAllTracks();
    default:
      return [];
  }
}

export function getPurchasedProductsForPlan(planId: string): PurchasedProduct[] {
  const plan = getPlanById(planId);
  const tracks = getTracksForPlan(planId);

  if (!plan || tracks.length === 0) {
    return [];
  }

  return [
    {
      slug: "aprova-agua-doce",
      title: "Aprova Agua Doce",
      summary: plan.description,
      href: "/area",
      tracks,
    },
  ];
}

export function getTrackCommercialCopy(track: CuradoriaTrilha) {
  const materiais = track.materiais.map((material) => material.modulo).join(", ");

  return {
    label: track.publico,
    modulesLabel: materiais,
    ctaHref: `/produtos/aprova-agua-doce/${track.slug}`,
    studentHref: `/aluno/cargos/${track.slug}`,
  };
}

export function getFutureProductStats() {
  return {
    pmesCategories: estruturaFutura.categories.length,
    futureTracks: 2,
  };
}

export function getTrackBySlug(trackSlug: string) {
  return getCuradoriaTrack(trackSlug) ?? null;
}

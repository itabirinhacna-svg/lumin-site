import { existsSync, statSync } from "node:fs";
import path from "node:path";

const APOSTILAS_ROOT = path.join(process.cwd(), "public", "apostilas");
const PDF_ROOT = path.join(APOSTILAS_ROOT, "PDFs");

type CuradoriaAreaSlug = "operacionais" | "saude" | "magisterio";
type CuradoriaStatus = "disponivel" | "em-curadoria";
type MaterialVariant = "pdf" | "markdown";

export type CuradoriaMaterial = {
  id: string;
  slug: string;
  titulo: string;
  resumo: string;
  categoria: "apostila";
  status: CuradoriaStatus;
  modulo: string;
  sourceFolder: string;
  markdownPath: string;
  pdfPath: string;
  markdownExists: boolean;
  pdfExists: boolean;
  markdownSizeLabel: string;
  pdfSizeLabel: string;
};

export type CuradoriaTrilha = {
  area: CuradoriaAreaSlug;
  slug: string;
  titulo: string;
  resumo: string;
  publico: string;
  bibliotecaStatus: "Biblioteca pronta" | "Biblioteca parcial";
  videoStatus: "demo" | "pendente";
  questoesStatus: "pendente";
  simuladosStatus: "pendente";
  checklist: string[];
  proximaAcao: string;
  materiais: CuradoriaMaterial[];
};

export type CuradoriaGrupo = {
  slug: CuradoriaAreaSlug;
  title: string;
  description: string;
  tracks: CuradoriaTrilha[];
};

export type CuradoriaFutureGroup = {
  slug: "pmes";
  title: string;
  description: string;
  categories: {
    slug: string;
    title: string;
    disciplinas: string[];
    status: "planejado";
  }[];
};

type MaterialDefinition = {
  arquivoBase: string;
  titulo: string;
  resumo: string;
  modulo: string;
};

type TrilhaDefinition = {
  area: CuradoriaAreaSlug;
  slug: string;
  titulo: string;
  resumo: string;
  publico: string;
  sourceFolder: string;
  materiais: MaterialDefinition[];
  proximaAcao: string;
};

const checklistPadrao = ["Entenda", "Leia", "Baixe", "Pratique", "Revise", "Conclua"];

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatSizeLabel(filePath: string) {
  if (!existsSync(filePath)) {
    return "indisponivel";
  }

  const bytes = statSync(filePath).size;
  const kb = bytes / 1024;

  if (kb >= 1024) {
    return `${(kb / 1024).toFixed(1)} MB`;
  }

  return `${Math.max(1, Math.round(kb))} KB`;
}

function createMaterial(trackSlug: string, sourceFolder: string, definition: MaterialDefinition): CuradoriaMaterial {
  const markdownPath = path.join(APOSTILAS_ROOT, sourceFolder, `${definition.arquivoBase}.md`);
  const pdfPath = path.join(PDF_ROOT, sourceFolder, `${definition.arquivoBase}.pdf`);

  return {
    id: `${trackSlug}-${slugify(definition.arquivoBase)}`,
    slug: slugify(definition.titulo),
    titulo: definition.titulo,
    resumo: definition.resumo,
    categoria: "apostila",
    status: existsSync(pdfPath) || existsSync(markdownPath) ? "disponivel" : "em-curadoria",
    modulo: definition.modulo,
    sourceFolder,
    markdownPath,
    pdfPath,
    markdownExists: existsSync(markdownPath),
    pdfExists: existsSync(pdfPath),
    markdownSizeLabel: formatSizeLabel(markdownPath),
    pdfSizeLabel: formatSizeLabel(pdfPath),
  };
}

const trilhaDefinitions: TrilhaDefinition[] = [
  {
    area: "operacionais",
    slug: "auxiliar-servicos-gerais",
    titulo: "Auxiliar de Servicos Gerais",
    resumo: "Preparacao com base em Portugues, Matematica e conhecimentos especificos de limpeza, conservacao e rotina de apoio.",
    publico: "Operacionais",
    sourceFolder: "ensino_fundamental_incompleto",
    proximaAcao: "Comecar por Portugues, seguir para Matematica e fechar com especificos.",
    materiais: [
      {
        arquivoBase: "lingua_portuguesa",
        titulo: "Lingua Portuguesa",
        resumo: "Base de leitura, interpretacao, ortografia e pontuacao.",
        modulo: "Portugues",
      },
      {
        arquivoBase: "matematica",
        titulo: "Matematica Basica",
        resumo: "Operacoes fundamentais, medidas e resolucao de situacoes praticas.",
        modulo: "Matematica",
      },
      {
        arquivoBase: "conhecimentos_especificos_auxiliar_servicos_gerais",
        titulo: "Conhecimentos Especificos",
        resumo: "Rotinas de conservacao, limpeza, atendimento e seguranca no trabalho.",
        modulo: "Especificos",
      },
    ],
  },
  {
    area: "operacionais",
    slug: "merendeira",
    titulo: "Merendeira",
    resumo: "Trilha com fundamentos de Portugues, Matematica e manipulacao segura de alimentos para ambiente escolar.",
    publico: "Operacionais",
    sourceFolder: "ensino_fundamental_incompleto",
    proximaAcao: "Revisar boas praticas de manipulacao e depois resolver situacoes de rotina escolar.",
    materiais: [
      {
        arquivoBase: "lingua_portuguesa",
        titulo: "Lingua Portuguesa",
        resumo: "Leitura, interpretacao e norma basica para a prova objetiva.",
        modulo: "Portugues",
      },
      {
        arquivoBase: "matematica",
        titulo: "Matematica Basica",
        resumo: "Operacoes e medidas aplicadas ao dia a dia do cargo.",
        modulo: "Matematica",
      },
      {
        arquivoBase: "conhecimentos_especificos_merendeira",
        titulo: "Conhecimentos Especificos",
        resumo: "Higiene, armazenamento, preparo e distribuicao de alimentos.",
        modulo: "Especificos",
      },
    ],
  },
  {
    area: "operacionais",
    slug: "motorista",
    titulo: "Motorista",
    resumo: "Base geral de prova com foco adicional em legislacao de transito, conducao segura e rotina operacional.",
    publico: "Operacionais",
    sourceFolder: "ensino_fundamental_incompleto",
    proximaAcao: "Fechar a base geral e concentrar a reta final no bloco especifico de transito.",
    materiais: [
      {
        arquivoBase: "lingua_portuguesa",
        titulo: "Lingua Portuguesa",
        resumo: "Compreensao de texto e cobrancas mais comuns do edital.",
        modulo: "Portugues",
      },
      {
        arquivoBase: "matematica",
        titulo: "Matematica Basica",
        resumo: "Raciocinio numerico e problemas do cotidiano.",
        modulo: "Matematica",
      },
      {
        arquivoBase: "conhecimentos_especificos_motorista",
        titulo: "Conhecimentos Especificos",
        resumo: "CTB, direcao defensiva, sinalizacao e primeiros socorros.",
        modulo: "Especificos",
      },
    ],
  },
  {
    area: "operacionais",
    slug: "operador-maquinas",
    titulo: "Operador de Maquinas",
    resumo: "Trilha com base geral e caderno especifico para operacao segura de maquinas pesadas.",
    publico: "Operacionais",
    sourceFolder: "ensino_fundamental_incompleto",
    proximaAcao: "Concluir os fundamentos e revisar procedimentos de operacao e seguranca.",
    materiais: [
      {
        arquivoBase: "lingua_portuguesa",
        titulo: "Lingua Portuguesa",
        resumo: "Leitura, interpretacao e ortografia para prova objetiva.",
        modulo: "Portugues",
      },
      {
        arquivoBase: "matematica",
        titulo: "Matematica Basica",
        resumo: "Calculos e medidas presentes em situacoes operacionais.",
        modulo: "Matematica",
      },
      {
        arquivoBase: "conhecimentos_especificos_operador_maquinas_pesadas",
        titulo: "Conhecimentos Especificos",
        resumo: "Operacao, manutencao preventiva e cuidados com maquinas pesadas.",
        modulo: "Especificos",
      },
    ],
  },
  {
    area: "saude",
    slug: "tecnico-enfermagem",
    titulo: "Tecnico em Enfermagem",
    resumo: "Preparacao com base geral, informatica, SUS e caderno especifico de enfermagem.",
    publico: "Saude",
    sourceFolder: "ensino_medio_tecnico",
    proximaAcao: "Alternar fundamentos de enfermagem com revisao de SUS e informatica.",
    materiais: [
      {
        arquivoBase: "lingua_portuguesa",
        titulo: "Lingua Portuguesa",
        resumo: "Base de leitura e interpretacao aplicada a prova.",
        modulo: "Portugues",
      },
      {
        arquivoBase: "matematica",
        titulo: "Matematica Basica",
        resumo: "Operacoes, proporcoes e raciocinio numerico.",
        modulo: "Matematica",
      },
      {
        arquivoBase: "informatica_basica",
        titulo: "Informatica Basica",
        resumo: "Conceitos operacionais e ferramentas cobradas em provas municipais.",
        modulo: "Informatica",
      },
      {
        arquivoBase: "conhecimentos_especificos_tecnico_em_enfermagem",
        titulo: "Conhecimentos Especificos de Enfermagem",
        resumo: "Fundamentos tecnicos, procedimentos e rotina assistencial.",
        modulo: "Especificos",
      },
    ],
  },
  {
    area: "magisterio",
    slug: "conhecimentos-pedagogicos",
    titulo: "Conhecimentos Pedagogicos",
    resumo: "Fundamentos da educacao, teorias pedagogicas, legislacao e avaliacao escolar.",
    publico: "Magisterio",
    sourceFolder: "magisterio",
    proximaAcao: "Consolidar pedagogicos como eixo central e usar Portugues e Informatica como apoio de prova.",
    materiais: [
      {
        arquivoBase: "lingua_portuguesa",
        titulo: "Lingua Portuguesa",
        resumo: "Compreensao textual, gramatica e producao de resposta objetiva.",
        modulo: "Portugues",
      },
      {
        arquivoBase: "informatica",
        titulo: "Informatica",
        resumo: "Conceitos digitais e uso de ferramentas basicas.",
        modulo: "Informatica",
      },
      {
        arquivoBase: "conhecimentos_pedagogicos",
        titulo: "Conhecimentos Pedagogicos",
        resumo: "Base teorica e legal da educacao para cargos do magisterio.",
        modulo: "Pedagogicos",
      },
    ],
  },
  {
    area: "magisterio",
    slug: "educacao-infantil",
    titulo: "Educacao Infantil",
    resumo: "Trilha com base pedagogica e caderno especifico para infancia, ludicidade e planejamento.",
    publico: "Magisterio",
    sourceFolder: "magisterio",
    proximaAcao: "Estudar pedagogicos junto com o mapa especifico de Educacao Infantil.",
    materiais: [
      {
        arquivoBase: "lingua_portuguesa",
        titulo: "Lingua Portuguesa",
        resumo: "Base de leitura e interpretacao para o edital.",
        modulo: "Portugues",
      },
      {
        arquivoBase: "informatica",
        titulo: "Informatica",
        resumo: "Conceitos basicos de tecnologia aplicados a prova.",
        modulo: "Informatica",
      },
      {
        arquivoBase: "conhecimentos_pedagogicos",
        titulo: "Conhecimentos Pedagogicos",
        resumo: "Teorias, legislacao, planejamento e avaliacao escolar.",
        modulo: "Pedagogicos",
      },
      {
        arquivoBase: "especificos_mapa_educacao_infantil",
        titulo: "Especificos de Educacao Infantil",
        resumo: "Infancia, desenvolvimento, brincadeira, BNCC e documentacao pedagogica.",
        modulo: "Especificos",
      },
    ],
  },
  {
    area: "magisterio",
    slug: "series-iniciais",
    titulo: "Series Iniciais",
    resumo: "Preparacao para anos iniciais com base pedagogica, alfabetizacao e praticas curriculares.",
    publico: "Magisterio",
    sourceFolder: "magisterio",
    proximaAcao: "Fechar alfabetizacao e anos iniciais antes da reta final de revisao.",
    materiais: [
      {
        arquivoBase: "lingua_portuguesa",
        titulo: "Lingua Portuguesa",
        resumo: "Leitura, interpretacao e lingua padrao.",
        modulo: "Portugues",
      },
      {
        arquivoBase: "informatica",
        titulo: "Informatica",
        resumo: "Conceitos digitais essenciais para a prova.",
        modulo: "Informatica",
      },
      {
        arquivoBase: "conhecimentos_pedagogicos",
        titulo: "Conhecimentos Pedagogicos",
        resumo: "Base teorica e legal do magisterio.",
        modulo: "Pedagogicos",
      },
      {
        arquivoBase: "especificos_mapa_ensino_fundamental_1_ao_5",
        titulo: "Especificos de Series Iniciais",
        resumo: "Alfabetizacao, letramento, curriculo e aprendizagem nos anos iniciais.",
        modulo: "Especificos",
      },
    ],
  },
  {
    area: "magisterio",
    slug: "aee-visual",
    titulo: "AEE Deficiencia Visual",
    resumo: "Base pedagogica e caderno especifico de atendimento educacional especializado para deficiencia visual.",
    publico: "Magisterio",
    sourceFolder: "magisterio",
    proximaAcao: "Priorizar recursos especificos, acessibilidade e atendimento educacional especializado.",
    materiais: [
      {
        arquivoBase: "lingua_portuguesa",
        titulo: "Lingua Portuguesa",
        resumo: "Base textual e gramatical do edital.",
        modulo: "Portugues",
      },
      {
        arquivoBase: "informatica",
        titulo: "Informatica",
        resumo: "Conceitos digitais e organizacao da informacao.",
        modulo: "Informatica",
      },
      {
        arquivoBase: "conhecimentos_pedagogicos",
        titulo: "Conhecimentos Pedagogicos",
        resumo: "Fundamentos e legislacao da educacao.",
        modulo: "Pedagogicos",
      },
      {
        arquivoBase: "especificos_aee_deficiencia_visual",
        titulo: "Especificos de AEE Visual",
        resumo: "Braille, recursos opticos, orientacao e mobilidade e acessibilidade.",
        modulo: "Especificos",
      },
    ],
  },
  {
    area: "magisterio",
    slug: "aee-auditiva",
    titulo: "AEE Deficiencia Auditiva",
    resumo: "Trilha para atendimento especializado com foco em Libras, cultura surda e educacao bilingue.",
    publico: "Magisterio",
    sourceFolder: "magisterio",
    proximaAcao: "Estudar a base pedagogica e aprofundar comunicacao visual e educacao bilingue.",
    materiais: [
      {
        arquivoBase: "lingua_portuguesa",
        titulo: "Lingua Portuguesa",
        resumo: "Leitura, interpretacao e lingua padrao para prova.",
        modulo: "Portugues",
      },
      {
        arquivoBase: "informatica",
        titulo: "Informatica",
        resumo: "Bases de tecnologia e informacao.",
        modulo: "Informatica",
      },
      {
        arquivoBase: "conhecimentos_pedagogicos",
        titulo: "Conhecimentos Pedagogicos",
        resumo: "Fundamentos e legislacao educacional.",
        modulo: "Pedagogicos",
      },
      {
        arquivoBase: "especificos_aee_deficiencia_auditiva",
        titulo: "Especificos de AEE Auditiva",
        resumo: "Libras, cultura surda, educacao bilingue e recursos visuais.",
        modulo: "Especificos",
      },
    ],
  },
  {
    area: "magisterio",
    slug: "sala-recursos",
    titulo: "Sala de Recursos",
    resumo: "Atendimento educacional especializado com foco em planejamento, inclusao e recursos multifuncionais.",
    publico: "Magisterio",
    sourceFolder: "magisterio",
    proximaAcao: "Organizar o estudo entre pedagogicos, inclusao e aplicacao do plano AEE.",
    materiais: [
      {
        arquivoBase: "lingua_portuguesa",
        titulo: "Lingua Portuguesa",
        resumo: "Base gramatical e interpretativa para o edital.",
        modulo: "Portugues",
      },
      {
        arquivoBase: "informatica",
        titulo: "Informatica",
        resumo: "Conceitos e aplicacoes digitais mais cobrados.",
        modulo: "Informatica",
      },
      {
        arquivoBase: "conhecimentos_pedagogicos",
        titulo: "Conhecimentos Pedagogicos",
        resumo: "Fundamentos da educacao, legislacao e avaliacao.",
        modulo: "Pedagogicos",
      },
      {
        arquivoBase: "especificos_aee_sala_recursos_multifuncionais",
        titulo: "Especificos de Sala de Recursos",
        resumo: "Educacao inclusiva, tecnologias assistivas e organizacao do atendimento especializado.",
        modulo: "Especificos",
      },
    ],
  },
];

const tracks = trilhaDefinitions.map((definition) => {
  const materiais = definition.materiais.map((material) => createMaterial(definition.slug, definition.sourceFolder, material));
  const bibliotecaCompleta = materiais.every((material) => material.pdfExists && material.markdownExists);

  return {
    area: definition.area,
    slug: definition.slug,
    titulo: definition.titulo,
    resumo: definition.resumo,
    publico: definition.publico,
    bibliotecaStatus: bibliotecaCompleta ? "Biblioteca pronta" : "Biblioteca parcial",
    videoStatus: "demo",
    questoesStatus: "pendente",
    simuladosStatus: "pendente",
    checklist: checklistPadrao,
    proximaAcao: definition.proximaAcao,
    materiais,
  } satisfies CuradoriaTrilha;
});

export const curadoria: CuradoriaGrupo[] = [
  {
    slug: "operacionais",
    title: "Operacionais",
    description: "Cargos com base geral em Portugues e Matematica, mais caderno especifico por funcao.",
    tracks: tracks.filter((track) => track.area === "operacionais"),
  },
  {
    slug: "saude",
    title: "Saude",
    description: "Trilhas com base geral e material especifico para a area assistencial.",
    tracks: tracks.filter((track) => track.area === "saude"),
  },
  {
    slug: "magisterio",
    title: "Magisterio",
    description: "Preparacao para cargos pedagogicos com base comum e especializacoes por trilha.",
    tracks: tracks.filter((track) => track.area === "magisterio"),
  },
];

export const estruturaFutura: CuradoriaFutureGroup = {
  slug: "pmes",
  title: "PMES",
  description: "Estrutura futura preparada para expansao sem consumir o foco atual do Aprova Agua Doce.",
  categories: [
    {
      slug: "pmes-humanas",
      title: "Humanas PMES",
      disciplinas: ["Geografia", "Historia"],
      status: "planejado",
    },
    {
      slug: "pmes-logica-matematica",
      title: "Logica e Matematica PMES",
      disciplinas: ["Raciocinio Logico", "Matematica"],
      status: "planejado",
    },
    {
      slug: "pmes-redacao",
      title: "Redacao PMES",
      disciplinas: ["Redacao", "Correcao orientada"],
      status: "planejado",
    },
  ],
};

export function getCuradoriaGroups() {
  return curadoria;
}

export function getCuradoriaTrack(trackSlug: string) {
  return tracks.find((track) => track.slug === trackSlug);
}

export function getFeaturedTrack() {
  return getCuradoriaTrack("conhecimentos-pedagogicos") ?? tracks[0];
}

export function getMaterialById(materialId: string) {
  for (const track of tracks) {
    const match = track.materiais.find((material) => material.id === materialId);
    if (match) {
      return { track, material: match };
    }
  }

  return null;
}

export function getMaterialAsset(materialId: string, variant: MaterialVariant) {
  const result = getMaterialById(materialId);

  if (!result) {
    return null;
  }

  const targetPath = variant === "pdf" ? result.material.pdfPath : result.material.markdownPath;
  const exists = variant === "pdf" ? result.material.pdfExists : result.material.markdownExists;

  if (!exists) {
    return null;
  }

  return {
    ...result,
    variant,
    targetPath,
    contentType: variant === "pdf" ? "application/pdf" : "text/markdown; charset=utf-8",
    fileName: path.basename(targetPath),
  };
}

export function getCuradoriaOverview() {
  const allMaterials = tracks.flatMap((track) => track.materiais);
  const pdfCount = allMaterials.filter((material) => material.pdfExists).length;
  const markdownCount = allMaterials.filter((material) => material.markdownExists).length;

  return {
    trackCount: tracks.length,
    materialCount: allMaterials.length,
    pdfCount,
    markdownCount,
    readyTrackCount: tracks.filter((track) => track.bibliotecaStatus === "Biblioteca pronta").length,
    demoVideoCount: tracks.filter((track) => track.videoStatus === "demo").length,
  };
}

export function getTracksByArea(area: CuradoriaAreaSlug) {
  return tracks.filter((track) => track.area === area);
}

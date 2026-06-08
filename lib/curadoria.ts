import { existsSync, statSync } from "node:fs";
import path from "node:path";

const APOSTILAS_ROOT = path.join(process.cwd(), "public", "apostilas");
const PDF_ROOT = path.join(APOSTILAS_ROOT, "PDFs");

export type CuradoriaAreaSlug = "operacionais" | "saude" | "magisterio";
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
  questoesStatus: "disponivel" | "base-comum" | "pendente";
  simuladosStatus: "disponivel" | "base-da-area" | "pendente";
  checklist: string[];
  proximaAcao: string;
  materiais: CuradoriaMaterial[];
};

export type TrackJourneySlot = {
  id: string;
  label: string;
  status: "concluida" | "atual" | "pendente";
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
  sourceFolder?: string;
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
  questoesStatus?: CuradoriaTrilha["questoesStatus"];
  simuladosStatus?: CuradoriaTrilha["simuladosStatus"];
};

const checklistPadrao = ["Entenda", "Assista", "Leia", "Pratique", "Revise", "Conclua"];

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

function createMaterial(trackSlug: string, defaultSourceFolder: string, definition: MaterialDefinition): CuradoriaMaterial {
  const sourceFolder = definition.sourceFolder ?? defaultSourceFolder;
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
    resumo: "Preparacao com Portugues, Matematica e material especifico de limpeza, conservacao e apoio escolar.",
    publico: "Operacionais",
    sourceFolder: "ensino_fundamental_incompleto",
    proximaAcao: "Comece por Portugues, avance em Matematica e feche a base com o bloco especifico do cargo.",
    questoesStatus: "disponivel",
    simuladosStatus: "disponivel",
    materiais: [
      {
        arquivoBase: "lingua_portuguesa",
        titulo: "Lingua Portuguesa",
        resumo: "Leitura, interpretacao, ortografia e pontuacao para a prova objetiva.",
        modulo: "Portugues",
      },
      {
        arquivoBase: "matematica",
        titulo: "Matematica Basica",
        resumo: "Operacoes, medidas e resolucao de situacoes praticas do edital.",
        modulo: "Matematica",
      },
      {
        arquivoBase: "conhecimentos_especificos_auxiliar_servicos_gerais",
        titulo: "Conhecimentos Especificos",
        resumo: "Rotinas de limpeza, organizacao, atendimento e seguranca no trabalho.",
        modulo: "Especificos",
      },
    ],
  },
  {
    area: "operacionais",
    slug: "merendeira",
    titulo: "Merendeira",
    resumo: "Trilha com base geral e foco em manipulacao segura de alimentos para ambiente escolar.",
    publico: "Operacionais",
    sourceFolder: "ensino_fundamental_incompleto",
    proximaAcao: "Estude higiene alimentar, armazenamento e preparo junto da base geral do edital.",
    questoesStatus: "disponivel",
    simuladosStatus: "disponivel",
    materiais: [
      {
        arquivoBase: "lingua_portuguesa",
        titulo: "Lingua Portuguesa",
        resumo: "Leitura, interpretacao e norma basica para a prova.",
        modulo: "Portugues",
      },
      {
        arquivoBase: "matematica",
        titulo: "Matematica Basica",
        resumo: "Operacoes, fracoes e medidas aplicadas ao dia a dia do cargo.",
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
    resumo: "Base geral de prova com foco em transito, conducao segura e rotina operacional.",
    publico: "Operacionais",
    sourceFolder: "ensino_fundamental_incompleto",
    proximaAcao: "Feche a base geral e concentre a reta final em CTB, direcao defensiva e primeiros socorros.",
    questoesStatus: "disponivel",
    simuladosStatus: "disponivel",
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
        resumo: "CTB, sinalizacao, direcao defensiva e primeiros socorros.",
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
    proximaAcao: "Revise seguranca, manutencao preventiva e operacao antes dos simulados de reta final.",
    questoesStatus: "disponivel",
    simuladosStatus: "disponivel",
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
    area: "operacionais",
    slug: "vigia",
    titulo: "Vigia",
    resumo: "Curso direcionado para vigilancia patrimonial, observacao de rotina e conduta preventiva.",
    publico: "Operacionais",
    sourceFolder: "ensino_fundamental_incompleto",
    proximaAcao: "Estude rotina de vigilancia, controle de acesso e procedimentos de prevencao junto da base geral.",
    questoesStatus: "base-comum",
    simuladosStatus: "base-da-area",
    materiais: [
      {
        arquivoBase: "lingua_portuguesa",
        titulo: "Lingua Portuguesa",
        resumo: "Leitura e interpretacao aplicadas a comunicados e registros do cargo.",
        modulo: "Portugues",
      },
      {
        arquivoBase: "matematica",
        titulo: "Matematica Basica",
        resumo: "Operacoes basicas, medidas e leitura de informacoes objetivas.",
        modulo: "Matematica",
      },
      {
        arquivoBase: "conhecimentos_especificos_vigilante",
        titulo: "Conhecimentos Especificos",
        resumo: "Vigilancia, controle de acesso, observacao e postura preventiva.",
        modulo: "Especificos",
      },
    ],
  },
  {
    area: "saude",
    slug: "auxiliar-de-cuidador",
    titulo: "Auxiliar de Cuidador",
    resumo: "Preparacao com base geral e rotina de apoio ao cuidado, atencao e acompanhamento de pessoas.",
    publico: "Saude e cuidado",
    sourceFolder: "ensino_fundamental_completo_medio_incompleto",
    proximaAcao: "Feche a base comum e avance nos procedimentos de apoio e acolhimento do cargo.",
    questoesStatus: "base-comum",
    simuladosStatus: "base-da-area",
    materiais: [
      {
        arquivoBase: "lingua_portuguesa",
        titulo: "Lingua Portuguesa",
        resumo: "Interpretacao, leitura funcional e linguagem objetiva.",
        modulo: "Portugues",
      },
      {
        arquivoBase: "matematica",
        titulo: "Matematica Basica",
        resumo: "Raciocinio numerico e operacoes fundamentais.",
        modulo: "Matematica",
      },
      {
        arquivoBase: "conhecimentos_especificos_auxiliar_de_cuidador",
        titulo: "Conhecimentos Especificos",
        resumo: "Rotinas de cuidado, apoio e observacao responsavel.",
        modulo: "Especificos",
      },
    ],
  },
  {
    area: "saude",
    slug: "cuidador",
    titulo: "Cuidador",
    resumo: "Trilha de base geral, informatica e conhecimentos especificos de apoio ao cuidado.",
    publico: "Saude e cuidado",
    sourceFolder: "ensino_medio_tecnico",
    proximaAcao: "Estude a base do cargo e avance para organizacao, observacao e cuidados responsaveis.",
    questoesStatus: "base-comum",
    simuladosStatus: "base-da-area",
    materiais: [
      {
        arquivoBase: "lingua_portuguesa",
        titulo: "Lingua Portuguesa",
        resumo: "Leitura, interpretacao e comunicacao funcional para a prova.",
        modulo: "Portugues",
      },
      {
        arquivoBase: "matematica",
        titulo: "Matematica Basica",
        resumo: "Operacoes basicas e resolucao de situacoes numericas.",
        modulo: "Matematica",
      },
      {
        arquivoBase: "informatica_basica",
        titulo: "Informatica Basica",
        resumo: "Ferramentas, sistema operacional e seguranca basica da informacao.",
        modulo: "Informatica",
      },
      {
        arquivoBase: "conhecimentos_especificos_cuidador",
        titulo: "Conhecimentos Especificos",
        resumo: "Rotinas de cuidado, observacao, acolhimento e apoio responsavel.",
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
    proximaAcao: "Alterne fundamentos de enfermagem, SUS e informatica para consolidar o bloco tecnico.",
    questoesStatus: "disponivel",
    simuladosStatus: "disponivel",
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
        arquivoBase: "saude_publica_sus",
        titulo: "Saude Publica e SUS",
        resumo: "Principios, organizacao e funcionamento do SUS para reta final do edital.",
        modulo: "SUS",
        sourceFolder: "saude_basicos",
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
    proximaAcao: "Consolide pedagogicos como eixo central e use Portugues e Informatica como apoio de prova.",
    questoesStatus: "disponivel",
    simuladosStatus: "disponivel",
    materiais: [
      {
        arquivoBase: "lingua_portuguesa",
        titulo: "Lingua Portuguesa",
        resumo: "Compreensao textual, gramatica e leitura orientada para o edital.",
        modulo: "Portugues",
      },
      {
        arquivoBase: "informatica",
        titulo: "Informatica",
        resumo: "Conceitos digitais, organizacao da informacao e ferramentas basicas.",
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
    slug: "pedagogo",
    titulo: "Pedagogo",
    resumo: "Curso com base pedagogica, informatica e material especifico para atuacao pedagogica.",
    publico: "Magisterio",
    sourceFolder: "magisterio",
    proximaAcao: "Feche a base comum e avance para gestao pedagogica, planejamento e acompanhamento escolar.",
    questoesStatus: "base-comum",
    simuladosStatus: "base-da-area",
    materiais: [
      {
        arquivoBase: "lingua_portuguesa",
        titulo: "Lingua Portuguesa",
        resumo: "Interpretacao e linguagem tecnica aplicada a prova.",
        modulo: "Portugues",
      },
      {
        arquivoBase: "informatica",
        titulo: "Informatica",
        resumo: "Ferramentas digitais e organizacao de documentos pedagogicos.",
        modulo: "Informatica",
      },
      {
        arquivoBase: "conhecimentos_pedagogicos",
        titulo: "Conhecimentos Pedagogicos",
        resumo: "Teorias, legislacao, avaliacao e fundamentos do trabalho pedagogico.",
        modulo: "Pedagogicos",
      },
      {
        arquivoBase: "especificos_pedagogo",
        titulo: "Especificos de Pedagogo",
        resumo: "Planejamento, coordenacao pedagogica e acompanhamento institucional.",
        modulo: "Especificos",
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
    proximaAcao: "Estude pedagogicos junto com o bloco especifico de infancia, desenvolvimento e brincadeira.",
    questoesStatus: "disponivel",
    simuladosStatus: "disponivel",
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
        resumo: "Infancia, desenvolvimento, BNCC, brincadeira e documentacao pedagogica.",
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
    proximaAcao: "Feche alfabetizacao, letramento e avaliacao formativa antes da reta final de revisao.",
    questoesStatus: "disponivel",
    simuladosStatus: "disponivel",
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
        resumo: "Alfabetizacao, curriculo e aprendizagem nos anos iniciais.",
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
    proximaAcao: "Priorize acessibilidade, recursos especificos e organizacao do atendimento especializado.",
    questoesStatus: "disponivel",
    simuladosStatus: "disponivel",
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
        resumo: "Braille, orientacao e mobilidade, recursos opticos e acessibilidade.",
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
    proximaAcao: "Articule a base pedagogica com os recursos de comunicacao e a perspectiva bilingue.",
    questoesStatus: "disponivel",
    simuladosStatus: "disponivel",
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
        resumo: "Bases de tecnologia e organizacao da informacao.",
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
        resumo: "Libras, cultura surda, recursos visuais e educacao bilingue.",
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
    proximaAcao: "Organize o estudo entre pedagogicos, inclusao, plano de AEE e recursos assistivos.",
    questoesStatus: "disponivel",
    simuladosStatus: "disponivel",
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
        resumo: "Educacao inclusiva, tecnologias assistivas e organizacao do atendimento.",
        modulo: "Especificos",
      },
    ],
  },
  {
    area: "magisterio",
    slug: "professor-arte",
    titulo: "Professor de Arte",
    resumo: "Curso para MAPB de Arte com base comum do magisterio e caderno especifico da disciplina.",
    publico: "Magisterio",
    sourceFolder: "magisterio",
    proximaAcao: "Equilibre a base pedagogica com conteudos especificos de linguagem artistica e pratica docente.",
    questoesStatus: "base-comum",
    simuladosStatus: "base-da-area",
    materiais: [
      {
        arquivoBase: "lingua_portuguesa",
        titulo: "Lingua Portuguesa",
        resumo: "Interpretacao e linguagem para a prova.",
        modulo: "Portugues",
      },
      {
        arquivoBase: "informatica",
        titulo: "Informatica",
        resumo: "Ferramentas e organizacao de arquivos pedagogicos.",
        modulo: "Informatica",
      },
      {
        arquivoBase: "conhecimentos_pedagogicos",
        titulo: "Conhecimentos Pedagogicos",
        resumo: "Base teorica e legal do magisterio.",
        modulo: "Pedagogicos",
      },
      {
        arquivoBase: "especificos_mapb_arte",
        titulo: "Especificos de Arte",
        resumo: "Conteudos e fundamentos especificos da disciplina de Arte.",
        modulo: "Especificos",
      },
    ],
  },
  {
    area: "magisterio",
    slug: "professor-ciencias",
    titulo: "Professor de Ciencias",
    resumo: "Curso para MAPB de Ciencias com base pedagogica e bloco especifico da disciplina.",
    publico: "Magisterio",
    sourceFolder: "magisterio",
    proximaAcao: "Use a base pedagogica como eixo e consolide os topicos especificos de Ciencias.",
    questoesStatus: "base-comum",
    simuladosStatus: "base-da-area",
    materiais: [
      { arquivoBase: "lingua_portuguesa", titulo: "Lingua Portuguesa", resumo: "Leitura e interpretacao para a prova.", modulo: "Portugues" },
      { arquivoBase: "informatica", titulo: "Informatica", resumo: "Ferramentas digitais e organizacao basica.", modulo: "Informatica" },
      { arquivoBase: "conhecimentos_pedagogicos", titulo: "Conhecimentos Pedagogicos", resumo: "Fundamentos do magisterio.", modulo: "Pedagogicos" },
      { arquivoBase: "especificos_mapb_ciencias", titulo: "Especificos de Ciencias", resumo: "Conteudos e fundamentos especificos da disciplina de Ciencias.", modulo: "Especificos" },
    ],
  },
  {
    area: "magisterio",
    slug: "professor-educacao-fisica",
    titulo: "Professor de Educacao Fisica",
    resumo: "Curso para MAPB de Educacao Fisica com base comum e bloco especifico da disciplina.",
    publico: "Magisterio",
    sourceFolder: "magisterio",
    proximaAcao: "Consolide o bloco especifico de Educacao Fisica sem perder a base pedagogica do edital.",
    questoesStatus: "base-comum",
    simuladosStatus: "base-da-area",
    materiais: [
      { arquivoBase: "lingua_portuguesa", titulo: "Lingua Portuguesa", resumo: "Leitura e interpretacao para a prova.", modulo: "Portugues" },
      { arquivoBase: "informatica", titulo: "Informatica", resumo: "Ferramentas digitais e organizacao basica.", modulo: "Informatica" },
      { arquivoBase: "conhecimentos_pedagogicos", titulo: "Conhecimentos Pedagogicos", resumo: "Fundamentos do magisterio.", modulo: "Pedagogicos" },
      { arquivoBase: "especificos_mapb_educacao_fisica", titulo: "Especificos de Educacao Fisica", resumo: "Conteudos e fundamentos especificos da disciplina de Educacao Fisica.", modulo: "Especificos" },
    ],
  },
  {
    area: "magisterio",
    slug: "professor-geografia",
    titulo: "Professor de Geografia",
    resumo: "Curso para MAPB de Geografia com base comum e bloco especifico da disciplina.",
    publico: "Magisterio",
    sourceFolder: "magisterio",
    proximaAcao: "Trabalhe base pedagogica e use o caderno especifico para aprofundar Geografia.",
    questoesStatus: "base-comum",
    simuladosStatus: "base-da-area",
    materiais: [
      { arquivoBase: "lingua_portuguesa", titulo: "Lingua Portuguesa", resumo: "Leitura e interpretacao para a prova.", modulo: "Portugues" },
      { arquivoBase: "informatica", titulo: "Informatica", resumo: "Ferramentas digitais e organizacao basica.", modulo: "Informatica" },
      { arquivoBase: "conhecimentos_pedagogicos", titulo: "Conhecimentos Pedagogicos", resumo: "Fundamentos do magisterio.", modulo: "Pedagogicos" },
      { arquivoBase: "especificos_mapb_geografia", titulo: "Especificos de Geografia", resumo: "Conteudos e fundamentos especificos da disciplina de Geografia.", modulo: "Especificos" },
    ],
  },
  {
    area: "magisterio",
    slug: "professor-historia",
    titulo: "Professor de Historia",
    resumo: "Curso para MAPB de Historia com base comum e bloco especifico da disciplina.",
    publico: "Magisterio",
    sourceFolder: "magisterio",
    proximaAcao: "Concilie a base pedagogica com os topicos especificos de Historia.",
    questoesStatus: "base-comum",
    simuladosStatus: "base-da-area",
    materiais: [
      { arquivoBase: "lingua_portuguesa", titulo: "Lingua Portuguesa", resumo: "Leitura e interpretacao para a prova.", modulo: "Portugues" },
      { arquivoBase: "informatica", titulo: "Informatica", resumo: "Ferramentas digitais e organizacao basica.", modulo: "Informatica" },
      { arquivoBase: "conhecimentos_pedagogicos", titulo: "Conhecimentos Pedagogicos", resumo: "Fundamentos do magisterio.", modulo: "Pedagogicos" },
      { arquivoBase: "especificos_mapb_historia", titulo: "Especificos de Historia", resumo: "Conteudos e fundamentos especificos da disciplina de Historia.", modulo: "Especificos" },
    ],
  },
  {
    area: "magisterio",
    slug: "professor-ingles",
    titulo: "Professor de Ingles",
    resumo: "Curso para MAPB de Ingles com base comum e caderno especifico da disciplina.",
    publico: "Magisterio",
    sourceFolder: "magisterio",
    proximaAcao: "Feche os fundamentos pedagogicos e avance no bloco especifico de Ingles.",
    questoesStatus: "base-comum",
    simuladosStatus: "base-da-area",
    materiais: [
      { arquivoBase: "lingua_portuguesa", titulo: "Lingua Portuguesa", resumo: "Leitura e interpretacao para a prova.", modulo: "Portugues" },
      { arquivoBase: "informatica", titulo: "Informatica", resumo: "Ferramentas digitais e organizacao basica.", modulo: "Informatica" },
      { arquivoBase: "conhecimentos_pedagogicos", titulo: "Conhecimentos Pedagogicos", resumo: "Fundamentos do magisterio.", modulo: "Pedagogicos" },
      { arquivoBase: "especificos_mapb_ingles", titulo: "Especificos de Ingles", resumo: "Conteudos e fundamentos especificos da disciplina de Ingles.", modulo: "Especificos" },
    ],
  },
  {
    area: "magisterio",
    slug: "professor-lingua-portuguesa",
    titulo: "Professor de Lingua Portuguesa",
    resumo: "Curso para MAPB de Lingua Portuguesa com base comum e bloco especifico da disciplina.",
    publico: "Magisterio",
    sourceFolder: "magisterio",
    proximaAcao: "Use o caderno especifico para aprofundar a disciplina e mantenha a base pedagogica em revisao.",
    questoesStatus: "base-comum",
    simuladosStatus: "base-da-area",
    materiais: [
      { arquivoBase: "lingua_portuguesa", titulo: "Lingua Portuguesa", resumo: "Leitura e interpretacao para a prova.", modulo: "Portugues" },
      { arquivoBase: "informatica", titulo: "Informatica", resumo: "Ferramentas digitais e organizacao basica.", modulo: "Informatica" },
      { arquivoBase: "conhecimentos_pedagogicos", titulo: "Conhecimentos Pedagogicos", resumo: "Fundamentos do magisterio.", modulo: "Pedagogicos" },
      { arquivoBase: "especificos_mapb_lingua_portuguesa", titulo: "Especificos de Lingua Portuguesa", resumo: "Conteudos e fundamentos especificos da disciplina de Lingua Portuguesa.", modulo: "Especificos" },
    ],
  },
  {
    area: "magisterio",
    slug: "professor-matematica",
    titulo: "Professor de Matematica",
    resumo: "Curso para MAPB de Matematica com base comum e caderno especifico da disciplina.",
    publico: "Magisterio",
    sourceFolder: "magisterio",
    proximaAcao: "Avance no bloco especifico de Matematica sem perder a base pedagogica do edital.",
    questoesStatus: "base-comum",
    simuladosStatus: "base-da-area",
    materiais: [
      { arquivoBase: "lingua_portuguesa", titulo: "Lingua Portuguesa", resumo: "Leitura e interpretacao para a prova.", modulo: "Portugues" },
      { arquivoBase: "informatica", titulo: "Informatica", resumo: "Ferramentas digitais e organizacao basica.", modulo: "Informatica" },
      { arquivoBase: "conhecimentos_pedagogicos", titulo: "Conhecimentos Pedagogicos", resumo: "Fundamentos do magisterio.", modulo: "Pedagogicos" },
      { arquivoBase: "especificos_mapb_matematica", titulo: "Especificos de Matematica", resumo: "Conteudos e fundamentos especificos da disciplina de Matematica.", modulo: "Especificos" },
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
    questoesStatus: definition.questoesStatus ?? "pendente",
    simuladosStatus: definition.simuladosStatus ?? "pendente",
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
    title: "Saude e cuidado",
    description: "Trilhas com base geral, apoio ao cuidado e materiais especificos para a area assistencial.",
    tracks: tracks.filter((track) => track.area === "saude"),
  },
  {
    slug: "magisterio",
    title: "Magisterio",
    description: "Preparacao para cargos pedagogicos, AEE e professores por disciplina.",
    tracks: tracks.filter((track) => track.area === "magisterio"),
  },
];

export const estruturaFutura: CuradoriaFutureGroup = {
  slug: "pmes",
  title: "PMES",
  description: "Estrutura futura preparada para expansao sem consumir o foco atual do Aprova Agua Doce.",
  categories: [
    {
      slug: "pmes-portugues",
      title: "Portugues PMES",
      disciplinas: ["Interpretacao de texto", "Gramatica", "Producao escrita"],
      status: "planejado",
    },
    {
      slug: "pmes-matematica-logica",
      title: "Matematica e Logica PMES",
      disciplinas: ["Matematica", "Raciocinio Logico"],
      status: "planejado",
    },
    {
      slug: "pmes-humanas",
      title: "Humanas PMES",
      disciplinas: ["Historia", "Geografia"],
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

export function getAllTracks() {
  return tracks;
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

export function getTrackProgress(trackSlug: string) {
  return getTrackProgressDetails(trackSlug).progress;
}

export function getTrackProgressDetails(trackSlug: string) {
  const track = getCuradoriaTrack(trackSlug);

  if (!track) {
    return {
      progress: 0,
      currentStep: "Comecar",
      nextStep: "Abrir trilha",
      completedCount: 0,
      totalCount: 7,
      steps: [] as TrackJourneySlot[],
    };
  }

  const firstMaterial = track.materiais[0]?.titulo ?? "Primeira aula";
  const secondMaterial = track.materiais[1]?.titulo ?? "Questoes da etapa";
  const progressMap: Record<string, { progress: number; currentIndex: number }> = {
    "auxiliar-servicos-gerais": { progress: 34, currentIndex: 2 },
    merendeira: { progress: 42, currentIndex: 3 },
    motorista: { progress: 48, currentIndex: 3 },
    "operador-maquinas": { progress: 31, currentIndex: 1 },
    vigia: { progress: 28, currentIndex: 1 },
    "auxiliar-de-cuidador": { progress: 26, currentIndex: 1 },
    cuidador: { progress: 33, currentIndex: 2 },
    "tecnico-enfermagem": { progress: 45, currentIndex: 3 },
    "conhecimentos-pedagogicos": { progress: 57, currentIndex: 4 },
    pedagogo: { progress: 36, currentIndex: 2 },
    "educacao-infantil": { progress: 41, currentIndex: 3 },
    "series-iniciais": { progress: 39, currentIndex: 3 },
    "aee-visual": { progress: 24, currentIndex: 1 },
    "aee-auditiva": { progress: 24, currentIndex: 1 },
    "sala-recursos": { progress: 29, currentIndex: 2 },
  };

  const flow = [
    `Ler ${firstMaterial}`,
    "Assistir ao video principal",
    "Praticar com as questoes da etapa",
    `Revisar ${firstMaterial}`,
    secondMaterial,
    "Resolver o simulado da area",
    "Fechar a revisao final",
  ];

  const progressEntry = progressMap[track.slug] ?? {
    progress: Math.min(78, 24 + track.materiais.length * 6),
    currentIndex: 2,
  };

  const steps = flow.map((label, index) => ({
    id: `${track.slug}-${index + 1}`,
    label,
    status:
      index < progressEntry.currentIndex
        ? "concluida"
        : index === progressEntry.currentIndex
          ? "atual"
          : "pendente",
  })) satisfies TrackJourneySlot[];

  const currentStep = steps.find((step) => step.status === "atual")?.label ?? flow[0];
  const nextStep = steps.find((step) => step.status === "pendente")?.label ?? "Revisar para manter o ritmo";
  const completedCount = steps.filter((step) => step.status === "concluida").length;

  return {
    progress: progressEntry.progress,
    currentStep,
    nextStep,
    completedCount,
    totalCount: steps.length,
    steps,
  };
}

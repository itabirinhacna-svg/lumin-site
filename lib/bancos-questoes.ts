import { aguaDoceMatriz } from "@/lib/agua-doce-matriz";
import { enemMatriz } from "@/lib/enem-matriz";
import { pmesMatriz } from "@/lib/pmes-matriz";

export type BancoQuestaoProduto = "pmes" | "agua-doce" | "enem";
export type BancoQuestaoStatus = "VALIDADO_USUARIO";
export type BancoQuestaoTipo = "banco" | "prova-oficial" | "material-referenciado" | "plataforma";
export type QuestaoCadastroTipo = "autoral" | "publica_oficial" | "referenciada" | "inspirada";

export type BancoQuestaoReferencia = {
  id: string;
  produto: BancoQuestaoProduto;
  banca: "IDECAN" | "IDESG" | "IBADE" | "FGV" | "VUNESP" | "Cebraspe" | "INEP" | "Misto";
  fonte: string;
  tipo: BancoQuestaoTipo;
  cargo: string;
  ano?: number;
  disciplina: string;
  assunto: string;
  microassunto: string;
  dificuldade: "facil" | "medio" | "dificil" | "misto";
  enunciado: string;
  alternativas: string[];
  gabaritoOculto: true;
  comentario: string;
  referencia: string;
  status: BancoQuestaoStatus;
  criteriosSelecao: string[];
};

export type QuestaoCadastroTemplate = {
  banca: BancoQuestaoReferencia["banca"];
  fonte: string;
  cargo: string;
  ano?: number;
  disciplina: string;
  assunto: string;
  microassunto: string;
  dificuldade: "facil" | "medio" | "dificil";
  enunciado: string;
  alternativas: Array<{ letra: "A" | "B" | "C" | "D" | "E"; texto: string }>;
  gabarito: "A" | "B" | "C" | "D" | "E";
  comentario: string;
  referencia: string;
  tipo: QuestaoCadastroTipo;
};

export type QuestaoCatalogadaMeta = {
  id: string;
  produto: BancoQuestaoProduto;
  banca: BancoQuestaoReferencia["banca"];
  fonte: string;
  cargo: string;
  ano?: number;
  disciplina: string;
  assunto: string;
  microassunto: string;
  dificuldade: "facil" | "medio" | "dificil" | "misto";
  referencia: string;
  tipo: QuestaoCadastroTipo;
};

export const bancosQuestoes: BancoQuestaoReferencia[] = [
  {
    id: "pmes-gran-questoes",
    produto: "pmes",
    banca: "IDECAN",
    fonte: "Gran Questoes",
    tipo: "plataforma",
    cargo: "PMES",
    disciplina: "Multidisciplinar",
    assunto: "Questoes por edital",
    microassunto: "Filtro por PMES ES",
    dificuldade: "misto",
    enunciado: "Fonte validada pelo usuario para treino filtrado por concurso PMES ES.",
    alternativas: [],
    gabaritoOculto: true,
    comentario: "Usar como banco de treino e revisao por disciplina, banca e topico.",
    referencia: "https://questoes.grancursosonline.com.br/concursos/pm-es-es",
    status: "VALIDADO_USUARIO",
    criteriosSelecao: ["filtro por edital", "questoes atualizadas", "triagem por disciplina"],
  },
  {
    id: "pmes-editora-solucao-500",
    produto: "pmes",
    banca: "IDECAN",
    fonte: "Editora Solucao - 500 questoes gabaritadas",
    tipo: "material-referenciado",
    cargo: "PMES",
    disciplina: "Multidisciplinar",
    assunto: "Caderno de questoes",
    microassunto: "Treino por materia",
    dificuldade: "misto",
    enunciado: "Fonte validada pelo usuario para reforco e treino por caderno tematico.",
    alternativas: [],
    gabaritoOculto: true,
    comentario: "Nao copiar como conteudo proprio; usar como referencia de triagem e treino.",
    referencia: "https://www.editorasolucao.com.br/caderno-questao/pm-es-pdf-500-questoes-gabaritadas",
    status: "VALIDADO_USUARIO",
    criteriosSelecao: ["volume alto", "organizado por materia", "apoio para reta final"],
  },
  {
    id: "pmes-oficial-2022",
    produto: "pmes",
    banca: "IDECAN",
    fonte: "PMES Oficial - pagina do concurso 2022",
    tipo: "prova-oficial",
    cargo: "PMES",
    ano: 2022,
    disciplina: "Multidisciplinar",
    assunto: "Prova oficial",
    microassunto: "Caderno agrupado e comunicados oficiais",
    dificuldade: "misto",
    enunciado: "Fonte oficial para referencia de estilo, distribuicao e formulacao da prova.",
    alternativas: [],
    gabaritoOculto: true,
    comentario: "Serve de ancora oficial para aderencia ao edital e ao estilo da prova.",
    referencia: "https://pm.es.gov.br/Contents/Item/Display/70578",
    status: "VALIDADO_USUARIO",
    criteriosSelecao: ["fonte oficial", "aderencia de estilo", "edital real"],
  },
  {
    id: "pmes-oficial-pdf-2022",
    produto: "pmes",
    banca: "IDECAN",
    fonte: "PMES Oficial PDF",
    tipo: "prova-oficial",
    cargo: "PMES",
    ano: 2022,
    disciplina: "Multidisciplinar",
    assunto: "Caderno de prova",
    microassunto: "Soldado Combatente",
    dificuldade: "misto",
    enunciado: "PDF oficial para extração de referencia, distribuicao por disciplina e treino.",
    alternativas: [],
    gabaritoOculto: true,
    comentario: "Usar para calibrar microassuntos e pesos do simulado PMES.",
    referencia: "https://pm.es.gov.br/Media/PMES/Concursos/CFSD2022_COMB/SOLDADO%20COMBATENTE%20(QPMP-C)(T872)%20agrupada.pdf",
    status: "VALIDADO_USUARIO",
    criteriosSelecao: ["fonte primaria", "prova oficial", "base de calibracao"],
  },
  {
    id: "pmes-estrategia-guia",
    produto: "pmes",
    banca: "Misto",
    fonte: "Estrategia Concursos - guia de estudos PMES",
    tipo: "material-referenciado",
    cargo: "PMES",
    disciplina: "Multidisciplinar",
    assunto: "Guia por materia",
    microassunto: "Cadernos por disciplina",
    dificuldade: "misto",
    enunciado: "Guia validado para orientar separacao de disciplinas e priorizacao de estudo.",
    alternativas: [],
    gabaritoOculto: true,
    comentario: "Referencia util para organizar estudo e reforcar ordem de revisao.",
    referencia: "https://www.estrategiaconcursos.com.br/blog/guia-de-estudos-para-pm-es-2024/",
    status: "VALIDADO_USUARIO",
    criteriosSelecao: ["organizacao por materia", "curadoria editorial", "apoio ao planejamento"],
  },
  {
    id: "enem-revisapp",
    produto: "enem",
    banca: "INEP",
    fonte: "RevisApp",
    tipo: "plataforma",
    cargo: "ENEM",
    disciplina: "Multidisciplinar",
    assunto: "Banco de questoes ENEM",
    microassunto: "Treino por area",
    dificuldade: "misto",
    enunciado: "Plataforma validada para treinos curtos por area do ENEM.",
    alternativas: [],
    gabaritoOculto: true,
    comentario: "Bom apoio para pratica rapida e rotina de revisao.",
    referencia: "https://revisapp.com",
    status: "VALIDADO_USUARIO",
    criteriosSelecao: ["pratica frequente", "recorte por area", "rotina de estudo"],
  },
  {
    id: "enem-inep-oficial",
    produto: "enem",
    banca: "INEP",
    fonte: "INEP Oficial",
    tipo: "prova-oficial",
    cargo: "ENEM",
    disciplina: "Multidisciplinar",
    assunto: "Provas e gabaritos",
    microassunto: "Cadernos oficiais",
    dificuldade: "misto",
    enunciado: "Fonte oficial de provas e gabaritos do ENEM.",
    alternativas: [],
    gabaritoOculto: true,
    comentario: "Base primaria para treinos fieis ao modelo oficial do exame.",
    referencia: "https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos",
    status: "VALIDADO_USUARIO",
    criteriosSelecao: ["fonte oficial", "aderencia maxima", "calibracao de dificuldade"],
  },
  {
    id: "enem-guia-estudante",
    produto: "enem",
    banca: "INEP",
    fonte: "Guia do Estudante",
    tipo: "material-referenciado",
    cargo: "ENEM",
    disciplina: "Multidisciplinar",
    assunto: "Refazer provas anteriores",
    microassunto: "Planejamento de treino",
    dificuldade: "misto",
    enunciado: "Referencia validada para orientar treino com provas anteriores do ENEM.",
    alternativas: [],
    gabaritoOculto: true,
    comentario: "Apoia a organização da rotina com foco em reaplicação de provas.",
    referencia: "https://guiadoestudante.abril.com.br/enem/prepare-se-para-o-enem-refazendo-provas-anteriores/",
    status: "VALIDADO_USUARIO",
    criteriosSelecao: ["estrategia de treino", "contextualizacao", "aplicacao pratica"],
  },
  {
    id: "enem-proenem-materiais",
    produto: "enem",
    banca: "INEP",
    fonte: "ProEnem Materiais",
    tipo: "material-referenciado",
    cargo: "ENEM",
    disciplina: "Multidisciplinar",
    assunto: "Materiais por area",
    microassunto: "Apoio a revisao",
    dificuldade: "misto",
    enunciado: "Base validada para complementar a trilha por area do ENEM.",
    alternativas: [],
    gabaritoOculto: true,
    comentario: "Funciona como reforco de teoria e organizacao de revisao.",
    referencia: "https://enem.proenem.com.br/materiais/",
    status: "VALIDADO_USUARIO",
    criteriosSelecao: ["revisao por area", "material de apoio", "linguagem acessivel"],
  },
  {
    id: "enem-estude-prisma",
    produto: "enem",
    banca: "INEP",
    fonte: "Estude Prisma",
    tipo: "plataforma",
    cargo: "ENEM",
    disciplina: "Multidisciplinar",
    assunto: "Acompanhamento e banco",
    microassunto: "Pratica por desempenho",
    dificuldade: "misto",
    enunciado: "Plataforma validada para acompanhar desempenho e rotina de estudo.",
    alternativas: [],
    gabaritoOculto: true,
    comentario: "Boa referencia para evolucao guiada por area e estatistica de acertos.",
    referencia: "https://estudeprisma.com/novidades",
    status: "VALIDADO_USUARIO",
    criteriosSelecao: ["desempenho por area", "pratica recorrente", "apoio ao plano de estudo"],
  },
  {
    id: "enem-educapes",
    produto: "enem",
    banca: "INEP",
    fonte: "EduCapes",
    tipo: "material-referenciado",
    cargo: "ENEM",
    disciplina: "Multidisciplinar",
    assunto: "Materiais abertos",
    microassunto: "Apoio complementar",
    dificuldade: "misto",
    enunciado: "Repositorio validado para materiais complementares e estudo aberto.",
    alternativas: [],
    gabaritoOculto: true,
    comentario: "Referencia segura para recursos educacionais complementares.",
    referencia: "https://educapes.capes.gov.br/handle/capes/201972",
    status: "VALIDADO_USUARIO",
    criteriosSelecao: ["acesso aberto", "apoio complementar", "repertorio de estudo"],
  },
];

export const questaoCadastroTemplate: QuestaoCadastroTemplate = {
  banca: "IDECAN",
  fonte: "Fonte validada",
  cargo: "PMES",
  ano: 2026,
  disciplina: "Portugues",
  assunto: "Interpretacao textual",
  microassunto: "ideia principal",
  dificuldade: "medio",
  enunciado: "",
  alternativas: [
    { letra: "A", texto: "" },
    { letra: "B", texto: "" },
    { letra: "C", texto: "" },
    { letra: "D", texto: "" },
    { letra: "E", texto: "" },
  ],
  gabarito: "A",
  comentario: "",
  referencia: "",
  tipo: "inspirada",
};

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const fontePmesPrincipal = bancosQuestoes.find((item) => item.id === "pmes-oficial-pdf-2022")!;
const fonteAguaDocePrincipal = {
  fonte: "Base IDESG / concursos municipais",
  referencia: "Base interna BenThec com arquitetura preparada para IDESG, IBADE, FGV, VUNESP e Cebraspe.",
};
const fonteEnemPrincipal = bancosQuestoes.find((item) => item.id === "enem-inep-oficial")!;

export const questoesCatalogadas: QuestaoCatalogadaMeta[] = [
  ...pmesMatriz.map((item) => ({
    id: `meta-pmes-${slugify(item.disciplina)}-${slugify(item.microassunto)}`,
    produto: "pmes" as const,
    banca: "IDECAN" as const,
    fonte: fontePmesPrincipal.fonte,
    cargo: "PMES",
    ano: 2022,
    disciplina: item.disciplina,
    assunto: item.assunto,
    microassunto: item.microassunto,
    dificuldade: "misto" as const,
    referencia: fontePmesPrincipal.referencia,
    tipo: "publica_oficial" as const,
  })),
  ...aguaDoceMatriz.map((item) => ({
    id: `meta-agua-${slugify(item.cargo)}-${slugify(item.microassunto)}`,
    produto: "agua-doce" as const,
    banca: "IDESG" as const,
    fonte: fonteAguaDocePrincipal.fonte,
    cargo: item.cargo,
    disciplina: item.disciplina,
    assunto: item.assunto,
    microassunto: item.microassunto,
    dificuldade: "misto" as const,
    referencia: fonteAguaDocePrincipal.referencia,
    tipo: "referenciada" as const,
  })),
  ...enemMatriz.map((item) => ({
    id: `meta-enem-${slugify(item.area)}-${slugify(item.microassunto)}`,
    produto: "enem" as const,
    banca: "INEP" as const,
    fonte: fonteEnemPrincipal.fonte,
    cargo: "ENEM",
    disciplina: item.area,
    assunto: item.assunto,
    microassunto: item.microassunto,
    dificuldade: "misto" as const,
    referencia: fonteEnemPrincipal.referencia,
    tipo: "publica_oficial" as const,
  })),
];

export function getBancosQuestoesByProduto(produto: BancoQuestaoProduto) {
  return bancosQuestoes.filter((item) => item.produto === produto);
}

export function getBancosQuestoesOverview() {
  const produtos = ["pmes", "agua-doce", "enem"] as const;

  return {
    total: bancosQuestoes.length,
    validadoUsuario: bancosQuestoes.length,
    porProduto: produtos.map((produto) => ({
      produto,
      total: getBancosQuestoesByProduto(produto).length,
    })),
    porBanca: [...new Set(bancosQuestoes.map((item) => item.banca))].map((banca) => ({
      banca,
      total: bancosQuestoes.filter((item) => item.banca === banca).length,
    })),
    questoesCatalogadas: questoesCatalogadas.length,
  };
}

export function getQuestoesCatalogadasByProduto(produto: BancoQuestaoProduto) {
  return questoesCatalogadas.filter((item) => item.produto === produto);
}

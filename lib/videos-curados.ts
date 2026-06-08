import { getAllTracks, type CuradoriaAreaSlug } from "@/lib/curadoria";

export type ConteudoRelacionadoTipo = "video" | "documentario" | "reportagem" | "complementar";
export type CuradoriaVideoStatus = "essencial" | "recomendado" | "complementar" | "PENDENTE DE CURADORIA";
export type CuradoriaValidacao = "validado" | "pendente" | "substituir";
export type ProdutoCurado = "aprova-agua-doce" | "pmes" | "redacao";

export type ConteudoCurado = {
  id: string;
  produto: ProdutoCurado;
  area: CuradoriaAreaSlug | "pmes" | "redacao";
  cargoSlug: string;
  cargo: string;
  disciplina: string;
  assunto: string;
  topicoEdital?: string;
  modulo: string;
  tipo: ConteudoRelacionadoTipo;
  titulo: string;
  canal: string;
  url: string | null;
  duracao: string;
  status: CuradoriaVideoStatus;
  validacao: CuradoriaValidacao;
  observacao: string;
};

type RealEntryInput = {
  produto: ProdutoCurado;
  area: ConteudoCurado["area"];
  cargoSlug: string;
  cargo: string;
  disciplina: string;
  assunto: string;
  topicoEdital?: string;
  modulo: string;
  titulo: string;
  canal: string;
  url: string;
  duracao?: string;
  status?: Exclude<CuradoriaVideoStatus, "PENDENTE DE CURADORIA">;
  validacao?: Exclude<CuradoriaValidacao, "pendente">;
  tipo?: ConteudoRelacionadoTipo;
  observacao: string;
};

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function createRealEntry(input: RealEntryInput): ConteudoCurado {
  return {
    id: `${input.cargoSlug}-${slugify(input.modulo)}-${slugify(input.assunto)}-${slugify(input.titulo)}`,
    produto: input.produto,
    area: input.area,
    cargoSlug: input.cargoSlug,
    cargo: input.cargo,
    disciplina: input.disciplina,
    assunto: input.assunto,
    topicoEdital: input.topicoEdital ?? input.assunto,
    modulo: input.modulo,
    tipo: input.tipo ?? "video",
    titulo: input.titulo,
    canal: input.canal,
    url: input.url,
    duracao: input.duracao ?? "PENDENTE DE CURADORIA",
    status: input.status ?? "essencial",
    validacao: input.validacao ?? "validado",
    observacao: input.observacao,
  };
}

const trackMap = new Map(getAllTracks().map((track) => [track.slug, track]));

const operacionaisBase = [
  "auxiliar-servicos-gerais",
  "merendeira",
  "motorista",
  "operador-maquinas",
  "vigia",
] as const;

const saudeBase = ["auxiliar-de-cuidador", "cuidador", "tecnico-enfermagem"] as const;
const magisterioBase = [
  "conhecimentos-pedagogicos",
  "pedagogo",
  "educacao-infantil",
  "series-iniciais",
  "aee-visual",
  "aee-auditiva",
  "sala-recursos",
  "professor-arte",
  "professor-ciencias",
  "professor-educacao-fisica",
  "professor-geografia",
  "professor-historia",
  "professor-ingles",
  "professor-lingua-portuguesa",
  "professor-matematica",
] as const;

function forTrackSlugs(
  slugs: readonly string[],
  builder: (track: NonNullable<ReturnType<typeof trackMap.get>>) => Omit<RealEntryInput, "produto" | "area" | "cargoSlug" | "cargo">
) {
  return slugs
    .map((slug) => trackMap.get(slug))
    .filter((track): track is NonNullable<typeof track> => Boolean(track))
    .map((track) =>
      createRealEntry({
        produto: "aprova-agua-doce",
        area: track.area,
        cargoSlug: track.slug,
        cargo: track.titulo,
        ...builder(track),
      }),
    );
}

const realEntries: ConteudoCurado[] = [
  ...forTrackSlugs(operacionaisBase, () => ({
    disciplina: "Lingua Portuguesa",
    assunto: "Interpretacao de texto",
    modulo: "Portugues",
    titulo: "Compreensao e Interpretacao de Texto - Revisao Enem com Prof. Noslen",
    canal: "Professor Noslen",
    url: "https://www.youtube.com/watch?v=XsN0e_xPyNI",
    status: "essencial",
    observacao: "Video principal para leitura, ideia central e interpretacao objetiva em prova.",
  })),
  ...forTrackSlugs(operacionaisBase, () => ({
    disciplina: "Matematica Basica",
    assunto: "Regra de tres",
    modulo: "Matematica",
    titulo: "Regra de tres composta",
    canal: "Professor Ferretto",
    url: "https://www.youtube.com/watch?v=buYey1YGJhA",
    status: "essencial",
    observacao: "Bom apoio para calculo proporcional cobrado em situacoes praticas de prova.",
  })),
  ...forTrackSlugs(["motorista"], () => ({
    disciplina: "Conhecimentos Especificos",
    assunto: "Direcao defensiva",
    modulo: "Especificos",
    titulo: "Direcao Defensiva R2 Legenda",
    canal: "PENDENTE DE CURADORIA",
    url: "https://www.youtube.com/watch?v=5QatfhBiyv0",
    status: "recomendado",
    observacao: "Referencia util para direcao defensiva e postura preventiva antes do estudo do CTB.",
  })),
  ...forTrackSlugs(["merendeira"], () => ({
    disciplina: "Conhecimentos Especificos",
    assunto: "Higiene e manipulacao",
    modulo: "Especificos",
    titulo: "Aula 2 - Higiene e Manipulacao",
    canal: "Chefe du Gastronomia",
    url: "https://www.youtube.com/watch?v=h0Hi2D-QEZM",
    status: "recomendado",
    observacao: "Ajuda a ligar a apostila de merenda escolar a higiene, armazenamento e preparo.",
  })),
  ...forTrackSlugs(saudeBase, () => ({
    disciplina: "Lingua Portuguesa",
    assunto: "Coesao e coerencia",
    modulo: "Portugues",
    titulo: "Coesao e coerencia",
    canal: "Professor Noslen",
    url: "https://www.youtube.com/watch?v=IIU6i3UXyi0",
    status: "recomendado",
    observacao: "Boa revisao para clareza textual e leitura funcional em comandos e procedimentos.",
  })),
  ...forTrackSlugs(["cuidador", "tecnico-enfermagem"], () => ({
    disciplina: "Informatica Basica",
    assunto: "Prioridades de informatica",
    modulo: "Informatica",
    titulo: "Concurso INSS: 2 assuntos mais importantes de Informatica",
    canal: "Prof. Victor Dalton",
    url: "https://www.youtube.com/watch?v=-zUXoFdujAk",
    duracao: "20:21",
    status: "essencial",
    observacao: "Curadoria objetiva para revisar conceitos recorrentes de informatica em prova municipal.",
  })),
  ...forTrackSlugs(["cuidador", "tecnico-enfermagem"], () => ({
    disciplina: "Informatica Basica",
    assunto: "Revisao guiada",
    modulo: "Informatica",
    titulo: "Concurso INSS: Curso Gratuito - Informatica com Prof. Victor Dalton",
    canal: "Prof. Victor Dalton",
    url: "https://youtu.be/Cltkn_qOo_M",
    duracao: "22:28",
    status: "recomendado",
    observacao: "Complementa a apostila com revisao guiada e linguagem clara para informatica basica.",
  })),
  ...forTrackSlugs(["tecnico-enfermagem"], () => ({
    disciplina: "Saude Publica e SUS",
    assunto: "Lei Organica do SUS",
    modulo: "SUS",
    titulo: "LEI ORGANICA DO SUS - PARA CONCURSO - AULA COMPLETA 2023",
    canal: "Leo Sobraal",
    url: "https://www.youtube.com/watch?v=4JvFFs89kSg",
    duracao: "14:18",
    status: "essencial",
    observacao: "Video principal para principios, organizacao e estrutura do SUS antes das questoes.",
  })),
  ...forTrackSlugs(["tecnico-enfermagem"], () => ({
    disciplina: "Conhecimentos Especificos de Enfermagem",
    assunto: "Lei do exercicio profissional",
    modulo: "Especificos",
    titulo: "Lei 7498/86 (Lei do Exercicio Profissional da Enfermagem) - Aula Completa",
    canal: "PENDENTE DE CURADORIA",
    url: "https://www.youtube.com/watch?v=qK-5EvKmJM8",
    status: "recomendado",
    observacao: "Referencia para ligar fundamentos legais ao bloco tecnico do cargo.",
  })),
  ...forTrackSlugs(magisterioBase, () => ({
    disciplina: "Conhecimentos Pedagogicos",
    assunto: "Piaget, Vygotsky e Wallon",
    modulo: "Pedagogicos",
    titulo: "Piaget, Vygotsky e Wallon | Pedagogia para Concurso",
    canal: "Pedagogia para Concurso",
    url: "https://www.youtube.com/watch?v=xDppf7mJqLw",
    status: "essencial",
    observacao: "Sintetiza teorias cobradas em concursos e conversa bem com a apostila pedagogica.",
  })),
  ...forTrackSlugs(magisterioBase, () => ({
    disciplina: "Informatica",
    assunto: "Revisao de informatica",
    modulo: "Informatica",
    titulo: "Concurso INSS: Curso Gratuito - Informatica com Prof. Victor Dalton",
    canal: "Prof. Victor Dalton",
    url: "https://youtu.be/Cltkn_qOo_M",
    duracao: "22:28",
    status: "recomendado",
    observacao: "Revisao transversal de informatica para apoio aos cargos do magisterio.",
  })),
  ...forTrackSlugs(["educacao-infantil"], () => ({
    disciplina: "Educacao Infantil",
    assunto: "BNCC na educacao infantil",
    modulo: "Especificos",
    titulo: "BNCC EDUCACAO INFANTIL | O MELHOR resumo para CONCURSOS PUBLICOS",
    canal: "Professora Sara Filpo",
    url: "https://www.youtube.com/watch?v=8h14IN1yWtM",
    status: "essencial",
    observacao: "Encaixa com os eixos de experiencia, planejamento e intencionalidade da etapa.",
  })),
  ...forTrackSlugs(["series-iniciais"], () => ({
    disciplina: "Series Iniciais",
    assunto: "Alfabetizacao e letramento",
    modulo: "Especificos",
    titulo: "ALFABETIZACAO E LETRAMENTO - TEORIA E EXERCICIOS",
    canal: "Professora Kecia Montezuma",
    url: "https://www.youtube.com/watch?v=NfZDAIUQKy0",
    status: "essencial",
    observacao: "Ajuda a transformar teoria de alfabetizacao em leitura aplicada para questoes.",
  })),
  createRealEntry({
    produto: "pmes",
    area: "pmes",
    cargoSlug: "pmes-portugues",
    cargo: "PMES - Portugues",
    disciplina: "Portugues",
    assunto: "Interpretacao de texto",
    modulo: "Portugues",
    titulo: "Compreensao e Interpretacao de Texto - Revisao Enem com Prof. Noslen",
    canal: "Professor Noslen",
    url: "https://www.youtube.com/watch?v=XsN0e_xPyNI",
    status: "essencial",
    observacao: "Base segura para leitura e interpretacao, util para alinhamento inicial da trilha PMES.",
  }),
  createRealEntry({
    produto: "pmes",
    area: "pmes",
    cargoSlug: "pmes-matematica",
    cargo: "PMES - Matematica",
    disciplina: "Matematica",
    assunto: "Razoes, proporcoes e regra de tres",
    modulo: "Matematica",
    titulo: "Razoes, Proporcoes e Regra de Tres",
    canal: "Professor Ferretto",
    url: "https://www.youtube.com/watch?v=9WlYzMt9pjU",
    status: "essencial",
    observacao: "Boa base para calculo e problemas proporcionais em preparacao PMES.",
  }),
  createRealEntry({
    produto: "pmes",
    area: "pmes",
    cargoSlug: "pmes-historia",
    cargo: "PMES - Historia",
    disciplina: "Historia",
    assunto: "Republica da Espada",
    modulo: "Historia",
    titulo: "A REPUBLICA DA ESPADA: MARECHAL DEODORO DA FONSECA",
    canal: "Parabolica",
    url: "https://www.youtube.com/watch?v=L45a22TdAJg",
    status: "recomendado",
    observacao: "Curadoria inicial de Historia para a frente IDECAN com foco em revisao contextual.",
  }),
  createRealEntry({
    produto: "pmes",
    area: "pmes",
    cargoSlug: "pmes-geografia",
    cargo: "PMES - Geografia",
    disciplina: "Geografia",
    assunto: "Urbanizacao",
    modulo: "Geografia",
    titulo: "Urbanizacao: conceitos basicos",
    canal: "PENDENTE DE CURADORIA",
    url: "https://www.youtube.com/watch?v=RN8cUrVKwgU",
    status: "recomendado",
    observacao: "Boa ponte para topicos de organizacao do espaco e leitura territorial.",
  }),
  createRealEntry({
    produto: "pmes",
    area: "pmes",
    cargoSlug: "pmes-geografia",
    cargo: "PMES - Geografia",
    disciplina: "Geografia",
    assunto: "Biomas do Brasil",
    modulo: "Geografia",
    titulo: "Biomas do Brasil (part 1)",
    canal: "Geobrasil",
    url: "https://www.youtube.com/watch?v=WsWKLRkeyHA",
    status: "complementar",
    observacao: "Complemento de Geografia fisica util para repertorio e revisao tematica.",
  }),
  createRealEntry({
    produto: "pmes",
    area: "pmes",
    cargoSlug: "pmes-redacao",
    cargo: "PMES - Redacao",
    disciplina: "Redacao",
    assunto: "Estrutura de redacao",
    modulo: "Redacao",
    titulo: "Estrutura para REDACAO de concurso NOTA MAXIMA!",
    canal: "Profinho",
    url: "https://www.youtube.com/watch?v=_0VjL4aVrJo",
    status: "essencial",
    observacao: "Ponto de partida para estrutura, organizacao de paragrafos e estrategia de prova.",
  }),
  createRealEntry({
    produto: "redacao",
    area: "redacao",
    cargoSlug: "redacao-enem",
    cargo: "Redacao - ENEM",
    disciplina: "Redacao",
    assunto: "Lidando com temas",
    modulo: "Tema",
    titulo: "COMO ESCREVER REDACAO SEM SABER NADA SOBRE O TEMA",
    canal: "Debora Aladim",
    url: "https://www.youtube.com/watch?v=4abKDAVR06I",
    status: "recomendado",
    observacao: "Bom apoio para destravar repertorio, leitura do tema e encaminhamento da escrita.",
  }),
  createRealEntry({
    produto: "redacao",
    area: "redacao",
    cargoSlug: "redacao-concursos",
    cargo: "Redacao - Concursos",
    disciplina: "Redacao",
    assunto: "Estrutura",
    modulo: "Orientacao",
    titulo: "Estrutura para REDACAO de concurso NOTA MAXIMA!",
    canal: "Profinho",
    url: "https://www.youtube.com/watch?v=_0VjL4aVrJo",
    status: "essencial",
    observacao: "Video principal para orientar estrutura de redacao voltada a concursos.",
  }),
];

const uniqueRealEntries = realEntries.filter(
  (entry, index, array) => array.findIndex((candidate) => candidate.id === entry.id) === index,
);

function buildPendingEntries() {
  return getAllTracks().flatMap((track) =>
    track.materiais
      .filter((material) => !uniqueRealEntries.some((entry) => entry.cargoSlug === track.slug && entry.modulo === material.modulo))
      .map((material) => ({
        id: `${track.slug}-${slugify(material.modulo)}-pendente`,
        produto: "aprova-agua-doce",
        area: track.area,
        cargoSlug: track.slug,
        cargo: track.titulo,
        disciplina: material.titulo,
        assunto: material.resumo,
        topicoEdital: material.titulo,
        modulo: material.modulo,
        tipo: "video",
        titulo: "PENDENTE DE CURADORIA",
        canal: "PENDENTE DE CURADORIA",
        url: null,
        duracao: "PENDENTE DE CURADORIA",
        status: "PENDENTE DE CURADORIA",
        validacao: "pendente",
        observacao: `Ainda falta validar um video alinhado ao modulo ${material.modulo} para ${track.titulo}.`,
      } satisfies ConteudoCurado)),
  );
}

const pmesPendingEntries: ConteudoCurado[] = [
  {
    id: "pmes-raciocinio-logico-pendente",
    produto: "pmes",
    area: "pmes",
    cargoSlug: "pmes-raciocinio-logico",
    cargo: "PMES - Raciocinio Logico",
    disciplina: "Raciocinio Logico",
    assunto: "Base de logica para banca IDECAN",
    topicoEdital: "Raciocinio Logico e Matematico",
    modulo: "Raciocinio Logico",
    tipo: "video",
    titulo: "PENDENTE DE CURADORIA",
    canal: "PENDENTE DE CURADORIA",
    url: null,
    duracao: "PENDENTE DE CURADORIA",
    status: "PENDENTE DE CURADORIA",
    validacao: "pendente",
    observacao: "Ainda falta validar uma aula realmente aderente a raciocinio logico com perfil de concurso policial.",
  },
  {
    id: "pmes-informatica-pendente",
    produto: "pmes",
    area: "pmes",
    cargoSlug: "pmes-informatica",
    cargo: "PMES - Informatica",
    disciplina: "Informatica",
    assunto: "Base de informatica com foco em prova objetiva",
    topicoEdital: "Conteudo complementar",
    modulo: "Informatica",
    tipo: "video",
    titulo: "PENDENTE DE CURADORIA",
    canal: "PENDENTE DE CURADORIA",
    url: null,
    duracao: "PENDENTE DE CURADORIA",
    status: "PENDENTE DE CURADORIA",
    validacao: "substituir",
    observacao: "Ainda falta validar uma aula segura de informatica com linguagem acessivel e foco de concurso.",
  },
  {
    id: "pmes-legislacao-pendente",
    produto: "pmes",
    area: "pmes",
    cargoSlug: "pmes-legislacao",
    cargo: "PMES - Legislacao",
    disciplina: "Legislacao",
    assunto: "Leitura inicial das bases legais da prova",
    topicoEdital: "Conteudo complementar",
    modulo: "Legislacao",
    tipo: "video",
    titulo: "PENDENTE DE CURADORIA",
    canal: "PENDENTE DE CURADORIA",
    url: null,
    duracao: "PENDENTE DE CURADORIA",
    status: "PENDENTE DE CURADORIA",
    validacao: "substituir",
    observacao: "Ainda falta validar um professor com boa didatica para legislacao em concursos policiais.",
  },
  {
    id: "pmes-direitos-humanos-pendente",
    produto: "pmes",
    area: "pmes",
    cargoSlug: "pmes-direitos-humanos",
    cargo: "PMES - Direitos Humanos",
    disciplina: "Direitos Humanos",
    assunto: "Fundamentos e aplicacao na atuacao policial",
    topicoEdital: "Conteudo complementar",
    modulo: "Direitos Humanos",
    tipo: "video",
    titulo: "PENDENTE DE CURADORIA",
    canal: "PENDENTE DE CURADORIA",
    url: null,
    duracao: "PENDENTE DE CURADORIA",
    status: "PENDENTE DE CURADORIA",
    validacao: "substituir",
    observacao: "Ainda falta validar uma aula introdutoria forte para direitos humanos no contexto policial.",
  },
  {
    id: "pmes-atualidades-pendente",
    produto: "pmes",
    area: "pmes",
    cargoSlug: "pmes-atualidades",
    cargo: "PMES - Atualidades",
    disciplina: "Atualidades",
    assunto: "Leitura de temas quentes para prova",
    topicoEdital: "Conteudo complementar",
    modulo: "Atualidades",
    tipo: "video",
    titulo: "PENDENTE DE CURADORIA",
    canal: "PENDENTE DE CURADORIA",
    url: null,
    duracao: "PENDENTE DE CURADORIA",
    status: "PENDENTE DE CURADORIA",
    validacao: "substituir",
    observacao: "Ainda falta validar uma curadoria enxuta de atualidades com boa leitura de contexto para concurso.",
  },
];

const redacaoPendingEntries: ConteudoCurado[] = [
  {
    id: "redacao-enem-poxa-lulu-pendente",
    produto: "redacao",
    area: "redacao",
    cargoSlug: "redacao-enem-pendentes",
    cargo: "Redacao - ENEM",
    disciplina: "Redacao",
    assunto: "Repertorio e construcao do texto",
    topicoEdital: "Redacao ENEM",
    modulo: "Video explicativo",
    tipo: "video",
    titulo: "Poxa Lulu - video em validacao",
    canal: "Poxa Lulu",
    url: null,
    duracao: "PENDENTE DE CURADORIA",
    status: "PENDENTE DE CURADORIA",
    validacao: "pendente",
    observacao: "Especialista mapeada para ENEM. Ainda falta validar um video especifico para integrar na plataforma.",
  },
  {
    id: "redacao-municipais-modelo-pendente",
    produto: "redacao",
    area: "redacao",
    cargoSlug: "redacao-concursos-pendentes",
    cargo: "Redacao - Concursos",
    disciplina: "Redacao",
    assunto: "Modelo comentado",
    topicoEdital: "Redacao Concursos",
    modulo: "Modelo",
    tipo: "video",
    titulo: "PENDENTE DE CURADORIA",
    canal: "PENDENTE DE CURADORIA",
    url: null,
    duracao: "PENDENTE DE CURADORIA",
    status: "PENDENTE DE CURADORIA",
    validacao: "pendente",
    observacao: "Ainda falta validar um video-modelo realmente consistente para redacao de concursos municipais.",
  },
  {
    id: "redacao-concursos-discursiva-pendente",
    produto: "redacao",
    area: "redacao",
    cargoSlug: "redacao-concursos-pendentes",
    cargo: "Redacao - Concursos",
    disciplina: "Redacao",
    assunto: "Discursiva para concursos policiais e municipais",
    topicoEdital: "Redacao Concursos",
    modulo: "Video explicativo",
    tipo: "video",
    titulo: "Especialista de discursiva em validacao",
    canal: "PENDENTE DE CURADORIA",
    url: null,
    duracao: "PENDENTE DE CURADORIA",
    status: "PENDENTE DE CURADORIA",
    validacao: "pendente",
    observacao: "Ainda falta validar um especialista com foco claro em discursivas de concursos e banca.",
  },
];

export const conteudosCurados: ConteudoCurado[] = [
  ...uniqueRealEntries,
  ...buildPendingEntries(),
  ...pmesPendingEntries,
  ...redacaoPendingEntries,
];

export function getConteudosByCargoSlug(cargoSlug: string, tipo?: ConteudoRelacionadoTipo) {
  const filtered = conteudosCurados.filter((item) => item.cargoSlug === cargoSlug);
  return tipo ? filtered.filter((item) => item.tipo === tipo) : filtered;
}

export function getConteudosByProduto(produto: ProdutoCurado) {
  return conteudosCurados.filter((item) => item.produto === produto);
}

export function getVideosByCargoAndModulo(cargoSlug: string, modulo: string) {
  return conteudosCurados.filter((item) => item.cargoSlug === cargoSlug && item.modulo === modulo);
}

export function getVideosOverview() {
  const reais = conteudosCurados.filter((item) => item.url);
  const pendentes = conteudosCurados.filter((item) => item.status === "PENDENTE DE CURADORIA");
  const disciplinas = new Set(reais.map((item) => `${item.cargoSlug}:${item.disciplina}`));
  const cargos = new Set(reais.map((item) => item.cargoSlug));

  return {
    total: conteudosCurados.length,
    reais: reais.length,
    pendentes: pendentes.length,
    disciplinasCobertas: disciplinas.size,
    cargosCobertos: cargos.size,
  };
}

export function getCuradoriaCoverage(produto?: ProdutoCurado) {
  const base = produto ? getConteudosByProduto(produto) : conteudosCurados;

  return {
    total: base.length,
    validados: base.filter((item) => item.validacao === "validado").length,
    pendentes: base.filter((item) => item.validacao === "pendente").length,
    substituir: base.filter((item) => item.validacao === "substituir").length,
    comUrl: base.filter((item) => Boolean(item.url)).length,
    semUrl: base.filter((item) => !item.url).length,
  };
}

export type CuradoriaBaseStatus = "VALIDADO_USUARIO";
export type CuradoriaUso = "aula_principal" | "reforco" | "questoes" | "revisao" | "complementar";
export type CuradoriaEmbedStatus = "embed_disponivel" | "link_pendente" | "sem_embed";
export type CuradoriaProduto =
  | "agua-doce"
  | "pmes"
  | "enem"
  | "redacao-enem"
  | "redacao-concursos"
  | "canais-coringa";

export type CuradoriaVideoValidada = {
  id: string;
  produto: CuradoriaProduto;
  disciplina: string;
  assunto: string;
  microassunto: string;
  canal: string;
  cargo: string;
  nivel: "base" | "intermediario" | "avancado" | "revisao";
  playlistVideoEspecifico: string | null;
  linkDescricao: string;
  indicadores: string[];
  duracaoMedia?: string;
  status: CuradoriaBaseStatus;
  observacaoPedagogica: string;
  usoRecomendado: CuradoriaUso;
  embedStatus: CuradoriaEmbedStatus;
};

type SeriesConfig = {
  produto: CuradoriaProduto;
  disciplina: string;
  assunto: string;
  cargo: string;
  nivel: CuradoriaVideoValidada["nivel"];
  canais: string[];
  microassuntos: string[];
  usoRecomendado: CuradoriaUso;
  indicadores: string[];
  duracaoMedia?: string;
  knownUrls?: Record<string, string>;
  observacaoPedagogica: string;
  linkDescricao: string;
};

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildYoutubeSearchUrl(channel: string, disciplina: string, microassunto: string) {
  const query = encodeURIComponent(`${channel} ${disciplina} ${microassunto}`);
  return `https://www.youtube.com/results?search_query=${query}`;
}

function buildSeries(config: SeriesConfig) {
  return config.microassuntos.map((microassunto, index) => {
    const canal = config.canais[index % config.canais.length];
    const url = config.knownUrls?.[microassunto] ?? buildYoutubeSearchUrl(canal, config.disciplina, microassunto);
    const embedStatus = config.knownUrls?.[microassunto] ? "embed_disponivel" : "sem_embed";

    return {
      id: `${config.produto}-${slugify(config.disciplina)}-${slugify(microassunto)}`,
      produto: config.produto,
      disciplina: config.disciplina,
      assunto: config.assunto,
      microassunto,
      canal,
      cargo: config.cargo,
      nivel: config.nivel,
      playlistVideoEspecifico: url,
      linkDescricao: config.linkDescricao,
      indicadores: config.indicadores,
      duracaoMedia: config.duracaoMedia,
      status: "VALIDADO_USUARIO" as const,
      observacaoPedagogica: config.observacaoPedagogica,
      usoRecomendado: config.usoRecomendado,
      embedStatus,
    } satisfies CuradoriaVideoValidada;
  });
}

const pmesPortugues = [
  "interpretacao",
  "tipologia textual",
  "generos textuais",
  "variacao linguistica",
  "funcoes da linguagem",
  "semantica",
  "sinonimia",
  "antonimia",
  "hiperonimia",
  "hiponimia",
  "norma ortografica",
  "morfossintaxe",
  "classes de palavras",
  "substantivo",
  "adjetivo",
  "artigo",
  "pronome",
  "adverbio",
  "preposicao",
  "conjuncao",
  "interjeicao",
  "numeral",
  "verbo",
  "concordancia verbal",
  "concordancia nominal",
  "regencia verbal",
  "regencia nominal",
  "crase",
  "colocacao pronominal",
  "sintaxe",
  "periodo simples",
  "periodo composto",
  "coordenacao",
  "subordinacao",
  "pontuacao",
  "fonetica",
  "encontros vocalicos",
  "encontros consonantais",
  "digrafos",
  "formacao de palavras",
] as const;

const pmesRlm = [
  "proposicoes logicas",
  "conectivos",
  "tabela verdade",
  "equivalencia logica",
  "argumentacao logica",
  "diagramas logicos",
  "sequencias",
  "resolucao de problemas",
  "numeros",
  "fracoes",
  "decimais",
  "porcentagem",
  "razao",
  "proporcao",
  "regra de tres",
  "algebra",
  "equacoes",
  "sistemas",
  "geometria",
  "trigonometria basica",
  "estatistica",
  "probabilidade",
  "matematica financeira",
] as const;

const pmesHistoria = [
  "brasil colonial",
  "chegada dos portugueses",
  "independencia",
  "primeiro reinado",
  "segundo reinado",
  "republica velha",
  "era vargas",
  "ditadura militar",
  "redemocratizacao",
  "historia contemporanea",
  "movimentos sociais",
  "historia economica e social",
  "colonizacao do espirito santo",
  "ciclo do ouro",
  "ciclo do cafe",
  "espirito santo na independencia e republica",
  "conflitos regionais",
  "cultura e patrimonio do ES",
] as const;

const pmesGeografia = [
  "geografia geral",
  "dinamica da litosfera",
  "continentes e oceanos",
  "relevo terrestre",
  "minerais e rochas",
  "relevo brasileiro",
  "hidrografia do brasil",
  "clima e biomas brasileiros",
  "relevo e geomorfologia do ES",
  "localizacao e divisao territorial do ES",
  "municipios e microrregioes",
  "clima e vegetacao do ES",
  "recursos hidricos",
  "bacias hidrograficas",
  "aspectos economicos e sociais do ES",
  "infraestrutura e transportes",
  "turismo",
  "sustentabilidade",
  "questoes ambientais",
] as const;

const pmesRedacao = [
  "estrutura dissertativa",
  "leitura do comando",
  "tese",
  "argumentacao",
  "objetividade",
  "clareza",
  "coesao",
  "gramatica",
  "proposta adequada",
  "escrita manuscrita",
] as const;

const aguaBasePortugues = [
  "interpretacao",
  "ortografia",
  "classes de palavras",
  "concordancia",
  "regencia",
  "crase",
  "pontuacao",
  "semantica",
] as const;

const aguaBaseMatematica = [
  "operacoes basicas",
  "fracoes",
  "decimais",
  "porcentagem",
  "razao e proporcao",
  "regra de tres",
  "medidas",
  "problemas do cotidiano",
] as const;

const aguaBaseInformatica = [
  "windows",
  "word",
  "excel",
  "internet",
  "seguranca digital",
  "organizacao de arquivos",
] as const;

const aguaEducacao = [
  "LDB - principios",
  "LDB - organizacao da educacao",
  "ECA - direitos da crianca",
  "ECA - protecao integral",
  "BNCC - competencias gerais",
  "BNCC - campos de experiencia",
  "PNE - metas",
  "PNE - estrategias",
  "gestao democratica",
  "avaliacao escolar",
  "educacao infantil - planejamento",
  "educacao infantil - interacoes e brincadeiras",
  "educacao especial - inclusao",
  "educacao especial - acessibilidade",
  "sala de recursos - AEE",
  "sala de recursos - tecnologias assistivas",
  "series iniciais - alfabetizacao",
  "series iniciais - letramento",
  "series iniciais - matematica inicial",
  "series iniciais - avaliacao formativa",
] as const;

const aguaSaude = [
  "SUS - principios",
  "SUS - organizacao",
  "lei 8.080/90",
  "lei 8.142/90",
  "saude publica",
  "atencao basica",
  "tecnico em enfermagem - fundamentos",
  "tecnico em enfermagem - procedimentos",
  "biosseguranca",
  "anotacoes e registros",
] as const;

const aguaOperacionais = [
  "servicos gerais - limpeza e conservacao",
  "merendeira - higiene e manipulacao",
  "merendeira - armazenamento",
  "motorista - direcao defensiva",
  "motorista - primeiros socorros",
  "operador de maquinas - seguranca operacional",
  "operador de maquinas - manutencao preventiva",
  "vigia - controle de acesso",
  "vigia - postura preventiva",
  "cuidador infantil - acolhimento e rotina",
] as const;

const enemLinguagens = [
  "interpretacao textual",
  "generos textuais",
  "funcoes da linguagem",
  "variedade linguistica",
  "literatura brasileira",
  "leitura de imagem e linguagem mista",
] as const;

const enemMatematica = [
  "porcentagem",
  "regra de tres",
  "funcao afim",
  "geometria plana",
  "estatistica",
  "probabilidade",
] as const;

const enemHumanas = [
  "historia do brasil",
  "historia contemporanea",
  "geopolitica",
  "cidadania e democracia",
  "sociologia do trabalho",
  "filosofia politica",
] as const;

const enemNatureza = [
  "ecologia",
  "genetica",
  "eletrodinamica",
  "estequiometria",
  "saude publica",
  "meio ambiente",
] as const;

const redacaoEnemMicro = [
  "estrutura do texto",
  "competencia 1",
  "competencia 2",
  "competencia 3",
  "competencia 4",
  "competencia 5",
  "repertorio",
  "coesao",
  "proposta de intervencao",
  "analise de temas",
  "modelos nota alta",
] as const;

const redacaoConcursosMicro = [
  "estrutura da discursiva",
  "leitura do comando",
  "objetividade",
  "clareza",
  "coesao",
  "gramatica",
  "tema e tese",
  "resposta manuscrita",
] as const;

export const curadoriaVideos = [
  ...buildSeries({
    produto: "agua-doce",
    disciplina: "Portugues",
    assunto: "Base comum",
    cargo: "Base comum municipal",
    nivel: "base",
    canais: ["Português com Letícia", "Profª Janaina Arruda", "AlfaCon", "Daniela Tatarin"],
    microassuntos: [...aguaBasePortugues],
    usoRecomendado: "aula_principal",
    indicadores: ["base comum", "municipais", "leitura de enunciado"],
    duracaoMedia: "8-18 min",
    observacaoPedagogica: "Usar para abrir cada microassunto de Portugues antes do bloco de questoes.",
    linkDescricao: "Curadoria oficial inicial validada pelo usuario para concursos municipais.",
  }),
  ...buildSeries({
    produto: "agua-doce",
    disciplina: "Matematica",
    assunto: "Base comum",
    cargo: "Base comum municipal",
    nivel: "base",
    canais: ["Gis com Giz Matemática", "Matemática Rio / Rafael Procópio", "Ferretto Matemática"],
    microassuntos: [...aguaBaseMatematica],
    usoRecomendado: "aula_principal",
    indicadores: ["matematica basica", "resolucao de problemas"],
    duracaoMedia: "10-20 min",
    observacaoPedagogica: "Usar como espinha dorsal da matematica comum dos cargos municipais.",
    linkDescricao: "Curadoria oficial inicial validada pelo usuario para matematica municipal.",
  }),
  ...buildSeries({
    produto: "agua-doce",
    disciplina: "Informatica",
    assunto: "Base comum",
    cargo: "Base comum municipal",
    nivel: "base",
    canais: ["Informática para Concursos"],
    microassuntos: [...aguaBaseInformatica],
    usoRecomendado: "aula_principal",
    indicadores: ["informatica basica", "prova objetiva"],
    duracaoMedia: "8-15 min",
    observacaoPedagogica: "Usar como base comum de informatica antes das revisoes finais.",
    linkDescricao: "Curadoria oficial validada pelo usuario para informatica de concursos.",
  }),
  ...buildSeries({
    produto: "agua-doce",
    disciplina: "Educacao",
    assunto: "Eixo pedagogico",
    cargo: "Educacao",
    nivel: "intermediario",
    canais: [
      "Os Pedagógicos",
      "Prof. Alexandre Siqueira",
      "Prof. Davi",
      "Fabiana Firmino",
      "Concursos para Professores",
      "Pedagogia para Concurseiros",
      "Tanalousa Carreiras Educacionais",
      "Profª Svetlana Ribeiro",
      "Prof. Moisés Castro",
      "Educação Especial Inclusiva",
    ],
    microassuntos: [...aguaEducacao],
    usoRecomendado: "aula_principal",
    indicadores: ["pedagogia", "magisterio", "legislacao educacional"],
    duracaoMedia: "10-20 min",
    observacaoPedagogica: "A base pedagogica deve ser quebrada em microtrilhas por documento legal e por etapa de ensino.",
    linkDescricao: "Curadoria oficial validada pelo usuario para educacao e magisterio.",
  }),
  ...buildSeries({
    produto: "agua-doce",
    disciplina: "Saude",
    assunto: "Saude e SUS",
    cargo: "Saude",
    nivel: "intermediario",
    canais: [
      "RDL Cursos e Treinamentos",
      "Enfermagem e Saúde",
      "Enfermagem Esquematizada",
      "Educaline",
      "ENFrente Enfermagem Continuada",
      "Gran Saúde",
      "Sanar Saúde",
      "Legislação do SUS",
    ],
    microassuntos: [...aguaSaude],
    usoRecomendado: "aula_principal",
    indicadores: ["SUS", "enfermagem", "saude publica"],
    duracaoMedia: "10-18 min",
    observacaoPedagogica: "Usar como trilha tecnica para saude, sempre ligando lei, rotina e questoes aplicadas.",
    linkDescricao: "Curadoria oficial validada pelo usuario para saude e tecnico em enfermagem.",
  }),
  ...buildSeries({
    produto: "agua-doce",
    disciplina: "Operacionais",
    assunto: "Conhecimentos especificos",
    cargo: "Operacionais",
    nivel: "base",
    canais: ["Detonando Questões", "Resolvendo Questões", "IDEAL Questões", "Prof. Chagas Sousa"],
    microassuntos: [...aguaOperacionais],
    usoRecomendado: "questoes",
    indicadores: ["operacionais", "rotina", "questoes comentadas"],
    duracaoMedia: "8-15 min",
    observacaoPedagogica: "Usar para aproximar a teoria da rotina dos cargos operacionais.",
    linkDescricao: "Curadoria oficial validada pelo usuario para cargos operacionais.",
  }),
  ...buildSeries({
    produto: "pmes",
    disciplina: "Portugues",
    assunto: "Conteudo programatico PMES",
    cargo: "PMES",
    nivel: "base",
    canais: ["Português com Letícia", "Professor Noslen", "AlfaCon"],
    microassuntos: [...pmesPortugues],
    usoRecomendado: "aula_principal",
    indicadores: ["PMES", "IDECAN", "portugues"],
    duracaoMedia: "8-18 min",
    knownUrls: {
      interpretacao: "https://www.youtube.com/watch?v=XsN0e_xPyNI",
    },
    observacaoPedagogica: "Portugues PMES deve ser quebrado por microassunto, nunca exibido como playlist gigante.",
    linkDescricao: "Curadoria PMES validada pelo usuario.",
  }),
  ...buildSeries({
    produto: "pmes",
    disciplina: "Raciocinio Logico e Matematico",
    assunto: "Conteudo programatico PMES",
    cargo: "PMES",
    nivel: "base",
    canais: ["Calcule Mais", "Matemática Rio", "AlfaCon", "VALE CONCURSOS"],
    microassuntos: [...pmesRlm],
    usoRecomendado: "aula_principal",
    indicadores: ["PMES", "IDECAN", "RLM"],
    duracaoMedia: "10-20 min",
    observacaoPedagogica: "Usar por blocos de logica e matematica aplicada, mantendo treino frequente de questoes.",
    linkDescricao: "Curadoria PMES validada pelo usuario.",
  }),
  ...buildSeries({
    produto: "pmes",
    disciplina: "Historia",
    assunto: "Conteudo programatico PMES",
    cargo: "PMES",
    nivel: "base",
    canais: ["História em Aulas"],
    microassuntos: [...pmesHistoria],
    usoRecomendado: "aula_principal",
    indicadores: ["PMES", "historia", "Brasil", "ES"],
    duracaoMedia: "10-18 min",
    knownUrls: {
      "republica velha": "https://www.youtube.com/watch?v=L45a22TdAJg",
    },
    observacaoPedagogica: "Separar historia do Brasil e do Espirito Santo por periodos e marcos recorrentes em prova.",
    linkDescricao: "Curadoria PMES validada pelo usuario.",
  }),
  ...buildSeries({
    produto: "pmes",
    disciplina: "Geografia",
    assunto: "Conteudo programatico PMES",
    cargo: "PMES",
    nivel: "base",
    canais: ["Felippe Loureiro"],
    microassuntos: [...pmesGeografia],
    usoRecomendado: "aula_principal",
    indicadores: ["PMES", "geografia", "Brasil", "ES"],
    duracaoMedia: "10-18 min",
    observacaoPedagogica: "A trilha deve separar geografia geral, Brasil e Espirito Santo em microblocos curtos.",
    linkDescricao: "Curadoria PMES validada pelo usuario.",
  }),
  ...buildSeries({
    produto: "pmes",
    disciplina: "Redacao PMES",
    assunto: "Discursiva policial",
    cargo: "PMES",
    nivel: "intermediario",
    canais: ["Redação Online"],
    microassuntos: [...pmesRedacao],
    usoRecomendado: "aula_principal",
    indicadores: ["PMES", "discursiva", "objetividade"],
    duracaoMedia: "8-15 min",
    observacaoPedagogica: "Cada microassunto da redação PMES deve se transformar em treino curto com devolutiva manuscrita.",
    linkDescricao: "Curadoria PMES validada pelo usuario.",
  }),
  ...buildSeries({
    produto: "enem",
    disciplina: "Linguagens",
    assunto: "ENEM geral",
    cargo: "ENEM",
    nivel: "base",
    canais: ["ProEnem", "Professor Noslen", "Enem Gratuito"],
    microassuntos: [...enemLinguagens],
    usoRecomendado: "aula_principal",
    indicadores: ["ENEM", "linguagens"],
    duracaoMedia: "10-18 min",
    observacaoPedagogica: "Abrir por leitura, repertorio e interpretacao antes de misturar com literatura.",
    linkDescricao: "Curadoria ENEM validada pelo usuario.",
  }),
  ...buildSeries({
    produto: "enem",
    disciplina: "Matematica",
    assunto: "ENEM geral",
    cargo: "ENEM",
    nivel: "base",
    canais: ["Ferretto ENEM", "Calcule Mais", "Me Salva ENEM"],
    microassuntos: [...enemMatematica],
    usoRecomendado: "aula_principal",
    indicadores: ["ENEM", "matematica"],
    duracaoMedia: "10-20 min",
    observacaoPedagogica: "Usar em trilha curta de matematica por recorrencia de prova.",
    linkDescricao: "Curadoria ENEM validada pelo usuario.",
  }),
  ...buildSeries({
    produto: "enem",
    disciplina: "Ciencias Humanas",
    assunto: "ENEM geral",
    cargo: "ENEM",
    nivel: "base",
    canais: ["ProEnem", "Débora Aladim", "Enem Gratuito"],
    microassuntos: [...enemHumanas],
    usoRecomendado: "aula_principal",
    indicadores: ["ENEM", "humanas"],
    duracaoMedia: "10-18 min",
    observacaoPedagogica: "Humanas deve ser quebrada por eixo conceitual, com leitura e questoes logo em seguida.",
    linkDescricao: "Curadoria ENEM validada pelo usuario.",
  }),
  ...buildSeries({
    produto: "enem",
    disciplina: "Ciencias da Natureza",
    assunto: "ENEM geral",
    cargo: "ENEM",
    nivel: "base",
    canais: ["Biologia Total / Jubilut", "ProEnem", "Me Salva ENEM"],
    microassuntos: [...enemNatureza],
    usoRecomendado: "aula_principal",
    indicadores: ["ENEM", "natureza"],
    duracaoMedia: "10-18 min",
    observacaoPedagogica: "A trilha deve misturar teoria curta com questoes de interpretacao cientifica.",
    linkDescricao: "Curadoria ENEM validada pelo usuario.",
  }),
  ...buildSeries({
    produto: "redacao-enem",
    disciplina: "Redacao ENEM",
    assunto: "Competencias e escrita",
    cargo: "ENEM",
    nivel: "intermediario",
    canais: ["ProEnem", "Profª Pamba / Redação e Gramática Zica", "Redação Online", "Débora Aladim", "Enem Gratuito", "Professor Noslen"],
    microassuntos: [...redacaoEnemMicro],
    usoRecomendado: "aula_principal",
    indicadores: ["redacao enem", "competencias", "nota 1000"],
    duracaoMedia: "8-18 min",
    knownUrls: {
      "analise de temas": "https://www.youtube.com/watch?v=4abKDAVR06I",
    },
    observacaoPedagogica: "A redacao ENEM precisa funcionar como jornada separada por competencia e por gesto de escrita.",
    linkDescricao: "Curadoria oficial validada pelo usuario para redacao ENEM.",
  }),
  ...buildSeries({
    produto: "redacao-concursos",
    disciplina: "Redacao Concursos",
    assunto: "Discursivas e redacao para provas",
    cargo: "Concursos e PMES",
    nivel: "intermediario",
    canais: ["Redação Online", "AlfaCon"],
    microassuntos: [...redacaoConcursosMicro],
    usoRecomendado: "aula_principal",
    indicadores: ["discursiva", "concursos", "objetividade"],
    duracaoMedia: "8-15 min",
    observacaoPedagogica: "A redação de concursos deve seguir treino curto, objetivo e sempre orientado ao comando.",
    linkDescricao: "Curadoria oficial validada pelo usuario para redacao de concursos.",
  }),
  ...buildSeries({
    produto: "canais-coringa",
    disciplina: "Canais coringas",
    assunto: "Questoes e reforco",
    cargo: "Todos os produtos",
    nivel: "revisao",
    canais: ["Detonando Questões", "Resolvendo Questões", "IDEAL Questões", "VALE CONCURSOS", "AlfaCon"],
    microassuntos: ["revisao final", "questoes comentadas", "simulados guiados", "revisao de banca", "reforco de reta final"],
    usoRecomendado: "revisao",
    indicadores: ["reta final", "questoes", "comentarios"],
    duracaoMedia: "8-15 min",
    observacaoPedagogica: "Esses canais entram como reforco e revisao, nunca como trilha principal isolada.",
    linkDescricao: "Canais coringas validados pelo usuario para uso transversal.",
  }),
] satisfies CuradoriaVideoValidada[];

export function getCuradoriaVideosByProduto(produto: CuradoriaProduto) {
  return curadoriaVideos.filter((item) => item.produto === produto);
}

export function getCuradoriaVideosByDisciplina(disciplina: string) {
  return curadoriaVideos.filter((item) => item.disciplina === disciplina);
}

export function getCuradoriaVideosOverview() {
  const byProduct = Object.fromEntries(
    [...new Set(curadoriaVideos.map((item) => item.produto))].map((produto) => [
      produto,
      curadoriaVideos.filter((item) => item.produto === produto).length,
    ]),
  );

  const byDisciplina = Object.fromEntries(
    [...new Set(curadoriaVideos.map((item) => item.disciplina))].map((disciplina) => [
      disciplina,
      curadoriaVideos.filter((item) => item.disciplina === disciplina).length,
    ]),
  );

  return {
    total: curadoriaVideos.length,
    byProduct,
    byDisciplina,
    validadoUsuario: curadoriaVideos.length,
    embedDisponivel: curadoriaVideos.filter((item) => item.embedStatus === "embed_disponivel").length,
    linkPendente: 0,
    semEmbed: curadoriaVideos.filter((item) => item.embedStatus === "sem_embed").length,
  };
}

export type RedacaoPlano = {
  slug: "essencial" | "intensiva" | "mentoria";
  title: string;
  price: string;
  description: string;
  audience: string;
  turnaround: string;
  features: string[];
};

export type RedacaoLinha = "ENEM" | "Concursos";
export type RedacaoStatus = "recebida" | "em-correcao" | "devolvida";
export type RedacaoTema = {
  title: string;
  context: string;
  proposal: string;
  objective: string;
};

export type EnemBreakdown = {
  c1: number;
  c2: number;
  c3: number;
  c4: number;
  c5: number;
};

export type ConcursoBreakdown = {
  tema: number;
  argumentacao: number;
  estrutura: number;
  gramatica: number;
  coesao: number;
  clareza: number;
  objetividade: number;
};

export type RedacaoSubmission = {
  id: string;
  title: string;
  linha: RedacaoLinha;
  contexto: "ENEM" | "PMES" | "Municipais";
  submittedAt: string;
  status: RedacaoStatus;
  scoreLabel: string;
  devolutiva: string;
  pontosFortes: string[];
  pontosMelhoria: string[];
  errosRecorrentes: string[];
  planoEvolucao: string[];
  proximaMeta: string;
  attachmentRef?: string;
  attachmentName?: string;
  notes?: string;
  enemBreakdown?: EnemBreakdown;
  concursoBreakdown?: ConcursoBreakdown;
};

export type RedacaoTrack = {
  slug: "enem" | "concursos";
  title: string;
  description: string;
  publico: string;
  journey: string[];
  temas: RedacaoTema[];
};

export const redacaoPlanos: RedacaoPlano[] = [
  {
    slug: "essencial",
    title: "Correcao Essencial",
    price: "R$ 19,90",
    description: "Para quem precisa voltar a escrever com rotina e receber orientacao clara.",
    audience: "Aluno que quer comecar sem se perder.",
    turnaround: "Ate 5 dias uteis",
    features: ["2 correcoes por semana", "8 redacoes por mes", "Historico das devolutivas", "Meta da proxima redacao"],
  },
  {
    slug: "intensiva",
    title: "Correcao Intensiva",
    price: "R$ 39,90",
    description: "Para quem quer treinar mais vezes no mes e acelerar a evolucao.",
    audience: "Aluno que quer ritmo forte e retorno frequente.",
    turnaround: "Ate 3 dias uteis",
    features: ["3 correcoes por semana", "12 redacoes por mes", "Checklist de melhoria", "Prioridade na fila de correcao"],
  },
  {
    slug: "mentoria",
    title: "Mentoria de Aprovacao",
    price: "R$ 79,90",
    description: "Para quem quer acompanhamento individual e leitura mais proxima de cada texto.",
    audience: "Aluno que precisa de orientacao passo a passo.",
    turnaround: "Ate 48 horas",
    features: ["Acompanhamento individual", "Plano de evolucao por ciclo", "Correcao comentada", "Meta personalizada"],
  },
];

export const redacaoTracks: RedacaoTrack[] = [
  {
    slug: "enem",
    title: "Redacao ENEM",
    description: "Tema, repertorio, estrutura e proposta de intervencao trabalhados de forma guiada.",
    publico: "Para quem quer subir nota no modelo ENEM.",
    journey: ["Tema", "Orientacao", "Video explicativo", "Modelo", "Envio", "Correcao", "Devolutiva"],
    temas: [
      {
        title: "Desafios da permanencia escolar no Brasil",
        context: "ENEM",
        proposal: "Construa uma tese, dois argumentos e uma proposta de intervencao detalhada.",
        objective: "Avaliar repertorio, organizacao argumentativa e proposta de intervencao.",
      },
      {
        title: "Impactos do uso excessivo de telas na vida escolar",
        context: "ENEM",
        proposal: "Use repertorio simples e mostre causa, efeito e proposta de intervencao.",
        objective: "Avaliar leitura do problema, desenvolvimento e articulacao entre causa e solucao.",
      },
      {
        title: "Os desafios da inclusao social em uma sociedade digital",
        context: "ENEM",
        proposal: "Discuta como tecnologia, acesso e desigualdade afetam a inclusao social no Brasil.",
        objective: "Avaliar tese, repertorio sociocultural, argumentacao e proposta de intervencao.",
      },
      {
        title: "Saude mental da juventude em tempos de hiperconexao",
        context: "ENEM",
        proposal: "Analise fatores que afetam a saude mental de jovens e proponha caminhos de enfrentamento.",
        objective: "Avaliar recorte tematico, progressao argumentativa e capacidade de propor solucao viavel.",
      },
      {
        title: "Seguranca digital e exposicao de adolescentes na internet",
        context: "ENEM",
        proposal: "Discuta riscos, responsabilidades sociais e propostas de protecao no ambiente digital.",
        objective: "Avaliar repertorio sociocultural, leitura do problema e elaboracao de proposta de intervencao.",
      },
      {
        title: "Inteligencia artificial e seus impactos na educacao brasileira",
        context: "ENEM",
        proposal: "Analise oportunidades e desafios do uso da inteligencia artificial no processo de aprendizagem.",
        objective: "Avaliar capacidade de recorte, repertorio contemporaneo e articulacao de argumentos.",
      },
      {
        title: "Caminhos para fortalecer a inclusao social de pessoas com deficiencia",
        context: "ENEM",
        proposal: "Discuta barreiras sociais e medidas que favorecam cidadania e acesso real a direitos.",
        objective: "Avaliar aprofundamento argumentativo e formulacao de proposta de intervencao detalhada.",
      },
      {
        title: "Juventude, trabalho e precarizacao no Brasil contemporaneo",
        context: "ENEM",
        proposal: "Debata como os jovens enfrentam inseguranca no mercado de trabalho e proponha caminhos de enfrentamento.",
        objective: "Avaliar articulacao entre contexto social, argumentos e proposta de intervencao.",
      },
      {
        title: "Meio ambiente e responsabilidade coletiva diante de desastres climaticos",
        context: "ENEM",
        proposal: "Analise como sociedade e poder publico devem agir para prevenir impactos ambientais e sociais.",
        objective: "Avaliar dominio do tema, repertorio e construcao de proposta viavel.",
      },
    ],
  },
  {
    slug: "concursos",
    title: "Redacao Concursos",
    description: "Discursivas, textos de concursos municipais e preparo para concursos policiais.",
    publico: "Para quem precisa responder bem, sem fugir do tema e sem travar na hora da prova.",
    journey: ["Tema", "Leitura do comando", "Video explicativo", "Modelo", "Envio", "Correcao", "Devolutiva"],
    temas: [
      {
        title: "A importancia do atendimento humanizado no servico publico",
        context: "Municipais",
        proposal: "Responda com objetividade, sem fugir do comando, em linguagem formal.",
        objective: "Avaliar aderencia ao tema, objetividade e organizacao da resposta.",
      },
      {
        title: "Seguranca publica e confianca social",
        context: "PMES",
        proposal: "Organize a resposta em introducao, desenvolvimento e fechamento direto.",
        objective: "Avaliar leitura do comando, objetividade, estrutura e coerencia argumentativa.",
      },
      {
        title: "Etica no servico publico e confianca do cidadao",
        context: "Municipais",
        proposal: "Discuta como a conduta etica influencia a relacao entre Estado e sociedade.",
        objective: "Avaliar resposta ao tema, consistencia argumentativa e linguagem formal.",
      },
      {
        title: "Policia comunitaria e prevencao da violencia",
        context: "PMES",
        proposal: "Defenda como a aproximacao entre policia e comunidade pode fortalecer a seguranca publica.",
        objective: "Avaliar foco no contexto policial, objetividade e forca de fechamento.",
      },
      {
        title: "Transparencia e confianca no servico publico municipal",
        context: "Municipais",
        proposal: "Explique como transparencia, prestacao de contas e conduta tecnica afetam a confianca do cidadao.",
        objective: "Avaliar aderencia ao comando, organizacao da resposta e maturidade argumentativa.",
      },
      {
        title: "Saude publica e atendimento digno ao cidadao",
        context: "Municipais",
        proposal: "Discuta como acolhimento, estrutura e gestao interferem no atendimento em servicos publicos de saude.",
        objective: "Avaliar foco tematico, selecao de argumentos e objetividade da resposta.",
      },
      {
        title: "Educacao publica e compromisso com o desenvolvimento local",
        context: "Municipais",
        proposal: "Analise por que a educacao deve ser tratada como prioridade de desenvolvimento e cidadania.",
        objective: "Avaliar consistencia argumentativa, linguagem formal e capacidade de fechamento.",
      },
      {
        title: "Etica policial e respeito aos direitos humanos",
        context: "PMES",
        proposal: "Explique por que a atuacao policial exige equilibrio entre firmeza, legalidade e respeito ao cidadao.",
        objective: "Avaliar foco em seguranca publica, controle argumentativo e objetividade.",
      },
      {
        title: "Tecnologia aplicada a prevencao da violencia urbana",
        context: "PMES",
        proposal: "Discuta como inteligencia, monitoramento e uso responsavel de dados podem apoiar a seguranca publica.",
        objective: "Avaliar repertorio atual, capacidade de analise e pertinencia ao contexto policial.",
      },
      {
        title: "Atendimento ao cidadao e imagem do servico publico",
        context: "Municipais",
        proposal: "Mostre como postura profissional e atendimento respeitoso influenciam a percepcao do poder publico.",
        objective: "Avaliar aderencia ao tema, coesao e construcao de argumento aplicado.",
      },
    ],
  },
];

export const redacaoHistoricoDemo: RedacaoSubmission[] = [
  {
    id: "redacao-demo-01",
    title: "Desafios da permanencia escolar no Brasil",
    linha: "ENEM",
    contexto: "ENEM",
    submittedAt: "2026-06-02",
    status: "devolvida",
    scoreLabel: "620 -> 700 -> 780",
    devolutiva: "Voce melhorou muito a organizacao das ideias. Agora vamos deixar a conclusao mais forte.",
    pontosFortes: ["Boa leitura do tema", "Paragrafos mais organizados", "Proposta de intervencao presente"],
    pontosMelhoria: ["Ampliar repertorio", "Amarrar melhor os conectivos", "Fortalecer a conclusao"],
    errosRecorrentes: ["Conclusao curta demais", "Repertorio pouco explorado"],
    planoEvolucao: [
      "Treinar conclusoes com agente, acao e efeito.",
      "Separar dois repertorios simples antes de escrever.",
      "Reescrever a introducao em 10 linhas para ganhar firmeza.",
    ],
    proximaMeta: "Escrever uma nova conclusao com proposta mais detalhada.",
    enemBreakdown: {
      c1: 160,
      c2: 140,
      c3: 160,
      c4: 140,
      c5: 180,
    },
  },
  {
    id: "redacao-demo-02",
    title: "Seguranca publica e cidadania",
    linha: "Concursos",
    contexto: "PMES",
    submittedAt: "2026-06-04",
    status: "em-correcao",
    scoreLabel: "7,0 -> 8,2 -> 9,1",
    devolutiva: "Texto em leitura. A devolutiva vai focar em objetividade, argumentos e fechamento.",
    pontosFortes: ["Tema aderente ao contexto policial", "Boa divisao de paragrafos"],
    pontosMelhoria: ["Mais objetividade", "Menos repeticao", "Fechamento mais firme"],
    errosRecorrentes: ["Paragrafos alongados", "Repeticao de ideia"],
    planoEvolucao: [
      "Treinar introducao curta com tese direta.",
      "Usar um exemplo por paragrafo em vez de varios.",
      "Encerrar com proposta objetiva e sem rodeios.",
    ],
    proximaMeta: "Treinar introducao curta e desenvolvimento com exemplos mais diretos.",
    concursoBreakdown: {
      tema: 14,
      argumentacao: 18,
      estrutura: 14,
      gramatica: 15,
      coesao: 17,
      clareza: 12,
      objetividade: 10,
    },
  },
  {
    id: "redacao-demo-03",
    title: "A educacao como politica publica local",
    linha: "Concursos",
    contexto: "Municipais",
    submittedAt: "2026-06-05",
    status: "recebida",
    scoreLabel: "Primeira entrega",
    devolutiva: "Envio registrado com sucesso. Vamos corrigir em etapas para mostrar seu crescimento.",
    pontosFortes: ["Tema enviado corretamente"],
    pontosMelhoria: ["Aguardando leitura da equipe"],
    errosRecorrentes: ["Ainda nao avaliado"],
    planoEvolucao: [
      "Releia o comando e destaque as palavras centrais.",
      "Planeje a ordem das ideias antes de reescrever.",
    ],
    proximaMeta: "Enquanto a correcao nao chega, releia o comando e destaque as ideias principais.",
    concursoBreakdown: {
      tema: 0,
      argumentacao: 0,
      estrutura: 0,
      gramatica: 0,
      coesao: 0,
      clareza: 0,
      objetividade: 0,
    },
  },
];

export function getRedacaoOverview() {
  return {
    totalEnvios: redacaoHistoricoDemo.length,
    pendentes: redacaoHistoricoDemo.filter((item) => item.status !== "devolvida").length,
    devolvidas: redacaoHistoricoDemo.filter((item) => item.status === "devolvida").length,
    enem: redacaoHistoricoDemo.filter((item) => item.linha === "ENEM").length,
    concursos: redacaoHistoricoDemo.filter((item) => item.linha === "Concursos").length,
    pmes: redacaoHistoricoDemo.filter((item) => item.contexto === "PMES").length,
    municipais: redacaoHistoricoDemo.filter((item) => item.contexto === "Municipais").length,
  };
}

export function getRedacaoByLinha(linha: RedacaoLinha) {
  return redacaoHistoricoDemo.filter((item) => item.linha === linha);
}

export function getLatestSubmission() {
  return [...redacaoHistoricoDemo].sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))[0];
}

export function getLatestReviewedSubmission() {
  return (
    [...redacaoHistoricoDemo]
      .filter((item) => item.status === "devolvida")
      .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))[0] ?? getLatestSubmission()
  );
}

export function getPreviousSubmissionFromSameLinha(currentId: string, linha: RedacaoLinha) {
  return (
    [...redacaoHistoricoDemo]
      .filter((item) => item.id !== currentId && item.linha === linha)
      .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))[0] ?? null
  );
}

export function getRedacaoTrack(slug: RedacaoTrack["slug"]) {
  return redacaoTracks.find((track) => track.slug === slug) ?? redacaoTracks[0];
}

export function getEnemCompetencyTotal(breakdown?: EnemBreakdown) {
  if (!breakdown) {
    return 0;
  }

  return breakdown.c1 + breakdown.c2 + breakdown.c3 + breakdown.c4 + breakdown.c5;
}

export function getConcursoCriteriaTotal(breakdown?: ConcursoBreakdown) {
  if (!breakdown) {
    return 0;
  }

  return breakdown.tema + breakdown.argumentacao + breakdown.estrutura + breakdown.gramatica + breakdown.coesao + breakdown.clareza + breakdown.objetividade;
}

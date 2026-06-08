export type FlashcardItem = {
  id: string;
  produto: "agua-doce" | "pmes" | "redacao" | "complementar";
  disciplina:
    | "Portugues"
    | "Matematica"
    | "Raciocinio Logico"
    | "Historia"
    | "Geografia"
    | "Redacao"
    | "Direito Constitucional"
    | "Direito Administrativo";
  assunto: string;
  subassunto?: string;
  banca?: "IDECAN" | "IDESG" | "IBADE" | "FGV";
  cargo?: string;
  topicoEdital?: string;
  status: "validado" | "pendente";
  pergunta: string;
  resposta: string;
};

export const flashcards: FlashcardItem[] = [
  {
    id: "pt-01",
    produto: "agua-doce",
    disciplina: "Portugues",
    assunto: "Gramatica basica",
    subassunto: "Uso de mas e mais",
    banca: "IDESG",
    cargo: "Trilhas de base",
    topicoEdital: "Lingua Portuguesa",
    status: "validado",
    pergunta: "Qual a diferenca principal entre mas e mais?",
    resposta: "`Mas` indica oposicao. `Mais` indica quantidade, intensidade ou comparacao.",
  },
  {
    id: "pt-02",
    produto: "agua-doce",
    disciplina: "Portugues",
    assunto: "Interpretacao de texto",
    banca: "IDESG",
    cargo: "Trilhas de base",
    topicoEdital: "Lingua Portuguesa",
    status: "validado",
    pergunta: "O que voce deve fazer primeiro ao interpretar uma questao de texto?",
    resposta: "Ler o comando com calma e localizar a ideia principal antes de olhar as alternativas.",
  },
  {
    id: "mat-01",
    produto: "agua-doce",
    disciplina: "Matematica",
    assunto: "Porcentagem",
    banca: "IDESG",
    cargo: "Trilhas de base",
    topicoEdital: "Matematica Basica",
    status: "validado",
    pergunta: "Como transformar porcentagem em numero decimal?",
    resposta: "Basta dividir o valor por 100. Exemplo: 35% vira 0,35.",
  },
  {
    id: "mat-02",
    produto: "agua-doce",
    disciplina: "Matematica",
    assunto: "Regra de tres",
    banca: "IDESG",
    cargo: "Trilhas de base",
    topicoEdital: "Matematica Basica",
    status: "validado",
    pergunta: "Quando a regra de tres simples e usada?",
    resposta: "Quando duas grandezas mantem relacao direta ou inversa e voce precisa descobrir um valor faltante.",
  },
  {
    id: "rl-01",
    produto: "pmes",
    disciplina: "Raciocinio Logico",
    assunto: "Proposicoes",
    subassunto: "Valor logico",
    banca: "IDECAN",
    cargo: "PMES",
    topicoEdital: "Raciocinio Logico e Matematico",
    status: "validado",
    pergunta: "O que toda proposicao precisa ter?",
    resposta: "Ela precisa poder ser julgada como verdadeira ou falsa.",
  },
  {
    id: "rl-02",
    produto: "pmes",
    disciplina: "Raciocinio Logico",
    assunto: "Sequencias logicas",
    banca: "IDECAN",
    cargo: "PMES",
    topicoEdital: "Raciocinio Logico e Matematico",
    status: "validado",
    pergunta: "Qual e o cuidado principal em sequencias logicas?",
    resposta: "Observar o padrao antes de chutar. Veja se cresce, alterna, soma ou multiplica.",
  },
  {
    id: "pmes-pt-01",
    produto: "pmes",
    disciplina: "Portugues",
    assunto: "Interpretacao de texto",
    subassunto: "Ideia principal",
    banca: "IDECAN",
    cargo: "PMES",
    topicoEdital: "Lingua Portuguesa",
    status: "validado",
    pergunta: "Ao ler um texto de prova, o que voce procura antes de ir para as alternativas?",
    resposta: "A ideia principal do trecho e o que o comando realmente pede. Isso evita marcar alternativa bonita, mas fora do foco.",
  },
  {
    id: "pmes-mat-01",
    produto: "pmes",
    disciplina: "Matematica",
    assunto: "Porcentagem",
    subassunto: "Aumento percentual",
    banca: "IDECAN",
    cargo: "PMES",
    topicoEdital: "Raciocinio Logico e Matematico",
    status: "validado",
    pergunta: "Qual e o cuidado principal em questao de aumento percentual?",
    resposta: "Descobrir primeiro qual e a base de comparacao. Sem isso, a conta pode parecer certa e ainda assim ficar errada.",
  },
  {
    id: "pmes-his-01",
    produto: "pmes",
    disciplina: "Historia",
    assunto: "Republica no Brasil",
    subassunto: "Republica da Espada",
    banca: "IDECAN",
    cargo: "PMES",
    topicoEdital: "Historia do Brasil e do Espirito Santo",
    status: "validado",
    pergunta: "Por que a Republica da Espada costuma aparecer em revisao de Historia?",
    resposta: "Porque marca o inicio da Republica brasileira com forte presenca militar e ajuda a organizar a linha do tempo politica do pais.",
  },
  {
    id: "pmes-geo-01",
    produto: "pmes",
    disciplina: "Geografia",
    assunto: "Urbanizacao",
    subassunto: "Crescimento das cidades",
    banca: "IDECAN",
    cargo: "PMES",
    topicoEdital: "Geografia Geral, do Brasil e do Espirito Santo",
    status: "validado",
    pergunta: "O que vale observar quando a prova fala em urbanizacao?",
    resposta: "Crescimento das cidades, deslocamento da populacao, problemas urbanos e efeitos no espaco geografico.",
  },
  {
    id: "pmes-red-01",
    produto: "pmes",
    disciplina: "Redacao",
    assunto: "Leitura do comando",
    subassunto: "Resposta objetiva",
    banca: "IDECAN",
    cargo: "PMES",
    topicoEdital: "Redacao",
    status: "validado",
    pergunta: "Qual e o primeiro passo antes de escrever uma redacao PMES?",
    resposta: "Grifar o verbo do comando e o tema central. Isso ajuda a nao fugir do assunto e a manter o texto direto.",
  },
  {
    id: "dc-01",
    produto: "complementar",
    disciplina: "Direito Constitucional",
    assunto: "Supremacia constitucional",
    banca: "FGV",
    cargo: "Complementar",
    topicoEdital: "Conteudo complementar",
    status: "pendente",
    pergunta: "O que significa dizer que a Constituicao e a norma suprema?",
    resposta: "Que as demais leis e atos do poder publico precisam respeitar o que ela determina.",
  },
  {
    id: "dc-02",
    produto: "complementar",
    disciplina: "Direito Constitucional",
    assunto: "Direitos fundamentais",
    banca: "FGV",
    cargo: "Complementar",
    topicoEdital: "Conteudo complementar",
    status: "pendente",
    pergunta: "Onde geralmente aparecem os direitos fundamentais na prova?",
    resposta: "Em enunciados sobre liberdade, igualdade, garantias e limites da atuacao estatal.",
  },
  {
    id: "da-01",
    produto: "complementar",
    disciplina: "Direito Administrativo",
    assunto: "Ato administrativo",
    banca: "FGV",
    cargo: "Complementar",
    topicoEdital: "Conteudo complementar",
    status: "pendente",
    pergunta: "O que e ato administrativo?",
    resposta: "E a manifestacao da administracao publica que produz efeitos juridicos dentro da funcao administrativa.",
  },
  {
    id: "da-02",
    produto: "complementar",
    disciplina: "Direito Administrativo",
    assunto: "Principios administrativos",
    banca: "FGV",
    cargo: "Complementar",
    topicoEdital: "Conteudo complementar",
    status: "pendente",
    pergunta: "Por que os principios administrativos sao tao cobrados?",
    resposta: "Porque eles orientam toda a atuacao do poder publico e ajudam a eliminar alternativas erradas.",
  },
];

export function getFlashcardsByProduto(produto: FlashcardItem["produto"]) {
  return flashcards.filter((card) => card.produto === produto);
}

export function getFlashcardsCoverage(produto?: FlashcardItem["produto"]) {
  const base = produto ? getFlashcardsByProduto(produto) : flashcards;

  return {
    total: base.length,
    disciplinas: new Set(base.map((card) => card.disciplina)).size,
    validados: base.filter((card) => card.status === "validado").length,
    pendentes: base.filter((card) => card.status === "pendente").length,
  };
}

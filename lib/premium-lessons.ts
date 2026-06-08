type PremiumQuickQuestion = {
  prompt: string;
  answerGuide: string;
};

export type PremiumLesson = {
  slug: string;
  title: string;
  opening: string;
  objective: string;
  whyItFalls: string;
  explanation: string[];
  example: string;
  commonError: string;
  bankTip: string;
  structuredSummary: string[];
  keepThis: string[];
  miniExercise: string;
  quickQuestions: PremiumQuickQuestion[];
  nextMission: string;
};

type PremiumLessonBundle = {
  label: string;
  lessons: PremiumLesson[];
};

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

const premiumLessonCatalog: Record<string, PremiumLesson> = {
  "interpretacao-textual": {
    slug: "interpretacao-textual",
    title: "Interpretacao textual",
    opening:
      "Se voce ja errou questao porque a alternativa parecia bonita, mas nao respondia exatamente ao texto, esta aula e para voce. Interpretar bem e ler com criterio, nao com pressa.",
    objective:
      "Aprender a localizar a ideia central, diferenciar informacao explicita e implicita, fazer inferencias com seguranca e reconhecer a intencao do autor.",
    whyItFalls:
      "A banca usa interpretacao para medir leitura atenta, fidelidade ao texto e capacidade de escapar de alternativas que distorcem uma palavra ou exageram uma conclusao.",
    explanation: [
      "A ideia central e o eixo do texto. Antes de olhar alternativa, pergunte: do que o texto realmente trata e qual posicao ele constroi sobre esse tema?",
      "Informacao explicita e aquilo que aparece dito no texto. Informacao implicita depende de pistas linguisticas e do encadeamento das ideias. A inferencia correta nasce dessas pistas, nao da opiniao do candidato.",
      "Quando a banca pergunta sobre sentido de palavra no contexto, o foco nao e o dicionario solto. A palavra ganha valor pelo trecho, pelo genero textual e pela intencao de quem escreve.",
      "Alternativas erradas costumam copiar palavras do texto, mas mudar relacoes como causa e consequencia, certeza e possibilidade, opiniao e fato, geral e particular.",
    ],
    example:
      "Se o texto afirma que um projeto ampliou o acesso a leitura, a ideia central pode ser a importancia da politica de incentivo. Nao seria correto concluir, sem apoio textual, que o projeto resolveu todos os problemas da educacao.",
    commonError:
      "Marcar a alternativa que repete trechos literais, mesmo quando ela altera o sentido global do texto ou transforma uma possibilidade em certeza.",
    bankTip:
      "Leia primeiro o comando, depois volte ao texto com um alvo definido: tema, finalidade, inferencia, opiniao do autor ou efeito de determinada expressao.",
    structuredSummary: [
      "Ideia central: tema + posicao predominante do texto.",
      "Explicito: esta escrito de forma direta.",
      "Implicito: depende de pistas e relacoes de sentido.",
      "Inferencia valida: precisa ser sustentada pelo texto.",
      "Palavra em contexto: vale o uso no trecho, nao o sentido isolado.",
    ],
    keepThis: [
      "A melhor resposta e a mais fiel ao texto, nao a mais sofisticada.",
      "Copiar palavras do enunciado nao garante que a alternativa esteja correta.",
      "Interpretacao exige relacao entre partes, nao leitura de frases soltas.",
    ],
    miniExercise:
      "Leia um paragrafo qualquer e responda em tres linhas: qual e a ideia central, qual informacao esta explicita e qual inferencia pode ser feita sem inventar dado.",
    quickQuestions: [
      {
        prompt: "Se uma alternativa amplia demais uma conclusao do texto, ela tende a estar correta ou errada?",
        answerGuide: "Tende a estar errada, porque a banca costuma exagerar o alcance de uma ideia para induzir o candidato.",
      },
      {
        prompt: "Qual a diferenca pratica entre explicito e implicito em prova?",
        answerGuide: "O explicito esta dito; o implicito precisa ser concluido a partir de pistas textuais confiaveis.",
      },
    ],
    nextMission:
      "Na proxima etapa, treine como a organizacao do texto muda a leitura: vamos separar tipo textual de genero textual sem cair em confusao.",
  },
  "tipologia-textual": {
    slug: "tipologia-textual",
    title: "Tipologia textual",
    opening:
      "Muita gente erra tipologia porque mistura nome de texto com modo de organizacao. Vamos limpar isso de uma vez e deixar o reconhecimento bem automatico para a prova.",
    objective:
      "Diferenciar tipo textual de genero textual e reconhecer narracao, descricao, dissertacao, exposicao e injuncao em situacoes de prova.",
    whyItFalls:
      "A banca adora cobrar predominio textual. Ela mistura trechos com mais de um modo de organizacao e pede que o candidato identifique a funcao dominante.",
    explanation: [
      "Tipo textual e o modo de organizacao linguistica predominante. Ele mostra como o texto se construiu para cumprir certa funcao: contar, descrever, explicar, defender uma ideia ou instruir.",
      "Narracao organiza acontecimentos no tempo. Descricao destaca caracteristicas. Dissertacao defende ponto de vista. Exposicao apresenta ou explica informacoes. Injuncao orienta a realizacao de uma acao.",
      "Um mesmo genero pode combinar tipos. Uma reportagem pode trazer descricao e exposicao. Um artigo de opiniao pode usar narracao breve para introduzir um argumento. Em prova, a pergunta normalmente quer o tipo predominante.",
      "Quando a banca troca dissertacao por exposicao, ela quer saber se ha defesa de tese. Se o texto so apresenta informacoes, a tendencia e expositiva. Se sustenta um posicionamento, o nucleo e argumentativo.",
    ],
    example:
      "O texto 'Desligue o aparelho, espere dez segundos e reinicie o sistema' tem predominio injuntivo porque orienta uma acao. Ja 'A leitura amplia repertorio e fortalece a cidadania' aponta para dissertacao argumentativa, pois defende um ponto de vista.",
    commonError:
      "Confundir genero com tipo. Noticia, edital e artigo de opiniao sao generos; narracao, descricao e injuncao sao tipos.",
    bankTip:
      "Pergunte sempre: o que o autor faz predominantemente aqui? Conta, descreve, explica, defende ou instrui? Essa pergunta costuma destravar a questao.",
    structuredSummary: [
      "Tipo textual: modo de organizacao linguistica.",
      "Genero textual: forma social concreta de circulacao do texto.",
      "Narracao: fatos em sequencia.",
      "Descricao: caracteristicas e estados.",
      "Dissertacao: tese e argumentos.",
      "Exposicao: explicacao e apresentacao de informacoes.",
      "Injuncao: orientacao de acao.",
    ],
    keepThis: [
      "A banca geralmente quer o predominio, nao a ausencia total dos outros tipos.",
      "Texto argumentativo precisa ter tese; texto expositivo nao precisa defender posicao.",
      "Instrucao, regulamento e receita costumam puxar para injuncao.",
    ],
    miniExercise:
      "Classifique estes enunciados: 'Era noite e a cidade estava vazia'; 'Apresente seu documento na entrada'; 'A alfabetizacao exige planejamento'. Depois justifique o tipo predominante de cada um.",
    quickQuestions: [
      {
        prompt: "Um regulamento que orienta o comportamento do candidato tem predominio de qual tipo textual?",
        answerGuide: "Injuntivo, porque orienta condutas e procedimentos.",
      },
      {
        prompt: "Se o texto apenas explica um conceito sem defender opiniao, qual e a tendencia?",
        answerGuide: "Predominio expositivo.",
      },
    ],
    nextMission:
      "Agora que o tipo textual ficou claro, a proxima missao e identificar o genero pela finalidade comunicativa e pelo contexto de circulacao.",
  },
  "generos-textuais": {
    slug: "generos-textuais",
    title: "Generos textuais",
    opening:
      "Genero textual nao e um detalhe decorativo. Ele orienta a leitura. Quando voce identifica a finalidade do texto, metade da interpretacao ja fica mais segura.",
    objective:
      "Reconhecer o que e genero textual, diferenciar genero e tipo e identificar noticia, artigo de opiniao, cronica, carta, propaganda, texto instrucional e texto oficial.",
    whyItFalls:
      "A banca cobra genero porque quer saber se o candidato entende finalidade comunicativa, interlocutor, suporte, linguagem e organizacao do texto.",
    explanation: [
      "Genero textual e a forma social concreta em que um texto circula. Ele nasce de uma necessidade comunicativa: informar, convencer, registrar, instruir, pedir, regulamentar ou provocar reflexao.",
      "Diferente do tipo textual, o genero considera a situacao de uso. Uma noticia informa fatos de interesse publico. Um artigo de opiniao defende tese. Uma propaganda busca persuadir. Um texto oficial segue padrao de formalidade e finalidade administrativa.",
      "Para reconhecer o genero, observe quem fala, para quem fala, com que objetivo, em qual suporte e com que marcas de linguagem. Essa leitura funcional vale mais do que decorar lista de nomes.",
      "A banca tambem gosta de misturar genero e efeito de linguagem. Em uma cronica, por exemplo, o cotidiano pode ser usado para criar ironia ou critica social. Em propaganda, a linguagem tende a ser persuasiva e estrategica.",
    ],
    example:
      "Se um texto traz manchete, lide, informacoes objetivas e foco no fato, a tendencia e de noticia. Se apresenta opiniao autoral e organiza argumentos para convencer, aproxima-se de artigo de opiniao.",
    commonError:
      "Identificar o genero apenas pelo tema. Dois textos sobre o mesmo assunto podem ter generos completamente diferentes porque cumprem funcoes diferentes.",
    bankTip:
      "Se estiver em duvida, procure a finalidade comunicativa. Pergunte: este texto quer informar, opinar, instruir, persuadir ou formalizar uma comunicacao?",
    structuredSummary: [
      "Genero textual = forma social de comunicacao.",
      "Tipo textual = modo de organizacao predominante.",
      "Noticia informa fatos.",
      "Artigo de opiniao defende tese.",
      "Cronica interpreta o cotidiano com efeito expressivo.",
      "Texto oficial exige finalidade administrativa e formalidade.",
    ],
    keepThis: [
      "Finalidade comunicativa pesa mais que tema isolado.",
      "Genero e tipo dialogam, mas nao sao a mesma coisa.",
      "Marcas de linguagem ajudam a reconhecer interlocutor e contexto.",
    ],
    miniExercise:
      "Pegue dois textos sobre educacao: uma manchete jornalistica e um artigo opinativo. Liste duas marcas que provam que eles pertencem a generos diferentes.",
    quickQuestions: [
      {
        prompt: "O que ajuda mais a identificar um genero: apenas o assunto ou a finalidade comunicativa?",
        answerGuide: "A finalidade comunicativa, junto com suporte, interlocutor e linguagem.",
      },
      {
        prompt: "Um documento administrativo com linguagem formal e objetivo de registrar uma decisao se aproxima de qual genero?",
        answerGuide: "Texto oficial.",
      },
    ],
    nextMission:
      "Na proxima aula, vamos entender como a lingua varia conforme contexto, regiao e grupo social sem cair no erro do preconceito linguistico.",
  },
  "variacao-linguistica": {
    slug: "variacao-linguistica",
    title: "Variacao linguistica",
    opening:
      "A prova nao quer saber se voce despreza formas populares de fala. Ela quer saber se voce entende adequacao linguistica e reconhece quando o contexto exige registro diferente.",
    objective:
      "Compreender linguagem formal e informal, variacao regional, social e historica, preconceito linguistico e adequacao ao contexto comunicativo.",
    whyItFalls:
      "A banca usa variacao linguistica para avaliar leitura de contexto, reconhecimento de registros e capacidade de distinguir adequacao de julgamento preconceituoso sobre a fala do outro.",
    explanation: [
      "A lingua varia porque os falantes vivem em contextos diferentes. Regiao, grupo social, epoca historica, nivel de formalidade e situacao de comunicacao interferem nas escolhas linguisticas.",
      "Linguagem formal aparece com mais frequencia em textos oficiais, respostas discursivas e comunicacoes institucionais. Linguagem informal aparece em conversas, memes, bilhetes e muitos generos cotidianos.",
      "Variacao regional envolve marcas geograficas. Variacao social aparece ligada a grupos, escolaridade ou profissao. Variacao historica mostra que a lingua muda com o tempo.",
      "O ponto central em prova e a adequacao. Uma forma pode ser adequada em dialogo literario e inadequada em documento oficial. Julgar uma variedade como inferior e cair em preconceito linguistico.",
    ],
    example:
      "A expressao oral de um personagem pode trazer marcas regionais para construir autenticidade. Isso nao significa erro dentro da proposta do texto. Ja uma resposta oficial da administracao precisa seguir registro formal.",
    commonError:
      "Achar que toda variedade popular esta errada. Em prova, o que importa e o contexto de uso e a exigencia de formalidade da situacao.",
    bankTip:
      "Quando a banca usar a palavra 'adequado', pense imediatamente em contexto, interlocutor e finalidade. Essa triade costuma apontar a resposta correta.",
    structuredSummary: [
      "Variacao linguistica = mudanca de uso conforme contexto.",
      "Formal e informal dependem da situacao.",
      "Variacao regional: marcas geograficas.",
      "Variacao social: grupos e perfis de uso.",
      "Variacao historica: mudancas ao longo do tempo.",
      "Adequacao nao e a mesma coisa que preconceito.",
    ],
    keepThis: [
      "Nem toda forma popular e erro; muitas vezes e apenas outra variedade.",
      "Documento oficial pede norma-padrao e precisao.",
      "A banca gosta de opor adequacao e preconceito linguistico.",
    ],
    miniExercise:
      "Explique por que uma fala coloquial pode ser adequada em uma cronica, mas inadequada em um oficio administrativo.",
    quickQuestions: [
      {
        prompt: "Qual palavra-chave ajuda a resolver questoes desse tema?",
        answerGuide: "Adequacao ao contexto.",
      },
      {
        prompt: "Reconhecer diferencas regionais significa autorizar preconceito linguistico?",
        answerGuide: "Nao. A analise correta reconhece diversidade sem hierarquizar indevidamente as variedades.",
      },
    ],
    nextMission:
      "A proxima etapa vai mostrar como as ideias se ligam em um texto para formar unidade: coesao e coerencia.",
  },
  "coesao-e-coerencia": {
    slug: "coesao-e-coerencia",
    title: "Coesao e coerencia",
    opening:
      "Um texto pode ter conectivos e ainda assim estar ruim. Coesao ajuda a ligar as partes; coerencia garante que tudo faca sentido junto. Prova cobra exatamente essa diferenca.",
    objective:
      "Entender como conectivos, retomadas e progressao textual constroem coesao, e como a coerencia organiza a unidade de sentido do texto.",
    whyItFalls:
      "A banca explora reescrita, relacao entre paragrafos, valor de conectivos e trechos que parecem corretos por fora, mas quebram a logica global do texto.",
    explanation: [
      "Coesao e o conjunto de mecanismos que conecta partes do texto. Entram aqui pronomes de retomada, sinonimos, elipses e conectivos que indicam causa, conclusao, oposicao, condicao e outras relacoes.",
      "Coerencia e a unidade global de sentido. Um texto coerente nao se contradiz, progride de forma inteligivel e mantem relacao plausivel entre as ideias apresentadas.",
      "Um texto pode ter conectivo bonito e mesmo assim ser incoerente. Se eu digo 'portanto' quando nao ha conclusao, existe marca de coesao, mas nao ha coerencia logica.",
      "A progressao textual acontece quando o texto retoma informacoes dadas e acrescenta algo novo de forma organizada. Repetir sempre a mesma ideia empobrece o texto; trazer novidade sem amarracao quebra a unidade.",
    ],
    example:
      "Em 'A escola ampliou o horario da biblioteca. Por isso, mais estudantes passaram a frequentar o espaco', o conectivo indica consequencia de forma coerente. Ja em 'A escola ampliou o horario. Portanto, o clima estava chuvoso', ha conectivo, mas nao ha relacao logica.",
    commonError:
      "Acreditar que basta colocar conectivos para melhorar o texto. Se a relacao de sentido nao existir, o conectivo nao salva a coerencia.",
    bankTip:
      "Quando aparecer reescrita, compare a relacao logica entre as ideias. Pergunte se a nova frase preserva causa, oposicao, conclusao, tempo ou condicao do texto original.",
    structuredSummary: [
      "Coesao referencial: retoma e antecipa informacoes.",
      "Coesao sequencial: organiza o encadeamento das ideias.",
      "Coerencia: unidade de sentido do texto como um todo.",
      "Conectivo certo sem relacao logica continua errado.",
      "Bom texto progride: retoma e acrescenta informacao nova.",
    ],
    keepThis: [
      "Coesao liga partes; coerencia sustenta o sentido global.",
      "Contradicao derruba coerencia mesmo com frase gramaticalmente correta.",
      "Progressao textual boa evita repeticao vazia e salto sem ligacao.",
    ],
    miniExercise:
      "Reescreva duas frases curtas usando um conectivo de causa e depois outro de oposicao. Explique como o sentido muda em cada caso.",
    quickQuestions: [
      {
        prompt: "Um texto com conectivos pode ser incoerente?",
        answerGuide: "Sim. Se a relacao entre as ideias nao fizer sentido, ha marca coesiva sem coerencia real.",
      },
      {
        prompt: "Qual a funcao da progressao textual?",
        answerGuide: "Retomar o que ja foi dito e acrescentar informacao nova sem quebrar a unidade do texto.",
      },
    ],
    nextMission:
      "Agora que a base textual ficou forte, a proxima missao e aplicar essa organizacao na escrita de uma redacao nota alta.",
  },
  "redacao-enem": {
    slug: "redacao-enem",
    title: "Redacao ENEM",
    opening:
      "No ENEM, escrever bem nao basta. Voce precisa cumprir uma tarefa muito especifica: responder ao tema com tese clara, argumentos consistentes e proposta de intervencao completa.",
    objective:
      "Dominar a estrutura dissertativo-argumentativa, compreender as cinco competencias e organizar repertorio, tese, argumentos e proposta de intervencao com seguranca.",
    whyItFalls:
      "A prova discursiva do ENEM e corrigida por competencias. O aluno perde pontos quando escreve sem projeto de texto, sem repertorio produtivo ou sem proposta de intervencao completa.",
    explanation: [
      "A Competencia 1 avalia dominio da norma-padrao. A Competencia 2 observa compreensao do tema e uso produtivo de repertorio. A Competencia 3 verifica selecao e organizacao de argumentos. A Competencia 4 olha coesao. A Competencia 5 cobra proposta de intervencao detalhada e viavel.",
      "A estrutura mais segura e introducao com tema e tese, dois desenvolvimentos com argumento bem explicado e conclusao com proposta de intervencao. O repertorio nao entra para enfeitar: ele precisa servir ao argumento.",
      "Tese e a ideia central que voce vai defender. Argumentos sao as razoes que sustentam essa tese. Proposta de intervencao precisa responder ao problema com agente, acao, meio, finalidade e algum detalhamento consistente.",
      "O maior salto de nota costuma acontecer quando o aluno para de escrever genericamente e passa a controlar a funcao de cada paragrafo.",
    ],
    example:
      "Se o tema for seguranca digital na juventude, uma tese possivel seria: a vulnerabilidade dos jovens decorre da baixa educacao midiatico-digital e da fiscalizacao insuficiente das plataformas. A partir dela, os paragrafos de desenvolvimento ja ganham direcao.",
    commonError:
      "Confundir repertorio com decoracao de texto. Citar autor, serie ou dado sem ligar isso ao argumento nao eleva a nota como o aluno imagina.",
    bankTip:
      "Antes de escrever o primeiro paragrafo, defina tese, dois argumentos e os cinco elementos da intervencao. Esse roteiro reduz fuga ao tema e repeticao.",
    structuredSummary: [
      "C1: norma-padrao.",
      "C2: tema + repertorio produtivo.",
      "C3: argumento organizado.",
      "C4: coesao e articulacao.",
      "C5: intervencao completa e viavel.",
      "Estrutura-base: introducao, dois desenvolvimentos e conclusao.",
    ],
    keepThis: [
      "Repertorio so vale quando ajuda a explicar o argumento.",
      "Tese fraca gera desenvolvimento solto.",
      "Intervencao sem agente ou sem detalhamento perde forca na C5.",
    ],
    miniExercise:
      "Escolha um tema social atual e escreva apenas a tese em uma frase. Depois liste dois argumentos e os cinco elementos da proposta de intervencao.",
    quickQuestions: [
      {
        prompt: "Qual competencia exige proposta de intervencao detalhada?",
        answerGuide: "Competencia 5.",
      },
      {
        prompt: "O que acontece quando o repertorio aparece solto, sem dialogar com a tese?",
        answerGuide: "Ele perde valor argumentativo e pouco ajuda na nota.",
      },
    ],
    nextMission:
      "Na proxima missao, vamos comparar essa estrutura com a redacao de perfil policial, que exige mais objetividade e menos ornamentacao.",
  },
  "redacao-pmes": {
    slug: "redacao-pmes",
    title: "Redacao PMES",
    opening:
      "A redacao de concurso policial pede firmeza, clareza e respeito estrito ao tema. Nao e o mesmo jogo do ENEM. Aqui, objetividade e controle do comando pesam muito.",
    objective:
      "Escrever com clareza, objetividade e argumentacao firme em uma estrutura de introducao, desenvolvimento e conclusao adequada a concurso policial.",
    whyItFalls:
      "A banca procura candidato que sabe organizar pensamento com disciplina, respeitar comando curto e defender ideia sem floreio excessivo nem fuga ao tema.",
    explanation: [
      "Na redacao PMES, o comando costuma ser mais direto. O candidato precisa entender o recorte do tema, assumir uma tese clara e sustenta-la com argumentos objetivos.",
      "Introducao boa apresenta o tema e posiciona a tese. Desenvolvimento trabalha dois eixos argumentativos com exemplos pertinentes. Conclusao fecha a linha de raciocinio sem abrir assunto novo.",
      "Diferente do ENEM, aqui a proposta de intervencao nao e necessariamente o centro da avaliacao. O foco maior costuma estar em tema, argumentacao, estrutura, clareza, coesao e gramatica.",
      "Escrever de forma policial nao significa escrever duro ou artificial. Significa ser direto, organizado e funcional, sem excesso de frases feitas.",
    ],
    example:
      "Em um tema sobre seguranca publica, voce pode defender que a prevencao da violencia depende da integracao entre policiamento de proximidade e politicas sociais. Depois, desenvolve um paragrafo para cada eixo sem fugir do foco.",
    commonError:
      "Trazer modelo de ENEM inteiro para a prova policial, enchendo o texto de repertorio solto e conclusao genérica, sem atacar de modo objetivo o comando dado.",
    bankTip:
      "Leia o comando duas vezes e sublinhe o nucleo tematico. Em concurso policial, sair um pouco do foco ja custa caro porque o avaliador percebe rapidamente a dispersao.",
    structuredSummary: [
      "Prioridades: tema, clareza, objetividade e argumentacao.",
      "Estrutura: introducao, desenvolvimento e conclusao.",
      "Tese deve ser direta e defensavel.",
      "Argumento precisa responder ao tema, nao desfilar opinioes soltas.",
      "Menos enfeite, mais precisao.",
    ],
    keepThis: [
      "Redacao de concurso policial premia foco e firmeza.",
      "Objetividade nao e pobreza de ideia; e controle da escrita.",
      "Tema respeitado vale mais que repertorio exibido sem funcao.",
    ],
    miniExercise:
      "Escreva uma introducao de quatro linhas sobre cidadania e seguranca publica, deixando a tese explicita e evitando generalidades vazias.",
    quickQuestions: [
      {
        prompt: "Qual a diferenca central entre ENEM e redacao PMES?",
        answerGuide: "No PMES pesa mais a objetividade e o respeito estrito ao comando; no ENEM a avaliacao vem por cinco competencias, incluindo proposta de intervencao detalhada.",
      },
      {
        prompt: "O que enfraquece muito esse tipo de redacao?",
        answerGuide: "Fuga ao tema, introducao vaga e argumento que nao conversa diretamente com o comando.",
      },
    ],
    nextMission:
      "Na proxima etapa, transforme essa base em treino manuscrito: planeje tese, dois argumentos e feche com conclusao firme antes de escrever o texto completo.",
  },
};

const portugueseBundle: PremiumLessonBundle = {
  label: "Portugues premium",
  lessons: [
    premiumLessonCatalog["interpretacao-textual"],
    premiumLessonCatalog["tipologia-textual"],
    premiumLessonCatalog["generos-textuais"],
    premiumLessonCatalog["variacao-linguistica"],
    premiumLessonCatalog["coesao-e-coerencia"],
  ],
};

const enemWritingBundle: PremiumLessonBundle = {
  label: "Redacao ENEM",
  lessons: [premiumLessonCatalog["redacao-enem"]],
};

const pmesWritingBundle: PremiumLessonBundle = {
  label: "Redacao PMES",
  lessons: [premiumLessonCatalog["redacao-pmes"]],
};

export function getPremiumLessonBundle(moduleName: string, title: string, trackSlug?: string) {
  const moduleKey = normalize(moduleName);
  const titleKey = normalize(title);
  const trackKey = normalize(trackSlug ?? "");
  const base = `${moduleKey} ${titleKey} ${trackKey}`;

  if (base.includes("redacao enem") || (base.includes("enem") && base.includes("redacao"))) {
    return enemWritingBundle;
  }

  if (base.includes("pmes") && base.includes("redacao")) {
    return pmesWritingBundle;
  }

  if (base.includes("redacao")) {
    return trackKey.includes("pmes") ? pmesWritingBundle : enemWritingBundle;
  }

  if (base.includes("interpretacao")) {
    return { label: premiumLessonCatalog["interpretacao-textual"].title, lessons: [premiumLessonCatalog["interpretacao-textual"]] };
  }

  if (base.includes("tipologia")) {
    return { label: premiumLessonCatalog["tipologia-textual"].title, lessons: [premiumLessonCatalog["tipologia-textual"]] };
  }

  if (base.includes("genero")) {
    return { label: premiumLessonCatalog["generos-textuais"].title, lessons: [premiumLessonCatalog["generos-textuais"]] };
  }

  if (base.includes("variacao")) {
    return { label: premiumLessonCatalog["variacao-linguistica"].title, lessons: [premiumLessonCatalog["variacao-linguistica"]] };
  }

  if (base.includes("coesao") || base.includes("coerencia")) {
    return { label: premiumLessonCatalog["coesao-e-coerencia"].title, lessons: [premiumLessonCatalog["coesao-e-coerencia"]] };
  }

  if (moduleKey.includes("portugues") && !titleKey.includes("matematica")) {
    return portugueseBundle;
  }

  return null;
}

export function getPremiumLessonBySlug(slug: string) {
  return premiumLessonCatalog[slug] ?? null;
}

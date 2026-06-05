export type TrilhaModulo = {
  titulo: string;
  descricao: string;
  etapaAtual: string;
  progresso: number;
  videoEmbedUrl: string;
  materialTitulo: string;
  resumo: string;
  questoes: string[];
  checklist: string[];
};

export type TrilhaCurso = {
  area: "Operacionais" | "Saúde" | "Magistério";
  slug: string;
  titulo: string;
  descricao: string;
  modulos: TrilhaModulo[];
};

const videoPlaceholder = "https://www.youtube.com/embed/dQw4w9WgXcQ";

const checklistPadrao = [
  "Entenda",
  "Assista",
  "Leia",
  "Pratique",
  "Revise",
  "Conclua",
];

function criarModulo(titulo: string, descricao: string): TrilhaModulo {
  return {
    titulo,
    descricao,
    etapaAtual: "Pratique",
    progresso: 42,
    videoEmbedUrl: videoPlaceholder, // TODO: substituir por vídeo curado oficial BenThec.
    materialTitulo: `Apostila BenThec — ${titulo}`,
    resumo:
      "Módulo organizado para estudo guiado, com videoaula curada, material de apoio, questões e revisão.",
    questoes: [
      "Resolver questões objetivas do conteúdo estudado.",
      "Marcar dúvidas para suporte e revisão.",
      "Revisar erros antes de avançar para a próxima etapa.",
    ],
    checklist: checklistPadrao,
  };
}

export const trilhas: TrilhaCurso[] = [
  {
    area: "Operacionais",
    slug: "auxiliar-servicos-gerais",
    titulo: "Auxiliar de Serviços Gerais",
    descricao: "Português, Matemática, limpeza, conservação, EPIs e atendimento ao público.",
    modulos: [
      criarModulo("Português Básico", "Leitura, interpretação, ortografia e pontuação."),
      criarModulo("Matemática Básica", "Operações fundamentais, medidas e raciocínio lógico."),
      criarModulo("Conhecimentos Específicos", "Limpeza, conservação, jardinagem, ferramentas e segurança."),
    ],
  },
  {
    area: "Operacionais",
    slug: "merendeira",
    titulo: "Merendeira",
    descricao: "Manipulação de alimentos, higiene, armazenamento, boas práticas e EPIs.",
    modulos: [
      criarModulo("Manipulação de Alimentos", "Higiene, prevenção de contaminação e boas práticas."),
      criarModulo("Alimentação Escolar", "Preparo, conservação e distribuição de alimentos."),
      criarModulo("Estoque e Segurança", "Controle básico, validade, EPIs e organização da cozinha."),
    ],
  },
  {
    area: "Operacionais",
    slug: "motorista",
    titulo: "Motorista",
    descricao: "CTB, sinalização, direção defensiva, primeiros socorros e mecânica básica.",
    modulos: [
      criarModulo("Código de Trânsito Brasileiro", "Legislação de trânsito, infrações e penalidades."),
      criarModulo("Direção Defensiva", "Condução segura, prevenção de acidentes e postura profissional."),
      criarModulo("Mecânica e Primeiros Socorros", "Manutenção preventiva e procedimentos em emergências."),
    ],
  },
  {
    area: "Operacionais",
    slug: "operador-maquinas",
    titulo: "Operador de Máquinas",
    descricao: "Operação, manutenção preventiva, segurança, instrumentos e EPIs.",
    modulos: [
      criarModulo("Operação de Máquinas", "Noções de retroescavadeira, pá carregadeira e motoniveladora."),
      criarModulo("Segurança na Operação", "Sinalização, EPIs e prevenção de acidentes."),
      criarModulo("Manutenção Preventiva", "Painel, instrumentos e cuidados básicos com máquinas."),
    ],
  },
  {
    area: "Saúde",
    slug: "tecnico-enfermagem",
    titulo: "Técnico em Enfermagem",
    descricao: "Saúde Pública, fundamentos, medicamentos, curativos, infecção hospitalar e ética.",
    modulos: [
      criarModulo("Saúde Pública e SUS", "Princípios, organização, atenção básica e humanização."),
      criarModulo("Fundamentos de Enfermagem", "Sinais vitais, registros, preparo do paciente e materiais."),
      criarModulo("Procedimentos e Ética", "Medicação, curativos, infecção hospitalar, UTI e código de ética."),
    ],
  },
  {
    area: "Magistério",
    slug: "conhecimentos-pedagogicos",
    titulo: "Conhecimentos Pedagógicos",
    descricao: "Fundamentos da Educação, LDB, PNE, PPP, avaliação, inclusão e gestão escolar.",
    modulos: [
      criarModulo("Fundamentos da Educação", "Educação como prática social e tendências pedagógicas."),
      criarModulo("Teorias da Aprendizagem", "Piaget, Vygotsky, Wallon e Paulo Freire."),
      criarModulo("Legislação Educacional", "Constituição, LDB, PNE, PPP e gestão democrática."),
    ],
  },
  {
    area: "Magistério",
    slug: "educacao-infantil",
    titulo: "Educação Infantil",
    descricao: "Infância, desenvolvimento infantil, ludicidade, BNCC, planejamento e avaliação.",
    modulos: [
      criarModulo("Concepção de Infância", "Criança como sujeito de direitos e organização pedagógica."),
      criarModulo("Desenvolvimento Infantil", "Aspectos físicos, cognitivos, afetivos, sociais e linguísticos."),
      criarModulo("BNCC e Planejamento", "Campos de experiência, avaliação e documentação pedagógica."),
    ],
  },
  {
    area: "Magistério",
    slug: "series-iniciais",
    titulo: "Séries Iniciais",
    descricao: "Alfabetização, letramento, BNCC, práticas pedagógicas e avaliação.",
    modulos: [
      criarModulo("Alfabetização e Letramento", "Leitura, escrita, hipóteses de escrita e formação do leitor."),
      criarModulo("Práticas nos Anos Iniciais", "Português, Matemática, Ciências, História e Geografia."),
      criarModulo("Currículo e Avaliação", "BNCC, planejamento, recuperação e acompanhamento dos estudantes."),
    ],
  },
  {
    area: "Magistério",
    slug: "aee-visual",
    titulo: "AEE Deficiência Visual",
    descricao: "Braille, Soroban, orientação e mobilidade, tecnologias assistivas e inclusão.",
    modulos: [
      criarModulo("Deficiência Visual", "Cegueira, baixa visão e avaliação funcional da visão."),
      criarModulo("Braille e Soroban", "Leitura, escrita, produção de materiais e recursos específicos."),
      criarModulo("Tecnologias Assistivas", "Acessibilidade, adaptação curricular e articulação escolar."),
    ],
  },
  {
    area: "Magistério",
    slug: "aee-auditiva",
    titulo: "AEE Deficiência Auditiva",
    descricao: "LIBRAS, cultura surda, educação bilíngue, português como segunda língua e inclusão.",
    modulos: [
      criarModulo("LIBRAS e Cultura Surda", "Legislação, identidade surda e comunicação visual."),
      criarModulo("Educação Bilíngue", "Aquisição de linguagem e português como segunda língua."),
      criarModulo("Planejamento no AEE", "Recursos visuais, tecnologias assistivas e avaliação inclusiva."),
    ],
  },
  {
    area: "Magistério",
    slug: "sala-recursos",
    titulo: "Sala de Recursos",
    descricao: "Educação inclusiva, TEA, deficiências, altas habilidades, plano AEE e tecnologias assistivas.",
    modulos: [
      criarModulo("Educação Inclusiva", "Diversidade, política nacional e atendimento especializado."),
      criarModulo("Necessidades Educacionais", "TEA, deficiências físicas, sensoriais, intelectuais e altas habilidades."),
      criarModulo("Plano AEE", "Avaliação diagnóstica, adaptação curricular e trabalho multiprofissional."),
    ],
  },
];

export function getTrilhasPorArea(area: TrilhaCurso["area"]) {
  return trilhas.filter((trilha) => trilha.area === area);
}

export function getTrilhaPorSlug(slug: string) {
  return trilhas.find((trilha) => trilha.slug === slug);
}

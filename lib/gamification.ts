import type { ProductAccessKey } from "@/lib/db";

export type CareerBadgeTrack = "pmes" | "educacao" | "saude" | "enem" | "conquistas";

export type GamificationEventType =
  | "lesson_completed"
  | "question_correct"
  | "question_batch_10"
  | "unit_completed"
  | "simulation_finished"
  | "essay_submitted"
  | "essay_corrected"
  | "discipline_completed"
  | "streak_7_days";

export type AchievementKey =
  | "primeira-aula"
  | "primeira-unidade"
  | "primeiro-simulado"
  | "primeira-redacao"
  | "dez-questoes"
  | "cinquenta-questoes"
  | "cem-questoes"
  | "sete-dias"
  | "disciplina-concluida"
  | "trilha-concluida";

export type CareerLevel = {
  level: number;
  name: string;
  icon: string;
  color: string;
  description: string;
  badgePath: string;
  unlockMessage: string;
};

export type AchievementDefinition = {
  key: AchievementKey;
  title: string;
  description: string;
  icon: string;
  color: string;
  badgePath: string;
  progressTarget: number;
  getProgress: (snapshot: GamificationSnapshot) => number;
};

export type PersistedGamificationRecord = {
  career: CareerBadgeTrack;
  xpTotal: number;
  streakDays: number;
  lessonsCompleted: number;
  correctAnswers: number;
  questionsResolved: number;
  unitsCompleted: number;
  simulationsCompleted: number;
  essaysSubmitted: number;
  essaysCorrected: number;
  disciplinesCompleted: number;
  unlockedAchievements: AchievementKey[];
  lastAchievement?: AchievementKey;
  updatedAt: string;
};

export type GamificationSnapshot = PersistedGamificationRecord & {
  level: CareerLevel;
  nextLevel: CareerLevel | null;
  xpForNextLevel: number;
  xpIntoCurrentLevel: number;
  progressToNextLevel: number;
  lastAchievementDefinition: AchievementDefinition | null;
  nextAchievement: AchievementDefinition | null;
  recentAchievements: AchievementDefinition[];
  achievementStates: Array<AchievementDefinition & { unlocked: boolean; progress: number }>;
  nextMission: string;
};

export const XP_RULES: Record<GamificationEventType, number> = {
  lesson_completed: 10,
  question_correct: 5,
  question_batch_10: 30,
  unit_completed: 50,
  simulation_finished: 100,
  essay_submitted: 80,
  essay_corrected: 120,
  discipline_completed: 150,
  streak_7_days: 200,
};

const LEVEL_STEPS = [0, 120, 280, 470, 690, 940, 1220, 1540];

const PMES_LEVELS: CareerLevel[] = [
  { level: 1, name: "Recruta BenThec", icon: "shield", color: "#f3cf6f", description: "Voce entrou na rotina e comecou a formar base.", badgePath: "/badges/pmes/recruta-benthec.svg", unlockMessage: "Voce entrou em forma. A jornada PMES comecou." },
  { level: 2, name: "Soldado BenThec", icon: "star", color: "#d6a824", description: "Ja existe constancia e o estudo deixou de ser aleatorio.", badgePath: "/badges/pmes/soldado-benthec.svg", unlockMessage: "Boa. Seu estudo ja ganhou disciplina de soldado." },
  { level: 3, name: "Cabo BenThec", icon: "chevrons", color: "#c58b00", description: "Voce ja sustenta treino com mais seguranca.", badgePath: "/badges/pmes/cabo-benthec.svg", unlockMessage: "Voce subiu de nivel. Agora a rotina esta mais firme." },
  { level: 4, name: "Sargento BenThec", icon: "medal", color: "#b7791f", description: "Seu desempenho ja mostra repeticao inteligente e revisao.", badgePath: "/badges/pmes/sargento-benthec.svg", unlockMessage: "Sargento BenThec liberado. A base ja esta muito mais consistente." },
  { level: 5, name: "Subtenente BenThec", icon: "crest", color: "#9f6a10", description: "Voce entrou em fase de controle real da trilha.", badgePath: "/badges/pmes/subtenente-benthec.svg", unlockMessage: "Subtenente BenThec conquistado. A trilha esta sob seu comando." },
  { level: 6, name: "Tenente BenThec", icon: "laurel", color: "#84550b", description: "Seu ritmo de acerto e revisao ja inspira confianca.", badgePath: "/badges/pmes/tenente-benthec.svg", unlockMessage: "Tenente BenThec alcançado. O estudo agora tem postura de reta final." },
  { level: 7, name: "Capitao BenThec", icon: "crown", color: "#6f4511", description: "Voce domina a rota e conduz a propria preparacao.", badgePath: "/badges/pmes/capitao-benthec.svg", unlockMessage: "Capitao BenThec alcançado. Sua preparacao esta em alta patente." },
  { level: 8, name: "Comandante BenThec", icon: "flame", color: "#facc15", description: "Nivel secreto para quem empilha constancia, pratica e resultado.", badgePath: "/badges/pmes/comandante-benthec.svg", unlockMessage: "Nivel secreto liberado: Comandante BenThec." },
];

const EDUCACAO_LEVELS: CareerLevel[] = [
  { level: 1, name: "Estudante", icon: "book", color: "#f3cf6f", description: "Voce voltou para a sala de estudo com metodo.", badgePath: "/badges/educacao/estudante.svg", unlockMessage: "Primeiro passo firme. Voce voltou a estudar com direcao." },
  { level: 2, name: "Monitor", icon: "bookmark", color: "#e0b84d", description: "Ja existe constancia suficiente para manter a rotina.", badgePath: "/badges/educacao/monitor.svg", unlockMessage: "Nivel Monitor liberado. O estudo ja entrou na rotina." },
  { level: 3, name: "Graduado", icon: "cap", color: "#d6a824", description: "Voce consolidou a base e passou a revisar melhor.", badgePath: "/badges/educacao/graduado.svg", unlockMessage: "Graduado BenThec. Sua base esta mais estruturada." },
  { level: 4, name: "Especialista", icon: "spark", color: "#c58b00", description: "Agora seu estudo fica mais preciso por microassunto.", badgePath: "/badges/educacao/especialista.svg", unlockMessage: "Especialista liberado. Sua trilha ficou mais refinada." },
  { level: 5, name: "Mestre", icon: "laurel", color: "#aa7b05", description: "Voce ja controla melhor revisao, leitura e pratica.", badgePath: "/badges/educacao/mestre.svg", unlockMessage: "Mestre BenThec alcançado. O estudo esta mais maduro." },
  { level: 6, name: "Doutor", icon: "medal", color: "#8b6508", description: "Seu desempenho mostra autonomia e consistencia.", badgePath: "/badges/educacao/doutor.svg", unlockMessage: "Doutor BenThec alcançado. Sua preparacao esta forte." },
  { level: 7, name: "PhD BenThec", icon: "crown", color: "#facc15", description: "Voce atingiu o topo da jornada academica BenThec.", badgePath: "/badges/educacao/phd-benthec.svg", unlockMessage: "PhD BenThec desbloqueado. Sua constancia virou referencia." },
];

const SAUDE_LEVELS: CareerLevel[] = [
  { level: 1, name: "Aprendiz", icon: "pulse", color: "#f3cf6f", description: "Primeira fase de consolidacao dos fundamentos.", badgePath: "/badges/saude/aprendiz.svg", unlockMessage: "Aprendiz BenThec liberado. A base da saude comecou." },
  { level: 2, name: "Tecnico em Formacao", icon: "cross", color: "#d6a824", description: "Voce entrou no fluxo de conteudo e pratica.", badgePath: "/badges/saude/tecnico-em-formacao.svg", unlockMessage: "Tecnico em Formacao. O estudo agora ficou mais continuo." },
  { level: 3, name: "Plantonista", icon: "shield", color: "#c58b00", description: "Seu ritmo ja aguenta mais questoes e revisoes.", badgePath: "/badges/saude/plantonista.svg", unlockMessage: "Plantonista BenThec liberado. O treino ganhou resistencia." },
  { level: 4, name: "Especialista", icon: "medal", color: "#a56f0a", description: "Voce avancou para estudo de mais precisao.", badgePath: "/badges/saude/especialista.svg", unlockMessage: "Especialista BenThec conquistado. A trilha esta mais refinada." },
  { level: 5, name: "Referencia BenThec", icon: "crown", color: "#facc15", description: "Seu estudo ja se comporta como preparacao de alto nivel.", badgePath: "/badges/saude/referencia-benthec.svg", unlockMessage: "Referencia BenThec. Sua jornada de saude virou referencia." },
];

const ENEM_LEVELS: CareerLevel[] = [
  { level: 1, name: "Iniciante", icon: "spark", color: "#f3cf6f", description: "Voce comecou a trilha com constancia inicial.", badgePath: "/badges/enem/iniciante.svg", unlockMessage: "Iniciante liberado. O ENEM ja entrou no radar." },
  { level: 2, name: "Persistente", icon: "arrow", color: "#e0b84d", description: "Seu estudo ja mostra continuidade.", badgePath: "/badges/enem/persistente.svg", unlockMessage: "Persistente BenThec. Voce ja esta criando ritmo." },
  { level: 3, name: "Preparado", icon: "target", color: "#d6a824", description: "A base esta mais firme e a prova deixou de assustar tanto.", badgePath: "/badges/enem/preparado.svg", unlockMessage: "Preparado liberado. A prova ficou mais concreta." },
  { level: 4, name: "Competitivo", icon: "laurel", color: "#c58b00", description: "Voce passou a competir de verdade.", badgePath: "/badges/enem/competitivo.svg", unlockMessage: "Competitivo BenThec. O desempenho ficou mais consistente." },
  { level: 5, name: "Alta Performance", icon: "medal", color: "#aa7b05", description: "Seu desempenho ja aponta evolucao consistente.", badgePath: "/badges/enem/alta-performance.svg", unlockMessage: "Alta Performance liberada. Seu treino subiu de nivel." },
  { level: 6, name: "Aprovacao Proxima", icon: "crown", color: "#8b6508", description: "Voce entrou no grupo de quem esta buscando a vaga com forca.", badgePath: "/badges/enem/aprovacao-proxima.svg", unlockMessage: "Aprovacao Proxima. A vaga esta cada vez mais perto." },
  { level: 7, name: "Universidade Conquistada", icon: "flame", color: "#facc15", description: "Topo da jornada ENEM BenThec.", badgePath: "/badges/enem/universidade-conquistada.svg", unlockMessage: "Universidade Conquistada. O topo da jornada ENEM foi liberado." },
];

export const achievementDefinitions: AchievementDefinition[] = [
  {
    key: "primeira-aula",
    title: "Primeira aula concluida",
    description: "Voce saiu do zero e fechou a primeira etapa da trilha.",
    icon: "play",
    color: "#f3cf6f",
    badgePath: "/badges/conquistas/primeira-aula-concluida.svg",
    progressTarget: 1,
    getProgress: (snapshot) => snapshot.lessonsCompleted,
  },
  {
    key: "primeira-unidade",
    title: "Primeira unidade concluida",
    description: "A primeira unidade foi fechada por completo.",
    icon: "flag",
    color: "#d6a824",
    badgePath: "/badges/conquistas/primeira-unidade-concluida.svg",
    progressTarget: 1,
    getProgress: (snapshot) => snapshot.unitsCompleted,
  },
  {
    key: "primeiro-simulado",
    title: "Primeiro simulado",
    description: "Voce enfrentou o primeiro bloco maior de questoes.",
    icon: "checklist",
    color: "#c58b00",
    badgePath: "/badges/conquistas/primeiro-simulado.svg",
    progressTarget: 1,
    getProgress: (snapshot) => snapshot.simulationsCompleted,
  },
  {
    key: "primeira-redacao",
    title: "Primeira redacao enviada",
    description: "A escrita entrou de vez na sua rotina.",
    icon: "pen",
    color: "#b7791f",
    badgePath: "/badges/conquistas/primeira-redacao-enviada.svg",
    progressTarget: 1,
    getProgress: (snapshot) => snapshot.essaysSubmitted,
  },
  {
    key: "dez-questoes",
    title: "10 questoes resolvidas",
    description: "Voce ja comecou a construir repertorio de prova.",
    icon: "spark",
    color: "#f3cf6f",
    badgePath: "/badges/conquistas/10-questoes-resolvidas.svg",
    progressTarget: 10,
    getProgress: (snapshot) => snapshot.questionsResolved,
  },
  {
    key: "cinquenta-questoes",
    title: "50 questoes resolvidas",
    description: "A pratica deixou de ser eventual e virou rotina.",
    icon: "target",
    color: "#d6a824",
    badgePath: "/badges/conquistas/50-questoes-resolvidas.svg",
    progressTarget: 50,
    getProgress: (snapshot) => snapshot.questionsResolved,
  },
  {
    key: "cem-questoes",
    title: "100 questoes resolvidas",
    description: "Voce acumulou treino suficiente para revisar com criterio.",
    icon: "laurel",
    color: "#c58b00",
    badgePath: "/badges/conquistas/100-questoes-resolvidas.svg",
    progressTarget: 100,
    getProgress: (snapshot) => snapshot.questionsResolved,
  },
  {
    key: "sete-dias",
    title: "7 dias consecutivos",
    description: "A constancia virou uma conquista real.",
    icon: "flame",
    color: "#facc15",
    badgePath: "/badges/conquistas/7-dias-consecutivos.svg",
    progressTarget: 7,
    getProgress: (snapshot) => snapshot.streakDays,
  },
  {
    key: "disciplina-concluida",
    title: "Disciplina concluida",
    description: "Voce fechou uma disciplina inteira.",
    icon: "medal",
    color: "#a56f0a",
    badgePath: "/badges/conquistas/disciplina-concluida.svg",
    progressTarget: 1,
    getProgress: (snapshot) => snapshot.disciplinesCompleted,
  },
  {
    key: "trilha-concluida",
    title: "Trilha concluida",
    description: "Voce completou o percurso principal do produto.",
    icon: "crown",
    color: "#facc15",
    badgePath: "/badges/conquistas/trilha-concluida.svg",
    progressTarget: 1,
    getProgress: (snapshot) => (snapshot.disciplinesCompleted >= 3 ? 1 : 0),
  },
];

function getLevelsByCareer(career: CareerBadgeTrack) {
  switch (career) {
    case "pmes":
      return PMES_LEVELS;
    case "saude":
      return SAUDE_LEVELS;
    case "enem":
      return ENEM_LEVELS;
    case "educacao":
    default:
      return EDUCACAO_LEVELS;
  }
}

export function inferCareerTrack(productSlug: ProductAccessKey, planName?: string) {
  const normalized = `${productSlug} ${planName ?? ""}`.toLowerCase();
  if (normalized.includes("pmes") || normalized.includes("militar")) return "pmes";
  if (normalized.includes("enem")) return "enem";
  if (normalized.includes("saude") || normalized.includes("enferm")) return "saude";
  return "educacao";
}

export function getCareerLevels(career: CareerBadgeTrack) {
  return getLevelsByCareer(career);
}

export function createInitialGamificationRecord(career: CareerBadgeTrack): PersistedGamificationRecord {
  return {
    career,
    xpTotal: 0,
    streakDays: 1,
    lessonsCompleted: 0,
    correctAnswers: 0,
    questionsResolved: 0,
    unitsCompleted: 0,
    simulationsCompleted: 0,
    essaysSubmitted: 0,
    essaysCorrected: 0,
    disciplinesCompleted: 0,
    unlockedAchievements: [],
    updatedAt: new Date().toISOString(),
  };
}

export function applyGamificationEvent(
  base: PersistedGamificationRecord,
  event: GamificationEventType,
) {
  const next: PersistedGamificationRecord = {
    ...base,
    xpTotal: base.xpTotal + XP_RULES[event],
    updatedAt: new Date().toISOString(),
  };

  switch (event) {
    case "lesson_completed":
      next.lessonsCompleted += 1;
      break;
    case "question_correct":
      next.questionsResolved += 1;
      next.correctAnswers += 1;
      if (next.questionsResolved % 10 === 0) {
        next.xpTotal += XP_RULES.question_batch_10;
      }
      break;
    case "unit_completed":
      next.unitsCompleted += 1;
      break;
    case "simulation_finished":
      next.simulationsCompleted += 1;
      break;
    case "essay_submitted":
      next.essaysSubmitted += 1;
      break;
    case "essay_corrected":
      next.essaysCorrected += 1;
      break;
    case "discipline_completed":
      next.disciplinesCompleted += 1;
      break;
    case "streak_7_days":
      next.streakDays = Math.max(next.streakDays, 7);
      break;
    default:
      break;
  }

  const unlockedNow = achievementDefinitions
    .filter((achievement) => achievement.getProgress(finalizeGamificationSnapshot(next)) >= achievement.progressTarget)
    .map((achievement) => achievement.key);

  const newlyUnlocked = unlockedNow.find((key) => !next.unlockedAchievements.includes(key));
  next.unlockedAchievements = Array.from(new Set([...next.unlockedAchievements, ...unlockedNow]));
  next.lastAchievement = newlyUnlocked ?? next.lastAchievement;

  return next;
}

export function finalizeGamificationSnapshot(record: PersistedGamificationRecord): GamificationSnapshot {
  const levels = getLevelsByCareer(record.career);
  const levelIndex = LEVEL_STEPS.findIndex((step, index) => {
    const next = LEVEL_STEPS[index + 1];
    if (next === undefined) return record.xpTotal >= step;
    return record.xpTotal >= step && record.xpTotal < next;
  });
  const safeLevelIndex = Math.max(0, levelIndex === -1 ? levels.length - 1 : Math.min(levelIndex, levels.length - 1));
  const level = levels[safeLevelIndex];
  const nextLevel = levels[safeLevelIndex + 1] ?? null;
  const baseXp = LEVEL_STEPS[safeLevelIndex] ?? 0;
  const nextXp = LEVEL_STEPS[safeLevelIndex + 1] ?? baseXp;
  const xpIntoCurrentLevel = record.xpTotal - baseXp;
  const xpForNextLevel = nextLevel ? Math.max(1, nextXp - baseXp) : 0;
  const progressToNextLevel = nextLevel ? Math.min(100, Math.round((xpIntoCurrentLevel / Math.max(1, xpForNextLevel)) * 100)) : 100;

  const achievementStates = achievementDefinitions.map((achievement) => {
    const progress = achievement.getProgress(record as GamificationSnapshot);
    return {
      ...achievement,
      unlocked: record.unlockedAchievements.includes(achievement.key) || progress >= achievement.progressTarget,
      progress,
    };
  });

  const lastAchievementDefinition = record.lastAchievement
    ? achievementDefinitions.find((achievement) => achievement.key === record.lastAchievement) ?? null
    : null;
  const nextAchievement = achievementStates.find((achievement) => !achievement.unlocked) ?? null;
  const recentAchievements = achievementStates.filter((achievement) => achievement.unlocked).slice(-3).reverse();

  const nextMission =
    nextAchievement
      ? `Foque em ${nextAchievement.title.toLowerCase()} para liberar a proxima conquista.`
      : nextLevel
        ? `Continue firme. Falta pouco para chegar a ${nextLevel.name}.`
        : "Voce chegou ao topo atual. Agora mantenha o ritmo e reforce sua revisao.";

  return {
    ...record,
    level,
    nextLevel,
    xpForNextLevel,
    xpIntoCurrentLevel,
    progressToNextLevel,
    lastAchievementDefinition,
    nextAchievement,
    recentAchievements,
    achievementStates,
    nextMission,
  };
}

export function createShareText(snapshot: GamificationSnapshot, progressLabel: string) {
  return `Eu alcancei o nivel ${snapshot.level.name} na BenThec. ${progressLabel} BenThec - estudo guiado ate a aprovacao.`;
}

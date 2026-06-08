import { getCuradoriaTrack, type CuradoriaMaterial, type CuradoriaTrilha } from "@/lib/curadoria";
import { getQuestoesDisponiveisParaCargo, type QuestaoAutoral } from "@/lib/questoes";
import { getVideosByCargoAndModulo, type ConteudoCurado } from "@/lib/videos-curados";

export type JornadaEtapa = {
  id: string;
  modulo: string;
  titulo: string;
  objetivoDaAula: string;
  porQueCaiNaProva: string;
  resumoGuiado: string;
  apostila: CuradoriaMaterial;
  videoPrincipal: ConteudoCurado | null;
  videoComplementar: ConteudoCurado | null;
  questoesRelacionadas: QuestaoAutoral[];
  miniRevisao: string;
  proximoPasso: string;
};

function getContextoDoCargo(track: CuradoriaTrilha) {
  if (track.slug === "auxiliar-servicos-gerais") {
    return "o ambiente escolar, a circulacao segura e a organizacao das rotinas de limpeza e apoio";
  }

  if (track.slug === "merendeira") {
    return "a cozinha escolar, a manipulacao segura de alimentos e a organizacao do estoque";
  }

  if (track.slug === "motorista") {
    return "o transporte escolar, a direcao prudente e a leitura correta de situacoes de risco";
  }

  if (track.slug === "operador-maquinas") {
    return "inspecao, operacao segura e prevencao de falhas em rotina operacional";
  }

  if (track.slug.includes("cuidador")) {
    return "acolhimento, observacao, cuidado responsavel e rotina de acompanhamento";
  }

  if (track.slug === "tecnico-enfermagem") {
    return "registro assistencial, procedimentos tecnicos e condutas ligadas ao SUS";
  }

  if (track.slug === "educacao-infantil") {
    return "planejamento da infancia, brincadeira, interacoes e organizacao de experiencias";
  }

  if (track.slug === "series-iniciais") {
    return "alfabetizacao, leitura, letramento e acompanhamento da aprendizagem";
  }

  if (track.slug.startsWith("aee")) {
    return "acessibilidade, recursos pedagogicos e organizacao do atendimento educacional especializado";
  }

  if (track.slug === "sala-recursos") {
    return "planejamento do AEE, recursos multifuncionais e articulacao com a escola comum";
  }

  if (track.area === "magisterio") {
    return "planejamento, avaliacao, legislacao e exemplos praticos da rotina pedagogica";
  }

  return "o cotidiano do cargo, a leitura do edital e a resolucao de situacoes frequentes de prova";
}

function getObjetivo(track: CuradoriaTrilha, material: CuradoriaMaterial) {
  return `Entender ${material.titulo.toLowerCase()} com exemplos ligados a ${getContextoDoCargo(track)}.`;
}

function getImportancia(track: CuradoriaTrilha, material: CuradoriaMaterial) {
  if (material.modulo === "Portugues") {
    return `Esse bloco costuma aparecer em comandos, enunciados e interpretacoes que a banca exige de quem vai atuar em ${getContextoDoCargo(track)}.`;
  }

  if (material.modulo === "Matematica") {
    return `A banca usa matematica para medir leitura de problema, proporcionalidade e tomada de decisao em contextos de ${getContextoDoCargo(track)}.`;
  }

  if (material.modulo === "Informatica") {
    return `Informatica costuma cobrar uso funcional de ferramentas e organizacao digital aplicada a ${getContextoDoCargo(track)}.`;
  }

  return `Esse conteudo cai porque traduz conhecimentos praticos e conceituais que o cargo exige em ${getContextoDoCargo(track)}.`;
}

function getMiniRevisao(track: CuradoriaTrilha, material: CuradoriaMaterial) {
  return `Antes de avancar, revise os pontos-chave de ${material.modulo.toLowerCase()} e confira se voce consegue explicar o tema usando exemplos de ${getContextoDoCargo(track)}.`;
}

function getQuestoesDoModulo(track: CuradoriaTrilha, material: CuradoriaMaterial) {
  const bundle = getQuestoesDisponiveisParaCargo(track.slug, track.area);
  const byDisciplina = bundle.questoes.filter(
    (questao) =>
      questao.disciplina.toLowerCase().includes(material.modulo.toLowerCase()) ||
      material.titulo.toLowerCase().includes(questao.disciplina.toLowerCase()),
  );

  return (byDisciplina.length > 0 ? byDisciplina : bundle.questoes).slice(0, 3);
}

function pickPrincipal(videos: ConteudoCurado[]) {
  return videos.find((item) => item.url && item.status !== "complementar") ?? videos.find((item) => item.url) ?? videos[0] ?? null;
}

function pickComplementar(videos: ConteudoCurado[], principal: ConteudoCurado | null) {
  return videos.find((item) => item.id !== principal?.id) ?? null;
}

export function getJornadaByTrack(trackSlug: string) {
  const track = getCuradoriaTrack(trackSlug);

  if (!track) {
    return [];
  }

  return track.materiais.map((material, index) => {
    const relatedVideos = getVideosByCargoAndModulo(track.slug, material.modulo);
    const videoPrincipal = pickPrincipal(relatedVideos);
    const videoComplementar = pickComplementar(relatedVideos, videoPrincipal);
    const questoesRelacionadas = getQuestoesDoModulo(track, material);
    const nextMaterial = track.materiais[index + 1];

    return {
      id: `${track.slug}-${material.slug}-jornada`,
      modulo: material.modulo,
      titulo: material.titulo,
      objetivoDaAula: getObjetivo(track, material),
      porQueCaiNaProva: getImportancia(track, material),
      resumoGuiado: material.resumo,
      apostila: material,
      videoPrincipal,
      videoComplementar,
      questoesRelacionadas,
      miniRevisao: getMiniRevisao(track, material),
      proximoPasso: nextMaterial
        ? `Depois desta etapa, avance para ${nextMaterial.titulo}.`
        : "Depois desta etapa, siga para o bloco de questoes e finalize com simulado da area.",
    } satisfies JornadaEtapa;
  });
}

import { curadoria } from "@/lib/curadoria";

export type VideoStatus = "essencial" | "recomendado" | "complementar" | "pendente de curadoria";

export type VideoCurado = {
  id: string;
  titulo: string;
  canal: string | null;
  url: string | null;
  duracao: string | null;
  disciplina: string;
  cargo: string;
  cargoSlug: string;
  modulo: string;
  status: VideoStatus;
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

export const videosCurados: VideoCurado[] = curadoria.flatMap((group) =>
  group.tracks.flatMap((track) =>
    track.materiais.map((material) => ({
      id: `video-${track.slug}-${slugify(material.modulo)}`,
      titulo: `${track.titulo} - ${material.titulo}`,
      canal: null,
      url: null,
      duracao: null,
      disciplina: material.titulo,
      cargo: track.titulo,
      cargoSlug: track.slug,
      modulo: material.modulo,
      status: "pendente de curadoria" as const,
      observacao: "Sem link validado nesta sprint. Curadoria futura deve confirmar canal, aula e aderencia ao edital.",
    })),
  ),
);

export function getVideosByCargoSlug(cargoSlug: string) {
  return videosCurados.filter((video) => video.cargoSlug === cargoSlug);
}

export function getVideosPendentes() {
  return videosCurados.filter((video) => video.status === "pendente de curadoria");
}

export function getVideosOverview() {
  return {
    totalVideos: videosCurados.length,
    pendentes: getVideosPendentes().length,
    validados: videosCurados.filter((video) => video.url).length,
  };
}

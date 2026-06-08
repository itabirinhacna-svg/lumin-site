import { StudentHub } from "@/components/student-hub";
import { requireStudentAccess } from "@/lib/access";
import { getGamificationSnapshot, listEssaysForUser, mapEssayRecordToSubmission } from "@/lib/db";
import { getPlanById } from "@/lib/data";
import { getTracksForPlan } from "@/lib/produtos";

const supportHref = "https://wa.me/5527999850434?text=Ola,%20quero%20suporte%20na%20minha%20trilha%20BenThec.";

export default async function AreaPage() {
  const { user, purchase } = await requireStudentAccess();
  const tracks = getTracksForPlan(purchase.planId);
  const plan = getPlanById(purchase.planId);
  const essays = (await listEssaysForUser(user.id)).map(mapEssayRecordToSubmission);
  const latestEssay = essays[0] ?? null;
  const gamification = await getGamificationSnapshot(user.id, purchase.productSlug);

  return (
    <StudentHub
      viewerName={user.name}
      planName={purchase.planName}
      productSlug={purchase.productSlug}
      planFeatures={plan?.features ?? []}
      supportHref={supportHref}
      tracks={tracks}
      gamification={gamification}
      redacaoSnapshot={{
        total: essays.length,
        pending: essays.filter((essay) => essay.status !== "devolvida").length,
        latestTitle: latestEssay?.title ?? null,
        latestStatus: latestEssay?.status ?? null,
      }}
    />
  );
}

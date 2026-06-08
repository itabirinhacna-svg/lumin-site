import { NextResponse } from "next/server";
import { getUserById, recordGamificationEvent, recordQuestionAttempt, recordSimulationAttempt, type ProductAccessKey } from "@/lib/db";
import { getSession } from "@/lib/session";
import { consumeRateLimit, getClientKey, isSameOriginRequest } from "@/lib/request-security";
import type { GamificationEventType } from "@/lib/gamification";

type Payload = {
  productSlug?: ProductAccessKey;
  trackSlug?: string;
  event?: GamificationEventType;
  question?: {
    id: string;
    selectedOption?: string;
    isCorrect?: boolean;
    discipline: string;
    subject: string;
    microSubject: string;
  };
  simulation?: {
    mode: string;
    scorePercent: number;
    summary: Record<string, unknown>;
  };
};

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  const rateLimit = consumeRateLimit(`gamification:${getClientKey(request)}`, 80, 15 * 60 * 1000);
  if (!rateLimit.ok) {
    return NextResponse.json({ ok: false, error: "too_many_requests" }, { status: 429 });
  }

  const session = await getSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "unauthenticated" }, { status: 401 });
  }

  const user = await getUserById(session.userId);
  if (!user || user.role !== "student") {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  const payload = (await request.json().catch(() => null)) as Payload | null;
  const productSlug = payload?.productSlug ?? "agua-doce";

  if (payload?.question?.id) {
    await recordQuestionAttempt({
      userId: user.id,
      questionId: payload.question.id,
      selectedOption: payload.question.selectedOption,
      isCorrect: payload.question.isCorrect,
      productSlug,
      discipline: payload.question.discipline,
      subject: payload.question.subject,
      microSubject: payload.question.microSubject,
    });
  }

  if (payload?.simulation?.mode) {
    await recordSimulationAttempt({
      userId: user.id,
      simulationMode: payload.simulation.mode,
      productSlug,
      scorePercent: payload.simulation.scorePercent,
      summary: payload.simulation.summary,
    });
  }

  if (!payload?.event) {
    return NextResponse.json({ ok: true, recorded: false });
  }

  const snapshot = await recordGamificationEvent({
    userId: user.id,
    productSlug,
    trackSlug: payload.trackSlug,
    event: payload.event,
  });

  return NextResponse.json({
    ok: true,
    recorded: true,
    xpTotal: snapshot.xpTotal,
    level: snapshot.level.name,
    nextMission: snapshot.nextMission,
  });
}

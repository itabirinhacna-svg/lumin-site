import { getHealthSnapshot } from "@/lib/db";

export async function GET() {
  const snapshot = await getHealthSnapshot();
  return Response.json(snapshot);
}

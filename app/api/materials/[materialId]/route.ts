import { readFile } from "node:fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { getMaterialAsset } from "@/lib/curadoria";

type RouteContext = {
  params: Promise<{
    materialId: string;
  }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  const { materialId } = await context.params;
  const searchParams = request.nextUrl.searchParams;
  const variant = searchParams.get("variant") === "markdown" ? "markdown" : "pdf";
  const download = searchParams.get("download") === "1";
  const asset = getMaterialAsset(materialId, variant);

  if (!asset) {
    return NextResponse.json({ error: "Material nao encontrado." }, { status: 404 });
  }

  const fileBytes = await readFile(asset.targetPath);
  const disposition = `${download ? "attachment" : "inline"}; filename="${asset.fileName}"`;

  return new NextResponse(fileBytes, {
    headers: {
      "Content-Type": asset.contentType,
      "Content-Disposition": disposition,
      "Cache-Control": "private, max-age=0, must-revalidate",
    },
  });
}

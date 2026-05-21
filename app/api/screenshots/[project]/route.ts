import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const IMAGE_EXTS = /\.(png|jpg|jpeg|gif|webp|avif|svg)$/i;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ project: string }> }
) {
  const { project } = await params;
  const projectName = decodeURIComponent(project);
  const dir = path.join(process.cwd(), "public", "images", "Projects", projectName);

  try {
    const files = fs.readdirSync(dir);
    const images = files
      .filter((f) => IMAGE_EXTS.test(f))
      .sort()
      .map((f) => `/images/Projects/${projectName}/${f}`);
    return NextResponse.json({ images });
  } catch {
    // Folder doesn't exist yet — just return empty
    return NextResponse.json({ images: [] });
  }
}

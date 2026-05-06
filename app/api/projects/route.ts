import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

/* ─── Helpers ──────────────────────────────────────── */

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function generateSuffix(): string {
  return Math.random().toString(36).substring(2, 6);
}

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const projects = await prisma.project.findMany({
    where: { ownerId: userId },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      name: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json({ projects });
}

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const name =
    typeof body.name === "string" && body.name.trim()
      ? body.name.trim()
      : "Untitled Project";

  /* Generate a unique room ID: slug + random suffix */
  const baseSlug = toSlug(name);
  let id = `${baseSlug}-${generateSuffix()}`;

  /* Ensure uniqueness — retry up to 10 times on collision */
  let attempts = 0;
  while ((await prisma.project.findUnique({ where: { id }, select: { id: true } })) && attempts < 10) {
    id = `${baseSlug}-${generateSuffix()}`;
    attempts++;
  }

  const project = await prisma.project.create({
    data: {
      id,
      ownerId: userId,
      name,
    },
    select: {
      id: true,
      name: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json({ project }, { status: 201 });
}

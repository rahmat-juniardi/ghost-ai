import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "./prisma";

export interface ProjectData {
  id: string;
  name: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectList {
  owned: ProjectData[];
  shared: ProjectData[];
  ownerId: string;
}

/**
 * Fetch the current user's owned and shared projects server-side.
 * Returns empty lists when unauthenticated.
 */
export async function getProjectList(): Promise<ProjectList> {
  const { userId } = await auth();

  if (!userId) {
    return { owned: [], shared: [], ownerId: "" };
  }

  const [owned, user] = await Promise.all([
    prisma.project.findMany({
      where: { ownerId: userId },
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        name: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
    currentUser(),
  ]);

  let shared: ProjectData[] = [];

  const primaryEmail = user?.primaryEmailAddress?.emailAddress;
  if (primaryEmail) {
    const collaborations = await prisma.projectCollaborator.findMany({
      where: { email: primaryEmail },
      select: {
        project: {
          select: {
            id: true,
            name: true,
            status: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
      orderBy: { project: { updatedAt: "desc" } },
    });
    shared = collaborations.map((c) => c.project);
  }

  return { owned, shared, ownerId: userId };
}

"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import type { ProjectData } from "./project-data";

/* ─── Types ─────────────────────────────────────────── */

export interface Project {
  id: string;
  name: string;
  ownerId: string;
  isOwner: boolean;
}

export type DialogType = "create" | "rename" | "delete" | null;

/* ─── Room ID helpers ─────────────────────────────── */

/** Pure slugifier — lowercased, hyphenated, no special chars. */
export function toSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Generate a short random suffix (4 chars, lowercase alphanumeric). */
function generateSuffix(): string {
  return Math.random().toString(36).substring(2, 6);
}

/** Full room ID: slug + suffix — e.g. "my-architecture-a7x3". */
export function toRoomId(name: string): string {
  const slug = toSlug(name);
  if (!slug) return "";
  return `${slug}-${generateSuffix()}`;
}

/* ─── Hook ──────────────────────────────────────────── */

interface UseProjectDialogsOptions {
  owned: ProjectData[];
  shared: ProjectData[];
  ownerId: string;
}

export function useProjectDialogs({
  owned: ownedData,
  shared: sharedData,
  ownerId,
}: UseProjectDialogsOptions) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeDialog, setActiveDialog] = useState<DialogType>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectName, setProjectName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const slug = useMemo(() => toRoomId(projectName), [projectName]);

  /* Build project list from server data */
  const projects: Project[] = useMemo(() => {
    const owned: Project[] = ownedData.map((p) => ({
      id: p.id,
      name: p.name,
      ownerId,
      isOwner: true,
    }));
    const shared: Project[] = sharedData.map((p) => ({
      id: p.id,
      name: p.name,
      ownerId: "",
      isOwner: false,
    }));
    return [...owned, ...shared];
  }, [ownedData, sharedData, ownerId]);

  /* ── Dialog openers ───────────────────────────── */

  const openCreate = useCallback(() => {
    setProjectName("");
    setSelectedProject(null);
    setActiveDialog("create");
  }, []);

  const openRename = useCallback((project: Project) => {
    setSelectedProject(project);
    setProjectName(project.name);
    setActiveDialog("rename");
  }, []);

  const openDelete = useCallback((project: Project) => {
    setSelectedProject(project);
    setActiveDialog("delete");
  }, []);

  const close = useCallback(() => {
    setActiveDialog(null);
    setSelectedProject(null);
    setProjectName("");
    setIsLoading(false);
  }, []);

  /* ── Mutations ────────────────────────────────── */

  const createProject = useCallback(async () => {
    const name = projectName.trim() || "Untitled Project";
    setIsLoading(true);

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Failed to create project");
      }

      const { project } = await res.json();
      close();
      router.push(`/editor/${project.id}`);
    } catch (error) {
      console.error("createProject error:", error);
      setIsLoading(false);
    }
  }, [projectName, router, close]);

  const renameProject = useCallback(async () => {
    if (!selectedProject) return;
    const name = projectName.trim();
    if (!name) return;

    setIsLoading(true);

    try {
      const res = await fetch(`/api/projects/${selectedProject.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Failed to rename project");
      }

      close();
      router.refresh();
    } catch (error) {
      console.error("renameProject error:", error);
      setIsLoading(false);
    }
  }, [selectedProject, projectName, router, close]);

  const deleteProject = useCallback(async () => {
    if (!selectedProject) return;

    setIsLoading(true);

    try {
      const res = await fetch(`/api/projects/${selectedProject.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Failed to delete project");
      }

      const isActiveWorkspace = pathname === `/editor/${selectedProject.id}`;
      close();

      if (isActiveWorkspace) {
        router.push("/editor");
      } else {
        router.refresh();
      }
    } catch (error) {
      console.error("deleteProject error:", error);
      setIsLoading(false);
    }
  }, [selectedProject, pathname, router, close]);

  return {
    /* state */
    activeDialog,
    selectedProject,
    projectName,
    slug,
    isLoading,
    /* data */
    projects,
    ownerId,
    /* actions */
    setProjectName,
    setIsLoading,
    openCreate,
    openRename,
    openDelete,
    close,
    createProject,
    renameProject,
    deleteProject,
  } as const;
}

/* ─── Context for passing actions down to children ──── */

export interface ProjectDialogActions {
  openCreate: () => void;
}

export const ProjectDialogContext = createContext<ProjectDialogActions>({
  openCreate: () => {},
});

export function useProjectDialogActions(): ProjectDialogActions {
  return useContext(ProjectDialogContext);
}

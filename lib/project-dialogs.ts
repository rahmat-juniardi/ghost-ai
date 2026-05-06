"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react"

/* ─── Types ─────────────────────────────────────────── */

export interface Project {
  id: string
  name: string
  slug: string
  ownerId: string
  isOwner: boolean
}

export type DialogType = "create" | "rename" | "delete" | null

/* ─── Slug helper ──────────────────────────────────── */

export function toSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

/* ─── Mock data ─────────────────────────────────────── */

const MOCK_OWNER_ID = "user_1"

const MOCK_PROJECTS: Project[] = [
  {
    id: "p1",
    name: "My Architecture",
    slug: "my-architecture",
    ownerId: MOCK_OWNER_ID,
    isOwner: true,
  },
  {
    id: "p2",
    name: "E-Commerce Platform",
    slug: "e-commerce-platform",
    ownerId: "user_2",
    isOwner: false,
  },
  {
    id: "p3",
    name: "API Gateway Design",
    slug: "api-gateway-design",
    ownerId: MOCK_OWNER_ID,
    isOwner: true,
  },
]

/* ─── Hook ──────────────────────────────────────────── */

export function useProjectDialogs() {
  const [activeDialog, setActiveDialog] = useState<DialogType>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [projectName, setProjectName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const slug = useMemo(() => toSlug(projectName), [projectName])

  const openCreate = useCallback(() => {
    setProjectName("")
    setSelectedProject(null)
    setActiveDialog("create")
  }, [])

  const openRename = useCallback((project: Project) => {
    setSelectedProject(project)
    setProjectName(project.name)
    setActiveDialog("rename")
  }, [])

  const openDelete = useCallback((project: Project) => {
    setSelectedProject(project)
    setActiveDialog("delete")
  }, [])

  const close = useCallback(() => {
    setActiveDialog(null)
    setSelectedProject(null)
    setProjectName("")
    setIsLoading(false)
  }, [])

  return {
    /* state */
    activeDialog,
    selectedProject,
    projectName,
    slug,
    isLoading,
    /* mock data */
    projects: MOCK_PROJECTS,
    ownerId: MOCK_OWNER_ID,
    /* actions */
    setProjectName,
    setIsLoading,
    openCreate,
    openRename,
    openDelete,
    close,
  } as const
}

/* ─── Context for passing actions down to children ──── */

export interface ProjectDialogActions {
  openCreate: () => void
}

export const ProjectDialogContext = createContext<ProjectDialogActions>({
  openCreate: () => {},
})

export function useProjectDialogActions(): ProjectDialogActions {
  return useContext(ProjectDialogContext)
}

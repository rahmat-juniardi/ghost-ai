"use client"

import { X, Plus, Pencil, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Project } from "@/lib/project-dialogs"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
  projects: Project[]
  onNewProject: () => void
  onRename: (project: Project) => void
  onDelete: (project: Project) => void
}

export function ProjectSidebar({
  isOpen,
  onClose,
  projects,
  onNewProject,
  onRename,
  onDelete,
}: ProjectSidebarProps) {
  const ownedProjects = projects.filter((p) => p.isOwner)
  const sharedProjects = projects.filter((p) => !p.isOwner)

  return (
    <>
      {/* Backdrop scrim */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 flex h-full w-72 flex-col border-r border-border-default bg-bg-surface transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex h-12 items-center justify-between border-b border-border-default px-4">
          <h2 className="text-sm font-semibold text-text-copy-primary">
            Projects
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X className="size-4" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex flex-1 flex-col p-3">
          <Tabs defaultValue="my-projects" className="flex flex-1 flex-col">
            <TabsList className="w-full">
              <TabsTrigger value="my-projects" className="flex-1">
                My Projects
              </TabsTrigger>
              <TabsTrigger value="shared" className="flex-1">
                Shared
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="my-projects"
              className="mt-3 flex-1"
            >
              {ownedProjects.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-text-copy-muted">
                    No projects yet
                  </p>
                </div>
              ) : (
                <ul className="space-y-1">
                  {ownedProjects.map((project) => (
                    <li
                      key={project.id}
                      className="group flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-bg-subtle"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-text-copy-primary">
                          {project.name}
                        </p>
                        <p className="truncate text-xs text-text-copy-faint">
                          {project.slug}
                        </p>
                      </div>

                      {/* Actions (owner only) */}
                      <div className="ml-2 flex shrink-0 gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          onClick={(e) => {
                            e.stopPropagation()
                            onRename(project)
                          }}
                          aria-label={`Rename ${project.name}`}
                        >
                          <Pencil className="size-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          onClick={(e) => {
                            e.stopPropagation()
                            onDelete(project)
                          }}
                          aria-label={`Delete ${project.name}`}
                        >
                          <Trash2 className="size-3" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </TabsContent>

            <TabsContent
              value="shared"
              className="mt-3 flex-1"
            >
              {sharedProjects.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-text-copy-muted">
                    No shared projects
                  </p>
                </div>
              ) : (
                <ul className="space-y-1">
                  {sharedProjects.map((project) => (
                    <li
                      key={project.id}
                      className="flex items-center rounded-lg px-3 py-2 text-sm transition-colors hover:bg-bg-subtle"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-text-copy-primary">
                          {project.name}
                        </p>
                        <p className="truncate text-xs text-text-copy-faint">
                          {project.slug}
                        </p>
                      </div>
                      {/* No actions for shared projects */}
                    </li>
                  ))}
                </ul>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* New Project button */}
        <div className="border-t border-border-default p-3">
          <Button className="w-full gap-2" onClick={onNewProject}>
            <Plus className="size-4" />
            New Project
          </Button>
        </div>
      </aside>
    </>
  )
}

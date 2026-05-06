"use client"

import { useState } from "react"
import { EditorNavbar } from "@/components/editor/editor-navbar"
import { ProjectSidebar } from "@/components/editor/project-sidebar"
import { CreateProjectDialog } from "@/components/editor/create-project-dialog"
import { RenameProjectDialog } from "@/components/editor/rename-project-dialog"
import { DeleteProjectDialog } from "@/components/editor/delete-project-dialog"
import {
  useProjectDialogs,
  ProjectDialogContext,
} from "@/lib/project-dialogs"

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const {
    activeDialog,
    selectedProject,
    projectName,
    slug,
    isLoading,
    projects,
    setProjectName,
    setIsLoading,
    openCreate,
    openRename,
    openDelete,
    close,
  } = useProjectDialogs()

  /* Mock submit handlers (no API/persistence yet) */
  function handleRenameSubmit() {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      close()
    }, 500)
  }

  function handleDeleteConfirm() {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      close()
    }, 500)
  }

  return (
    <ProjectDialogContext.Provider value={{ openCreate }}>
      <div className="flex min-h-screen flex-col bg-bg-base">
        <EditorNavbar
          sidebarOpen={sidebarOpen}
          onSidebarToggle={() => setSidebarOpen((v) => !v)}
        />
        <ProjectSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          projects={projects}
          onNewProject={openCreate}
          onRename={openRename}
          onDelete={openDelete}
        />

        {/* Editor canvas — offset below the fixed navbar */}
        <main className="relative mt-12 flex-1">{children}</main>

        {/* Dialogs */}
        <CreateProjectDialog
          open={activeDialog === "create"}
          onOpenChange={(open) => {
            if (!open) close()
          }}
          projectName={projectName}
          slug={slug}
          onProjectNameChange={setProjectName}
          isLoading={isLoading}
        />
        <RenameProjectDialog
          open={activeDialog === "rename"}
          onOpenChange={(open) => {
            if (!open) close()
          }}
          project={selectedProject}
          projectName={projectName}
          onProjectNameChange={setProjectName}
          isLoading={isLoading}
          onSubmit={handleRenameSubmit}
        />
        <DeleteProjectDialog
          open={activeDialog === "delete"}
          onOpenChange={(open) => {
            if (!open) close()
          }}
          project={selectedProject}
          isLoading={isLoading}
          onConfirm={handleDeleteConfirm}
        />
      </div>
    </ProjectDialogContext.Provider>
  )
}

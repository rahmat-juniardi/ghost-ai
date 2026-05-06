"use client";

import { useState } from "react";
import { EditorNavbar } from "@/components/editor/editor-navbar";
import { ProjectSidebar } from "@/components/editor/project-sidebar";
import { CreateProjectDialog } from "@/components/editor/create-project-dialog";
import { RenameProjectDialog } from "@/components/editor/rename-project-dialog";
import { DeleteProjectDialog } from "@/components/editor/delete-project-dialog";
import {
  useProjectDialogs,
  ProjectDialogContext,
} from "@/lib/project-dialogs";
import type { ProjectData } from "@/lib/project-data";

interface EditorShellProps {
  children: React.ReactNode;
  owned: ProjectData[];
  shared: ProjectData[];
  ownerId: string;
}

export function EditorShell({
  children,
  owned,
  shared,
  ownerId,
}: EditorShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    activeDialog,
    selectedProject,
    projectName,
    slug,
    isLoading,
    projects,
    setProjectName,
    openCreate,
    openRename,
    openDelete,
    close,
    createProject,
    renameProject,
    deleteProject,
  } = useProjectDialogs({ owned, shared, ownerId });

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
            if (!open) close();
          }}
          projectName={projectName}
          slug={slug}
          onProjectNameChange={setProjectName}
          isLoading={isLoading}
          onSubmit={createProject}
        />
        <RenameProjectDialog
          open={activeDialog === "rename"}
          onOpenChange={(open) => {
            if (!open) close();
          }}
          project={selectedProject}
          projectName={projectName}
          onProjectNameChange={setProjectName}
          isLoading={isLoading}
          onSubmit={renameProject}
        />
        <DeleteProjectDialog
          open={activeDialog === "delete"}
          onOpenChange={(open) => {
            if (!open) close();
          }}
          project={selectedProject}
          isLoading={isLoading}
          onConfirm={deleteProject}
        />
      </div>
    </ProjectDialogContext.Provider>
  );
}

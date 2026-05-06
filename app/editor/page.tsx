"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useProjectDialogActions } from "@/lib/project-dialogs"

export default function EditorPage() {
  const { openCreate } = useProjectDialogActions()

  return (
    <div className="flex h-[calc(100vh-3rem)] flex-col items-center justify-center px-4">
      <h1 className="text-xl font-semibold tracking-tight text-text-copy-primary">
        Create a project or open an existing one
      </h1>
      <p className="mt-2 text-sm text-text-copy-muted">
        Start a new architecture workspace, or choose a project from the
        sidebar.
      </p>
      <Button className="mt-6 gap-2" onClick={openCreate}>
        <Plus className="size-4" />
        New Project
      </Button>
    </div>
  )
}

"use client"

import { useRef, useEffect } from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { Project } from "@/lib/project-dialogs"

interface RenameProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project: Project | null
  projectName: string
  onProjectNameChange: (name: string) => void
  isLoading: boolean
  onSubmit: () => void
}

export function RenameProjectDialog({
  open,
  onOpenChange,
  project,
  projectName,
  onProjectNameChange,
  isLoading,
  onSubmit,
}: RenameProjectDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  /* Auto-focus the input when dialog opens */
  useEffect(() => {
    if (open) {
      /* delay to let the dialog mount */
      const id = setTimeout(() => inputRef.current?.focus(), 50)
      return () => clearTimeout(id)
    }
  }, [open])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && projectName.trim() && !isLoading) {
      onSubmit()
    }
  }

  if (!project) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-md"
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle>Rename Project</DialogTitle>
          <DialogDescription>
            Rename &ldquo;{project.name}&rdquo; to something new.
          </DialogDescription>
        </DialogHeader>

        <div>
          <label
            htmlFor="rename-project-name"
            className="mb-1.5 block text-xs font-medium text-text-copy-secondary"
          >
            Project name
          </label>
          <Input
            ref={inputRef}
            id="rename-project-name"
            value={projectName}
            onChange={(e) => onProjectNameChange(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            disabled={!projectName.trim() || isLoading}
            onClick={onSubmit}
          >
            {isLoading ? "Saving…" : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

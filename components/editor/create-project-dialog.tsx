"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface CreateProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  projectName: string
  slug: string
  onProjectNameChange: (name: string) => void
  isLoading: boolean
}

export function CreateProjectDialog({
  open,
  onOpenChange,
  projectName,
  slug,
  onProjectNameChange,
  isLoading,
}: CreateProjectDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-md"
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Give your project a name to get started.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div>
            <label
              htmlFor="create-project-name"
              className="mb-1.5 block text-xs font-medium text-text-copy-secondary"
            >
              Project name
            </label>
            <Input
              id="create-project-name"
              placeholder="e.g. Microservice Architecture"
              value={projectName}
              onChange={(e) => onProjectNameChange(e.target.value)}
              autoFocus
            />
          </div>

          {slug && (
            <div>
              <p className="mb-1 text-xs font-medium text-text-copy-secondary">
                Slug
              </p>
              <p className="rounded-lg border border-border-default bg-bg-subtle px-2.5 py-1.5 font-mono text-sm text-text-copy-muted">
                {slug}
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button disabled={!projectName.trim() || isLoading}>
            {isLoading ? "Creating…" : "Create"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

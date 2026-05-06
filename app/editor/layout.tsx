import { getProjectList } from "@/lib/project-data";
import { EditorShell } from "@/components/editor/editor-shell";

export default async function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { owned, shared, ownerId } = await getProjectList();

  return (
    <EditorShell owned={owned} shared={shared} ownerId={ownerId}>
      {children}
    </EditorShell>
  );
}

import { ToolLayout } from "@/components/ToolLayout";
import { TextDiff } from "@/components/TextDiff";

export default function ComparadorDiffPage() {
  return (
    <ToolLayout
      title="Comparador de Texto e JSON (Diff)"
      description="Compare dois textos ou JSONs e veja as linhas adicionadas e removidas destacadas."
    >
      <TextDiff />
    </ToolLayout>
  );
}

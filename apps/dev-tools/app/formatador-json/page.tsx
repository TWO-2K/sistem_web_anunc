import { ToolLayout } from "@/components/ToolLayout";
import { JsonFormatter } from "@/components/JsonFormatter";

export default function FormatadorJsonPage() {
  return (
    <ToolLayout
      title="Formatador e Validador de JSON"
      description="Cole um JSON, formate com indentação legível ou minifique, e veja erros de sintaxe na hora."
    >
      <JsonFormatter />
    </ToolLayout>
  );
}

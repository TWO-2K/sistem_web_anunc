import { ToolLayout } from "@/components/ToolLayout";
import { UuidGenerator } from "@/components/UuidGenerator";

export default function GeradorUuidPage() {
  return (
    <ToolLayout
      title="Gerador de UUID"
      description="Gere UUIDs v4 aleatórios em lote, com opção de maiúsculas e sem hífens, e copie com um clique."
    >
      <UuidGenerator />
    </ToolLayout>
  );
}

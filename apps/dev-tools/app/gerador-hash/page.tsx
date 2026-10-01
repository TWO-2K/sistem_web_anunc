import { ToolLayout } from "@/components/ToolLayout";
import { HashGenerator } from "@/components/HashGenerator";

export default function GeradorHashPage() {
  return (
    <ToolLayout
      title="Gerador de Hash SHA"
      description="Gere hashes SHA-1, SHA-256, SHA-384 e SHA-512 de qualquer texto, com um clique para copiar."
    >
      <HashGenerator />
    </ToolLayout>
  );
}

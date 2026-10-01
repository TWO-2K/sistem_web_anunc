import { ToolLayout } from "@/components/ToolLayout";
import { BulkLinkGenerator } from "@/components/BulkLinkGenerator";

export default function GeradorLinkEmMassaPage() {
  return (
    <ToolLayout
      title="Gerador de Links do WhatsApp em Massa"
      description="Cole uma lista de números (um por linha) e gere todos os links wa.me de uma vez, com exportação em CSV ou TXT."
    >
      <BulkLinkGenerator />
    </ToolLayout>
  );
}

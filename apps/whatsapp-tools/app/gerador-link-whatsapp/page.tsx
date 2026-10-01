import { ToolLayout } from "@/components/ToolLayout";
import { WhatsAppLinkGenerator } from "@/components/WhatsAppLinkGenerator";

export default function GeradorLinkWhatsAppPage() {
  return (
    <ToolLayout
      title="Gerador de Link do WhatsApp"
      description="Monte um link que abre uma conversa no WhatsApp com número e mensagem já preenchidos, sem precisar salvar o contato na agenda."
    >
      <WhatsAppLinkGenerator />
    </ToolLayout>
  );
}

import { ToolLayout } from "@/components/ToolLayout";
import { TextFormatter } from "@/components/TextFormatter";

export default function FormatadorTextoWhatsAppPage() {
  return (
    <ToolLayout
      title="Formatador de Texto para WhatsApp"
      description="Aplique negrito, itálico, tachado e monoespaçado na sua mensagem com um clique, veja como vai ficar e copie pronta para colar no WhatsApp."
    >
      <TextFormatter />
    </ToolLayout>
  );
}

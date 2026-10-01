import { ToolLayout } from "@/components/ToolLayout";
import { FormattingRemover } from "@/components/FormattingRemover";

export default function RemoverFormatacaoWhatsAppPage() {
  return (
    <ToolLayout
      title="Remover Formatação e Emojis do WhatsApp"
      description="Limpe as marcações (*, _, ~, ```) e/ou os emojis de um texto copiado do WhatsApp para reaproveitá-lo em outro canal."
    >
      <FormattingRemover />
    </ToolLayout>
  );
}

import { ToolLayout } from "@/components/ToolLayout";
import { FloatingButtonGenerator } from "@/components/FloatingButtonGenerator";

export default function BotaoWhatsAppSitePage() {
  return (
    <ToolLayout
      title="Botão Flutuante do WhatsApp para Site"
      description="Gere o código de um botão “Fale no WhatsApp” que fica fixo no canto da tela do seu site. É só copiar e colar — sem plugin, sem cadastro."
    >
      <FloatingButtonGenerator />
    </ToolLayout>
  );
}
